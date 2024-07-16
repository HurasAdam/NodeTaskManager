import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const createTask = async (formData) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(`${BACKEND_BASE_URL}/task/create`, formData, config);
  return data;
};

const deleteTask = async (taskId) => {
  const config = {
    withCredentials: true,
    data: { taskId },
  };
  const { data } = await axios.delete(`${BACKEND_BASE_URL}/task/delete`, config);
  return data;
};

const createSubTask = async ({ data: formData, taskId }) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.put(`${BACKEND_BASE_URL}/task/create-subtask/${taskId}`, formData, config);
  return data;
};

const getTask = async ({ taskId }) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(`${BACKEND_BASE_URL}/task/${taskId}`, config);
  return data;
};

const getTasks = async ({ stage, isTrashed }) => {
  const config = {
    withCredentials: true,
  };

  const queryParams = new URLSearchParams();
  queryParams.append("stage", stage || "");
  queryParams.append("isTrashed", isTrashed || "");

  const { data } = await axios.get(`${BACKEND_BASE_URL}/task?${queryParams}`, config);
  return data;
};

const addTaskActivity = async ({ taskId }) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(`${BACKEND_BASE_URL}/task/activity/${taskId}`, config);
  return data;
};

const duplicateTask = async ({ taskId }) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.post(`${BACKEND_BASE_URL}/task/duplicate/${taskId}`, config);
  return data;
};

export const taskApi = {
  getTasks,
  createTask,
  createSubTask,
  getTask,
  addTaskActivity,
  deleteTask,
  duplicateTask,
};
