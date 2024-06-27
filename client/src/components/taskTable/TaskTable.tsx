import clsx from "clsx";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { TASK_TYPE } from "../../utils";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";



const TaskTable:React.FC = ({tasks}) => {
    const ICONS={
        high:<MdKeyboardDoubleArrowUp/>,
        medium:<MdKeyboardArrowUp/>,
        low:<MdKeyboardArrowDown/>,
    }


    return (
        <>
          <div className='w-full  bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
            <table className='w-full'>
              <TableHeader />
              <tbody>
                {tasks?.map((task, id) => (
                  <TableRow key={id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
}

export default TaskTable