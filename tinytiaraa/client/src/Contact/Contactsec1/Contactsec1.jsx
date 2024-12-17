// import React from "react";
// import "./Conatctsec1.css";
// import contactbanner from './contactbanner.png'

// function Contactsec1() {
//   return (
//     <div className="slidersec">
//       <img loading="lazy" src={contactbanner} alt="Third Slide" />
//     </div>
//   );
// }

// export default Contactsec1;


import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Conatctsec1.css";
import { imgdburl, server } from "@/server";
import contactbanner from './contactbanner.png'


function Contactsec1() {
  // Fetch contact banners using React Query
  const { data: banners, isLoading, error } = useQuery(
    'contactBanners',
    async () => {
      const response = await axios.get(`${server}/get-allcontactbanners`);
      if (response.data.success) {
        return response.data.banners.sort((a, b) => a.order - b.order);
      }
      throw new Error("Failed to fetch contact banners");
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="slidersec">
        <img
          src={contactbanner}
          alt="Loading..."
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>Error loading contact banners</div>;
  }

  // Select the first banner to display
  const banner = banners?.[0];

  return (
    <div className="slidersec">
      {banner ? (
        <img
          loading="lazy"
          src={`${imgdburl}${banner.images[0].url}`}
          alt={banner.title || "Contact Us banner"}
        />
      ) : (
        <div>No banner available</div>
      )}
    </div>
  );
}

export default Contactsec1;
