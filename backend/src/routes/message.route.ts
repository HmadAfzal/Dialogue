import express  from "express";
import { getConversations, getMessage, sendMessage } from "../controllers/message.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router =  express.Router();


router.post('/send/:id',isAuthenticated, sendMessage)
router.get('/conversations', isAuthenticated, getConversations)
router.get('/:id', isAuthenticated, getMessage)

export default router
