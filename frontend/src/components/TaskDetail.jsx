import React, { useContext, useEffect } from "react";
import TaskForm from "./TaskForm";
import { GlobalState } from "../context/GlobalState";

function TaskDetail() {
  const { addTask, setAddTask, mode , refetch} = useContext(GlobalState);
  useEffect(() => {
    console.log("entered useEffect")
    console.log(addTask);
    console.log("REFETCH")
    console.log(refetch)
      document.querySelectorAll(".mode-items").forEach((el) => {
        if (mode === "dark") el.classList.add("text-white");
        else el.classList.remove("text-white");
      });
     console.log("done")
  }, [addTask, refetch]);

  return (
    <div className="flex-grow h-screen bg-nav-color ">
      {!addTask && (
        <div className="flex justify-center h-full items-center flex-col">
          <button
            type="button"
            className="h-10 w-24 text-xs rounded-lg  bg-blue-800 text-[#f2f2f2] hover:bg-blue-900 leading-10 text-center font-medium"
            onClick={() => setAddTask(true)}
          >
            {" "}
            <span className="text-lg inline-block ">+</span> Add Task{" "}
          </button>
          <span className="text-[#767575] font-lato  text-center">
            or <br /> select a task
          </span>
        </div>
      )}

      {addTask && <TaskForm />}
    </div>
  );
}

export default TaskDetail;
