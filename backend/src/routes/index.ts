import express from "express";
import userRoutes from "./userRoutes/userRoutes";
import taskRoutes from "./taskRoutes/taskRoutes";
import projectRoutes from "./projectRoutes/projectRoutes";
import commentRoutes from "./commentRoutes/commentRoutes";
import notificationRoutes from "./notificationRoutes/notificationRoutes";

const router = express.Router();

router.use("/user",userRoutes);
router.use("/task",taskRoutes);
router.use("/project",projectRoutes);
router.use("/comments",commentRoutes);
router.use("/notifications",notificationRoutes)

export default router;