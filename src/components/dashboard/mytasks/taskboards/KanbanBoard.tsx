/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column, { ColumnType } from "./Column";
import * as taskService from "@/services/taskService";
import * as boardService from "@/services/boardService";

interface KanbanBoardProps {
  reloadTask: string;
  onReload: () => void;
}

function KanbanBoard({ reloadTask, onReload }: KanbanBoardProps) {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const fetchBaordTasks = async () => {
      try {
        const response = await boardService.getBoardTasks();
        if (response?.status === 200) {
          setColumns(response?.data?.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchBaordTasks();
  }, [reloadTask]);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumn = columns.find((column) =>
      column.cards.some((card) => card._id === activeId)
    );

    const overCardColumn = columns.find((column) =>
      column.cards.some((card) => card._id === overId)
    );

    const overColumn =
      overCardColumn || columns.find((column) => column._id === overId);

    if (!activeColumn || !overColumn || activeColumn._id === overColumn._id)
      return;

    const activeCard = activeColumn.cards.find((card) => card._id === activeId);

    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column._id === activeColumn._id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card._id !== activeId),
          };
        }

        if (column._id === overColumn._id) {
          const alreadyExists = column.cards.find(
            (card) => card._id === activeId
          );
          if (!alreadyExists && activeCard) {
            return {
              ...column,
              cards: [...column.cards, activeCard],
            };
          }
        }

        return column;
      });
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const taskId = active?.id;
    const progessId = active?.data?.current?.sortable?.containerId;

    handleChangeProgress(taskId, progessId);

    if (activeId === overId) return;

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        const cardIndex = column.cards.findIndex(
          (card) => card._id === activeId
        );
        const overIndex = column.cards.findIndex((card) => card._id === overId);

        if (cardIndex !== -1 && overIndex !== -1) {
          const updatedCards = [...column.cards];
          const [movedCard] = updatedCards.splice(cardIndex, 1);
          updatedCards.splice(overIndex, 0, movedCard);

          return {
            ...column,
            cards: updatedCards,
          };
        }

        return column;
      })
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChangeProgress = async (taskId: any, progressId: any) => {
    if (taskId) {
      try {
        const formData = {
          progress_id: progressId,
        };

        const response = await taskService.updateTaskProgressById(
          taskId,
          formData
        );
        if (response?.status === 200) {
          onReload();
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full overflow-y-hidden overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div
          className="App gap-[15px] w-fit"
          style={{ display: "flex", flexDirection: "row", padding: "10px" }}
        >
          {columns.map((column: ColumnType) => (
            <Column
              key={column?._id}
              _id={column?._id}
              name={column?.name}
              cards={column?.cards}
              count={column?.count}
              color={column?.color}
            ></Column>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
