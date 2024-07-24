import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import Title from "../components/Title";
import Button from "../components/Button";
import { toast } from "sonner";
import clsx from "clsx";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmatioDialog from "../components/Dialogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../services/taskApi";
import { useParams } from "react-router-dom";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const queryClient = useQueryClient();
  const params = useParams();
  const status = params?.trashed;
  const { data: tasks } = useQuery({
    queryFn: () => {
      return taskApi.getTasks({ isTrashed: status });
    },
    queryKey: ["trashed-tasks"],
  });

  const { mutate: removeTaskMutation } = useMutation({
    mutationFn: ({ taskId }) => {
      return taskApi.removeTask({ taskId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trashed-tasks"] });
      toast.success(data.message);
    },
  });

  const { mutate: restoreTaskMutation } = useMutation({
    mutationFn: ({ taskId }) => {
      return taskApi.restoreTask({ taskId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trashed-tasks"] });
      toast.success(data.message);
    },
  });

  const { mutate: removeAllTasksMutation } = useMutation({
    mutationFn: () => {
      return taskApi.removeAllTasks();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trashed-tasks"] });
      toast.success(data.message);
    },
  });

  const { mutate: restoreAllTasksMutation } = useMutation({
    mutationFn: () => {
      return taskApi.restoreAllTask();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trashed-tasks"] });
      toast.success(data.message);
    },
  });

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanantyl delte all items?");
    setOpenDialog(true);
  };

  const deleteClick = ({ id, title }) => {
    setType("delete");
    setSelected({ id, title });
    setOpenDialog(true);
  };

  const restoreClick = ({ id, title }) => {
    setSelected({ id, title });
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to permanantyl delte all items?");
    setOpenDialog(true);
  };

  const onClick = (type) => {
    if (type === "delete") {
      removeTaskMutation({ taskId: selected.id });
    } else if (type === "restore") {
      restoreTaskMutation({ taskId: selected?.id });
    } else if (type === "deleteAll") {
      removeAllTasksMutation();
    } else if (type === "restoreAll") {
      restoreAllTasksMutation();
    }
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black  text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 line-clamp-1">Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {item?.title}
          </p>
        </div>
      </td>

      <td className="py-2 capitalize">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className="">{item?.priority}</span>
        </div>
      </td>

      <td className="py-2 capitalize text-center md:text-start">
        {item?.stage}
      </td>
      <td className="py-2 text-sm">{new Date(item?.date).toDateString()}</td>

      <td className="py-2 flex gap-1 justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => restoreClick({ id: item?._id, title: item?.title })}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick({ id: item?._id, title: item?.title })}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" />

          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => restoreAllClick()}
            />
            <Button
              label="Delete All"
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {tasks?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        selected={selected}
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={onClick}
      />
    </>
  );
};

export default Trash;
