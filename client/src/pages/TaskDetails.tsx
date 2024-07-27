
import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import {FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../services/taskApi";
import { useForm } from "react-hook-form";
import TaskActivities from "../components/TaskActivities";
import TaskDetailsTab from "../components/TaskDetailsTab";
import TaskAttachments from "../components/TaskAttachments";
import CommentsTab from "../components/CommentsTab";

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
  { title: "Comments", icon: <GoComment/> },
];


const TaskDetails = () => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0);
  // const task = tasks[3];



const {data:task}=useQuery({
  queryFn:()=>{
    return taskApi.getTask({taskId:id});
  },
  queryKey:["task",id]
})
const {data:comments}= useQuery({
  queryFn:()=>{
    return taskApi.getTaskComments({taskId:id})
  }
})


const {mutate:addTaskCommentMutation}=useMutation({
  mutationFn:({formData})=>{
    return taskApi.addTaskComment({formData});
  }
})

const newCommentHandler = ({formData}) =>{
  addTaskCommentMutation({formData})
}


  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 && (
          <>
            <TaskDetailsTab task={task} context="task"/>
          </>
        )}
{
  selected ===1 && (
    <>
      <TaskActivities activity={task?.activities} id={id}  />

    </>
  )
}

{
  selected ===2 && (
    <>
      {id &&<CommentsTab 
      id={id}
      newCommentHandler={newCommentHandler}
      comments={comments}
      />}

    </>
  )
}

      </Tabs>
   
    </div>
    
  );
};


export default TaskDetails