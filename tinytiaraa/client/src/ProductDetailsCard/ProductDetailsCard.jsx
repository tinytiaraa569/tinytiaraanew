import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../Styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url, imgdburl } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '@/redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist';

const ProductDetailsCard = ({ setOpen, data }) => {
    const { cart } = useSelector((state) => state.cart)
  const {wishlist} =useSelector((state) => state.wishlist)

    const dispatch = useDispatch()


    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)

    const handleMessageSubmit = () => {

    }

    

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };

    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (colorIndex) => {
        setSelectedColor(colorIndex); // Update selectedColor state with the index of the color
        setSelect(0); // Reset selected image index to 0 when color changes


    };
    const [showWithChain, setShowWithChain] = useState(null);

    const toggleChainOption = (option) => {
        setShowWithChain(option === 'with'); // Set showWithChain based on the selected option ('with' or 'without')
        setSelect(0); // Reset selected image index when toggling chain option
    };

    const renderImages = () => {
        // Determine which array of images to render based on selectedColor
        const imagesArray =
            selectedColor === 0
                ? data.MetalColor.YellowGoldclr
                : selectedColor === 1
                    ? data.MetalColor.RoseGoldclr
                    : selectedColor === 2
                        ? data.MetalColor.WhiteGoldclr

                        : showWithChain === true
                            ? data.withchainimages
                            : showWithChain === false
                                ? data.withchainoutimages


                                : data.images;


        return (
            <div className='w-full flex'>
                {imagesArray &&
                    imagesArray.map((image, index) => (
                        <div
                            key={index}
                            className={`${select === index ? 'border' : 'null'} cursor-pointer`}
                            onClick={() => setSelect(index)}
                        >
                            <img
                                // src={`${image?.url}`}
                                src={
                                    image?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                        ? image.url.replace(
                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                            `${imgdburl}/uploads/images`
                                          )
                                        : `${imgdburl}${image?.url}` // Prepend imgdburl if not Cloudinary
                                }
                                alt=""
                                className='h-[200px]'
                            />
                        </div>
                    ))}
            </div>
        );
    };

    const addToCartHandler = (id) => {

        const isItemExists = cart && cart.find((i) => i._id === id)

        if (isItemExists) {
            toast.error("Item Already in cart")
        } else {
            if (data.stock < count) {
                toast.error("Product Stock limited")

            } else {
                const cartData = { ...data, qty: count }
                dispatch(addToCart(cartData))
                toast.success("Product Added to cart")
            }
        }

    }

    useEffect(()=>{

        if(wishlist && wishlist.find((i) => i._id === data._id)){
          setClick(true)
    
        }else{
          setClick(false)
        }
    
      },[wishlist])
    
      const removeFromWishlistHandler = (data) =>{
        setClick(!click)
        dispatch(removeFromWishlist(data))
    
    
      }
      const addToWishlistHandler = (data) =>{
        setClick(!click)
        dispatch(addToWishlist(data))
    
    
      }


    return (
        <div className='bg-[#fff]'>
            {
                data ?
                    <div className='fixed w-full h-screen top-[50px] left-0 bg-[#00000065] z-40 flex items-center justify-center'>
                        <div className='w-[70%] 800px:w-[60%] h-[80vh] overflow-y-scroll 800px:h-[70vh] bg-white rounded-md shadow-sm relative p-4'>
                            <RxCross1 size={30} className="absolute right-3 top-3 z-50" onClick={() => setOpen(false)} />

                            <div className='flex w-full 800px:flex flex-col sm:flex-row'>
                                <div className='w-full 800px:w-[50%]'>
                                    {select !== null && (
                                        selectedColor === 0 && data.MetalColor.YellowGoldclr ? (
                                            <img
                                                // src={`${data.MetalColor.YellowGoldclr[select]?.url}`}
                                                src={
                                                    data.MetalColor.YellowGoldclr[select]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                        ? data.MetalColor.YellowGoldclr[select].url.replace(
                                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                            `${imgdburl}/uploads/images`
                                                          )
                                                        : `${imgdburl}${data.MetalColor.YellowGoldclr[select]?.url}`
                                                }
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 1 && data.MetalColor.RoseGoldclr ? (
                                            <img
                                                // src={`${data.MetalColor.RoseGoldclr[select]?.url}`}
                                                src={
                                                    data.MetalColor.RoseGoldclr[select]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                        ? data.MetalColor.RoseGoldclr[select].url.replace(
                                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                            `${imgdburl}/uploads/images`
                                                          )
                                                        : `${imgdburl}${data.MetalColor.RoseGoldclr[select]?.url}`
                                                }
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 2 && data.MetalColor.WhiteGoldclr ? (
                                            <img
                                                // src={`${data.MetalColor.WhiteGoldclr[select]?.url}`}
                                                src={
                                                    data.MetalColor.WhiteGoldclr[select]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                        ? data.MetalColor.WhiteGoldclr[select].url.replace(
                                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                            `${imgdburl}/uploads/images`
                                                          )
                                                        : `${imgdburl}${data.MetalColor.WhiteGoldclr[select]?.url}`
                                                }
                                                alt=""
                                                className='w-[90%] h-[60vh] object-contain'
                                            />
                                        ) : (
                                            data.images && data.images[select] ? (
                                                <img
                                                    // src={`${data.images[select]?.url}`}
                                                    src={
                                                        data.images[select]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                            ? data.images[select].url.replace(
                                                                /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                                `${imgdburl}/uploads/images`
                                                              )
                                                            : `${imgdburl}${data.images[select]?.url}`
                                                    }
                                                    alt=""
                                                    className='w-[90%] h-[60vh] object-contain'
                                                />
                                            ) : (
                                                <img
                                                src={
                                                    data.images && data.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                        ? data.images[0].url.replace(
                                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                            `${imgdburl}/uploads/images`
                                                          )
                                                        : `${imgdburl}${data.images && data.images[0]?.url}`
                                                }
                                                    // src={`${data.images && data.images[0]?.url}`} // Default to the first image if select is null or out of range
                                                    alt=""
                                                    className='w-[90%] h-[60vh] object-contain'
                                                />
                                            )
                                        )
                                    )
                                    }

                                    <div className='flex ml-2'>
                                        {renderImages()}

                                    </div>


                                </div>
                                <div className='w-full 800px:w-[50%] pt-5 pl-[15px] pr-[5px]'>
                                    <h1 className={`${styles.productTitle} text-[22px] font-Poppins`}>{data.name}</h1>
                                    <h3 className={`text-[#727386] text-left  text-[16px] font-Poppins pt-2`}>{data.skuid}</h3>
                                    <p className='font-Poppins pt-3'>{data.description}</p>

                                    {/* metal options */}

                                    <div>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <div className="metal-color-options">
                                                <h3 className='text-[20px] font-[600] font-Poppins'>Metal Color</h3>
                                                {Object.keys(data.MetalColor).map((key, index) => {
                                                    // Remove "clr" from the end of color name
                                                    const label = key.replace(/clr$/i, '');

                                                    return (
                                                        <div key={index} className='flex items-center text-[16px] font-Poppins py-1'>
                                                            <input
                                                                type="radio"
                                                                name='colorcode'
                                                                id={`color-${key}`}
                                                                value={key}
                                                                onChange={() => handleColorChange(index)}
                                                            />
                                                            <label
                                                                className='pl-2 cursor-pointer'
                                                                htmlFor={`color-${key}`}
                                                            >
                                                                {label}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* chain options */}

                                    <div className='pt-3'>
                                        <h3 className='text-[20px] font-[600] font-Poppins'>Chain</h3>
                                        <div className='radio-option  text-[16px] font-Poppins py-1'>
                                            <input
                                                type='radio'
                                                id='withChain'
                                                name='chainOption'
                                                value='with'
                                                onChange={() => toggleChainOption('with')}
                                                checked={showWithChain}
                                            />
                                            <label htmlFor='withChain' className='pl-2 cursor-pointer'>
                                                With 1 gm Chain ( 13 inches) (+₹ 7,200)
                                            </label>
                                        </div>
                                        <div className='radio-option text-[16px] font-Poppins py-1'>
                                            <input
                                                type='radio'
                                                id='withoutChain'
                                                name='chainOption'
                                                value='without'
                                                onChange={() => toggleChainOption('without')}
                                                checked={!showWithChain}
                                            />
                                            <label htmlFor='withoutChain' className='pl-2 cursor-pointer'>
                                                Without Chain
                                            </label>
                                        </div>
                                    </div>


                                    <div className="flex pt-5">
                                        <h5 className={`${styles.productDiscountPrice} text-[22px] font-Poppins`}>
                                            ₹
                                            {data.originalPrice === 0
                                                ? data.originalPrice
                                                : data.discountPrice}
                                        </h5>
                                        <h4 className={`${styles.price} line-through text-[22px] font-Poppins`}>
                                            {data.originalPrice ? " ₹" + data.originalPrice : null}
                                        </h4>
                                    </div>

                                    <div className='flex items-center mt-5 justify-between pr-3'>
                                        <div className='overflow-hidden'>
                                            <button onClick={decrementCount} className="bg-gradient-to-r font-Poppins from-[#1BB8E5] to-[#1fa3c7] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">-</button>
                                            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9.1px] font-Poppins overflow-hidden">
                                                {count}
                                            </span>
                                            <button onClick={incrementCount}
                                                className="bg-gradient-to-r from-[#1BB8E5] font-Poppins to-[#1fa3c7] text-white font-bold rounded-br rounded-tr px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            >+ </button>
                                        </div>
                                        <div>
                                            {
                                                click ?
                                                    <AiFillHeart
                                                        size={30}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}
                                                        onClick={() => removeFromWishlistHandler(data)}
                                                        title='Remove from wishlist'
                                                    />
                                                    :
                                                    <AiOutlineHeart
                                                        size={30}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}
                                                        onClick={() => addToWishlistHandler(data)}
                                                        title='Add to wishlist'


                                                    />
                                            }
                                        </div>

                                    </div>

                                    <div
                                        className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                        onClick={() => addToCartHandler(data._id)}
                                    >
                                        <span className="text-[#fff] flex items-center font-Poppins">
                                            Add to cart <AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default ProductDetailsCard
