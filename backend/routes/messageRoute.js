const express = require("express");

const {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
  markDelivered,
  markSeen,
} = require("../controllers/messageController");

const {
  isAuthenticated,
} = require("../middleware/isAuthenticated");

const router = express.Router();

// ==========================================
// Message Routes
// ==========================================

// Send Message
router.post(
  "/",
  isAuthenticated,
  sendMessage
);

// Get All Messages of a Conversation
router.get(
  "/:conversationId",
  isAuthenticated,
  getMessages
);

// Edit Message
router.put(
  "/:messageId",
  isAuthenticated,
  editMessage
);

// Delete Message
router.delete(
  "/:messageId",
  isAuthenticated,
  deleteMessage
);

// Mark Message Delivered
router.put(
  "/deliver/:messageId",
  isAuthenticated,
  markDelivered
);

// Mark Message Seen
router.put(
  "/seen/:messageId",
  isAuthenticated,
  markSeen
);

module.exports = router;
