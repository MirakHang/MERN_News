import express from "express";
import { createplayer, getplayers } from "../controllers/player.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createplayer);
router.get("/getplayers", getplayers);

export default router;
