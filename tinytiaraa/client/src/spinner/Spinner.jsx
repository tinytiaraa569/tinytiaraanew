import React ,{useState,useEffect} from 'react'
import CircularProgress from '@mui/joy/CircularProgress';
import { useNavigate,useLocation } from 'react-router-dom';
import './spinner.css'

function Spinner({path="login"}) {
    const [count,setCount]=useState(5)
    const navigate =useNavigate()
    const location =useLocation()


    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue)
        },1000)
        count === 0 && navigate(`/${path}` ,{
            state:location.pathname
        })
        return()=> clearInterval(interval)

    },[count, navigate,location,path])
  return (
    <div className='spinnermain'>
        <h1>redirecting to you in {count} second</h1>
        <CircularProgress />
    </div>
  )
}

export default Spinner
