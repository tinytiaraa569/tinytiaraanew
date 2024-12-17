import React from "react";
import { FaUserPlus, FaLink, FaShareAlt, FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./Safety.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import refernewbanner from "./refernewbanner.gif";

const Safety = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus size={40} />,
      title: "Sign Up",
      description: "Create an account on our platform to get started & Earn.",
    },
    {
      id: 2,
      icon: <FaLink size={40} />,
      title: "Generate Link",
      description: "Generate your unique referral link from your dashboard.",
    },
    {
      id: 3,
      icon: <FaShareAlt size={40} />,
      title: "Share",
      description: "Share your referral link with your friends and family & Earn.",
    },
    {
      id: 4,
      icon: <FaGift size={40} />,
      title: "Get Reward",
      description:
        "Get 5% for every order; rewards will be credited 7 days after acceptance.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    
  };

  return (
    <>
      <div className="refermain">
        <div className="refermainimg">
          <img src="https://backend.tinytiaraa.com:8000/uploads/images/referbanner/gjy47mmbywemijnbu1o6.gif" alt="" />
        </div>
        <div className="refermaincontent">
          <div className="referheading">
            <h1>Referral Program</h1>
            <p>
              Invite your friends to shop at Tiny Tiaraa and give them a special
              5% discount on their first purchase. As a thank you, you'll earn
              rewards up to 5% off.
            </p>
          </div>

          {/* Regular display above 569px */}
          <div className="refersteps regular-steps">
            {steps.map((step) => (
              <div
                key={step.id}
                className="referstep"
                onClick={() =>
                  isAuthenticated
                    ? navigate("/referrals")
                    : navigate("/sign-up")
                }
              >
                <div className="referstepno">
                  <h1>{`0${step.id}`}</h1>
                </div>
                <div className="refersteptext">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#006039] text-[#ffffff] rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slider display below 569px */}
          <div className="slider-steps custom-slider">
            <Slider {...settings}>
              {steps.map((step) => (
                <div className="slidersafteryadjust">
                  <div
                  key={step.id}
                  className="referstep"
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/referrals")
                      : navigate("/sign-up")
                  }
                >
                  <div className="referstepno">
                    <h1>{`0${step.id}`}</h1>
                  </div>
                  <div className="refersteptext">
                    <div className="w-20 h-20 flex items-center justify-center bg-[#006039] text-[#ffffff] rounded-full mb-4">
                      {step.icon}
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-5" >
            <button className="referbtnnew" onClick={()=>{navigate("/sign-up")}}>Join us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Safety;
