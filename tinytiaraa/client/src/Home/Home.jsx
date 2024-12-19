import React, { useEffect, useState } from 'react'
import MainSection from '../MainSection/MainSection'
import { useAuth } from '../Context/auth'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import ImagePopup from '@/ImagePopup/ImagePopup';
import { server } from '@/server';
function Home() {

  const [showPopup, setShowPopup] = useState(false);
  const [livePopup, setLivePopup] = useState(null); // Store live popup data

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        // Fetch popups from the API
        const response = await axios.get(`${server}/get-allpopup`);
        const popups = response.data.popup;
        
        // Find the popup that is live
        const livePopup = popups.find(popup => popup.isLive === true);
        
        if (livePopup) {
          setLivePopup(livePopup); // Store the live popup
          
          // Get the timestamp of when the popup was shown
          const popupTimestamp = localStorage.getItem("popupTimestamp");

          // Get the current time
          const currentTime = new Date().getTime();
          const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

          // If the popup was shown more than 3 days ago or it's the first time visit
          if (!popupTimestamp || currentTime - popupTimestamp > threeDaysInMillis) {
            setShowPopup(true);
            localStorage.setItem("popupTimestamp", currentTime.toString()); // Set the new timestamp
            localStorage.removeItem("hasSeenPopup"); // Reset the 'hasSeenPopup' flag
          } else {
            // Otherwise, the user has already seen the popup and it's within the 3-day limit
            const hasSeenPopup = localStorage.getItem("hasSeenPopup");
            if (!hasSeenPopup) {
              setShowPopup(true);
              localStorage.setItem("hasSeenPopup", "true"); // Mark the popup as shown
            }
          }
        }
      } catch (error) {
        console.error("Error fetching popups:", error);
      }
    };

    // Delay the API call by 5 seconds
    const timeout = setTimeout(() => {
      fetchPopups();
    }, 20000); // 5-second delay

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, []); // Runs once when the component mounts



  return (
    <div>
       <Helmet>
        <title>Safe, Certified and Registered Natural Diamond & Gold jewellery for infants and Kids</title>
        <meta name="description" content="Certified gold diamond & silver and CZ kid's jewellery at Tiny Tiaraa. Quality & safety-first pieces. Perfect fit for sensitive skin. Free shipping & 48-hour delivery*." />
        <meta name="keywords" content="Infants jewellery kids jewellery children's jewellery infant jewellery gold jewellery for kids silver jewellery for kids Diamond Jewellery for kids and infants natural diamond jewellery for kids CZ diamond jewellery for kids jewellery for kids jewellery for children jewellery for infants fine jewellery for kids dainty jewellery for kids Princess jewellery for kids Birthday jewellery for kids Holiday jewellery for kids Gift jewellery for kids Gift Cards Gold Saving plans" />
        <link rel="canonical" href="/" />

      </Helmet>

      {(showPopup   && livePopup) ? (
              <ImagePopup  onClose={() => setShowPopup(false)} />
            ) : null
            }
         


      <MainSection />



    </div>
  )
}

export default Home
