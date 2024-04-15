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
  OrderService,
  deleteOrderService,
  editOrderService 

} from "../controllers/service.js";
const router = express.Router();


router.get("/", get);
router.get("/query", getWithQuery);
router.post("/add", AddService);
router.post("/edit", EditService);
router.post("/delete", deleteService);

router.get("/useService", getUseService);
router.get("/getAll", getAllUseService);
router.post("/addUseService",addUseService );
router.post("/edit/useservice", EditUseService);
router.post("/delete/useservice", deleteUseService);

router.post("/orderUseService", OrderService);
router.post("/deleteOrderService", deleteOrderService);
router.post("/editOrderService",editOrderService );

export default router;