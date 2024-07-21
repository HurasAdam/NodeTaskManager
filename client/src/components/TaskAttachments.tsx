import React from 'react'

interface ITaskAttachmentsProps{
    attachments:[]
}

const TaskAttachments:React.FC<ITaskAttachmentsProps> = ({attachments}) => {
  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
        TaskAttachments
        </div>
  )
}

export default TaskAttachments