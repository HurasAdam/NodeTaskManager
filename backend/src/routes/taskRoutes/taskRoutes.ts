import express from "express";
import taskController from "../../controllers/task";
import { authGuard } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authGuard, taskController.createTask);
router.post("/duplicate/:id", authGuard, taskController.duplicateTask);
router.post("/activity/:id", authGuard, taskController.postTaskActivity);

router.get("/dashboard", authGuard, taskController.dashboardStatistics);
router.get("/", authGuard, taskController.getTasks);
router.get("/:id", authGuard, taskController.getTask);
router.put("/:id", authGuard, taskController.updateTask);
router.put("/trash/:id", authGuard, taskController.trashTask);
router.put("/create-subtask/:id", authGuard, taskController.createSubTask);
router.delete(
  "/delete-restore/:id",
  authGuard,
  taskController.deleteRestoreTask
);
export default router;
