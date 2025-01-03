import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [formStep, setFormStep] = useState(1) // 1: email, 2: OTP, 3: new password
  const [timer, setTimer] = useState(300)
  const inputRefs = React.useRef([])
  const navigate = useNavigate()
  const {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  } = useContext(AppContext)
  axios.defaults.withCredentials = true

  useEffect(() => {
    if (formStep === 2) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [formStep])

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-reset-otp',
        { email },
      )
      data.success
        ? toast.success('Reset code sent to your email')
        : toast.error(data.message)
      data.success && setFormStep(2) // Move to OTP step
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code')
    }
  }
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map((input) => input.value)
      const otp = otpArray.join('')

      if (otp.length !== 6) {
        toast.error('Please enter all 6 digits')
        return
      }

      const { data } = await axios.post(
        backendUrl + '/api/auth/verify-reset-otp',
        { email, otp },
      )

      if (data.success) {
        toast.success(data.message)
        setFormStep(3)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('OTP Error:', error)
      toast.error(error.response?.data?.message || 'Invalid OTP')
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!newPassword) {
        toast.error('Please enter a new password')
        return
      }

      const { data } = await axios.post(
        backendUrl + '/api/auth/reset-password',
        {
          email,
          newPassword,
        },
      )

      if (data.success) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    }
  }

  const handleInput = (e, index) => {
    const value = e.target.value
    if (value.length > 1) {
      e.target.value = value.slice(0, 1)
    }
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus() // Move to the next input
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus() // Move to the previous input
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-100 to-white px-4">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute top-5 left-5 sm:left-20 w-16 sm:w-28 md:w-32 lg:w-40 cursor-pointer 
                  hover:scale-105 transition-transform duration-300 drop-shadow-lg"
      />

      <div className="w-full max-w-md space-y-6">
        {/* Email Form */}
        <form
          onSubmit={onHandleSubmit}
          className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    border border-white/20 space-y-6
                    transition-all duration-500 ease-in-out
                    ${formStep === 1 ? 'block' : 'hidden'}`}
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your email to receive a reset code
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <div
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl 
                            bg-white/30 group-hover:bg-white/40
                            focus-within:bg-white/50 focus-within:ring-2 
                            focus-within:ring-purple-500/50
                            transition duration-300"
              >
                <img
                  src={assets.mail_icon}
                  alt=""
                  className="w-5 h-5 opacity-60"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-gray-700 
                            placeholder:text-gray-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white font-semibold rounded-xl text-sm sm:text-base
                        hover:shadow-lg hover:shadow-purple-500/30 
                        hover:scale-[1.01] active:scale-[0.99]
                        transition duration-300"
            >
              Send Reset Code
            </button>
          </div>

          <div className="flex items-center justify-between text-sm pt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-purple-700 transition-colors duration-300"
            >
              Back to Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-purple-700 transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* OTP Form */}
        <form
          onSubmit={handleOtpSubmit}
          className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    border border-white/20 space-y-6
                    transition-all duration-500 ease-in-out
                    ${formStep === 2 ? 'block' : 'hidden'}`}
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Enter Reset Code
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 bg-white/30 text-gray-700 text-2xl font-bold 
                          text-center rounded-xl shadow-inner
                          border-2 border-transparent
                          focus:border-purple-500 focus:bg-white/50
                          focus:ring-4 focus:ring-purple-500/20 
                          transition-all duration-300 outline-none
                          hover:bg-white/40"
                  required
                />
              ))}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white font-semibold rounded-xl
                        hover:shadow-lg hover:shadow-purple-500/30 
                        hover:scale-[1.01] active:scale-[0.99]
                        transition duration-300"
            >
              Reset Password
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                className="text-gray-600 hover:text-purple-700 
                          hover:underline underline-offset-4
                          transition-all duration-300"
              >
                Resend Code
              </button>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-purple-600 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Code expires in {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* New Password Form */}
        <form
          onSubmit={handlePasswordSubmit}
          className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    border border-white/20 space-y-6
                    transition-all duration-500 ease-in-out
                    ${formStep === 3 ? 'block' : 'hidden'}`}
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              New Password
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your new password
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <div
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl 
                            bg-white/30 group-hover:bg-white/40
                            focus-within:bg-white/50 focus-within:ring-2 
                            focus-within:ring-purple-500/50
                            transition duration-300"
              >
                <img
                  src={assets.lock_icon}
                  alt=""
                  className="w-5 h-5 opacity-60"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-transparent outline-none text-gray-700 
                            placeholder:text-gray-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white font-semibold rounded-xl text-sm sm:text-base
                        hover:shadow-lg hover:shadow-purple-500/30 
                        hover:scale-[1.01] active:scale-[0.99]
                        transition duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
