import React, { useState, useEffect } from "react";
import "./Morepage.css";
import { useNavigate } from "react-router-dom";
import custom1img from './custom1.png'
import custom2img from './custom2.png'
import custom3img from './custom3.png'
import custom4img from './custom4.png'


function Customise() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Content and images for each step
  const steps = [
    {
      image:custom1img,
        
      title: "Upload Your Design",
      description:
        "Share your unique design ideas with us! Simply upload your sketches, images, or inspirations, and our expert team will work with you to bring your vision to life.",
    },
    {
      image:custom2img,
      title: "Get the Costing",
      description:
        "Once we have your design, we’ll provide a clear and transparent estimate based on your preferences. You’ll know the full cost upfront, so you can plan with confidence.",
    },
    {
      image:custom3img,
      title: "Jewelry Manufacturing",
      description:
        "Our expert artisans will handcraft your design with the finest materials, ensuring it’s safe, hypoallergenic, and perfect for your little one’s daily wear. Watch your creation come to life!",
    },
    {
      image:custom4img,
      title: "Receive Your Jewelry",
      description:
        "Once your jewelry is ready and any outstanding issues are resolved, we’ll complete quality checks and deliver it to your address.",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
      }, 4000); // Change step every 6 seconds

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [isPaused, steps.length]);

  return (
    <div className="bgcustomize">
      <div className="customenew">
        <div className="customenewheading">
          <h1>Customize Your Jewelry</h1>
        </div>

        <div className="customenewflex">
          {/* Image Section */}
          <div className="leftcustomimg">
            <img
              loading="lazy"
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
            />
          </div>

          {/* Stepper Section */}
          <div className="stepper">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`cursor-pointer step ${
                  index === currentStep ? "active" : ""
                }`}
                onClick={() => setCurrentStep(index)}
                onMouseEnter={() => setIsPaused(true)} // Pause on hover
                onMouseLeave={() => setIsPaused(false)} // Resume on hover leave
              >
                <div className="circle">{index + 1}</div>
                {index < steps.length - 1}
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="rightcustomcontent">
            <h1>{steps[currentStep].title}</h1>
            <p>{steps[currentStep].description}</p>
            <button
              onMouseEnter={() => setIsPaused(true)} // Pause on hover
              onMouseLeave={() => setIsPaused(false)} // Resume on hover leave
              onClick={() => {
                navigate("/personalised-prosperity");
              }}
            >
              Customize Your Jewelry
            </button>

            {/* <p className="text-[#000000d6] text-[13px] mt-2">Coming Soon..</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customise;
