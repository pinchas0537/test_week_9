import express from "express";
import { addEvent } from "../cntrl/eventC.js";
import { validUser } from "../middleare/eventM.js";


const router = express.Router()

router.post("/events",validUser,addEvent);



export default router