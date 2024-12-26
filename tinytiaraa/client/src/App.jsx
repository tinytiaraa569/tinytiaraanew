import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Cartpage from './CartPage/Cartpage'
import MainSection from './MainSection/MainSection'
import Home from './Home/Home.jsx'
import Footer from './MainSection/Footer/Footer.jsx'
import About from './About/About.jsx'
import Shop from './Shop/Shop.jsx'
import CustomisedJewels from './CustomisedJewel/CustomisedJewels.jsx'
import Conatct from './Contact/Conatct.jsx'
import TermsCon from './otherpage/TermsCon.jsx'
import Privacy from './otherpage/Privacy.jsx'
import Exchange from './otherpage/Exchange.jsx'
import ExchangePolicy from './otherpage/ExchangePolicy.jsx'
import ReturnPolicy from './otherpage/Return.jsx'
import Affiliatepolicy from './otherpage/Affiliatepolicy.jsx'
import Goldinsurance from './otherpage/Goldinsurance.jsx'
import Childrensafety from './otherpage/Childrensafety.jsx'
import CustomisedPolicy from './otherpage/CustomisedPolicy.jsx'
import Engravingpolicy from './otherpage/Engravingpolicy.jsx'
import CertificationPolicy from './otherpage/CertificationPolicy.jsx'

import LoginPage from './Component/LoginPage.jsx'
import SignupPage from './Component/SignupPage.jsx'
import ActivationPage from './Component/ActivationPage.jsx'
import { useEffect, useState } from 'react';

import { loadSeller, loadUser } from './redux/actions/user.jsx';
import ProductsPage from './ProductsPage/ProductsPage.jsx';
import ProductDetailsPage from './ProductDetailsPage/ProductDetailsPage.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Shopcreate from './Shopcreate/Shopcreate.jsx';
import ShopcreatePage from './Shopcreate/ShopcreatePage.jsx';
import SellerActivatinPage from './Shopcreate/SellerActivatinPage.jsx';
import ShopLoginPage from './Shopcreate/ShopLoginPage.jsx';
import ShopHomePage from './ShopHomePage/ShopHomePage.jsx';
import SellerProtectedRoute from './SellerProtectedRoute.jsx';
import ShopDashboardPage from './ShopDashboardPage/ShopDashboardPage.jsx';
import ShopCreateProductPage from './ShopCreateProductPage/ShopCreateProductPage.jsx';
import ShopAllProducts from './ShopAllProducts/ShopAllProducts.jsx';
import CatalogPage from './catalog/CatalogPage.jsx';
import Categoriespage from './catalog/Categoriespage';
import NewCategoryPage from './catalog/NewCategoryPage';
import ShopCreateEvents from './ShopCreateEvents/ShopCreateEvents';
import ShopAllEvents from './ShopCreateEvents/ShopAllEvents';
import ShopAllCoupouns from './ShopAllCoupouns/ShopAllCoupouns';
import { getAllProducts, getAllProductShop } from './redux/actions/product';
import { getAllEvents, getAllEventsShop } from './redux/actions/event';
import Store from './store';
import CheckoutPage from './Checkout/CheckoutPage';
import PaymentPage from './PaymentPage/PaymentPage';
import OrderSuccessPage from './OrderSuccess/OrderSuccessPage';
import ShopAllOrders from './ShopAllOrders/ShopAllOrders';
import ShopOrderDetails from './ShopOrderDetails/ShopOrderDetails';
import OrderDetailspage from './OrderDetailspage/OrderDetailspage';
import TrackOrderPage from './TrackOrderPage/TrackOrderPage';
import ShopAllRefunds from './ShopAllRefunds/ShopAllRefunds';
import ShopSettingPage from './ShopSettingPage/ShopSettingPage';
import ShopInboxPage from './ShopInboxPage/ShopInboxPage';
import UserInbox from './UserInbox/UserInbox';
import UserInboxPage from './UserInbox/UserInboxPage';
import ReferPage from './Refer/ReferPage';
import { captureReferralCode } from './Refer/captureReferralCode';
import ShopAllReferral from './ShopAllReferral/ShopAllReferral';
import ScrollReveal from "scrollreveal";
import Navbar1 from './Navbar1/Navbar1';
import ShopAllRequests from './ShopAllRequests/ShopAllRequests';
import ShopContactReq from './ShopContactRequest/ShopContactReq';
import { PriceRangeProvider } from './pricerange/PriceRangeContext';
import ShopRateCardPage from './ShopRateCardPage/ShopRateCardPage';
import ShopProductDetailsPage from './ShopProductDetailsPage/ShopProductDetailsPage';
import ShopEditProductPage from './ShopEditProductPage/ShopEditProductPage';

import ShopAllSpin from './ShopAllSpin/ShopAllSpin'

import ShopAllUsers from './ShopAllUsers/ShopAllUsers'
import ScrollToTopButton from './scrollto/ScrollToTopButton';
import PayUSuccess from './PaymentPage/PayUSuccess';
import Silver from './silvercomp/Silver';

import Error404 from './Errror404/Error404';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import SpinandWin from './SpinandWin/SpinandWin'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import ShopCurrency from '../CurrencySelector/ShopCurrency'
import ShopCreateBanner from './catalog/CreateBanners/ShopCreateBanner'

import NewBanner from './catalog/CreateBanners/NewBanner'
import MetaPixelTracker from './MetaPixelTracker';
import AboutNewBanner from './catalog/CreateBanners/Bannerscreating/AboutNewBanner';
import CustomNewBanner from './catalog/CreateBanners/Bannerscreating/CustomNewBanner';
import ContactBanner from './catalog/CreateBanners/ContactBanner';
import ContactNewBanner from './catalog/CreateBanners/Bannerscreating/ContactNewBanner';
import CategoryDetails from './catalog/CategoryDetails';
import Shopalldataanalytics from './shopanalyticsdata/Shopalldataanalytics';
import ChristmasTheme from './Christmas/ChristmasTheme';
import GlobalSnowfall from './Christmas/ChristmasTheme';
import SantaLottie from './Christmas/SantaClaus';
import ImagePopup from './ImagePopup/ImagePopup';
import Shopallpopup from './ShopAllPopup/Shopallpopup';
import axios from 'axios';
import { server } from './server';
import ShopAllStocks from './ShopallStocks/ShopAllStocks';




// import MyChatbot from './chatbot/Chatbotmsg';
// import Chatbotmsg from './chatbot/Chatbotmsg';

// import ReactGA from 'react-ga';
// ReactGA.initialize('G-DQ8YVWKBTB');
// ReactGA.pageview(window.location.pathname + window.location.search);

function App() {


 // Initialize Google Analytics
//  useEffect(() => {
//   ReactGA.initialize('G-DQ8YVWKBTB'); // Replace with your actual GA4 Measurement ID
//   ReactGA.pageview(window.location.pathname + window.location.search);
// }, []);
// useEffect(() => {
//   // Trigger a page view on route change
//   window.gtag('config', 'G-E1YSJRP0GY', {
//     page_path: location.pathname + location.search,
//   });
// }, [location]);
  useEffect(() => {
  // Delay the gtag page view event
  const timeoutId = setTimeout(() => {
    window.gtag('config', 'G-E1YSJRP0GY', {
      page_path: window.location.pathname + window.location.search,
    });
  }, 9000); // 5-second delay (adjust the time as needed)

  return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
}, [location]);




  const dispatch = useDispatch();

  


  useEffect(() => {
   
      // Fetch initial products

      dispatch(getAllProducts(20, 0)); // Fetch the first 40 products

      dispatch(getAllProducts(540, 20));
       // Fetch the next 200 products
       Store.dispatch(loadUser())
       Store.dispatch(loadSeller())
       Store.dispatch(getAllEvents());

    
   
  }, [dispatch])

  // useEffect(() => {
  //   // Load the user and seller immediately for authentication purposes
  //   Store.dispatch(loadUser());
  //   Store.dispatch(loadSeller());
  
  //   // Delay fetching of products and events to allow the initial page load
  //   setTimeout(() => {
  //     Store.dispatch(getAllProducts());
  //   }, 3000); // 2-second delay
  
  //   setTimeout(() => {
  //     Store.dispatch(getAllEvents());
  //   }, 5000); // 4-second delay
  // }, [dispatch]);
  

  useEffect(() => {
    captureReferralCode();
  }, []);




  const shouldHideNavbar = location.pathname === '/dashboard' ||
    location.pathname.startsWith('/admin-manage') ||
    location.pathname.startsWith('/dashboard-create-product') ||
    location.pathname.startsWith('/dashboard-products') ||
    location.pathname.startsWith('/catalog') ||
    location.pathname.startsWith('/create-category') ||
    location.pathname.startsWith('/dashboard/categories/create') ||
    location.pathname.startsWith('/dashboard-create-event') ||
    location.pathname.startsWith('/dashboard-events') ||
    location.pathname.startsWith('/dashboard-coupons') ||
    location.pathname.startsWith('/dashboard-orders') ||
    location.pathname.startsWith('/dashboard-refunds') ||
    location.pathname.startsWith('/settings') ||

    location.pathname.startsWith('/dashboard-messages') ||
    location.pathname.startsWith('/dashboard-referral') ||
    location.pathname.startsWith('/dashboard-requests') ||
    location.pathname.startsWith('/dashboard-Contactus') ||
    location.pathname.startsWith('/dashboard-ratecard') ||
    location.pathname.startsWith('/dashboard-allusers') ||
    location.pathname.startsWith('/dashboard-allspin') ||
    location.pathname.startsWith('/dashboard-currency') ||
    location.pathname.startsWith('/create-Banners') ||

    location.pathname.startsWith('/dashboard/categories/view/:categoryId') ||
    location.pathname.startsWith('/dashboard-analytics') ||
    location.pathname.startsWith('/dashboard-popup') ||
    location.pathname.startsWith('/dashboard-stocks') ||



    
    



    


    

    location.pathname.startsWith('/order/:id')



  useEffect(() => {

    const delay = {
      origin: "top",
      distance: "80px",
      delay: 300,
      reset: true
    }

    const delayleft = {
      origin: "left",
      distance: "80px",
      delay: 400,
      reset: true
    }
    const delaybottom = {
      origin: "top",
      distance: "80px",
      delay: 500,
      reset: true
    }

    const interval = {
      origin: "top",
      distance: "80px",
      duration: 2000,
      interval: 300,
      reset: true,
    };
    const inta = {
      origin: "top",
      distance: "80px",
      duration: 1000,
      interval: 800,
      reset: true,
      scale: 1.3
    };


    setTimeout(() => {
      ScrollReveal().reveal(".shippingimg", delayleft);
      ScrollReveal().reveal('.shippingcontent', delay);
      ScrollReveal().reveal('.parentproductcard', interval);

    }, 0); // Adjust timeout as needed

  }, []); // Only run on initial mount


 

  // useEffect(() => {
  //   // Get the timestamp of when the popup was shown
  //   const popupTimestamp = localStorage.getItem("popupTimestamp");

  //   // Get the current time
  //   const currentTime = new Date().getTime();
  //   const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  //   // If the popup was shown more than 3 days ago or it's the first time visit
  //   if (!popupTimestamp || currentTime - popupTimestamp > threeDaysInMillis) {
  //     setShowPopup(true);
  //     localStorage.setItem("popupTimestamp", currentTime.toString()); // Set the new timestamp
  //     localStorage.removeItem("hasSeenPopup"); // Reset the 'hasSeenPopup' flag
  //   } else {
  //     // Otherwise, the user has already seen the popup and it's within the 3-day limit
  //     const hasSeenPopup = localStorage.getItem("hasSeenPopup");
  //     if (!hasSeenPopup) {
  //       setShowPopup(true);
  //       localStorage.setItem("hasSeenPopup", "true"); // Mark the popup as shown
  //     }
  //   }
  // }, []);



    // // Show the popup when the page loads
    // useEffect(() => {
    //   setShowPopup(true);
    // }, []);

   

  console.log(location,"location address")
  return (
    <div>
       <Helmet>
        <title>Safe, Certified and Registered Natural Diamond & Gold jewellery for infants and Kids</title>
        <meta name="description" content="Certified gold diamond & silver and CZ kid's jewellery at Tiny Tiaraa. Quality & safety-first pieces. Perfect fit for sensitive skin. Free shipping & 48-hour delivery*." />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/" />

      </Helmet>

      <MetaPixelTracker />

      



      <PriceRangeProvider>


        {!shouldHideNavbar && <Navbar1 />}

        {/* <GlobalSnowfall/> */}


        {/* <SantaLottie /> */}

        {/* {!shouldHideNavbar && <div>
        
            {(showPopup   && livePopup) ? (
              <ImagePopup  onClose={() => setShowPopup(false)} />
            ) : null}
          </div>

         } */}

        


        <ScrollToTopButton />

        {/* <Chatbotmsg /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/personalised-prosperity' element={<CustomisedJewels />} />
          <Route path='/contacts' element={<Conatct />} />


          <Route path='/terms-and-conditions' element={<TermsCon />} />
          <Route path='/privacy-policy' element={<Privacy />} />
          <Route path='/warranty-extension' element={<Exchange />} />
          <Route path='/exchange-policy' element={<ExchangePolicy />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/affiliate-program-commission-policy' element={<Affiliatepolicy />} />
          <Route path='/gold-jewellery-insurance-policy' element={<Goldinsurance />} />

          <Route path='/children-safety-jewellery-policy' element={<Childrensafety />} />
          <Route path='/customised-jewellery-policy' element={<CustomisedPolicy />} />
          <Route path='/gold-coin-promotion-with-personalised-horoscope-engraving-policy' element={<Engravingpolicy />} />
          <Route path='/gold-and-diamond-jewellery-certification-policy' element={<CertificationPolicy />} />




          <Route path='/spinandwin' element={<SpinandWin />} />


          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:name' element={<ProductDetailsPage />} />


          <Route path='/silver' element={<Silver />} />



          <Route path='/profile' element={
            <ProtectedRoute >

              <ProfilePage />
            </ProtectedRoute>} />

          <Route path='/user/order/:id' element={
            <ProtectedRoute >

              <OrderDetailspage />
            </ProtectedRoute>} />

          <Route path='/referrals' element={
            <ProtectedRoute >

              <ReferPage />
            </ProtectedRoute>} />



          <Route path='/user/track/order/:id' element={
            <ProtectedRoute >
              <TrackOrderPage />
            </ProtectedRoute>} />

          <Route path='/inbox' element={
            <ProtectedRoute >
              <UserInbox />
            </ProtectedRoute>} />



          <Route path='/shop-create' element={<ShopcreatePage />} />
          <Route path='/seller/activation/:activation_token' element={<SellerActivatinPage />} />
          <Route path='/shop-login' element={<ShopLoginPage />} />
          <Route path='/admin-manage/:id' element={
            <SellerProtectedRoute >
              <ShopHomePage />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard' element={
            <SellerProtectedRoute >
              <ShopDashboardPage />
            </SellerProtectedRoute>
          } />


          <Route path='/settings' element={
            <SellerProtectedRoute >
              <ShopSettingPage />
            </SellerProtectedRoute>
          } />


          <Route path='/catalog' element={
            <SellerProtectedRoute >
              <CatalogPage />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard/categories/create' element={
            <SellerProtectedRoute >
              <NewCategoryPage />
            </SellerProtectedRoute>
          } />



          <Route path='/create-category' element={
            <SellerProtectedRoute >
              <Categoriespage />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-orders' element={
            <SellerProtectedRoute >
              <ShopAllOrders />
            </SellerProtectedRoute>
          } />

          

          <Route path='/dashboard-create-product' element={
            <SellerProtectedRoute >
              <ShopCreateProductPage />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-create-event' element={
            <SellerProtectedRoute >
              <ShopCreateEvents />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-events' element={
            <SellerProtectedRoute >
              <ShopAllEvents />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-coupons' element={
            <SellerProtectedRoute >
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-products' element={
            <SellerProtectedRoute >
              <ShopAllProducts />
            </SellerProtectedRoute>
          } />

        <Route path='/dashboard-stocks' element={
                    <SellerProtectedRoute >
                      <ShopAllStocks />
                    </SellerProtectedRoute>
                  } />

          <Route path='/dashboard-refunds' element={
            <SellerProtectedRoute >
              <ShopAllRefunds />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-referral' element={
            <SellerProtectedRoute >
              <ShopAllReferral />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-requests' element={
            <SellerProtectedRoute >
              <ShopAllRequests />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-Contactus' element={
            <SellerProtectedRoute >
              <ShopContactReq />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-ratecard' element={
            <SellerProtectedRoute >
              <ShopRateCardPage />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-allusers' element={
            <SellerProtectedRoute >
              <ShopAllUsers />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-allspin' element={
            <SellerProtectedRoute >
              <ShopAllSpin />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-currency' element={
            <SellerProtectedRoute >
              <ShopCurrency />
            </SellerProtectedRoute>
          } />




          <Route path='/shopproduct/:id' element={
            <SellerProtectedRoute >
              <ShopProductDetailsPage />
            </SellerProtectedRoute>
          } />
          <Route path='/editproduct/:id' element={
            <SellerProtectedRoute >
              <ShopEditProductPage />
            </SellerProtectedRoute>
          } />


          <Route path='/dashboard-analytics' element={
            <SellerProtectedRoute >
              <Shopalldataanalytics />
            </SellerProtectedRoute>
          } />

          <Route path='/dashboard-popup' element={
            <SellerProtectedRoute >
              <Shopallpopup />
            </SellerProtectedRoute>
          } />





          <Route path='/dashboard-messages' element={
            <SellerProtectedRoute >
              <ShopInboxPage />
            </SellerProtectedRoute>
          } />


          <Route path='/order/:id' element={
            <SellerProtectedRoute >
              <ShopOrderDetails />
            </SellerProtectedRoute>
          } />

        <Route path="/payu/order/success" element={<PayUSuccess />} />

          <Route path='/cart' element={<Cartpage />} />
          <Route path='/checkout-page' element={<CheckoutPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/order/success' element={<OrderSuccessPage />} />


          <Route path='/*' element={<Error404/>} />



          {/* dynamic routes starts here  */}

          <Route path='/create-Banners' element={<ShopCreateBanner />} />
          <Route path='/dashboard/banner/edit/:id' element={<NewBanner />} /> 
          <Route path='/dashboard/banner/create' element={<NewBanner />} />

          {/* about banners  */}
          <Route path='/dashboard/aboutbanner/edit/:id' element={<AboutNewBanner />} /> 
          <Route path='/dashboard/aboutbanner/create' element={<AboutNewBanner />} />
          

          {/* custom banners  */}
          <Route path='/dashboard/custombanner/edit/:id' element={<CustomNewBanner />} /> 
          <Route path='/dashboard/custombanner/create' element={<CustomNewBanner />} />
         

          {/* custom banners  */}
          <Route path='/dashboard/contactbanner/edit/:id' element={<ContactNewBanner />} /> 
          <Route path='/dashboard/contactbanner/create' element={<ContactNewBanner />} />


        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

        />
        {/* <CurrencySelector /> */}

        {!shouldHideNavbar &&  <Footer />}
       

      </PriceRangeProvider>

    </div>
  )
}

export default App
