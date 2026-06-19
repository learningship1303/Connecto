// const express = require('express')// method-1
import express from "express"; // method-2
import "dotenv/config";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from "path"

const _dirname = path.resolve()
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin: CLIENT_URL,
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 
app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get('*',(_,res)=>{
//     // console.log(path.join(_dirname, "frontend", "dist", "index.html"));
//     res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
// })
const startServer = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is missing. Add a strong JWT secret to the root .env file.");
    }

    await connectDB();
    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in .env.`);
            process.exit(1);
        }

        console.error(`Server error: ${error.message}`);
        process.exit(1);
    });

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error(`Backend startup failed: ${error.message}`);
    process.exit(1);
});
