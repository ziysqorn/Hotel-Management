import express from "express";
import {
  get,
  getWithQuery,
  EditRoom,
  add,
  OrderRoom,
  getRoomWithDate,
  getCustomerInRoom,
  deleteOrderRoom,
  editOrderRoom
} from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/edit", EditRoom);
router.post("/add", add);
router.post("/orderRoom", OrderRoom);
router.get("/getRoomWithDate", getRoomWithDate);
router.get("/getCustomerInRoom", getCustomerInRoom);
router.post("/deleteOrderRoom", deleteOrderRoom);
router.post("/editOrderRoom", editOrderRoom);

// lấy kèm query

export default router;
