import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import TextBox from "../TextBox";
import UserList from "../task/UserList";
import SelectList from "../SelectList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../services/projectsApi";
import { userApi } from "../../services/userApi";


const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const isLoading=""
const uploadedFileURLs = [];

const AddNew:React.FC = ({ open, setOpen, onSave }) => {
  const project = "";
  const [assets, setAssets] = useState([]);
const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues:{
      title:"",
      team: [],
      priority:"",
      stage:"",
      date:""
    }
  });


  // const {mutate,isLoading}=useMutation({
  //   mutationFn:(formData)=>{
  //     return taskApi.createTask(formData)
  //   },
  //   onSuccess:()=>{
  //     queryClient.invalidateQueries(["tasks"])
  //     reset();
  //     setOpen(false);
  //   }
  // })


const {data:usersList}=useQuery({
  queryFn:()=>{
    return userApi.getUsers();
  }
})

 const onSubmit = handleSubmit((data) => {
 console.log(data)
onSave({formData:data, actionType:"CREATE_PROJECT"})
 });


  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit} className="">
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-blue-800 mb-10 rounded-xl bg-blue-100 p-5'
          >
            {project ? "UPDATE PROJECT" : "NEW PROJECT"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='Project Title'
              type='text'
              name='title'
              label='Project Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList 
            data={usersList}
            setValue={setValue}
            name="team"
            selectedUsers={watch("team")}
            register={register("team", { required: "Please select at least one asignee" })}
            error={errors.team ? errors.team.message : ""}
            />

            <div className='flex gap-4'>
              <SelectList
                label='Project Stage'
                lists={LISTS}
                selected={watch("stage")}              
                name="stage"
                register={register("stage", { required: "Project stage is required" })}
                error={errors.stage ? errors.stage.message : ""}
              />

              <div className='w-full'>
                <TextBox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={watch("priority")}
                 name="priority"
           
                register={register("priority", { required: "Project priority is required" })}
                error={errors.priority ? errors.priority.message : ""}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {isLoading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddNew;