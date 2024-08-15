import React, { useContext, useEffect } from "react";
import axios from "axios";
import { ErrComponent, TaskDetail, Tasks } from ".";

import { GlobalState } from "../context/GlobalState";

function dashboard() {
  const {
    giveAccess,
    seTGiveAccess,
    setTasks,
    setUser,
    refetch,
    setRefetch,
    setShowErr,
    showErr,
  } = useContext(GlobalState);

  useEffect(() => {
    if (refetch) {
      async function fetchData() {
        try {
          const res = await axios.get(`${import.meta.env.VITE_URL}/api/dashboard`, {
            withCredentials: true,
          });

          if (res.data?.status === "success") {
            seTGiveAccess(true);
            setUser(res.data.user);
            setTasks(res.data.tasks);
            setShowErr(false);
          }
        } catch (err) {
          console.log(err)
          setShowErr({ status: true, message: err.message });
        }
        setRefetch(false);
      }
      fetchData();
    }
  },[refetch] );

  if (showErr.status) return <ErrComponent message={showErr.message} />;
  if (refetch) {
    return (
      <div className="flex items-center justify-center w-full h-svh">
        <span className="main-loader"></span>{" "}
      </div>
    );
  }

  return (
    giveAccess &&
    !refetch && (
      <div className={`lg:flex w-screen  space-y-3 lg:space-y-0 `}>
        <Tasks />
        <TaskDetail />
      </div>
    )
  );
}

export default dashboard;
