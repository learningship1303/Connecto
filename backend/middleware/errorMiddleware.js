const errorMiddleware = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // ===============================
  // Invalid MongoDB ObjectId
  // ===============================

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Resource not found. Invalid ID: ${err.value}`;
  }

  // ===============================
  // Duplicate Key Error
  // ===============================

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    err.statusCode = 409;
    err.message = `${field} already exists.`;
  }

  // ===============================
  // Mongoose Validation Error
  // ===============================

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");

    err.statusCode = 400;
    err.message = message;
  }

  // ===============================
  // JWT Errors
  // ===============================

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid authentication token.";
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Authentication token has expired.";
  }

  // ===============================
  // Final Response
  // ===============================

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;