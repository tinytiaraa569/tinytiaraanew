import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../Styles/styles';
import { IoBagHandleOutline } from 'react-icons/io5';
import { BsCartPlus } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '@/redux/actions/wishlist';
import { backend_url, imgdburl } from '@/server';
import { addToCart } from '@/redux/actions/cart';
import './wishlist.css'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function Wishlist({ setOpenWishlist }) {
  <Helmet>
  <title>Safe, Certified and Registered Natural Diamond & Gold jewellery for infants and Kids</title>
  <meta name="description" content="Certified gold diamond & silver and CZ kid's jewellery at Tiny Tiaraa. Quality & safety-first pieces. Perfect fit for sensitive skin. Free shipping & 48-hour delivery*." />
  <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
  <link rel="canonical" href="/wishlist" />

  </Helmet>

  const { wishlist } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data))

  }
  const addToCartHandler = (data) =>{
    const newData =  {...data ,qty:1}

    dispatch(addToCart(newData))
    setOpenWishlist(false)
  }



  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 overflow-y-scroll'>
      <div className="wishlistwidth fixed top-0 right-0 min-h-full w-[28%] bg-white flex flex-col justify-between shadow-sm">

        {
          wishlist && wishlist.length === 0 ?
            <div>
              <div className='w-full h-screen flex justify-center items-center'>
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => { setOpenWishlist(false) }} />


              </div>
              <h5>Your Wishlist Is Empty ! </h5>

            </div>


            </div>
            :
            <div >
             
              <div className='flex w-full justify-end pt-5 pr-5'>
                <RxCross1 size={25} className="cursor-pointer" onClick={() => { setOpenWishlist(false) }} />

              </div>
              <div className='pt-2 text-[20px] font-[500] text-center'>
                <h1>Your Wishlist</h1>
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={23} />
                <h5 className='pl-2 text-[18px] font-[500]'>{wishlist && wishlist.length} Items</h5>
              </div>

              <div className='w-full border-t'>
                {
                  wishlist && wishlist.map((i, index) => {
                    return (

                      <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} setOpenWishlist={setOpenWishlist} />
                    )

                  })
                }

              </div>

            </div>

        }

      </div>
    </div>
  )
}

const CartSingle = ({ data ,removeFromWishlistHandler ,addToCartHandler ,setOpenWishlist}) => {
  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  const navigate = useNavigate()



  return (
    <div className='border-b p-4'>

      <div className='w-full flex  items-center cursor-pointer' >
        <RxCross1 className='cursor-pointer' onClick={()=>removeFromWishlistHandler(data)}/>
        
        <img 
        loading='lazy'
        // src={`${data?.images[0]?.url}`} 
        src={
          data?.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
              ? data.images[0].url.replace(
                  /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                  `${imgdburl}/uploads/images`
              )
              : `${imgdburl}${data?.images[0]?.url}` // Prepend imgdburl if not a Cloudinary URL
      }
        alt="" className='w-[130px]  h-[140px] ml-2 self-center object-contain' onClick={()=>{
        navigate(`/product/${product_name}`)
        setOpenWishlist(false)
      }} />
        


        <div className="w-[70%] pl-[5px] pr-[5px] font-Poppins" onClick={()=>{
        navigate(`/product/${product_name}`)
        setOpenWishlist(false)
      }}>
          <h1 className='text-[13px]' >{data.name}</h1>
          <p className={`text-[#727386]  text-[12px] font-Poppins`}>{data.skuid}</p>
          <div className="flex pt-2">
            
            <h4 className={`${styles.price} line-through text-[15px]`}>
              {data.originalPrice ? " ₹" + data.originalPrice : null}
            </h4>
            <h5 className={`${styles.productDiscountPrice} text-[15px]`}>
              ₹
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
          </div>


        </div>

        <div className='' onClick={()=> addToCartHandler(data)}>
          <BsCartPlus size={20} className="cursor-pointer" />
        </div>


      </div>
    </div>
  )

}

export default Wishlist
