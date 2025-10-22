import MytasksTab from "@/components/dashboard/mytasks/Tab";
import KanbanBoard from "@/components/dashboard/mytasks/taskboards/KanbanBoard";
import TemplateDashboard from "@/components/dashboard/Template";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DrawerTask from "@/components/dashboard/mytasks/DrawerTask";
import DrawerAddNewTask from "@/components/dashboard/mytasks/DrawerAddNewTask";
import withAuthUser from "@/utils/withAuthUser";

function TaskBoards() {
  const [showAddTaskDrawer, setShowAddTaskDrawer] = useState<boolean>(false);
  const [reloadTask, setReloadTask] = useState<string>("");
  const { t } = useTranslation();

  return (
    <div className="h-full p-[20px]">
      <DrawerTask
        onReload={() => {
          setReloadTask(new Date()?.toString());
        }}
      />

      <DrawerAddNewTask
        show={showAddTaskDrawer}
        onAddSuccess={() => {
          setReloadTask(new Date()?.toString());
        }}
        onClose={() => {
          setShowAddTaskDrawer(false);
        }}
      />

      <div className="h-full">
        <Head>
          <title>Task Boards</title>
        </Head>

        <div className="flex flex-col">
          <MytasksTab
            onClickAddTask={() => {
              setShowAddTaskDrawer(true);
            }}
          />
          <div className="mt-[10px] flex flex-row justify-between items-center">
            <div>
              <h1 className="text-[20px] font-bold text-gray-700">
                {t("task_boards")}
              </h1>
            </div>
          </div>
          <div className="w-full mt-[15px]  ">
            <KanbanBoard
              reloadTask={reloadTask}
              onReload={() => {
                setReloadTask(new Date()?.toString());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthUser(TemplateDashboard(TaskBoards));
