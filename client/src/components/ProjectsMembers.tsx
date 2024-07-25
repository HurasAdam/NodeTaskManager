import React from "react";
import { getInitials } from "../utils";
import Button from "./Button";
import clsx from "clsx";

interface ITaskMembersProps {
  members: [];
}

const ProjectsMembers: React.FC<ITaskMembersProps> = ({ members }) => {

  const TableHead = () => (
    <thead className="bg-blue-700 border-gray-300">
      <tr className="text-white text-left">
        {['Full Name', 'Title', 'Email', 'Role', 'Active', ''].map((column, index) => (
          <th key={index} className="p-3">{column}</th>
        ))}
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>
      {[
        [user.title],
        [user.email || "user.emal.com"],
        [user.role],
      ].map(([column], index) => (
        <td key={index} className="p-2">{column}</td>
      ))}
      <td>
        <button
          className={clsx("w-fit px-4 py-1 rounded-full text-white", user?.isActive ? "bg-blue-700/80" : "bg-red-800/80")}>
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Button className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0" label="Edit" type="button" />
        <Button className="text-red-700 hover:text-red-500 font-semibold sm:px-0" label="Delete" type="button" />
      </td>
    </tr>
  );

  return (
    <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-full mb-5">
          <TableHead />
          <tbody>
            {members?.map((user, index) => (
              <TableRow key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectsMembers;
