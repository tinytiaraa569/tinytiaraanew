import React, { useEffect } from 'react'
import Signup from '../Pages/Signup'
import './Compsty.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])



  return (
    <div className='signup'>
      { 
      isAuthenticated ?
        (navigate("/"))
        :
        <Signup/>


      }
      
    </div>
  )
}

export default SignupPage
