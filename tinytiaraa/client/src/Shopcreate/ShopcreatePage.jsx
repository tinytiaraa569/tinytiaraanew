import React, { useEffect } from 'react'
import Shopcreate from './Shopcreate'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ShopcreatePage() {

  const navigate = useNavigate()
  const { isSeller,seller } = useSelector((state) => state.seller)
  console.log(isSeller)

  useEffect(()=>{
    if(isSeller === true){
      navigate(`/shop/${seller._id}`)
    }
  },[])
  return (
    <div>
      <Shopcreate />
    </div>
  )
}

export default ShopcreatePage
