import TemplateDashboard from "@/components/dashboard/Template";
import Head from "next/head";

function TodoList() {
  return (
    <div className="h-full">
      <Head>
        <title>Todo List</title>
      </Head>
    </div>
  );
}

export default TemplateDashboard(TodoList);
