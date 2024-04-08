import express from "express";
import {
  get,
  getWithQuery,
  EditRoom,
  add,
  OrderRoom,
  getRoomWithDate
} from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/edit", EditRoom);
router.post("/add", add);
router.post("/orderRoom", OrderRoom);
router.get("/getRoomWithDate", getRoomWithDate);

// lấy kèm query

export default router;
