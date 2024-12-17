import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server'

function ActivationPage() {
    const {activation_token} = useParams()
    const[error,setError] =useState(false)

    useEffect(()=>{
        if (activation_token) {
            const sendRequest = async () => {
              await axios
                .post(`${server}/user/activation`, {
                  activation_token,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  setError(true);
                });
            };
            sendRequest();
          }
       

    },[])
  return (
    <div style={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:'center'}}>
      {
        error ? 
        <p>Your Token is expired</p>
        :
        <p>Your Account has been Created sucessfully!</p>
      }
    </div>
  )
}

export default ActivationPage
