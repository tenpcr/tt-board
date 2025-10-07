/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookSquare,
  FaGithub,
} from "react-icons/fa";
import DropdownLanguage from "../dropdown/Language";

interface MenuTypes {
  label: string;
  href: string;
  target?: string;
}

interface SocialTypes {
  name: string;
  icon: any;
  href: string;
}

const socials: SocialTypes[] = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/t-t-software-solution",
  },
  {
    name: "Facebook",
    icon: FaFacebookSquare,
    href: "https://www.facebook.com/ttsoftwaresolution",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@ttsoftwaresolution",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/T-T-Software-Solution",
  },
];

function HomeFooter() {
  const { t } = useTranslation();

  const menu: MenuTypes[] = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("products_services"),
      href: "https://www.tt-ss.net/en/services",
      target: "blank",
    },
    {
      label: t("our_works"),
      href: "https://www.tt-ss.net/en/our-works",
      target: "blank",
    },
    {
      label: t("standards_n_certifications"),
      href: "https://www.tt-ss.net/en/our-standard",
      target: "blank",
    },
    {
      label: t("our_team"),
      href: "https://www.tt-ss.net/en/our-team",
      target: "blank",
    },
    {
      label: t("resources"),
      href: "https://portal.tt-ss.net/",
      target: "blank",
    },
    {
      label: t("career"),
      href: "https://www.tt-ss.net/en/career",
      target: "blank",
    },
    {
      label: t("contact_us"),
      href: "https://www.tt-ss.net/en/contact-us",
      target: "blank",
    },
  ];

  return (
    <footer className="w-full py-[30px] text-center text-sm text-gray-500 bg-white">
      <div className="w-[1280px] mx-auto flex flex-col gap-[20px]">
        <div className="w-full flex flex-row">
          <div className="flex-none">
            <Link href="/">
              <img src="/images/logo-black.svg" className="h-[30px]" />
            </Link>
          </div>
          <div className="flex-1 shrink grid grid-cols-4 gap-[15px]">
            {menu?.map((menuItem: MenuTypes, menuIndex: number) => (
              <div key={menuIndex}>
                {menuItem?.target === "blank" ? (
                  <div>
                    <Link href={menuItem?.href} legacyBehavior>
                      <a target="_blank">
                        <span className="hover:underline">
                          {menuItem?.label}
                        </span>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link href={menuItem?.href}>
                      <span className="hover:underline">{menuItem?.label}</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mx-auto border-t border-gray-200 pt-[15px] flex-row flex justify-between">
          <div className="flex flex-row gap-[20px] items-center">
            <div>
              <DropdownLanguage />
            </div>
            <div>© 2025 T.T. Software Solution. All rights reserved.</div>
          </div>
          <div className="flex flex-wrap gap-[10px] justify-end">
            {socials?.map((itemSocial: SocialTypes, indexSocial: number) => (
              <Link href={itemSocial.href} key={indexSocial} legacyBehavior>
                <a target="_blank">
                  <button className="rounded-full bg-gray-400 hover:bg-orange-600 active:bg-orange-700 text-white h-[35px] aspect-[1/1] flex justify-center items-center cursor-pointer">
                    {itemSocial.icon && <itemSocial.icon size={18} />}
                  </button>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
