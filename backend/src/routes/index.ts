import express from "express";
import userRoutes from "./userRoutes/userRoutes";
import taskRoutes from "./taskRoutes/taskRoutes";
import projectRoutes from "./projectRoutes/projectRoutes";

const router = express.Router();

router.use("/user",userRoutes);
router.use("/task",taskRoutes);
router.use("/project",projectRoutes)

export default router;