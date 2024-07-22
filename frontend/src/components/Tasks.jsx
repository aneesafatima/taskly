import React from "react";
import TaskCard from "./TaskCard";


function Tasks({ tasks }) {
  console.log(tasks);
  let todo = [];
  let progress = [];
  let completed = [];
  tasks.forEach((el) => {
    if (el.status === "todo") todo.push(el);
    else if (el.status === "progress") progress.push(el);
    else completed.push(el);
  });
 
  return (
    <section className="tasks w-[680px] px-2 cursor-default ">
      <h2 className="font-lato font-bold text-3xl mode-items m-6">
        Tackle Today, Triumph Tomorrow.
      </h2>
      <div className="flex min-h-[85vh] space-x-2">
        <div className="w-1/3   p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
          <div className="w-full h-10 bg-to-do-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">
            To do(5)
          </div>
          <ul className="todo-list mt-2 space-y-2">
           {todo.map(el => <TaskCard task={el}/>)}
          </ul>
        </div>
        <div className=" w-1/3  p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
          <div className="w-full h-10 bg-progress-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">
            Progress(3)
          </div>
          <ul className="progress-list mt-2 space-y-2">
          {progress.map(el => <TaskCard task={el}/>)}
          </ul>
        </div>
        <div className="w-1/3 p-1 rounded-xl border-[1.5px] border-border-color border-dashed">
          <div className="w-full h-10 bg-completed-gradient rounded-xl text-[16px] font-roboto font-medium text-white text-center leading-10">
            Completed(1)
          </div>
          <ul className="completed-list mt-2 space-y-2">
          {completed.map(el => <TaskCard task={el}/>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Tasks;

