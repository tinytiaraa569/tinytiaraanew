// import React from 'react'
// import './Customised1.css'
// // import custombanner1 from './custombanner1.jpg'
// import custombanner3 from './custombanner3.jpg'


// function Customisedsec1() {
//   return (
//     // <div className='Customisedsec1'>
//     //     {/* <div className="customisedcon1">
//     //         <h1>Design Your Own Masterpiece</h1>
//     //     </div> */}

//     // </div>

//     <div>
//       <div className="slidersec sliderseccustom">
//         <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/custombanner/dsnfxccnwbqplfiinopd.webp" alt="Banner promoting customizable jewelry designs for children by Tiny Tiaraa"  />

//         <div className="text-overlay">
//           <h1>Customize Your Own Masterpiece</h1>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Customisedsec1

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './Customised1.css';
import { imgdburl, server } from '@/server';

const Customisedsec1 = () => {
  // Fetch custom banners using React Query
  const { data: banners, isLoading, error } = useQuery(
    'customBanners',
    async () => {
      const response = await axios.get(`${server}/get-allcustombanners`);
      if (response.data.success) {
        return response.data.banners.sort((a, b) => a.order - b.order);
      }
      throw new Error('Failed to fetch custom banners');
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="slidersec sliderseccustom">
        <img
          src="https://backend.tinytiaraa.com:8000/uploads/images/banners/custom/1c97d137106012d9156d.webp"
          alt="Loading..."
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>Error loading banners</div>;
  }

  // Select the first banner to display
  const banner = banners?.[0];

  return (
    <div>
      <div className="slidersec sliderseccustom">
        {banner ? (
          <img
            loading="lazy"
            src={`${imgdburl}${banner.images[0].url}`}
            alt={banner.title || "Banner promoting customizable jewelry designs for children by Tiny Tiaraa"}
          />
        ) : (
          <div>No banner available</div>
        )}

        <div className="text-overlay">
          <h1>Customize Your Own Masterpiece</h1>
        </div>
      </div>
    </div>
  );
};

export default Customisedsec1;
