import { createTask, dashboardStatistics, duplicateTask, getTask, getTasks, postTaskActivity, updateTask } from "./taskControllers";



const taskController= {
    createTask,
    duplicateTask,
    postTaskActivity,
    dashboardStatistics,
    getTasks,
    getTask,
    updateTask,
    
};

export default taskController;