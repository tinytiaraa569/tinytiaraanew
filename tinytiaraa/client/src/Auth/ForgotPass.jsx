import React, { useState } from 'react'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import {Link, useNavigate ,useLocation} from 'react-router-dom' 
import toast, { Toaster } from 'react-hot-toast';


function ForgotPass() {

    const[email,setemail] =useState('')
    const[newPassword,setnewPassword] =useState('')
    const[answer,setanswer] =useState('')

    const navigate = useNavigate()
     const handleLogout = async (e) =>{
       e.preventDefault()
       try {
        const res = await axios.post('http://localhost:8080/api/v1/auth/forgot-password',{email,newPassword,answer})
        if(res && res.data.success){
            toast.success(res.data.message)
            navigate("/login")
        }else{
            toast.error(res.data.message)
        }
       } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
       }
       

    }
  return (
    <div className='Registerpage'>
         <div className="signup-form">
                <div className="container">
                    <div className="header">
                        <h1>Forgot Password</h1>
                        <p>Get Shopping With us</p>
                    </div>
                    <form onSubmit={handleLogout}>

                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" required placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="text" required placeholder="Enter Your secret Text"  value={answer} onChange={(e)=>{setanswer(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" required placeholder="Enter Your New Password"  value={newPassword} onChange={(e)=>{setnewPassword(e.target.value)}}/>
                        </div>
                        
                        <input className="signup-btn" type="submit" value="Forgot Password" />
                    </form>
                    
                    <p>Don't have an account <Link to="/register">sign up</Link></p>

                    <Toaster />
                </div>
            </div>
      
    </div>
  )
}

export default ForgotPass
