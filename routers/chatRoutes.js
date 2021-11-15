import express from "express";
import {
  getChatHistory,
  getRecentChatUsers,
} from "../controllers/chatControllers.js";
import { verifyToken } from "../services/utils.js";

const router = express.Router();

router.post("/getChatHistory", verifyToken, getChatHistory);

router.post("/getRecentChatUsers", verifyToken, getRecentChatUsers);

export default router;
