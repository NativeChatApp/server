import express from "express";
import {
  changePassword,
  searchUser,
  updateController,
} from "../controllers/userControllers.js";
import { verifyToken } from "../services/utils.js";

const router = express.Router();

router.post("/update", verifyToken, updateController);

router.post("/changePassword", verifyToken, changePassword);

router.get("/searchUser/:key", verifyToken, searchUser);

export default router;
