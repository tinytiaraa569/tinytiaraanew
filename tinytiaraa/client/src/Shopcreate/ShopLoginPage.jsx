import React, { useEffect } from 'react'
import ShopLogin from './ShopLogin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ShopLoginPage() {

  const navigate = useNavigate()
  const { isSeller,seller ,isLoading } = useSelector((state) => state.seller)
  console.log(isSeller)

  useEffect(()=>{
    if(isSeller === true){
      navigate(`/dashboard`)
    }
  },[isLoading,isSeller])
  return (
    <div>
           <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
