import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
} from "./taskControllers";

const taskController = {
  createTask,
  duplicateTask,
  postTaskActivity,
  dashboardStatistics,
  getTasks,
  getTask,
  updateTask,
  trashTask,
  createSubTask,
  deleteRestoreTask,
};

export default taskController;
