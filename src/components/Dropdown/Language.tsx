/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
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
  const [language, setLanguage] = useState<string>("EN");
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
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={
          languageOptions?.find((item) => item.value === i18n.language)?.value
        }
        onChange={(event: any) => {
          changeLanguage(event.value);
        }}
        options={languageOptions}
        optionLabel="label"
        placeholder="Select a Language"
        className="bg-white border-1 border-gray-300 py-[10px] px-[20px] flex flex-row gap-[10px] rounded"
        itemTemplate={countryOptionTemplate}
      />
    </div>
  );
}

export default DropdownLanguage;
