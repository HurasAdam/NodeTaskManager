
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
import * as enums from "../enums/index";
import { toast } from "sonner";

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
  const [isInEditMode,setIsInEditMode]=useState("");
  const [selected, setSelected] = useState(0);
const queryClient = useQueryClient();



const {data:task}=useQuery({
  queryFn:()=>{
    return taskApi.getTask({taskId:id});
  },
  queryKey:["task",id]
})
const {data:comments}= useQuery({
  queryFn:()=>{
    return taskApi.getTaskComments({taskId:id})
  },
  queryKey:["comments"]
})


const {mutate:addTaskCommentMutation}=useMutation({
  mutationFn:({formData})=>{
    return taskApi.addTaskComment({formData});
  },
  onSuccess:(data)=>{
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:["comments"]})
  }
})

const {mutate:editTaskCommentMutation,isLoading:isUpdateLoading}=useMutation({
  mutationFn:({formData})=>{
    return taskApi.editTaskComment({formData});
  },
  onSuccess:(data)=>{
    toast.success(data.message);
    setIsInEditMode("")
    queryClient.invalidateQueries({queryKey:["comments"]})
  }
})

const {mutate:deleteTaskCommentMutation}=useMutation({
  mutationFn:({commentId})=>{
    return taskApi.deleteTaskComment({commentId});
  },
  onSuccess:(data)=>{
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:["comments"]})
  }
})

const {mutate:likeTaskCommentMutation}=useMutation({
  mutationFn:({commentId})=>{
    return taskApi.likeTaskComment({commentId});
  },
  onSuccess:(data)=>{
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:["comments"]})
  }
})

const {mutate:unlikeTaskCommentMutation}=useMutation({
  mutationFn:({commentId})=>{
    return taskApi.unlikeTaskComment({commentId});
  },
  onSuccess:(data)=>{
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:["comments"]})
  }
})

const onSave = ({formData,actionType}) =>{

  switch (actionType) {
    case enums.ActionType.ADD_COMMENT:
      addTaskCommentMutation({formData})
      break;
    case enums.ActionType.UPDATE_COMMENT:
      editTaskCommentMutation({formData})
      break;
      case enums.ActionType.DELETE_COMMENT:
        deleteTaskCommentMutation({commentId:formData})
      break;
      case enums.ActionType.LIKE_COMMENT:
        likeTaskCommentMutation({commentId:formData})
      break;
      case enums.ActionType.UNLIKE_COMMENT:
        unlikeTaskCommentMutation({commentId:formData})
      break;
    default:
      throw new Error("Unknown action type");
  }



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
      onSave={onSave}
      comments={comments}
      isInEditMode={isInEditMode}
      setIsInEditMode={setIsInEditMode}
      isUpdateLoading={isUpdateLoading}
      />}

    </>
  )
}

      </Tabs>
   
    </div>
    
  );
};


export default TaskDetails