import React, { createContext, useState } from "react";

export const GlobalState = createContext();

export function GlobalProvider({ children }) {
  const [giveAccess, seTGiveAccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [mode, setMode] = useState("light");
  

  return (
    <GlobalState.Provider
      value={{
        giveAccess,
        seTGiveAccess,
        errMessage,
        setErrMessage,
        user,
        setUser,
        tasks,
        setTasks,
        addTask,
        setAddTask,
        currentTask,
        setCurrentTask,
        mode,
        setMode,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
}
