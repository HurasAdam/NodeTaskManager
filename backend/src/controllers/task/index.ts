import { createSubTask, createTask, dashboardStatistics, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from "./taskControllers";



const taskController= {
    createTask,
    duplicateTask,
    postTaskActivity,
    dashboardStatistics,
    getTasks,
    getTask,
    updateTask,
    trashTask,
    createSubTask,
    
};

export default taskController;