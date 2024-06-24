import React, { Fragment, useState } from "react";
import {Menu,Transition} from "@headlessui/react";
import {FaUser, FaUserLock} from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";

const UserAvatar:React.FC = () => {
const [open,setOpen]=useState<boolean>(false);
const [openPassword,setOpenPassword]=useState<boolean>(false);
const {user} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const logoutHandler = ()=>{
    console.log("Logout");
};
  return (
    <div className="">
<Menu 
className="relative inline-block text-left"
as="div">
<div>
    <Menu.Button
    className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600"
    >
<span className="text-white font-semibold">
{/* {getInitials(user?.name)} */}
</span>
    </Menu.Button>
</div>

<Transition
as={Fragment}
enter="transtion ease-out duration-100"
enterFrom="transform opacity-0 scale-95"
enterTo="transform opacity-100 scale-100"
leave="transition easy-in duration-75"
leaveFrom="transform opacity-100 scale-100"
leaveTo="transform opacity-0 scale-95"
>
<Menu.Items className="absolute right-0 mt-2 w-56  origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none ">

<div className="p-4">
<Menu.Item>
    {({active})=>(
        <button
        className="text-gray-700 group flex w-full items-center rounded-md px-2 py2 text-base"
        onClick={()=>setOpen(true)}
        >
<FaUser className="mr-2" aria-hidden="true"/>
        </button>
    )}
</Menu.Item>
</div>


</Menu.Items>
</Transition>

</Menu>
    </div>
  );
};

export default UserAvatar