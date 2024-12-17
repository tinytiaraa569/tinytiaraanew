import React, { useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categoriesData, productData } from '../static/data'
import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowDropright, IoIosArrowUp } from "react-icons/io";
import DropDown from './DropDown.jsx'
import styles from '../Styles/styles.jsx'
import { useSelector } from 'react-redux'
import { CgProfile } from "react-icons/cg";
import { backend_url } from '../server.jsx'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Wishlist from '../Wishlist/Wishlist.jsx'
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from 'react-icons/rx'
import Badge from '@mui/material/Badge';



function Navbar() {
    const [bars, setbars] = useState(false)
    const [active, setActive] = useState(false);
    const { cart } = useSelector((state) => state.cart)
    const { wishlist } = useSelector((state) => state.wishlist)


    console.log(cart)



    const [open, setOpen] = useState(false)

    const [searchTerm, setsearchTerm] = useState("")
    const [searchData, setsearchData] = useState(null)

    const { isAuthenticated, user, loading } = useSelector((state) => state.user)
    const { products } = useSelector((state) => state.products)


    const [dropDown, setDropDown] = useState(false)


    const [openWishlist, setOpenWishlist] = useState(false)





    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });


    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
        });
        // setbars(!bars)
    };

    const handleSearchChange = (e) => {
        const term = e.target.value
        setsearchTerm(term)

        const filteredProducts = products && products.filter((product) => {
            return product.name.toLowerCase().includes(term.toLowerCase())

        })
        setsearchData(filteredProducts)

    }
    const handleMouseEnter = () => {
        setDropDown(true);
    };

    const handleMouseLeave = () => {
        setDropDown(false);
    };

    function closenavbar() {
        setOpen(false)

    }




    return (
        <>
            <div className='Navbarmain'>
                <div className='banner'>
                    <p>Get ₹500 Off On Your First Order Of ₹5000 Or More! Use Coupon Code: Welcome500</p>

                </div>


                <div className='Navbar'>
                    <div className="mobileresp" onClick={() => { setbars(!bars) }}>
                        {
                            bars ?
                                <i className="fa-solid fa-xmark"></i>
                                :
                                <i className="fa-solid fa-bars"></i>
                        }
                    </div>
                    <div className="logo" onClick={() => {
                        setbars(false)
                        navigate("/")
                    }}>
                        <img src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png" alt="" />
                    </div>
                    {/* <div  > */}
                    <ul className={bars ? "menuopen menu" : "menu"} >

                        <li><NavLink to="/" onClick={scrollToTop} activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/about" onClick={scrollToTop} activeClassName="active">About</NavLink></li>
                        <li className='relative parenthover' >
                            <NavLink to="/shop" onClick={scrollToTop} activeClassName="active">Products</NavLink>
                            {
                                dropDown ?
                                    <IoIosArrowUp
                                        size={20}
                                        className="absolute right-0 top-4 cursor-pointer"
                                    // onClick={() => setDropDown(!dropDown)}
                                    />

                                    :

                                    <IoIosArrowDown
                                        size={20}
                                        className="absolute right-0 top-4 cursor-pointer"
                                    // onClick={() => setDropDown(!dropDown)}
                                    />

                            }

                            {/* {
                            dropDown ? (
                                <DropDown
                                    categoriesData={categoriesData}
                                    setDropDown={setDropDown}
                                />

                            ) :
                                null
                        } */}
                            <ul className='productnavmaincategory pb-4 bg-[#fff] absolute z-30 rounded-b-md shadow-sm'  >
                                <li className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                    <span className='flex justify-between items-center '>
                                        <Link href="">18 KT Diamond</Link>
                                        <MdOutlineKeyboardArrowRight />
                                    </span>
                                    <ul className='absolute top-0 left-[93%]'>

                                        <li className='py-2'>

                                            {
                                                dropDown ? (
                                                    <DropDown
                                                        categoriesData={categoriesData}
                                                        setDropDown={setDropDown}
                                                    />

                                                ) :
                                                    null
                                            }
                                        </li>
                                    </ul>




                                </li>
                                <li className='flex justify-between items-center'>
                                    <Link href="">Silver</Link>
                                    <MdOutlineKeyboardArrowRight />

                                </li>
                            </ul>



                        </li>
                        <li><NavLink to="/personalised-prosperity" onClick={scrollToTop} activeClassName="active">Customized Jewellery</NavLink></li>
                        <li><Link to="/contacts" onClick={scrollToTop} activeClassName="active">Contact</Link></li>
                    </ul>
                    {/* </div> */}

                    <div className='icons'>
                        <div className="w-[100%] relative">
                            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                            <input className='h-[40px] w-full px-2 py-2 border-[#000] border-[2px] rounded-md' type="text" placeholder='Search Products' value={searchTerm} onChange={handleSearchChange} />
                            <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
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
                                                            <Link to={`/product/${Product_name}`}>
                                                                <div className="w-full flex items-start-py-3">
                                                                    <img src={`${backend_url}${i.images[0]}`} alt="" className='w-[60px] h-[50px] mr-[10px] object-cover' />
                                                                    <p>{i.name}</p>
                                                                </div>
                                                            </Link>
                                                        </>
                                                    )

                                                })
                                            }

                                        </div>
                                    ) :
                                    null
                            }

                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[2px]"
                                onClick={() => setOpenWishlist(true)}

                            >
                                <Badge badgeContent={wishlist && wishlist.length} color="primary">
                                    <AiOutlineHeart size={28} />
                                </Badge>

                            </div>
                        </div>

                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[2px]"

                            >
                                {
                                    isAuthenticated ?
                                        (
                                            <Link to="/profile">
                                                <CgProfile size={30} />

                                                {/* <img className='w-[35px] h-[35px] rounded-full' src={`${backend_url}${user.avatar}`} alt="" /> */}
                                            </Link>
                                        )
                                        :
                                        (
                                            <Link to="/login">
                                                <CgProfile size={30} />
                                            </Link>)
                                }


                            </div>
                        </div>




                        <div onClick={() => {
                            navigate("/cart")
                            setbars(false)
                        }}>
                            <Badge badgeContent={cart && cart.length} color="primary" badgeContentClassName="custom-badge-content">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Badge>



                        </div>
                        {
                            openWishlist ?
                                (
                                    <Wishlist setOpenWishlist={setOpenWishlist} />
                                )
                                :
                                null
                        }

                    </div>


                </div>
            </div>

            {/* Mobile Navbar */}
            <div
                className={`mobile-nav  ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    }
      w-full h-[70px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
            >
                <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(true)} />
                    </div>

                    <div className="logo pt-2" onClick={() => {
                        setbars(false)
                        navigate("/")
                    }} >
                        <img className='w-[150px] h-[60px] object-contain' src="https://lirp.cdn-website.com/48f148a6/dms3rep/multi/opt/Tiny+Tiaraa_C5-1920w.png" alt="" />
                    </div>

                    <div>
                        <div onClick={() => {
                            navigate("/cart")
                            setbars(false)
                        }} className='mr-[20px]'>

                            <i className="fa-solid fa-cart-shopping text-[25px]" ></i>


                        </div>

                    </div>

                </div>


                {/* navbar sidebar */}

                {
                    open && (
                        <div className='fixed w-full bg-[#0000005f] z-[20] h-full top-0 left-0'>
                            <div className='fixed w-[60%] bg-[white] h-screen top-0 left-0 z-10'>
                                <div className="w-full justify-between flex pr-3">
                                    <div>
                                        <div className=" mr-[15px]">
                                            <AiOutlineHeart size={30} className='mt-5 ml-5' />

                                        </div>
                                    </div>
                                    <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setOpen(false)} />

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
                                                                    <Link to={`/product/${Product_name}`}>
                                                                        <div className="w-full flex items-center pb-3 overflow-hidden">
                                                                            <img src={i.image_Url[0].url} alt="" className='w-[60px] h-[50px] mr-[10px] scale-150 object-contain' />
                                                                            <p className='font-Poppins text-[15px]'>{i.name}</p>
                                                                        </div>
                                                                    </Link>
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

                                        <li><NavLink to="/" onClick={() => { scrollToTop; closenavbar }} activeClassName="active">Home</NavLink></li>
                                        <li><NavLink to="/about" onClick={() => { scrollToTop; closenavbar }} activeClassName="active">About</NavLink></li>
                                        <li className='relative parenthover' >
                                            <NavLink to="/shop" onClick={() => { scrollToTop; closenavbar }} activeClassName="active">Products</NavLink>
                                            {
                                                dropDown ?
                                                    <IoIosArrowUp
                                                        size={20}
                                                        className="absolute right-0 top-0 cursor-pointer"
                                                    // onClick={() => setDropDown(!dropDown)}
                                                    />

                                                    :

                                                    <IoIosArrowDown
                                                        size={20}
                                                        className="absolute right-0 top-0 cursor-pointer"
                                                    // onClick={() => setDropDown(!dropDown)}
                                                    />

                                            }

                                            {/* {
    dropDown ? (
        <DropDown
            categoriesData={categoriesData}
            setDropDown={setDropDown}
        />

    ) :
        null
} */}
                                            <ul className='productnavmaincategory w-[150px] pb-4 bg-[#fff] mt-5 z-30 rounded-b-md shadow-sm'  >
                                                <li className='relative pb-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                                    <span className='flex justify-between items-center '>
                                                        <Link href="">18 KT Diamond</Link>
                                                        <MdOutlineKeyboardArrowRight />
                                                    </span>
                                                    <ul className='absolute top-0 left-[97%]'>

                                                        <li className='py-2'>

                                                            {
                                                                dropDown ? (
                                                                    <DropDown
                                                                        categoriesData={categoriesData}
                                                                        setDropDown={setDropDown}
                                                                    />

                                                                ) :
                                                                    null
                                                            }
                                                        </li>
                                                    </ul>




                                                </li>
                                                <li className='flex justify-between items-center'>
                                                    <Link href="">Silver</Link>
                                                    <MdOutlineKeyboardArrowRight />

                                                </li>
                                            </ul>



                                        </li>
                                        <li><NavLink to="/personalised-prosperity" onClick={() => { scrollToTop }} activeClassName="active">Customized Jewellery</NavLink></li>
                                        <li><Link to="/contacts" onClick={() => { scrollToTop }} activeClassName="active">Contact</Link></li>
                                    </ul>
                                </div>

                                <div className="flex w-full justify-center mt-6">
                                    {
                                        isAuthenticated ?
                                            <>
                                                <div className='flex flex-col items-center mt-6 font-Poppins'>
                                                    <img className='w-[50px] h-[50px] rounded-full' src={`${backend_url}${user.avatar}`} alt="" />
                                                    <h3 className='capitalize font-[500]'>{user.name}</h3>
                                                </div>

                                            </>

                                            :
                                            <>
                                                <Link to="/login" className='text-[18px] font-Poppins pr-[10px]'>Login /</Link>
                                                <Link to="/sign-up" className='text-[18px] font-Poppins'>Sign Up</Link>


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

export default Navbar
