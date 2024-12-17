import React from 'react'
import './Aboutsection4.css'
import { useNavigate } from 'react-router-dom'
function AboutSection4() {
  const navigate = useNavigate()
  return (
    <div className='Aboutsection4'>
      <div className='ourvisionsec'>
        <h4>Our Vision</h4>
        <div className='w-full text-center mt-5 flex justify-center'>

          <p>Our vision at Tiny Tiaraa is to be the beacon of childhood magic, where every piece of jewelry becomes a cherished memory.
            We believe in nurturing a sense of wonder and individuality in children by offering jewelry that resonates with their dreams and aspirations. Our pieces are more than accessories; they're tiny companions on a child's journey of self-discovery and imagination.</p>
        </div>
      </div>
      <div className='ourvisionsec mt-8'>
        <h4>Our Story</h4>
        <div className='w-full text-center mt-5 flex justify-center'>

          <p>Tiny Tiaraa is a jewelry brand that believes in the power of the five elements of nature to bring joy and wonder to children. Our jewelry is handcrafted with love and care using only the finest materials, and it is inspired by the natural world. We believe that every child deserves to feel special, and our jewelry is designed to help them do just that.  Our jewelry is made with hypoallergenic materials that are safe for children to wear, and we use only non-toxic finishes. We also ensure that our jewelry is durable enough to withstand the wear and tear of everyday play.</p>
        </div>
      </div>






    </div>
  )
}

export default AboutSection4
