import React, { useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../context/GlobalState";
import { IoMailOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";
import { MdOutlineFiberNew } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";

function Settings() {
  //fix dark mode issue
  //fix loader in btn issue
  //refactor
  const {
    userDetails,
    passwordDetails,
    setPasswordDetails,
    setUserDetails,
    user,
    seTGiveAccess,
    giveAccess,
    setErrMessage,
    setUser,
   setShowLoader
  } = useContext(GlobalState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/settings", {
          withCredentials: true,
        });

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

  const handleFormSubmission = async (e, type, data) => {
    e.preventDefault();
    try {
      setShowLoader({
        el: e.currentTarget.querySelector(".form-submit-btn"),
        status: true,
      });

      const res = await axios({
        url:
          type === "password"
            ? "http://localhost:3000/api/users/updateMyPassword"
            : "http://localhost:3000/api/users/updateMe",
        method: "PATCH",
        data,
        withCredentials: true,
      });
      console.log(res)
  
      if (res.data?.status === "success") {
        setUser(res.data.updatedUser)
        setShowLoader(false);
      }
    } catch (err) {
      setErrMessage(err.response?.data.message);
      setShowLoader(false);
    }
  };

  return (
    giveAccess && (
      <div className="flex-grow px-28 py-5 h-screen overflow-y-scroll scrollbar">
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
              <IoMailOutline size={18} className="text-priority-color" />
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
              Save Settings
            </button>
          </div>
        </form>
        <form className="auth-form flex flex-col space-y-5 mt-4"
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
              name="passwordConfirm"
              className="w-full h-full font-roboto p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Confirm your password"
              minLength={8}
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  passwordConfirm: e.target.value,
                }))
              }
              pattern={passwordDetails.password}
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
              name="new password"
              className="w-full h-full font-roboto p-1 px-4  border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Enter new password"
              minLength={8}
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
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
              Save Password
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default Settings;
