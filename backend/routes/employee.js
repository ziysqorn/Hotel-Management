import express, { request, response } from "express";
import { get, getWithQuery } from "../controllers/employee.js";


const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
 

// router.get("/",getAll);
// router.get("/query",getAllWithQuery);

export default router;
