import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import LoginPage from '../Component/LoginPage'
import styles from '../Styles/styles'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'
import './signup.css'
import singupimg from '../Navbar1/logo.png'

import signupbanner from './singupbanner.jpg'

function Signup() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 8 * 1024 * 1024) {  //2MB limit
            toast.error("File size should be less than 8MB");
            return;
        }
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        axios
            .post(`${server}/user/create-user`, { name, email, password, avatar })
            .then((res) => {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setAvatar();
                setIsLoading(false); // End loading
            })
            .catch((error) => {

                toast.error(error.response.data.message);
                setIsLoading(false); 
            });
    };




    return (
        // <div className='bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8 mb-5'>
        //     <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        //         <h2 className='mt-1 text-center text-3xl font-extrabold text-gray-900'>
        //             Register new User
        //         </h2>
        //     </div>
        //     <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        //             <form action="" className='space-y-6' onSubmit={handleSubmit}>
        //                 <div>
        //                     <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
        //                         Full Name
        //                     </label>
        //                     <div className="mt-1">
        //                         <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="text" name='fullname' autoComplete='fullname' required value={name} onChange={(e) => { setName(e.target.value) }} />
        //                     </div>
        //                 </div>

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

        //                 <div>
        //                     <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'></label>
        //                     <div className="mt-2 flex items-center">
        //                         <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
        //                             {
        //                                 avatar ?
        //                                     <img src={avatar} alt="avatar img" className='h-full w-full object-cover rounded-full' />
        //                                     :
        //                                     <RxAvatar className="h-8 w-8" />
        //                             }

        //                         </span>
        //                         <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
        //                             <span>Uplaod a file</span>
        //                             <input type="file" name='avatar' id='file-input' accept='.jpg,.jpeg,.png' onChange={handleFileInputChange} className='sr-only' />
        //                         </label>

        //                     </div>
        //                 </div>

        //                 <div>
        //                     <button type='submit' className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
        //                         Submit
        //                     </button>
        //                 </div>
        //                 <div className={`${styles.noramlFlex} w-full`}>
        //                     <h4>Already have an account?</h4>
        //                     <Link to="/login" className="text-blue-600 pl-2">
        //                         Sign In
        //                     </Link>
        //                 </div>
        //             </form>

        //         </div>

        //     </div>


        // </div>

        <div className='signuppagemaincon'>
            {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                     <div className="text-white text-xl">Signing up, please wait...</div>
                </div>
            )}

            <div className='singupcon'>
            

                <div className='singupconleft'>
                    <div className="signuplogo cursor-pointer" >
                        <img src={singupimg} alt=""  />
                    </div>

                    <div className='signupcontent'>
                        <h3>Get Started </h3>
                        <p>Welcome to Tinytiaraa: Lets create your account</p>

                    </div>

                    <div className='signupforfeield'>

                        <form action="" className='w-[100%] space-y-6' onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="name" className='block text-[16px] font-medium text-[#2F2F2F] cursor-pointer'>
                                    Full Name <span className='text-red-500'>*</span>
                                </label>
                                <div className="mt-1 ">
                                    <input id='name' className=' respinpadjust appearance-none block w-[70%] px-3  py-2 border border-[#5DC2B0] rounded-[8px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="text" name='fullname' autoComplete='fullname' required value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className='block text-[16px] font-medium text-[#2F2F2F] cursor-pointer'>
                                    Email Address <span className='text-red-500'>*</span>
                                </label>
                                <div className="mt-1">
                                    <input id='email' className=' respinpadjust appearance-none block w-[70%] px-3 py-2 border border-[#5DC2B0] rounded-[8px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="email" name='email' autoComplete='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className='block text-[16px] font-medium text-[#2F2F2F] cursor-pointer'>
                                    Password <span className='text-red-500'>*</span> 
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

                            <div>
                                <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'></label>
                                <div className="mt-2 flex items-center">
                                    <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                        {
                                            avatar ?
                                                <img src={avatar} alt="avatar img" className='h-full w-full object-cover rounded-full' />
                                                :
                                                <RxAvatar className="h-8 w-8" />
                                        }

                                    </span>
                                    <label htmlFor="file-input" className='cursor-pointer ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                        <span>Uplaod a file</span>
                                        <input type="file" name='avatar' id='file-input' accept='.jpg,.jpeg,.png' onChange={handleFileInputChange} className='sr-only' />
                                        <span className='text-xs text-gray-500 ml-2 italic'>(optional)</span>
                                    </label>

                                </div>
                            </div>

                            <div className='signupbtnnew w-[70%] respinpadjust'>
                                <button type='submit' className='group relative w-[100%] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white'>
                                    Submit
                                </button>
                            </div>
                            <div className={`${styles.noramlFlex} w-full `}>
                                <h4>Already have an account?</h4>
                                <Link to="/login" className="text-blue-600 pl-2">
                                    Sign In
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

export default Signup

