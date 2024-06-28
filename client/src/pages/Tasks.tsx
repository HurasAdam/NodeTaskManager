import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { DiVim } from "react-icons/di";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";

const TABS=[
  {title:"Board View", icon:<MdGridView/>},
  {title:"Last View", icon:<FaList/>},
]

const TASK_TYPE={
  todo:"bg-blue-600",
  "in progress":"bg-amber-600",
  completed:"bg-green-600"
}

const Tasks:React.FC = () => {
  const params= useParams()
  const [selected, setSelected]=useState(0);
  const [open, setOpen]=useState<boolean>(false);
  const [loading, setLoading]=useState<boolean>(false);
  const status = params?.status || ""
  return loading? (
    <div className="py-10">
      <Loader/>
    </div>
  ):
  (<div className="w-full">
   <div className="flex items-center justify-between mb-4">
<Title title={status? `${status} Tasks`:"Tasks"}/>
{!status &&(
  <Button 
className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
  label="create task" 
  icon={<IoMdAdd className="text-lg"/>}/>
)}
   </div>
  </div>)
}

export default Tasks