import React from 'react'
import "./WhyPage.css"
import img1 from './whyimages/img1.svg'
import img2 from './whyimages/img2.svg'
import img3 from './whyimages/img3.svg'
import img4 from './whyimages/img4.svg'
import img5 from './whyimages/img5.svg'
import img6 from './whyimages/img6.svg'
import img7 from './whyimages/img7.svg'
import { BiSolidCheckShield } from 'react-icons/bi'


// <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/t7yyf96moetz77k1xd2q.webp" alt="" />
//           <img  loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/vlpi0c0br3sgyb0evfzt.svg" alt="" />
//           <img  loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/w3ch9irup1m4flpyfll1.svg" alt="" className='object-contain'/>
//           <img  loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/yzyhxaclamwrl8nx2hmj.svg" alt="" />
//           <img  loading='lazy'  src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/ojnoilbzdykmn3yh7wa8.svg" alt="" />

//           <img  loading='lazy'  src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/pqgeij2csqbbiwe6rhhy.svg" alt="" />

function WhyPage() {
  return (
    <div className='whypage'>
      <div className='whypagecon'>
        <h5>Why Tiny Tiaraa ?</h5>
        <span>Delight your little ones with our enchanting collection of  Infants & kids jewelry</span>
      </div>

      <div className='whypiconcon'>
        <div className='whypiconconflex'>
          <img loading='lazy' src={img1} alt="" />

          <div>
            <h6>Hypoallergenic Materials</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          {/* <img  loading='lazy' src={img2} alt="" /> */}
                  <img  loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/vlpi0c0br3sgyb0evfzt.svg" alt="" />

          <div>
            <h6>SGL Certified Jewelry</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          {/* <img  loading='lazy' src={img3} alt="" className='object-contain'/> */}
                    <img  loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/whypageicon/w3ch9irup1m4flpyfll1.svg" alt="" className='object-contain'/>

          <div>
            <h6>Crafted with Love</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img  loading='lazy' src={img4} alt="" />

          <div>
            <h6>Customizable Options</h6>
          </div>
        </div>

      
        <div className='whypiconconflex'>
          {/* <img  src={img5} alt="" /> */}
          <BiSolidCheckShield className='sholidcheck' />

          <div>
            <h6>BIS Certified</h6>
          </div>
        </div>

        <div className='whypiconconflex'>
          <img  loading='lazy'  src={img6} alt="" />

          <div>
            <h6>Age-Appropriate Styles</h6>
          </div>
        </div>
        <div className='whypiconconflex'>
          <img  loading='lazy'  src={img7} alt="" />

          <div>
            <h6>Free Delivery Services</h6>
          </div>
        </div>




      </div>


    </div>
  )
}

export default WhyPage
