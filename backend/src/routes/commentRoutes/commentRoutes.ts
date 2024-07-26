import express from "express";
import { authGuard } from "../../middlewares/authMiddleware";
import { commentController } from "../../controllers/comment";



const router = express.Router();

router.post("/create", commentController.createComment);
router.get("/", commentController.getComments);





export default router;