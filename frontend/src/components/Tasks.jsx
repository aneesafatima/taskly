import React, { useContext } from "react";

import { GlobalState } from "../context/GlobalState";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';

import TaskSection from "./TaskSection";

//ACTIVE

/*active
: 
data
: 
{current: undefined}
id
: 
"todo-1"
rect
: 
{current: {…}}*/


//OVER

/*over
: 
data
: 
{current: undefined}
disabled
: 
false
id
: 
"todo"
rect
: 
Rect {width: 216, height: 550.7916870117188, …}*/

function Tasks() {
  let todo, progress, completed;
  const { tasks } = useContext(GlobalState);
  if (tasks) {
    todo = [...tasks?.todoTasks];
    progress = [...tasks?.progressTasks];
    completed = [...tasks?.completedTasks]; //clear doubt
  }
  const handleDragStart = (event) => {
    console.log("Dragging started:", event.active.id);
  };
  const handleDragEnd = (event) => {

    const { active, over } = event;
    console.log(event)

    
    // if (active.id.split("-")[0] === over.id) {
    //   const array = over.id === "todo" ? todo : (over.id === "progress" ? progress : completed )
    //   const oldIndex = active.id.split("-")[1]
    //   const items = arrayMove(array, )
    // }

   
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
