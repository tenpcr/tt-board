import MytasksTab from "@/components/dashboard/mytasks/Tab";
import TemplateDashboard from "@/components/dashboard/Template";
import Head from "next/head";

function TaskBoards() {
  return (
    <div className="h-full">
      <Head>
        <title>Task Boards</title>
      </Head>
    </div>
  );
}

export default TemplateDashboard(TaskBoards);
