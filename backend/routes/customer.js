import express from "express";
import {CreateCustomer, ReadAllCustomer, DeleteCustomer} from "../controllers/customer.js"
const router = express.Router();

router.post("/create", CreateCustomer);
router.get("/get/all", ReadAllCustomer)
router.post("/delete", DeleteCustomer);

export default router;