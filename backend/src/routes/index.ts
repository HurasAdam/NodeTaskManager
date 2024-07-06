import express from "express";
import userRoutes from "./userRoutes/userRoutes";
import taskRoutes from "./taskRoutes/taskRoutes";

const router = express.Router();

router.use("/user",userRoutes);
router.use("/task",taskRoutes);

export default router;