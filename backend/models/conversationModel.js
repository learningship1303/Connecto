const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    isGroup: {
      type: Boolean,
      default: false,
    },

    groupName: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },

    groupAvatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.pre("validate", function () {
  this.type = this.isGroup ? "group" : "direct";
});

conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

module.exports = mongoose.model(
  "Conversation",
  conversationSchema
);
