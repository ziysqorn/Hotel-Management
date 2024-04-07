import express from "express";
import { get, getWithQuery,EditRoom } from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/post", EditRoom);

// lấy kèm query

export default router;
