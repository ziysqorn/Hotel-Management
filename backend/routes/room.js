import express from "express";
import {getAllRoom, getAllRoomWithQuery} from '../controllers/room.js'

const router = express.Router();

router.get("/",getAllRoom);
router.get("/query",getAllRoomWithQuery);

export default router;
