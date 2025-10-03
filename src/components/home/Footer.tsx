/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookSquare,
  FaGithub,
} from "react-icons/fa";

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

const menu: MenuTypes[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products/Services",
    href: "https://www.tt-ss.net/en/services",
    target: "blank",
  },
  {
    label: "Our Works",
    href: "https://www.tt-ss.net/en/our-works",
    target: "blank",
  },
  {
    label: "Standards & Certifications",
    href: "https://www.tt-ss.net/en/our-standard",
    target: "blank",
  },
  {
    label: "Our Team",
    href: "https://www.tt-ss.net/en/our-team",
    target: "blank",
  },
  {
    label: "Resources",
    href: "https://portal.tt-ss.net/",
    target: "blank",
  },
  {
    label: "Career",
    href: "https://www.tt-ss.net/en/career",
    target: "blank",
  },
  {
    label: "Contact Us",
    href: "https://www.tt-ss.net/en/contact-us",
    target: "blank",
  },
];

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
  return (
    <footer className="w-full py-[30px] bg-white text-center text-sm text-gray-500">
      <div className="w-[1280px] mx-auto flex flex-col gap-[20px]">
        <div className="w-full flex flex-row">
          <div className="flex-none">
            <img src="/images/logo-black.svg" className="h-[30px]" />
          </div>
          <div className="flex-1 shrink grid grid-cols-4 gap-[15px]">
            {menu?.map((menuItem: MenuTypes, menuIndex: number) => (
              <div key={menuIndex}>
                {menuItem?.target === "blank" ? (
                  <Link href={menuItem?.href} legacyBehavior>
                    <a target="_blank">
                      <div>{menuItem?.label}</div>
                    </a>
                  </Link>
                ) : (
                  <Link href={menuItem?.href}>
                    <div>{menuItem?.label}</div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mx-auto border-t border-gray-200 py-[15px] flex-row flex justify-between">
          <div>
            <span>© 2025 T.T. Software Solution. All rights reserved.</span>
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
