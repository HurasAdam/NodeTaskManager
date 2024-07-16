import express from "express";
import { authGuard } from "../../middlewares/authMiddleware";
import { projectController } from "../../controllers/project";


const router = express.Router();

router.post("/create",authGuard, projectController.createProject);
router.get("/projects",authGuard, projectController.getProjects);




export default router;