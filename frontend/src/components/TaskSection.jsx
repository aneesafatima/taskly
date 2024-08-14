import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskSection({ array, gradient, id }) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "container",
      section: id,
    },
  });

  return (
    array && (
      <div
        className="w-full h-full md:w-1/3 flex flex-col  p-1 rounded-xl border-[1.5px] border-border-color border-dashed z-20"
        ref={setNodeRef}
      >
        <div
          className={`w-full h-10 ${gradient} rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10`}
        >
          {id}
          {array ? `(${array.length})` : ""}
        </div>

        <ul className="todo-list  mt-2 space-y-2 overflow-y-scroll  scrollbar flex-grow">
          <SortableContext
            items={array.map((el) => el._id)}
            strategy={verticalListSortingStrategy}
          >
            {array?.map((el, i) => (
              <TaskCard task={el} id={el._id} section={id} key={i} />
            ))}
          </SortableContext>
        </ul>
      </div>
    )
  );
}

export default TaskSection;
