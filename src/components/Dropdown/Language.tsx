/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from "react-i18next";

const languageOptions = [
  {
    id: "en",
    label: "English",
    value: "en",
  },
  {
    id: "th",
    label: "ไทย",
    value: "th",
  },
];

function DropdownLanguage() {
  const { i18n } = useTranslation();

  const countryOptionTemplate = (option: any) => {
    return (
      <div className="country-item bg-white shadow-xl">
        <div className="hover:bg-slate-200 py-[8px] px-[10px] text-[14px] text-gray-500">
          {option?.label}
        </div>
      </div>
    );
  };

  const changeLanguage = (languageCode?: string): void => {
    if (!languageCode) return;
    i18n.changeLanguage(languageCode);
    localStorage.setItem("lang", languageCode)
  };

  return (
    <div className="card flex justify-content-center">

    </div>
  );
}

export default DropdownLanguage;
