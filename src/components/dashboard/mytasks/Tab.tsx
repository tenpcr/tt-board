import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { TbLayoutBoard } from "react-icons/tb";

type MytasksTabProps = {
  onClickAddTask: () => void;
};

function MytasksTab({ onClickAddTask }: MytasksTabProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="w-full flex flex-row justify-between items-center mb-[20px]">
      <div className="flex flex-row gap-[8px] p-[5px] bg-slate-100 rounded-[10px]">
        <Link href="/mytasks/todolist">
          <button
            className={`${
              router.pathname === "/mytasks/todolist"
                ? "bg-white cursor-default"
                : "hover:bg-slate-300 active:bg-slate-400 cursor-pointer"
            } flex flex-row gap-[5px] items-center text-[14px] text-gray-600 px-[20px] py-[10px] rounded-[10px] transition`}
          >
            <div className="flex-none">
              <LuListTodo size={20} />
            </div>
            <div className="flex-1 shrink">{t("table_view")}</div>
          </button>
        </Link>
        <Link href="/mytasks/taskboards">
          <button
            className={`${
              router.pathname === "/mytasks/taskboards"
                ? "bg-white cursor-default"
                : "hover:bg-slate-300 active:bg-slate-400 cursor-pointer"
            } flex flex-row gap-[5px] items-center text-[14px] text-gray-600 px-[20px] py-[10px] rounded-[10px] transition`}
          >
            <div className="flex-none">
              <TbLayoutBoard size={20} />
            </div>
            <div className="flex-1 shrink">{t("kanban_board")}</div>
          </button>
        </Link>
      </div>
      <div>
        <button
          onClick={onClickAddTask}
          className="flex flex-row gap-[5px] items-center text-[14px] border-1 border-blue-500 text-white px-[20px] py-[10px] rounded-[10px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:text-white transition cursor-pointer"
        >
          <div className="flex-none">
            <IoMdAdd size={20} />
          </div>
          <div className="flex-1 shrink">{t("add_new")}</div>
        </button>
      </div>
    </div>
  );
}

export default MytasksTab;
