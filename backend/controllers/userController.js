const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// ======================================================
// Get All Users
// ======================================================

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.user._id },
  }).select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// ======================================================
// Search Users
// ======================================================

exports.searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const users = await User.find({
    _id: { $ne: req.user._id },
    $or: [
      {
        fullName: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        username: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  }).select("-password");

  res.status(200).json({
    success: true,
    users,
  });
});

// ======================================================
// Update Profile
// ======================================================

exports.updateProfile = asyncHandler(async (req, res) => {
  const { fullName, username, bio, theme } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  if (fullName) user.fullName = fullName;
  if (username) user.username = username;
  if (bio) user.bio = bio;
  if (theme) user.theme = theme;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
});