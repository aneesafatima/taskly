import React, { useContext, useEffect } from "react";
import axios from "axios";
import {  NotFound, TaskDetail, Tasks } from ".";
import { GlobalState } from "../context/GlobalState";

function dashboard() {
//add loader



  const {
    giveAccess,
    seTGiveAccess,
    setTasks,
    setErrMessage,
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

  if (!giveAccess && !refetch) return <NotFound link="/" code="400 Unauthorized" location="SignUp/Login" message="You are not logged in. Please login to access this page"/>;
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
