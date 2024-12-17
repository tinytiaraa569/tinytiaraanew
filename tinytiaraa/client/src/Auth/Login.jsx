import React, { useState } from 'react'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import {Link, useNavigate ,useLocation} from 'react-router-dom' 
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/auth';

function Login() {
    const[email,setemail] =useState('')
    const[password,setpassword] =useState('')
    const[auth,setAuth]=useAuth()
    

    const navigate = useNavigate()
    const location = useLocation()


     const handleLogin = async (e) =>{
       e.preventDefault()
       try {
        const res = await axios.post('http://localhost:8080/api/v1/auth/login',{email,password})
        if(res && res.data.success){
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            toast.success(res.data.message)
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || "/")
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
                        <h1>Create an Account</h1>
                        <p>Get Shopping With us</p>
                    </div>
                    <form onSubmit={handleLogin}>

                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" required placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" required placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                        </div>
                        
                        <input className="signup-btn" type="submit" value="LOG IN" />
                    </form>
                    
                    <p>Don't have an account <Link to="/register">sign up</Link></p>
                    <p> <Link to="/forgot-password">Forgot Password</Link></p>

                    <Toaster />
                </div>
            </div>
      
    </div>
  )
}
 
export default Login
