import React, { useState } from 'react'
import Title from '../components/Title'
import Loader from '../components/Loader'
import { IoMdAdd } from 'react-icons/io';
import Button from '../components/Button';
import { FaList } from "react-icons/fa";
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import Table from '../components/task/Table';
import { MdGridView } from 'react-icons/md';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { projectsApi } from '../services/projectsApi';
import { useParams } from 'react-router-dom';
import AddNew from '../components/project/AddNew';


const TABS=[
  {title:"Board View", icon:<MdGridView/>},
  {title:"Last View", icon:<FaList/>},
]

const PROJECT_TYPE={
  todo:"bg-blue-600",
  "in progress":"bg-amber-600",
  completed:"bg-green-600"
}

enum ActionType {
  CREATE_PROJECT = "CREATE_PROJECT",
}

const Projects = () => {
  const params= useParams()
  const [selected, setSelected]=useState<number>(0);
  const [open, setOpen]=useState<boolean>(false);
  const loading= false;
  const status = params?.status || ""
  const queryClient = useQueryClient();
  const {data:projects}=useQuery({
  queryFn:()=>{
    return projectsApi.getProjects({stage:status});
  },
  queryKey:["projects",status]
})

const {mutate} = useMutation({
  mutationFn:(FormData)=>{
    return projectsApi.createProject(FormData)
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(["projects"])

    setOpen(false);
  }
})



const onSave = ({formData, ActionType}) => {
  switch(ActionType){
    case ActionType.CREATE_PROJECT:
      mutate(formData);
      break;
    default: 
      throw new Error("Unknown action type");
  }
}




  return loading? (
    <div className="py-10">
      <Loader/>
    </div>
  ):
  (<div className="w-full">
   <div className="flex items-center justify-between mb-4">
<Title title={status? `${status} Projects`:"Projects"}/>
{!status &&(
  <Button 
  onClick={()=>setOpen(true)}
className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
  label="create project" 
  icon={<IoMdAdd className="text-lg"/>}/>
)}
   </div>
   {/* TAB */}
<div>
<Tabs
tabs={TABS}
setSelected={setSelected}
>
  {/* {!status && (
    <div className="w-full flex gap-4 md:gap-x-12 py-4">
      <TaskTitle label="To Do" className={TASK_TYPE.todo}/>
      <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]}/>
      <TaskTitle label="Completed" className={TASK_TYPE.completed}/>
    </div>
  )} */}

  {selected === 0 ? (<BoardView type="project" data={projects}/>):(<Table tasks={projects}/>)}
  </Tabs>
</div>
  <AddNew open={open} setOpen={setOpen} onSave={onSave}/>
  </div>)
}

export default Projects