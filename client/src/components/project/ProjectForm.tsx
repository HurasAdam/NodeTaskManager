import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import TextBox from "../TextBox";
import TextareaBox from "../TextareaBox";
import UserList from "../project/UserList";
import SelectList from "../SelectList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../../services/projectApi";
import { userApi } from "../../services/userApi";

const isLoading = "";
const uploadedFileURLs = [];

const projectForm: React.FC = ({ setOpen, onSave }) => {
  const project = "";
  const [assets, setAssets] = useState([]);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      pm: [],
      members: [],
      target: "",
      description: "",
    },
  });

  const { data: usersList } = useQuery({
    queryFn: () => {
      return userApi.getUsers();
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onSave({ formData: data, actionType: "CREATE_PROJECT" });
  });

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
    
        <form onSubmit={onSubmit} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-blue-800 mb-10 rounded-xl bg-blue-100 p-5">
            {project ? "UPDATE PROJECT" : "NEW PROJECT"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <TextBox
              placeholder="Project Name"
              type="text"
              name="name"
              label="Project Name"
              className="w-full rounded"
              register={register("name", { required: "Project name is required" })}
              error={errors.name ? errors.name.message : ""}
            />

            <UserList 
                title="Asign PM to:"
                data={usersList}
                setValue={setValue}
                name="pm"
                selectedUsers={watch("pm")}
                register={register("pm", { required: "Project leader is required" })}
                error={errors.pm ? errors.pm.message : ""}
            />

            <UserList 
                title="Asign Members to:"
                data={usersList}
                setValue={setValue}
                name="members"
                selectedUsers={watch("members")}
                register={register("members", { required: "Please select at least one project member" })}
                error={errors.members ? errors.members.message : ""}
            />
            <TextareaBox
              placeholder="Project Description"
              type="text"
              name="description"
              label="Project Description"
              className="w-full rounded"
              register={register("description", { required: "Project description is required" })}
              error={errors.description ? errors.description.message : ""}
            />

            <TextareaBox
              placeholder="Project Target"
              type="text"
              name="target"
              label="Project Target"
              className="w-full rounded"
              register={register("target", { required: "project target and objectives are required" })}
              error={errors.target ? errors.target.message : ""}
            />

          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {isLoading ? (
              <span className="text-sm py-2 text-red-500">
                Uploading assets
              </span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
              />
            )}

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </form>
   
    </>
  );
};

export default projectForm;
