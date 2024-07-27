import React from 'react'
import { useForm } from 'react-hook-form';
import Button from './Button';
import { formatDate, getInitials } from '../utils';

interface ICommentsTab{
    id:string;
    newCommentHandler:()=>void;
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
const CommentsTab:React.FC<ICommentsTab> = ({id,newCommentHandler,comments}) => {


const {register,watch,handleSubmit}= useForm({
  defaultValues:{

    description:""
  }
})


const onSubmit = handleSubmit((data) => {
  newCommentHandler({formData:data})

  });


  return (
    <div className='w-full flex flex-col gap-10 2xl:gap-20 min-h-screen px-4 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
    <div  className="space-y-4 mt-8 ">
    {comments?.map((comment) => {
        return (
          <div className='flex flex-nowrap items-start gap-x-3  rounded-lg '>
            <div className='hidden md:block '>
     <div className='bg-[#F2F4F5] min-w-[50px] min-h-[50px] flex items-center justify-center rounded-sm'>
     <span> {getInitials(comment?.user?.name)}</span>
    
   
      </div>
      <span className='text-xs'> {comment?.user?.role}</span>
      </div>
            <div className='flex-1 flex-nowrap  border rounded-md'>
              <h2 className='bg-violet-50 px-1.5 py-1.5 text-sm flex justify-between bg-[#F2F4F5] '>
                <span className='text-sm font-bold text-gray-800'>{comment?.user?.name} <span className='text-gray-500 font-normal'> added a comment.</span></span>
                <span>      {formatDate(comment?.createdAt, true)}</span>
              </h2>
              <p className="font-opensans mt-[10px] text-dark-light w-fit break-all px-5 py-2 text-sm">
                        {comment.description}
                    </p>
            </div>
          </div>
        );
      })}
    </div>




       <div className="w-full ">
        <form onSubmit={onSubmit} >
      
          <div className="w-full flex flex-wrap gap-5">

            <textarea
              rows={10}
              {...register("description", {
                required: "Please add activity description",
              })}
              placeholder="Type ......"
              className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"></textarea>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Submit"
                className="bg-blue-600 text-white rounded"
              />
            )}
          </div>
        </form>
      </div>



      </div>
  )
}

export default CommentsTab