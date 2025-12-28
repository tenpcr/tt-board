import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import * as taskService from "@/services/taskService";
import { TaskTypeState, TaskNewType, EditTaskProps } from "@/types/taskTypes";
import * as helper from "@/utils/helper";

const InputCKeditor = dynamic(() => import("@/components/form/InputCKeditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const taskTypeDefault: TaskTypeState[] = [
  {
    _id: "",
    name: "",
  },
];

function EditTask({
  task,
  setTaskNew,
  onCancel,
  toSave,
  alert,
}: EditTaskProps) {
  const { t } = useTranslation();
  const [taskType, setTaskType] = useState<TaskTypeState[]>(taskTypeDefault);

  useEffect(() => {
    const fetchTaskType = async () => {
      try {
        const response = await taskService.getTaskTypes();
        if (response?.status === 200) {
          setTaskType(response?.data?.data);
        }
      } catch (error: unknown) {
        console.log("Failed to fetch task types:", error);
      }
    };
    fetchTaskType();
  }, []);

  return (
    <>
      <div className="w-[600px] flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="py-[25px] px-[25px] flex-[2_2_0%] overflow-y-auto overflow-x-hidden flex flex-col gap-[20px]">
          <div>
            <div className="flex flex-col gap-[10px]">
              <div className="font-semibold text-[22px] flex flex-col gap-[7px]">
                <label className="text-[16px]">
                  {t("name")}
                  <span className="text-[#ea0000]">*</span>
                </label>
                <input
                  value={task?.title}
                  onChange={(event) => {
                    setTaskNew((draft: TaskNewType) => {
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
                      value={task?.type?._id}
                      name="color"
                      onChange={(event) => {
                        setTaskNew((draft: TaskNewType) => {
                          if (!draft.type) draft.type = {};
                          draft.type.label = event.target.name;
                          draft.type._id = event.target.value;
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
                      value={
                        task?.due_date &&
                        helper.isoToDatetimeLocal(task?.due_date)
                      }
                      onChange={(event) => {
                        console.log(event.target.value);
                        setTaskNew((draft: TaskNewType) => {
                          draft.due_date = event.target.value;
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
                  value={task?.description}
                  onChange={(event: string) => {
                    setTaskNew((draft: TaskNewType) => {
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
              onClick={onCancel}
              className="hover:bg-gray-100 text-blue-500 font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              onClick={toSave}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:text-white text-white font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTask;
