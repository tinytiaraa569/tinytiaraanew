import React from 'react'
import './Morepage.css'
import healthlogo from './images/health.svg'
import goodsimg from './images/goodimg.svg'
import gift from './images/gift.svg'


function MorePage() {
    return (
        <div className='Morepagesection'>
            <h1 className='text-[22px] font-[600]'>Shop With Confidence</h1>

            <div className="Morepagescetionmain">
                <div className="MorepagesectionCard">
                        <img style={{width:200,height:200,margin:"auto"}} src={healthlogo} alt="" />
                       <div className="conmore">
                       <h3>Quality & Safety First</h3>
                        <p>We prioritise safety for children's jewellery with quality and craftsmanship. Each item is meticulously crafted from hypoallergenic materials, perfect for sensitive skin.</p>
                       </div>
                </div>
                <div className="MorepagesectionCard">
                   <img style={{width:200,height:200,margin:"auto"}} src={goodsimg} alt="" />
                   <div className="conmore">

                    <h3>Perfect Fit, Endless Joy</h3>
                    <p>Children grow fast. Our jewellery grows with them. Perfect fit guaranteed. Need a different size? Contact us. Cherish your child's jewelry. Lasting memories to treasure.</p>
                   </div>
                </div>
                <div className="MorepagesectionCard">
                    <img style={{width:200,height:200,margin:"auto"}} src={gift} alt="" />
                    <div className="conmore">


                    <h3>Magical Gifting</h3>
                    <p>Tiny Tiaraa is the ideal spot for gifts that bring joy. Each piece comes beautifully packaged, ready to create cherished memories.</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MorePage

