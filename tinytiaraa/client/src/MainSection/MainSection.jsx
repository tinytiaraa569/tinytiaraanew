import React from 'react'
import SliderSection from './Slider'
import Categories from './Categories'
import Shippingpage from './Shippingpage'
import WhyPage from './WhyPage'
import MorePage from './MorePage'
import Customise from './Customise'
import Safety from './Safety'
import Slidertext from './Sectionslider/Slidertext'
import CustomizedAccordions from './FreqAsk/Freq'
import Ttclub from './ttclub/Ttclub'
import NewArrivals from './newarrivals/NewArrivals'
import FollowUS from './FollowUS/FollowUS'
import { FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MainSection() {
  const navigate = useNavigate();

  const handleGiftClick = () => {
    navigate('/spinandwin'); // Navigate to Spin and Win page
  };

  return (
    <div>
      <SliderSection />
      <WhyPage />
      {/* <Shippingpage /> */}
      <Categories />
      {/* <MorePage /> */}
      <NewArrivals />
      <Customise />
      <Safety />
      <Slidertext />
      <CustomizedAccordions />
      <FollowUS />
      <Ttclub />

       {/* Fixed Gift Icon */}
       <div
        className="fixed bottom-8 left-6 bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-red-500 transition-transform transform hover:scale-110"
        onClick={handleGiftClick}
        title='spin and win'
      >
        <FaGift size={32} />
      </div>
    </div>
  )
}

export default MainSection
