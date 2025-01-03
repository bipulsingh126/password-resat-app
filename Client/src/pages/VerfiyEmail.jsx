import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext.jsx'

const VerfiyEmail = () => {
  const [timer, setTimer] = useState(300) // 5 minutes
  const [isResending, setIsResending] = useState(false)
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(
    AppContext,
  )

  const inputRefs = React.useRef([])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(countdown)
  }, [])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleResendOtp = async () => {
    if (isResending || timer > 0) return
    setIsResending(true)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-verify-otp',
        { userId: userData?._id },
        { withCredentials: true },
      )
      if (data.success) {
        toast.success(data.message)
        setTimer(300) // Reset timer
        // Clear inputs
        inputRefs.current.forEach((input) => {
          if (input) input.value = ''
        })
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code')
    } finally {
      setIsResending(false)
    }
  }

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const otpArray = inputRefs.current.map((e) => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-email', {
        userId: userData?._id,
        otp,
      })
      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed')
    }
  }

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/login')
    } else if (userData?.isAccountVerified) {
      navigate('/')
    }
  }, [userData, navigate, isLoggedin])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-100 to-white px-4">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute top-5 left-5 sm:left-20 w-16 sm:w-28 md:w-32 lg:w-40 cursor-pointer 
                  hover:scale-105 transition-transform duration-300 drop-shadow-lg"
      />

      <div
        className="w-full max-w-xs sm:max-w-md bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    border border-white/20"
      >
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please enter the verification code sent to your email
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6 sm:space-y-8">
          <div
            className="flex justify-between gap-1 sm:gap-2"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 sm:w-12 h-12 sm:h-14 bg-white/30 backdrop-blur-sm text-gray-800 text-xl sm:text-2xl font-bold 
                          text-center rounded-xl shadow-inner
                          border-2 border-transparent
                          focus:border-purple-500 focus:bg-white/50
                          focus:ring-4 focus:ring-purple-500/20 
                          transition-all duration-300 outline-none
                          hover:bg-white/40"
                />
              ))}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-500 
                        text-white text-base sm:text-lg font-semibold rounded-xl
                        shadow-lg shadow-purple-500/30
                        hover:shadow-purple-500/40 hover:scale-[1.01]
                        active:scale-[0.99]
                        transition-all duration-300"
            >
              Verify Email
            </button>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <button
                type="button"
                className="text-purple-700 hover:text-purple-900 font-medium
                          hover:underline underline-offset-4
                          transition-all duration-300"
                onClick={handleResendOtp}
              >
                Resend Code
              </button>
              <div className="flex items-center text-gray-600 space-x-1 sm:space-x-2">
                <svg
                  className={`w-3 sm:w-4 h-3 sm:h-4 text-purple-600 ${
                    timer > 0 ? 'animate-pulse' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {timer > 0
                    ? `Code expires in ${formatTime(timer)}`
                    : 'Code expired'}
                </span>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-purple-700 text-xs sm:text-sm font-medium
                      hover:underline underline-offset-4
                      transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerfiyEmail
