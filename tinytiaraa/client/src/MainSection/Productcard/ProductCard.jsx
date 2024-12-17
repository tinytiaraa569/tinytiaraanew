import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/styles'
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import './productcard.css'
import ProductDetailsCard from '../../ProductDetailsCard/ProductDetailsCard'
import { backend_url, imgdburl } from '@/server'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist'
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share"
import { EmailShareButton, FacebookShareButton } from "react-share"
import { FaInstagram } from 'react-icons/fa'

function ProductCard({ data ,selectedEnamelColorimg}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { wishlist } = useSelector((state) => state.wishlist)
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const [showShareIcons, setShowShareIcons] = useState(false)
  const dispatch = useDispatch()
  const d = data.name
  const product_name = d.replace(/\s+/g, "-")
  const navigate = useNavigate()
  const { currency, conversionRates } = useSelector((state) => state.currency); // Accessing currency state and conversion rates


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [wishlist])

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }
  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))
  }

  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons)
  }

  const closeShareIcons = () => {
    setShowShareIcons(false)
  }

  const handleMouseLeave = () => {
    setShowShareIcons(false)
  }

  const shareOnInstagram = (product) => {
    const url = `https://www.instagram.com/?url=https://www.tinytiaraa.com/product/${product_name}`
    window.open(url, '_blank')
  }

  const handleWhatsappShare = () => {
    const productLink = `https://www.tinytiaraa.com/product/${product_name}`
    const message = `Check out this amazing product: ${productLink}`

    // Try to open WhatsApp Desktop App URI
    const whatsappAppURI = `whatsapp://send?text=${encodeURIComponent(message)}`

    window.location.href = whatsappAppURI

    // Fallback to WhatsApp Web
    setTimeout(() => {
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank')
    }, 1000)
  }

  const enamelColorImages = data.enamelColors[selectedEnamelColorimg]
    ? Object.values(data.enamelColors[selectedEnamelColorimg]).flat()
    : [];

    const convertedOriginalPrice = (data.originalPrice * (conversionRates[currency] || 1)).toFixed(0);
    const convertedDiscountPrice = (data.discountPrice * (conversionRates[currency] || 1)).toFixed(0);
  
  return (
    <div className='parentsinglecrd'>
      <div className="parentproductcard w-full h-[314px] pb-4 bg-white rounded-[15px] shadow-lg  p-3 relative cursor-pointer overflow-hidden " onMouseLeave={handleMouseLeave}>
        <div className="flex justify-end "></div>

        <div className='w-full h-[150px] overflow-hidden'>
          <Link to={`/product/${product_name}`}>
          <img
              // src={enamelColorImages.length > 0 ? enamelColorImages[0]?.url : data.images && data.images[1]?.url}
              src={
                enamelColorImages.length > 0 
                    ? (
                        enamelColorImages[0].url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/) 
                            ? enamelColorImages[0].url.replace(
                                /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/, 
                                `${imgdburl}/uploads/images`
                            ) 
                            : `${imgdburl}${enamelColorImages[0].url}`
                      )
                    : (
                        data.images && data.images[1].url.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/) 
                            ? data.images[1].url.replace(
                                /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/, 
                                `${imgdburl}/uploads/images`
                            ) 
                            : `${imgdburl}${data.images && data.images[1].url}`
                      )
            }
              alt=""
              className=' parentproductimg w-full h-[150px] object-contain'
            />
          </Link>
        </div>
        <div className='w-full h-[auto] overflow-hidden ' title={data.name}>
          <Link to={`/product/${product_name}`}>
            <h4 className='pb-1 font-[500] text-[14px] text-center !line-clamp-1'>{data.name.length > 28 ? data.name.slice(0, 28) + "..." : data.name}</h4>
          </Link>
          <p className={`${styles.skuid}`}>{data.skuid}</p>
          <div className=" mt-2 flex items-center justify-center">
            <div className="flex pricebraekdownadjust">
            {data.originalPrice > 0 && (
                <h4 className={`${styles.price} line-through`}>
                   {currency} {convertedOriginalPrice}
                </h4>
              )}
              <h5 className={`${styles.productDiscountPrice} pl-2`}>
              {currency} {convertedDiscountPrice}
              </h5>
              <span>
              
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className=' flex justify-center mt-1' onClick={() => { navigate(`/product/${product_name}`) }}>
            <button className={`ajustphonebt buynowtbn ${styles.cart_button} ${styles.cart_button_text}`}>Buy Now</button>
          </div>
        </div>

        <div className='childcard' >
          {
            click ?
              <AiFillHeart
                size={22}
                className='cursor-pointer absolute right-2 top-5'
                color={click ? "red" : "#333"}
                onClick={() => removeFromWishlistHandler(data)}
                title='Remove from wishlist'
              />
              :
              <AiOutlineHeart
                size={22}
                className='cursor-pointer absolute right-2 top-5'
                color={click ? "red" : "#333"}
                onClick={() => addToWishlistHandler(data)}
                title='Add to wishlist'
              />
          }

          <AiOutlineEye
            size={22}
            className='cursor-pointer absolute right-2 top-14'
            color='#333'
            title='Quick View'
            onClick={() => setOpen(!open)}
          />

          <AiOutlineShareAlt
            size={23}
            className='cursor-pointer absolute right-2 top-24'
            color='#444'
            title='Share'
            onClick={toggleShareIcons}
          />

          <div className=''>
            {showShareIcons && (
              <div className="share-icons absolute top-28 right-0 mt-4 flex gap-[4px] p-2  rounded-md z-10">
                <FacebookShareButton url={`https://www.tinytiaraa.com/product/${product_name}`} onClick={closeShareIcons} >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <div onClick={handleWhatsappShare}>
                  <WhatsappIcon size={32} round={true} />
                </div>

                <EmailShareButton url={`https://www.tinytiaraa.com/product/${product_name}`} onClick={closeShareIcons} >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>

                <div onClick={() => { shareOnInstagram(data) }}>
                  <i className="fa-brands fa-square-instagram instasty" style={{ cursor: 'pointer' }}></i>
                </div>
              </div>
            )}
          </div>

          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
