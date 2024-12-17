import React from 'react'
import './FollowUS.css'
import { SiFacebook } from "react-icons/si";
import { FaInstagram, FaPinterest, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function FollowUS() {
    return (
        <div className='followus'>
            <div className='followheading'>
                <h1>Follow Us</h1>
                <p>Join Us & Save more on your favourite products</p>
            </div>


            <div className="socialvariants">
                <Link to="https://www.facebook.com/people/Tiny-Tiaraa/61551799145871" target="_blank" >
                    <div className="socailcardfollow socialfb">
                        <SiFacebook className='socialiconfollow' />
                        <span>Facebook</span>

                    </div>
                </Link>

                <Link to="https://web.whatsapp.com/send?phone=+91%208657062511" target="_blank" >
                <div className="socailcardfollow socialwhatsapp">
                    <FaWhatsapp className='socialiconfollow' />
                    <span>WhatsApp</span>

                </div>
                </Link>

                <Link to="https://www.instagram.com/tiny_tiaraa" target="_blank" >

                <div className="socailcardfollow socialinsta">
                    <FaInstagram className='socialiconfollow' />
                    <span>Instagram</span>

                </div>
                </Link>

                <Link to="https://www.instagram.com/tiny_tiaraa" target="_blank" >

                <div className="socailcardfollow socialpintrest">
                    <FaPinterest className='socialiconfollow' />
                    <span>Pinterest</span>

                </div>
               
                </Link>


                <Link to="">
                <div className="socailcardfollow socialyoutube">
                    <FaYoutube className='socialiconfollow' />
                    <span>Youtube</span>

                </div>
                </Link>

                
            </div>
        </div>
    )
}

export default FollowUS
