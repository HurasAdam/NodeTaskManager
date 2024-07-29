import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

// import { setOpenSidebar } from "../redux/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { useAccountStore } from "../redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../services/userApi";

const Navbar:React.FC = ({notifications}) => {
    const {account}=useAccountStore((state)=>state.account);
    const queryClient= useQueryClient();

    const {mutate}=useMutation({
      mutationFn:()=>{
        return userApi.userLogout()
      },
      onSuccess:()=>{
queryClient.invalidateQueries(["validateToken"])
      }
    })
    
    
        const logoutHandler = () => {
          console.log("logout");
          mutate()
        };


  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">

       <div className="flex gap-4">
<button 
onClick={()=>dispatch(setOpenSidebar(true))}
className="text-2xl text-gray-500 block md:hidden">
<GiHamburgerMenu/>
</button>

<div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
<MdOutlineSearch/>
<input 
placeholder="Search..."
className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
type="text" />
</div>
       </div>

<div className="flex gap-2 items-center">
<NotificationPanel notifications={notifications}/>
<UserAvatar logoutHandler={logoutHandler}/>
</div>

    </div>
  )
}

export default Navbar