import axios from "axios";

const BACKEND_BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL; 


const createProject= async(formData)=>{
const config = {
    withCredentials: true
}
const {data}= await axios.post(`${BACKEND_BASE_URL}/projects/create`,formData,config);
return data;
}

const createSubProject= async({data:formData,projectId})=>{

    const config = {
        withCredentials: true
    }
    const {data}= await axios.put(`${BACKEND_BASE_URL}/projects/create-subproject/${projectId}`,formData,config);
    return data;
    }


    const getProject= async({projectId}:{projectId:string})=>{
 
        const config = {
            withCredentials:true
        }
  
        
        const {data}= await axios.get(`${BACKEND_BASE_URL}/projects/${projectId}`,config);
        return data;
    }


const getProjects= async()=>{
 
const config = {
    withCredentials:true
}



const {data}= await axios.get(`${BACKEND_BASE_URL}/project/projects`,config);
return data;
}


const addProjectActivity = async({projectId, formData})=>{
const config = {
    withCredentials:true
}

const {data}= await axios.post(`${BACKEND_BASE_URL}/projects/activity/${projectId}`,formData,config);
    return data;
}


export const projectsApi={
    getProjects,
    createProject,
    createSubProject,
    getProject,
    addProjectActivity
}