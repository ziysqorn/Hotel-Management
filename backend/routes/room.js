import express from "express";
import {
  get,
  getWithQuery,
  UpdateRoom,
  CreateRoom,
  CreateOrderRoom,
  getRoomWithDate,
  getCustomerInRoom,
  DeleteOrderRoom,
  UpdateOrderRoom,
  getOrderRoomWithStayCustomerId,
  getRoomInfoComeWithRoomId,
  DeleteRoom,
  getOrderRoomWithQuery,
  getAllCusomterInRoom,
  ReadOrderRoom,
  CreateRoomType,
  UpdateRoomType,
  ReadRoomType,
  DeleteRoomType,
} from "../controllers/room.js";
const router = express.Router();
// room
router.get("/get", get);
router.get("/query", getWithQuery);
router.post("/UpdateRoom", UpdateRoom);
router.post("/CreateRoom", CreateRoom);
router.get("/DeleteRoom", DeleteRoom);

router.get("/getRoomWithDate", getRoomWithDate);
router.get("/getRoomInfoComeWithRoomId", getRoomInfoComeWithRoomId);
router.get("/getAllCusomterInRoom", getAllCusomterInRoom);

// OrderRoom
router.get("/getCustomerInRoom", getCustomerInRoom);
router.get("/getOrderRoomWithStayCustomerId", getOrderRoomWithStayCustomerId);
router.get("/getOrderRoomWithQuery", getOrderRoomWithQuery);

// OrderRoom
router.post("/CreateOrderRoom", CreateOrderRoom);
router.post("/UpdateOrderRoom", UpdateOrderRoom);
router.get("/ReadOrderRoom", ReadOrderRoom);
router.post("/DeleteOrderRoom", DeleteOrderRoom);

router.post("/CreateRoomType", CreateRoomType);
router.post("/UpdateRoomType", UpdateRoomType);
router.get("/ReadRoomType", ReadRoomType);
router.post("/DeleteRoomType", DeleteRoomType);

export default router;
