import express from "express";
import { authGuard } from "../../middlewares/authMiddleware";
import { commentController } from "../../controllers/comment";



const router = express.Router();

router.post("/create", authGuard,commentController.createComment);
router.get("/:id", authGuard,commentController.getComments);





export default router;