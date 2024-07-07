
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { userApi } from "../services/userApi";
import { useAccountStore } from "../redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const RootLayout=()=>{
const {account,setAccount} = useAccountStore((state)=>state);

  const location = useLocation();
const navigate = useNavigate();

  const {data,isLoading}=useQuery({
    queryFn:()=>{
      return userApi.validateToken();
    },
    queryKey:["validateToken"],
    
    onSuccess:({message,data})=>{
      setAccount(data)
    },
    onError:()=>{
      setAccount(undefined);
    },
    retry:false
  }
  )


  if(!account){
    return navigate("/log-in")
  }else{
    return  (
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
          <Sidebar />
        </div>
     
        {/* <MobileSidebar />  */}
    
        <div className='flex-1 overflow-y-auto'>
          <Navbar />
    
          <div className='p-4 2xl:px-10'>
            <Outlet />
          </div>
        </div>
      </div>
    ) 
  }
  

  
 
  }

  export default RootLayout;