import express from "express";
import { adminGuard, authGuard } from "../../middlewares/authMiddleware";
import userController from "../../controllers/user/index";
const router = express.Router();

router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.post("/logout",userController.logoutUser);
router.get("/get-team",authGuard,userController.getTeamList);
router.get("/notifications",userController.getNotificationsList);
router.put("/update-profile",userController.updateUserProfile);
router.put("/read-notification",userController.markNotificationRead);
router.put("/change-password",userController.changeUserPassword);
router.post("/validateToken",authGuard,userController.validateToken);

router
  .route("/:id")
  .put( userController.activateUserProfile)
  .delete( userController.deleteUserProfile);

export default router;