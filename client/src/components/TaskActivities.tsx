import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { taskApi } from "../services/taskApi";
import ActivityCard from "./ActivityCard";
import { toast } from 'sonner';

const TaskActivities = ({ activity, id,activityTypes,taskTypeIcons }) => {

    const [text, setText] = useState("");
    const isLoading = false;
  const queryClient = useQueryClient();
  
  
  const {register,handleSubmit,watch}=useForm({
    defaultValues:{
      type:"",
      activity:""
    }
  })
  
  const {mutate} = useMutation({
    mutationFn:(data)=>{
      return taskApi.addTaskActivity(data)
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries(["task",id])
      toast.success(data.message);
    }
  })
  
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    mutate({taskId:id, formData:data})
  });
  

  
    return (
      <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
        <div className='w-full md:w-1/2'>
          <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>
  
          <div className='w-full'>
            {activity?.map((el, index) => (
              <ActivityCard
              taskTypeIcons={taskTypeIcons}
                key={index}
                item={el}
                isConnected={index < activity.length - 1}
              />
            ))}
          </div>
        </div>
  
        <div className='w-full md:w-1/3'>
        <form onSubmit={onSubmit}>
          <h4 className='text-gray-600 font-semibold text-lg mb-5'>
            Add Activity
          </h4>
          <div className='w-full flex flex-wrap gap-5'>
            {activityTypes.map((item, index) => (
              <div key={item} className='flex gap-2 items-center'>
                <input
                  type='radio'
                  className='w-4 h-4'
                  value={item}
                  checked={watch("type") === item ? true : false}
                  {...register("type",{required:"Please select activity type"})}
                
                />
                <p>{item}</p>
              </div>
            ))}
            <textarea
              rows={10}
              
       
              {...register("activity",{required:"Please add activity description"})}
              placeholder='Type ......'
              className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
            ></textarea>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label='Submit'
            
                className='bg-blue-600 text-white rounded'
              />
            )}
          </div>
          </form>
        </div>
      </div>
    );
  };

  export default TaskActivities;