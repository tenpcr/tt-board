/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LuArrowRightToLine } from "react-icons/lu";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import ModalDelete from "@/components/modal/ModalDelete";
import * as taskService from "@/services/taskService";
import {
  DrawerAddNewTaskProps,
  DrawerTaskInputDataTypes,
  TaskTypeState,
} from "@/types/taskTypes";
import { useImmer } from "use-immer";
import { useLoading } from "@/hooks/useLoading";
import { toastify } from "@/lib/notification";

const InputCKeditor = dynamic(() => import("@/components/form/InputCKeditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface AlertType {
  title?: string;
}

const inputDataDefault: DrawerTaskInputDataTypes = {
  title: "",
  type: { label: "", value: "" },
  dueDate: "",
  description: "",
};

const taskTypeDefault: TaskTypeState[] = [
  {
    _id: "",
    name: "",
  },
];

function DrawerAddNewTask({
  show,
  onAddSuccess,
  onClose,
}: DrawerAddNewTaskProps) {
  const { t } = useTranslation();
  const loading = useLoading();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [inputData, setInputData] =
    useImmer<DrawerTaskInputDataTypes>(inputDataDefault);
  const [alert, setAlert] = useImmer<AlertType>({});
  const [taskType, setTaskType] = useState<TaskTypeState[]>(taskTypeDefault);

  useEffect(() => {
    const fetchTaskType = async () => {
      try {
        const response = await taskService.getTaskTypes();
        if (response?.status === 200) {
          setTaskType(response?.data?.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch task types:", error);
      }
    };
    fetchTaskType();
  }, []);

  const handleAddTask = async () => {
    try {
      setAlert((draft) => {
        draft.title = "";
      });

      loading.active && loading.active(true);

      if (!inputData?.title) {
        setAlert((draft) => {
          draft.title = t("task_name_is_required");
        });
        return;
      }

      const formData = {
        title: inputData?.title,
        type_id: inputData?.type.value,
        due_date:
          inputData?.dueDate && new Date(inputData?.dueDate).toISOString(),
        description: inputData?.description,
      };

      const response = await taskService.addTask(formData);
      if (response?.status === 201) {
        toastify("success", t("task_created_successfully"));
        onAddSuccess();
        setInputData(inputDataDefault);
        onClose();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      loading.active && loading.active(false);
    }
  };

  const handleCancelAddTask = () => {
    setAlert((draft) => {
      draft.title = "";
    });
    setInputData(inputDataDefault);
    onClose();
  };

  return (
    <>
      <Drawer anchor="right" open={show} onClose={onClose}>
        <div className="w-[600px] flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="flex flex-row justify-between items-center py-[10px] px-[20px] border-b border-gray-300">
            <div>
              <div className="flex flex-row gap-[10px] items-center">
                <TbLayoutGridAdd size={30} />
                <div className="text-[20px] font-semibold">{t("new_task")}</div>
              </div>
            </div>

            <div
              className="flex flex-row items-center gap-[15px]
            "
            >
              <button
                className="rounded-[10px] hover:bg-gray-200 active:bg-gray-300 text-gray-600 h-[35px] aspect-[1/1] flex justify-center items-center cursor-pointer"
                onClick={onClose}
              >
                <LuArrowRightToLine size={25} />
              </button>
            </div>
          </div>

          <div className="py-[25px] px-[25px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
            <div>
              <div className="flex flex-col gap-[10px]">
                <div className="font-semibold text-[22px] flex flex-col gap-[7px]">
                  <label className="text-[16px]">
                    {t("name")}
                    <span className="text-[#ea0000]">*</span>
                  </label>
                  <input
                    value={inputData?.title}
                    onChange={(event) => {
                      setInputData((draft) => {
                        draft.title = event.target.value;
                      });
                    }}
                    placeholder={t("task_name")}
                    className="p-[15px] w-full bg-gray-100 border-b border-gray-300 font-normal text-[16px]"
                  />
                  {alert?.title && (
                    <div className="text-[#ea0000] text-[13px] py-[2px] font-normal">
                      {alert?.title}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-[25px]">
                <div className="flex flex-row gap-[30px]">
                  <div className="w-[50%] flex flex-col gap-[5px]">
                    <div className="font-semibold text-[15px] text-gray-700">
                      {t("type")}
                    </div>
                    <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                      <Select
                        className="w-full h-[55px] bg-gray-100 border-b border-gray-300 outline-none"
                        value={inputData?.type?.value}
                        name="color"
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.type.label = event.target.name;
                            draft.type.value = event.target.value;
                          });
                        }}
                      >
                        <MenuItem value="" className="p-[5px]">
                          None
                        </MenuItem>

                        {Array.isArray(taskType) &&
                          taskType?.map(
                            (typeItem: TaskTypeState, typeIndex: number) => (
                              <MenuItem
                                key={typeIndex}
                                value={typeItem?._id}
                                className="p-[5px]"
                              >
                                {typeItem?.name}
                              </MenuItem>
                            )
                          )}
                      </Select>
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col gap-[5px]">
                    <div className="font-semibold text-[15px] text-gray-700">
                      {t("due_date")}
                    </div>
                    <div className="text-[15px] text-gray-600 mt-[5px] fomt-normal">
                      <input
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.dueDate = event.target.value;
                          });
                        }}
                        placeholder="MM/DD/YYYY"
                        type="datetime-local"
                        lang="en"
                        className="w-full bg-gray-100 border-b border-gray-300 p-[13px] rounded-[5px] text-[16px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[30px] flex flex-col gap-[5px] border-1 border-gray-300 rounded-[5px]">
                  <div className="font-semibold text-[15px] text-gray-700 p-[15px] border-b-1 border-gray-300">
                    {t("description")}
                  </div>

                  <InputCKeditor
                    value={inputData?.description}
                    onChange={(event: any) => {
                      setInputData((draft) => {
                        draft.description = event;
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-gray-200 py-[15px] px-[20px] flex-mone">
            <div className="flex gap-x-[15px] justify-end">
              <button
                onClick={handleCancelAddTask}
                className="hover:bg-gray-100 text-blue-500 font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:text-white text-white font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
              >
                {t("create")}
              </button>
            </div>
          </div>
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

export default DrawerAddNewTask;
