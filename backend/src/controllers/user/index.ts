import { getNotificationsList, getTeamList, logoutUser, markNotificationRead, registerUser, updateUserProfile } from "./userControllers";
import { loginUser } from "./userControllers";

const userController={
    registerUser,
    loginUser,
    logoutUser,
    getTeamList,
    getNotificationsList,
    updateUserProfile,
    markNotificationRead,
}

export default userController;