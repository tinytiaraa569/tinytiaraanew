import React from 'react';
import Slider from 'react-slick';
import './Aboutsection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import about1img from './images/about1.svg';
import about2img from './images/about2.svg';
import about3img from './images/about3.svg';
import about4img from './images/about4.svg';

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
};

const Aboutsecion2 = () => {
  return (
    <div className='aboutsection2'>
      <div>
        <h1 className='text-[#01463A] font-[400] text-[30px] text-center'>Our Strengths</h1>
      </div>

      <div className="aboutcardsec">
        {/* Desktop view cards */}
        <div className="aboutcard flex justify-center flex-col items-center">
          <img src={about1img} alt="" />
          <div className="text-center">
            <h5>Join the Magic</h5>
            <div className="w-[215px] h-[auto] font-[400] text-[12px] text-center">
              <p>
                At Tiny Tiaraa, discover magical jewelry that lights up children's eyes and creates cherished, unforgettable moments—perfect for gifts and keepsakes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="aboutcard flex justify-center flex-col items-center">
          <img src={about2img} alt="" />
          <div className="text-center">
            <h5>Collections</h5>
            <div className="w-[215px] h-[auto] font-[400] text-[12px] text-center">
              <p>
                Our jewelry collections offer whimsical charms and elegant pieces, ensuring every child finds something that matches their unique style.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutcard flex justify-center flex-col items-center">
          <img src={about3img} alt="" />
          <div className="text-center">
            <h5>Safety First</h5>
            <div className="w-[215px] h-[100px] font-[400] text-[12px] text-center">
              <p>
                We prioritize safety by using hypoallergenic materials and strict quality checks, ensuring jewelry that parents trust and kids enjoy worry-free.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutcard flex justify-center flex-col items-center">
          <img src={about4img} alt="" />
          <div className="text-center">
            <h5>Craftsmanship</h5>
            <div className="w-[215px] h-[100px] font-[400] text-[12px] text-center">
              <p>
                Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutslider-steps aboutcustom-slider ">
        {/* Mobile view slider */}
        <Slider {...settings} >
          <div className="flex justify-center items-center">
            <div className="aboutcard flex justify-center flex-col items-center">
              <img src={about1img} alt="" />
              <div className="text-center">
                <h5>Join the Magic</h5>
                <div className="w-[215px] h-[auto] font-[400] text-[12px] text-center">
                  <p>
                    At Tiny Tiaraa, discover magical jewelry that lights up children's eyes and creates cherished, unforgettable moments—perfect for gifts and keepsakes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="aboutcard flex justify-center flex-col items-center">
              <img src={about2img} alt="" />
              <div className="text-center">
                <h5>Collections</h5>
                <div className="w-[215px] h-[auto] font-[400] text-[12px] text-center">
                  <p>
                    Our jewelry collections offer whimsical charms and elegant pieces, ensuring every child finds something that matches their unique style.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="aboutcard flex justify-center flex-col items-center">
              <img src={about3img} alt="" />
              <div className="text-center">
                <h5>Safety First</h5>
                <div className="w-[215px] h-[100px] font-[400] text-[12px] text-center">
                  <p>
                    We prioritize safety by using hypoallergenic materials and strict quality checks, ensuring jewelry that parents trust and kids enjoy worry-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="aboutcard flex justify-center flex-col items-center">
              <img src={about4img} alt="" />
              <div className="text-center">
                <h5>Craftsmanship</h5>
                <div className="w-[215px] h-[100px] font-[400] text-[12px] text-center">
                  <p>
                    Craftsmanship is our core. Every piece is meticulously handcrafted with quality materials, ensuring beauty, safety, and comfort for children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Aboutsecion2;
