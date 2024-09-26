import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import coverPng from "/assets/taskly-cover.png";
import { IoMailOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";
import { SiTask } from "react-icons/si";

import { GlobalState } from "../context/GlobalState";

function auth() {
  //<a href="https://www.flaticon.com/free-icons/task" title="task icons">Task icons created by AmruID - Flaticon</a>

  const {
    authStatus,
    setAuthStatus,
    errMessage,
    setErrMessage,
    userDetails,
    setUserDetails,
    passwordDetails,
    setPasswordDetails,
    showLoader,
    setShowLoader,
    seTGiveAccess,
    setShowErr,
    setUser,
    setRefetch
  } = useContext(GlobalState);

  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      setShowLoader({ status: true, feature: "auth" });

      const res = await axios.post(
        authStatus === "signup"
          ? `${import.meta.env.VITE_URL}/api/users/signup`
          : `${import.meta.env.VITE_URL}/api/users/login`,
        { ...userDetails, ...passwordDetails },
        {
          withCredentials: true // Include credentials in the request
        }
      );
      if (res.data?.status === "success") {
        setRefetch(true)
        setShowLoader(false);
        seTGiveAccess(true);
        setShowErr(false);
        setUser(res.data.user);

        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.log(err)
      setErrMessage(err.response?.data.message);
      setTimeout(() => setErrMessage(""), 2000);
      setShowLoader(false);
    }
  };

  const changeAuthStatus = () => {
    setAuthStatus((prev) => (prev === "signup" ? "login" : "signup"));
  };

  return (
    <div className="p-3 rounded-lg lg:flex lg:items-center  h-svh  w-full overflow-hidden  lg:space-x-5">
      <img
        src={coverPng}
        alt="cover img"
        className="lg:w-[70%] h-full rounded-lg object-cover 2xl:object-none "
      />
      <div className="right-section flex-grow h-fit  w-[295px] sm:w-80 md:w-96 rounded-lg p-5 lg:p-0 lg:rounded-none lg:h-fit lg:w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 bg-white lg:bg-transparent lg:relative">
        <h1 className="font-roboto font-bold text-center w-full text-lg mb-2 lg:mb-0 lg:absolute bottom-[108%] ">
          <SiTask className="inline" /> Taskly
        </h1>

        <h2 className="font-roboto font-light mb-2  text-center tracking-wide text-sm sm:text-lg ">
          {authStatus === "signup" ? "Lets join with us" : "Welcome Back"}
        </h2>
        <form
          className="auth-form flex flex-col space-y-5 mt-4 "
          onSubmit={handleFormSubmission}
        >
          {authStatus === "signup" && (
            <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center py-2 px-3 sm:px-5 sm:py-3 space-x-3  text-xs sm:text-sm ">
              <CiUser size={18}  className="thick-stroke text-priority-color" />
              <input
                type="name"
                name="name"
                className="mode-items h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-border-color bg-transparent outline-none border-0 "
                placeholder="Enter your name"
                onChange={(e) =>
                  setUserDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                title="A name is required"
                required
              />
              <FaCircleCheck fill="green" className="check " />
              <MdCancel size={17} fill="red" className="cross " />
            </div>
          )}
          <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center py-2 px-3 sm:px-5 sm:py-3 space-x-3 text-xs sm:text-sm ">
            <IoMailOutline size={18}  className="text-priority-color" />
            <input
              type="email"
              name="email"
              className="mode-items h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-border-color bg-transparent outline-none border-0"
              placeholder="Enter your email"
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>

          <div className="form-item border-[1px] border-[#e2e2e2] rounded-lg focus:border-2 focus:border-blue-500  flex items-center py-2 px-3 sm:px-5 sm:py-3 3 space-x-3 text-xs sm:text-sm">
            <PiPasswordLight size={18}  className="thick-stroke text-priority-color" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              minLength={8}
              onChange={(e) =>
                setPasswordDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="mode-items h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-border-color bg-transparent outline-none border-0"
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>
          {authStatus === "signup" && (
            <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center py-2 px-3 sm:px-5 sm:py-3  space-x-3 text-xs sm:text-sm">
              <CiLock size={18}  className="thick-stroke text-priority-color" />
              <input
                type="password"
                name="passwordConfirm"
                className="mode-items  w-full h-full font-roboto p-1 px-4 border-l-[1px] border-border-color bg-transparent outline-none border-0"
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
          )}
          <span className="text-red-600 font-lato font-bold text-xs sm:text-sm text-center">
            {errMessage}
          </span>
          <button
            type="submit"
            className="py-3  sm:py-4   rounded-lg bg-blue-800 text-[#f2f2f2] hover:bg-blue-900 text-xs sm:text-sm "
          >
            {showLoader.status === true && showLoader.feature === "auth" ? (
              <span className="loader"></span>
            ) : authStatus === "signup" ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <div className="flex items-center mt-5">
          <div className="block border-b-[1px] w-full border-[#e2e2e2]"></div>
          <div
            className=" font-lato w-fit text-nowrap mx-1 text-[#8f8f8f] cursor-pointer hover:underline text-[8px] sm:text-xs "
            onClick={changeAuthStatus}
          >
            {authStatus === "signup" ? "Have an account" : "Create Account"}
          </div>
          <div className="block border-b-[1px] w-full border-[#e2e2e2]"></div>
        </div>
      </div>
    </div>
  );
}

export default auth;
3;
