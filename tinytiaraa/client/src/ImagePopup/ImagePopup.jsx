import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { gsap } from "gsap";
import { imgdburl, server } from "@/server";
import axios from "axios";

Modal.setAppElement("#root");

const ImagePopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const popupContentRef = useRef(null); // Create a reference to the popup content
  const [imageUrl, setImageUrl] = useState(null); 

  useEffect(() => {
    // Fetch all popups from the API
    const fetchPopups = async () => {
      try {
        const response = await axios.get(`${server}/get-allpopup`);
        console.log(response.data.popup,"respnoe ")
        if (response.data.success) {
          // Find the popup with isLive = true
          const livePopup = response.data.popup.find(popup => popup.isLive === true);
          if (livePopup && livePopup.bannerimg) {
            setImageUrl(livePopup.bannerimg.url); // Assuming the image URL is in the 'url' field of 'bannerimg'
          }
        }
      
      } catch (error) {
        console.error("Error fetching popups:", error);
      }
    };

    fetchPopups();
  }, []); // Runs once when the component mounts



  // GSAP Animation for Opening with Continuous Bounce
  useEffect(() => {
    if (isOpen) {
      // Delay the animation to ensure the modal has rendered
      const timeoutId = setTimeout(() => {
        gsap.fromTo(
          popupContentRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1.02,
            duration: 1,
            ease: "back.out(1.7)",
            repeat: -1, // Keep repeating the animation
            yoyo: true, // Bounce back and forth
          }
        );
      }, 100); // Adjust the delay time if needed

      // Cleanup function to clear the timeout and stop any ongoing animations
      return () => {
        clearTimeout(timeoutId);
        gsap.killTweensOf(popupContentRef.current); // Kill previous animations if modal is closed
      };
    }
  }, [isOpen]);

  const closeModal = () => {
    gsap.to(popupContentRef.current, {
      opacity: 0,
      scale: 0.3,
      duration: 0.5,
      ease: "back.in(1.7)",
    });
    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 500);
  };

  if (!isOpen || !imageUrl) return null;

  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          backdropFilter: "blur(5px)",
        },
        content: {
          border: "none",
          background: "transparent",
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
          maxWidth: "45vw",
          maxHeight: "70vh",
          overflow: "hidden",
          borderRadius: "20px",
          
        },
      }}
    >
      <div className="popup-container">
        <div ref={popupContentRef} className="popup-content" onClick={closeModal}>
          <img
            src={`${imgdburl}${imageUrl}`}
            alt="Popup"
            className="popup-image !object-cover"
          />
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImagePopup;
