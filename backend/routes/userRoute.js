const express = require("express");

const {
  getAllUsers,
  searchUsers,
  updateProfile,
} = require("../controllers/userController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);

router.get("/search", isAuthenticated, searchUsers);

router.put("/update", isAuthenticated, updateProfile);

module.exports = router;