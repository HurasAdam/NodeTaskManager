import React from 'react'
import { formatDate, getInitials } from '../utils'
import clsx from "clsx";
import CommentForm from './task/comment/CommentForm';
import { IoChatbox } from "react-icons/io5";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import CommentActionPanel from './task/comment/CommentActionPanel';

interface ICommandContainerProps{
    comment:{
        _id:string;
        user:{
            _id:string;
            name:string;
            email:string;
            role:string;
            isAdmin:boolean;
        };
        description:string;
        createdAt:string;
    };
    isAuthor:boolean;
    commentEditHandler:({commentId}:{commentId:string})=>void;
    isInEditMode?:string;
    onSave:({formData,actionType})=>void;
}



const CommentContainer:React.FC<ICommandContainerProps> = ({comment,isAuthor,commentEditHandler,isInEditMode,onSave}) => {

  return (
    <div className='flex flex-nowrap items-start gap-x-3  rounded-lg '>
    <div className='hidden md:block '>
<div className={clsx('bg-[rgb(242,244,245)] min-w-[50px] min-h-[50px] flex items-center justify-center rounded-sm', isAuthor && 'bg-[#eef2ff]')}>
<span> {getInitials(comment?.user?.name)}</span>


</div>
<span className='text-gray-500 font-semibold text-xs flex justify-center mt-[3px] '> {comment?.user?.role}</span>
</div>
    <div className='flex-1 flex-nowrap  border rounded-md ' >
      <h2 className={clsx('bg-violet-50 px-1.5 py-1.5 text-sm flex justify-between bg-[rgb(242,244,245)]', isAuthor && 'bg-[#eef2ff]')}>
        <span className='text-sm font-bold text-gray-800 flex items-center gap-2'><IoChatbox className='text-slate-400'/>{comment?.user?.name} <span className='text-gray-500 font-normal'> added a comment.</span></span>
        <span className='text-xs font-semibold text-gray-600 flex gap-x-4 items-center'>{formatDate(comment?.createdAt,true)}<span className='text-center flex  font-bold text-violet-500'><RiArrowUpDoubleFill className='w-4 h-4 text-indigo-500'/>{comment?.likesCount>0 && comment?.likesCount}</span></span>
      </h2>
{isInEditMode === comment?._id ? 
<CommentForm comment={comment} onSave={onSave}/>: 
(<>
<p className="font-opensans mt-[10px] text-dark-light w-fit break-all px-5 py-2 text-sm">
                {comment.description}
            </p>
<CommentActionPanel
comment={comment} 
isAuthor={isAuthor}
commentEditHandler={commentEditHandler}
onSave={onSave}
/>
</>) }
    </div>
  </div>
  )
}

export default CommentContainer