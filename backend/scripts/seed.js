const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/database");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const seed = async () => {
  await connectDB();

  await Message.deleteMany({});
  await Conversation.deleteMany({});
  await User.deleteMany({});

  const [user1, user2] = await User.create([
    {
      fullName: "Field Operator One",
      username: "field.operator.one",
      email: "field.operator.one@connecto.test",
      password: "password123",
      role: "field_engineer",
      status: "online",
      profileCompleted: true,
    },
    {
      fullName: "Dispatch Supervisor",
      username: "dispatch.supervisor",
      email: "dispatch.supervisor@connecto.test",
      password: "password123",
      role: "supervisor",
      status: "online",
      profileCompleted: true,
    },
  ]);

  const conversation = await Conversation.create({
    participants: [user1._id, user2._id],
    createdBy: user1._id,
    isGroup: false,
  });

  console.log("Seed complete.");
  console.log(`SENDER_ID=${user1._id.toString()}`);
  console.log(`CONVERSATION_ID=${conversation._id.toString()}`);
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
