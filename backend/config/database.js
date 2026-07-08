const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Missing MONGO_URI environment variable");
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
