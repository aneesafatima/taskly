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
  });

  const ids = array?.map((el, i) => `${id}-${i}`);
 
  

  return (

    array && 
    <div
      className="w-1/3 h-full flex flex-col  p-1 rounded-xl border-[1.5px] border-border-color border-dashed"
      ref={setNodeRef}
    >
      <div
        className={`w-full h-10 ${gradient} rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10`}
      >
        {id}
        {array ? `(${array.length})` : ""}
      </div>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="todo-list min-h- mt-2 space-y-2 overflow-y-scroll  scrollbar flex-grow">
          {array?.map((el, i) => (
            <TaskCard task={el} id={ids[i]} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

export default TaskSection;
