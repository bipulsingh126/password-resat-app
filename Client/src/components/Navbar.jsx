import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const {
    userData,
    setUserData,
    backendUrl,
    setIsLoggedin,
    getUserData,
  } = useContext(AppContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true

      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      toast.success(data.message)
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MERN Auth
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <>
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold transform hover:scale-105 transition-transform duration-200">
                        {userData.name[0].toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {userData.name}
                      </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100">
                      {!userData.isAccountVerified && (
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                          Verfiy email
                        </button>
                      )}

                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {userData ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                    {userData.name[0].toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {userData.name}
                  </span>
                </div>
                <div>
                  {!userData.isAccountVerified && (
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      Verify email
                    </button>
                  )}
                </div>

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4 px-4">
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-purple-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
