import React from 'react';
import './Customisedsec3.css';
import shipping from './shipping.png'

function Customisedsec3() {
  return (
    <div className='Customisedsec3'>
      <div className='Customisedsec3parent'>
        <img src={shipping} alt="" />
        <div className='Customisedsec3child'>
          <h1>Fast, Secure Delivery</h1>
          <p>We understand that you're excited to wear your custom creation, so we've streamlined our production process to get your jewelry to you as swiftly as possible. In just 14 business days, your masterpiece will be delivered securely to your doorstep, ready to adorn your life with elegance and meaning.</p>
          <button>Get Started</button>
        </div>

      </div>
    
    </div>
  );
}

export default Customisedsec3;
