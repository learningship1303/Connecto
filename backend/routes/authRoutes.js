const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
} = require("../controllers/authController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);
router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
