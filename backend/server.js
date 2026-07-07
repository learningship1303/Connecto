const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const http = require("http");
const path = require("path");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoute");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoute");
const { initializeSocket } = require("./socket/socket");

dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.set("io", io);

const getAllowedOrigins = () => {
  const configuredOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URLS,
  ]
    .filter(Boolean)
    .flatMap((originList) => originList.split(","))
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  return [
    ...configuredOrigins,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ];
};

const allowedOrigins = [
  ...new Set(getAllowedOrigins()),
];

const corsOptions = {
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, "");

    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Connecto API",
    networkMode: "offline-first",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/message", messageRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Connecto API listening on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, server, io, startServer };
