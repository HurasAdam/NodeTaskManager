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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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


enum ActionType {
  CREATE_TASK = "CREATE_TASK",
  CREATE_SUBTASK = "CREATE_SUBTASK",
}

const Tasks:React.FC = () => {
  const params= useParams()
  const [selected, setSelected]=useState<number>(0);
  const [open, setOpen]=useState<boolean>(false);
  const [loading, setLoading]=useState<boolean>(false);
  const status = params?.status || ""
const queryClient = useQueryClient();
  const {data:tasks}=useQuery({
    queryFn:()=>{
      return taskApi.getTasks({stage:status});
    },
    queryKey:["tasks",status]
  })


const {mutate}=useMutation({
  mutationFn:(formData)=>{
return taskApi.createTask(formData)
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(["tasks"])

     setOpen(false);
  }
})


const {mutate:subtaskMutate}=useMutation({
  mutationFn:(formData)=>{
    return taskApi.createSubTask(formData);
  },
  onSuccess:()=>{
      queryClient.invalidateQueries(["tasks"])
       setOpen(false);
  }
})


const onSave=({formData,actionType})=>{
  switch (actionType) {
    case ActionType.CREATE_TASK:
      mutate(formData);
      break;
    case ActionType.CREATE_SUBTASK:
      subtaskMutate(formData);
      break;
    default:
      throw new Error("Unknown action type");
  }

}
const handleSave=({taskId,formData})=>{
  subtaskMutate({taskId,formData})
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

  {selected === 0 ? (<BoardView onSave={onSave} tasks={tasks}/>):(<Table tasks={tasks}/>)}
  </Tabs>
</div>
<AddTask open={open} setOpen={setOpen} onSave={onSave}/>
  </div>)
}

export default Tasks