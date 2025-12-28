/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

interface ModalConfirmProps {
  show: boolean;
  toConfirm: () => void;
  onClose: () => void;
  title?: string;
  detail?: string;
}

function ModalConfirm({
  show,
  toConfirm,
  onClose,
  title,
  detail,
}: ModalConfirmProps) {
  const { t } = useTranslation();

  const afterOpenModal = () => {
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    onClose();
  };

  const handleToConfirm = () => {
    document.body.style.overflow = "auto";
    toConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {title && (
        <div className="mb-4 flex items-center gap-x-3">
          <div className="flex-none">
            <IoMdInformationCircleOutline size={25} />
          </div>
          <div className="flex-1 shrink">
            <span className="text-[20px] text-center text-[#171725] font-semibold ">
              {title}
            </span>
          </div>
        </div>
      )}

      <div className="py-[10px]">
        <span className="text-[16px] text-center text-[#44444F]">{detail}</span>
      </div>

      <div className="w-full pt-[15px] flex-mone">
        <div className="flex gap-x-[10px] justify-end">
          <button
            onClick={closeModal}
            className="hover:bg-gray-100 text-blue-500 font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleToConfirm}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:text-white text-white font-semibold py-[13px] px-[25px] rounded-[10px] cursor-pointer"
          >
            {t("confirm")}
          </button>
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
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: "99999",
  },
};

export default ModalConfirm;
