import React, { useEffect } from "react";
import { CiTimer } from "react-icons/ci";

function TaskForm({ mode }) {
  useEffect(
    () =>
      document.querySelectorAll(".mode-items").forEach((el) => {
        if (mode === "light") el.classList.add("text-white");
        else el.classList.remove("text-white");
      }),
    []
  ); //clear doubt
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
            className="w-full h-full font-roboto py-3 px-4 border-[1px] border-border-color bg-transparent outline-none rounded-lg my-3"
            placeholder="title"
            required
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
            htmlFor="status"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Start Date
            <input
              type="date"
              className="w-32 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
            />
          </label>

          <label
            htmlFor="status"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Due Date
            <input
              type="date"
              className="w-32 outline-none border-0 bg-yellow-200 rounded-md text-sm px-3 py-1 font-normal ml-10"
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
            className="bg-transparent  min-h-fit resize-none outline-none border-0"
            placeholder="write description..."
            rows={1}
          />
        </form>
        </div>
      <div className="text-sm text-[#626262] flex justify-between items-center"><span><CiTimer className="inline"/> last updated</span>   <button
            type="button"
            className="h-8 w-20 text-xs rounded-lg  bg-blue-800 text-[#f2f2f2] hover:bg-blue-900 leading-8 text-center font-medium"
          >Done</button></div>
    </div>
  );
}

export default TaskForm;
