import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";
import { FaListUl } from "react-icons/fa6";
import * as helper from "@/utils/helper";

export type ColumnType = {
  _id: string;
  name: string;
  color?: string;
  count?: number;
  cards: CardType[];
};

const Column = ({ _id, name, color, count, cards }: ColumnType) => {
  const { setNodeRef } = useDroppable({ id: _id });

  return (
    <div
      ref={setNodeRef}
      className="290px  shadow-md border-1 border-gray-200 rounded-[10px]"
      style={{
        width: "290px",
        background: "rgba(245,247,249,1.00)",
        marginRight: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className=" flex-none text-[15px] font-semibold py-[15px] px-[20px] bg-white flex flex-row justify-between items-center shadow-sm">
        <div
          className="rounded-full py-[3px] px-[15px] line-clamp-1  text-shadow-sm"
          style={{
            backgroundColor: color ? color : "#e1e1e1",
            color: color ? "#ffffff" : "#666666",
          }}
        >
          {name}
        </div>
        <div className="text-[15px] text-gray-500 font-normal flex flex-row items-center gap-[5px]">
          <FaListUl size={15} />
          {helper.numberFormat(count || 0)}
        </div>
      </div>
      <SortableContext
        id={_id}
        items={cards.map((card) => card?._id)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-col gap-[15px] py-[15px] px-[15px]">
          {cards?.length === 0 ? (
            <div className="text-center text-gray-300 italic p-[10px] text-[14px]">
              Drop card here
            </div>
          ) : (
            cards.map((card) => (
              <Card
                key={card?._id}
                _id={card?._id}
                title={card?.title}
                type={card?.type}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
