import clsx from "clsx";
import { TASK_TYPE } from "../../utils";
import { BGS, PRIOTITYSTYELS } from "../../constants";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import UserInfo from "../UserInfo";
import moment from "moment";

const ICONS={
  high:<MdKeyboardDoubleArrowUp/>,
  medium:<MdKeyboardArrowUp/>,
  low:<MdKeyboardArrowDown/>,
}



const TableRow:React.FC = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  export default TableRow;