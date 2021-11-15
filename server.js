import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import socketConnection from "./services/socketConnection.js";
import mongoConnect from "./config/dbConnection.js";
import userRoutes from "./routers/userRoutes.js";
import chatRoutes from "./routers/chatRoutes.js";
import authRoutes from "./routers/authRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoConnect();

const server = createServer(app);
const io = new Server(server, {});

socketConnection(io);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server is Running...");
});