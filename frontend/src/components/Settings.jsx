import React, { useContext } from "react";
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
import useSettings from "../hooks/useSettings";

function Settings() {
  const {
    userDetails,
    passwordDetails,
    setPasswordDetails,
    setUserDetails,
    user,
    giveAccess,
    showLoader,
  } = useContext(GlobalState);

  const { handleFormSubmission, handleLogOutAndDelete } = useSettings();

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
          <MdOutlineFiberNew size={20} className="text-priority-color" />
            <input
              type="password"
              name="new password"
              className="w-full h-full font-roboto p-1 px-4 border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Enter new password"
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
            <CiLock size={18} className="thick-stroke text-priority-color" />
            <input
              type="password"
              name="confirm new password"
              className="w-full h-full font-roboto p-1 px-4  border-l-[1px] border-priority-color bg-transparent outline-none border-0 mode-items"
              placeholder="Confirm new password"
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
