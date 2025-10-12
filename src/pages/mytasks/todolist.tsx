/* eslint-disable @typescript-eslint/no-explicit-any */
import MytasksTab from "@/components/dashboard/mytasks/Tab";
import TemplateDashboard from "@/components/dashboard/Template";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import DrawerTask from "@/components/dashboard/mytasks/DrawerTask";
import * as taskService from "@/services/taskService";
import { useLoading } from "@/hooks/useLoading";
import { useDispatch } from "react-redux";
import { openTaskView } from "@/redux/slices/taskViewSlice";
import { useTranslation } from "react-i18next";
import * as Helper from "@/utils/helper";
import { useRouter } from "next/router";

const TASK_LIMIT = 20;

function TodoList() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const loading = useLoading();

  useEffect(() => {
    const fetchTasks = async () => {
      loading.active && loading.active(true);
      try {
        const params = {
          limit: TASK_LIMIT,
          page: router?.query?.page ?? 1,
        };

        const response = await taskService.getTasks(params);
        if (response?.status === 200) {
          setTasks(response?.data?.data);
          setTaskCount(response?.data?.task_count);
          setPageCount(response?.data?.page_count);
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
      } finally {
        setTimeout(() => {
          loading.active && loading.active(false);
        }, 1000);
      }
    };
    fetchTasks();
  }, [router?.query?.page]);

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage,
      },
    });
  };

  const currentPage =
    typeof router.query.page === "string" ? router.query.page : "1";

  const Pagination = () => {
    return (
      <div className="flex flex-row gap-[10px] items-center">
        <div className="p-[6px] text-[14px] text-gray-500">
          Page{" "}
          {parseInt(
            typeof router?.query?.page === "string" ? router.query.page : "1"
          ) > 0
            ? typeof router?.query?.page === "string"
              ? router.query.page
              : 1
            : 1}
          /{pageCount}
        </div>

        <button
          onClick={() => {
            if (parseInt(currentPage) > 1) {
              handlePageChange(parseInt(currentPage) - 1);
            }
          }}
          className={`${
            parseInt(currentPage) <= 1
              ? "text-gray-200"
              : "text-gray-400 hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
          } p-[6px] border border-gray-300 rounded-l-[5px]`}
        >
          <IoIosArrowBack size={18} />
        </button>
        <button
          onClick={() => {
            if (pageCount > parseInt(currentPage)) {
              handlePageChange(parseInt(currentPage) + 1);
            }
          }}
          className={`${
            pageCount <= parseInt(currentPage)
              ? "text-gray-200"
              : "text-gray-400 hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
          } p-[6px] border border-gray-300 rounded-l-[5px]`}
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="h-full p-[20px]">
      <DrawerTask open={isOpen} isOpen={isOpen} setOpen={setOpen} />

      <Head>
        <title>Todo List</title>
      </Head>
      <div>
        <MytasksTab />
        <div className="mt-[10px] flex flex-row justify-between items-center">
          <div>
            <h1 className="text-[20px] font-bold text-gray-700">
              {t("todo_list")}
            </h1>
          </div>
          <Pagination />
        </div>
        <div className="w-full mt-[15px]">
          <table className="w-full border-t border-gray-300">
            <thead>
              <tr>
                <th className="border-none w-[40%] p-[15px] text-left text-gray-600 text-[14px] font-medium">
                  Tasks
                </th>
                <th className="border-none w-[10%] p-[15px] text-left text-gray-400 text-[14px] font-medium">
                  Status
                </th>
                <th className="border-none w-[10%] p-[15px] text-left text-gray-400 text-[14px] font-medium">
                  Type
                </th>
                <th className="border-none w-[10%] p-[15px] text-left text-gray-400 text-[14px] font-medium">
                  Due date
                </th>
              </tr>
            </thead>
            <tbody className="border-none">
              {Array.isArray(tasks) &&
                tasks?.map((taskItem: any, taskIndex: number) => (
                  <tr key={taskIndex} className="hover:bg-slate-100">
                    <td
                      onClick={() => {
                        dispatch(openTaskView({ taskId: taskItem?._id }));
                      }}
                      className="border border-gray-300 p-[15px] text-[15px] text-gray-500 border-l-0 leading-[1.8em] cursor-pointer hover:underline"
                    >
                      {taskItem?.title}
                    </td>
                    <td className="border border-gray-300 p-[15px] text-[14px] text-gray-500 align-top">
                      {taskItem?.status?.name && (
                        <div className="flex flex-row gap-[8px]">
                          <div
                            className="w-[15px] h-[15px] rounded-[5px]  mt-[2px] flex-none"
                            style={{
                              backgroundColor: taskItem?.status?.color
                                ? taskItem?.status?.color
                                : "#e1e1e1",
                            }}
                          />
                          <div className="line-clamp-1">
                            {taskItem?.status?.name ?? "None"}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-[15px] text-[14px] text-gray-500 align-top">
                      {taskItem?.type?.name}
                    </td>
                    <td className="border border-gray-300 p-[15px] text-[14px] text-gray-500 align-top border-r-0">
                      {taskItem?.due_date && (
                        <div className="flex flex-col gap-[6px]">
                          <div>{Helper.getDate(taskItem?.due_date)}</div>
                          <div className="flex flex-row gap-[5px]">
                            <IoMdTime size={18} />
                            {Helper.getTime(taskItem?.due_date, "th")}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[10px] flex flex-row justify-between items-center">
          <div className="p-[6px] text-[14px] text-gray-400">
            Total: {taskCount?.toLocaleString()}{" "}
            {taskCount === 1 ? "task" : "tasks"}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default TemplateDashboard(TodoList);
