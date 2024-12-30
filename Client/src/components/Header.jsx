import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8">
      <img
        src={assets.header_img}
        alt="header "
        className="w-36 md:w-48 rounded-full mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Hey Developer{" "}
        <img
          src={assets.hand_wave}
          alt="hand-wave"
          className="w-8 md:w-10 aspect-square inline"
        />{" "}
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-center">
        Welcome to MERN-Auth
      </h2>
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl">
        A complete free and open source authentication system built with
        MongoDB, Express, React and Node.js
      </p>
      <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
