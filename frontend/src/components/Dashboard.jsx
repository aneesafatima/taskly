import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { NavBar, TaskDetail, Tasks } from ".";
import { GlobalState } from "../context/GlobalState";

function dashboard() {
//add loader
  const {
    giveAccess,
    seTGiveAccess,
    setTasks,
    setErrMessage,
    errMessage,
    setUser,
    refetch,
    setRefetch,
  } = useContext(GlobalState);

  useEffect(() => {
    if (refetch) {
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
        setRefetch(false);
      }
      fetchData();
    }
  }, [refetch]);

  if (!giveAccess) return <div>{errMessage}</div>;
  return (
    giveAccess && (
      <div className="flex flex-grow">
         
        <Tasks />
        <TaskDetail />
      </div>
    )
  );
}

export default dashboard;
