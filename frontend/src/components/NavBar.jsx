import React, { useEffect, useState } from "react";
import { TbLayout2Filled } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { SiTask } from "react-icons/si";

function NavBar({ user, mode, setMode }) {
 
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".nav-bar").style.transform = "translate(0)"
    }, 100)
  }, [])
  const handleToggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    document.body.classList.toggle("darkmode");
    document
      .querySelectorAll(".mode-items")
      .forEach((el) => el.classList.toggle("text-white"));
  };
  return (
    <nav className="nav-bar w-52 bg-nav-color h-screen cursor-default pt-4 relative -translate-x-full transition-all duration-1000">
      <div className=" mb-5 pl-3">
        <h2 className="font-roboto font-extrabold text-lg mode-items ">
          <SiTask className="inline mr-1" />
          Taskly
        </h2>
        <span className="text-[11px] text-[#767575] font-lato">
          Focus.Prioritize.Execute
        </span>
      </div>
      <div className="user m-2 rounded-xl h-14 mb-12 border-[1px] border-border-color flex items-center p-3">
        <img src="" alt="" className="bg-blue-500 w-7 h-7 rounded-full mr-2" />
        <div className="flex flex-col">
          <span className="font-bold font-roboto text-sm mode-items">
            {user.name}
          </span>
          <span className="text-[10px] text-[#767575]">{user.email}</span>
        </div>
      </div>
      <span className="text-[#767575]  font-roboto text-sm pl-4 ">Menu</span>
      <ul className=" text-sm mt-5 space-y-7 text-[#767575] font-roboto pl-6">
        <li className="flex cursor-pointer">
          <TbLayout2Filled className="inline mr-3" size={20} />
          Overview
        </li>
        <li className="flex items-center cursor-pointer">
          <IoIosSettings className="inline mr-3 -ml-[2px]" size={24} />
          Settings
        </li>
      </ul>

      <div className="cursor-pointer absolute bottom-6 pl-3">
        {mode === "light" ? (
          <MdDarkMode size={25} onClick={handleToggleMode} fill="#767575" />
        ) : (
          <MdLightMode size={25} onClick={handleToggleMode} fill="#767575" />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
