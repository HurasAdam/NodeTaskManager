import { createTask, dashboardStatistics, duplicateTask, getTask, getTasks, postTaskActivity } from "./taskControllers";



const taskController= {
    createTask,
    duplicateTask,
    postTaskActivity,
    dashboardStatistics,
    getTasks,
    getTask
    
};

export default taskController;