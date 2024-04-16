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
  deleteRoom,
  getOrderRoomWithQuery,
  getAllCusomterInRoom

} from "../controllers/room.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/edit", EditRoom);
router.post("/add", add);
router.get("/delete", deleteRoom);

router.get("/getRoomWithDate", getRoomWithDate);
router.get("/getRoomInfoComeWithRoomId", getRoomInfoComeWithRoomId);
router.get("/getAllCusomterInRoom", getAllCusomterInRoom);


// OrderRoom
router.get("/getCustomerInRoom", getCustomerInRoom);
router.get("/getOrderRoomWithStayCustomerId", getOrderRoomWithStayCustomerId);
router.get("/getOrderRoomWithQuery", getOrderRoomWithQuery);
router.post("/orderRoom", OrderRoom);
router.post("/deleteOrderRoom", deleteOrderRoom);
router.post("/editOrderRoom", editOrderRoom);


// lấy kèm query

export default router;
