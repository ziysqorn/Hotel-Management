import express, { request, response } from "express";
import { 
    get, 
    getWithQuery, 
    AddEmployee, 
    EditEmployee,
    DeleteEmployee} from "../controllers/employee.js";


const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/Add", AddEmployee);
router.post("/Edit", EditEmployee);
router.post("/Delete", DeleteEmployee);

// router.get("/",getAll);
// router.get("/query",getAllWithQuery);

export default router;
