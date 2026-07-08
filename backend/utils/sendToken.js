const generateToken = require("./generateToken");

const getCookieMaxAge = () => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  const match = expiresIn.match(/^(\d+)([dhm])$/);

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === "d") {
    return value * 24 * 60 * 60 * 1000;
  }

  if (unit === "h") {
    return value * 60 * 60 * 1000;
  }

  return value * 60 * 1000;
};

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const isProduction = process.env.NODE_ENV === "production";

  const options = {
    expires: new Date(Date.now() + getCookieMaxAge()),
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };

  const userData = user.toObject();

  delete userData.password;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: userData,
    });
};

module.exports = sendToken;
