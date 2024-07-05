import express from "express";
import { adminGuard, authGuard } from "../middlewares/authMiddleware";
import userController from "../controllers/user";
const router = express.Router();

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.post("/logout",userController.logoutUser);
router.post("/get-team",userController.getTeamList);




export default router;