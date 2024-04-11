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
  editOrderRoom,
  getOrderRoomWithStayCustomerId,
  getRoomInfoComeWithRoomId,
} from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/edit", EditRoom);
router.post("/add", add);
router.get("/getRoomWithDate", getRoomWithDate);
router.get("/getRoomInfoComeWithRoomId", getRoomInfoComeWithRoomId);

// OrderRoom
router.get("/getCustomerInRoom", getCustomerInRoom);
router.get("/getOrderRoomWithStayCustomerId", getOrderRoomWithStayCustomerId);
router.post("/orderRoom", OrderRoom);
router.post("/deleteOrderRoom", deleteOrderRoom);
router.post("/editOrderRoom", editOrderRoom);


// lấy kèm query

export default router;
