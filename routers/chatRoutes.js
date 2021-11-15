import express from "express";
import {
  getChatHistory,
  getRecentChatUsers,
} from "../controllers/chatControllers.js";
import { verifyToken } from "../services/utils.js";

const router = express.Router();

router.get("/getChatHistory/:peerId", verifyToken, getChatHistory);

router.get("/getRecentChatUsers", verifyToken, getRecentChatUsers);

export default router;
