import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slidertext.css'
import { useNavigate } from 'react-router-dom';

function Slidertext() {
    const navigate = useNavigate()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
    };
    return (
        <div className='slidertext'>
            <div className="slidertextleft">
                <div className="sliderleftadjust">

                    <h1>Kid-Safe and Playful</h1>
                    <p>Our Proudly Designed Children's Jewelry Collection</p>
                    <button onClick={()=>{navigate("/products")}}>Check-It-Out</button>
                </div>
            </div>
            <div className="slidertextright">
                <Slider {...settings}>
                    <div className='sliderrightimg'>
                        <img className='shadowfilterimgod' src="https://backend.tinytiaraa.com:8000/uploads/images/products/mitharfwyizojclawhpk.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img className='shadowfilterimgod' src="https://backend.tinytiaraa.com:8000/uploads/images/products/yz0szvwhccnhl1fhrbtc.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img className='shadowfilterimgod' src="https://backend.tinytiaraa.com:8000/uploads/images/products/tir9k74t1qr2s8ht8otx.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img className='shadowfilterimgod' src="https://backend.tinytiaraa.com:8000/uploads/images/products/ed4ipy6itiaselgwf9jg.png" alt="" />
                    </div>
                    <div className='sliderrightimg'>
                        <img className='shadowfilterimgod' src="https://backend.tinytiaraa.com:8000/uploads/images/products/dvs1rd5zhsabkjcfdfmd.png" alt="" />
                    </div>

                </Slider>
            </div>

        </div>
    )
}

export default Slidertext
