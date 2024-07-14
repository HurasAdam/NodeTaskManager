import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import Button from "./Button";
import TextBox from "./TextBox";
import UserList from "./task/UserList";
import SelectList from "./SelectList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../services/projectApi";
import ProjectForm from "./project/ProjectForm";
import TaskForm from "./task/TaskForm";
import * as enums from "../enums/index";
import { taskApi } from "../services/taskApi";
import SubtaskForm from "./task/SubtaskForm";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const isLoading=""
const uploadedFileURLs = [];


interface IAddNewProps{
  open:boolean;
  setOpen:()=>void;
  type: enums.EAddNewType,
  taskId?:string
}

const AddNew:React.FC<IAddNewProps> = ({ open, setOpen,type,taskId }) => {

  const [assets, setAssets] = useState([]);
const queryClient = useQueryClient();



const {mutate:createProjectMutate} = useMutation({
  mutationFn:(FormData)=>{
    return projectApi.createProject(FormData)
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(["projects"])

    setOpen(false);
  }
})


const {mutate:createTaskMutate}=useMutation({
  mutationFn:(formData)=>{
return taskApi.createTask(formData)
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(["tasks"])

     setOpen(false);
  }
})


const {mutate:createSubtaskMutate}=useMutation({
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
    case enums.ActionType.CREATE_TASK:
      createTaskMutate(formData);
      break;
    case enums.ActionType.CREATE_SUBTASK:
      createSubtaskMutate(formData);
      break;
      case enums.ActionType.CREATE_PROJECT:
        createProjectMutate(formData);
      break;
    default:
      throw new Error("Unknown action type");
  }
}


  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        {
          type === enums.EAddNewType.PROJECT && (
            <ProjectForm setOpen={setOpen} onSave={onSave}/>
          )}
    {type === enums.EAddNewType.TASK &&(
      <TaskForm setOpen={setOpen} onSave={onSave}/>
    )
        }
        {
          type === enums.EAddNewType.SUBTASK && (
            <SubtaskForm  setOpen={setOpen} onSave={onSave} taskId={taskId} />
          )
        }

      </ModalWrapper>
    </>
  );
};

export default AddNew;