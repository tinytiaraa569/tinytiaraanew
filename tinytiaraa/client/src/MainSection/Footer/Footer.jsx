import React from 'react'
import './Footer.css'
import { Link, useNavigate } from 'react-router-dom'

import logoimg from '../../Navbar1/logo.png'
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    const navigate = useNavigate()
    return (
        <div className="footermain">

            <div className='footer'>
                <div className="footerone">
                    <img src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/pgqpod1dbwdxo4kudbjl.webp" alt="" onClick={()=>navigate('/') } />
                </div>
                <div className="footertwo">
                    <h4 className='footerheading'>LOCATE US</h4>
                    <p>Tiny Tiaraa</p>
                    <p>A Brand By Ru-Brama  Retail Pvt Ltd.</p>
                    <p>Plot F-11 & 12-1, Second Floor, Admin Bldg., MIDC (Marol), Central Road, Opp. Seepz Main Gate, WICEL, Andheri(East), Mumbai-400093.</p>
                    <p className='footerp'>Contact Us: +91 86570 62511</p>
                    <p>Email: care@tinytiaraa.com</p>
                    <h4 className='footerconnect'>CONNECT</h4>
                    <div className="footericons mt-2 ">
                        <div className='footericonmain flex gap-3'>
                            <Link to="https://www.facebook.com/profile.php?id=61551799145871" target="_blank">
                                <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 0C4.94999 0 0 4.95884 0 11.0663C0 16.5884 4.02599 21.1717 9.28399 22V14.2691H6.48999V11.0663H9.28399V8.6255C9.28399 5.85342 10.923 4.32932 13.442 4.32932C14.641 4.32932 15.895 4.53916 15.895 4.53916V7.26707H14.509C13.145 7.26707 12.716 8.11747 12.716 8.98996V11.0663H15.774L15.279 14.2691H12.716V22C15.3081 21.589 17.6684 20.2611 19.3709 18.2561C21.0734 16.2511 22.0059 13.701 22 11.0663C22 4.95884 17.05 0 11 0Z" fill="white" />
                                </svg>

                            </Link>
                            <Link to="https://web.whatsapp.com/send?phone=+91%208657062511" target="_blank">
                                <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0442 0C5.00804 0 0.0884424 4.895 0.0884424 10.901C0.0884424 12.826 0.596985 14.696 1.54774 16.346L0 22L5.80402 20.482C7.40703 21.351 9.20904 21.813 11.0442 21.813C17.0804 21.813 22 16.918 22 10.912C22 7.997 20.8613 5.258 18.794 3.201C16.7266 1.133 13.9739 0 11.0442 0ZM11.0553 1.837C13.4874 1.837 15.7648 2.783 17.4894 4.499C19.203 6.215 20.1538 8.492 20.1538 10.912C20.1538 15.906 16.0633 19.965 11.0442 19.965C9.40804 19.965 7.80502 19.536 6.41206 18.7L6.0804 18.513L2.63116 19.415L3.54874 16.071L3.32764 15.719C2.42111 14.3 1.93467 12.617 1.93467 10.901C1.94573 5.907 6.02512 1.837 11.0553 1.837ZM7.16382 5.863C6.98693 5.863 6.68844 5.929 6.43417 6.204C6.19095 6.479 5.47236 7.15 5.47236 8.481C5.47236 9.823 6.45628 11.11 6.57789 11.297C6.73266 11.484 8.52362 14.234 11.2764 15.4C11.9286 15.697 12.4372 15.862 12.8352 15.983C13.4874 16.192 14.0844 16.159 14.5598 16.093C15.0905 16.016 16.1739 15.433 16.406 14.795C16.6382 14.157 16.6382 13.618 16.5719 13.497C16.4945 13.387 16.3176 13.321 16.0412 13.2C15.7648 13.046 14.4161 12.386 14.1729 12.298C13.9186 12.21 13.7638 12.166 13.5538 12.43C13.3769 12.705 12.8462 13.321 12.6915 13.497C12.5256 13.684 12.3709 13.706 12.1055 13.574C11.8181 13.431 10.9337 13.145 9.89447 12.221C9.07638 11.495 8.53467 10.604 8.36884 10.329C8.23618 10.065 8.35779 9.9 8.49045 9.779C8.61206 9.658 8.78894 9.46 8.8995 9.295C9.04322 9.141 9.08744 9.02 9.17588 8.844C9.26432 8.657 9.2201 8.503 9.15377 8.371C9.08744 8.25 8.53467 6.886 8.30251 6.347C8.08141 5.819 7.8603 5.885 7.68342 5.874C7.52864 5.874 7.35176 5.863 7.16382 5.863Z" fill="white" />
                                </svg>
                            </Link>

                            <Link to="https://www.instagram.com/tiny_tiaraa/" target="_blank">
                                <svg width="28" height="28" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.8 0H14.2C17.4 0 20 2.73 20 6.09V14.91C20 16.5252 19.3889 18.0742 18.3012 19.2163C17.2135 20.3584 15.7383 21 14.2 21H5.8C2.6 21 0 18.27 0 14.91V6.09C0 4.47483 0.61107 2.92582 1.69878 1.78372C2.78649 0.641623 4.26174 0 5.8 0ZM5.6 2.1C4.64522 2.1 3.72955 2.49825 3.05442 3.20714C2.37928 3.91602 2 4.87748 2 5.88V15.12C2 17.2095 3.61 18.9 5.6 18.9H14.4C15.3548 18.9 16.2705 18.5018 16.9456 17.7929C17.6207 17.084 18 16.1225 18 15.12V5.88C18 3.7905 16.39 2.1 14.4 2.1H5.6ZM15.25 3.675C15.5815 3.675 15.8995 3.81328 16.1339 4.05942C16.3683 4.30556 16.5 4.6394 16.5 4.9875C16.5 5.3356 16.3683 5.66944 16.1339 5.91558C15.8995 6.16172 15.5815 6.3 15.25 6.3C14.9185 6.3 14.6005 6.16172 14.3661 5.91558C14.1317 5.66944 14 5.3356 14 4.9875C14 4.6394 14.1317 4.30556 14.3661 4.05942C14.6005 3.81328 14.9185 3.675 15.25 3.675ZM10 5.25C11.3261 5.25 12.5979 5.80312 13.5355 6.78769C14.4732 7.77225 15 9.10761 15 10.5C15 11.8924 14.4732 13.2277 13.5355 14.2123C12.5979 15.1969 11.3261 15.75 10 15.75C8.67392 15.75 7.40215 15.1969 6.46447 14.2123C5.52678 13.2277 5 11.8924 5 10.5C5 9.10761 5.52678 7.77225 6.46447 6.78769C7.40215 5.80312 8.67392 5.25 10 5.25ZM10 7.35C9.20435 7.35 8.44129 7.68187 7.87868 8.27261C7.31607 8.86335 7 9.66457 7 10.5C7 11.3354 7.31607 12.1366 7.87868 12.7274C8.44129 13.3181 9.20435 13.65 10 13.65C10.7956 13.65 11.5587 13.3181 12.1213 12.7274C12.6839 12.1366 13 11.3354 13 10.5C13 9.66457 12.6839 8.86335 12.1213 8.27261C11.5587 7.68187 10.7956 7.35 10 7.35Z" fill="white" />
                                </svg>
                            </Link>
                            <Link to="tel:+91 8657062511" target="_blank">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="28px" height="28px" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
                            </Link>
                            <Link to="mailto:care@tinytiaraa.com" target="_blank">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></svg>

                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footerthree">
                    <h4 className='footerheading'>INFORMATION</h4>
                    <div className='footermenu'>
                        <ul>
                            <li><Link onClick={scrollToTop} to="/about">Our Story</Link></li>
                            <li><Link onClick={scrollToTop} to="/contacts">Contact Us</Link></li>
                            <li><Link onClick={scrollToTop} to="/terms-and-conditions" >Terms & Conditions</Link></li>
                            <li><Link onClick={scrollToTop} to="/privacy-policy" >Privacy Policy</Link></li>
                            {/* <li><Link onClick={scrollToTop} to="/warranty-extension">WARRANTY EXTENSION</Link></li> */}
                            <li><Link onClick={scrollToTop} to="/exchange-policy" > Exchange Policy</Link></li>
                            <li><Link onClick={scrollToTop} to="/return-policy" > Return Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footerfour">
                    <h4 className='footerheading'>POLICY</h4>
                    <ul>
                        <li><Link onClick={scrollToTop} to="/affiliate-program-commission-policy">Affiliate Program Commission Policy </Link></li>
                        {/* <li><Link onClick={scrollToTop} to="/gold-jewellery-insurance-policy">GOLD JEWELLERY INSURANCE POLICY</Link></li> */}
                        <li><Link onClick={scrollToTop} to="/children-safety-jewellery-policy">Children Safety Jewelry Policy</Link></li>
                        <li><Link onClick={scrollToTop} to="/customised-jewellery-policy">Customised Jewelry Policy</Link></li>
                        {/* <li><Link onClick={scrollToTop} to="/gold-coin-promotion-with-personalised-horoscope-engraving-policy">GOLD COIN PROMOTION WITH PERSONALISED HOROSCOPE ENGRAVING POLICY</Link></li> */}
                        <li><Link onClick={scrollToTop} to="/gold-and-diamond-jewellery-certification-policy"> Gold And Diamond Jewelry Certification Policy</Link></li>
                    </ul>
                </div>

            </div>
            <div className="copyright">
                <p>All Rights Reserved | Tiny Tiaraa © 2024</p>
            </div>
        </div>

    )
}

export default Footer
