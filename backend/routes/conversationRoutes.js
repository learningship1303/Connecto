const express = require("express");

const {
  createConversation,
  getMyConversations,
} = require("../controllers/conversationController");

const {
  isAuthenticated,
} = require("../middleware/isAuthenticated");

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  createConversation
);

router.get(
  "/",
  isAuthenticated,
  getMyConversations
);

module.exports = router;