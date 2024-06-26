import React from "react";
import { LuClapperboard, LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import { MdAdminPanelSettings } from "react-icons/md";
import Card from "../components/Card";
import Chart from "../components/Chart";

const Dashboard:React.FC = () => {

  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];






  return (
    <div
    className="h-full py-4"
    >


<div className="grid grid-cols-1 md:grid-cols-4 gap-5">
{stats.map(({icon,bg,label,total},index)=>{
return(
  <Card
  key={index}
  icon={icon}
  label={label}
  bg={bg}
  count={total}
  />
)
})}
</div>

<div className="w-full bg-white my-16 p-4 rounded shadow-sm">
<h4 className="text-xl text-gray-600 font-semibold">Chart by priority</h4>
<Chart/>
</div>

    </div>
  )
}

export default Dashboard