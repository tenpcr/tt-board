import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { openTaskView } from "@/redux/slices/taskViewSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export type CardType = {
  _id: string;
  title: string;
  type?: { name: string };
};

const Card = ({ _id, title, type }: CardType) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: _id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="group relative min-h-[120px] py-[15px] px-[15px] bg-white rounded-[5px] shadow-sm hover:shadow-md active:shadow-xl flex flex-col justify-between gap-[15px] cursor-default"
      style={{ transform: CSS.Transform.toString(transform) }}
      id={_id}
    >
      <div className="text-[15px] font-semibold text-slate-600 line-clamp-2">
        {title}
      </div>

      <div className="flex flex-row">
        <div className="flex flex-row flex-1 shrink">
          {type?.name && (
            <div className="rounded-[5px] bg-gray-100 py-[3px] px-[10px] text-[12px] text-gray-500">
              {type?.name}
            </div>
          )}
        </div>
        <div className="flex-none">
          <div
            className="z-[9999] hidden group-hover:block rounded-[5px] bg-orange-500 hover:bg-orange-600 active:bg-orange-700 py-[3px] px-[10px] text-[12px] text-white cursor-pointer"
            onClick={() => {
              dispatch(openTaskView({ taskId: _id }));
            }}
          >
            {t("view_bt")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
