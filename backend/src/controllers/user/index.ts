import { getTeamList, logoutUser, registerUser } from "./userControllers";
import { loginUser } from "./userControllers";

const userController={
    registerUser,
    loginUser,
    logoutUser,
    getTeamList,
}

export default userController;