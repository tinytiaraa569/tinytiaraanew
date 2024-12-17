// import React from 'react'
// import './Aboutwho.css'
// import aboutbanner1 from './aboutbanner1.jpg'

// function Aboutwho() {
//   return (
//     // <div className='Aboutwho mb-1'>
//     //   <div className="aboutwhosection">
//     //     {/* <div className="whosecioncontent">
//     //         <h1>Who we are</h1>
//     //         <p>Welcome to Tiny Tiaraa, your enchanting destination for exquisitely crafted kids' jewellery that ignites the sparkles in young hearts! We believe that every little prince and princess deserves to feel special, and that's why we've dedicated ourselves to creating magical jewellery pieces that capture the wonder and innocence of childhood.</p>
//     //     </div> */}

//     //   </div>
//     // </div>

//     <div className="slidersec">
//           <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/banners/about/136708ec7d9b2b488523.webp"  alt="Tiny Tiaraa's kids' jewelry banner showcasing elegant designs for children"  />
//         </div>
//   )
// }

// export default Aboutwho

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './Aboutwho.css';
import { imgdburl, server } from '@/server';

const Aboutwho = () => {
  // Fetch a banner using React Query
  const { data: banners, isLoading, error } = useQuery(
    'aboutBanner',
    async () => {
      const response = await axios.get(`${server}/get-allaboutbanners`);
      if (response.data.success) {
        return response.data.banners.sort((a, b) => a.order - b.order);
      }
      throw new Error('Failed to fetch banners');
    }
  );

  // Render loading state
  if (isLoading) {
    return (
      <div className="slidersec cursor-pointer">
        <img
          src="https://backend.tinytiaraa.com:8000/uploads/images/banners/about/136708ec7d9b2b488523.webp"
          alt="Loading..."
        />
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div>Error loading banners</div>;
  }

  // Display the first banner as per your requirement
  const banner = banners?.[0];

  return (
    <div className="slidersec">
      {banner ? (
        <img
          loading="lazy"
          src={`${imgdburl}${banner.images[0].url}`}
          alt={banner.title || "Tiny Tiaraa's kids' jewelry banner"}
        />
      ) : (
        <div>No banner available</div>
      )}
    </div>
  );
};

export default Aboutwho;

