import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        {/* Profile Section */}
        <div className="relative mb-8">
          <img
            src={assets.header_img}
            alt="header"
            className="w-36 md:w-48 rounded-full border-4 border-white shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
          {userData?.isAccountVerified && (
            <div className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full border-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            Hey,{' '}
            {userData ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {userData.name}
              </span>
            ) : (
              'Developer'
            )}
            <img
              src={assets.hand_wave}
              alt="wave"
              className="w-8 md:w-10 aspect-square inline animate-bounce"
            />
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome to MERN-Auth
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A complete free and open source authentication system built with
            <span className="font-semibold"> MongoDB, Express, React</span> and
            <span className="font-semibold"> Node.js</span>
          </p>
        </div>

        <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  )
}

export default Header
