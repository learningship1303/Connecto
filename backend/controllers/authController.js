const asyncHandler = require("express-async-handler");
const validator = require("validator");

const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

// ======================================================
// Register User
// ======================================================

exports.registerUser = asyncHandler(async (req, res) => {
  let { fullName, email, password, role } = req.body;

  fullName = fullName?.trim();
  email = email?.trim().toLowerCase();

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  }

  const allowedRoles = ["field_engineer", "supervisor", "admin"];

  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user role.",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already registered.",
    });
  }

  let username =
    fullName.toLowerCase().replace(/\s+/g, "") +
    Math.floor(1000 + Math.random() * 9000);

  while (await User.findOne({ username })) {
    username =
      fullName.toLowerCase().replace(/\s+/g, "") +
      Math.floor(1000 + Math.random() * 9000);
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    role: role || "field_engineer",
  });

  sendToken(user, 201, res);
});

// ======================================================
// Login User
// ======================================================

exports.loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim().toLowerCase();

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter email and password.",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  sendToken(user, 200, res);
});

// ======================================================
// Logout User
// ======================================================

exports.logoutUser = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// ======================================================
// Get Logged In User
// ======================================================

exports.getMyProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
