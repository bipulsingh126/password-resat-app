import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 md:p-8 absolute top-0 ">
      <img src={assets.logo} alt=" logo" className="w-28 sm:w-32 md:w-40" />
      <button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-all"
      >
        Login
        <img src={assets.arrow_icon} alt="arrow " className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Navbar;
