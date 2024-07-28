import express from "express";
import { authGuard } from "../../middlewares/authMiddleware";
import { commentController } from "../../controllers/comment";



const router = express.Router();

router.post("/create", authGuard,commentController.createComment);
router.get("/:id", authGuard,commentController.getComments);
router.put("/update/:id", authGuard,commentController.updateComment);
router.delete("/delete/:id", authGuard,commentController.deleteComment);
router.post("/like/:id", authGuard,commentController.likeTaskComment);
router.post("/unlike/:id", authGuard,commentController.unlikeTaskComment);





export default router;