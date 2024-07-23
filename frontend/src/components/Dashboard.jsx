import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavBar, TaskDetail, Tasks } from ".";
import { GlobalState } from "../context/GlobalState";

function dashboard() {
  // const [giveAccess, seTGiveAccess] = useState(false);
  // const [errMessage, setErrMessage] = useState("");
  // const [user, setUser] = useState("");
  // const [tasks, setTasks] = useState([]);
  // const [addTask, setAddTask] = useState(false);
  // const [currentTask, setCurrentTask] = useState('');
  // const [mode, setMode] = useState("light");

  const {
    giveAccess,
    seTGiveAccess,
    setTasks,
    setErrMessage,
    errMessage,
    setUser,
  } = useContext(GlobalState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/dashboard", {
          withCredentials: true,
        });

        if (res.data?.status === "success") {
          seTGiveAccess(true);
          setUser(res.data.user);

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
        <NavBar />
        <Tasks />
        <TaskDetail />
      </div>
    )
  );
}

export default dashboard;
