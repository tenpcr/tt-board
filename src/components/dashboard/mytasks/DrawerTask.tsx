/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from "@mui/material/Drawer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDots } from "react-icons/bs";
import { LuArrowRightToLine } from "react-icons/lu";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { TbLayoutGridAdd } from "react-icons/tb";
import ModalDelete from "@/components/modal/ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskView } from "@/redux/slices/taskViewSlice";
import * as taskService from "@/services/taskService";
import * as boardService from "@/services/boardService";
import * as Helper from "@/utils/helper";
import { DrawerTaskProps, DrawerTaskType, AlertType } from "@/types/taskTypes";
import { Trans } from "react-i18next";
import { useLoading } from "@/hooks/useLoading";
import EditTask from "./EditTask";
import { useImmer } from "use-immer";
import { toastify } from "@/lib/notification";


type BoardsType = {
  _id: string;
  name: string;
  color: string;
};

const taskDefault: DrawerTaskType = {
  _id: "",
  title: "",
  description: "",
  type: { _id: "", name: "" },
  status: { _id: "", name: "" },
  due_date: "",
  created_at: "",
};

function DrawerTask({ onReload }: DrawerTaskProps) {
  const { t, i18n } = useTranslation();
  const loading = useLoading();
  const dispatch = useDispatch();
  const [task, setTask] = useState<DrawerTaskType>(taskDefault);
  const [taskNew, setTaskNew] = useImmer<DrawerTaskType>(taskDefault);
  const [boards, setBoards] = useState<BoardsType[]>([]);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const taskViewState = useSelector((state: any) => state.taskView);
  const [reload, setReload] = useState<string>("");
  const [alert, setAlert] = useImmer<AlertType>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskViewState?.taskId) {
      setError(null);
      setTask(taskDefault);
      setTaskNew(taskDefault);

      const fetchTask = async () => {
        try {
          const response = await taskService.getTaskById(taskViewState?.taskId);
          if (response?.status === 200) {
            setTask(response?.data?.data);
            setTaskNew(response?.data?.data);
          }
        } catch (error: any) {
          setError(error?.status || "500");
        } finally {
        }
      };
      fetchTask();
    }
  }, [taskViewState?.taskId, reload]);

  useEffect(() => {
    if (taskViewState?.taskId) {
      const fetchTask = async () => {
        try {
          const response = await boardService.getBoards();
          if (response?.status === 200) {
            setBoards(response?.data?.data);
          }
        } catch (error: unknown) {
          console.log(error);
        } finally {
        }
      };
      fetchTask();
    }
  }, [taskViewState?.taskId]);

  const handleChangeProgress = async (event: SelectChangeEvent) => {
    if (task?._id) {
      loading.active && loading.active(true);
      try {
        const formData = {
          progress_id: event?.target?.value,
        };

        const response = await taskService.updateTaskProgressById(
          task?._id,
          formData
        );
        if (response?.status === 200) {
          setReload(new Date()?.toString());
          onReload();
        }
      } catch (error: any) {
      } finally {
        loading.active && loading.active(false);
      }
    }
  };

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeTaskView());
    setMode("view");
    setAlert((draft) => {
      draft.title = "";
    });
  }, []);

  const handleToDelete = async () => {
    if (task?._id) {
      loading.active && loading.active(true);
      try {
        const response = await taskService.deleteTaskById(task?._id);
        if (response?.status === 200) {
          toastify("success", t("task_deleted_successfully"));
          handleCloseDrawer();
          onReload();
        }
      } catch (error: unknown) {
        toastify("error", t("failed_to_delete_the_task"));
      } finally {
        loading.active && loading.active(false);
      }
    }
  };

  const handleUpdateTask = async () => {
    try {
      setAlert((draft) => {
        draft.title = "";
      });

      loading.active && loading.active(true);

      if (!taskNew?.title) {
        setAlert((draft) => {
          draft.title = t("task_name_is_required");
        });
        return;
      }

      const formData = {
        title: taskNew?.title,
        type_id: taskNew?.type?._id,
        due_date:
          taskNew?.due_date && new Date(taskNew?.due_date).toISOString(),
        description: taskNew?.description,
      };

      const response = await taskService.updateTaskById(task?._id, formData);
      if (response?.status === 200) {
        toastify("success", t("update_successful"));
        setReload(new Date()?.toString());
        onReload();
        setMode("view");
      }
    } catch (error: unknown) {
      toastify("error", t("update_failed_please_try_again"));
      console.log(error);
    } finally {
      loading.active && loading.active(false);
    }
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
              {mode === "view" && error != "404" && error != "500" && (
                <Select
                  value={task?.status?._id}
                  onChange={handleChangeProgress}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="bg-slate-100 rounded-[5px] text-gray-600 h-[45px] min-w-[150px] border-none"
                >
                  {boards?.map((boardItem: BoardsType, boardIndex: number) => (
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
              )}

              {mode === "edit" && error !== "404" && error != "500" && (
                <div className="flex flex-row gap-[10px] items-center">
                  <TbLayoutGridAdd size={30} />
                  <div className="text-[20px] font-semibold">
                    {t("edit_task")}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-row items-center gap-[15px]">
              {mode === "view" && error != "404" && error != "500" && (
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
                              <div className="flex-1 shrink">{t("edit")}</div>
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
                              <div className="flex-1 shrink">{t("delete")}</div>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}

              <button
                className="rounded-[10px] hover:bg-gray-200 active:bg-gray-300 text-gray-600 h-[35px] aspect-[1/1] flex justify-center items-center cursor-pointer"
                onClick={handleCloseDrawer}
              >
                <LuArrowRightToLine size={25} />
              </button>
            </div>
          </div>

          {error == "404" ? (
            <div className="py-[20px] px-[20px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
              <div className="h-full flex flex-col justify-center items-center text-gray-300">
                <div className="text-[80px] leading-[1.2em]">404</div>
                <div className="text-[30px]">Not Found</div>
              </div>
            </div>
          ) : error == "500" ? (
            <div className="py-[20px] px-[20px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
              <div className="h-full flex flex-col justify-center items-center text-gray-300">
                <div className="text-[80px] leading-[1.2em]">500</div>
                <div className="text-[30px]">Internal Server Error</div>
              </div>
            </div>
          ) : (
            mode === "view" && (
              <div className="py-[20px] px-[20px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
                <div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="font-semibold text-[22px]">
                      {task?.title}
                    </div>

                    <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal border-t border-b border-gray-300 py-[10px]">
                      <Trans
                        i18nKey={t("task_view_created", {
                          date:
                            task?.created_at &&
                            Helper.getDateTime(
                              task?.created_at,
                              i18n.language === "th" ? "th" : "en"
                            ),
                          user: "TT-SS Team",
                        })}
                      ></Trans>
                    </div>
                  </div>

                  <div className="mt-[25px]">
                    <div className="flex flex-row gap-[15px]">
                      <div className="w-[50%] flex flex-col gap-[5px]">
                        <div className="font-semibold text-[15px] text-gray-700">
                          {t("type")}
                        </div>
                        <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                          {task?.type?.name ? task?.type?.name : t("none")}
                        </div>
                      </div>
                      <div className="w-[50%] flex flex-col gap-[5px]">
                        <div className="font-semibold text-[15px] text-gray-700">
                          {t("due_date")}
                        </div>
                        <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                          {task?.due_date
                            ? Helper.getDateTime(
                                task?.due_date,
                                i18n.language === "th" ? "th" : "en"
                              )
                            : t("none")}
                        </div>
                      </div>
                    </div>

                    <div className="mt-[30px] flex flex-col gap-[5px] border-1 border-gray-300 rounded-[5px]">
                      <div className="font-semibold text-[15px] text-gray-700 p-[15px] border-b-1 border-gray-300">
                        {t("description")}
                      </div>

                      <div
                        className="text-[15px] text-gray-600 fomt-normal p-[15px]"
                        dangerouslySetInnerHTML={{
                          __html: task?.description
                            ? task?.description
                            : t("no_description"),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {mode === "edit" && (
            <EditTask
              alert={alert}
              task={taskNew}
              task_id={task?._id}
              setTaskNew={(data) => {
                setTaskNew(data);
              }}
              onCancel={() => {
                setMode("view");
                setTaskNew(task);
              }}
              toSave={handleUpdateTask}
              handleCloseDrawer={handleCloseDrawer}
            />
          )}
        </div>
      </Drawer>

      <ModalDelete
        show={isOpenModalDelete}
        title={t("head_delete_task")}
        detail={t("do_you_want_to_delete_this_task_q")}
        onClose={() => setIsOpenModalDelete(false)}
        toDelete={handleToDelete}
      />
    </>
  );
}

export default DrawerTask;
