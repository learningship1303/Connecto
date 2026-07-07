const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const {
  getIO,
} = require("../socket/socket");

// ======================================================
// Send Message
// ======================================================

exports.sendMessage = asyncHandler(async (req, res) => {
  const { conversationId, clientMessageId, senderId, text } = req.body;

  if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
    return res.status(400).json({
      success: false,
      message: "Valid conversation ID is required.",
    });
  }

  if (senderId && !mongoose.Types.ObjectId.isValid(senderId)) {
    return res.status(400).json({
      success: false,
      message: "Valid sender ID is required.",
    });
  }

  if (senderId && senderId !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Sender does not match authenticated user.",
    });
  }

  if (!clientMessageId || clientMessageId.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Client message ID is required.",
    });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty.",
    });
  }

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found.",
    });
  }

  const isParticipant = conversation.participants.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!isParticipant) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  const existingMessage = await Message.findOne({
    clientMessageId: clientMessageId.trim(),
  }).populate(
    "sender",
    "fullName username avatar"
  );

  if (existingMessage) {
    return res.status(200).json({
      success: true,
      idempotent: true,
      message: existingMessage,
    });
  }

  let message = await Message.create({
    clientMessageId: clientMessageId.trim(),
    sender: req.user._id,
    conversation: conversationId,
    text: text.trim(),
    status: "sent",
  });

  message = await message.populate(
    "sender",
    "fullName username avatar"
  );

  conversation.lastMessage = message._id;

  await conversation.save();

  // ===============================
  // Socket.IO
  // ===============================

  const io = getIO();

  io.to(conversationId).emit("newMessage", message);

  res.status(201).json({
    success: true,
    idempotent: false,
    message,
  });
});

// ======================================================
// Get Messages
// ======================================================

exports.getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found.",
    });
  }

  const isParticipant = conversation.participants.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!isParticipant) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  const messages = await Message.find({
    conversation: conversationId,
  })
    .populate(
      "sender",
      "fullName username avatar"
    )
    .sort({
      createdAt: 1,
    });

  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
});

// ======================================================
// Edit Message
// ======================================================

exports.editMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty.",
    });
  }

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found.",
    });
  }

  if (message.sender.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  message.text = text.trim();
  message.edited = true;

  await message.save();

  const io = getIO();

  io.to(message.conversation.toString()).emit(
    "messageEdited",
    message
  );

  res.status(200).json({
    success: true,
    message,
  });
});

// ======================================================
// Delete Message
// ======================================================

exports.deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found.",
    });
  }

  if (message.sender.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  message.deleted = true;
  message.text = "This message was deleted.";

  await message.save();

  const io = getIO();

  io.to(message.conversation.toString()).emit(
    "messageDeleted",
    message
  );

  res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
  });
});
// ======================================================
// Mark Message Delivered
// ======================================================

exports.markDelivered = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found.",
    });
  }

  const alreadyDelivered = message.deliveredTo.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!alreadyDelivered) {
    message.deliveredTo.push(req.user._id);
    message.status = "delivered";

    await message.save();
  }

  const io = getIO();

  io.to(message.conversation.toString()).emit(
    "messageDelivered",
    {
      messageId: message._id,
      userId: req.user._id,
    }
  );

  res.status(200).json({
    success: true,
  });
});
// ======================================================
// Mark Message Seen
// ======================================================

exports.markSeen = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found.",
    });
  }

  const alreadySeen = message.seenBy.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!alreadySeen) {
    message.seenBy.push(req.user._id);

    await message.save();
  }

  const io = getIO();

  io.to(message.conversation.toString()).emit(
    "messageSeen",
    {
      messageId: message._id,
      userId: req.user._id,
    }
  );

  res.status(200).json({
    success: true,
  });
});
