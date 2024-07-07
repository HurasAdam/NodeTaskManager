import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
// import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useMutation, useQuery } from "@tanstack/react-query";
import { taskApi } from "../services/taskApi";

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
  const [selected, setSelected]=useState<number>(0);
  const [open, setOpen]=useState<boolean>(false);
  const [loading, setLoading]=useState<boolean>(false);
  const status = params?.status || ""

  const {data:tasks}=useQuery({
    queryFn:()=>{
      return taskApi.getTasks({stage:status});
    },
    queryKey:["tasks",status]
  })


const {mutate}=useMutation({
  mutationFn:(formData)=>{
return taskApi.createTask(formData)
  }
})

const onSave=(formData,actionType)=>{
mutate(formData)
}


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
  onClick={()=>setOpen(true)}
className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
  label="create task" 
  icon={<IoMdAdd className="text-lg"/>}/>
)}
   </div>
   {/* TAB */}
<div>
<Tabs
tabs={TABS}
setSelected={setSelected}
>
  {!status && (
    <div className="w-full flex gap-4 md:gap-x-12 py-4">
      <TaskTitle label="To Do" className={TASK_TYPE.todo}/>
      <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]}/>
      <TaskTitle label="Completed" className={TASK_TYPE.completed}/>
    </div>
  )}

  {selected === 0 ? (<BoardView tasks={tasks}/>):(<Table tasks={tasks}/>)}
  </Tabs>
</div>
<AddTask open={open} setOpen={setOpen} onSave={onSave}/>
  </div>)
}

export default Tasks