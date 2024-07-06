import { getNotificationsList, getTeamList, logoutUser, registerUser, updateUserProfile } from "./userControllers";
import { loginUser } from "./userControllers";

const userController={
    registerUser,
    loginUser,
    logoutUser,
    getTeamList,
    getNotificationsList,
    updateUserProfile,
}

export default userController;