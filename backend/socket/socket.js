const { Server } = require("socket.io");

let io;

const userSocketMap = {};

const initializeSocket = (server) => {
  const configuredOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URLS,
  ]
    .filter(Boolean)
    .flatMap((originList) => originList.split(","))
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  const allowedOrigins = [
    ...new Set([
      ...configuredOrigins,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ]),
  ];

  io = new Server(server, {
    cors: {
      origin(origin, callback) {
        const normalizedOrigin = origin?.replace(/\/$/, "");

        if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by Socket.io CORS"));
      },
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;

      socket.join(userId);

      io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
      );
    }

    socket.on("joinConversation", (conversationId) => {
      if (conversationId) {
        socket.join(conversationId.toString());
        console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
      }
    });

    socket.on("leaveConversation", (conversationId) => {
      if (conversationId) {
        socket.leave(conversationId.toString());
        console.log(`Socket ${socket.id} left conversation ${conversationId}`);
      }
    });

    socket.on("send_message", (messageData) => {
      if (!messageData?.conversationId) {
        return;
      }

      socket
        .to(messageData.conversationId.toString())
        .emit("receive_message", messageData);
    });

    socket.on("typing", (typingData) => {
      if (!typingData?.conversationId) {
        return;
      }

      socket
        .to(typingData.conversationId.toString())
        .emit("typing", {
          conversationId: typingData.conversationId.toString(),
          userId: typingData.userId || userId,
          fullName: typingData.fullName || "Field Operator",
        });
    });

    socket.on("stop_typing", (typingData) => {
      if (!typingData?.conversationId) {
        return;
      }

      socket
        .to(typingData.conversationId.toString())
        .emit("stop_typing", {
          conversationId: typingData.conversationId.toString(),
          userId: typingData.userId || userId,
          fullName: typingData.fullName || "Field Operator",
        });
    });

    socket.on("disconnect", () => {
      console.log(
        "Socket disconnected:",
        socket.id
      );

      delete userSocketMap[userId];

      io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
      );
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }

  return io;
};

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

module.exports = {
  initializeSocket,
  getIO,
  getReceiverSocketId,
  userSocketMap,
};
