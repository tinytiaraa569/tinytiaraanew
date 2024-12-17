import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import LoginPage from '../Component/LoginPage'
import styles from '../Styles/styles'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'
import singupimg from '../Navbar1/logo.png'

import signupbanner from './singupbanner.jpg'

function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true); // Set loading to true before the request

        await axios.post(`${server}/user/login-user`, {
            email,
            password
        }, { withCredentials: true }).then((res) => {
            toast.success("Login success!")
            navigate("/")
            window.location.reload()

        }).catch((error) => {
            console.log(error)
            toast.error(error.message)

        }).finally(() => {
            setIsLoading(false); // Set loading to false after the request
        });

    }

    return (
        // <div className='min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        //     <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        //         <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        //             Login to Your Account
        //         </h2>
        //     </div>
        //     <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        //             <form action="" className='space-y-6' onSubmit={handleSubmit}>
        //                 <div>
        //                     <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
        //                         Email Address
        //                     </label>
        //                     <div className="mt-1">
        //                         <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="email" name='email' autoComplete='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
        //                     </div>
        //                 </div>
        //                 <div>
        //                     <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
        //                         Password
        //                     </label>
        //                     <div className="mt-1 relative">
        //                         <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type={visible ? "text" : "password"} name='password' autoComplete='current-password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />

        //                         {
        //                             visible ?
        //                                 <AiOutlineEye
        //                                     className="absolute right-2 top-2 cursor-pointer"
        //                                     size={25}
        //                                     onClick={() => setVisible(false)}
        //                                 />
        //                                 : <AiOutlineEyeInvisible
        //                                     className="absolute right-2 top-2 cursor-pointer"
        //                                     size={25}
        //                                     onClick={() => setVisible(true)}
        //                                 />
        //                         }
        //                     </div>
        //                 </div>

        //                 <div className={`${styles.noramlFlex} justify-between`}>
        //                     <div className={`${styles.noramlFlex}`}>
        //                         <input type="checkbox" name='remember-me' id='remember-me' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
        //                         <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>Remember me</label>
        //                     </div>
        //                     <div className="text-sm">
        //                         <a
        //                             href="forgot-password"
        //                             className="font-medium text-blue-600 hover:text-blue-500"
        //                         >
        //                             Forgot your password?
        //                         </a>
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
        //                         Submit
        //                     </button>
        //                 </div>
        //                 <div className={`${styles.noramlFlex} w-full`}>
        //                     <h4>Not have any account?</h4>
        //                     <Link to="/sign-up" className="text-blue-600 pl-2">
        //                         Sign Up
        //                     </Link>
        //                 </div>
        //             </form>

        //         </div>

        //     </div>


        // </div>

        <div className='signuppagemaincon'>
             {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-xl">Logging in, please wait...</div>
                </div>
            )}
            <div className='singupcon'>

                <div className='singupconleft'>
                    <div className="signuplogo cursor-pointer" >
                        <img src={singupimg} alt="" />
                    </div>

                    <div className='signupcontent'>
                        <h3> Login to Your Account </h3>
                        <p>Welcome to Tinytiaraa</p>

                    </div>

                    <div className='signupforfeield'>

                        <form action="" className='w-[100%] space-y-6' onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email" className='block text-[16px] font-medium text-[#2F2F2F] cursor-pointer'>
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input id='email' className=' respinpadjust appearance-none block w-[70%] px-3 py-2 border border-[#5DC2B0] rounded-[8px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="email" name='email' autoComplete='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className='block text-[16px] font-medium text-[#2F2F2F] cursor-pointer'>
                                    Password
                                </label>
                                <div className="mt-1 relative w-[70%] respinpadjust">
                                    <input id='password' className=' appearance-none block w-[100%] px-3 py-2 border border-[#5DC2B0] rounded-[8px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type={visible ? "text" : "password"} name='password' autoComplete='current-password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />

                                    {
                                        visible ?
                                            <AiOutlineEye
                                                className="absolute right-2 top-2 cursor-pointer"
                                                size={25}
                                                onClick={() => setVisible(false)}
                                            />
                                            : <AiOutlineEyeInvisible
                                                className="absolute right-2 top-2 cursor-pointer"
                                                size={25}
                                                onClick={() => setVisible(true)}
                                            />
                                    }
                                </div>
                            </div>

                            

                            <div className='signupbtnnew w-[70%] respinpadjust mt-5'>
                                <button type='submit' className='group relative w-[100%] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white'>
                                    Submit
                                </button>
                            </div>
                            <div className={`${styles.noramlFlex} w-full mb-6`}>
                             <h4>Not have any account?</h4>
                             <Link to="/sign-up" className="text-blue-600 pl-2">
                                 Sign Up
                             </Link>
                         </div>
                        </form>

                    </div>

                </div>

                <div className='singupconright'>
                    <div className='singupconrightcon'>
                        <img src={signupbanner} alt="" />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login
