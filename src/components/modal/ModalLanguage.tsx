/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import Select from "react-select";

interface ModalLanguageProps {
  show: boolean;
  onClose: () => void;
}

interface LanguageOption {
  label: string;
  value: string;
}

const languageOptions: LanguageOption[] = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "ไทย",
    value: "th",
  },
];

function ModalLanguage({ show = true, onClose }: ModalLanguageProps) {
  const { t, i18n } = useTranslation();

  const afterOpenModal = () => {
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  const changeLanguage = (languageCode?: string): void => {
    if (!languageCode) return;
    i18n.changeLanguage(languageCode);
    localStorage.setItem("lang", languageCode);
  };

  return (
    <Modal
      isOpen={show}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-full flex flex-col gap-[10px]">
        <div className="pb-3 text-[18px] font-semibold rounded ">
          <div className="flex flex-row gap-x-2 items-center">
            <div></div>
            <div className="text-[20px]">{t("change_language")}</div>
          </div>
        </div>
        <div className="gap-x-2 w-full z-50">
          <Select<{ label: string; value: string }>
            className="basic-single"
            classNamePrefix="select"
            defaultValue={languageOptions?.find(
              (item) => item.value === i18n.language
            )}
            name="language"
            options={languageOptions}
            onChange={(event: any) => {
              changeLanguage(event.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

const customStyles = {
  content: {
    width: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "27px",
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: "99999",
  },
};

export default ModalLanguage;
