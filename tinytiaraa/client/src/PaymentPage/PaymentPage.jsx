import React, { useEffect, useState } from 'react'
import razopayimg from './images/razorpay-icon.svg'
import payuimg from './images/PayU.svg'
import { backend_url, imgdburl, server } from '@/server';
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { placeOrder } from '@/redux/actions/order';

function PaymentPage() {
    const [orderData, setOrderData] = useState([])
    const [orderID, setOrderID] = useState(null)
    const [fullCountryName, setFullCountryName] = useState('');
    const [fullStateName, setFullStateName] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state) => state.user)
    const { currency, conversionRates } = useSelector((state) => state.currency); // Accessing currency and conversion rates

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const getReferralCode = () => {
        const referralCode = sessionStorage.getItem('referralCode');
        console.log('Retrieved referral code:', referralCode); // Debugging line
        return referralCode;
    };

    useEffect(() => {
        if (orderData?.shippingAddress?.country) {
            const country = Country.getCountryByCode(orderData.shippingAddress.country);
            setFullCountryName(country?.name || '');
        } else {
            setFullCountryName('');
        }
    }, [orderData?.shippingAddress?.country]);

    useEffect(() => {
        if (orderData?.shippingAddress?.city && orderData?.shippingAddress?.country) {
            const state = State.getStateByCodeAndCountry(orderData.shippingAddress.city, orderData.shippingAddress.country);
            setFullStateName(state?.name || '');
        } else {
            setFullStateName('');
        }
    }, [orderData?.shippingAddress?.city, orderData?.shippingAddress?.country]);
    // console.log(fullCountryName, fullStateName)



    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"))
        setOrderData(orderData)
    }, [])

    console.log(orderData, "from payment page")


    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        billingAddress: orderData?.finalBillingAddress,

        
        user: user && orderData?.user ,
        totalPrice: orderData?.totalPrice,
        couponDiscount: orderData?.discountPrice,
        paymentInfo: {},
        appliedReferral: orderData?.appliedReferral || 0
    }

    console.log(order, "orderdata from paymbt page")



    // function handlepayment() {
    //     let data = {
    //         amount: 5 * 100,
    //         currency: "INR",
    //         receipt: "qwsaq1",
    //     };

    //     fetch("http://localhost:8000/order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     }).then((result) => {
    //         result.json().then((res) => {
    //             setOrderID(res.id)
    //         });
    //     });

    //     var options = {
    //         key: "rzp_test_TKfJulmRsFjGyI", // Enter the Key ID generated from the Dashboard
    //         amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "Ru-brama", //your business name
    //         description: "Test Transaction",
    //         image: "https://example.com/your_logo",
    //         order_id: orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "/success",
    //         prefill: {
    //             //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    //             name: "Gaurav Kumar", //your customer's name
    //             email: "gaurav.kumar@example.com",
    //             contact: "9000090000", //Provide the customer's phone number for better conversion rates
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    //     var rzp1 = new Razorpay(options);
    //     rzp1.open();

    //     rzp1.on("payment.success", function (e) {
    //         e.preventDefault();

    //         alert("Order placed successfully! Order ID: " + res.id);

    //         // Dispatch an action to clear the cart upon successful payment
    //     });

    // }

    const handleRazorpayPayment = async () => {
        try {
            // Step 1: Create an order on your backend
            const response = await fetch(`${backend_url}order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: orderData.totalPrice * 100,
                    currency: "INR",
                    receipt: "qwsaq1",
                })
            });
            const data = await response.json();
            setOrderID(data.id);

            // Step 2: Initiate Razorpay payment
            const options = {
                key: "rzp_test_TKfJulmRsFjGyI", // Replace with your Razorpay key
                amount: orderData.totalPrice * 100, // Amount in paisa (INR)
                currency: "INR",
                name: "Tiny Tiaraa", // Your business name
                description: "Test Transaction",
                image: "https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png",
                order_id: data.id, // Order ID obtained from your server
                handler: function (response) {
                    handlePaymentSuccess(response);
                    console.log(response, "check reponse for gateway")
                },
                prefill: {
                    name: orderData?.shippingAddress?.name,
                    email: orderData?.shippingAddress?.email,
                    contact: orderData?.shippingAddress?.phoneNumber,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in handleRazorpayPayment:", error);
            alert("Error occurred while processing payment.");
        }
    };

    // const handlePaymentSuccess = async (paymentDetails) => {
    //     console.log('Payment successful. Details:', paymentDetails);
    //     const updatedOrder = {
    //         ...order,
    //         paymentInfo: {
    //             id: paymentDetails.razorpay_payment_id,
    //             status: 'success',
    //             type: 'Razorpay',
    //         },
    //     };

    //     try {
    //         console.log('Sending updated order to server:', updatedOrder);
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         console.log('Server response:', response.data);

    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         window.location.reload()

    //         // Handle actions upon successful payment
    //         alert(`Payment successful! Payment ID: ${paymentDetails.razorpay_payment_id}`);
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Failed to place order. Please try again.");
    //     }
    //     // You can perform actions like updating database, clearing cart, etc.
    // };

    // const handlecashondel = async (e) => {
    //     e.preventDefault()
    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);


    //     const referralPointsToApply = orderData?.appliedReferral || 0;
    //     // const updatedTotalPrice = orderData?.totalPrice - referralPointsToApply;


    //     try {
    //         const response = await axios.get(`${server}/referral/user-referrals`, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true
    //         });

    //         if (response.data && response.data.referrals) {
    //             setReferrals(response.data.referrals);
    //         } else {
    //             throw new Error('Unexpected response format');
    //         }

    //         toast.success("Referrals fetched successfully");
    //     } catch (err) {
    //         console.error('API Error:', err);
    //         setError(err.message || 'An error occurred while fetching referrals');
    //     } finally {
    //         setLoading(false);
    //     }


    //     const updatedOrder = {
    //         ...order,
    //         referralCode: referralCode,
    //         paymentInfo: {
    //             type: 'Cash on Delivery',
    //         },
    //         referralPointsApplied: referralPointsToApply,
    //         // totalPrice: updatedTotalPrice,


    //     };


    //     console.log(updatedOrder, "order")

    //     try {
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true
    //         });
    //         console.log('Server response:', response.data);
    //         console.log('Server response:', response.data._id);



    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));

    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         // window.location.reload()

    //         // Handle actions upon successful payment

    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data.message);
    //     }

    // }




    // const handlecashondel = async (e) => {
    //     e.preventDefault();

    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);

    //     const referralPointsToApply = orderData?.appliedReferral || 0;

    //     try {
    //         // Fetch user referrals only if the referralCode is provided
    //         if (referralCode) {
    //             const referralResponse = await axios.get(`${server}/referral/user-referrals`, {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //                 // ,
    //                 // withCredentials: true
    //             });

    //             if (referralResponse.data && referralResponse.data.referrals) {
    //                 const referrals = referralResponse.data.referrals;
    //                 const referral = referrals.find(r => r.referralCode === referralCode);

    //                 if (!referral) {
    //                     throw new Error('Referral code not valid or not found in user referrals');
    //                 }

    //                 // Fetch user referral balance
    //                 const userResponse = await axios.get(`${server}/referral/referral-balance`, {
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     withCredentials: true
    //                 });

    //                 if (!userResponse.data || userResponse.data.success === false) {
    //                     throw new Error('User data not found');
    //                 }

    //                 const userId = userResponse.data.userId;
    //                 const userBalance = userResponse.data.referralBalance || 0;

    //                 if (userBalance < referralPointsToApply) {
    //                     throw new Error('Insufficient referral balance');
    //                 }

    //                 // Proceed with creating the order
    //                 const updatedOrder = {
    //                     ...order,
    //                     referralCode: referralCode,
    //                     paymentInfo: {
    //                         type: 'Cash on Delivery',
    //                     },
    //                     referralPointsApplied: referralPointsToApply,
    //                 };

    //                 console.log('Updated Order:', updatedOrder);

    //                 try {
    //                     const orderResponse = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         }
    //                     });

    //                     console.log('Order Creation Response:', orderResponse.data);

    //                     // Deduct referral points after successful order creation
    //                     const deductionResponse = await axios.post(`${server}/referral/deduct-points`, {
    //                         userId: userId, // Pass the userId here
    //                         points: referralPointsToApply
    //                     }, {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                         withCredentials: true
    //                     });

    //                     console.log('Deduction Response:', deductionResponse.data);

    //                     toast.success("Order Successfully Placed");
    //                     localStorage.setItem("cartItems", JSON.stringify([]));
    //                     localStorage.setItem("latestOrder", JSON.stringify([]));
    //                     localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //                     navigate("/order/success");
    //                     window.location.reload()

    //                 } catch (error) {
    //                     console.error('Order creation or deduction error:', error);
    //                     toast.error(error.response?.data?.message || 'An error occurred while processing your request');
    //                 }
    //             } else {
    //                 throw new Error('Referrals data not found');
    //             }
    //         } else {
    //             // Handle order creation for a referred user without referral validation
    //             const updatedOrder = {
    //                 ...order,
    //                 paymentInfo: {
    //                     type: 'Cash on Delivery',
    //                 },
    //                 referralPointsApplied: 0, // No referral points applied
    //             };

    //             try {
    //                 const orderResponse = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     }
    //                 });

    //                 console.log('Order Creation Response:', orderResponse.data);

    //                 toast.success("Order Successfully Placed");
    //                 localStorage.setItem("cartItems", JSON.stringify([]));
    //                 localStorage.setItem("latestOrder", JSON.stringify([]));
    //                 localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //                 navigate("/order/success");
    //                  window.location.reload()


    //             } catch (error) {
    //                 console.error('Order creation error:', error);
    //                 toast.error(error.response?.data?.message || 'An error occurred while processing your request');
    //             }
    //         }
    //     } catch (err) {
    //         console.error('API Error:', err);
    //         toast.error(err.message || 'An error occurred while checking referral code');
    //     }
    // };


    // const handlecashondel = async (e) => {
    //     e.preventDefault();
    //     const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
    //     console.log('Captured referral code:', referralCode);

    //     const latestOrderData = localStorage.getItem("latestOrder");

    //     if (!latestOrderData) {
    //         console.error("No latest order data found.");
    //         return;
    //     }
    //     const latestOrder = JSON.parse(latestOrderData);
    //     const referralBalanceUsed = latestOrder.appliedReferral || 0;
    //     const user = latestOrder.user;
    //     // const latestOrder = JSON.parse(latestOrderData);
    //     // const referralBalanceUsed = latestOrder.appliedReferral;
    //     // const currentReferralBalance = latestOrder.user.referralBalance;
    //     // const updatedReferralBalance = currentReferralBalance - referralBalanceUsed;

    //     const updatedOrder = {
    //         ...order,
    //         referralCode: referralCode,
    //         paymentInfo: {
    //             type: 'Cash on Delivery',
    //         }
    //     };

    //     console.log(updatedOrder, "order");

    //     try {
    //         const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         console.log('Server response:', response.data);
    //         console.log('Server response:', response.data._id);
    //         // Update the backend with the new referral balance

    //         if (referralBalanceUsed > 0 && user) {
    //             // Deduct referral balance if applied
    //             const currentReferralBalance = user.referralBalance || 0;
    //             const updatedReferralBalance = currentReferralBalance - referralBalanceUsed;

    //             // Update the backend with the new referral balance
    //             await updateReferralBalanceInBackend(user._id, updatedReferralBalance);

    //             // Update the user object with the new referral balance
    //             user.referralBalance = updatedReferralBalance;
    //         }




    //         // await updateReferralBalanceInBackend(latestOrder.user._id, updatedReferralBalance);

    //         // // Update the user object with the new referral balance
    //         // latestOrder.user.referralBalance = updatedReferralBalance;

    //         toast.success("Order Successfully Placed");
    //         localStorage.setItem("cartItems", JSON.stringify([]));
    //         localStorage.setItem("latestOrder", JSON.stringify([]));
    //         localStorage.setItem("orderDetails", JSON.stringify(updatedOrder));
    //         navigate("/order/success");
    //         // window.location.reload();

    //         // Handle actions upon successful payment
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message);
    //     }
    // };

    const handlePaymentSuccess = async (paymentDetails) => {
        console.log('Payment successful. Details:', paymentDetails);

        // Retrieve referral code from session storage
        const referralCode = sessionStorage.getItem('referralCode');
        console.log('Captured referral code:', referralCode);

        const latestOrderData = localStorage.getItem("latestOrder");

        if (!latestOrderData) {
            console.error("No latest order data found.");
            return;
        }

        const latestOrder = JSON.parse(latestOrderData);
        const referralBalanceUsed = latestOrder.appliedReferral || 0;
        const user = latestOrder.user;

        // Define the updatedOrder object
        const updatedOrder = {
            ...order,
            paymentInfo: {
                id: paymentDetails.razorpay_payment_id,
                status: 'success',
                type: 'Razorpay',
            },
            referralCode: referralCode,
        };

        try {
            // Send updated order to server
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Server response:', response.data);
            const orderId = response.data.order._id;
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

            // Clear local storage and navigate to success page
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify({ ...updatedOrder, orderId }));
            navigate("/order/success");
            window.location.reload();

            // Provide feedback to the user
            toast.success("Order Successfully Placed");
            // alert(`Payment successful! Payment ID: ${paymentDetails.razorpay_payment_id}`);

            // Optional: Reload the page if needed

        } catch (error) {
            console.log(error);
            toast.error("Failed to place order. Please try again.");
            // Optionally, navigate back to the checkout page or show additional error details
        }
    };



    // const handlePayUPayment = async () => {
    //     try {
    //         // Fetch payment details from your backend
    //         const response = await fetch(`${backend_url}payu-order`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 amount: orderData.totalPrice,
    //                 currency: 'INR',
    //                 email: orderData?.shippingAddress?.email,
    //                 name: orderData?.shippingAddress?.name,
    //                 phone: orderData?.shippingAddress?.phoneNumber,
    //             }),
    //         });
    //         const data = await response.json();

    //         // Initialize PayU SDK with payment options
    //         window.PayUCheckout.configure({
    //             key: 'XA5XsM', // PayU Merchant Key
    //             txnid: data.txnid,
    //             amount: data.amount,
    //             productinfo: 'Test Product',
    //             firstname: data.firstname,
    //             email: data.email,
    //             phone: data.phone,
    //             udf1: data.udf1,
    //             udf2: data.udf2,
    //             udf3: data.udf3,
    //             udf4: data.udf4,
    //             udf5: data.udf5,
    //             hash: data.hash,
    //             surl: data.surl, // Success URL
    //             furl: data.furl, // Failure URL
    //             mode: 'live', // Use 'test' for testing purposes
    //         });

    //         // Open PayU payment modal
    //         window.PayUCheckout.open();
    //     } catch (error) {
    //         console.error('Error in handlePayUPayment:', error);
    //         toast.error('Error occurred while processing PayU payment.');
    //     }
    // };




    const handlecashondel = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const referralCode = sessionStorage.getItem('referralCode'); // Retrieve the referral code from session storage
        console.log('Captured referral code:', referralCode);

        const latestOrderData = localStorage.getItem("latestOrder");

        if (!latestOrderData) {
            console.error("No latest order data found.");
            return;
        }

        const latestOrder = JSON.parse(latestOrderData);
        const referralBalanceUsed = latestOrder.appliedReferral || 0;
        const user = latestOrder.user ;

        // Define the updatedOrder object
        const updatedOrder = {
            ...order,
            referralCode: referralCode,
            paymentInfo: {
                type: 'Cash on Delivery',
            }
        };

        console.log(updatedOrder, "order in cod");

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
    
    


    //payu success
    const handlePayUSuccess = async (paymentDetails) => {
        console.log('Payment successful via PayU. Details:', paymentDetails);

        // Retrieve referral code from session storage
        const referralCode = sessionStorage.getItem('referralCode');
        console.log('Captured referral code:', referralCode);

        const latestOrderData = localStorage.getItem("latestOrder");

        if (!latestOrderData) {
            console.error("No latest order data found.");
            return;
        }

        const latestOrder = JSON.parse(latestOrderData);
        const referralBalanceUsed = latestOrder.appliedReferral || 0;
        const user = latestOrder.user;

        // Check if the order has already been placed using this txnid
        if (latestOrder.paymentInfo?.id === paymentDetails.txnid) {
            console.log("Order with this txnid has already been placed.");
            return;
        }

        // Define the updatedOrder object
        const updatedOrder = {
            ...latestOrder,
            paymentInfo: {
                id: paymentDetails.txnid, // Use PayU's txnid
                status: paymentDetails.status, // PayU payment status
                type: 'PayU', // Payment method
            },
            referralCode: referralCode,
        };

        try {
            // Send updated order to server
            const response = await axios.post(`${server}/order/create-order`, updatedOrder, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Server response:', response.data);
            const orderId = response.data.order._id;
            console.log('Order ID:', orderId);

            if (referralBalanceUsed > 0 && user) {
                // Deduct referral balance if applied
                const currentReferralBalance = user.referralBalance || 0;

                let updatedReferralBalance;
                if (currentReferralBalance < referralBalanceUsed) {
                    updatedReferralBalance = 0;
                    toast.warning(`Referral balance used: ${currentReferralBalance}. Remaining balance is zero.`);
                } else {
                    updatedReferralBalance = currentReferralBalance - referralBalanceUsed;
                }

                // Update the backend with the new referral balance
                await updateReferralBalanceInBackend(user._id, updatedReferralBalance);

                // Update the user object with the new referral balance
                user.referralBalance = updatedReferralBalance;
            }

            // Clear local storage and navigate to success page
            localStorage.removeItem("latestOrder");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("orderDetails", JSON.stringify({ ...updatedOrder, orderId }));
            navigate("/order/success");

            // Provide feedback to the user
            toast.success("Order Successfully Placed");
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order. Please try again.");
        }
    };
  
   
    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };
    const [hash, setHash] = useState(null)
    const [transactionId, settransactionId] = useState(null)



    function generateTransactionID() {
        const timestamp = Date.now()
        const randomnum = Math.floor(Math.random() * 1000000);
        const merchantPrefix = "T"
        const transactionID = `${merchantPrefix}${timestamp}${randomnum}`
        return transactionID; // Return the generated transaction ID
    }
    useEffect(() => {
        generateTransactionID()
    }, [])
    console.log(hash, "hash from frontnedn")
    const getHash = async () => {
        try {
            const transactionId = generateTransactionID();
            settransactionId(transactionId);

            const response = await axios.post(`${backend_url}payu/hash`, {
                name: orderData?.shippingAddress.name,
                email: orderData?.shippingAddress.email,
                amount: orderData?.totalPrice,
                transactionId
            });

            setHash(response.data.hash);
        } catch (error) {
            console.error('Error generating hash:', error);
        }
    };

    useEffect(() => {
        if (selectedPaymentMethod === 'payu') {
            getHash();
        }
    }, [selectedPaymentMethod]);

    const generatePayUForm = () => {
        if (!transactionId || !hash) {
            return <p>Loading payment form...</p>; // Optionally show loading indicator
        }

        return (
            <form action='https://secure.payu.in/_payment' method='post' >
                <input type="hidden" name="key" value={"XA5XsM"} />
                <input type="hidden" name="txnid" value={transactionId} />
                <input type="hidden" name="amount" value={orderData?.totalPrice} />
                <input type="hidden" name="productinfo" value="TEST PRODUCT" /> {/* Add product info here */}
                <input type="hidden" name="firstname" value={orderData?.shippingAddress?.name} /> {/* Add first name here */}
                <input type="hidden" name="email" value={orderData?.shippingAddress?.email} />
                <input type="hidden" name="phone" value={orderData?.shippingAddress?.phoneNumber} /> {/* Add phone number here */}
                <input type="hidden" name="surl" value={`${backend_url}payu/success`} />
                <input type="hidden" name="furl" value={`${backend_url}payu/failure`} />
                <input type="hidden" name="udf1" value={"details1"} />
                <input type="hidden" name="udf2" value={"details2"} />
                <input type="hidden" name="udf3" value={"details3"} />
                <input type="hidden" name="udf4" value={"details4"} />
                <input type="hidden" name="udf5" value={"details5"} />
                <input type="hidden" name="hash" value={hash} />
                <div className='button-wrapperdiv'>
                    <input type="submit" value="Pay With PayU" className='payu-button px-[5px] py-[8px]' />

                </div>
            </form>
        );
    };
    
    // code for live 
    // const handlePayUPayment = async () => {
    //     try {
    //         // Generate a unique transaction ID
    //         const transactionId = `txn_${Date.now()}`;
    
    //         // Prepare payment data
    //         const paymentData = {
    //             name: orderData.shippingAddress.name,
    //             email: orderData.shippingAddress.email,
    //             amount: orderData.totalPrice,
    //             transactionId: transactionId,
    //             phone: orderData.shippingAddress.phoneNumber, // Add phone number here
    //         };
    
    //         // Step 1: Request hash from backend
    //         const response = await fetch(`${backend_url}payu/hash`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(paymentData),
    //         });
    
    //         const data = await response.json();
    //         const { hash } = data;
    
    //         // Step 2: Prepare PayU payment options
    //         const payuOptions = {
    //             key: "XA5XsM",
    //             txnid: transactionId,
    //             amount: orderData.totalPrice,
    //             productinfo: "TEST PRODUCT",
    //             firstname: orderData.shippingAddress.name,
    //             email: orderData.shippingAddress.email,
    //             phone: orderData.shippingAddress.phoneNumber, // Include phone number
    //             surl: `https://www.tinytiaraa.com/payu/order/success?txnid=${transactionId}&status=success`, // Success URL
    //             furl: `https://www.tinytiaraa.com/payment`, // Failure URL
    //             udf1: 'details1',
    //             udf2: 'details2',
    //             udf3: 'details3',
    //             udf4: 'details4',
    //             udf5: 'details5',
    //             hash: hash,
    //         };
    
    //         // Redirect to PayU payment gateway
    //         const form = document.createElement('form');
    //         form.setAttribute('method', 'POST');
    //         form.setAttribute('action', 'https://secure.payu.in/_payment'); // Use live URL in production
    
    //         // Add all parameters to the form
    //         Object.keys(payuOptions).forEach(key => {
    //             const hiddenField = document.createElement('input');
    //             hiddenField.setAttribute('type', 'hidden');
    //             hiddenField.setAttribute('name', key);
    //             hiddenField.setAttribute('value', payuOptions[key]);
    //             form.appendChild(hiddenField);
    //         });
    
    //         document.body.appendChild(form);
    //         form.submit(); // Submit the form to PayU
    //     } catch (error) {
    //         console.error("Error in handlePayUPayment:", error);
    //         alert("Error occurred while processing payment.");
    //     }
    // };

    //code for test payu
    // const handlePayUPayment = async () => {
    //     try {
    //         const transactionId = generateTransactionID(); // Use the same transaction ID logic
    
    //         const paymentData = {
    //             name: orderData.shippingAddress.name,
    //             email: orderData.shippingAddress.email,
    //             amount: orderData.totalPrice,
    //             transactionId: transactionId,
    //             phone: orderData.shippingAddress.phoneNumber,
    //         };
    
    //         // Step 1: Request hash from backend
    //         const response = await fetch(`${backend_url}payu/hash`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(paymentData),
    //         });
    
    //         const data = await response.json();
    //         const { hash } = data;
    
    //         const payuOptions = {
    //             key: "XA5XsM",
    //             txnid: transactionId,
    //             amount: orderData.totalPrice,
    //             productinfo: "TEST PRODUCT",
    //             firstname: orderData.shippingAddress.name,
    //             email: orderData.shippingAddress.email,
    //             phone: orderData.shippingAddress.phoneNumber,
    //             surl: `${backend_url}payu/success`,
    //             furl: `${backend_url}payu/failure`,
    //             udf1: 'details1',
    //             udf2: 'details2',
    //             udf3: 'details3',
    //             udf4: 'details4',
    //             udf5: 'details5',
    //             hash: hash,
    //         };
    
    //         // Redirect to PayU payment gateway
    //         const form = document.createElement('form');
    //         form.setAttribute('method', 'POST');
    //         form.setAttribute('action', 'https://secure.payu.in/_payment');
    
    //         Object.keys(payuOptions).forEach(key => {
    //             const hiddenField = document.createElement('input');
    //             hiddenField.setAttribute('type', 'hidden');
    //             hiddenField.setAttribute('name', key);
    //             hiddenField.setAttribute('value', payuOptions[key]);
    //             form.appendChild(hiddenField);
    //         });
    
    //         document.body.appendChild(form);
    //         form.submit();
    //     } catch (error) {
    //         console.error("Error in handlePayUPayment:", error);
    //         alert("Error occurred while processing payment.");
    //     }
    // };

    // Helper function to handle conversion
   
    const encryptAmount = (amount) => {
        const encryptedAmount = CryptoJS.AES.encrypt(amount.toString(), "qwertyuiopasdfghjklzxcvbnm123456").toString();
        return encryptedAmount;
    };
    
    const handlePayUPayment = async () => {
        try {
            const transactionId = generateTransactionID(); // Use your transaction ID logic
    
            // Encrypt the amount before sending
            const encryptedAmount = encryptAmount(orderData.totalPrice);
    
            const paymentData = {
                name: orderData.shippingAddress.name,
                email: orderData.shippingAddress.email,
                amount: encryptedAmount, // Send encrypted amount
                transactionId: transactionId,
                phone: orderData.shippingAddress.phoneNumber,
            };
    
            // Step 1: Request hash from backend
            const response = await fetch(`${backend_url}payu/hash`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            });
    
            const data = await response.json();
            const { hash } = data; // Only use hash from backend response
    
            const payuOptions = {
                key: "XA5XsM", // Your PayU merchant key
                txnid: transactionId,
                amount: orderData?.totalPrice, // Use encrypted amount here
                productinfo: "TEST PRODUCT",
                firstname: orderData.shippingAddress.name,
                email: orderData.shippingAddress.email,
                phone: orderData.shippingAddress.phoneNumber,
                surl: `${backend_url}payu/success`, // Success URL
                furl: `${backend_url}payu/failure`, // Failure URL
                udf1: 'details1',
                udf2: 'details2',
                udf3: 'details3',
                udf4: 'details4',
                udf5: 'details5',
                hash: hash, // Hash generated by backend
            };
    
            // Create a form and submit to PayU payment gateway
            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', 'https://secure.payu.in/_payment');
    
            Object.keys(payuOptions).forEach(key => {
                const hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', payuOptions[key]);
                form.appendChild(hiddenField);
            });
    
            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("Error in handlePayUPayment:", error);
            alert("Error occurred while processing payment.");
        }
    };
   
    const convertPrice = (price) => (price * (conversionRates[currency] || 1)).toFixed(2);

    const gstAmount = (orderData?.subTotalPrice || 0) * 0.03;


    return (
        <div className='w-full bg-[#fafafa;] pb-8'>
             {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
            <div >

                <div className='w-full flex pt-3 mb-7'>


                    <div className='w-[100%]'>
                        <h2 className='text-center text-[20px] font-[600]'>Payment Page</h2>
                    </div>
                </div>


                <div className='checkoutsectionmainlast flex gap-10 justify-center w-full h-auto'>
                    <div className='checkoutleft w-[50%]'>
                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '> Delivery Method</h2>

                            </div>

                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <div>
                                        <label className='text-[14px] font-[500] mb-[4px] tracking-[0.55px] block' for="shipping-method">Standard Delivery - FREE</label>
                                        <span className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block'>(Delivery By {orderData?.shippingAddress?.estimatedDeliveryRange})</span>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Delivery Details</h2>

                            </div>

                            <div className=''>
                                <div className='mb-2'>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.name}</p>
                                    <p className='text-[14px] font-[400] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address1}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.address2}</p>
                                    <p className='text-[14px] font-[400]  tracking-[0.55px] block' for="shipping-method">{fullStateName}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{fullCountryName}</p>

                                </div>
                                <div>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.email}</p>
                                    <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-method">{orderData?.shippingAddress?.phoneNumber}</p>



                                </div>


                            </div>


                        </div>
                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                <div className='mb-[12px]'>
                    <h2 className='text-[16px] font-[600] text-[#161618]'>Billing Details</h2>
                </div>
                <div>
                    <div className='mb-2'>
                        <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.name}</p>
                        <p className='text-[14px] font-[400] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.address1}</p>
                        <p className='text-[14px] font-[400] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.address2}</p>
                        <p className='text-[14px] font-[400] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.city}</p>
                        <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.Country}</p>
                    </div>
                    <div>
                        <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.email}</p>
                        <p className='text-[14px] font-[400] mb-[4px] tracking-[0.55px] block'>{orderData?.finalBillingAddress?.phoneNumber}</p>
                    </div>
                </div>
            </div>


                        <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                            <div className=' mb-[12px]'>
                                <h2 className='text-[16px] font-[600] text-[#161618] '>Select Payment Method</h2>
                            </div>

                            <div className=''>
                                {/* <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="razorpay"
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={selectedPaymentMethod === 'razorpay'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px] cursor-pointer"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="razorpay" className='cursor-pointer'>
                                                <img src={razopayimg} alt="" className='!w-[100px] !h-[60px]' />
                                            </label>
                                        </div>
                                    </div>
                                </div> */}

                                <div className='flex items-center gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="payu"
                                            type="radio"
                                            name="paymentMethod"
                                            value="payu"
                                            checked={selectedPaymentMethod === 'payu'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px] cursor-pointer"
                                        />
                                        <label htmlFor="payu" className='cursor-pointer block ml-[-9px]'>
                                            <img src={payuimg} alt="" className=' !w-[100px] !h-[36px] object-contain ' />

                                        </label>

                                    </div>


                                </div>

                                <div className='flex items-center gap-8 mt-3'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="cod"
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={selectedPaymentMethod === 'cod'}
                                            onChange={handlePaymentMethodChange}
                                            className="int-emailcheck !w-[15px] !h-[15px] cursor-pointer"
                                            required
                                        />
                                        <div>
                                            <label htmlFor="cod" className='cursor-pointer'>
                                                <h2>Cash On Delivery</h2>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className='flex justify-end '>
                            <div className={`button-wrapperdiv`} >
                                {selectedPaymentMethod === 'razorpay' && (
                                    <button onClick={handleRazorpayPayment}>Pay With Razorpay</button>
                                )}

                                {/* {selectedPaymentMethod === 'payu' && generatePayUForm()} */}

                                                    {selectedPaymentMethod === 'payu' && (
                                <button className='cursor-pointer' onClick={handlePayUPayment}>Pay With PayU</button>
                            )}


                                {selectedPaymentMethod === 'cod' && (
                                    <button onClick={handlecashondel}>Cash On Delivery</button>
                                )}

                            </div>
                        </div>



                    </div>
                    <div className='checkoutright pb-10 h-[100%] w-[35%] '>

                        <div>
                            <div >
                                <h3 className='text-[16px] font-[400] tracking-[0.55px] text-[#161618] mb-[12px]'> Order Summary</h3>

                                {
                                    orderData?.cart?.map((val, index) => {
                                        const convertedOriginalPrice = (val.chainPrice > 0 
                                            ? (val.originalPrice + val.chainPrice) * (conversionRates[currency] || 1)
                                            : val.originalPrice * (conversionRates[currency] || 1)).toFixed();
                                    
                                        const convertedDiscountPrice = (val.chainPrice > 0 
                                            ? (val.discountPrice + val.chainPrice) * (conversionRates[currency] || 1)
                                            : val.discountPrice * (conversionRates[currency] || 1)).toFixed();

                                            
                                        return (


                                            <div key={index} className='ordercardsec flex mb-5 shadow-sm'>
                                                <div className="image-section">
                                                    <img 
                                                    // src={`${val?.images[0]?.url}`} 
                                                    src={
                                                        val?.images[0]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                            ? val.images[0].url.replace(
                                                                /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                                `${imgdburl}/uploads/images`
                                                            )
                                                            : `${imgdburl}${val?.images[0]?.url}` // Prepend imgdburl if not a Cloudinary URL
                                                    }
                                                    width="100%" height="100" />
                                                </div>
                                                <div className="detail-section">
                                                    <h3 className='text-[#161618] text-[14px] mb-[5px]'>{val.name}</h3>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[#161618] text-[13px] ">QTY : <span>{val.qty}</span>
                                                        </div>
                                                        {/* <div className="">
                                                            <span className="text-[#6f6f79] text-[13px] line-through">₹{val.chainPrice > 0 ? val.originalPrice + val.chainPrice : val.originalPrice}</span>
                                                            <span className=" text-[13px] pl-2" >₹{val.chainPrice > 0 ? val.discountPrice + val.chainPrice : val.discountPrice}</span>
                                                        </div> */}
                                                        <div className="">
                                                            {/* Original Price with line-through */}
                                                            <span className="text-[#6f6f79] text-[13px] line-through">
                                                                {currency} {convertedOriginalPrice}
                                                            </span>
                                                            
                                                            {/* Discounted Price */}
                                                            <span className="text-[13px] pl-2">
                                                                {currency} {convertedDiscountPrice}
                                                            </span>
                                                        </div>

                                                    </div>
                                                    {val?.showWithChain !== null && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Chain :</span>
                                                            <span className=" text-[#161618]  text-[13px] pl-2" >{val.showWithChain ? 'With Chain' : 'Without Chain'}</span>
                                                        </div>

                                                    )}
                                                    {val?.selectedEnamelColor && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Enamel Color :</span>
                                                            <span className="text-[#161618] text-[13px] pl-2">{val.selectedEnamelColor}</span>
                                                        </div>
                                                    )}
                                                    {val?.selectedColor !== null && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Metal Color :</span>
                                                            <span className=" text-[#161618]  text-[13px] pl-2" >{metalColors[val.selectedColor]}</span>
                                                        </div>

                                                    )}
                                                    {val?.selectedCombination && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Combination Color :</span>
                                                            <span className="text-[#161618] text-[13px] pl-2">{val?.selectedCombination}</span>
                                                        </div>
                                                    )}



                                                </div>


                                            </div>

                                        )
                                    })
                                }



                                {/* //order details */}
                                <div className='!w-[90%]'>

                                    <div className="sub-total mt-2 ">
                                        <span className="label">Subtotal</span>
                                        {/* <span className="value">₹ {orderData?.subTotalPrice}</span> */}
                                        <span className="value">
                                            {currency} {convertPrice(orderData?.subTotalPrice)}
                                        </span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">Coupon Discount:</span>
                                        {/* <span className="value">
                                            {orderData?.discountPrice > 0 ? (
                                                <div className="flex items-center">
                                                    <h5 className="label !text-[16px]">- ₹{orderData?.discountPrice}</h5>
                                                </div>
                                            ) : (
                                                <h5 className="text-[18px] font-[600]">-</h5>
                                            )}
                                        </span> */}
                                         <span className="value">
                                            {orderData?.discountPrice > 0 ? (
                                                <div className="flex items-center">
                                                    <h5 className="label !text-[16px]">- {currency} {convertPrice(orderData?.discountPrice)}</h5>
                                                </div>
                                            ) : (
                                                <h5 className="text-[18px] font-[600]">-</h5>
                                            )}
                                        </span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">
                                            Delivery By <span className="deltext">({orderData?.shippingAddress?.estimatedDeliveryRange})</span>
                                        </span>
                                        <span className="value">Free</span>
                                    </div>

                                    <div className="sub-total  ">
                                        <span className="label">GST (3%):</span>
                                        {/* <span className="value">₹ {orderData?.gstAmount}</span> */}
                                        <span className="value">
                                        {currency} {convertPrice(gstAmount)}
                                        </span>
                                    </div>
                                    <div className='sub-total mt-2 bb '>
                                        <span className="label">Referral Discount</span>
                                        <span className="value">
                                            {
                                                orderData?.appliedReferral > 0 ?
                                                    `- ₹${orderData?.appliedReferral}` :
                                                    `Available: ₹${orderData?.referralBalance?.toFixed(2)}`
                                            }
                                        </span>

                                    </div>

                                    <div className="sub-total sub-totalpp">
                                        <span className="">Order Total </span>
                                        {/* <span className="">₹ {orderData?.totalPrice}</span> */}
                                        <span className="">
                                            {currency} {convertPrice(orderData?.totalPrice)}
                                        </span>
                                    </div>





                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PaymentPage
