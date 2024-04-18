import express from "express";
import {
    CreateCustomer, 
    ReadAllCustomer, 
    ReadCustomerById, 
    ReadCustomerByPersonalId, 
    ReadCustomerByPhoneNumber, 
    ReadCustomerByName, 
    ReadCustomerByType,
    ReadCustomerByManyFilters,
    ReadCurrentCustomersInHotel, 
    ReadCustomerTotalSpent, 
    DeleteCustomer, 
    UpdateCustomer
} from "../controllers/customer.js"
const router = express.Router();

router.post("/create", CreateCustomer);
router.get("/get/all", ReadAllCustomer);
router.get("/get/byId", ReadCustomerById);
router.get("/get/byPersonalId", ReadCustomerByPersonalId);
router.get("/get/byPhoneNumber", ReadCustomerByPhoneNumber);
router.get("/get/byName", ReadCustomerByName);
router.get("/get/byType", ReadCustomerByType)
router.get("/get/byManyFilters", ReadCustomerByManyFilters)
router.get("/get/currentInHotel", ReadCurrentCustomersInHotel)
router.get("/get/totalSpent", ReadCustomerTotalSpent);
router.post("/update", UpdateCustomer);
router.post("/delete", DeleteCustomer);

export default router;