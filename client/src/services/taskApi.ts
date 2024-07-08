import axios from "axios";

const BACKEND_BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL; 


const createTask= async(formData)=>{
const config = {
    withCredentials: true
}
const {data}= await axios.post(`${BACKEND_BASE_URL}/task/create`,formData,config);
return data;
}

const createSubTask= async({data:formData,taskId})=>{
    console.log("FORMDATA")
    console.log(formData)
    const config = {
        withCredentials: true
    }
    const {data}= await axios.put(`${BACKEND_BASE_URL}/task/create-subtask/${taskId}`,formData,config);
    return data;
    }


const getTasks= async({stage,isTrashed}:{stage:string, isTrashed:string})=>{
 
const config = {
    withCredentials:true
}

const queryParams = new URLSearchParams();
queryParams.append("stage",stage || "");
queryParams.append("isTrashed",isTrashed || "");

const {data}= await axios.get(`${BACKEND_BASE_URL}/task?${queryParams}`,config);
return data;
}








export const taskApi={
    getTasks,
    createTask,
    createSubTask
}