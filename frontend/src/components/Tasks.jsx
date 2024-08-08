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
  const { tasks, setTasks } = useContext(GlobalState);
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
    <section className="tasks w-[680px] px-2 cursor-default mx-2 overflow-hidden">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext
        onDragStart={(event) => handleDragStart(event, setActive, tasks)}
        onDragMove={(event) => onHandleMove(event, setData, setTasks,tasks, arrayMove)}
        onDragEnd={() => handleDragEnd( setActive, data)}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="flex h-[85vh]  space-x-2">
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
