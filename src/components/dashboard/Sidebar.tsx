/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { FaListUl } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { TbLayoutBoard } from "react-icons/tb";
import { useImmer } from "use-immer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function SidebarDashboard() {
  const router = useRouter();
  const { t } = useTranslation();

  const sidebarMenuDefault = [
    {
      label: t("my_tasks"),
      icon: FaListUl,
      show: false,
      sub_menu: [
        {
          label: t("todo_list"),
          href: "/mytasks/todolist",
          icon: LuListTodo,
        },
        {
          label: t("task_boards"),
          href: "/mytasks/taskboards",
          icon: TbLayoutBoard,
        },
      ],
    },
  ];

  const [sidebarMenu, setSidebarMenu] = useImmer<any[]>([]);

  useEffect(() => {
    setSidebarMenu(sidebarMenuDefault);
  }, [t]);

  return (
    <div className="bg-[#0f1d41] text-[#d4e4ef] text-[14px] w-[250px] h-full  flex flex-col">
      <div className="py-[15px] px-[20px] flex justify-center border-b border-slate-500">
        <div className="bg-[url(/images/logo-white.webp)] bg-no-repeat bg-contain h-[30px] border-white aspect-[205/50]"></div>
      </div>
      <aside className="py-[15px] flex-1 shrink overflow-y-auto p-[10px]">
        <div className="flex flex-col gap-[10px]">
          {sidebarMenu?.map((menuItem: any, menuIndex: number) => (
            <div key={menuIndex}>
              <button
                className={` w-full py-[8px] px-[10px] hover:bg-[#2d4070] rounded flex flex-row gap-[10px] items-center cursor-pointer`}
                onClick={() => {
                  setSidebarMenu((draft) => {
                    draft[menuIndex].show = menuItem?.show ? false : true;
                  });
                }}
              >
                <div className="w-[20px]">
                  {menuItem?.icon && <menuItem.icon />}
                </div>
                <div>{menuItem?.label}</div>
              </button>

              <div
                className={` ${
                  menuItem?.show ||
                  menuItem?.sub_menu?.some(
                    (sub_menu: any) => sub_menu.href === router.pathname
                  )
                    ? "show"
                    : "hidden"
                }`}
              >
                {menuItem?.sub_menu?.map(
                  (subMenuItem: any, subMenuIndex: number) => (
                    <Link
                      href={subMenuItem?.href}
                      key={`${menuIndex}_${subMenuIndex}`}
                    >
                      <div
                        className={`${
                          router.pathname === subMenuItem?.href
                            ? "bg-[#2d4070] font-semibold"
                            : ""
                        } group py-[8px] px-[10px] hover:bg-[#2d4070] rounded flex flex-row gap-[10px] items-center cursor-pointer`}
                      >
                        <div className="w-[20px]">
                          {subMenuItem?.icon && (
                            <subMenuItem.icon className="group-hover:block hidden" />
                          )}
                        </div>
                        <div> {subMenuItem?.label}</div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default SidebarDashboard;
