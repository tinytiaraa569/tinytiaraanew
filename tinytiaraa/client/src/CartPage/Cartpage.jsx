import React, { useEffect, useState } from 'react'
import './cartpage.css'
import { MdDeleteForever } from "react-icons/md";
import styles from '../Styles/styles';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { backend_url, imgdburl, server } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/actions/cart';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { BsShieldLock } from "react-icons/bs";

import visaimg from './images/visa.svg'
import mastercardimg from './images/mastercard.svg'
import gpayimg from './images/gpay.svg'
import ameximg from './images/amex.svg'
import paytmimg from './images/paytm-icon.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { LuShoppingBag } from "react-icons/lu";
import axios from 'axios';
import { FaTimesCircle } from 'react-icons/fa';
import { XCircleIcon } from 'lucide-react';
import { GiCash } from 'react-icons/gi';
import CryptoJS from 'crypto-js';




function Cartpage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const JWT_SECRET = "ewjdgss372547ydj"

  // const toatalPrice = data.discountPrice * value
  const { cart } = useSelector((state) => state.cart)

  // console.log(cart[0].shopId,"see the details of cart page")
  const { user } = useSelector((state) => state.user)
  const { seller ,isLoading } = useSelector((state) => state.seller);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null)
  const [gstAmount, setGstAmount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(null)
  const [availableCoupons, setAvailableCoupons] = useState([]);


  const[personalmsg,setpersonalmsg] =useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (cart.length > 0 && cart[0]?.shopId) {  // Check if cart is not empty and shopId exists
      const shopId = cart[0].shopId;
      axios
        .get(`${server}/coupon/get-coupons/${shopId}`)
        .then((res) => {
          setAvailableCoupons(res.data.couponCodes); // Assuming your API returns an array of coupons
        })
        .catch((error) => {
          console.error('Error fetching coupons:', error);
        });
    } else {
      setAvailableCoupons([]);  // Reset available coupons if cart is empty
    }
  }, [cart]);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))

  }

  // const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data))

  }

  const handleClearCoupon = () => {
    setDiscountPrice(null);
    setCouponCodeData(null);
    setCouponCode("");
  };
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * (item.chainPrice > 0 ? item.discountPrice + item.chainPrice : item.discountPrice) , 0)

  

  const shipping = "Free Shipping"

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const name = couponCode;

  //   try {
  //     const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);

  //     if (res.data.success && res.data.couponCode) {
  //       const shopId = res.data.couponCode?.shop;
  //       const couponCodeValue = res.data.couponCode?.value;
  //       const percentageDiscount = res.data.couponCode?.percentageDiscount;
  //       const isCouponValid = cart.filter((item) => item.shopId === shopId);

  //       if (isCouponValid.length === 0) {
  //         toast.error("Coupon code is not valid for items in your cart.");
  //         setCouponCode("");
  //       } else {
  //         const eligiblePrice = isCouponValid.reduce(
  //           (acc, item) => acc + item.qty * item.discountPrice,
  //           0
  //         );

  //         let calculatedDiscount = 0;

  //         if (percentageDiscount !== null) {
  //           // Calculate discount based on percentage
  //           calculatedDiscount = (eligiblePrice * (percentageDiscount / 100)).toFixed(2);
  //         } else {
  //           // Use fixed value discount
  //           calculatedDiscount = couponCodeValue.toFixed(2);
  //         }

  //         setDiscountPrice(calculatedDiscount); // Set the discount price
  //         setCouponCodeData(res.data.couponCode); // Store coupon code data if needed elsewhere
  //         toast.success("Coupon applied successfully.");
  //         setCouponCode("");

  //       }
  //     } else {
  //       toast.error("Coupon code does not exist.");
  //       setCouponCode("");
  //     }
  //   } catch (error) {
  //     console.error("Error applying coupon:", error);
  //     toast.error("Failed to apply coupon code. Please try again later.");
  //   }
  // };
 

  //withcard items
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const res = await axios.post(`${server}/coupon/apply-coupon`, {
  //       name: couponCode,
  //       cartItems: cart, // Send the cart to the server for validation
  //     });
  
  //     if (res.data.success) {
  //       setDiscountPrice(res.data.discount); // Set the discount price
  //       toast.success("Coupon applied successfully.");
  //     } else {
  //       toast.error(res.data.message || "Coupon code is not valid.");
  //     }
  //     setCouponCode("");
  //   } catch (error) {
  //     console.error("Error applying coupon:", error);
  //     toast.error("Failed to apply coupon code. Please try again later.");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const name = couponCode; // Only sending the coupon code
  
  //   try {
  //     const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
  //     console.log("Coupon Response:", res.data); // Log the coupon response
  
  //     if (res.data.success) {
  //       const shopId = res.data.couponCode?.shop; // Extracting shopId from coupon
  //       const couponCodeValue = res.data.couponCode?.value; // This should be 500
  //       const percentageDiscount = res.data.couponCode?.percentageDiscount; // This should be null
  
  //       console.log("Shop ID from coupon:", shopId); // Log shopId
  //       console.log("Cart Items:", cart); // Log current cart items
  
  //       // Check if cart has items
  //       if (!cart || cart.length === 0) {
  //         toast.error("Your cart is empty.");
  //         return;
  //       }
  
  //       // Find valid items for the coupon
  //       const isCouponValid = cart.filter((item) => item.shopId === shopId);
  //       console.log("Valid Items for Coupon:", isCouponValid); // Log valid items
  
  //       if (isCouponValid.length === 0) {
  //         toast.error("Coupon code is not valid for items in your cart.");
  //         setCouponCode("");
  //       } else {
  //         const eligiblePrice = isCouponValid.reduce(
  //           (acc, item) => acc + item.qty * item.discountPrice,
  //           0
  //         );
  
  //         let calculatedDiscount = 0;
  
  //         // Apply fixed value discount
  //         if (couponCodeValue !== null) {
  //           calculatedDiscount = couponCodeValue.toFixed(2);
  //         } else {
  //           // If percentageDiscount is not null, calculate discount
  //           calculatedDiscount = (eligiblePrice * (percentageDiscount / 100)).toFixed(2);
  //         }
  
  //         setDiscountPrice(calculatedDiscount); // Set the discount price
  //         setCouponCodeData(res.data.couponCode); // Store coupon code data if needed elsewhere
  //         toast.success("Coupon applied successfully.");
  //         setCouponCode("");
  //       }
  //     } else {
  //       toast.error("Coupon code does not exist.");
  //       setCouponCode("");
  //     }
  //   } catch (error) {
  //     console.error("Error applying coupon:", error.response ? error.response.data : error.message);
  //     toast.error("Failed to apply coupon code. Please try again later.");
  //   }
  // };
  
  const decryptDiscount = (encryptedDiscount) => {
    const [ivHex, encryptedData] = encryptedDiscount.split(':'); // Split IV and encrypted data
    const iv = CryptoJS.enc.Hex.parse(ivHex); // Convert hex IV to CryptoJS format
  
    // Use the same hashed secret
    const hashedKey = CryptoJS.SHA256("ewjdgss372547ydj"); // Ensure this matches your backend hash
  
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) },
      hashedKey,
      { iv: iv }
    );
  
    const discount = decrypted.toString(CryptoJS.enc.Utf8); // Convert to string
    console.log(discount,"discoutn")
    if (!discount) {
      throw new Error("Invalid discount value received.");
    }
  
    return parseFloat(discount); // Convert to float
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${server}/coupon/apply-coupon`, {
        name: couponCode,
        cartItems: cart, // Send the cart to the server for validation
      });

      if (res.data.success) {
        // Decrypt the discount value before using it
        const decryptedDiscount = decryptDiscount(res.data.discount);

        // Set the discount price
        setDiscountPrice(decryptedDiscount);
        localStorage.setItem("couponToken", res.data.token); // Save the JWT token for later use
        toast.success("Coupon applied successfully.");
      } else {
        toast.error(res.data.message || "Coupon code is not valid.");
      }
      
      // Clear the coupon code input
      setCouponCode("");
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon code. Please try again later.");
    }
  };
  const totalPrice = (subTotalPrice - discountPrice).toFixed(2);

  useEffect(() => {
    const gst = (totalPrice * 3) / 100;
    setGstAmount(gst.toFixed(2));
  }, [totalPrice]);


  const calculateTotalPrice = (subTotal, discount) => {
    return (subTotal - discount).toFixed(2);
  };
  const [referralBalance, setReferralBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appliedReferral, setAppliedReferral] = useState(0);

  const [originalTotalPrice, setOriginalTotalPrice] = useState(
    calculateTotalPrice(subTotalPrice, discountPrice)
  );


  const fetchReferralBalance = async () => {
    try {
      const response = await axios.get(`${server}/referral/referral-balance`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (response.data && response.data.success) {
        setReferralBalance(response.data.referralBalance);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('API Error:', err);
      // toast.error('An error occurred while fetching referral balance');
    }
  };


  useEffect(() => {
    fetchReferralBalance();
  }, []);


  const applyReferralBalance = () => {
    if (appliedReferral === 0) {
      const amountToApply = Math.min(referralBalance, subTotalPrice - discountPrice);
      setAppliedReferral(amountToApply);
      setReferralBalance(referralBalance - amountToApply); // Update local referral balance
      toast.success(`Applied ₹${amountToApply} from your referral balance`);
    }
  };

  // Remove applied referral balance
  const removeReferralBalance = () => {
    if (appliedReferral > 0) {
      setReferralBalance(referralBalance + appliedReferral); // Restore local referral balance
      setAppliedReferral(0);
      toast.info('Referral balance application cancelled');
    }
  };

  const finalPrice = (totalPrice - appliedReferral).toFixed(2);

  // Fetch currency and conversion rates from state
const { currency, conversionRates } = useSelector((state) => state.currency);

// Convert prices based on the selected currency
const convertedSubTotalPrice = (subTotalPrice * (conversionRates[currency] || 1)).toFixed(2);
const convertedDiscountPrice = (discountPrice * (conversionRates[currency] || 1)).toFixed(2);
const convertedFinalPrice = (finalPrice * (conversionRates[currency] || 1)).toFixed(2);








  const handleCheckout = () => {
    const orderData = {
      cart,
      totalPrice: finalPrice ? finalPrice : totalPrice,
      subTotalPrice,
      shipping,
      user,
      discountPrice,
      referralBalance, // Include referral balance
      appliedReferral,
      personalmsg,
      

    }

    console.log(orderData,"fromcartpage ")

    //updating local storage 
    localStorage.setItem("latestOrder", JSON.stringify(orderData))
    navigate("/checkout-page")
  }


  const handleCouponClick = (name) => {
    setCouponCode(name); // Set the clicked coupon as the coupon code
    handleSubmit(); // Automatically trigger the coupon application logic
  };

  return (
    

    <div className='w-full  bg-[#fafafa;] pb-8'>
      <div class="secureshoppingbaghead text-center font-[500] text-[22px] py-5">
        <h2>Secure Shopping Bag</h2>
        <div className={`text-center flex justify-center items-center`}>
          <LuShoppingBag size={18} className='secureshoppingbagitems' />
          <h5 className='pl-2 text-[18px] font-[400] secureshoppingbagitems'>{cart && cart.length} Items</h5>
        </div>
      </div>
      {

        cart && cart.length === 0 ?
          <div>
            <div className='w-full h-screen flex justify-center items-center'>
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1 className='cursor-pointer' />

              </div>
              <h5>Your Cart Is Empty ! </h5>

            </div>

          </div>


          :
          <div className="cartpagesection">

            <div className="leftcartpagemainsec">
              {
                cart && cart.map((val, index) => {
                  console.log(val)
                  return (
                    <div className="leftcheckoutcard mb-5" key={index}>

                      <CartSingle data={val} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler} />

                    </div>
                  )
                })
              }

              {/* <div className='mt-2'>
                 <h2 className='text-[22px] font-[600]'>Total : - ₹ {totalPrice}</h2>

               </div> */}


              <div className="lastsectioncartpage">
                {/* cart contact section */}

                <div className="contactusec">
                  <h3>Need Help?</h3>
                  <div className="contactus">
                    <Link to="tel:+91 8657062511" target="_blank">
                    <div className="phonecontact">
                      <span className="phoneicon" width={24} height={24}>
                        <i className="fa-solid fa-phone text-[#006039]" />
                      </span>
                      <span className="phonenumber spantext !text-[12px]">Call US :- +91 86570 62511</span>
                    </div>
                      </Link>
                      <Link to="mailto:care@tinytiaraa.com" target="_blank">
                    <div className="phonecontact">
                      <span className="emailicon" width={24} height={24}>
                        <i className="fa-solid fa-envelope text-[#006039]" />
                      </span>
                      <span className="phonenumber spantext">Email US</span>
                    </div>
                    </Link>
                    <Link to="https://web.whatsapp.com/send?phone=+91%208657062511" target="_blank">
                    <div className="phonecontact">
                      <span className="chaticon" width={24} height={24}>
                        <i className="fa-solid fa-message text-[#006039]" />
                      </span>
                      <span className="phonenumber spantext">Chat With US </span>
                    </div>
                    </Link>
                    <a className="textclr" href="">
                      Shipping and Return Policy
                    </a>{" "}
                    <br />
                    <a className="textclr" href="">
                      FAQs
                    </a>
                  </div>
                </div>
                {/* cart Personalised meassage */}
                <div className="personalised">
                  <div className="gift-msg-wrapper">
                    <span className="msg-heading">Personalized Gift Message</span>
                    <span className="sub-heading">
                      Leave your message &amp; we’ll send it along as handwritten note.
                    </span>
                    <textarea className='!text-[11px]' name="" id="" defaultValue={""} value={personalmsg} onChange={(e)=>{setpersonalmsg(e.target.value)}}/>
                  </div>
                  <div className="btn-wrapper">
                    <span className="a2 save-btn">Save</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightcartpage">
              <div className="coupounsection">
                <h3>Offer code</h3>
                <form onSubmit={handleSubmit}>
                  <div className="coupon">

                    <div id="coupon" className="coupon-input">
                      <input
                        type="text"
                        className="input-text b1 "
                        name="coupon_code"
                        placeholder="Enter Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}

                      />
                    </div>

                    <div className="couponbtn">
                      <button type='submit'>Apply</button>
                    </div>
                  </div>

                  <div className="available-coupons mt-2">
  <h3 className="!text-[12px] mt-2 mb-1 ">Available Coupons</h3>
  {isLoading ? (
    <p className="text-gray-500">Loading coupons...</p>
  ) : availableCoupons.length > 0 ? (
    <div className="flex flex-wrap gap-3">
      {availableCoupons?.slice(0, 2).map((coupon) => (
        <div 
          key={coupon._id} 
          className="bg-green-200 text-green-800 px-3 py-2 rounded-full text-[14px]  shadow-sm hover:bg-green-300 transition cursor-pointer"
          onClick={() => handleCouponClick(coupon.name)} // Added onClick handler
        >
          <strong className='!text-[12px]'>{coupon.name}</strong>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No coupons available</p>
  )}
</div>

</form>

              </div>
              <div className="summarysection">
                <h3>Order Summary</h3>
                <div className="sub-total ">
                  <span className="label">Subtotal</span>
                  {/* <span className="value">₹ {subTotalPrice}</span> */}
                  <span className="value">
                   {currency} {convertedSubTotalPrice}
                  </span>
                </div>
                <div className="sub-total ">
                  <span className="label">Coupon Discount:</span>
                  {/* <span className="value">
                    {discountPrice > 0 ? (
                      <div className="flex items-center">
                        <h5 className="label !text-[16px]">- ₹{discountPrice}</h5>
                        <span onClick={handleClearCoupon} className="ml-2 cursor-pointer text-red-500"><FaTimesCircle /></span>
                      </div>
                    ) : (
                      <h5 className="text-[18px] font-[600]">-</h5>
                    )}
                  </span> */}
                   <span className="value">
                      {discountPrice > 0 ? (
                        <div className="flex items-center">
                          <h5 className="label !text-[16px]">- {currency} {convertedDiscountPrice}</h5>
                          <span onClick={handleClearCoupon} className="ml-2 cursor-pointer text-red-500">
                            <FaTimesCircle />
                          </span>
                        </div>
                      ) : (
                        <h5 className="text-[18px] font-[600]">-</h5>
                      )}
                    </span>
                </div>
                <div className="sub-total ">
                  <span className="label">
                    Delivery By <span className="deltext">Sequel</span>
                  </span>
                  <span className="value">Free</span>
                </div>
                {/* <div className="sub-total ">
                  <span className="label">
                    *Other shipping methods available on checkout
                  </span>
                </div> */}

                <div className="sub-total ">
                  <span className="label">Applied Referral :</span>

                  {appliedReferral ? (
                    <div className="flex items-center">
                      <h5 className="label !text-[16px]">- ₹{appliedReferral}</h5>
                      <span onClick={removeReferralBalance} className="ml-2 cursor-pointer text-red-500"><FaTimesCircle /></span>
                    </div>
                  ) : (
                    <h5 className="text-[18px] font-[600]">-</h5>
                  )}


                </div>
                <div className="sub-total  bb">
                  <span className="label">Sales Tax</span>
                  <span className="label">Applied at Checkout</span>
                </div>


                <div className="sub-total sub-totalpp">
                  <span className="">Order Total </span>
                  {/* <span className="">₹ {finalPrice}</span> */}
                  <span className="">{currency} {convertedFinalPrice}</span>
                </div>
              </div>


              {referralBalance > 0 && (
                <div className="coupounsection mt-3 bg-white shadow-md rounded-lg flex items-center space-x-4">
                  {/* <GiCash className="h-6 w-6 text-green-500" /> */}
                  <div>
                    <h3 className="text-xl font-[500]  mb-1">Refer & Earn</h3>
                    <div className="my-4">
                      <h3 className="text-lg font-medium mb-2">Referral Balance: ₹{referralBalance.toFixed(2)}</h3>
                      {appliedReferral === 0 ? (
                        <button
                          className="button bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                          onClick={applyReferralBalance}
                        >
                          <GiCash className="h-5 w-5" />
                          <span>Apply Referral Balance</span>
                        </button>
                      ) : (
                        <button
                          className="button bg-red-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-red-600 transition-colors"
                          onClick={removeReferralBalance}
                        >
                          <XCircleIcon className="h-5 w-5" />
                          <span>Remove Applied Referral Balance</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}


              <div className="checkout">

                <div className="secure-checkout cursor-pointer" onClick={handleCheckout}>
                  <BsShieldLock size={25} />
                  <span className="secure-text">Secure Checkout</span>
                  <i className="fa fa-angle-right fs24" />
                </div>

              </div>
              {/* <div className="paymentsection">
                <p>OR</p>

              </div> */}
              <div className="paymentaccept">
                <h3>We Accept Payment</h3>
                <div className="payemntacceptimagaes">
                  <img
                    src={visaimg}
                    alt=""
                  />
                  <img
                    src={mastercardimg}
                    alt=""
                  />
                  <img
                    src={ameximg}
                    alt=""
                  />
                  <img
                    src={paytmimg}
                    alt=""
                  />
                  <img
                    src={gpayimg}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

      }



    </div>


  )
}


const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {

  const [value, setValue] = useState(data.qty)
  const { currency, conversionRates } = useSelector((state) => state.currency); // Get currency and conversion rates from state

  const metalColors = {
    0: "Yellow Gold",
    1: "Rose Gold",
    2: "White Gold",
  };

  const convertedDiscountPrice = (data.discountPrice * (conversionRates[currency] || 1)).toFixed(0);
  const convertedOriginalPrice = (data.originalPrice * (conversionRates[currency] || 1)).toFixed(0);
  const convertedChainPrice = data.chainPrice > 0 ? (data.chainPrice * (conversionRates[currency] || 1)).toFixed(0) : 0;

  // const totalPrice = data.chainPrice > 0 ? data.discountPrice + data.chainPrice : data.discountPrice * value;
  const totalPrice = data.chainPrice > 0 ? (parseFloat(convertedDiscountPrice) + parseFloat(convertedChainPrice)) : (parseFloat(convertedDiscountPrice) * value);

  const enamelColor = data.selectedEnamelColor?.toLowerCase();
  const metalColor = metalColors[data.selectedColor]?.replace(" ", "") + "clrStock";

  const enamelStock = data.Enamelcolorstock?.[enamelColor]?.[`${enamelColor}${metalColor}`];
  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  const increment = () => {
    if (enamelStock === undefined || enamelStock === null || value >= enamelStock) {
      toast.error("Product Stock limit for this Variant");
      return;
    }
    setValue(value + 1);
    const updateCartData = { ...data, qty: value + 1 };
    quantityChangeHandler(updateCartData);
  };

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    }
  };


  const shouldShowChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;
  function getAvailableMetalColors(metalColors) {
    return Object.keys(metalColors)
      .filter((key) => metalColors[key].length > 0)
      .map((key) => {
        return {
          colorKey: key,
          colorName: key.replace(/clr$/i, '')
        };
      });
  }
  const availableMetalColors = getAvailableMetalColors(data.MetalColor || {});
  const shouldShowMetalColors = availableMetalColors.length > 0;


  return (

    // <div>

    // // <div className='flex px-7 py-3'>
    // //   <div className="leftcheckoutsectionimg">
    // //     <img src={`${backend_url}${data?.images[0]}`} alt="" />
    // //   </div>
    // //   <div className="leftcheckoutcontent mb-0.5">
    // //     <h3 className='text-[1.2rem] '>{data.name}</h3>
    // //     <div className="checkoutskuid ">
    // //       <p className='text-[0.7rem] text-[#ada9ad] '>{data.skuid}</p>
    // //     </div>
    // //     <div className="checkoutoptions ">
    // //       <h3 className='text-[0.8rem]'><span className='font-[500]'>Metal Colour:</span> Rose Gold</h3>
    // //       <h3 className='text-[0.8rem]'><span className='font-[500]'>Chain:</span> With 1gm Chain ( 11 inches)</h3>

    // //     </div>

    // //     <div className="checkoutsectionprice mt-1 mb-0.5">

    // //       <h3 className='text-[0.9rem] '>₹{data.discountPrice} * {value}</h3>
    // //       {/* <h3 className='text-[0.9rem]'>₹{data.discountPrice}</h3>
    // //                       <h3 className='text-[#ada9ad] line-through ml-[5px] text-[0.9rem]'>₹{data.originalPrice}</h3>
    // //                       <h3 className='text-[#EB4F5C] ml-[5px] text-[0.9rem]'>save₹{data.originalPrice - data.discountPrice}</h3> */}

    // //     </div>
    // //     <div>
    // //       <span className='text-[#EB4F5C]'> ₹ {totalPrice}</span>
    // //     </div>



    // //     <div className="quantityincdesc flex">
    // //       {/* {
    // //                         cartData && cartData.map((i, index) => {
    // //                           return (
    // //                             <CartSingle key={index} data={i} />
    // //                           )

    // //                         })
    // //                       } */}
    // //       <div className='flex gap-2 mt-2'>
    // //         <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
    // //           onClick={() => increment(data)}>
    // //           <HiPlus size={18} color="#fff" />
    // //         </div>
    // //         <span>{data.qty}</span>

    // //         <div className={`bg-[#a7abb14f] border border-[#a7abb14f] text-[#000] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
    // //           onClick={() => decrement(data)}>
    // //           <HiOutlineMinus size={18} color="#000" />
    // //         </div>

    // //       </div>


    // //     </div>

    // //   </div>
    // // </div>
    // </div>

    <div className="leftcartpage">
      <div className="leftcardsec1">
        <div className="leftcardimg">
          <Link className="cartimage-container" to={`/product/${product_name}`}>
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
              width={166}
              height={166}
            />
          </Link>
        </div>
        <div className="leftcarddetail">
          <div className="leftcarddeatilhead">
            <Link to={`/product/${product_name}`}>
            <h2 > {data.name}</h2>

            </Link>
            <div className='cursor-pointer mr-4' onClick={() => removeFromCartHandler(data)}>
              <MdDeleteForever size={30} color='#e44343' />
            </div>



          </div>
          <div className="sku-id">
            <span className="notranslate">{data.skuid}</span>
          </div>
          <div className="item-qty">
            <div className="qty-field b1 ">
              <label htmlFor="qty">QTY: </label>
              <span value={data.qty}>{value}</span>
            </div>

          </div>
          <div className="leftcardprice mb-2">
            {/* <span className="oprice">₹ {data.chainPrice > 0 ? data.originalPrice + data.chainPrice : data.originalPrice} </span>
            <span className="disprice pl-1">₹ {data.chainPrice > 0 ? data.discountPrice + data.chainPrice : data.discountPrice} </span>
            <span className='text-[#EB4F5C] ml-[5px] text-[0.9rem] pl-1'>save ₹{(data.originalPrice - data.discountPrice).toFixed(2)}</span> */}

        <span className="oprice">
          {currency} {data.chainPrice > 0 ? (parseFloat(convertedOriginalPrice) + parseFloat(convertedChainPrice)).toFixed(0) : convertedOriginalPrice}
        </span>
        <span className="disprice pl-1">
          {currency} {data.chainPrice > 0 ? (parseFloat(convertedDiscountPrice) + parseFloat(convertedChainPrice)).toFixed(0) : convertedDiscountPrice}
        </span>
        <span className="text-[#EB4F5C] ml-[5px] text-[0.9rem] pl-1">
          save {currency} {(data.originalPrice * conversionRates[currency] - data.discountPrice * conversionRates[currency]).toFixed(2)}
        </span>
          </div>

          <div className="details">
            <div className="checkoutoptions ">
              {
                shouldShowMetalColors && (
                  <h3 className='text-[0.6rem]'><span className='font-[500]'>Metal Colour:</span>  {metalColors[data.selectedColor]}</h3>
                )
              }

              {data.selectedEnamelColor && (
                <h3 className="text-[0.6rem]">
                  <span className="font-[500]">Enamel Colour:</span> {data.selectedEnamelColor}
                </h3>
              )}
              {data?.selectedCombination && (
                <h3 className="text-[0.6rem]">
                  <span className="font-[500]">Combination Colour:</span> {data?.selectedCombination}
                </h3>
              )}



              {/* Render chain option only if showWithChain is true */}
              {shouldShowChainOptions && (
                <h3 className='text-[0.6rem]'><span className='font-[500]'>Chain:</span> {data.showWithChain ? 'With Chain' : 'Without Chain'} {data.showWithChain ?  (`(${data.selectedChainSize})`) : ''}</h3>
              )}

            </div>

          </div>
          <div className="flex gap-2 mt-2">
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex justify-center cursor-pointer`}
              onClick={increment}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span>{value}</span>
            <div
              className={`bg-[#a7abb14f] border border-[#a7abb14f] text-[#000] rounded-full w-[25px] h-[25px] flex justify-center cursor-pointer`}
              onClick={decrement}
            >
              <HiOutlineMinus size={18} color="#000" />
            </div>
          </div>
          <div className="checkoutsectionprice mt-1 mb-0.5">
            {/* <h3 className='text-[0.8rem] '>₹{data.chainPrice > 0 ? data.discountPrice + data.chainPrice : data.discountPrice} * {value}</h3>
            <div>
              <span className='text-[#EB4F5C] text-[0.8rem]'>SubTotal :-  ₹ {totalPrice}</span>
            </div> */}
          <h3 className="text-[0.8rem]">
          {currency} {data.chainPrice > 0 ? (parseFloat(convertedDiscountPrice) + parseFloat(convertedChainPrice)).toFixed(2) : convertedDiscountPrice} * {value}
        </h3>
        <div>
          <span className="text-[#EB4F5C] text-[0.8rem]">
            SubTotal :- {currency} {totalPrice.toFixed(2)}
          </span>

          </div>


          </div>

        </div>
      </div>
    </div>

  )

}

export default Cartpage
