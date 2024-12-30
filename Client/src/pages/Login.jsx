// Importing necessary hooks and assets
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

// Login component definition
const Login = () => {
  // State management for form fields and navigation
  const navigate = useNavigate();
  const [state, setState] = useState("sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-purple-400 to-pink-100 ">
      {/* Logo with navigation to home */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=" logo "
        className="absolute top-5 left-5 sm:left-20 w-28 sm:w-32 md:w-40 cursor-pointer  "
      />
      <div className=" bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm ">
        {/* Conditional rendering for sign-up/login header */}
        <h2 className="text-3xl font-semibold text-white text-center mb-3  ">
          {state === "sign Up" ? "Create Account" : "Login Account"}{" "}
        </h2>
        <p className="text-sm text-center mb-6">
          {" "}
          {state === "sign Up"
            ? "Create your Account"
            : "Login to your Account"}{" "}
        </p>
        <form>
          {/* Conditional rendering for sign-up specific fields */}
          {state === "sign Up" && (
            <div className="flex items-center mb-4  w-full px-5 py-2.5 rounded-full bg-[#333A5C] gap-3">
              <img src={assets.person_icon} alt="person-icon" />
              <input
                type="text"
                placeholder="full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent outline-none"
              />
            </div>
          )}
          <div className="flex items-center mb-4  w-full px-5 py-2.5 rounded-full bg-[#333A5C] gap-3">
            <img src={assets.mail_icon} alt="person-icon" />
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center mb-4  w-full px-5 py-2.5 rounded-full bg-[#333A5C] gap-3">
            <img src={assets.lock_icon} alt="person-icon" />
            <input
              type="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent outline-none"
            />
          </div>
          {/* Navigation to reset password page */}
          <p
            onClick={() => navigate("/reset-password")}
            className=" mb-4 text-indigo-500 cursor-pointer "
          >
            Forgot Password?
          </p>
          <button className="w-full py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all">
            {state === "sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-xs mt-4 text-gray-400 text-center flex justify-center gap-2">
          {state === "sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-indigo-500 cursor-pointer underline "
            onClick={() => setState(state === "sign Up" ? "Login" : "sign Up")}
          >
            {state === "sign Up" ? "Login here" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
