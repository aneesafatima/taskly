import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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
  MouseSensor
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import TaskSection from "./TaskSection";

import DragOverlayCard from "./DragOverlayCard";

function Tasks() {
  const { tasks, setTasks } = useContext(GlobalState);

  const [changeStatus, setChangeStatus] = useState(false);
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

  const getIndex = (type, id, container) => {
    if (type === "task")
      return tasks[container].findIndex((el, i) => el._id === id);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

    setActive(tasks[active.data.current.section].find((el) => el._id === id));
  };

  const onHandleMove = (event) => {
    if (!event.over || !event.active) {
      setData(null);
      return;
    }
    const { active, over } = event;
    const activeData = active.data.current;
    const overData = over.data.current;

    const activeContainer = [...tasks[activeData.section]];
    const overContainer = [...tasks[overData.section]];

    if (!activeContainer || !overContainer) return;

    const activeIndex = getIndex(
      activeData.type,
      active.id,
      activeData.section
    );
    const overIndex = getIndex(overData.type, over.id, overData.section);

    if (
      activeData.type === "task" &&
      overData.type === "task" &&
      active.id !== over.id &&
      activeIndex !== -1 &&
      overIndex !== -1
    ) {
      if (activeData.section === overData.section) {
        //For sorting tasks in same container

        const updatedArray = arrayMove(activeContainer, activeIndex, overIndex);
        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...updatedArray],
        }));

        setData({
          array: [...updatedArray],
        });
      } else if (activeData.section !== overData.section) {
        //For sorting tasks in different container
        console.log("Different container")

        const [removedItem] = activeContainer.splice(activeIndex, 1);
        overContainer.splice(overIndex, 0, removedItem);

        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...activeContainer],
          [overData.section]: [...overContainer],
        }));

        setData({
          section: overData.section,
          array: [...overContainer],
        });
      }
    }

    if (
      activeData.type === "task" &&
      overData.type === "container" &&
      active.id !== over.id &&
      overData.section !== activeData.section &&
      activeIndex !== -1
    ) {
      //For sorting task over another container

      const [removedItem] = activeContainer.splice(activeIndex, 1);
      overContainer.push(removedItem);

      setTasks((prev) => ({
        ...prev,
        [activeData.section]: [...activeContainer],
        [overData.section]: [...overContainer],
      }));

      setData({
        section: overData.section,
        array: [...overContainer],
      });
    }
  };

  const handleDragEnd = async () => {
    setActive(null);
    console.log(data);

    if (data) {
      try {
        await axios.patch(
          "http://localhost:3000/api/tasks/updateOrder",
          { data },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="tasks w-[680px] px-2 cursor-default mx-2 overflow-hidden">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={onHandleMove}
        onDragEnd={handleDragEnd}
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
