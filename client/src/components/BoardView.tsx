import React from "react";
import TaskCard from "./TaskCard";
import ProjectCard from "./ProjectCard";

const BoardView:React.FC = ({data,onSave,type}) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
{data?.map((item,index)=>{
    return(
  type ==='tickets' ?(
    <TaskCard 
    onSave={onSave}
    key={index}
    task={item}
    />
  ):
  <ProjectCard
  onSave={onSave}
  key={index}
  project={item}
  />
    )
})}
    </div>
  )
}

export default BoardView