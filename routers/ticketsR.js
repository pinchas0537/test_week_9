import express from "express";
import { validUser } from "../middleare/eventM.js";
import { addTicket } from "../cntrl/ticketsC.js";
import { getSumByUsername } from "../cntrl/usersC.js";


const router = express.Router()

router.post("/tickets/buy",validUser,addTicket);

router.get("/:username/summary",getSumByUsername)

export default router