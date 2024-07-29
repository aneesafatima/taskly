import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

function TaskSection({ array, gradient, id }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  const ids = array?.map((el, i) => `${id}-${i}`);
  console.log(ids);
  return (
    <div
      className="w-1/3 h-full overflow-y-scroll  scrollbar  p-1 rounded-xl border-[1.5px] border-border-color border-dashed"
      ref={setNodeRef}
    >
      <div
        className={`w-full h-10 ${gradient} rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10`}
      >
        {id}
        {array ? `(${array.length})` : ""}
      </div>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="todo-list mt-2 space-y-2">
          {array?.map((el, i) => (
            <TaskCard task={el} id={ids[i]} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

export default TaskSection;
