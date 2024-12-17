import React from "react";
import logo1 from './images/logo1.svg'
import logo2 from './images/logo2.svg'
import logo3 from './images/logo3.svg'
import logo4 from './images/logo4.svg'


import './customised4.css'

function Customisedsec4() {
  return (
    <div className="Customisedsec4main bg-[#F3FFFD]">
      <div className="customised4flex">
        <div className="customised4card">
          <div className="customised4logo">
            <img src={logo1} alt="" />
          </div>

          <div className="customised4content">
            <h3>Step 1</h3>
            <p>To build a customized jewelry piece, upload the design along with the exact specifications asked. After filling in all the details, move on to the next step</p>
          </div>
        </div>
        <div className="customised4card">
          <div className="customised4logo">
            <img src={logo2} alt="" />
          </div>

          <div className="customised4content">
            <h3>Step 2</h3>
            <p>we'll create a digital format of your jewelry piece for you to review and verify the specifications. We'll also provide an estimated cost at this stage</p>
          </div>
        </div>
        <div className="customised4card">
          <div className="customised4logo">
            <img src={logo3} alt="" />
          </div>

          <div className="customised4content">
            <h3>Step 3</h3>
            <p>Once you confirm the design and specifications, we’ll await the token amount. After receiving it, we’ll begin the jewelry-making process and keep you updated</p>
          </div>
        </div>
        <div className="customised4card">
          <div className="customised4logo">
            <img src={logo4} alt="" />
          </div>

          <div className="customised4content">
            <h3>Step 4</h3>
            <p>Once your jewelry is ready and any outstanding issues are resolved, we’ll complete quality checks and deliver it to your address.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customisedsec4;
