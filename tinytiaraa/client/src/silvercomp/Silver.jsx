import React, { useEffect } from 'react';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function Silver() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const silverdata = [
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1728039351/silver/owjlwvbskeyay4xjdcqz.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959328/silver/rvmc85wfnctwmqtjpy4d.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959185/silver/hs5lqi8hdaglrwfqsjup.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1728039341/silver/zi6s76frdjuyxkfloknp.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959305/silver/ocqmudrgy8hlziltubxf.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1728039363/silver/ppwig2hmooxsb0oarlg3.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959214/silver/apapudlzfwsmd9hkk4ko.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959199/silver/v9hk7rsgxnxg191qgiuh.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959292/silver/qlqge9utokwpdyu7pcxs.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959252/silver/ukjhljd753px9mrdwyas.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1727959233/silver/cmizfvzfwg2crqtpd1eb.png" },
    { url: "https://res.cloudinary.com/ddaef5aw1/image/upload/v1728039330/silver/c1og62cnyjyuzpsrmmjq.jpg" },

  ];

  return (
    <div className="h-[100%] mx-auto px-10 pb-5">
        <h1 className='p-5 mt-4 px-3 text-center text-[#0008]'>Exciting new silver products are coming soon—stay tuned for the latest collections!</h1>
      <div className="mt-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-8 pb-5">
        {silverdata.map((item, index) => (
          <Zoom 
          zoomMargin={40} 
          defaultStyles={{ overlay: { zIndex: 1000 } }} 
          onZoom={() => setIsZoomed(true)} // Set zoomed state to true when the modal opens
          onUnzoom={() => setIsZoomed(false)} // Reset when it closes
          >
          <img
          loading='lazy'
            key={index}
            src={item.url}
            alt={`silver-${index}`}
            className="w-full h-[300px] object-contain shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 border border-gray-200 !cursor-pointer "
          />
          </Zoom>
        ))}
      </div>
    </div>
  );
}

export default Silver;
