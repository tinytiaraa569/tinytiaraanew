import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import {Link, useNavigate} from 'react-router-dom' 
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios'

function Register() {
    const[name,setname] =useState('')
    const[email,setemail] =useState('')
    const[password,setpassword] =useState('')
    const[phone,setphone] =useState('')
    const[address,setaddress] =useState('')
    const[answer,setanswer] =useState('')


    const navigate = useNavigate()


       

     const handleSubmit = async (e) =>{
       e.preventDefault()
       try {
        const res = await axios.post('http://localhost:8080/api/v1/auth/register',{name,email,password,phone,address,answer})
        if(res && res.data.success){
            navigate("/login")
            toast.success(res.data.message)
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
                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" required placeholder="Username" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" required placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" required placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-phone"></i>
                            <input type="tel" required placeholder="Phone Number" value={phone} onChange={(e)=>{setphone(e.target.value)}} />
                        </div>
                        <div className="input">
                            <i className="fa-solid fa-phone"></i>
                            <input type="text" required placeholder="Your security Text" value={answer} onChange={(e)=>{setanswer(e.target.value)}} />
                        </div>
                        <div className="input secinp">
                            <i className="fa-solid fa-address-card"></i>
                            <textarea name="" required id="" placeholder="Address" value={address} onChange={(e)=>{setaddress(e.target.value)}}></textarea>
                        </div>
                        <input className="signup-btn" type="submit" value="SIGN UP" />
                    </form>
                    
                    <p>Already have an account <Link to="/login">sign in</Link></p>
                    <Toaster />
                </div>
            </div>


        </div>
    )
}

export default Register
