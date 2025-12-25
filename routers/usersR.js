import express from "express";
import { addUser } from "../cntrl/usersC.js";

const router = express.Router()

router.post("/register",addUser);



export default router