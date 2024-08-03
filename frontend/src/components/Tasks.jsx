import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../context/GlobalState";
import { DndContext,   closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import TaskSection from "./TaskSection";

function Tasks() {
  const { tasks, setTasks } = useContext(GlobalState);
  console.log(tasks);

  const [changeStatus, setChangeStatus] = useState(false);
  const [activeId, setActiveId] = useState()

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

  const findContainer = () => {

  }



  const handleDragStart = (event) => {
  const {active} = event;
  const {id} = active;
  setActiveId(id);
  };

  const onHandleMove = (event) => {
    if (!event.over || !event.active) return;
    const {active, over} = event;
    const activeData = active.data.current;
    const overData = over.data.current;
    console.log(event)


    const activeContainer = tasks[activeData.section];
    const overContainer = tasks[overData.section];

    if(activeData.type === "task" && overData.type === "task" && active.id != over.id){

      const activeIndex = activeData.sortable.index;
      const overIndex = overData.sortable.index;

      if(activeData.section === overData.section){
        const updatedArray = arrayMove(activeContainer, activeIndex, overIndex);
        setTasks(prev => ({...prev, [activeData.section] : updatedArray}))
      }
      
    }



  
   
      
  };

  // const handleDragEnd = (event) => {

  //   const { active, over } = event;
  //   if(!over) return
  //   console.log(event)
  //  const overContainer = over.data.current.container;
  //  const activeContainer = active.data.current.container;

  //   if (active.id !== over.id && (activeContainer === overContainer)) {
  //     const activeIndex = active.data.current.sortable.index;
  //     const overIndex = over.data.current.sortable.index;
  //     const array = overContainer === "todo" ? todo : (overContainer=== "progress" ? progress : completed )
  //     const updatedTasks = arrayMove(array, activeIndex, overIndex);
  //     setTasks((prev) => ({ ...prev, [over.data.current.container]: updatedTasks }));
  //     // setChangeStatus(true);
  //     // console.log("Entered handler");
  //   }
  // };

  // const handleDragEnd = (event) => {
  //   setIsDragging(false);
  // };
  return (
    <section className="tasks w-[680px] px-2 cursor-default mx-2">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={onHandleMove}
        // onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        
          <div className="flex h-[85vh]  space-x-2">
            <TaskSection array={[...tasks?.todo]} gradient="bg-to-do-gradient" id="todo" />
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
        

<DragOverlay>
{activeId &&  <div className="w-40 h-40 bg-yellow-200 opacity-50">I am being dragged</div>}
      </DragOverlay>
      </DndContext>
    </section>
  );
}

export default Tasks;
