import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar, Tasks } from ".";

function dashboard() {
  const [giveAccess, seTGiveAccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState("");
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
        <NavBar user={user} />
        {/* Hello from dashboard
        <div className="w-40 h-32 bg-green-300 rounded-lg "></div> */}
        <Tasks/>
      </div>
    )
  );
}

export default dashboard;
