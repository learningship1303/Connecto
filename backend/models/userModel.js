const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 40,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },

    // Optional for future Google OAuth support
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default:
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
    },

    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },

    status: {
      type: String,
      enum: ["online", "offline", "away"],
      default: "offline",
    },

    role: {
      type: String,
      enum: ["field_engineer", "supervisor", "admin"],
      default: "field_engineer",
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "dark",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ================= Password Hash =================

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

// ================= Compare Password =================

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
