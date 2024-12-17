import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backend_url, server } from '@/server';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PayUSuccess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.user)
  const [orderData, setOrderData] = useState([])
  const [orderID, setOrderID] = useState(null)

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"))
    console.log(orderData,"order data in payusuccesspage")
    setOrderData(orderData)
}, [])
console.log(orderData,"order data in payusuccesspage1")

const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    billingAddress: orderData?.finalBillingAddress,

    
    user: orderData?.user,
    totalPrice: orderData?.totalPrice,
    couponDiscount: orderData?.discountPrice,
    paymentInfo: {},
    appliedReferral: orderData?.appliedReferral || 0
}
console.log(order,"data to send along with server")

  useEffect(() => {
    // Get PayU response from the URL's query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const txnId = queryParams.get('txnid');
    const paymentStatus = queryParams.get('status');

    if (paymentStatus === 'success' && txnId) {
        console.log("running payu success function to create order")
      // Call the function to create the order
      createOrder(txnId);
    } else {
      console.error('Payment failed or was canceled.');
      navigate('/payment'); // Redirect to checkout if payment failed
    }
  }, []);
 

  


console.log(user,"user detail in payu page")
console.log(orderData,"from payusuccess page")

 

 

  const createOrder = async (txnId) => {
    setIsLoading(true);
   
    console.log(txnId,"trancatiojn id for payu")
   
    const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    console.log('Captured referral code:', referralCode);

    const latestOrderData = localStorage.getItem("latestOrder");
    console.log(latestOrderData,"latestorder data")

    if (!latestOrderData) {
        console.error("No latest order data found.");
        return;
    }

    const latestOrder = JSON.parse(latestOrderData);

    const { finalBillingAddress,discountPrice , ...restOfOrder } = latestOrder;
    console.log(latestOrder,"lastestorder from payusuccess")
    const referralBalanceUsed = latestOrder.appliedReferral || 0;
    // const currentUser = latestOrder.user || user; // Fallback to Redux user if missing in latestOrder

    // if (!currentUser) {
    //     console.error("User details not found.");
    //     return;
    // }
    console.log(user,"adaysf")

    // Define the updatedOrder object
    const updatedOrder = {
        ...restOfOrder, // Spread the rest of latestOrder
        billingAddress: finalBillingAddress,
        couponDiscount:discountPrice,

        referralCode: referralCode,
        paymentInfo: {
            id: txnId,
            status: 'success',
            type: 'PayU',
        },
        // user: latestOrder?.user,
        
    };

    console.log(updatedOrder, "order in payu check");

    try {
        const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Server response:', response);
        console.log('Server response:', response.data.order._id);

        const orderId = response.data.order._id; // Extract orderId
        console.log('Order ID:', orderId);

        if (referralBalanceUsed > 0 && user) {
            // Deduct referral balance if applied
            const currentReferralBalance = user.referralBalance || 0;

            let updatedReferralBalance;
            if (currentReferralBalance < referralBalanceUsed) {
                // Use all available balance and set it to zero
                updatedReferralBalance = 0;
                toast.warning(`Referral balance used: ${currentReferralBalance}. Remaining balance is zero.`);
            } else {
                // Deduct the used balance from the current balance
                updatedReferralBalance = currentReferralBalance - referralBalanceUsed;
            }

            // Update the backend with the new referral balance
            await updateReferralBalanceInBackend(user._id, updatedReferralBalance);

            // Update the user object with the new referral balance
            user.referralBalance = updatedReferralBalance;
        }

        toast.success("Order Successfully Placed");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        localStorage.setItem("orderDetails", JSON.stringify({ ...updatedOrder, orderId }));
        setIsLoading(false);
        navigate("/order/success");
        window.location.reload()


        // Handle actions upon successful payment
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message);
    }
};
  const updateReferralBalanceInBackend = async (userId, updatedReferralBalance) => {
    try {
        const response = await axios.put(
            `${server}/referral/user/update-referral-balance`,
            {
                userId: userId,
                referralBalance: updatedReferralBalance,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true // This ensures cookies or credentials are sent with the request
            }
        );

        console.log('Referral balance updated on server:', response.data);
    } catch (error) {
        console.error('Error updating referral balance:', error.response?.data?.message || "Failed to update referral balance.");
        toast.error('Failed to update referral balance.');
    }
};
  return (
    <div className='w-full h-[70vh] bg-[#fafafa;] pb-8'>
      {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
      
    </div>
  );
};

export default PayUSuccess;