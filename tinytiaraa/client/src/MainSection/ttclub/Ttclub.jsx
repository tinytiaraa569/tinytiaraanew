import React, { useState } from "react";
import "./ttclub.css";
import ttclubvideo from "./ttclub.mp4";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import swal from "sweetalert";

function Ttclub() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false); // State to track email errors

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before submitting
    if (!validateEmail(email)) {
      setEmailError(true); // Set email error to true if invalid
      return; // Prevent form submission if email is invalid
    }

    setEmailError(false); // Reset email error if valid

    // Proceed with API call if validation passes
    axios
      .post(`${server}/ttclub/ttclub`, { email })
      .then((res) => {
        swal({
          title: "Thank you!",
          text: "You're Subscribed to TT Member's Club!",
          icon: "success",
        });
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="ttclub">
      <div className="videocon">
        <video loading='lazy' autoPlay muted loop src={ttclubvideo}></video>
      </div>
      <div className="ttclubmain">
        <div className="ttclubmainadjust">
          <h1>Join the TT Club</h1>
          <p>Enter your email address here</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: 'red' }}>Invalid email address</p>} {/* Error message */}
            <button type="submit">Join Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ttclub;
