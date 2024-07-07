
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../services/userApi";
import { useAccountStore } from "../redux/store";
import { useQuery } from "@tanstack/react-query";

function AuthLayout(){
const {account,setAccount} = useAccountStore((state)=>state);

  const location = useLocation();


  const {data,isLoading}=useQuery({
    queryFn:()=>{
      return userApi.validateToken();
    },
    queryKey:["validateToken"],
    
    onSuccess:({message,data})=>{
      setAccount(data)
    },
    onError:()=>{
      // setAccount(undefined);
    },
    retry:false
  }
  )


  
  return !account ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>

   
      {/* <MobileSidebar />  */}
  
      <div className='flex-1 overflow-y-auto'>
       
  
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/dashboard' state={{ from: location }} replace />
  );
  }

  export default AuthLayout;