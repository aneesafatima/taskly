import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import coverPng from "/assets/taskly-cover.png";
import { IoMailOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";

function auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/users/signup",
      {
        email,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true, // Include credentials in the request
      }
    );
    if (res.data?.status === "success") {
      navigate("/dashboard", { replace: true });
      // setIsLoggedIn(true);
    }
  };

  return (
    <div className="p-3  rounded-lg flex h-screen space-x-5">
      <img src={coverPng} alt="cover img" className="w-[70%] rounded-lg" />

      <form className="auth-form flex flex-col justify-center h-screen space-y-5 w-full"  onSubmit={handleFormSubmission}>
 
        <div className="border-[1px] border-[#e2e2e2] rounded-lg w- flex items-center px-5 py-3 space-x-3 text-sm ">
          <IoMailOutline size={18} color="black"  />
          <input
            type="email"
            name="email"
            className=" h-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div className="border-[1px] border-[#e2e2e2] rounded-lg w- flex items-center px-5 py-3 space-x-3 text-sm">
          <PiPasswordLight size={18} color="black" className="thick-stroke" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className=" h-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
          />
        </div>
        <div className="border-[1px] border-[#e2e2e2] rounded-lg w- flex items-center px-5 py-3 space-x-3 text-sm">
          <CiLock size={18} color="black" className="thick-stroke" />
          <input
            type="password"
            name="passwordConfirm"
            className=" h-full font-roboto  p-1 px-4 border-l-[1px] border-[#e2e2e2] bg-transparent outline-none border-0"
            placeholder="Confirm your password"
            minLength={8}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

      
        <button type="submit" className=" py-4 text-sm rounded-lg bg-blue-800 text-[#f2f2f2] hover:bg-blue-900">
          continue
        </button>
      </form>
    </div>
  );
}

export default auth;
3;
