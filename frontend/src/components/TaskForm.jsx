import React, { useContext, useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { GlobalState } from "../context/GlobalState";
import axios from "axios";
function TaskForm() {
  //starttime and tags
  //loader for done btn
  //status and priority fix
  //last updated
  //add cursor

  const { mode, currentTask, setAddTask } = useContext(GlobalState);

  const [taskDetails, setTaskDetails] = useState({
    title: currentTask?.title,
    description: currentTask?.description,
    startDate: currentTask?.startDate,
    dueDate: currentTask?.dueDate,
    priority: currentTask?.priority,
    status: currentTask?.status,
    tags: currentTask?.tags,
  });
  useEffect(
    () =>
      document.querySelectorAll(".mode-items").forEach((el) => {
        if (mode === "dark") el.classList.add("text-white");
        else el.classList.remove("text-white");
      }),
    []
  );

  const handleTaskUpdation = async () => {
    try {
      const res = await axios({
        url: currentTask
          ? `http://localhost:3000/api/tasks/${currentTask._id}`
          : "http://localhost:3000/api/tasks/",
        method: currentTask ? "PATCH" : "POST",
        data: taskDetails,
        withCredentials: true,
      });
      if (res.data?.status === "success") setAddTask(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLastUpdated = () => {
   return `last updated (${
            currentTask
              ? new Date(currentTask.lastUpdated).toDateString() === new Date().toDateString()
                ? new Date(currentTask.lastUpdated).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )
                : new Date(currentTask.lastUpdated).toLocaleDateString("en-US", {
                  month: '2-digit',
                  day: '2-digit',
                  year:'2-digit'
                })
              : "now"
          }) `

  }

 
  //clear doubt
  return (
    <div className="task-details px-3 pb-5 min-h-full overflow-y-scroll flex flex-col justify-between">
      <div>
        <h1 className="font-roboto font-medium text-xl pl-6 p-4  text-[#2c2c2c] mode-items ">
          Task Overview
        </h1>

        <form className="task-form flex flex-col space-y-3">
          <input
            type="text"
            name="title"
            className="w-full h-full font-roboto py-3 px-4 border-[1px] border-border-color bg-transparent outline-none rounded-lg my-3 mode-items"
            placeholder="title"
            required
            value={taskDetails.title}
            onChange={(e) =>
              setTaskDetails((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <h3 className="text-[#626262] font-roboto text-xs font-bold my-3">
            ATTRIBUTES
          </h3>
          <hr className="border-border-color" />
          <label
            htmlFor="status"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Status
            <select
              type="text"
              className="w-24 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10 text-center"
            >
              <option value="low" className="bg-white">
                todo
              </option>
              <option value="medium" className="bg-white">
                progress
              </option>
              <option value="high" className="bg-white">
                completed
              </option>
            </select>
          </label>

          <label
            htmlFor="status"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Priority
            <select
              type="text"
              className="w-24 outline-none border-0 text-center  bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
            >
              <option value="low" className="bg-white">
                low
              </option>
              <option value="medium" className="bg-white">
                medium
              </option>
              <option value="high" className="bg-white">
                high
              </option>
            </select>
          </label>

          <label
            htmlFor="start date"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Start Date
            <input
              type="date"
              className="w-32 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
              value={
                taskDetails.startDate
                  ? new Date(taskDetails.startDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setTaskDetails((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </label>

          <label
            htmlFor="due date"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Due Date
            <input
              type="date"
              className="w-32 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
              value={
                taskDetails.dueDate
                  ? new Date(taskDetails.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setTaskDetails((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </label>
          {/* <label
            htmlFor="status"
            className="text-sm text-[#626262] font-roboto font-bold"
          >
            Tags
            <input
              type="date"
              className="w-32 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
              placeholder="in progress"
            />
          </label> */}
          <textarea
            type="text"
            className="bg-transparent  min-h-fit resize-none outline-none border-0 mode-items"
            placeholder="write description..."
            rows={1}
            value={taskDetails?.description}
            onChange={(e) =>
              setTaskDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </form>
      </div>
      <div className="text-sm text-[#626262] flex justify-between items-center">
        <span className="flex items-center">
          <CiTimer className="mr-1" />
          {handleLastUpdated()}
        </span>{" "}
        <button
          type="submit"
          className="h-8 w-20 text-xs rounded-lg  bg-blue-800 text-[#f2f2f2] hover:bg-blue-900 leading-8 text-center font-medium"
          onClick={handleTaskUpdation}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
