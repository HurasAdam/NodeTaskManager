import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { ActionType } from '../../../enums';
import Loader from '../../Loader';
import * as enums from "../../../enums/index";
import { useLocation, useParams } from 'react-router-dom';

const CommentForm = ({onSave,comment,setIsInEditMode,isUpdateLoading}) => {
const {id} = useParams();
    const isLoading=false
    const {register,watch,handleSubmit,reset}= useForm({
        defaultValues:{
      taskId:id,
          description: comment ? comment?.description : ""
        }
      })
      
      
      const onSubmit = handleSubmit((data) => {
       
        if(comment){
          onSave({formData:{data,commentId:comment?._id}, actionType: enums.ActionType.UPDATE_COMMENT})
          setIsInEditMode("")
        }else{
           onSave({formData:data, actionType:enums.ActionType.ADD_COMMENT})
           reset()
        }
        
      
        });

  return (
    <div className="w-full ">
    <form onSubmit={onSubmit} >
  
      <div className="w-full flex flex-wrap gap-5">

        <textarea
          rows={10}
          {...register("description", {
            required: "Please add activity description",
          })}
          placeholder="Type ......"
          className="bg-white w-full  border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"></textarea>
        {isUpdateLoading ? (
          <Loader />
        ) : (
          <Button
            type="submit"
            label={comment ? "Save" :"Submit"}
            className="bg-blue-600 text-white rounded"
          />
          
        )}
      </div>
    </form>
  </div>
  )
}

export default CommentForm