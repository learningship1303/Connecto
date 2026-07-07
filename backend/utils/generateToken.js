const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      id,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

module.exports = generateToken;
