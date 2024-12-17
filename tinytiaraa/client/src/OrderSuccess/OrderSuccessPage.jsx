import React, { useEffect, useState } from 'react';
import Lottie from "react-lottie";
import animationData from "./success-icon.json";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { imgdburl } from '@/server';

function OrderSuccessPage() {
    
    const [orderDetails, setOrderDetails] = useState(null);
    const [gstAmount, setGstAmount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const { currency, conversionRates } = useSelector((state) => state.currency);


    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const navigate = useNavigate()
    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));
        setOrderDetails(storedOrder);

        if (storedOrder) {
            const totalPrice = parseFloat(storedOrder.totalPrice);
            const couponDisc = parseFloat(storedOrder.couponDiscount) || 0;

            // Calculate GST (3% of totalPrice before discount)
            const gst = (totalPrice / (1 - 0.03)) * 0.03;
            setGstAmount(gst.toFixed(2));

            // Set coupon discount
            setCouponDiscount(couponDisc);
        }
    }, []);

    console.log(orderDetails, "successpage");
     // Convert prices based on the selected currency
     const convertPrice = (price) => {
        return (price * (conversionRates[currency] || 1)).toFixed(2);
    };

    return (
        <div className='w-full h-auto py-10 bg-gray-50'>
            <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col justify-center items-center'>
                    <Lottie options={defaultOptions} width={200} height={200} />
                    <h1 className='text-3xl font-semibold mt-5'>Thank You for Your Purchase!</h1>
                    <p className='mt-2 text-gray-600'>We've received your order and it will ship in 5-7 business days.</p>
                    <p className='text-lg font-medium mt-2'>Your Order Number is <span className='text-indigo-600'>#{orderDetails?.orderId}</span></p>
                </div>

                <div className='mt-10 p-6 bg-white rounded-lg shadow'>
                    <h2 className='text-2xl font-semibold mb-5'>Order Summary</h2>

                    <div className='border-b pb-5 mb-5'>
                        <h3 className='text-lg font-medium text-gray-700'>Shipping Address</h3>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.name}</p>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.email}</p>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.phoneNumber}</p>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.address1}, {orderDetails?.shippingAddress.address2}</p>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.city}, {orderDetails?.shippingAddress.state}, {orderDetails?.shippingAddress.postalCode}</p>
                        <p className='text-gray-600'>{orderDetails?.shippingAddress.country}</p>
                    </div>

                    <div className='border-b pb-5 mb-5'>
                        <h3 className='text-lg font-medium text-gray-700'>Payment Information</h3>
                        <p className='text-gray-600'>Payment Method: {orderDetails?.paymentInfo.type}</p>
                    </div>

                    <div className='border-b pb-5 mb-5'>
                        <h3 className='text-lg font-medium text-gray-700'>Order Details</h3>
                        {orderDetails?.cart.map((item, index) => (
                            <div key={index} className='flex items-start justify-between mb-4'>
                                <div className='flex items-center'>
                                    <img 
                                    // src={item.images[0].url} 
                                    src={
                                        item.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                            ? item.images[0].url.replace(
                                                /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                `${imgdburl}/uploads/images`
                                            )
                                            : `${imgdburl}${item.images[0]?.url}` // Prepend imgdburl if not a Cloudinary URL
                                    }
                                    alt={item.name} className='w-20 h-20 object-cover rounded-lg' />
                                    <div className='ml-4'>
                                        <h4 className='text-gray-700 font-medium'>{item.name}</h4>
                                        <p className='text-gray-500 text-sm'> {item.skuid}</p>
                                        {
                                            item.selectedColor !== null && (
                                                <p className='text-gray-500 text-sm'>Metal Color: {metalColors[item.selectedColor]}</p>
                                            )
                                        }
                                        {item.selectedEnamelColor && (
                                            <p className='text-gray-500 text-sm'>Enamel Color: {item.selectedEnamelColor.replace(/_/g, ' ')}</p>
                                        )}
                                        {item.showWithChain !== null && (
                                            <p className='text-gray-500 text-sm'><span className='font-[500]'>Chain:</span> {item.showWithChain ? 'With Chain' : 'Without Chain'}</p>
                                        )}
                                    </div>
                                </div>
                                <p className='text-gray-700 font-medium'>₹{convertPrice(item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice)}</p>
                                {/* <p className='text-gray-700 font-medium'>₹{item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice}</p> */}
                            </div>
                        ))}
                    </div>

                    <div className='text-right'>
                        {/* {couponDiscount > 0 && (
                            <p className='text-gray-700 text-lg'>Coupon Discount: -₹{couponDiscount}</p>
                        )} */}
                         {couponDiscount > 0 && (
                            <p className='text-gray-700 text-lg'>Coupon Discount: -₹{convertPrice(couponDiscount)}</p>
                        )}
                        {/* <p className='text-gray-700 text-lg'>GST (3%): ₹{gstAmount}</p>
                        <h3 className='text-xl font-semibold text-gray-700 mt-2'>Total Price: ₹{orderDetails?.totalPrice}</h3> */}
                          <p className='text-gray-700 text-lg'>GST (3%): ₹{convertPrice(gstAmount)}</p>
                          <h3 className='text-xl font-semibold text-gray-700 mt-2'>Total Price: ₹{convertPrice(orderDetails?.totalPrice)}</h3>
                    </div>

                    <div className='flex justify-center mt-4'>
                        <button className='bg-[#448176] text-[#fff] px-7 py-3 rounded-[8px] shadow-lg' onClick={() => {
                            navigate("/")
                        }}>Shop More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
