import express  from "express";
import { getMessage } from "../controllers/message.controllers.js";
const router =  express.Router();


router.get('/message', getMessage)


export default router
