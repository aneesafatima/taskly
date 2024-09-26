import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { GlobalState } from "../context/GlobalState";
import { showAlert } from "../assets/helpers";
import { useNavigate } from "react-router-dom";

function useSettings() {
  const { user, seTGiveAccess, setUser, setShowLoader, setShowErr } =
    useContext(GlobalState);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/settings`,
          {
            withCredentials: true,
          }
        );

        if (res.data?.status === "success") {
          seTGiveAccess(true);
          setUser(res.data.user);
          setShowErr(false);
        }
      } catch (err) {
        setShowErr({ status: true, message: err.message });
      }
    }
    fetchData();
  }, []);

  const handleFormSubmission = useCallback(async (e, type, data) => {
    e.preventDefault();
    try {
      setShowLoader({ status: true, feature: type });

      const res = await axios({
        url:
          type === "password"
            ? `${import.meta.env.VITE_URL}/api/users/updateMyPassword`
            : `${import.meta.env.VITE_URL}/api/users/updateMe`,
        method: "PATCH",
        data,
        withCredentials: true,
      });

      if (res.data?.status === "success") {
        setUser(res.data.user);

        setTimeout(() => {
          if (type === "password") {
            document.getElementsByName("password")[0].value = "";
            document.getElementsByName("new password")[0].value = "";
            document.getElementsByName("confirm new password")[0].value = "";
          }
          showAlert("Data updated !", "settings");
          setShowLoader(false);
        }, 1000);
      }
    } catch (err) {
      showAlert(err.response.data.message, "settings");
      setShowLoader(false);
    }
  }, []);

  const handleLogOutAndDelete = async (feature) => {
    try {
      setShowLoader({ status: true, feature });

      const res = await axios({
        url:
          feature === "logout"
            ? `${import.meta.env.VITE_URL}/api/users/logout`
            : `${import.meta.env.VITE_URL}/api/users/deleteMe/${user._id}`,
        method: feature === "logout" ? "GET" : "DELETE",
        withCredentials: true,
      });

      if (res.data?.status === "success") {
        setTimeout(() => {
          seTGiveAccess(false);
          setShowLoader(false);
          setUser("");
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setShowLoader(false);
    }
  };

  return { handleFormSubmission, handleLogOutAndDelete };
}

export default useSettings;
