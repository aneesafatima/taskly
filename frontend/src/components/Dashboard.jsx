import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar, TaskDetail, Tasks } from ".";

function dashboard() {
  const [giveAccess, seTGiveAccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [mode, setMode] = useState("light");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/dashboard", {
          withCredentials: true,
        });
        console.log(res);
        if (res.data?.status === "success") {
          seTGiveAccess(true);
          setUser(res.data.user);
          console.log(res);

          setTasks(res.data.tasks);
        }
      } catch (err) {
        setErrMessage(err.response?.data.message);
      }
    }
    fetchData();
  }, []);

  if (!giveAccess) return <div>{errMessage}</div>;
  return (
    giveAccess && (
      <div className="flex">
        <NavBar user={user} mode={mode} setMode={setMode} />
        <Tasks tasks={tasks} setAddTask={setAddTask} />
        <TaskDetail addTask={addTask} setAddTask={setAddTask} mode={mode} />
      </div>
    )
  );
}

export default dashboard;
