import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AiFillLike } from "react-icons/ai";

const CommentActionPanel:React.FC = ({isAuthor,commentEditHandler,comment}) => {
  return (
    <div className='py-[2px] px-1'>
                    {isAuthor ? (
                <div className=' px-2 py-1 flex gap-2 justify-end'>
              <span 
              onClick={()=>commentEditHandler({commentId:comment?._id})}
              className='p-1 hover:bg-blue-100 rounded transition-all cursor-pointer '> <MdEdit className='text-blue-400'/></span>
              <span 
              className='p-1 hover:bg-rose-100 rounded transition-all cursor-pointer'><MdDelete className='text-rose-400'/></span>
            
                </div>
            ):
            (
                <div className=' px-2 py-1 flex gap-2 justify-end'>
                <span 
                className='p-1 hover:bg-blue-100 rounded transition-all cursor-pointer '> <AiFillLike className='text-blue-400'/>
                </span>
             
                  </div>  
            )
            }
    </div>
  )
}

export default CommentActionPanel