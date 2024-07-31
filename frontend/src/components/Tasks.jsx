import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalState } from "../context/GlobalState";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskSection from "./TaskSection";

function Tasks() {
  console.log("ENTERED TASKS");
  // let todo, progress, completed;
  const { tasks, setTasks } = useContext(GlobalState);

  const [changeStatus, setChangeStatus] = useState(false);
  const [todo, setTodo] = useState();
  const [progress, setProgress] = useState();
  const [completed, setCompleted] = useState();

  useEffect(() => {
    const arr = tasks.todoTasks.map((el) => ({
      _id: el._id,
    }));
    const updateOrder = async () => {
      try {
        

        const res = await axios.patch(
          "http://localhost:3000/api/tasks/updateOrder",
          { array: arr },
          { withCredentials: true }
        );
        if (res.data?.status === "success") setChangeStatus(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (changeStatus) {
      updateOrder();
    }
  }, [changeStatus]);

  useEffect(() => {
    setTodo(tasks?.todoTasks);
    setProgress(tasks?.progressTasks);
    setCompleted(tasks?.completedTasks);
  }, [tasks]);

  // if (tasks) {
  //   todo = [...tasks?.todoTasks];
  //   progress = [...tasks?.progressTasks];
  //   completed = [...tasks?.completedTasks]; //clear doubt
  // }

  const handleDragStart = (event) => {
    // console.log("Dragging started:", event.active.id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current.sortable.index;
      // const array = over.id === "todo" ? todo : (over.id === "progress" ? progress : completed )
      const updatedTasks = arrayMove(todo, activeIndex, overIndex);
      setTasks((prev) => ({ ...prev, todoTasks: updatedTasks }));
      setChangeStatus(true);
      console.log("Entered handler");
    }
  };

  return (
    <section className="tasks w-[680px] px-2 cursor-default mx-2">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
       
          <div className="flex h-[85vh]  space-x-2">
            <TaskSection array={todo} gradient="bg-to-do-gradient" id="todo" />
            <TaskSection
              array={progress}
              gradient="bg-progress-gradient"
              id="progress"
            />
            <TaskSection
              array={completed}
              gradient="bg-completed-gradient"
              id="completed"
            />
          </div>
       
      </DndContext>
    </section>
  );
}

export default Tasks;
