import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AiFillLike } from "react-icons/ai";
import ConfirmatioDialog from '../../Dialogs';
import { ActionType } from '../../../enums';

const CommentActionPanel:React.FC = ({isAuthor,commentEditHandler,comment,onSave}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<string>("");


  const deleteClick = ( id:string):void => {
    setType("DELETE_COMMENT");
    setSelected( id );
    setOpenDialog(true);
    setMsg("Are you sure you want to delete this comment?")
  };


const onClickLikeHandler = (type) =>{
  onSave({formData:comment?._id, actionType:type})
}

  const onClick = (type:string):void => {
    onSave({formData:selected, actionType: type})
  };

  return (
    <div className='py-[2px] px-1'>
                    {isAuthor ? (
                <div className=' px-2 py-1 flex gap-2 justify-end'>
              <span 
              onClick={()=>commentEditHandler({commentId:comment?._id})}
              className='p-1 hover:bg-blue-100 rounded transition-all cursor-pointer '> <MdEdit className='text-blue-400'/></span>
              <span 
              onClick={()=>deleteClick(comment?._id)}
              className='p-1 hover:bg-rose-100 rounded transition-all cursor-pointer'><MdDelete className='text-rose-400'/></span>
            
                </div>
            ):
            (
                <div className=' px-2 py-1 flex gap-2 justify-end'>
           {  comment?.alreadyLiked ?  (<span 
                onClick={()=>onClickLikeHandler("UNLIKE_COMMENT")}
                className='p-1 hover:bg-blue-100 rounded transition-all cursor-pointer '> <AiFillLike className='text-blue-400'/>
                </span>):
                 (<span 
                  onClick={()=>onClickLikeHandler("LIKE_COMMENT")}
                  className='p-1 hover:bg-blue-100 rounded transition-all cursor-pointer '> <AiFillLike className='text-gray-300'/>
                  </span>)
                }
             
                  </div>  
            )
            }
                 <ConfirmatioDialog
        selected={selected}
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={onClick}
       
      />
    </div>
  )
}

export default CommentActionPanel