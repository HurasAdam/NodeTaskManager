import axios from "axios";
import TasksType from "../types/taskTypes";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const createTask = async (formData: any) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/task/create`,
    formData,
    config
  );
  return data;
};

const deleteTask = async ({ taskId } : { taskId : number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.put(
    `${BACKEND_BASE_URL}/task/trash/${taskId}`,
    {},
    config
  );
  return data;
};

const createSubTask = async ({ data: formData, taskId }: { data: any, taskId: number }) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.put(
    `${BACKEND_BASE_URL}/task/create-subtask/${taskId}`,
    formData,
    config
  );
  return data;
};

const getTask = async ({ taskId } : {taskId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    `${BACKEND_BASE_URL}/task/${taskId}`,
    config
  );
  return data;
};

const getTasks = async ({ stage, isTrashed } : {stage?: string, isTrashed?: string}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };

  const queryParams = new URLSearchParams();
  queryParams.append("stage", stage || "");
  queryParams.append("isTrashed", isTrashed || "");

  const { data } = await axios.get(
    `${BACKEND_BASE_URL}/task?${queryParams}`,
    config
  );
  return data;
};


const updateTask = async (formData : any) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const {data:taskData,taskId}= formData;
  const { data } = await axios.put(
    `${BACKEND_BASE_URL}/task/${taskId}`,
    taskData,
    config
  );
  return data;
};

const addTaskActivity = async ({ taskId, formData } : {taskId: number, formData: any}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/task/activity/${taskId}`,
    formData,
    config
  );
  return data;
};

const duplicateTask = async ({ taskId } : {taskId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/task/duplicate/${taskId}`,
    {},
    config
  );
  return data;
};

const removeTask = async ({ taskId } : {taskId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.delete(
    `${BACKEND_BASE_URL}/task/delete-restore/${taskId}?actionType=delete`,
    config
  );
  return data;
};

const removeAllTasks = async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.delete(
    `${BACKEND_BASE_URL}/task/delete-restore-all/?actionType=deleteAll`,
    config
  );
  return data;
};

const restoreTask = async ({ taskId } : {taskId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.delete(
    `${BACKEND_BASE_URL}/task/delete-restore/${taskId}?actionType=restore`,
    config
  );
  return data;
};

const restoreAllTask = async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.delete(
    `${BACKEND_BASE_URL}/task/delete-restore-all/?actionType=restoreAll`,
    config
  );
  return data;
};

const getTaskComments = async ({ taskId } : {taskId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    `${BACKEND_BASE_URL}/comments/${taskId}`,
    config
  );
  return data;
};
const addTaskComment = async ({formData} : {formData: any}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/comments/create`,formData,
    config
  );
  return data;
};

const editTaskComment = async ({formData} : {formData: any}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };
  const {data:dataa,commentId} = formData;
  const { data } = await axios.put(
    `${BACKEND_BASE_URL}/comments/update/${commentId}`,dataa,
    config
  );
  return data;
}

const deleteTaskComment = async({commentId} : {commentId: number}) : Promise<TasksType> =>{
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.delete(
    `${BACKEND_BASE_URL}/comments/delete/${commentId}`,
    config
  );
  return data;
}

const likeTaskComment = async({commentId} : {commentId: number}) : Promise<TasksType> => {
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/comments/like/${commentId}`,{},
    config
  );
  return data;
}


const unlikeTaskComment = async({commentId} : {commentId: number}) : Promise<TasksType> =>{
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.post(
    `${BACKEND_BASE_URL}/comments/unlike/${commentId}`,{},
    config
  );
  return data;
}

export const taskApi = {
  getTasks,
  createTask,
  createSubTask,
  getTask,
  updateTask,
  addTaskActivity,
  deleteTask,
  duplicateTask,
  removeTask,
  restoreTask,
  removeAllTasks,
  restoreAllTask,
  addTaskComment,
  getTaskComments,
  editTaskComment,
  deleteTaskComment,
  likeTaskComment,
  unlikeTaskComment
};
