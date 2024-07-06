import express from "express";
import taskController from "../../controllers/task";

const router = express.Router();

router.post("/create", taskController.createTask);
router.post("/duplicate/:id", taskController.duplicateTask);


export default router;