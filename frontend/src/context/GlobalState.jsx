import React, { createContext, useState } from "react";

export const GlobalState = createContext();

export function GlobalProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

  const [authStatus, setAuthStatus] = useState("signup");
  const [errMessage, setErrMessage] = useState("");
  const [giveAccess, seTGiveAccess] = useState(false);
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState();
  const [addTask, setAddTask] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [mode, setMode] = useState("light");
  const [refetch, setRefetch] = useState(true);
  const [passwordDetails, setPasswordDetails] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [showNavBar, setShowNavBar] = useState(window.innerWidth >= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        refetch,
        setRefetch,
        authStatus,
        setAuthStatus,
        userDetails,
        setUserDetails,
        passwordDetails,
        setPasswordDetails,
        showLoader,
        setShowLoader,
        showErr,
        setShowErr,
        windowWidth,
        setWindowWidth,
        showNavBar,
        setShowNavBar,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
}
