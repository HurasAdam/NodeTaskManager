import express from "express";
import { adminGuard, authGuard } from "../middlewares/authMiddleware";
import userController from "../controllers/user";
const router = express.Router();

router.post("/register",userController.registerUser);





export default router;