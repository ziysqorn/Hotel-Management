import express, { request, response } from "express";
import { 
    get, 
    getWithQuery, 
    AddEmployee, 
    EditEmployee,
    DeleteEmployee,
    CreateUser,
    UpdateUser,
    DeleteUser,
    getUserQuery,
    getUser} from "../controllers/employee.js";


const router = express.Router();

router.get("/", get);
router.get("/query", getWithQuery);
router.post("/Add", AddEmployee);
router.post("/Edit", EditEmployee);
router.post("/Delete", DeleteEmployee);

router.post("/employ/createUser", CreateUser);
router.post("/employ/updateUser", UpdateUser);
router.post("/employ/deleteUser", DeleteUser);
router.get("/employ/getuser", getUser);
router.get("/employ/userquery", getUserQuery);


// router.get("/",getAll);
// router.get("/query",getAllWithQuery);

export default router;
