import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../context/GlobalState";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import TaskSection from "./TaskSection";

import DragOverlayCard from "./DragOverlayCard";

function Tasks() {
  const { tasks, setTasks } = useContext(GlobalState);

  const [changeStatus, setChangeStatus] = useState(false);
  const [active, setActive] = useState();

  // if (tasks) {
  //   todo = [...tasks?.todo];
  //   progress = [...tasks?.progress];
  //   completed = [...tasks?.completed]; //clear doubt
  // }

  // useEffect(() => {
  //   const arr = tasks.todoTasks.map((el) => ({
  //     _id: el._id,
  //   }));
  //   const updateOrder = async () => {
  //     try {
  //       const res = await axios.patch(
  //         "http://localhost:3000/api/tasks/updateOrder",
  //         { array: arr },
  //         { withCredentials: true }
  //       );
  //       if (res.data?.status === "success") setChangeStatus(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (changeStatus) {
  //     updateOrder();
  //   }
  // }, [changeStatus]);

  const findIndex = (type, id, container) => {
    if (type === "task")
      return tasks[container].findIndex((el, i) => el._id === id);
    else return -1;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;

    setActive(tasks[active.data.current.section].find((el) => el._id === id));
  };

  const onHandleMove = (event) => {
    if (!event.over || !event.active) return;
    console.log(event);
    const { active, over } = event;
    const activeData = active.data.current;
    const overData = over.data.current;

    const activeContainer = [...tasks[activeData.section]];
    const overContainer = [...tasks[overData.section]];

    if (!activeContainer || !overContainer) return;

    const activeIndex = findIndex(
      activeData.type,
      active.id,
      activeData.section
    );
    const overIndex = findIndex(overData.type, over.id, overData.section);

    if (
      activeData.type === "task" &&
      overData.type === "task" &&
      active.id !== over.id
    ) {
      if (activeData.section === overData.section) {
        //For sorting tasks in same container

        const updatedArray = arrayMove(activeContainer, activeIndex, overIndex);
        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...updatedArray],
        }));
      } else if (activeData.section !== overData.section) {
        //For sorting tasks in different container

        const [removedItem] = activeContainer.splice(activeIndex, 1);
        console.log(removedItem);
        overContainer.splice(overIndex, 0, removedItem);

        setTasks((prev) => ({
          ...prev,
          [activeData.section]: [...activeContainer],
          [overData.section]: [...overContainer],
        }));
      }
    }

    if (
      activeData.type === "task" &&
      overData.type === "container" &&
      active.id !== over.id
    ) {
      //For sorting task over another container
      console.log("For sorting task over another container");

      const [removedItem] = activeContainer.splice(activeIndex, 1);
      overContainer.push(removedItem);

      setTasks((prev) => ({
        ...prev,
        [activeData.section]: [...activeContainer],
        [overData.section]: [...overContainer],
      }));
    }
  };

  const handleDragEnd = (event) => {
    setActive(null);
  };

  return (
    <section className="tasks w-[680px] px-2 cursor-default mx-2">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={onHandleMove}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
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
