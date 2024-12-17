import React from 'react'
import './Shipping.css'
import { useNavigate } from 'react-router-dom'
import shipping from './shipping.png'

function Shippingpage() {
  const navigate = useNavigate()
  return (
    <div className='shippingsection'>
            <h1 className='text-[22px] text-center mb-3'>Shipping Info</h1>


      <div className="shippingcard">
        <div className="shippingimg">
            <img src={shipping} alt="" />
        </div>
        <div className="shippingcontent">
            <div className="shooingadjust">
            <h2>Fast, Reliable, and Hassle-Free Delivery Services</h2>
            <p>Get your orders where they need to be at lightning speed. Our express service guarantees shipping within 48 Hours*(T&C).</p>
            <div className='flex justify-center'>
            <button onClick={()=>{navigate("/shop")}}>Shop Now</button>

            </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Shippingpage
