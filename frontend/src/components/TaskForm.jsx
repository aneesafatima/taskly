import React, { useContext, useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { GlobalState } from "../context/GlobalState";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
function TaskForm() {
  //starttime
  //loader for done btn
  //add styling to the tags
  //fix calender icon color
  //fix description color

  const { mode, currentTask, setAddTask, setRefetch } = useContext(GlobalState);

  const [taskDetails, setTaskDetails] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => console.log(currentTask), [currentTask]);
  useEffect(() =>
    document.querySelectorAll(".mode-items").forEach((el) => {
      if (mode === "dark") el.classList.add("text-white");
      else el.classList.remove("text-white");
    })
  );

  useEffect(() => {
    setTaskDetails({
      title: currentTask?.title,
      description: currentTask?.description,
      startDate: currentTask?.startDate ?? new Date(),
      dueDate: currentTask?.dueDate ?? new Date(),
      priority: currentTask?.priority ?? "low",
      status: currentTask?.status ?? "todo",
    });
    setTags(currentTask?.tags);
  }, [currentTask]);

  const handleTaskUpdation = async () => {
    try {
      const res = await axios({
        url: currentTask
          ? `http://localhost:3000/api/tasks/${currentTask._id}`
          : "http://localhost:3000/api/tasks/",
        method: currentTask ? "PATCH" : "POST",
        data: { ...taskDetails, tags },
        withCredentials: true,
      });
      if (res.data?.status === "success") {
        setAddTask(false);
        setRefetch(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
    const handleTaskDeletion = async () => {
    console.log("entered delete function");
    try {
      const res = await axios({
        url: `http://localhost:3000/api/tasks/${currentTask._id}`,
        method: "DELETE",
        withCredentials: true,
      });
      if (res.data?.status === "success") {
        setRefetch(true);
        setAddTask(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLastUpdated = () => {
    return `last updated (${
      currentTask
        ? new Date(currentTask.lastUpdated).toDateString() ===
          new Date().toDateString()
          ? new Date(currentTask.lastUpdated).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : new Date(currentTask.lastUpdated).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            })
        : "now"
    }) `;
  };

  const handleAddition = (tag) => {
    setTags((prev) => {
      if (prev) return [...prev, tag];
      else return [tag];
    });
  };
  const handleDelete = (index) => {
    setTags((prev) => prev?.filter((el, i) => i !== index));
  };



  //clear doubt
  return (
    <div className="task-details px-3 pb-5 h-full overflow-y-scroll scrollbar flex flex-col justify-between">
      <div>
        <h1 className="font-roboto font-medium text-xl pl-6 p-4 flex justify-between items-center  text-[#2c2c2c] mode-items ">
          Task Overview <MdOutlineCancel className="inline cursor-pointer" onClick={() => setAddTask(false)}/>
        </h1>

        <form className="task-form flex flex-col space-y-3">
          <input
            type="text"
            name="title"
            className="w-full h-full font-roboto py-3 px-4 border-[1px] border-border-color bg-transparent outline-none rounded-lg my-3 mode-items"
            placeholder="title"
            required
            value={taskDetails?.title}
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
              className={`status-select w-24 outline-none border-0 ${
                taskDetails?.status === "todo"
                  ? "bg-yellow-200"
                  : taskDetails.status === "progress"
                  ? "bg-pink-200"
                  : "bg-blue-200"
              } rounded-md text-sm py-1 font-normal ml-10 text-[#2c2c2c] text-center`}
              onChange={(e) =>
                setTaskDetails((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="todo" className="bg-white">
                todo
              </option>
              <option
                value="progress"
                className="bg-white"
                selected={currentTask?.status === "progress" ? true : false}
              >
                progress
              </option>
              <option
                value="completed"
                className="bg-white"
                selected={currentTask?.status === "completed" ? true : false}
              >
                completed
              </option>
            </select>
          </label>

          <label
            htmlFor="priority"
            className="text-sm text-[#626262] font-roboto font-medium"
          >
            Priority
            <select
              type="text"
              className={`w-24 outline-none border-0 text-center text-[#2c2c2c]  ${
                taskDetails?.priority === "low"
                  ? "bg-[#a5f4b9]"
                  : taskDetails?.priority === "medium"
                  ? "bg-[#f6d7a9]"
                  : "bg-[#e49090]"
              }  rounded-md text-sm  py-1 font-normal ml-10`}
              onChange={(e) =>
                setTaskDetails((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
            >
              <option value="low" className="bg-white ">
                low
              </option>
              <option
                value="medium"
                className="bg-white"
                selected={currentTask?.priority === "medium" ? true : false}
              >
                medium
              </option>
              <option
                value="high"
                className="bg-white"
                selected={currentTask?.priority === "high" ? true : false}
              >
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
              className="w-32 outline-none bg-transparent rounded-md text-sm px-3 py-1 font-normal ml-10 border-[1px] border-border-color"
              value={
                taskDetails.startDate
                  ? new Date(taskDetails.startDate).toISOString().split("T")[0]
                  : null
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
              className="w-32 outline-none bg-transparent  rounded-md text-sm px-3 py-1 font-normal ml-10 border-[1px] border-border-color"
              value={
                taskDetails.dueDate
                  ? new Date(taskDetails.dueDate).toISOString().split("T")[0]
                  : null
              }
              onChange={(e) =>
                setTaskDetails((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </label>
          {/* <label htmlFor="start">
            <input type="time" />
          </label> */}

          <ReactTags
            tags={tags}
            separators={["Enter", "Tab"]}
            placeholder="add tags"
            handleAddition={handleAddition}
            handleDelete={handleDelete}
            maxTags={4}
          />

          <textarea
            type="text"
            className="bg-transparent text-[#bcbcbc] min-h-fit resize-none outline-none border-0 mode-items"
            placeholder="write description..."
            rows={6}
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
          <CiTimer className="mr-1" size={13} />
          <span className="text-xs">{handleLastUpdated()}</span>
        </span>
        <div className="flex">
        {currentTask && (
            <MdDeleteOutline
              className="m-2 text-[#626262] cursor-pointer"
              onClick={handleTaskDeletion}
            />
          )}
        <button
          type="submit"
          className="h-8 w-20 text-xs rounded-lg  bg-blue-800 text-[#f2f2f2] hover:bg-blue-900 leading-8 text-center font-medium"
          onClick={handleTaskUpdation}
        >
          Done
        </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
