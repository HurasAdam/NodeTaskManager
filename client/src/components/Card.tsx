import clsx from "clsx";
import React from "react";

const Card:React.FC = ({label,count,icon,bg}) => {
  return (
    <div className="w-full h-32 bg-white p-5 shdow-md rounded-md flex items-center justify-between ">

<div className="h-full flex flex-1 flex-col justify-between">
    <p className="text-base text-gray-600">{label}</p>
    <span className="text-2xl font-semibold">{count}</span>
    <span className="text-sm text-gray-400">{"150 last month"}</span>
</div>

<div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white ",bg)}>
{icon}
</div>



    </div>
  )
}

export default Card