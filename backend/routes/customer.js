import express from "express";
import {
    CreateCustomer, 
    ReadAllCustomer, 
    NumberOfCustomers,
    NumberOfCustomersInHotel,
    NumberOfCustomerOutside,
    ReadCustomerById, 
    ReadCustomerByPersonalId, 
    ReadCustomerByPhoneNumber, 
    ReadCustomerByName, 
    ReadCustomerByType,
    ReadCustomerByManyFilters,
    ReadInHotelByPersonalId,
    ReadInHotelByPhoneNumber,
    ReadInHotelByName,
    ReadInHotelByType,
    ReadCurrentCustomersInHotel,
    ReadResidenceHistory,
    ReadInHotelById,
    ReadCustomerTotalSpent, 
    DeleteCustomer, 
    UpdateCustomer
} from "../controllers/customer.js"
const router = express.Router();

router.post("/create", CreateCustomer);
router.get("/get/all", ReadAllCustomer);
router.get("/get/number", NumberOfCustomers);
router.get("/get/number/inHotel", NumberOfCustomersInHotel);
router.get("/get/number/outsideHotel", NumberOfCustomerOutside);
router.get("/get/byId", ReadCustomerById);
router.get("/get/byPersonalId", ReadCustomerByPersonalId);
router.get("/get/byPhoneNumber", ReadCustomerByPhoneNumber);
router.get("/get/byName", ReadCustomerByName);
router.get("/get/byType", ReadCustomerByType);
router.get("/get/byManyFilters", ReadCustomerByManyFilters);
router.get("/get/currentInHotel", ReadCurrentCustomersInHotel);
router.get("/get/currentInHotelById", ReadInHotelById);
router.get("/get/currentInHotel/byPersonalId", ReadInHotelByPersonalId);
router.get("/get/currentInHotel/byPhoneNumber", ReadInHotelByPhoneNumber);
router.get("/get/currentInHotel/byName", ReadInHotelByName);
router.get("/get/currentInHotel/byType", ReadInHotelByType);
router.get("/get/residenceHistory", ReadResidenceHistory)
router.get("/get/totalSpent", ReadCustomerTotalSpent);
router.post("/update", UpdateCustomer);
router.post("/delete", DeleteCustomer);

export default router;