import moment from "moment";

const ActivityCard = ({ item,taskTypeIcons }) => {
    return (
      <div className='flex space-x-4'>
        <div className='flex flex-col items-center flex-shrink-0 '>
          <div className='w-10 h-10 flex items-center justify-center'>
            {taskTypeIcons[item?.type]}
          </div>
          <div className='w-full flex items-center justify-center h-full'>
            <div className='w-0.5  bg-gray-500 h-[86%]'></div>
          </div>
        </div>

        <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{item?.by?.name}</p>
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>{item?.type}</span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  export default ActivityCard;