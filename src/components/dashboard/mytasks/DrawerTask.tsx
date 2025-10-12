/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from "@mui/material/Drawer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { LuArrowRightToLine } from "react-icons/lu";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import dynamic from "next/dynamic";
import ModalDelete from "@/components/modal/ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskView } from "@/redux/slices/taskViewSlice";
import * as taskService from "@/services/taskService";
import * as boardService from "@/services/boardService";
import * as Helper from "@/utils/helper";

const InputCKeditor = dynamic(() => import("@/components/form/InputCKeditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface DrawerTaskType {
  title: string;
  type?: { name: string };
  description: string;
  status: { _id: string; name: string };
  due_date?: string;
  created_at: string;
}

const taskDefault: DrawerTaskType = {
  title: "",
  description: "",
  type: { name: "" },
  status: { _id: "", name: "" },
  due_date: "",
  created_at: "",
};

function DrawerTask({
  isOpen,
  setOpen,
}: {
  open: boolean;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [task, setTask] = useState<DrawerTaskType>(taskDefault);
  const [boards, setBoards] = useState<any[]>([]);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const taskViewState = useSelector((state: any) => state.taskView);

  useEffect(() => {
    if (taskViewState?.taskId) {
      const fetchTask = async () => {
        try {
          const response = await taskService.getTaskById(taskViewState?.taskId);
          if (response?.status === 200) {
            setTask(response?.data?.data);
          }
        } catch (error: any) {
        } finally {
        }
      };
      fetchTask();
    }
  }, [taskViewState?.taskId]);

  useEffect(() => {
    if (taskViewState?.taskId) {
      const fetchTask = async () => {
        try {
          const response = await boardService.getBoards();
          if (response?.status === 200) {
            setBoards(response?.data?.data);
          }
        } catch (error: any) {
        } finally {
        }
      };
      fetchTask();
    }
  }, [taskViewState?.taskId]);
  const handleChangeStatus = (event: SelectChangeEvent) => {
    console.log(event);
  };

  const hamdleCancelEdit = () => {
    setMode("view");
  };

  const handleCloseDrawer = () => {
    dispatch(closeTaskView());
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={taskViewState?.show}
        onClose={handleCloseDrawer}
      >
        <div className="w-[600px] flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="flex flex-row justify-between items-center py-[10px] px-[20px] border-b border-gray-300">
            <div>
              <Select
                value={task?.status?._id}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="bg-slate-100 rounded-[5px] text-gray-600 h-[45px] min-w-[150px] border-none"
              >
                {boards?.map((boardItem: any, boardIndex: number) => (
                  <MenuItem value={boardItem?._id} key={boardIndex}>
                    <div className="flex flex-row gap-[8px] items-center ">
                      <div
                        className="w-[15px] h-[15px] rounded-[5px] flex-none"
                        style={{
                          backgroundColor: boardItem?.color
                            ? boardItem?.color
                            : "#e1e1e1",
                        }}
                      />
                      <div className="line-clamp-1">{boardItem?.name}</div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div
              className="flex flex-row items-center gap-[15px]
            "
            >
              <div className="relative">
                <Menu as="div" className="flex flex-col">
                  <Menu.Button className="rounded-[10px] hover:bg-gray-200 active:bg-gray-300 text-gray-600 h-[35px] aspect-[1/1] flex justify-center items-center cursor-pointer">
                    <BsThreeDots size={25} />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="mt-[40px] right-0 z-50 origin-top-right absolute w-fit rounded-md bg-white shadow-md border-1 border-gray-200 focus:outline-none">
                      <Menu.Item>
                        {() => (
                          <div
                            onClick={() => setMode("edit")}
                            className="w-full text-gray-500 text-[14px] flex flex-row gap-[10px] py-[13px] px-[15px] items-center cursor-pointer hover:bg-slate-100"
                          >
                            <div className="w-[25px] flex items-center justify-center">
                              <FiEdit size={18} />
                            </div>
                            <div className="flex-1 shrink">Edit</div>
                          </div>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {() => (
                          <div
                            onClick={() => setIsOpenModalDelete(true)}
                            className="w-full text-[#ea0000] text-[14px] flex flex-row gap-[10px] py-[13px] px-[15px] items-center cursor-pointer hover:bg-slate-100"
                          >
                            <div className="w-[25px] flex items-center justify-center">
                              <TbTrash size={20} />
                            </div>
                            <div className="flex-1 shrink">Delete</div>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <button
                className="rounded-[10px] hover:bg-gray-200 active:bg-gray-300 text-gray-600 h-[35px] aspect-[1/1] flex justify-center items-center cursor-pointer"
                onClick={handleCloseDrawer}
              >
                <LuArrowRightToLine size={25} />
              </button>
            </div>
          </div>

          <div className="py-[20px] px-[20px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
            <div>
              <div className="flex flex-col gap-[10px]">
                <div className="font-semibold text-[22px]">{task?.title}</div>

                <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal border-t border-b border-gray-300 py-[10px]">
                  Created{" "}
                  {task?.created_at && Helper.getDateTime(task?.created_at)} by{" "}
                  <span className="font-semibold">TT-SS Team</span>
                </div>
              </div>

              <div className="mt-[25px]">
                <div className="flex flex-row gap-[15px]">
                  <div className="w-[50%] flex flex-col gap-[5px]">
                    <div className="font-semibold text-[15px] text-gray-700">
                      Type
                    </div>
                    <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                      {task?.type?.name ? task?.type?.name : "None"}
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col gap-[5px]">
                    <div className="font-semibold text-[15px] text-gray-700">
                      Due date
                    </div>
                    <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                      {task?.due_date
                        ? Helper.getDateTime(task?.due_date)
                        : "None"}
                    </div>
                  </div>
                </div>

                <div className="mt-[30px] flex flex-col gap-[5px] border-1 border-gray-300 rounded-[5px]">
                  <div className="font-semibold text-[15px] text-gray-700 p-[15px] border-b-1 border-gray-300">
                    Description
                  </div>

                  {mode === "view" && (
                    <div className="text-[15px] text-gray-600 fomt-normal p-[15px]">
                      {task?.description ? task?.description : "No description"}
                    </div>
                  )}

                  {mode === "edit" && (
                    <InputCKeditor value={task?.description} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {mode === "edit" && (
            <div className="w-full border-t border-gray-200 py-[15px] px-[20px] flex-mone">
              <div className="flex gap-x-[15px] justify-end">
                <button
                  onClick={hamdleCancelEdit}
                  className="hover:bg-gray-100 text-orange-500 font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {}}
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 hover:text-white text-white font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>

      <ModalDelete
        show={isOpenModalDelete}
        title="Delete Task"
        detail="Do you want to delete this task?"
        onClose={() => setIsOpenModalDelete(false)}
        toDelete={() => {}}
      />
    </>
  );
}

export default DrawerTask;
