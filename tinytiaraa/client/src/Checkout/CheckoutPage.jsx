import styles from '@/Styles/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { json, Link, useNavigate } from 'react-router-dom'
import { Country, State } from "country-state-city";
import axios from 'axios';
import { backend_url, imgdburl, server } from '@/server';
import { toast } from 'react-toastify';
import { FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import './checkout.css'
import { BsDash } from 'react-icons/bs';

function CheckoutPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { currency, conversionRates } = useSelector((state) => state.currency); // Accessing currency and conversion rates
    const [userInfo, setUserInfo] = useState(false)
    const [orderData, setOrderData] = useState([])
    console.log(orderData, "see what is in checkout age")

    const navigate = useNavigate()

    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');

    // Effect to update name and email if user changes
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);
    const [phoneNumber, setphoneNumber] = useState('');



    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [gstAmount, setGstAmount] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(null)
    // console.log(discountPrice, "coupoun discount")

    const [isSameAddress, setIsSameAddress] = useState(false); // Checkbox state
    const [billingAddress, setBillingAddress] = useState({
        name: '',
        country: '',
        city: '',
        address1: '',
        address2: '',
        zipCode: '',
        phoneNumber:''
        
    });
    const[personalmsg,setpersonalmsg] =useState("")


    const [referralBalance, setReferralBalance] = useState(0);
    const [appliedReferral, setAppliedReferral] = useState(0);
    const [gstin, setgstin] = useState("");
    const [pandetails, setpandetails] = useState("");



    const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * (item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice), 0)

    // new code 
    const convertedSubTotalPrice = (subTotalPrice * (conversionRates[currency] || 1)).toFixed(2);

    const shipping = "Free Shipping"
    const [error, setError] = useState('');


    const handlePhoneNumberChange = (e) => {
        // Only allow digits and ensure the length does not exceed 10 digits
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        setphoneNumber(value);

        // Clear error if valid length, otherwise set error
        if (value.length < 10) {
            setError('Phone number must be exactly 10 digits.');
        } else {
            setError('');
        }
    };

    // const validatePhoneNumber = () => {
    //     if (phoneNumber.length < 10) {
    //         setError("Phone number must be exactly 10 digits.");
    //         return false;
    //     }
    //     return true;
    // };

    const totalPrice = (subTotalPrice - discountPrice).toFixed(2);
    const convertedTotalPrice = (totalPrice * (conversionRates[currency] || 1)).toFixed(2);


    // useEffect(() => {
    //     const gst = (totalPrice * 3) / 100;
    //     setGstAmount(gst.toFixed(2));
    // }, [totalPrice]);

    useEffect(() => {
        const gst = (convertedTotalPrice * 3) / 100;
        setGstAmount(gst.toFixed(2));
    }, [convertedTotalPrice]);
    const handleCheckboxChangebilling = () => {
        setIsSameAddress(!isSameAddress);
        if (!isSameAddress) {
            setBillingAddress({
                name,
                phoneNumber,
                country,
                city,
                address1,
                address2,
                zipCode
            });
        } else {
            setBillingAddress({
                name:name,
                phoneNumber:phoneNumber,
                country: country,
                city: city,
                address1: address1,
                address2: address2,
                zipCode: zipCode
            });
        }
    };

    const handleCheckboxChange = (index) => {
        if (index === selectedAddressIndex) {
            setSelectedAddressIndex(null);
            setAddress1('');
            setAddress2('');
            setZipCode('');
            setCountry('');
            setCity('');
            setName('')
            setphoneNumber('')
        } else {
            setSelectedAddressIndex(index);
            const address = user.addresses[index];
            setAddress1(address.address1);
            setAddress2(address.address2);
            setZipCode(address.zipCode);
            setCountry(address.country);
            setCity(address.city);
            // setName(address.name)
            setphoneNumber(address.phoneNumber)
        }
    };

    useEffect(() => {
        const fetchedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
        if (fetchedOrderData) {
            setOrderData(fetchedOrderData);
            setDiscountPrice(fetchedOrderData.discountPrice);
            setReferralBalance(fetchedOrderData.referralBalance || 0); // Set referral balance
            setAppliedReferral(fetchedOrderData.appliedReferral || 0); // Set applied referral
            setpersonalmsg(fetchedOrderData.personalmsg)
        }
    }, [])



    const handleback = () => {
        navigate("/cart")
    }

    const handleApplyReferral = () => {
        if (referralBalance > 0 && appliedReferral === 0) {
            const amountToApply = Math.min(referralBalance, subTotalPrice);
            setAppliedReferral(amountToApply);
            setReferralBalance(referralBalance - amountToApply);
            setOrderData((prevOrderData) => ({
                ...prevOrderData,
                appliedReferral: amountToApply,
                referralBalance: referralBalance - amountToApply,
            }));
        } else {
            // toast.error("Referral balance already applied or no balance available.");
        }
    };


    const paymentSubmit = (e) => {
        e.preventDefault()
        

        if (name === "" || email === "" || phoneNumber === "" || address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
            toast.error("Please Fill  Your Delivery Address")

        } else {
            const shippingAddress = {
                email, name, phoneNumber, address1, address2, zipCode, country, city ,estimatedDeliveryRange,pandetails,gstin,personalmsg
            }
            const finalBillingAddress = isSameAddress ? shippingAddress : billingAddress;
            const orderData = {
                cart,
                totalPrice: (subTotalPrice - discountPrice - appliedReferral).toFixed(2),
                
                subTotalPrice, shipping, discountPrice, user, shippingAddress, finalBillingAddress, gstAmount,
                referralBalance,
               
                appliedReferral
            }

            console.log(orderData,"see from checkout page")

            localStorage.setItem("latestOrder", JSON.stringify(orderData))
            navigate("/payment")
        }
    }
    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };
   
    const calculateDateRange = () => {
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);

        // Adding 4 and 5 days respectively
        startDate.setDate(today.getDate() + 4);
        endDate.setDate(today.getDate() + 5);

        // Format dates to "Jul 02" format
        const options = { month: 'short', day: '2-digit' };
        const start = startDate.toLocaleDateString('en-US', options);
        const end = endDate.toLocaleDateString('en-US', options);

        return { start, end };
    };
    const { start, end } = calculateDateRange();



    const [estimatedDelivery, setEstimatedDelivery] = useState("");
    const [estimatedDeliveryRange, setEstimatedDeliveryRange] = useState("Enter your zip code");
    const [isLoading, setIsLoading] = useState(true);
    const originPincode = "400093"; // You can set this dynamically if needed
    const destinationPincode = "400001"; // This can be dynamic, depending on user input
    const pickupDate =  new Date().toISOString().split("T")[0];; // Current date
   const token = "dc1b1181290fc5c34e1f4434f84b033b"


//    useEffect(() => {
   

//     calculateEDD();
// }, [originPincode, destinationPincode, pickupDate]);

const calculateEDD = async () => {
    try {
        const response = await axios.post(
            `${server}/calculateEDD`, // Adjust your server URL here
            {
                origin_pincode: originPincode,
                destination_pincode: zipCode.length === 6 ? zipCode : destinationPincode,
                pickup_date: pickupDate,
            }
        );

        if (response.data.status) {
            const deliveryDateStr = response.data.data.estimated_delivery;
            const deliveryDate = new Date(deliveryDateStr.split("-").reverse().join("-"));

            // Function to format date as "13 Sept"
            const formatDate = (date) => {
                const day = date.getDate();
                const month = date.toLocaleString("default", { month: "short" });
                return `${day} ${month}`;
            };

            const startDate = formatDate(deliveryDate);

            // Add 2 days to the delivery date
            const endDate = new Date(deliveryDate);
            endDate.setDate(deliveryDate.getDate() + 2);

            const endDateFormatted = formatDate(endDate);

            // Set the delivery range in the format "13 Sept - 16 Sept"
            setEstimatedDeliveryRange(`${startDate} - ${endDateFormatted}`);
        } else {
            setEstimatedDeliveryRange("Could not calculate EDD");
        }
    } catch (error) {
        console.error("Error fetching EDD:", error);
        setEstimatedDeliveryRange("Error calculating EDD");
    } finally {
        setIsLoading(false);
    }
};
    //   console.log(estimatedDelivery,"from sequel")

    useEffect(() => {
        if (zipCode.length === 6) {
            calculateEDD();
        }
    }, [zipCode ,originPincode, destinationPincode, pickupDate]);
   

    return (

        <div className='w-full bg-[#fafafa;] pb-8'>
            <div >

                <div className='w-full flex pt-3 mb-7'>

                    <div className='w-[15%] flex !text-[black] items-center gap-2 pl-2 cursor-pointer' onClick={handleback}>
                        <IoIosArrowBack size={18} className='secureshoppingbagitems' />
                        <span className='text-[18px] securehecoutsize'>Bag</span>
                    </div>
                    <div className='w-[80%]'>
                        <h2 className='securehecoutsizehead text-center text-[20px] font-[600]'>Secure Checkout</h2>
                    </div>
                </div>


                <div className='checkoutsectionmainlast flex gap-10 justify-center w-full h-auto'>
                    <div className='checkoutleft w-[50%]'>
                        <form action="">

                            <div className='w-full'>
                                {/* conatct  */}
                                <div className="contact-information bg-[#ffffff] mb-[16px] shadow-sm">
                                    <div className='flex justify-between items-center mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Contact Information</h2>
                                        <div>
                                            {user ? (
                                                <div>
                                                    <span className='text-[16px] font-[400] text-[#161618]'></span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className='text-[16px] font-[400] text-[#161618] '>SignUp / Login</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='w-[55%] adjustinpser'>
                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block w-[100%] adjustinpser' for="shipping-email">Email Address (for sending the order confirmation)*</label>
                                        {/* <input
                                            id="shipping-email"
                                            type='text'
                                            value={user && user.email}
                                            className='int-emailcheck'
                                            placeholder="Enter Email" /> */}

                                        <input
                                            id="shipping-email"
                                            type={user ? 'text' : 'email'}
                                            value={user ? user.email : email}
                                            readOnly={user ? true : false}
                                            onChange={!user ? (e) => setEmail(e.target.value) : null}
                                            className='int-emailcheck'
                                            placeholder="Enter Email"
                                            required={!user}
                                        />
                                    </div>

                                </div>


                                {/* address section */}
                                <div className="form-information bg-[#ffffff] mb-[16px] p-4 shadow-lg">

                                    <div className='mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Delivery Address</h2>
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[93%]  adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-fname">Full Name *</label>
                                            {user ? (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={user?.name}
                                                    readOnly
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                />
                                            ) : (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className='int-emailcheck'
                                                    placeholder="Enter Your full name"
                                                    required
                                                />
                                            )}
                                        </div>
                                        {/* <div className='w-[45%]  adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-lname">Last Name *</label>
                                            {user ? (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={user?.name}
                                                    readOnly
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                />
                                            ) : (
                                                <input
                                                    id="shipping-fname"
                                                    type='text'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className='int-emailcheck'
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            )}
                                        </div> */}
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                    <div className='w-[45%] adjustinpser'>
                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="shipping-cnumber">Phone Number (for delivery updates) *</label>
                                        <input
                                            value={phoneNumber}
                                            id="shipping-cnumber"
                                            onChange={handlePhoneNumberChange}
                                            type='tel'
                                            className='int-emailcheck'
                                            placeholder="Enter Your Contact Number"
                                            maxLength={10}
                                            required
                                        />
                                        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
                                    </div>
                                    <div className='w-[45%] adjustinpser'>
            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="shipping-country">
                Country *
            </label>
            <select
                id='shipping-country'
                className="int-emailcheck rounded-[5px]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            >
                {/* Show default option only if country is not selected */}
                {country === '' && (
                    <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block" value="">
                        Select Country
                    </option>
                )}
                {Country && 
                    Country.getAllCountries().filter(item => item.isoCode === 'IN').map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                        </option>
                    ))}
            </select>
        </div>
                                    </div>

                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-address1">Apartment, Floor  *</label>
                                            <input id="shipping-address1" type='text' value={address1} onChange={(e) => setAddress1(e.target.value)} className='int-emailcheck' placeholder="Enter Your address" />
                                        </div>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-address2">Street ,Town / City *</label>
                                            <input id="shipping-address2" type='text' value={address2} onChange={(e) => setAddress2(e.target.value)} className='int-emailcheck' placeholder="Enter Your Address2" />
                                        </div>
                                    </div>
                                    <div className='flex gap-5 items-center mb-4 sercol'>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-state">State *</label>
                                            <select
                                                className="int-emailcheck"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            >
                                                <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]" value="">
                                                    Choose your State
                                                </option>
                                                {State &&
                                                    State.getStatesOfCountry(country).map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='w-[45%] adjustinpser'>
                                            <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-zipcode">Zip Code *</label>
                                            <input id="shipping-zipcode" type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} className='int-emailcheck' placeholder="Enter Your Zipcode" />
                                        </div>
                                    </div>

                                    {/* saved address */}
                                    <div>
                                        <h5 className='text-[13px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]  cursor-pointer flex items-center gap-2 ' onClick={() => setUserInfo(!userInfo)}>
                                            <BsDash />
                                            choose from saved address
                                        </h5>
                                        {
                                            userInfo &&
                                            <div className='cursor-pointer'>
                                                {
                                                    user && user.addresses.map((item, index) => {
                                                        return (
                                                            <div key={index} className="w-full flex mt-1 text-[13px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] cursor-pointer">
                                                                <input type="checkbox"
                                                                    className='mr-3 cursor-pointer'
                                                                    id={item.addressType}
                                                                    value={item.addressType}
                                                                    onChange={() => handleCheckboxChange(index)}
                                                                    onClick={() => setAddress1(item.address1) ||
                                                                        setAddress2(item.address2) || setZipCode(item.zipCode) || setCountry(item.country) || setCity(item.city)
                                                                    }
                                                                />
                                                                <h2 className='cursor-pointer'><label htmlFor={item.addressType}>{item.addressType}</label></h2>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }

                                    </div>


                                </div>


                                {/* Billing Address */}
                                <div className="form-information bg-[#ffffff] mb-[16px] p-4 shadow-lg">
                                        <div className='mb-[12px]'>
                                            <h2 className='text-[16px] font-[400] text-[#161618]'>Billing Address</h2>
                                        </div>
                                        <div className='flex gap-5 items-center mb-4'>
                                            <div className='w-[100%]'>
                                                <input
                                                    type='checkbox'
                                                    id='same-address'
                                                    checked={isSameAddress}
                                                    onChange={handleCheckboxChangebilling}
                                                    className='mr-2'
                                                />
                                                <label htmlFor='same-address' className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]'>
                                                    Billing address is the same as delivery address
                                                </label>
                                            </div>
                                        </div>
                                        {!isSameAddress && (
                                            <>        
                                             <div className='flex gap-5 items-center mb-4 sercol' >
                                                    <div className='w-[93%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-address1">Full Name *</label>
                                                        <input
                                                            id="billing-address1"
                                                            type='text'
                                                            value= {billingAddress.name}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, name: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your Full Name"
                                                        />
                                                    </div>
                                                    {/* <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-address2">Last Name *</label>
                                                        <input
                                                            id="billing-address2"
                                                            type='text'
                                                            value={billingAddress.name}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, name: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your Name"
                                                        />
                                                    </div> */}
                                                </div>           
                                                <div className='flex gap-5 items-center mb-4 sercol' >
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-address1">Apartment, Floor *</label>
                                                        <input
                                                            id="billing-address1"
                                                            type='text'
                                                            value={billingAddress.address1}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, address1: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your address"
                                                        />
                                                    </div>
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-address2">Street, Town / City *</label>
                                                        <input
                                                            id="billing-address2"
                                                            type='text'
                                                            value={billingAddress.address2}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, address2: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your Address2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 items-center mb-4 sercol' >
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-country">Country *</label>
                                                        <select
                                                            id='billing-country'
                                                            className="int-emailcheck rounded-[5px]"
                                                            value={billingAddress.country}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, country: e.target.value }))}
                                                        >
                                                            <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block" value="">
                                                                Choose your country
                                                            </option>
                                                            {Country &&
                                                                Country.getAllCountries().map((item) => (
                                                                    <option key={item.isoCode} value={item.isoCode}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-state">State *</label>
                                                        <select
                                                            id='billing-state'
                                                            className="int-emailcheck"
                                                            value={billingAddress.city}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                                                        >
                                                            <option className="text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]" value="">
                                                                Choose your State
                                                            </option>
                                                            {State &&
                                                                State.getStatesOfCountry(billingAddress.country).map((item) => (
                                                                    <option key={item.isoCode} value={item.isoCode}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 items-center mb-4 sercol' >
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-zipcode">Zip Code *</label>
                                                        <input
                                                            id="billing-zipcode"
                                                            type='text'
                                                            value={billingAddress.zipCode}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your Zipcode"
                                                        />
                                                    </div>
                                                    <div className='w-[45%] adjustinpser'>
                                                        <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' htmlFor="billing-zipcode">Phone Number *</label>
                                                        <input
                                                            id="billing-zipcode"
                                                            type='text'
                                                            value={billingAddress.phoneNumber}
                                                            onChange={(e) => setBillingAddress(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                                            className='int-emailcheck'
                                                            placeholder="Enter Your PhoneNumber"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </div>


                                {/* credentails information */}

                                {
                                    orderData.totalPrice > 200000 && (
                                        <div className="cerdtentaisl-information bg-[#ffffff] mb-[16px] p-4 shadow-lg">
                                        <div className='mb-[12px]'>
                                            <h2 className='text-[16px] font-[400] text-[#161618]'>Information Required</h2>
                                        </div>
                                        <div className='flex gap-5 items-center mb-4'>
                                            <div className='w-[100%]'>
                                            
                                                <label htmlFor='same-address' className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px]'>
                                                If the order amount exceeds 2,00,000, you will be required to provide additional details such as your PAN card information.
                                                </label>
                                            </div>
                                        </div>
    
                                        <div className='flex gap-5 items-center mb-4 sercol'>
                                            <div className='w-[45%]  adjustinpser'>
                                                <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-gstin">GSTIN (Optinal)</label>
                                                 
                                                    <input
                                                        id="shipping-gstin"
                                                        type='text'
                                                        value={gstin}
                                                        onChange={(e) => setgstin(e.target.value)}
                                                        className='int-emailcheck'
                                                        placeholder="Enter Your GSTIN Number"
                                                        
                                                    />
                                                
                                            </div>
                                            <div className='w-[45%]  adjustinpser'>
                                                <label className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block' for="shipping-pandetails">Enter PanCard details *</label>
                                                 
                                                    <input
                                                        id="shipping-pandetails"
                                                        type='text'
                                                        value={pandetails}
                                                        onChange={(e) => setpandetails(e.target.value)}
                                                        className='int-emailcheck'
                                                        placeholder="Enter Pancard Details"
                                                        required
                                                    />
                                                
                                            </div>
                                        </div>
    
                                    </div>
    

                                    )
                                }

                               
                                {/* deleverymethod */}
                                <div className="contact-information bg-[#ffffff] mb-[16px] shadow-lg">
                                    <div className=' mb-[12px]'>
                                        <h2 className='text-[16px] font-[400] text-[#161618] '>Select Delivery Method</h2>

                                    </div>

                                    <div className=''>
                                        <div className='flex items-center gap-4'>
                                            <input id="shipping-method" type='radio' required className='int-emailcheck !w-[20px] !h-[20px]' />
                                            <div>

                                                <label className='text-[14px] font-[500] mb-[4px] tracking-[0.55px] block' for="shipping-method">Standard Delivery - FREE (Sequel247)</label>
                                                <span className='text-[12px] text-[#6f6f79] font-[400] mb-[4px] tracking-[0.55px] block'>(Delivery By  {estimatedDeliveryRange})</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className='flex justify-end '>
                                    <div className={`button-wrapperdiv`} onClick={paymentSubmit}>
                                        <button className={`button-wrapper`}>Continue To Payment</button>
                                    </div>
                                </div>


                            </div>

                        </form>
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
                                                    loading='lazy'
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
                                                            <span className=" text-[#161618]  text-[13px] pl-2" >{val.showWithChain ? 'With Chain' : 'Without Chain'} </span>
                                                        </div>

                                                    )}

                                                    {
                                                        val.selectedColor !== null && (
                                                            <div className="">
                                                                <span className="text-[#161618] font-[500] text-[13px]">Metal Color :</span>
                                                                <span className=" text-[#161618]  text-[13px] pl-2" >{metalColors[val.selectedColor]}</span>
                                                            </div>
                                                         )
                                                    } 


                                                    {val?.selectedEnamelColor && (
                                                        <div className="">
                                                            <span className="text-[#161618] font-[500] text-[13px]">Enamel Color :</span>
                                                            <span className="text-[#161618] text-[13px] pl-2">{val.selectedEnamelColor}</span>
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
                                        <span className="value">{currency} {convertedSubTotalPrice}</span>
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
                                                                <h5 className="label !text-[16px]">- {currency} {(orderData?.discountPrice * (conversionRates[currency] || 1)).toFixed(2)}</h5>
                                                            </div>
                                                        ) : (
                                                            <h5 className="text-[18px] font-[600]">-</h5>
                                                        )}
                                     </span>
                                    </div>
                                    <div className="sub-total ">
                                        <span className="label">
                                            Delivery By <span className="deltext">({estimatedDeliveryRange})</span>
                                        </span>
                                        <span className="value">Free</span>
                                    </div>

                                    {/* <div className="sub-total mt-2  ">
                                        <span className="label">GST (3%):</span>
                                        <span className="value">₹ {gstAmount}</span>
                                    </div> */}
                                    <div className="sub-total mt-2">
                                        <span className="label">GST (3%):</span>
                                        <span className="value">{currency} {gstAmount}</span>
                                    </div>

                                    <div className="sub-total mt-2 bb ">
                                        <span className="label">Refer Amount</span>
                                        <span className="value">

                                            {/* {appliedReferral > 0 && (
                                                <p className='text-[14px] text-green-500 mt-1'>
                                                    Applied: {appliedReferral}
                                                </p>
                                            )} */}
                                            {
                                                orderData?.appliedReferral > 0 ?
                                                    `- ₹${orderData?.appliedReferral}` :
                                                    <>
                                                        Available: ₹${orderData?.referralBalance?.toFixed(2)}
                                                        {/* <button onClick={handleApplyReferral} className='ml-4 text-[16px] text-blue-500'>
                                                            Apply
                                                        </button> */}
                                                    </>
                                            }
                                        </span>

                                    </div>

                                    {/* <div className="sub-total sub-totalpp">
                                        <span className="">Order Total </span>
                                        <span className="">₹ {orderData?.totalPrice}</span>
                                    </div> */}

                                        <div className="sub-total sub-totalpp">
                                                        <span className="">Order Total</span>
                                                        <span className="">{currency} {convertedTotalPrice}</span>
                                        </div>





                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div >


    )
}

export default CheckoutPage
