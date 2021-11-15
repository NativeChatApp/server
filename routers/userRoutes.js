import express from "express";
import {
  changePassword,
  updateController,
} from "../controllers/userControllers.js";
import { verifyToken } from "../services/utils.js";

const router = express.Router();

router.post("/update", verifyToken, updateController);

router.post("/changePassword", verifyToken, changePassword);

export default router;
