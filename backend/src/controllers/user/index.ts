import { activateUserProfile, changeUserPassword, deleteUserProfile, getNotificationsList, getTeamList, logoutUser, markNotificationRead, registerUser, updateUserProfile } from "./userControllers";
import { loginUser } from "./userControllers";

const userController={
    registerUser,
    loginUser,
    logoutUser,
    getTeamList,
    getNotificationsList,
    updateUserProfile,
    markNotificationRead,
    changeUserPassword,
    activateUserProfile,
    deleteUserProfile
}

export default userController;