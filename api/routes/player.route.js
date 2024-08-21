import express from "express";
import {
  createplayer,
  deleteplayer,
  getplayers,
  updateplayer,
} from "../controllers/player.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createplayer);
router.get("/getplayers", getplayers);
router.delete("/deleteplayer/:playerId/:userId", verifyToken, deleteplayer);
router.put("/updateplayer/:playerId/:userId", verifyToken, updateplayer);

export default router;
