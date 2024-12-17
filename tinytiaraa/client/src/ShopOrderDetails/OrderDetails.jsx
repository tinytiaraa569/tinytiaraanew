// import { getAllOrdersOfShop } from '@/redux/actions/order'
// import styles from '@/Styles/styles'
// import React, { useEffect, useState } from 'react'
// import { BsFillBagFill } from 'react-icons/bs'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { CiViewList } from "react-icons/ci";
// import { backend_url, server } from '@/server'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
// import tinylogo from './tinylogo.png'

// function OrderDetails() {
//     const { orders, isLoading } = useSelector((state) => state.order)
//     const { seller } = useSelector((state) => state.seller)

//     console.log(orders, "see ")

//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [status, setStatus] = useState("")
//     const { id } = useParams()

//     useEffect(() => {
//         dispatch(getAllOrdersOfShop(seller._id))
//     }, [dispatch])

//     const data = orders && orders.find((item) => item._id === id)
//     console.log(data,"data of orders")




//     const orderUpdateHandler = async (e) => {
//         e.preventDefault()

//         await axios.put(`${server}/order/update-order-status/${id}`, {
//             status
//         }, { withCredentials: true }).then((res) => {
//             toast.success("Order Updated")
//             navigate("/dashboard-orders")

//         }).catch((error) => {
//             console.log(error)
//             toast.error(error.response.data.message)

//         })


//     }

//     const refundOrderUpdateHandler = async (e) => {
//         e.preventDefault()

//         await axios.put(`${server}/order/order-refund-success/${id}`, {
//             status
//         }, { withCredentials: true }).then((res) => {
//             toast.success("Order Updated")
//             dispatch(getAllOrdersOfShop(seller._id))


//         }).catch((error) => {
//             console.log(error)
//             toast.error(error.response.data.message)

//         })


//     }

//     const metalColors = {
//         0: "Yellow Gold",
//         1: "Rose Gold",
//         2: "White Gold",
//     };


//     return (
//         <div className={`py-4 min-h-screen ${styles.section}`}>
//             <div className='w-full flex items-center justify-between'>
//                 <div className='flex items-center'>
//                     <BsFillBagFill size={30} color='crimson' />
//                     <h1 className='pl-2 text-[25px]'>Order Details</h1>

//                 </div>
//                 <Link to="/dashboard-orders">
//                     <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
//                         <CiViewList className='mr-2' />
//                         Order List
//                     </div>

//                 </Link>

//             </div>

//             <div className='w-full flex items-center justify-between pt-6'>
//                 <h5 className='text-[#000b]'>Order Id : - #<span>{data?._id}</span></h5>

//                 <h5 className='text-[#000b]'>Placed on :- <span>{data?.createdAt?.slice(0, 10)}</span> </h5>
//             </div>
//             {/* order items */}
//             <div >
//             {
//                 data && data?.cart.map((item, index) => {
//                     return (
//                         <div key={index} className='w-full px-3 py-4 flex items-start mt-5 mb-5 border border-[#ddd]'>
//                             <img src={`${item.images[0].url}`} alt="" className='w-[280px] h-[280px]' />


//                             <div className="w-full">
//                                 <h5 className='pl-3 text-[20px]'>{item.name}</h5>
//                                 <h5 className='pl-3 text-[14px]  text-[#0000008c]'>{item.skuid} </h5>
//                                 <h5 className='pl-3 text-[14px] mt-2 text-[#0000008c]'><span className='font-[600]'>Category :</span> {item.category}</h5>
//                                 <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>subcategory :</span> {item.subcategory}</h5>
//                                 <h5 className='pl-3 text-[14px] mt-2 text-[#0000008c]'><span className='font-[600]'>Quantity :</span> {item.qty}</h5>


//                                 <div className='mt-2'>
//                                     {item.showWithChain !== undefined && (
//                                         <h5 className='pl-3 text-[14px] text-[#0000008c]'>
//                                             <span className='font-[600]'>Chain :</span> {item.showWithChain ? 'With Chain' : 'Without Chain'} ({item.selectedChainSize})
//                                         </h5>
//                                     )}

//                                     {item.selectedColor !== null && (
//                                         <h5 className='pl-3 text-[14px] text-[#0000008c]'>
//                                             <span className='font-[600]'>Metal Color :</span> {metalColors[item.selectedColor]}
//                                         </h5>
//                                     )}

//                                     {item.selectedEnamelColor !== null && (
//                                         <h5 className='pl-3 text-[14px] text-[#0000008c]'>
//                                             <span className='font-[600]'>Enamel :</span> {item.selectedEnamelColor}
//                                         </h5>
//                                     ) }
//                                 </div>
//                                 <div className='mt-3'>
//                                     <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Weight </span></h5>
//                                     <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Gold :</span>{item.goldWeight ? item.goldWeight.weight : "not Updated"}</h5>
//                                     <h5 className='pl-3 text-[14px] text-[#0000008c]'><span className='font-[600]'>Diamond :</span>{item.diamondWeight ? item.diamondWeight.weight : "Not upfded"}</h5>



//                                 </div>




//                                 <h5 className='pl-3 text-[16px] mt-2 text-[#0000008c]'>₹{item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice} x {item.qty}</h5>

//                             </div>
//                         </div>
//                     )
//                 })
//             }
//             </div>

            
//             <div className='border-t w-full text-right mb-5'>
//                 <h5 className='pt-3 text-[18px]'>Total Price : <strong>₹{data?.totalPrice}</strong> </h5>

//             </div>
//             <div className="w-full flex justify-between items-center">
//                 <div className='w-[60%] '>
//                     <h4 className='pt-3 text-[20px] font-[600]'>Shipping Address</h4>
//                     <h4 className='pt-3 text-[18px] text-[#000b]'>{data?.shippingAddress.name}</h4>
//                     <h4 className='pt-3 text-[18px] text-[#000b]'>{data?.shippingAddress.address1}</h4>
//                     <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.address2}</h4>
//                     <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.city}</h4>
//                     <h4 className='pt-1 text-[18px] text-[#000b]'>{data?.shippingAddress.country}</h4>
//                     <h4 className='pt-1 text-[18px] font-[500] text-[#000b]'>{data?.shippingAddress?.phoneNumber}</h4>
//                 </div>

//                 <div className="w-[30%]">
//                     <h4 className='pt-3 text-[20px]'>Payment Information</h4>
//                     <h4>Status : {
//                         data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"

//                     }
//                     </h4>
//                     <h4>Type : {
//                         data?.paymentInfo?.type
//                     }
//                     </h4>
//                 </div>

//             </div>

//             <div className='w-full mt-5'>
//                 <h4 className='pt-3 text-[20px] font-[600]'>Order Status :</h4>
//                 {
//                     data?.status !== "Processing Refund" && data?.status !== "refund Success" && (
//                         <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'>
//                             {
//                                 [
//                                     "Confirmed",
//                                     "Processing",
//                                     "Shipping",
//                                     "Received",
//                                     "On the way",
//                                     "Delivered"
//                                 ].slice(
//                                     [
//                                         "Confirmed",
//                                         "Processing",
//                                         "Shipping",
//                                         "Received",
//                                         "On the way",
//                                         "Delivered"
//                                     ].indexOf(data?.status)
//                                 ).map((option, index) => (
//                                     <option value={option} key={index}>{option}</option>
//                                 ))
//                             }
//                         </select>
//                     )
//                 }
//                 {
//                     data?.status === "Processing Refund" || data?.status === "refund Success" ?
//                         (
//                             <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'>
//                                 {
//                                     [
//                                         "Processing Refund",
//                                         "refund Success",

//                                     ].slice(
//                                         [
//                                             "Processing Refund",
//                                             "refund Success"
//                                         ].indexOf(data?.status)
//                                     ).map((option, index) => (
//                                         <option value={option} key={index}>{option}</option>
//                                     ))
//                                 }

//                             </select>
//                         ) :
//                         null
//                 }

//                 <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
//                     onClick={data?.status !== "Processing Refund" ? orderUpdateHandler : refundOrderUpdateHandler}>
//                     Update Status

//                 </div>

//             </div>


//         </div>
//     )
// }

// export default OrderDetails



import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'
import { CiViewList } from "react-icons/ci"
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from '@/Styles/styles'
import { getAllOrdersOfShop } from '@/redux/actions/order'
import { imgdburl, server } from '@/server'
import { FaFileInvoice } from 'react-icons/fa'

function OrderDetails() {
    const { orders } = useSelector((state) => state.order)
    const { seller } = useSelector((state) => state.seller)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [status, setStatus] = useState("")
    const [docketNumber, setDocketNumber] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const data = orders && orders.find((item) => item._id === id)
    console.log(data,"data in shop order")

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
    }, [dispatch])
    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
      };

    const orderUpdateHandler = async (e) => {
        e.preventDefault()
        if (status === "Shipping" && !docketNumber) {
            // Check if docket number is entered
            return toast.error("Please enter the docket number")
        }
        await axios.put(`${server}/order/update-order-status/${id}`, { status, docketNumber }, { withCredentials: true })
            .then((res) => {
                toast.success("Order Updated")
                navigate("/dashboard-orders")
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    }

             const refundOrderUpdateHandler = async (e) => {
             e.preventDefault()

             await axios.put(`${server}/order/order-refund-success/${id}`, {
                 status
             }, { withCredentials: true }).then((res) => {
                 toast.success("Order Updated")
                 dispatch(getAllOrdersOfShop(seller._id))
                 navigate("/dashboard-orders")
                 window.location.reload()


             }).catch((error) => {
                 console.log(error)
                 toast.error(error.response.data.message)

             })


         }

         const cancelOrderHandler = async () => {
            try {
              await axios
                .put(`${server}/order/cancel-order/${id}`, { status: 'Canceled' }, { withCredentials: true })
                .then((res) => {
                  toast.success('Order Canceled');
                  dispatch(getAllOrdersOfShop(seller._id));
                  navigate('/dashboard-orders');
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message);
                });
            } catch (error) {
              console.log(error);
              toast.error('Failed to cancel the order');
            }
          };

    const viewPDFHandler = () => {
        if (data && data.invoice) {
            const byteCharacters = atob(data.invoice); // Decode the Base64 string
            const byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteNumbers], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url); // Open PDF in new tab
        } else {
            toast.error("No invoice available.");
        }
    };

    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center'>
                    <BsFillBagFill size={30} color='crimson' />
                    <h1 className='pl-2 text-[25px]'>Order Details</h1>
                </div>
                <Link to="/dashboard-orders">
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                        <CiViewList className='mr-2' />
                        Order List
                    </div>
                </Link>
            </div>

            <div className='w-full flex items-center justify-between pt-6'>
                <div>
                <h5 className='text-[#000b]'>Order Id : - #<span>{data?._id}</span></h5>
                <h3 
                    className={`inline-block px-3 py-1 rounded-lg text-white ${
                        data?.status === 'Delivered' ? 'bg-green-500' :
                        data?.status === 'Cancelled' ? 'bg-red-500' :
                        data?.status === 'Shipping' ? 'bg-yellow-500' :

                        
                        'bg-gray-500'
                    }`}>
                    Order status: {data?.status}
                    </h3>

                </div>
                <h5 className='text-[#000b]'>Placed on :- <span>{data?.createdAt?.slice(0, 10)}</span> </h5>
            </div>

            <div className='flex justify-end mt-2'>
            <button onClick={viewPDFHandler} className='bg-black text-white px-4 py-2 rounded flex items-center'>
            <FaFileInvoice className='mr-2'/>
                View PDF Invoice
            </button>


            </div>
           
            {/* Order Items */}
            <div>
            {data && data?.cart.map((item, index) => (
                <div key={index} className='w-full px-4 py-5 flex items-start mt-5 mb-5 border border-[#ddd] rounded-lg shadow-sm'>
             <img 
            // src={`${item.images[0].url}`}
                src={
                item.images && item.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                    ? item.images[0].url.replace(
                        /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                        `${imgdburl}/uploads/images`
                    )
                    : `${imgdburl}${item.images[0]?.url}` // Prepend imgdburl if not a Cloudinary URL
             }
             alt="" className='w-[280px] h-[280px] rounded-md object-cover' />
            <div className="w-full ml-4">
                <h5 className='text-lg font-semibold'>{item.name}</h5>
                <h5 className='text-sm text-[#0000008c]'>{item.skuid}</h5>
                <h5 className='text-sm mt-1 text-[#0000008c]'><span className='font-bold'>Category:</span> {item.category}</h5>
                <h5 className='text-sm text-[#0000008c]'><span className='font-bold'>Subcategory:</span> {item.subcategory}</h5>
                <h5 className='text-sm mt-1 text-[#0000008c]'><span className='font-bold'>Quantity:</span> {item.qty}</h5>

                <div className='mt-2'>
                    {item.showWithChain !== undefined && (
                        <h5 className='text-sm text-[#0000008c]'>
                            <span className='font-bold'>Chain:</span> {item.showWithChain ? 'With Chain' : 'Without Chain'} {item.showWithChain ?  (`(${item.selectedChainSize})`) : ''}
                            
                        </h5>
                    )}
                    {item.selectedColor !== null && (
                        <h5 className='text-sm text-[#0000008c]'>
                            <span className='font-bold'>Metal Color:</span> {metalColors[item.selectedColor]}
                        </h5>
                    )}
                    {item.selectedEnamelColor !== null && (
                        <h5 className='text-sm text-[#0000008c]'>
                            <span className='font-bold'>Enamel:</span> {item.selectedEnamelColor}
                        </h5>
                    )}
                </div>
                <div className='mt-3'>
                    <h5 className='text-sm text-[#0000008c]'><span className='font-bold'>Weight:</span></h5>
                    <h5 className='text-sm text-[#0000008c]'><span className='font-bold'>Gold:</span> {item.goldWeight ? item.goldWeight.weight : "Not Updated"}</h5>
                    <h5 className='text-sm text-[#0000008c]'><span className='font-bold'>Diamond:</span> {item.diamondWeight ? item.diamondWeight.weight : "Not Updated"}</h5>
                </div>
                <h5 className='text-lg mt-2 text-[#0000008c]'>₹{item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice} x {item.qty}</h5>
            </div>
        </div>
    ))}
</div>


            <div className='border-t w-full text-right mb-5'>
                <h5 className='pt-3 text-[15px]'>Coupon Discount :- <strong>{data?.couponDiscount ? `₹ ${data?.couponDiscount}`  : "No Coupon Applied" }</strong></h5>
                <h5 className='pt-3 text-[18px]'>Total Price : <strong>₹{data?.totalPrice}</strong> </h5>

            </div>

            <div className="w-full flex justify-between items-center mb-5">
                <div className='w-[50%] '>
                    <h4 className='pt-3 text-[20px] font-[600]'>Shipping Address</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>{data?.shippingAddress.name}</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>{data?.shippingAddress.address1}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.shippingAddress.address2}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.shippingAddress.city}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.shippingAddress.country}</h4>
                    <h4 className='pt-1 text-[15px] font-[500] text-[#000b]'>{data?.shippingAddress?.email}</h4>

                    <h4 className='pt-1 text-[15px] font-[500] text-[#000b]'>{data?.shippingAddress?.phoneNumber}</h4>
                </div>
                <div className='w-[50%] '>
                    <h4 className='pt-3 text-[20px] font-[600]'>Billing Address</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>{data?.billingAddress?.name}</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>{data?.billingAddress?.address1}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.billingAddress?.address2}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.billingAddress?.city}</h4>
                    <h4 className='pt-1 text-[15px] text-[#000b]'>{data?.billingAddress?.country}</h4>
                    <h4 className='pt-1 text-[15px] font-[500] text-[#000b]'>{data?.billingAddress?.email}</h4>

                    <h4 className='pt-1 text-[15px] font-[500] text-[#000b]'>{data?.billingAddress?.phoneNumber}</h4>
                </div>
                
            </div>
            <div className="w-[100%] border-t">
                    <h4 className='pt-3 text-[20px] font-[600]'>Payment Information</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>Status : {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                    <h4 className='pt-3 text-[15px] text-[#000b]'>Type : {data?.paymentInfo?.type}</h4>
                </div>

            <div className='w-full mt-5 border-t'>
                <h4 className='pt-3 text-[20px] font-[600]'>Order Status :</h4>
                {data?.status !== 'Cancelled' && (
        <>
           {
                     data?.status !== "Processing Refund" && data?.status !== "refund Success" && (
                        <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value)
                        if (e.target.value !== "Shipping") {
                            setDocketNumber("")
                        }
                    }}
                    className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'
                >
                    {
                        [
                            "Confirmed",
                            "Processing",
                            "Shipping",
                            "Received",
                            "On the way",
                            "Delivered"
                        ].slice(
                            [
                                "Confirmed",
                                "Processing",
                                "Shipping",
                                "Received",
                                "On the way",
                                "Delivered"
                            ].indexOf(data?.status)
                        ).map((option, index) => (
                            <option value={option} key={index}>{option}</option>
                        ))
                    }
                </select>

                     )
                    }

                {/* Conditional Docket Number Input */}
                {status === "Shipping" && (
                    <div className='mt-4'>
                        <h4 className='text-[18px] font-[600]'>Enter Docket Number:</h4>
                        <input
                            type="text"
                            value={docketNumber}
                            onChange={(e) => setDocketNumber(e.target.value)}
                            className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'
                            placeholder='Enter docket number'
                        />
                    </div>
                )}

                {
                     data?.status === "Processing Refund" || data?.status === "refund Success" ?
                         (
                             <select name="" id="" value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-[200px] border h-[35px] mt-2 rounded-[5px] pl-2'>
                                 {
                                     [
                                         "Processing Refund",
                                         "refund Success",

                                     ].slice(
                                         [
                                             "Processing Refund",
                                             "refund Success"
                                         ].indexOf(data?.status)
                                     ).map((option, index) => (
                                         <option value={option} key={index}>{option}</option>
                                     ))
                                 }

                             </select>
                         ) :
                         null
                 }
                 <div className='flex '>

                <button
                     onClick={data?.status !== "Processing Refund" ? orderUpdateHandler : refundOrderUpdateHandler}
                    className={`${styles.button} text-white mt-5`}
                >
                    <span>

                    Update Order
                    </span>
                </button>
                 {/* Cancel Order Button */}
                    {data?.status !== 'Cancelled' && (
                        <button onClick={cancelOrderHandler} className={`${styles.button} text-white mt-5 bg-red-500 ml-4`}>
                        Cancel Order
                        </button>
                    )}
                 </div>


                 </>
                )}
             
            </div>
            {data?.status === 'Cancelled' && (
        <div className='text-red-500 mt-5'>
          <strong>Order has been Cancelled.</strong> No further actions can be performed.
        </div>
      )}
        </div>
    )
}

export default OrderDetails
