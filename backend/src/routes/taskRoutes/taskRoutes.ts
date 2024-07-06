import express from "express";
import taskController from "../../controllers/task";
import { authGuard } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/create",authGuard, taskController.createTask);
router.post("/duplicate/:id", taskController.duplicateTask);
router.post("/activity/:id", taskController.postTaskActivity);

router.get("/dashboard",taskController.dashboardStatistics );
router.get("/",taskController.getTasks );
router.get("/id",taskController.getTask );
router.put("/id",taskController.updateTask );

export default router;