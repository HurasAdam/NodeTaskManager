import axios from "axios"
const BACKEND_BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL; 




const userLogin= async({email,password}:{email:string, password:string})=>{
    const config = {
        withCredentials: true
      };

    const {data}= await axios.post(`${BACKEND_BASE_URL}/user/login`,{email,password},config)
    return data;
}

export const validateToken = async()=>{
    const config = {
      withCredentials:true,
    
    }
      const {data}= await axios.post(`${BACKEND_BASE_URL}/user/validateToken`,{},config);
      return data;
    }




const userLogout= async()=>{
    const config = {
        withCredentials: true
      };

    const {data}= await axios.post(`${BACKEND_BASE_URL}/user/logout`,{},config)
    return data;
}


const getUsers= async()=>{
  const config = {
    withCredentials:true
  }
  const {data}= await axios.get(`${BACKEND_BASE_URL}/user/get-team`,config);
  return data;
}


export const userApi={
    userLogin,
    validateToken,
    userLogout,
    getUsers
}