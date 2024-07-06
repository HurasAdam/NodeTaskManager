import express from "express";
import taskController from "../../controllers/task";

const router = express.Router();

router.post("/create", taskController.createTask)


export default router;