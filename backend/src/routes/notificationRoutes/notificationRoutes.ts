import express from "express";
import { authGuard } from "../../middlewares/authMiddleware";
import { notificationController } from "../../controllers/notification";



const router = express.Router();


router.get("/", authGuard,notificationController.getNotifications);






export default router;