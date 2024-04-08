import express from "express";
import { get, getWithQuery, EditRoom, add } from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/edit", EditRoom);
router.post("/add", add);

// lấy kèm query

export default router;
