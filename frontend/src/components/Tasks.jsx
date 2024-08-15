import React, { useContext, useEffect, useState } from "react";

import { GlobalState } from "../context/GlobalState";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import TaskSection from "./TaskSection";

import DragOverlayCard from "./DragOverlayCard";
import { onHandleMove, handleDragEnd, handleDragStart } from "../assets/dnd";

function Tasks() {
  const { tasks, setTasks, setAddTask } = useContext(GlobalState);
  const [active, setActive] = useState();
  const [data, setData] = useState();
  

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(
    touchSensor,
    useSensor(KeyboardSensor),
    useSensor(PointerSensor),
    useSensor(MouseSensor)
  );

  return (

    <section className="tasks min-h-svh w-screen lg:w-[680px]  md:w-full  px-2 cursor-default sm:mx-2 scrollbar">
      <h2 className="font-lato font-bold text-xl md:text-3xl mode-items m-6 mt-[38px] ml-[38px] md:ml-0 md:mt-6 ">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext
        onDragStart={(event) => handleDragStart(event,setAddTask, setActive, tasks)}
        onDragMove={(event) => onHandleMove(event, setData, setTasks,tasks, arrayMove)}
        onDragEnd={() => handleDragEnd(setActive, data)}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="flex h-fit px-4 xs:px-0 sm:h-[85vh] flex-wrap xs:flex-nowrap sm:space-x-2 space-y-4 sm:space-y-0">
          <TaskSection
            array={[...tasks?.todo]}
            gradient="bg-to-do-gradient"
            id="todo"
          />
          <TaskSection
            array={[...tasks?.progress]}
            gradient="bg-progress-gradient"
            id="progress"
          />
          <TaskSection
            array={[...tasks?.completed]}
            gradient="bg-completed-gradient"
            id="completed"
          />
        </div>

        <DragOverlay>{active && <DragOverlayCard task={active} />}</DragOverlay>
      </DndContext>
    </section>
  );
}

export default Tasks;
