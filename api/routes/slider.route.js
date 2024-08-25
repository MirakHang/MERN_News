import express from "express";
import {
  addsliderimage,
  getsliderimages,
  updatesliderimage,
} from "../controllers/slider.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/addsliderimage", verifyToken, addsliderimage);
router.get("/getsliderimage", getsliderimages);
router.put(
  "/updatesliderimage/:imageId/:userId",
  verifyToken,
  updatesliderimage
);

export default router;
