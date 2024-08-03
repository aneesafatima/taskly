import React from 'react'
import { MdArrowOutward } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";

import { RiDraggable } from "react-icons/ri";


function DragOverlayCard({task}) {
    const handlePriorityColor = () => {
        if (task?.priority === "low") return "bg-[#4ead6557]";
        else if (task?.priority === "medium") return "bg-[#f8fa8b51]";
        else return "bg-[#fa888855]";
      };
  return (
    <li
        className="w-full min-h-40 bg-task-bg rounded-xl p-3 flex flex-col justify-between"
      >
        <div className="font-lato">
          <div className="flex justify-between items-center">
            <span
              className={`w-24 h-6 inline-block relative  leading-6 rounded-full ${handlePriorityColor()} text-[10px]  text-center font-bold px-[1.5px]`}
            >
              <span className="relative text-priority-color -z-10 brightness-200">
                {task.priority.charAt(0).toUpperCase() +
                  task.priority.substring(1)}{" "}
                Priority
              </span>
            </span>
            <MdArrowOutward
              size={18}
              className="mode-items cursor-pointer"
              onClick={() => {
                setAddTask(true);
                setCurrentTask(task);
              }}
            />
          </div>
          <h2 className="mode-items font-roboto text-lg font-medium mt-3 ">
            {task.title}
          </h2>
          <span className="mode-items  text-xs font-light">
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            }) ?? "none"}
          </span>
        </div>

        <div className="flex justify-between font-lato text-xs mode-items ">
          <RiDraggable
            size={15}
            className="cursor-grab active:cursor-grabbing outline-0 active:outline-1 active:outline-black"
          />
          <span className="flex items-center">
            {new Date(task.createdAt).toLocaleDateString() ===
            new Date(Date.now()).toLocaleDateString() ? (
              <>
                <IoStarSharp className="inline mr-1 text-blue-600" />
                Today
              </>
            ) : (
              new Date(task.createdAt).toLocaleDateString()
            )}
          </span>
        </div>
    
      </li>
  )
}

export default DragOverlayCard
