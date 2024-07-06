import express from "express";
import taskController from "../../controllers/task";

const router = express.Router();

router.post("/create", taskController.createTask);
router.post("/duplicate/:id", taskController.duplicateTask);
router.post("/activity/:id", taskController.postTaskActivity);

router.get("/dashboard",taskController.dashboardStatistics );
router.get("/",taskController.getTasks );
router.get("/id",taskController.getTask );

export default router;