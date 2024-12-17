import React, { useEffect, useRef, useState } from 'react'
import './Navbar1.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaRegHeart, FaRegUser, FaSearch } from 'react-icons/fa';
import { MdChevronRight, MdOutlineArrowDropDown, MdOutlineKeyboardArrowRight, MdOutlineShoppingBag, MdSupportAgent } from 'react-icons/md';
import navimg from './about.webp'
// import { categoriesData } from '@/static/data';
import styles from '@/Styles/styles';
import Wishlist from '../Wishlist/Wishlist.jsx'
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';

import { AiFillGolden, AiOutlineHeart } from 'react-icons/ai';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import { IoIosArrowDown, IoIosArrowUp, IoIosClose, IoMdArrowDropright, IoMdMail } from 'react-icons/io';
import DropDown from '@/Navbar/DropDown';
import { backend_url, imgdburl, server } from '@/server';
import { LuUserCircle2 } from 'react-icons/lu';
import { usePriceRange } from '@/pricerange/PriceRangeContext';
import logo from './logo.png'
import { IoSearchOutline } from 'react-icons/io5';
import CurrencySelector from '../../CurrencySelector/CurrencySelector';
import axios from 'axios';


function Navbar1() {

    const { wishlist } = useSelector((state) => state.wishlist)
    const { isAuthenticated, user, loading } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.products)

    const { cart } = useSelector((state) => state.cart)

    const [active, setActive] = useState(false);

    const [openWishlist, setOpenWishlist] = useState(false)
    const [bars, setbars] = useState(false)
    const [open, setOpen] = useState(false)

    const [dropDown, setDropDown] = useState(false)
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });

    const [searchTerm, setsearchTerm] = useState("")
    const [searchData, setsearchData] = useState(null)

    const [isShopOpen, setIsShopOpen] = useState(false);
    const shopRef = useRef(null);

    // const toggleShopDropdown = () => {
    //     setIsShopOpen(prevState => !prevState);
    // };

    const closeShopDropdown = () => {
        setIsShopOpen(false);
    };

    // Handle click outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shopRef.current && !shopRef.current.contains(event.target)) {
                closeShopDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const { setPriceRange } = usePriceRange();
    const handlePriceFilter = (min, max) => {
        setPriceRange([min, max]);
    };

    const buildQueryString = (min, max) => {
        return `?priceMin=${min}&priceMax=${max}`;
    };
    const navigate = useNavigate()
    const submitHandle = (category, subcategory = null) => {
        const subcategoryParam = subcategory ? `&subcategory=${subcategory.name}` : '';
        navigate(`/products?category=${category.title}${subcategoryParam}`);
    };
    // const toggleShopDropdown = () => {
    //     setShopDropdownOpen((prevState) => !prevState);
    // };

    var settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        fade: true,
    };
    const handleSearchChange = (e) => {
        e.preventDefault();
        const term = e.target.value;
        setsearchTerm(term);

        if (term === "") {
            // If the search term is empty, reset the searchData to null or empty array
            setsearchData(null);
        } else {
            // Filter the products based on the search term
            const filteredProducts = products && products.filter((product) => {
                // Convert both name and SKU ID to lowercase for case-insensitive search
                const lowerCaseTerm = term.toLowerCase();
                return (
                    product.name.toLowerCase().includes(lowerCaseTerm) ||
                    (product.skuid && product.skuid.toLowerCase().includes(lowerCaseTerm))
                );
            });
            setsearchData(filteredProducts);
        }
    };

    const handleMouseEnter = () => {
        setDropDown(true);
    };

    const handleMouseLeave = () => {
        setDropDown(false);
    };

    const closenavbar = () => {
        setOpen(false);
        setbars(false);
    };

    const openclosewhislist = () => {
        setOpenWishlist(true)
        // setOpen(false);
    }
    const resetSearch = () => {
        setsearchTerm("");
        setsearchData(null);
    };

    // const submitHandleagegroup = (ageGroupKey) => {
    //     if (!products || !ageGroupKey) return;

    //     const filteredProducts = products.filter(product =>
    //         product.ageGroup && product.ageGroup[ageGroupKey] === true
    //     );
    //     console.log("age group", filteredProducts)
    //     navigate(`/products?ageGroup=${ageGroupKey}`, { state: { filteredProducts } });
    //     setShopDropdownOpen(false);
    // };
    

    const submitHandleagegroup = (ageGroupKey) => {
        if (!products || !ageGroupKey) {
            console.error("Products or ageGroupKey is missing");
            return;
        }
    
        let filteredProducts = [];
    
        if (ageGroupKey === "momandme") {
            // Filter products where infants, kids, and mom are true
            filteredProducts = products.filter(product =>
                product.ageGroup &&
                product.ageGroup.infants === true &&
                product.ageGroup.kids === true &&
                product.ageGroup.mom === true
            );
        } else {
            // Filter for specific age group key
            filteredProducts = products.filter(product =>
                product.ageGroup && product.ageGroup[ageGroupKey] === true
            );
        }
    
        // Debugging outputs
        console.log("Filtered Products:", filteredProducts);
    
        // Navigate to filtered products
        navigate(`/products?ageGroup=${ageGroupKey}`, { state: { filteredProducts } });
    
        // Close the dropdown
        setShopDropdownOpen(false);
    };

    const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false);

    const toggleCurrencySelector = () => {
        setIsCurrencySelectorOpen(!isCurrencySelectorOpen);
    };
    const [selectedCurrency, setSelectedCurrency] = useState('INR'); // Default currency

    const currencyData = {
        USD: { country: "United States", flag: "https://flagcdn.com/us.svg" },
        EUR: { country: "European Union", flag: "https://flagcdn.com/eu.svg" },
        INR: { country: "India", flag: "https://flagcdn.com/in.svg" },
        GBP: { country: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
        AUD: { country: "Australia", flag: "https://flagcdn.com/au.svg" },
        CAD: { country: "Canada", flag: "https://flagcdn.com/ca.svg" },
        JPY: { country: "Japan", flag: "https://flagcdn.com/jp.svg" },
        CNY: { country: "China", flag: "https://flagcdn.com/cn.svg" },
        NZD: { country: "New Zealand", flag: "https://flagcdn.com/nz.svg" },
        SGD: { country: "Singapore", flag: "https://flagcdn.com/sg.svg" },
        CHF: { country: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
        HKD: { country: "Hong Kong", flag: "https://flagcdn.com/hk.svg" },
        SEK: { country: "Sweden", flag: "https://flagcdn.com/se.svg" },
        NOK: { country: "Norway", flag: "https://flagcdn.com/no.svg" },
        DKK: { country: "Denmark", flag: "https://flagcdn.com/dk.svg" },
        RUB: { country: "Russia", flag: "https://flagcdn.com/ru.svg" },
        ZAR: { country: "South Africa", flag: "https://flagcdn.com/za.svg" },
        BRL: { country: "Brazil", flag: "https://flagcdn.com/br.svg" },
        MXN: { country: "Mexico", flag: "https://flagcdn.com/mx.svg" },
        KRW: { country: "South Korea", flag: "https://flagcdn.com/kr.svg" },
        MYR: { country: "Malaysia", flag: "https://flagcdn.com/my.svg" },
        THB: { country: "Thailand", flag: "https://flagcdn.com/th.svg" },
        SAR: { country: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg" },
      };
      const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        toggleCurrencySelector(); // Close the selector after selecting
    };

  

      const handleMetalSelect = (type) => {
        navigate(`/products?type=${type}`);
      };
      const [isDropdownVisible, setIsDropdownVisible] = useState(false);

        const toggleShopDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        };

        const closeDropdown = () => {
        setIsDropdownVisible(false);
        };

                const [categoriesData, setCategoriesData] = useState([]);
                const [Loading, setLoading] = useState(true);
             useEffect(() => {
            const fetchCategories = async () => {
            try {
                const response = await axios.get(`${server}/get-allcategories`);
                // Assuming your API response has a `categories` key
                const filteredData = response.data.categories.filter(i => i.title !== 'Coming Soon ...');
                setCategoriesData(filteredData);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
            };

            fetchCategories();
        }, []);
        // Separate Gold and Silver Categories
        const [showAllGold, setShowAllGold] = useState(false); // Toggle state for Gold categories
        const [showAllSilver, setShowAllSilver] = useState(false); // Toggle state for Silver categories
        const goldCategories = categoriesData.filter(category => category.type === "gold");
        const silverCategories = categoriesData.filter(category => category.type === "silver");
        

    console.log(user,"user details")
    return (
        <>

            <div className="navbar1mian">
                {           /* //top nav */}
                <div className='nav1banner '>
                    <div className='customerinfo !text-[13px]'>
                        <span className='flex items-center'>
                            <Link to="tel:+91 8657062511" className='cursor-pointer ml-[2px] flex items-center font-[450]'><MdSupportAgent size={23} className='!font-[400] mr-[2px]' /> +91 86570 62511 | </Link>
                        </span>
                        <span className='ml-[3px] flex items-center'>
                            <Link to="mailto:care@tinytiaraa.com" className='cursor-pointer ml-[2px] flex items-center font-[450]'><IoMdMail size={23} className='!font-[400] mr-[2px]' />care@tinytiaraa.com </Link>
                        </span>

                        {/* <span onClick={()=>{navigate('/shop-login')}}>Shop</span> */}

                    </div>

                    <div className='couponscetion !text-[13px]'>
                        <Slider {...settings} >
                            <div className='text-center'>
                                <span>Get ₹500 Off On Your First Order Of ₹5000 Or More! :- Welcome500</span>

                            </div>
                            <div className='text-center'>

                                <span>Use coupon code <b>NewYear500</b>  at checkout for an additional ₹500 Off!</span>
                            </div>

                        </Slider>

                    </div>
                    <div className='!mr-10' onClick={toggleCurrencySelector} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <img src={currencyData[selectedCurrency].flag} alt={`${selectedCurrency} flag`} className="w-5 h-5 mr-2" />
                            <span className='font-[400]'>{selectedCurrency}</span>
                        </div>
                        {isCurrencySelectorOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white px-3 pb-6 pt-2 rounded-lg shadow-lg max-w-sm w-full text-black" style={{ boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)" }}>

                                <div className='flex justify-end' onClick={toggleCurrencySelector}>
                                <IoIosClose size={30} className='cursor-pointer'/>

                                </div>
                             
                            <CurrencySelector onCurrencySelect={handleCurrencySelect} toggleCurrencySelector={toggleCurrencySelector} />
                            </div>
                          </div>

                        )}

                    <div className="social-icons ">
                        {/* <h1 onClick={toggleCurrencySelector} style={{ cursor: 'pointer' }}>currency</h1> */}

                       
                        <Link to="https://www.facebook.com/profile.php?id=61551799145871" target="_blank">
                            <i className="fab fa-facebook" />
                        </Link>
                        <Link to="https://www.instagram.com/tiny_tiaraa/" target="_blank">
                            <i className="fab fa-instagram" />
                        </Link>
                        <Link
                            to="#"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

                                if (isMobile) {
                                // Open WhatsApp app on mobile devices
                                window.location.href = "whatsapp://send?phone=+918657062511";
                                } else {
                                // Open WhatsApp Web on desktops/laptops
                                window.open("https://web.whatsapp.com/send?phone=+918657062511", "_blank");
                                }
                            }}
                            >
                            <i className="fab fa-whatsapp" />
                        </Link>


                    </div>

                </div>

                {/* Navbar */}

                <div className="navbar1">
                    <div className="mobileresp" onClick={() => { setbars(!bars) }}>
                        {
                            bars ?
                                <i className="fa-solid fa-xmark"></i>
                                :
                                <i className="fa-solid fa-bars"></i>
                        }
                    </div>
                    <div className='w-[45%]'>
                        <ul className='menu'>
                            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                            <li><NavLink to="/about" activeClassName="active">Our Story</NavLink></li>
                            <span className='parenthover'  ref={shopRef}   onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={(e) => {
                            // Ensure dropdown doesn't close when interacting with its children
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setIsDropdownVisible(false);
                            }
                        }}>
                                <li onClick={toggleShopDropdown} ><NavLink to="/products" activeClassName="active">Shop</NavLink>

                                {
                                     isDropdownVisible && (
                                        <div className={`shopdrop shadow-sm `} id="shopDropdown">
                                        <div className='flex gap-5'>

                                            <div className='navshopimg mt-5 ml-10'>
                                                <img src={navimg} alt="" className='shadow' />
                                            </div>


                                            {/* <div className='mt-5 ml-4'>
                                                <div className='mb-2'>
                                                    <h3 className='font-[500]'>Shop By Metal</h3>
                                                </div>
                                                <div className='flex !items-center'>
                                                <AiFillGolden size={22} color="#FFD700" />
                                                <span className='pt-2 pb-1 collectionnav1 pl-1 ' onClick={() => { navigate("/products") }}>  Gold</span>

                                                </div>

                                                <div className='flex items-center'>
                                                <AiFillGolden size={22} color="#C0C0C0" />

                                                <h6 className='pb-1 pt-2 pl-1  collectionnav1' onClick={()=>{navigate("/products?category=kids%20accessories")}}>Silver</h6>
                                                
                                                </div>



                                            </div> */}

                                                <div className='mt-5 ml-4'>
                                                    <div className='mb-2'>
                                                        <h3 className='font-[500]'>Shop By Metal</h3>
                                                    </div>

                                                    <div className='flex !items-center'>
                                                        <AiFillGolden size={22} color="#FFD700" />
                                                        <span
                                                        className='pt-2 pb-1 collectionnav1 pl-1'
                                                        onClick={() => {
                                                            handleMetalSelect('gold')
                                                            // closeDropdown();
                                                        }}
                                                        >
                                                        Gold
                                                        </span>
                                                    </div>

                                                    <div className='flex items-center'>
                                                        <AiFillGolden size={22} color="#C0C0C0" />
                                                        <h6
                                                        className='pb-1 pt-2 pl-1 collectionnav1'
                                                        onClick={() => handleMetalSelect('silver')}
                                                        >
                                                        Silver
                                                        </h6>
                                                    </div>
                                                    </div>





                                            <div className='mt-5 ml-6'>
                                                <div className='borderright'>
                                                    <div className='mb-2'>
                                                        <h3 className='font-[500]'>Shop By Collection</h3>
                                                    </div>

                                                    <h6 className='pb-2 collectionnav1' onClick={() => { submitHandleagegroup("infants") }}>Infants (0-3 Yrs)</h6>
                                                    <h6 className='pb-2 collectionnav1' onClick={() => { submitHandleagegroup("kids") }}>Kids (3-10 Yrs)</h6>
                                                    <h6 className='pb-2 collectionnav1' onClick={() => submitHandleagegroup("teens")}>Teens </h6>
                                                    <h6 className='pb-2 collectionnav1' onClick={() => submitHandleagegroup("mom")}>Mom  </h6>
                                                    <h6 className='pb-2 collectionnav1' onClick={() => submitHandleagegroup("momandme")}>Mom & Me </h6>

                                                    <h6 className='pb-2 collectionnav1' onClick={() => { navigate("/personalised-prosperity") }}>Customization </h6>
                                                    {/* <h6 className='pb-2 collectionnav1'>Gifts</h6>
                                                    <h6 className='pb-2 collectionnav1'>Gallery </h6>
                                                    <h6 className='pb-2 collectionnav1'>Media</h6> */}



                                                </div>


                                            </div>



                                             {/* <div className='mt-5 ml-7'>
                                                <div className='mb-2 '>
                                                    <h3 className='font-[500]'>Shop By Category</h3>
                                                </div>
                                                <div>
                                                     {categoriesData && categoriesData.filter(i => i.title !== "Coming Soon ...").map((i, index) => (
                                                        <div key={index} className={`subcatmain ${styles.noramlFlex} relative`} onClick={() => { submitHandle(i) }}>
                                                            <img
                                                             src={i.image_Url} 
                                                             alt="" style={{ width: "30px", height: "35px", objectFit: "contain", userSelect: "none" }} />
                                                            <h3 className='text-[14px] m-1 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{i.title}</h3>
                                                            <div className='  absolute left-[95%]'>

                                                            {
                                                                i.title === "Diamond Pendants" ?
                                                                <IoMdArrowDropright />
                                                                :
                                                                ""
                                                                
                                                                
                                                            }
                                                            {
                                                                i.title === "kids accessories" ?
                                                                <IoMdArrowDropright />
                                                                :
                                                                ""
                                                                
                                                                
                                                            }
                                                            </div>

                                                             { i.title === "Diamond Pendants" && (
                                                                <div className={`subcatchild top-3 left-[100%] pt-[2px] pb-2 w-[230px] bg-[#fff] border border-[#eee] absolute z-30 rounded-[3px] shadow-sm`}>
                                                                    {i.subcategories.map((val, subIndex) => (
                                                                        <div className='pl-[10px]' key={subIndex} onClick={(e) => { e.stopPropagation(); submitHandle(i, val); }}>
                                                                            <h3 className='m-2 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{val.name}</h3>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                             { i.title === "kids accessories" && (
                                                                <div className={`subcatchild top-3 left-[100%] pt-[2px] pb-2 w-[230px] bg-[#fff] border border-[#eee] absolute z-30 rounded-[3px] shadow-sm`}>
                                                                    {i.subcategories.map((val, subIndex) => (
                                                                        <div className='pl-[10px]' key={subIndex} onClick={(e) => { e.stopPropagation(); submitHandle(i, val); }}>
                                                                            <h3 className='m-2 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{val.name}</h3>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
  */}

                                                            {/* Display subcategories */}
                                                            {/* <div className={`subcatchild top-3 left-[100%]  pb-4 w-[250px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm`}>
                                                                {i.subcategories.map((val, subIndex) => (
                                                                    <div key={subIndex} onClick={(e) => { 
                                                                        e.stopPropagation();
                                                                         submitHandle(i, val);
                                                                 }}>
                                                                        <h3 className='m-3 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]'>{val.name}</h3>
                                                                    </div>
                                                                ))}
                                                            </div> */}

{/*                                                             
                                                         
                                                         </div>
                                                    ))} 

                                                    
                                                 </div>
                                            </div>  */}


                                        {/* api code working  */}

                                                {/* <div className='mt-5 ml-7'>
                                                <div className='mb-2 '>
                                                    <h3 className='font-[500]'>Shop By Category</h3>
                                                </div>
                                                <div>
                                                {categoriesData && categoriesData.map((i, index) => (
                                                <div
                                                    key={index}
                                                    className="subcatmain relative"
                                                    onClick={() => submitHandle(i)}
                                                >

                                                    <img
                                                        loading='lazy'
                                                        src={`${imgdburl}${i?.image_Url?.url}`}
                                                        alt={i.title}
                                                        style={{ width: '30px', height: '35px', objectFit: 'contain', userSelect: 'none' }}
                                                    />
                                                   
                                                    <h3 className="text-[14px] m-1 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                        {i.title}
                                                    </h3>
                                                   
                                                    {(i.subcategories.length > 0 ) && (
                                                        <div className="absolute left-[95%]">
                                                        <IoMdArrowDropright />
                                                        </div>
                                                    )}
                                                    
                                                     {(i.subcategories.length > 0 ) && (
                                                        <div className="subcatchild top-3 left-[100%] pt-[2px] pb-2 w-[230px] bg-[#fff] border border-[#eee] absolute z-30 rounded-[3px] shadow-sm">
                                                        {i.subcategories && i.subcategories.map((val, subIndex) => (
                                                            <div
                                                            key={subIndex}
                                                            className="pl-[10px]"
                                                            onClick={(e) => { e.stopPropagation(); submitHandle(i, val); }}
                                                            >
                                                            <h3 className="m-2 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                                {val.name}
                                                            </h3>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    )}
                                                    </div>
                                                ))}
                                                </div>
                                            </div>  */}

                                            <div className='mt-5 ml-7'>
                                            <div className='mb-1'>
                                                <h3 className='font-[500]'>Shop By Category</h3>
                                            </div>

                                                {/* GOLD CATEGORY SECTION */}
                                                {goldCategories.length > 0 && (
                                                    <div>
                                                       <h3 className="font-[500] mb-1  text-[12px] border-b-2 border-b-[#0d0d0da4] inline-block">
                                                            Gold
                                                        </h3>
                                                        {goldCategories.slice(0, showAllGold ? goldCategories.length : 7).map((i, index) => (
                                                            <div
                                                                key={index}
                                                                className="subcatmain relative mb-1"
                                                                onClick={() => submitHandle(i)}
                                                            >
                                                                {/* Category Image */}
                                                                <img
                                                                    loading='lazy'
                                                                    src={`${imgdburl}${i?.image_Url?.url}`}
                                                                    alt={i.title}
                                                                    style={{ width: '30px', height: '30px', objectFit: 'contain', userSelect: 'none' }}
                                                                />
                                                                {/* Category Title */}
                                                                <h3 className="text-[14px] m-1 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                                    {i.title}
                                                                </h3>
                                                                {/* Right Arrow Icon */}
                                                                {(i.subcategories.length > 0) && (
                                                                    <div className="absolute left-[95%]">
                                                                        <IoMdArrowDropright />
                                                                    </div>
                                                                )}
                                                                {/* Subcategories Dropdown */}
                                                                {(i.subcategories.length > 0) && (
                                                                    <div className="subcatchild top-3 left-[100%] pt-[2px] pb-2 w-[230px] bg-[#fff] border border-[#eee] absolute z-30 rounded-[3px] shadow-sm" >
                                                                        {i.subcategories.map((val, subIndex) => (
                                                                            <div
                                                                                key={subIndex}
                                                                                className="pl-[10px]"
                                                                                onClick={(e) => {  
                                                                                    e.stopPropagation(); // Prevent click event from bubbling up
                                                                                    submitHandle(i, val); // Handle the subcategory selection
                                                                                    setIsDropdownVisible(false);  }}
                                                                            >
                                                                                <h3 className="m-2 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                                                    {val.name}
                                                                                </h3>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}

                                                {goldCategories.length > 7 && (
                                                    <div className='text-center'>

                                                   
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent closing
                                                                            setShowAllGold(!showAllGold)
                                                                        }}
                                                                        className="text-blue-500 text-[12px] mt-2 underline"
                                                                    >
                                                                        {showAllGold ? 'View Less' : 'View More'}
                                                                    </button>
                                                                    </div>
                                                                )}
                                                    </div>
                                                )}

                                                {/* SILVER CATEGORY SECTION */}
                                                {silverCategories.length > 0 && (
                                                    <div>
                                                        <h3 className="font-[500] mb-1   text-[12px] border-b-2 border-b-[#0d0d0da4] inline-block">Silver</h3>
                                                        {silverCategories.slice(0, showAllSilver ? silverCategories.length : 3).map((i, index) => (
                                                            <div
                                                                key={index}
                                                                className="subcatmain relative mb-1"
                                                                onClick={() => submitHandle(i)}
                                                            >
                                                                {/* Category Image */}
                                                                <img
                                                                    loading='lazy'
                                                                    src={`${imgdburl}${i?.image_Url?.url}`}
                                                                    alt={i.title}
                                                                    style={{ width: '30px', height: '30px', objectFit: 'contain', userSelect: 'none' }}
                                                                />
                                                                {/* Category Title */}
                                                                <h3 className="text-[14px] m-1 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                                    {i.title}
                                                                </h3>
                                                                {/* Right Arrow Icon */}
                                                                {(i.subcategories.length > 0) && (
                                                                    <div className="absolute left-[95%]">
                                                                        <IoMdArrowDropright />
                                                                    </div>
                                                                )}
                                                                {/* Subcategories Dropdown */}
                                                                {(i.subcategories.length > 0) && (
                                                                    <div className="subcatchild top-3 left-[100%] pt-[2px] pb-2 w-[230px] bg-[#fff] border border-[#eee] absolute z-30 rounded-[3px] shadow-sm">
                                                                        {i.subcategories.map((val, subIndex) => (
                                                                            <div
                                                                                key={subIndex}
                                                                                className="pl-[10px]"
                                                                                onClick={(e) => { e.stopPropagation(); 
                                                                                    submitHandle(i, val);
                                                                                    setIsDropdownVisible(false);
                                                                                 }}
                                                                            >
                                                                                <h3 className="m-2 cursor-pointer select-none font-Poppins hover:text-[#1BB8E5]">
                                                                                    {val.name}
                                                                                </h3>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                        {silverCategories.length > 3 && (
                                                             <div className='text-center'>
                                                            <button
                                                                onClick={() => {
                                                                    e.stopPropagation();
                                                                    setShowAllSilver(!showAllSilver)
                                                                }}
                                                                className="text-blue-500 text-[12px] mt-2 underline"
                                                            >
                                                                {showAllSilver ? 'View Less' : 'View More'}
                                                            </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>




                                            <div className='pricenav mt-5 ml-7'>
                                                <div className='mb-2'>
                                                    <h3 className='font-[500] text-black'>Shop By Price</h3>
                                                </div>

                                                <Link
                                                    to={`/products${buildQueryString(1000, 5000)}`}
                                                    className='pb-2 collectionnav1 text-white '
                                                >
                                                    <h6 className='mb-1 text-[14px]'>₹ 1000 - ₹ 5000</h6>

                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(5000, 10000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    <h6 className='mb-1 text-[14px]'> ₹ 5000 - ₹ 10000</h6>


                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(10000, 20000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    <h6 className='mb-1 text-[14px]'> ₹ 10000 - ₹ 25000</h6>


                                                </Link>
                                                <Link
                                                    to={`/products${buildQueryString(25000, 50000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    <h6 className='mb-1 text-[14px]'> ₹ 25000 - ₹ 50000</h6>


                                                </Link>

                                                <Link
                                                    to={`/products${buildQueryString(50000, 75000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    <h6 className='mb-1 text-[14px]'> ₹ 50000 - ₹ 100000</h6>


                                                </Link>
                                                {/* <Link
                                                    to={`/products${buildQueryString(75000, 100000)}`}
                                                    className='pb-2 collectionnav1 text-white'
                                                >
                                                    <h6 className='mb-1 text-[14px]'> ₹ 75000 - ₹ 100000</h6>


                                                </Link> */}
                                            </div>
                                        </div>

                                    </div>

                                     )
                                }

                                      

                                </li>
                            </span>
                            <li><NavLink to="/personalised-prosperity" activeClassName="active">Customization</NavLink></li>
                            <li><NavLink to="/contacts" activeClassName="active">Contact Us</NavLink></li>
                        </ul>
                    </div>
                    <div className='w-[55%] flex justify-between'>


                        <div>
                            <div className="logo py-1" onClick={() => navigate("/")}>
                                <img className='shadowlogonav' loading='lazy' src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/pgqpod1dbwdxo4kudbjl.webp" alt="" />
                            </div>
                        </div>


                        <div className='flex gap-[10px] items-center'>
                            <div className={`${styles.noramlFlex}`}>
                                <div className="relative cursor-pointer mr-[20px]">
                                    <div className='searchconstyle'>
                                        <form onSubmit={(e) => e.preventDefault()}>


                                            <input type="search" placeholder='Search Product..' className='' value={searchTerm} onChange={handleSearchChange} />

                                            <div className='searchiconadjustpos'>
                                                <IoSearchOutline size={22} />

                                            </div>


                                            {
                                                searchData && searchData.length !== 0 ?
                                                    (
                                                        <div className="absolute left-0  min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 custom-scrollbar" style={{ maxHeight: "100vh", overflowY: "auto" }} >
                                                            {
                                                                searchData && searchData.map((i, index) => {
                                                                    const d = i.name;
                                                                    const Product_name = d.replace(/\s+/g, "-")
                                                                    return (

                                                                        <div
                                                                            onClick={() => {
                                                                                navigate(`/product/${Product_name}`)
                                                                                resetSearch();

                                                                            }}>
                                                                            <div className="w-full flex items-center pb-3 overflow-hidden">
                                                                                <img 
                                                                                // src={`${i.images[1]?.url}`} 
                                                                                src={
                                                                                    i.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                                                        ? i.images[1].url.replace(
                                                                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                                                            `${imgdburl}/uploads/images`
                                                                                          )
                                                                                        : `${imgdburl}${i.images[1]?.url}` // Prepend imgdburl if not Cloudinary
                                                                                }
                                                                                alt="" className='w-[60px] h-[50px] mr-[10px] scale-150 object-contain' />
                                                                                <p className='font-Poppins text-[12px]'>{i.name}</p>
                                                                            </div>
                                                                        </div>

                                                                    )

                                                                })
                                                            }

                                                        </div>
                                                    ) :
                                                    null
                                            }

                                        </form>
                                    </div>

                                </div>



                            </div>


                            {/* wishlist */}
                            <div className={`${styles.noramlFlex}`}>
                                <div
                                    className="relative cursor-pointer mr-[2px]"
                                    onClick={() => setOpenWishlist(true)}

                                >
                                    <Badge badgeContent={wishlist && wishlist.length} color="primary">
                                        <AiOutlineHeart size={24} />
                                    </Badge>

                                </div>
                            </div>
                            {
                                openWishlist ?
                                    (
                                        <Wishlist setOpenWishlist={setOpenWishlist} />
                                    )
                                    :
                                    null
                            }


                            <div className={`${styles.noramlFlex}`}>
                                <div
                                    className="relative cursor-pointer mr-[2px]"

                                >
                                    {
                                        isAuthenticated ?
                                            (
                                                <Link to="/profile">
                                                    {/* <CgProfile size={30} /> */}
                                                    <LuUserCircle2 size={24} />

                                                    {/* <img className='w-[35px] h-[35px] rounded-full' src={`${backend_url}${user.avatar}`} alt="" /> */}
                                                </Link>
                                            )
                                            :
                                            (
                                                <Link to="/login">
                                                    <LuUserCircle2 size={24} />

                                                    {/* <CgProfile size={30} /> */}
                                                </Link>)
                                    }


                                </div>
                            </div>

                            <div onClick={() => {
                                navigate("/cart")

                            }}>
                                <Badge badgeContent={cart && cart.length} color="primary" badgeContentClassName="custom-badge-content">
                                    <MdOutlineShoppingBag size={26} className='iconnav' />
                                </Badge>



                            </div>

                            <div>

                            </div>



                        </div>
                    </div>

                </div>

            </div>


            {/* Mobile Navbar */}
            <div className='nav1bannermobile '>
                    

                    <div className='couponscetion !text-[12px] w-[85%]'>
                        <Slider {...settings} >
                            <div className='text-center couponsectionadjustslider'>
                                <span>Get ₹500 Off On Your First Order Of ₹5000 Or More! :- Welcome500</span>

                            </div>
                            <div className='text-center couponsectionadjustslider'>

                                <span>Get 10% Off On Your Order above ₹5000 Or More! :- Tiny10</span>
                            </div>

                        </Slider>

                    </div>
                    <div className='currencysection !mr-10 w-[10%]' onClick={toggleCurrencySelector} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <div className='headcurrencymain ml-6'>

                            <img src={currencyData[selectedCurrency].flag} alt={`${selectedCurrency} flag`} className="w-5 h-5 mr-2" />
                            <span className='headcurrencycode font-[400]'>{selectedCurrency}</span>
                        </div>
                        </div>
                        {isCurrencySelectorOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white px-3 pb-6 pt-2 rounded-lg shadow-lg max-w-sm w-full text-black" style={{ boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)" }}>

                                <div className='flex justify-end' onClick={toggleCurrencySelector}>
                                <IoIosClose size={30} className='cursor-pointer'/>

                                </div>
                             
                            <CurrencySelector onCurrencySelect={handleCurrencySelect} toggleCurrencySelector={toggleCurrencySelector} />
                            </div>
                          </div>

                        )}
                  

                    
                </div>
            <div
                className={`mobile-nav  ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    }
      w-full h-[70px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden `}
            >
                <div className="w-full flex items-center justify-between cursor-pointer">
                    <div>
                        <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(true)} />
                    </div>

                    <div className="logo pt-2" onClick={() => {
                        setbars(false)
                        navigate("/")
                    }} >
                        <img loading='lazy' className='w-[150px] h-[60px] object-contain' src="https://backend.tinytiaraa.com:8000/uploads/images/logowebsite/pgqpod1dbwdxo4kudbjl.webp" alt="" />
                    </div>

                    <div>
                        <div onClick={() => {
                            closenavbar()
                            navigate("/cart")

                        }} className='mr-[20px] cursor-pointer'>

<Badge badgeContent={cart && cart.length} color="primary" badgeContentClassName="custom-badge-content">

                            <i className="fa-solid fa-cart-shopping text-[25px]" ></i>
</Badge>


                        </div>

                    </div>

                </div>


                {/* navbar sidebar */}

                {
                    open && (
                        <div className='fixed w-full bg-[#0000005f] z-[20] h-full top-0 left-0'>
                            <div className='mobajustnavsall fixed w-[75%]  bg-[white] h-screen top-0 left-0 z-10 overflow-x-hidden overflow-y-auto'>
                                <div className="w-full justify-between flex pr-3">
                                    <div>
                                        <div className="mt-5 ml-5 mr-[15px] cursor-pointer" onClick={() => openclosewhislist()}>
                                            <Badge badgeContent={wishlist && wishlist.length} color="primary">
                                                <AiOutlineHeart size={30} />
                                            </Badge>

                                        </div>
                                        {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
                                    </div>
                                    <RxCross1 size={30} className='ml-4 mt-5 cursor-pointer' onClick={() => setOpen(false)} />

                                </div>

                                <div className='my-8 w-[92%] m-auto h-[40px]'>
                                    <input type="search" placeholder='Search Product..' className='h-[40px] w-full border-[#000] border-[2px] px-2 rounded-md' value={searchTerm} onChange={handleSearchChange} />

                                    {
                                        searchData && searchData.length !== 0 ?
                                            (
                                                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                                    {
                                                        searchData && searchData.map((i, index) => {
                                                            const d = i.name;
                                                            const Product_name = d.replace(/\s+/g, "-")
                                                            return (
                                                                <>
                                                                    <div
                                                                        onClick={() => {
                                                                            navigate(`/product/${Product_name}`)
                                                                            resetSearch();
                                                                            closenavbar();
                                                                        }}>
                                                                        <div className="w-full flex items-center pb-3 overflow-hidden">
                                                                            <img 
                                                                             src={
                                                                                i.images[1]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                                                    ? i.images[1].url.replace(
                                                                                        /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                                                        `${imgdburl}/uploads/images`
                                                                                      )
                                                                                    : `${imgdburl}${i.images[1]?.url}` // Prepend imgdburl if not Cloudinary
                                                                            }
                                                                            // src={`${i.images[1]?.url}`} 
                                                                            alt="" className='w-[60px] h-[50px] mr-[10px] scale-150 object-contain' />
                                                                            <p className='font-Poppins text-[15px]'>{i.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )

                                                        })
                                                    }

                                                </div>
                                            ) :
                                            null
                                    }

                                </div>


                                <div className="mobilenavigation font-Poppins flex justify-start pl-6 ">
                                    <ul className={`flex flex-col gap-10  ${bars ? "menuopen menu" : "menu"}`}  >

                                        <li><NavLink to="/" onClick={closenavbar} activeClassName="active">Home</NavLink></li>
                                        <li><NavLink to="/about" onClick={closenavbar} activeClassName="active">Our Story </NavLink></li>
                                        <li className="relative group">
                                            <NavLink
                                                to="/products"
                                                onClick={closenavbar}
                                                className="flex items-center text-black hover:text-blue-500"
                                                activeClassName="active"
                                            >
                                                Shop
                                                <FaAngleRight className='ml-3' />

                                            </NavLink>
                                            <div className="absolute top-[50%] left-0 w-[300px] mt-2 bg-white rounded-md shadow-lg hidden group-hover:block ">
                                                <div className="p-4">
                                                    <div className="mb-4">
                                                        <h3 className="font-semibold text-[16px] text-center">Shop Now

                                                        </h3>
                                                        <h6 className="pb-2 collectionnav1 text-[14px]" onClick={() => {
                                                            navigate("/products")
                                                            closenavbar()
                                                        }}>Gold</h6>
                                                        <h6 className="pb-2 collectionnav1 text-[14px]">Silver</h6>
                                                    </div>
                                                    <div className="mb-4">
                                                        <h3 className="font-semibold text-[16px] text-center">By Category</h3>
                                                        <div className='text-[13px]'>
                                                            {categoriesData && categoriesData.map((i, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`subcatmain ${styles.noramlFlex} relative`}
                                                                    onClick={() => {
                                                                        submitHandle(i)
                                                                        closenavbar()

                                                                            ;
                                                                    }} // Handle click on category
                                                                >
                                                                    <img
                                                                        src={i.image_Url}
                                                
                                                                        alt=""
                                                                        style={{ width: "35px", height: "40px", objectFit: "contain", userSelect: "none" }}
                                                                    />
                                                                    <h3 className="m-1 cursor-pointer select-none font-Poppins hover:text-blue-500">{i.title}</h3>

                                                                    {/* Display subcategories */}
                                                                    {/* <div
                                                                        className={`subcatchild top-3 left-[70%] pb-4 w-64 bg-white absolute z-30 rounded-b-md shadow-sm`}
                                                                    >
                                                                        {i.subcategories.map((val, subIndex) => (
                                                                            <div
                                                                                key={subIndex}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    submitHandle(i, val); // Handle click on subcategory
                                                                                }}
                                                                            >
                                                                                <h3 className="m-3 cursor-pointer select-none font-Poppins hover:text-blue-500">{val.name}</h3>
                                                                            </div>
                                                                        ))}
                                                                    </div> */}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                        <li><NavLink to="/personalised-prosperity" onClick={closenavbar} activeClassName="active">Customization</NavLink></li>
                                        <li><Link to="/contacts" onClick={closenavbar} activeClassName="active">Contact Us</Link></li>
                                    </ul>
                                </div>

                                <div className="flex w-full justify-center mt-6">
                                    {
                                        isAuthenticated ?
                                            <>
                                                <div className='flex flex-col items-center mt-6 font-Poppins'>
                                                    <img className='w-[50px] h-[50px] rounded-full' src={`${user?.avatar}`} alt="" />
                                                    <h3 className='capitalize font-[500]'>{user.name}</h3>
                                                </div>

                                            </>

                                            :
                                            <>
                                                <Link to="/login" onClick={closenavbar} className='text-[18px] font-Poppins pr-[10px]'>Login /</Link>
                                                <Link to="/sign-up" onClick={closenavbar} className='text-[18px] font-Poppins'>Sign Up</Link>


                                            </>



                                    }
                                </div>





                            </div>

                        </div>
                    )
                }




            </div>

        </>
    )
}

export default Navbar1
