import React from 'react';
import './Aboutsection3.css';
import founder from './images/founder.jpg';

function Aboutsection3() {
    return (
        <div className='aboutsection3'>
            <div className="linemaking"></div>

            <div className="founderinfo">
                <div className='mt-[25px] mb-[25px]'>
                    <h3>Rashmi Jain - Founder</h3>
                </div>

                <div className='mainfounderinfo'>
                    <div className='founderinformaiontext'>
                        <p className='infotext1'>
                        As a mother, I've always cherished the pure joy and innocence that children bring into our lives. When I started Tiny Tiaraa,
                         it was with a simple yet profound vision: to create a line of jewelry that would capture the magic of childhood.
                          But equally important was our commitment to ensuring the highest standards of safety and quality for our little ones. 
                          I wanted to offer parents like myself a collection of exquisite jewelry that not only complements the beauty of our children
                           but also stands up to the rigors of everyday wear. Each piece is designed with love, care, and a deep understanding of what
                           makes jewelry truly special for infants and kids.

                        </p>

                        <p className='infotext1 mt-6'>
                        We understand that children's jewelry should be more than just an accessory;
                             it should reflect their unique spirit and personality. I hope our jewelry adds a touch of sparkle to your child's journey and
                              becomes a keepsake you'll cherish forever. Thank you for being a part of the Tiny Tiaraa family! 
                        </p>

                        <p className='infotext1 mt-8'>With love and gratitude</p>
                    </div>

                    <div className="founderimg" onContextMenu={(e) => e.preventDefault()} >
                        <img loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/products/ul1cjxxwycebfjbz619h.webp" alt="Rashmi Jain - Founder" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutsection3;
