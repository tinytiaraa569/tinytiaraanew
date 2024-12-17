// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './Slider.css';

// import slider1 from './sliderimages/slider1.png';
// // import slider2 from './slider2.png';
// // import slider3 from './slider3.png';
// import slider4 from './sliderimages/slider4.png';
// import slider5 from './sliderimages/slider5.jpg';
// import slider6 from './sliderimages/slider6.png';
// import slider7 from './sliderimages/slider7.png';
// import firstimg1 from './sliderimages/first1.png';
// import secondimg from './sliderimages/second.png';
// import thirdimg from './sliderimages/third.png';
// import newbanner1 from './sliderimages/newbanner1.jpg';

// import newbanner6 from './sliderimages/newbanner6.jpg';
// import newbanner3 from './sliderimages/newbanner3.jpg';
// import newbanner4 from './sliderimages/newbanner4.jpg';

// import newbanner5 from './sliderimages/newbanner5.png';
// import newbanner7 from './sliderimages/newbanner7.png';
// import navbanner3 from './sliderimages/navbanner3.jpg';
// import navbanner4 from './sliderimages/navbanner4.jpg';

// import navbanner2 from './sliderimages/navbanner2.jpg';

// import navoffer from './sliderimages/navoffer.jpg';
// import diwalioffer from './sliderimages/diwalioffer.jpg';



// import { useNavigate } from 'react-router-dom';
// import { imgdburl, server } from '@/server';
// import axios from 'axios';





// function SliderSection() {
//   const [banners, setBanners] = useState([]); // State to hold fetched banners

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 8000, // Slightly slower autoplay speed for better visibility
//     swipeToSlide: true,
//     responsive: [
//       {
//         breakpoint: 969,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: true,
//           arrows: false,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: true,
//           arrows: false,
//         },
//       },
//       {
//         breakpoint: 500,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   };
//   const navigate = useNavigate()
//   // useEffect(() => {
//   //   axios
//   //     .get(`${server}/get-allbanners`)  // Your API endpoint
//   //     .then(response => {
//   //       if (response.data.success) {
//   //         const sortedBanners = response.data.banners.sort((a, b) => a.order - b.order);
//   //         setBanners(sortedBanners); // Set the banner data
//   //       }
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching banners:', error);
//   //     });
//   // }, []);
//   // console.log(banners,"baners data")
//   return (
//     <>
//       <Slider {...settings}>
//       {(isLoading || !banners?.length) && (
//         <div className="slidersec cursor-pointer">
//           <img
//             src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/upglf2ndz3cgbfhnsgbk.webp"
//             alt="Default Slide"
//           />
//         </div>
//       )}
     

//      {banners?.map((banner) => (
//         <div key={banner._id} className="slidersec cursor-pointer">
//           {/* Check if there's a link and navigate to it */}
//           <img
//             loading="lazy"
//             src={`${imgdburl}${banner.images[0].url}`} // Dynamically construct the image URL
//             alt={banner.title}
//             // onClick={() => banner.link && navigate(`/${banner.link}`)} // Navigate to link if it exists
//           />
//         </div>
//       ))} 
        

//         {/* <div className="slidersec cursor-pointer">
//           <img loading='lazy' src={diwalioffer} alt="Slider Six" />
//         </div> */}
//         {/* bannner with web */}
//         {/* <div className="slidersec cursor-pointer" >
//           <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/snfilzvqmzpj83ck2kmp.webp" alt="Third Slide" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/lsuewidepylphulztw7t.webp" alt="Slider Six" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/czo3frgxqtg7yaovwrga.webp" alt="Slider Six" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/biysca21wcpzrvyrbjbc.webp" alt="Third Slide" />
//         </div> */}


//         {/* <div className="slidersec cursor-pointer" >
//           <img  src={navoffer} alt="Third Slide" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src={navbanner3} alt="Slider Six" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src={navbanner2} alt="Slider Six" />
//         </div>

//         <div className="slidersec cursor-pointer">
//           <img src={navbanner4} alt="Third Slide" />
//         </div> */}


//       {/* bannner with web */}
//       {/* <div className="slidersec cursor-pointer" >
//           <img loading='lazy' src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1728229445/slidersbanner/cxfxa1didovjio1rv1ag.webp" alt="Third Slide" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1728229885/slidersbanner/ymn55i9cb7mmaus8qikj.webp" alt="Slider Six" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1728230219/slidersbanner/czo3frgxqtg7yaovwrga.webp" alt="Slider Six" />
//         </div>
//         <div className="slidersec cursor-pointer">
//           <img loading='lazy' src="https://res.cloudinary.com/ddaef5aw1/image/upload/v1728230372/slidersbanner/fdt75zohk6h6iuzuhqun.webp" alt="Third Slide" />
//         </div> */}

        
//         {/* <div className="slidersec cursor-pointer" onClick={()=>{navigate("/products?category=Diamond%20Bracelets")}}>
//           <img src={newbanner6} alt="Third Slide" />
//         </div>
//         */}

        

//         {/* <div className="slidersec">
//           <img src={slider7} alt="Slider Seven" />
//         </div>
//         <div className="slidersec">
//           <img src={slider4} alt="Slider Four" />
//         </div> */}
//       </Slider>
//     </>
//   );
// }

// export default SliderSection;


import React from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';
import { useNavigate } from 'react-router-dom';
import { imgdburl, server } from '@/server';

const SliderSection = () => {
  const navigate = useNavigate();

  // Fetch banners using React Query
  const { data: banners, isLoading } = useQuery(
    'banners',
    async () => {
      const response = await axios.get(`${server}/get-allbanners`);
      if (response.data.success) {
        return response.data.banners.sort((a, b) => a.order - b.order);
      }
      throw new Error('Failed to fetch banners');
    }
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 969, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Render nothing until data is fetched
  if (isLoading) {
    return (
      <div className="slidersec cursor-pointer">
        <img
          src="https://backend.tinytiaraa.com:8000/uploads/images/slidersbanner/upglf2ndz3cgbfhnsgbk.webp"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {/* Map over banners once loaded */}
      {banners?.map((banner) => (
        <div key={banner._id} className="slidersec cursor-pointer">
          <img
            loading="lazy"
            src={`${imgdburl}${banner.images[0].url}`}
            alt={banner.title}
            // onClick={() => banner.link && navigate(`/${banner.link}`)}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderSection;
