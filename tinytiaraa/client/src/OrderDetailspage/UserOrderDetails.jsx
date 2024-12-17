import { getAllOrdersOfShop, getAllOrdersOfUser } from '@/redux/actions/order'
import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CiViewList } from "react-icons/ci";
import { backend_url, imgdburl, server } from '@/server'
import { RxCross1 } from 'react-icons/rx'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TbTruckReturn } from 'react-icons/tb'
import { VscFeedback } from 'react-icons/vsc'

function UserOrderDetails() {
    const { orders, isLoading } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)


    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")
    
    const [refundModalOpen, setRefundModalOpen] = useState(false) // New state for refund modal
    const [confirmModalOpen, setConfirmModalOpen] = useState(false) // New state for confirmation modal
    const [refundReason, setRefundReason] = useState("") // State to store selected refund reason
    const [error, setError] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const { id } = useParams()

    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
      };

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user.email))
    }, [dispatch])

    const data = orders && orders?.find((item) => item?._id === id)

    console.log(data)

    const reviewHandler = async (e) => {
        e.preventDefault()
        await axios.put(`${server}/product/create-new-review`, {
            user,
            rating,
            comment,
            productId: selectedItem?._id,
            orderId: id
        }, { withCredentials: true }).then((res) => {
            toast.success(res.data.message)
            dispatch(getAllOrdersOfUser(user._id))
            setComment("")
            setRating(null)
            setOpen(false)

        }).catch((error) => {
            toast.error(error)


        })

    }


    const handleReasonChange = (reason) => {
        setRefundReason(reason);
        setError('');  // Clear the error when a reason is selected
        if (reason !== "Other") {
            setOtherReason('');  // Reset the "Other" reason text if another option is selected
        }
    };



    const refundhandler = async () => {
        if (!refundReason ) {
            setError('Please select a reason for the refund.');
            return;
        }
        if ((refundReason === "Other" && !otherReason.trim()) ) {
            setError('Please Type a reason for the refund.');
            return;
        }

        

        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing Refund"
        }).then((res) => {
            toast.success(res.data.message)
            dispatch(getAllOrdersOfUser(user._id))
            
            setRefundModalOpen(false) // Close the refund modal after processing
            setRefundReason("") // Reset refund reason
            window.location.reload()
        }).catch((error) => {
            toast.error(error.response.data.message)


        })

    }


    const isReturnWindowOpen = (deliveryDate) => {
        if (!deliveryDate) return false; // No delivery date means return window is closed
        const now = new Date();
        const deliveredDate = new Date(deliveryDate);
        const diffTime = Math.abs(now - deliveredDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7; // Return true if within 7 days
    }
    const refundReasons = [
        "Product is defective",
        "Product not as described",
        "Changed my mind",
        "Wrong item received",
        "Other"
    ];

    // Handle confirmation of return order
    const handleConfirmReturn = () => {
        setConfirmModalOpen(false); // Close the confirmation modal
        setRefundModalOpen(true); // Open the refund reason modal
    };

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <BsFillBagFill size={28} color='crimson' />
                    <h1 className='pl-2 text-[22px]'>Order Details</h1>

                </div>


            </div>

            <div className='w-full flex items-center justify-between pt-6'>
                <h5 className='text-[#000b] text-[17px]'>Order Id : - #<span>{data?._id}</span></h5>

                <h5 className='text-[#000b] text-[17px]'>Placed on :- <span>{data?.createdAt?.slice(0, 10)}</span> </h5>
            </div>
            {/* order items */}
            {
                data && data?.cart.map((item, index) => {
                    return (
                        <div key={index} className='w-full flex items-start mt-5 mb-5'>
                            <img 
                            // src={`${item.images && item.images[1]?.url}`} 
                            src={
                                item.images && item.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                    ? item.images[1].url.replace(
                                        /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                        `${imgdburl}/uploads/images`
                                    )
                                    : `${imgdburl}${item.images[1]?.url}` // Prepend imgdburl if not a Cloudinary URL
                            }
                            alt="" className='w-[160px] h-[160px] border border-gray-200' />
                            <div className="w-full pl-2">
                                <h5 className='pl-3 text-[15px] font-[600]'>{item.name}</h5>
                                <p className='pl-3 text-[12px] text-[#0000008c]'>{item.skuid}</p>

                                <span className="pl-3 text-[12px] text-[#0000008c] line-through">₹{item.chainPrice > 0 ? item.originalPrice + item.chainPrice : item.originalPrice} </span>
                                <span className="pl-2 text-[12px] text-[#0000008c]">₹{item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice} x {item.qty}</span>

                                <div className='mt-2'>
                                {item.showWithChain !== undefined && (
                                    <h5 className='pl-3 text-[13px] text-[#0000008c]'>
                                        <span className='font-[600]'>Chain :</span> {item.showWithChain ? 'With Chain' : 'Without Chain'} {item.selectedChainSize ? (item.selectedChainSize) : ""}
                                    </h5>
                                )}
                                {item.selectedColor !== null && (
                                    <h5 className='pl-3 text-[13px] text-[#0000008c]'>
                                        <span className='font-[600]'>Metal Color :</span> {metalColors[item.selectedColor]}
                                    </h5>
                                )}
                                {item.selectedEnamelColor !== null && (
                                    <h5 className='pl-3 text-[13px] text-[#0000008c]'>
                                        <span className='font-[600]'>Enamel :</span> {item.selectedEnamelColor}
                                    </h5>
                                )}
                            </div>


                            </div>

                            {
                                data?.status === "Delivered" && (
                                    <>
                                        {
                                            item.isReviewed ?
                                                null
                                                :
                                                (
                                                    <div className={`${styles.button} !w-[220px] !px-3 text-[#fff]`} onClick={() => setOpen(true) || setSelectedItem(item)}>
                                                        <VscFeedback className='mr-3' />
                                                        <h5>Write a review</h5>

                                                    </div>
                                                )
                                        }
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }

            {/* review */}
            {
                open && (
                    <div className='w-full fixed top-0 left-0 h-screen bg-[#00000062] z-50 flex items-center justify-center'>
                        <div className='w-[50%] h-min bg-[#fff] shadow rounded-md p-3 pb-7'>
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1 size={30} onClick={() => setOpen(false)} className='cursor-pointer' />
                            </div>
                            <h2 className='text-[25px] font-[500] text-center'>Give a review</h2>

                            <div className='w-full flex mt-3'>
                                <img src={`${selectedItem?.images[0]?.url}`} alt="" className='w-[120px] h-[120px] border' />
                                <div>
                                    <div className='pl-3 text-[20px]'>
                                        <p>{selectedItem?.name}</p>
                                        <p className='text-[15px] text-[#0000008e]'>{selectedItem?.skuid}</p>
                                    </div>
                                    <h4 className='pl-3 text-[15px]'>₹{selectedItem?.discountPrice} x {selectedItem?.qty}</h4>

                                </div>


                            </div>

                            <div>
                                <h5 className='pl-5 text-[20px] font-[500]'>Give a Rating <span className='text-red-500'>*</span></h5>
                                <div className="flex w-full ml-5 pt-1">
                                    {
                                        [1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                            <AiFillStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                        ) : (
                                            <AiOutlineStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                        ))
                                    }

                                </div>

                                <div className='w-full ml-5 mt-2'>
                                    <label htmlFor="" className='block text-[20px] font-[500]'>Write a Comment
                                        <span className='font-[400] text-[16px] text-[#0000006c] ml-2'>(optional)</span>
                                    </label>
                                  
                                    <textarea name="comment" id="" value={comment} onChange={(e) => setComment(e.target.value)} cols={20} rows={5} placeholder='how was your product? write your Review' className='mt-2 !w-[90%]  border p-2 outline-none'></textarea>
                                </div>
                                <div className={`${styles.button} text-white text-[20px] ml-3`} onClick={rating > 1 ? reviewHandler : null}>
                                    Submit
                                </div>
                            </div>


                        </div>
                    </div>
                )
            }
            <div className='border-t w-full text-right mb-5'>
                <h5 className='pt-3 text-[18px]'>Total Price : <strong>₹{data?.totalPrice}</strong> </h5>

            </div>
            <div className="w-full flex justify-between items-center mb-5">
                <div className='w-[50%] '>
                    <h4 className='pt-3 text-[18px] font-[600]'>Shipping Address</h4>
                    <h4 className='pt-3 text-[14px] text-[#000b]'>{data?.shippingAddress?.address1}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.shippingAddress?.address2}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.shippingAddress?.city}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.shippingAddress?.country}</h4>
                    <h4 className='pt-1 text-[14px] font-[500] text-[#000b]'>{data?.shippingAddress?.phoneNumber}</h4>
                </div>
                <div className='w-[50%] '>
                    <h4 className='pt-3 text-[18px] font-[600]'>Billing Address</h4>
                    <h4 className='pt-3 text-[14px] text-[#000b]'>{data?.billingAddress?.address1}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.billingAddress?.address2}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.billingAddress?.city}</h4>
                    <h4 className='pt-1 text-[14px] text-[#000b]'>{data?.billingAddress?.country}</h4>
                    <h4 className='pt-1 text-[14px] font-[500] text-[#000b]'>{data?.billingAddress?.phoneNumber}</h4>
                </div>

            </div>
            <div className="w-[100%] border-t">
                    <h4 className='pt-3 text-[18px] font-[600]'>Payment Information</h4>
                    <h4 className='pt-1 text-[14px] font-[500] text-[#000b]'>Status : {
                        data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"
                    }
                    </h4>
                    <h4 className='pt-1 text-[14px] font-[500] text-[#000b]'>Type : {
                        data?.paymentInfo?.type
                    }
                    </h4>


                   {data?.status === "Delivered" && isReturnWindowOpen(data?.deliveredAt) && (
                    <>
                    
                        <button onClick={() => setConfirmModalOpen(true)} className={`${styles.button} text-[#fff] flex items-center mt-3`}>
                            <TbTruckReturn className='mr-2' /> Return Order
                        </button>

                        {confirmModalOpen && (
                            <div className='w-full fixed top-0 left-0 h-screen bg-[#00000062] z-50 flex items-center justify-center'>
                                <div className='w-[50%] h-min bg-[#fff] shadow rounded-md p-5 pb-9 !pt-4'>
                                    <div className='w-full flex justify-end p-3'>
                                        <RxCross1 size={25} onClick={() => setConfirmModalOpen(false)} className='cursor-pointer' />
                                    </div>
                                    <h2 className='text-[23px] font-[500] text-center'>Are you sure you want to return this order?</h2>
                                    <div className='flex justify-center mt-5'>
                                        <button onClick={handleConfirmReturn} className={`w-[100px] bg-black text-white h-[40px] rounded-md mr-3`}>
                                            Yes
                                        </button>
                                        <button onClick={() => setConfirmModalOpen(false)} className={`w-[100px] bg-gray-300 text-black h-[40px] rounded-md`}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </>
                    )}

                </div>



 {/* Refund Reason Modal */}
 {refundModalOpen && (
                <div className='w-full fixed top-0 left-0 h-screen bg-[#00000062] z-50 flex items-center justify-center'>
                    <div className='w-[50%] h-min bg-[#fff] shadow rounded-md p-3 pb-7'>
                        <div className='w-full flex justify-end '>
                            <RxCross1 size={24} onClick={() => {
                                setRefundModalOpen(false)
                                setRefundReason("")
                                setError('')
                            }} className='cursor-pointer' />
                        </div>
                        <h2 className='text-[22px] font-[500] text-center'>Select a Reason for Refund</h2>
                        <div className='flex flex-col mt-3 px-5'>
                            {refundReasons.map((reason, index) => (
                                <div key={index} className='flex items-center py-[2px]'>
                                    <input
                                        type="radio"
                                        id={`reason-${index}`}
                                        value={reason}
                                        checked={refundReason === reason}
                                        onChange={() => handleReasonChange(reason)}
                                        className='mr-2'
                                    />
                                    <label htmlFor={`reason-${index}`} className='text-[14px] cursor-pointer'>
                                        {reason}
                                    </label>
                                </div>
                            ))}
                             {/* Conditionally render the textarea when "Other" is selected */}
                            {refundReason === "Other" && (
                                <textarea
                                    className='mt-3 p-2 border border-gray-300 rounded text-[14px]'
                                    placeholder="Please provide your reason"
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                />
                            )}
                        </div>
                         {/* Error Message */}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className='flex justify-center mt-5'>
                            <button onClick={refundhandler} className={`w-[200px] bg-black text-white h-[40px] rounded-md`}>
                                Request Refund
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}


export default UserOrderDetails


