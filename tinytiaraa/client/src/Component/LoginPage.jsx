import React, { useEffect } from 'react'
import Login from '../Pages/Login'
import './Compsty.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.user)

  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(isAuthenticated === true){
  //     navigate("/")
  //   }
  // },[])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='loginpage'>
      {
        isAuthenticated ?
          (navigate("/"))
          :
          <Login />

      }
    </div>
  )
}

export default LoginPage