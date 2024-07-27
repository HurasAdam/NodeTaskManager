import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from './Button';
import CommentContainer from './CommentContainer';
import { useAccountStore } from '../redux/store';
import CommentForm from './task/comment/CommentForm';


interface ICommentsTab{
    id:string;
    onSave:({formData,actionType})=>void;
    comments:[]
}

const act_types = [
  "assigned",
  "started",
  "in progress",
  "commented",
  "bug",
  "completed",

];
const isLoading=false
const CommentsTab:React.FC<ICommentsTab> = ({id,onSave,comments,setIsInEditMode,isInEditMode,isUpdateLoading}) => {

  const { account } = useAccountStore((state) => state);
console.log(account)

const commentEditHandler = ({commentId})=>{
  setIsInEditMode(commentId)
}

  return (
    <div className='w-full flex flex-col gap-10 2xl:gap-20 min-h-screen px-4 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
    <div  className="space-y-4 mt-8 ">
    {comments?.map((comment) => {
      const isUserCommentAutor = account?._id === comment?.user?._id
        return (
<CommentContainer 
isAuthor={isUserCommentAutor}
comment={comment}
commentEditHandler={commentEditHandler}
isInEditMode={isInEditMode}
onSave={onSave}
/>
        );
      })}
    </div>

<CommentForm 

setIsInEditMode={setIsInEditMode}
onSave={onSave}
isUpdateLoading={isUpdateLoading}
/>


      </div>
  )
}

export default CommentsTab