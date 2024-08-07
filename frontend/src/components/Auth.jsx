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
    seTGiveAccess
  } = useContext(GlobalState);

  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);

      const res = await axios.post(
        authStatus === "signup"
          ? "http://localhost:3000/api/users/signup"
          : "http://localhost:3000/api/users/login",
        { ...userDetails, ...passwordDetails },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      if (res.data?.status === "success") {
        setShowLoader(false);
        seTGiveAccess(true)
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setErrMessage(err.response.data.message);
      setTimeout(() => setErrMessage(""), 2000)
      setShowLoader(false);
    }
  };

  const changeAuthStatus = () => {
    setAuthStatus((prev) => (prev === "signup" ? "login" : "signup"));
  };

  return (
    <div className="p-3  rounded-lg flex items-center h-screen space-x-5">
      <img src={coverPng} alt="cover img" className="w-[70%] rounded-lg" />
      <div className="right-section w-full h-fit relative">
        <h1 className="font-roboto font-bold text-center w-full text-lg absolute bottom-[110%]">
          <SiTask className="inline" /> Taskly
        </h1>

        <h2 className="font-roboto font-light mb-2 text-lg text-center tracking-wide">
          {authStatus === "signup" ? "Lets join with us" : "Welcome Back"}
        </h2>
        <form
          className="auth-form flex flex-col space-y-5 mt-4 "
          onSubmit={handleFormSubmission}
        >
          {authStatus === "signup" && (
            <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm ">
              <CiUser size={18} color="black" className="thick-stroke" />
              <input
                type="name"
                name="name"
                className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0 "
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
          <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm ">
            <IoMailOutline size={18} color="black" />
            <input
              type="email"
              name="email"
              className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
              placeholder="Enter your email"
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>

          <div className="form-item border-[1px] border-[#e2e2e2] rounded-lg focus:border-2 focus:border-blue-500  flex items-center px-5 py-3 space-x-3 text-sm">
            <PiPasswordLight size={18} color="black" className="thick-stroke" />
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
              className=" h-full w-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
              required
            />
            <FaCircleCheck fill="green" className="check " />
            <MdCancel size={17} fill="red" className="cross " />
          </div>
          {authStatus === "signup" && (
            <div className="form-item border-[1px] border-[#e2e2e2] focus:border-2 focus:border-blue-500 rounded-lg  flex items-center px-5 py-3 space-x-3 text-sm">
              <CiLock size={18} color="black" className="thick-stroke" />
              <input
                type="password"
                name="passwordConfirm"
                className="w-full h-full font-roboto p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
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
          <span className="text-red-600 font-lato font-bold text-sm text-center">
            {errMessage}
          </span>
          <button
            type="submit"
            className="py-4 text-sm rounded-lg bg-blue-800 text-[#f2f2f2] hover:bg-blue-900"
          >
            {authStatus === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>
        <div className="flex items-center mt-5">
          <div className="block border-b-[1px] w-full border-[#e2e2e2]"></div>
          <div
            className="text-xs font-lato w-[70%] mx-1 text-[#8f8f8f] cursor-pointer hover:underline"
            onClick={changeAuthStatus}
          >
            {!showLoader ? (
              authStatus === "signup" ? (
                "Have an account"
              ) : (
                "Create Account"
              )
            ) : (
              <span className="loader"></span>
            )}
          </div>
          <div className="block border-b-[1px] w-full border-[#e2e2e2]"></div>
        </div>
      </div>
    </div>
  );
}

export default auth;
3;
