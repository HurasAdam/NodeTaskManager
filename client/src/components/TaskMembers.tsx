import React from 'react'

interface ITaskMembersProps{
    members:[]
}

const TaskMembers:React.FC<ITaskMembersProps> = ({members}) => {
  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
        TaskMembers
        </div>
  )
}

export default TaskMembers