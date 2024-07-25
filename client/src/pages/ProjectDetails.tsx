import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import {  FaTasks } from "react-icons/fa";

import { PiProjectorScreenChart } from "react-icons/pi";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../services/taskApi";
import { useForm } from "react-hook-form";
import TaskActivities from "../components/TaskActivities";
import TaskDetailsTab from "../components/TaskDetailsTab";
import { projectApi } from "../services/projectApi";
import ProjectsMembers from "../components/ProjectsMembers";
import TaskAttachments from "../components/TaskAttachments";

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
  { title: "Members", icon: <FaTasks /> },
  { title: "Attachments", icon: <FaTasks /> },
];

const ProjectDetails = () => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0);
  // const task = tasks[3];

  const { data: task } = useQuery({
    queryFn: () => {
      return projectApi.getProject({ projectId: id });
    },
    queryKey: ["task", id],
  });

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="flex items-center gap-x-2 text-2xl text-gray-600 font-bold bg-white p-2.5 rounded">
        <PiProjectorScreenChart className="text-blue-800 " />
        {task?.name}
      </h1>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 && (
          <TaskDetailsTab task={task} context="project" />
        )}
  {selected === 1 &&(
            <>
            <TaskActivities
              activity={task?.activities}
              id={id}
      
            />
          </>
  )}
    {selected === 2 &&(
            <>
            <ProjectsMembers
              members={task?.members}
              id={id}
      
            />
          </>
  )}

{selected === 3 &&(
            <>
            <TaskAttachments
              attachments={task?.activities}
              id={id}
      
            />
          </>
  )}
        
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
