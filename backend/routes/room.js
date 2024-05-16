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
  getOrderRoomWithStartDateEndDateCustomerId,
  ReadBill,
  CreateBill,
  UpdateBill,
  ReadBillJoinCustomer,
  DeleteBill,
} from "../controllers/room.js";
const router = express.Router();
// room
router.get("/query", getWithQuery);
router.get("/get", get);
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
router.get(
  "/getOrderRoomWithStartDateEndDateCustomerId",
  getOrderRoomWithStartDateEndDateCustomerId
);

// OrderRoom
router.post("/CreateOrderRoom", CreateOrderRoom);
router.post("/UpdateOrderRoom", UpdateOrderRoom);
router.get("/ReadOrderRoom", ReadOrderRoom);
router.post("/DeleteOrderRoom", DeleteOrderRoom);

router.post("/CreateRoomType", CreateRoomType);
router.post("/UpdateRoomType", UpdateRoomType);
router.get("/ReadRoomType", ReadRoomType);
router.post("/DeleteRoomType", DeleteRoomType);

router.get("/ReadBillJoinCustomer", ReadBillJoinCustomer);
router.get("/ReadBill", ReadBill);
router.post("/CreateBill", CreateBill);
router.post("/UpdateBill", UpdateBill);
router.post("/DeleteBill", DeleteBill);
export default router;
