import express from "express";
import {
  get,
  getWithQuery,
  AddService,
  EditService,
  deleteService,
  getUseService,
  getAllUseService,
  addUseService,
  EditUseService,
  deleteUseService,
  createServiceForRoom,
  deleteServiceForRoom,
  editServiceForRoom,
  getServiceForRoom,
  // OrderService,
  // deleteOrderService,
  // editOrderService
} from "../controllers/service.js";
const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/add", AddService);
router.post("/edit", EditService);
router.get("/delete", deleteService);

router.get("/getAllUseService", getAllUseService);
router.get("/getUseService", getUseService);
router.post("/addUseService", addUseService);
router.post("/EditUseService", EditUseService);
router.post("/deleteUseService", deleteUseService);

router.get("/getServiceForRoom", getServiceForRoom);
router.post("/createServiceForRoom", createServiceForRoom);
router.post("/deleteServiceForRoom", deleteServiceForRoom);
router.post("/editServiceForRoom", editServiceForRoom);

export default router;
