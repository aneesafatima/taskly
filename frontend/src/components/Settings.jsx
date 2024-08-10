import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../context/GlobalState";
import { IoMailOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";
import { MdOutlineFiberNew } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { FaPerson } from "react-icons/fa6";
import { showAlert } from "../assets/helpers";

function Settings() {
  const {
    userDetails,
    passwordDetails,
    setPasswordDetails,
    setUserDetails,
    user,
    seTGiveAccess,
    giveAccess,
    setUser,
    setShowLoader,
    showLoader,
    setShowErr,
  } = useContext(GlobalState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/settings", {
          withCredentials: true,
        });

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

  const handleFormSubmission = async (e, type, data) => {
    e.preventDefault();
    try {
      setShowLoader({ status: true, feature: type });

      const res = await axios({
        url:
          type === "password"
            ? "http://localhost:3000/api/users/updateMyPassword"
            : "http://localhost:3000/api/users/updateMe",
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
            document.getElementsByName("confirm password")[0].value = "";
          }
          showAlert("Data updated !", "settings");
          setShowLoader(false);
        }, 1000);
      }
    } catch (err) {
      showAlert(err.response.data.message, "settings");
      setShowLoader(false);
    }
  };

  const handleLogOutAndDelete = async (feature) => {
    try {
      setShowLoader({ status: true, feature });

      const res = await axios({
        url:
          feature === "logout"
            ? "http://localhost:3000/api/users/logout"
            : `http://localhost:3000/api/users/deleteMe/${user._id}`,
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

  return (
    giveAccess && (
      <div
        className="flex-grow px-10 sm:px-28 py-5 h-svh overflow-y-scroll "
        id="settings"
      >
        <HiUserCircle size={150} className="text-priority-color" />

        <form
          className="auth-form flex flex-col space-y-5 mt-4"
          onSubmit={(e) => handleFormSubmission(e, "settings", userDetails)}
        >
          <span className="font-roboto font-medium text-tags-color text-sm">
            Personal details
          </span>
          <div className="form-item border-[1px] border-border-color rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm ">
            <CiUser size={18} className="thick-stroke text-priority-color" />
            <input
              type="name"
              name="name"
              className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Enter your name"
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, name: e.target.value }))
              }
              defaultValue={user.name}
              title="A name is required"
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>
          <div className="form-item border-[1px] border-border-color rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm ">
            <IoMailOutline size={18} className="text-priority-color" />
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Enter your email"
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>
          <div className="flex flex-col">
            <div className="form-item border-[1px] border-border-color rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm ">
              <FaPerson size={18} className="text-priority-color" />
              <input
                type="text"
                name="status"
                defaultValue={user.status}
                className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
                placeholder="Enter your status"
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              />
              <FaCircleCheck fill="green" className="check " />
              <MdCancel size={17} fill="red" className="cross " />
            </div>
            <span className="font-lato text-tags-color text-xs pl-2 mt-1">
              e.g. student, exployee, etc
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="form-submit-btn py-2 my-5 w-fit px-6 text-sm rounded-lg bg-blue-800 text-[#f2f2f2] hover:bg-blue-900"
            >
              {showLoader.status && showLoader.feature === "settings" ? (
                <span className="loader"></span>
              ) : (
                "Save Settings"
              )}
            </button>
          </div>
        </form>
        <form
          className="auth-form flex flex-col space-y-5 mt-4"
          onSubmit={(e) => handleFormSubmission(e, "password", passwordDetails)}
        >
          <span className="font-roboto font-medium text-tags-color text-sm">
            Security Details
          </span>
          <div className="form-item border-[1px] border-border-color rounded-lg flex items-center px-5 py-3 space-x-3 text-sm">
            <PiPasswordLight
              size={18}
              className="thick-stroke text-priority-color"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              minLength={8}
              autoComplete="current-password"
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              required
            />
            <FaCircleCheck fill="green" className="check" />
            <MdCancel size={17} fill="red" className="cross" />
          </div>

          <div className="form-item border-[1px] border-border-color rounded-lg flex items-center px-5 py-3 space-x-3 text-sm">
            <CiLock size={18} className="thick-stroke text-priority-color" />
            <input
              type="password"
              name="new password"
              className="w-full h-full font-roboto p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Confirm your password"
              minLength={8}
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              title="Passwords do not match."
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>
          <div className="form-item border-[1px] border-border-color rounded-lg flex items-center px-5 py-3 space-x-3 text-sm">
            <MdOutlineFiberNew size={20} className="text-priority-color" />
            <input
              type="password"
              name="confirm password"
              className="w-full h-full font-roboto p-1 px-4  border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Enter new password"
              minLength={8}
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  passwordConfirm: e.target.value,
                }))
              }
              pattern={passwordDetails.newPassword}
              title="passwords do not match"
              required
            />
            <FaCircleCheck fill="green" className="check" />
            <MdCancel size={17} fill="red" className="cross" />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="form-submit-btn py-2 my-5 w-fit px-6 text-sm rounded-lg bg-blue-800 text-[#f2f2f2] hover:bg-blue-900"
            >
              {showLoader.status && showLoader.feature === "password" ? (
                <span className="loader"></span>
              ) : (
                "Save Password"
              )}
            </button>
          </div>
        </form>

        <div className="flex space-x-2 justify-end">
          <button
            type="button"
            className="form-submit-btn py-2 my-5 w-fit px-6 text-sm rounded-lg bg-red-600  text-[#f2f2f2] hover:bg-red-800"
            onClick={() => handleLogOutAndDelete("delete")}
          >
            {showLoader.status && showLoader.feature === "delete" ? (
              <span className="loader"></span>
            ) : (
              "Delete Me"
            )}
          </button>
          <button
            type="button"
            className="form-submit-btn py-2 my-5 w-fit px-6 text-sm rounded-lg bg-red-600  text-[#f2f2f2] hover:bg-red-800"
            onClick={() => handleLogOutAndDelete("logout")}
          >
            {showLoader.status && showLoader.feature === "logout" ? (
              <span className="loader"></span>
            ) : (
              "Log out"
            )}
          </button>
        </div>
      </div>
    )
  );
}

export default Settings;
