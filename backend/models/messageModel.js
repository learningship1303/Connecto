const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    clientMessageId: {
      type: String,
      required: [true, "Client message ID is required"],
      unique: true,
      index: true,
      trim: true,
      immutable: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "delivered"],
      default: "sent",
      index: true,
    },

    attachments: [
      {
        public_id: String,
        url: String,
        fileName: String,
        fileType: String,
      },
    ],

    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    deliveredTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    edited: {
      type: Boolean,
      default: false,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ conversation: 1, createdAt: 1 });
messageSchema.index({ sender: 1, createdAt: -1 });

module.exports = mongoose.model(
  "Message",
  messageSchema
);
