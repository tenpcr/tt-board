import { IoNotificationsOutline } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import ModalLanguage from "../modals/ModalLanguage";

function NavbarDashboard() {
  const { t } = useTranslation();
  const [modalLanguageIsOpen, setModalLanguageIsOpen] =
    useState<boolean>(false);

  return (
    <div className="w-full flex flex-row justify-between bg-white py-[7px] px-[15px] border-b border-gray-300 top-0">
      <div className="flex-1 shrink"></div>
      <div className="flex-none flex flex-row items-center gap-[10px]">
        <Menu as="div" className="w-full">
          <Menu.Button className="text-gray-500 bg-slate-50 hover:bg-slate-100 active:bg-gray-200 rounded-[5px] h-[40px] w-[40px] p-[5px] flex justify-center items-center cursor-pointer">
            <IoNotificationsOutline size={22} />
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
            <Menu.Items className="cursor-default	w-[350px] max-h-[calc(100vh_-_100px)] max-w-full  z-50 origin-top-right absolute right-0 mt-[10px] mr-5 rounded-md shadow-lg py-1 bg-white focus:outline-none">
              <div className="w-full bg-white flex flex-col">
                <div className="text-[18px] font-semibold text-gray-600 p-4 border-b border-gray-200 relative w-full ">
                  {t("notifications")}
                </div>
                <div className="w-full p-[10px]">
                  <div className="p-[10px] bg-slate-50 border-1 border-slate-200 text-center text-gray-600 text-[14px]">
                    {t("no_data")}
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="flex flex-col">
          <Menu.Button className="bg-gray-200 rounded-full aspect-[1/1] h-[40px] overflow-hidden cursor-pointer">
            <img
              src="/images/user/avatar.jpg"
              className="object-cover w-full h-full hover:brightness-[1.10] active:brightness-[1.25]"
            />
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
            <Menu.Items className="mt-[50px] z-50 origin-top-right absolute right-2 mt-2 w-56 rounded-md bg-white shadow-md border-1 border-gray-200 focus:outline-none">
              <Menu.Item>
                {() => (
                  <div className="w-full flex flex-row gap-[10px] py-[10px] px-[10px] items-center border-b border-gray-300">
                    <div className="flex-none bg-gray-200 rounded-full aspect-[1/1] h-[45px] overflow-hidden">
                      <img
                        src="/images/user/avatar.jpg"
                        className="object-cover w-full h-full hover:brightness-[1.10] active:brightness-[1.25]"
                      />
                    </div>
                    <div className="font-semibold text-gray-500 text-[15px] line-clamp-1 flex-1 shrink">
                      TT-SS Team
                    </div>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <div
                    className="w-full text-gray-500 text-[14px] flex flex-row gap-[5px] py-[15px] px-[10px] items-center cursor-pointer hover:bg-slate-100"
                    onClick={(): void => setModalLanguageIsOpen(true)}
                  >
                    <div className="w-[25px] flex items-center justify-center">
                      <IoLanguage size={20} />
                    </div>
                    <div className="flex-1 shrink">{t("change_language")}</div>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <div className="w-full text-gray-500 text-[14px] flex flex-row gap-[5px] py-[15px] px-[10px] items-center cursor-pointer hover:bg-slate-100">
                    <div className="w-[25px] flex items-center justify-center">
                      <IoLogOutOutline size={20} />
                    </div>
                    <div className="flex-1 shrink">{t("logout")}</div>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <ModalLanguage
        show={modalLanguageIsOpen}
        onClose={() => {
          setModalLanguageIsOpen(false);
        }}
      />
    </div>
  );
}

export default NavbarDashboard;
