import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from'react-router-dom'

function auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/users/signup", {
      email,
      password,
      passwordConfirm,
    },
    {
      withCredentials: true // Include credentials in the request
    });
    if (res.data?.status === "success") {
      navigate('/dashboard', {replace: true})
      // setIsLoggedIn(true);
    }
  };

  return (
    <div>
      Hello from auth
      <form classname="auth-form" onSubmit={handleFormSubmission}>
        <label htmlFor="email" className=" border-2">
          Enter your email
        </label>
        <input
          type="email"
          name="email"
          className="border-2 border-black"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className=" border-2">
          Enter your password
        </label>
        <input
          type="password"
          name="password"
          className="border-2 border-black"
          placeholder="enter your password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordConfirm" className=" border-2">
          Confirm your password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          className="border-2 border-black"
          placeholder="Confirm your password"
          minLength={8}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit" className="bg-yellow-200">
          Submit
        </button>
      </form>
    </div>
  );
}

export default auth;
3;
