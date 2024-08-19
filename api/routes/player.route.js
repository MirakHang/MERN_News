import express from "express";
import {
  createplayer,
  deleteplayer,
  getplayers,
} from "../controllers/player.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createplayer);
router.get("/getplayers", getplayers);
router.delete("/deleteplayer/:playerId/:userId", verifyToken, deleteplayer);

export default router;
