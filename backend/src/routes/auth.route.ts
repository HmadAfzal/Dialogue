import express  from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router =  express.Router();


router.post('/log-in', login)
router.post('/sign-up', signup)
router.post('/logout', logout)
router.get('/me', isAuthenticated,getMe)
export default router