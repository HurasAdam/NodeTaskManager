import React from "react";
import clsx from "clsx";
import { MdTaskAlt, MdKeyboardDoubleArrowUp, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { getInitials, PRIOTITYSTYELS, TASK_TYPE } from "../utils";

// Icon and background color mapping
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const PriorityBadge = ({ priority }) => (
  <div
    className={clsx(
      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
      PRIOTITYSTYELS[priority],
      bgColor[priority]
    )}
  >
    <span className="text-lg">{ICONS[priority]}</span>
    <span className="uppercase">{priority} Priority</span>
  </div>
);

const StageBadge = ({ stage }) => (
  <div className={clsx("flex items-center gap-2")}>
    <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[stage])} />
    <span className="text-black uppercase">{stage}</span>
  </div>
);

const TaskDetailsStats = ({ task, context }) => (
  <div className="flex items-center gap-8 p-4 border-y border-gray-200">
    <div className="space-x-2">
      <span className="font-semibold">Assets :</span>
      <span>{task?.assets?.length}</span>
    </div>
    <span className="text-gray-400">|</span>
    <div className="space-x-2">
      <span className="font-semibold">{context === "task" ? "Sub-Task" : "Members"} :</span>
      <span>{context === "task" ? task?.subTasks?.length : task?.members?.length}</span>
    </div>
  </div>
);

const TeamSection = ({ team, title }) => (
  <div className="space-y-4 py-6">
    <p className="text-gray-600 font-semibold test-sm">{title}</p>
    <div className="space-y-3">
      {team?.map((m, index) => (
        <div
          key={index}
          className="flex gap-4 py-2 items-center border-t border-gray-200"
        >
          <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
            <span className="text-center">{getInitials(m?.name)}</span>
          </div>
          <div>
            <p className="text-lg font-semibold">{m?.name}</p>
            <span className="text-gray-500">{m?.title}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SubTasksSection = ({ subTasks }) => (
  <div className="space-y-4 py-6">
    <p className="text-gray-500 font-semibold text-sm">SUB-TASKS</p>
    <div className="space-y-8">
      {subTasks?.map((el, index) => (
        <div key={index} className="flex gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
            <MdTaskAlt className="text-violet-600" size={26} />
          </div>
          <div className="space-y-1">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-500">
                {new Date(el?.date).toDateString()}
              </span>
              <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold">
                {el?.tag}
              </span>
            </div>
            <p className="text-gray-700">{el?.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssetsSection = ({ assets }) => (
  <div className="w-full grid grid-cols-2 gap-4">
    {assets?.map((el, index) => (
      <img
        key={index}
        src={el}
        alt="asset"
        className="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
      />
    ))}
  </div>
);

const TaskDetailsTab = ({ task, context }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
      <div className="w-full md:w-1/2 space-y-8">
        <div className="flex items-center gap-5">
          <PriorityBadge priority={task?.priority} />
          <StageBadge stage={task?.stage} />
        </div>
        <p className="text-gray-500">
          Created At:{" "}
          <span className="text-gray-800">
            {new Date(task?.createdAt).toDateString()}
          </span>
        </p>
        <TaskDetailsStats task={task} context={context} />
        {context === "task" ? (
          <TeamSection team={task?.team} title="TASK TEAM" />
        ) : (
          <TeamSection team={task?.pm} title="PROJECT LEADER" />
        )}
        <SubTasksSection subTasks={task?.subTasks} />
      </div>
      <div className="w-full md:w-1/2 space-y-8">
        <p className="text-lg font-semibold">ASSETS</p>
        <AssetsSection assets={task?.assets} />
      </div>
    </div>
  );
};

export default TaskDetailsTab;
