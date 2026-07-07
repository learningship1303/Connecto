const asyncHandler = require("express-async-handler");

const Conversation = require("../models/conversationModel");

// ======================================================
// Create or Get Conversation
// ======================================================

exports.createConversation = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;

  if (!receiverId) {
    return res.status(400).json({
      success: false,
      message: "Receiver ID is required.",
    });
  }

  let conversation = await Conversation.findOne({
    isGroup: false,
    participants: {
      $all: [req.user._id, receiverId],
      $size: 2,
    },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [req.user._id, receiverId],
    });
  }

  res.status(200).json({
    success: true,
    conversation,
  });
});

// ======================================================
// Get My Conversations
// ======================================================

exports.getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
  })
    .populate(
      "participants",
      "fullName username avatar status"
    )
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    conversations,
  });
});