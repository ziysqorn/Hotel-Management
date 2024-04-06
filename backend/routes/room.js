import express from "express";
import { get, getWithQuery,EditRoom } from "../controllers/room.js";
const router = express.Router();

router.get("/", getWithQuery);
router.get("/", get);
router.post("/post", EditRoom);

// lấy kèm query

export default router;
