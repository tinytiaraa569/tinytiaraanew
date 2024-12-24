import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineEmail, MdOutlineVerified } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { RiExchangeFundsLine } from "react-icons/ri";
import { CiCalendarDate, CiFacebook } from "react-icons/ci";
import { AiOutlineGold } from "react-icons/ai";
import { IoChevronBackOutline, IoChevronForwardOutline, IoDiamondOutline } from "react-icons/io5";
import { RxDimensions } from "react-icons/rx";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { FaAngleRight, FaChild, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";
import { TbCertificate } from "react-icons/tb";
import { MdOutlineAppRegistration } from "react-icons/md";
import { GiHeartNecklace } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";
import ImgZoom from 'react-img-zoom';
// import 'react-img-zoom/dist/index.css';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { backend_url, imgdburl, server } from '@/server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/actions/cart';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '@/redux/actions/wishlist';
import Ratings from './Ratings';
import review1img from './reviewsimages/review1.jpg'
import review2img from './reviewsimages/review2.jpg'
import axios from 'axios';
import Modal from 'react-modal';
import './productdetails.css'

import withchainimg from './withchain.svg'
import withoutchainimg from './withoutchain.svg'

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { EmailIcon, FacebookIcon, WhatsappIcon, } from "react-share";
import { EmailShareButton, FacebookShareButton, WhatsappShareButton, } from "react-share";
import { Helmet } from 'react-helmet-async';


Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element

function ProductDetails({ data }) {

    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.user)




    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)


    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [validationError, setValidationError] = useState('');

    const [showGallery, setShowGallery] = useState(false); // State for gallery modal
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index in modal


    const [selectedEnamelColor, setSelectedEnamelColor] = useState(null)


    const [selectedChainSize, setSelectedChainSize] = useState("");
    const createSlug = (name) => {
        return name.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w-]+/g, '');
    };

    const productSlug = createSlug(data.name);
    const productUrl = `https://www.tinytiaraa.com/product/${productSlug}`;
    const [isExpanded, setIsExpanded] = useState(false);

    const { currency, conversionRates } = useSelector((state) => state.currency); // Access currency state and conversion rates

    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };

    // // console.log(data.withchainimages)
    // const addToCartHandler = (id) => {

    //     const isItemExists = cart && cart.find((i) => i._id === id)

    //     if (isItemExists) {
    //         toast.error("Item Already in cart")
    //     } else {
    //         if (data.stock < count) {
    //             toast.error("Product Stock limited")

    //         } else {
    //             const cartData = { ...data, qty: count }
    //             dispatch(addToCart(cartData))
    //             toast.success("Product Added to cart")
    //         }
    //     }

    // }
    // const addToCartHandler = (id, shouldNavigate = false) => {
    //     console.log("Selected Color:", selectedColor);
    //     console.log("Show With Chain:", showWithChain);
    //     console.log("Selected Enamel Color:", selectedEnamelColor);

    //     if (validateForm()) {
    //         // Check if the item already exists in the cart with the same combination of options
    //         const isItemExists = cart && cart.find((i) =>
    //             i._id === id &&
    //             i.selectedColor === selectedColor &&
    //             i.showWithChain === showWithChain &&
    //             i.selectedEnamelColor === selectedEnamelColor
    //         );

    //         if (isItemExists) {
    //             toast.error("Item Already in cart");
    //         } else {
    //             if (data.stock < count) {
    //                 toast.error("Product Stock limited");
    //             } else {
    //                 const cartData = {
    //                     ...data,
    //                     qty: count,
    //                     selectedColor: selectedColor,
    //                     showWithChain: showWithChain,
    //                     selectedEnamelColor: selectedEnamelColor
    //                 };
    //                 dispatch(addToCart(cartData));
    //                 toast.success("Product Added to cart");

    //                 // Console log the updated cart value
    //                 console.log("Updated Cart:", cart); // Assuming `cart` is from useSelector

    //                 // Optionally, you can also console log the `cartData` if needed
    //                 console.log("Added to Cart:", cartData);
    //                 if (shouldNavigate) {
    //                     navigate('/cart');
    //                 }
    //             }
    //         }
    //     } else {
    //         toast.error("Please select color and chain options.");
    //     }
    // };

    // const addToCartHandler = (id, shouldNavigate = false) => {
    //     console.log("Selected Color:", selectedColor);
    //     console.log("Show With Chain:", showWithChain);
    //     console.log("Selected Enamel Color:", selectedEnamelColor);

    //     if (validateForm()) {
    //         // Check if the item already exists in the cart with the same combination of options
    //         const isItemExists = cart && cart.find((i) =>
    //             i._id === id &&
    //             i.selectedColor === selectedColor &&
    //             i.showWithChain === showWithChain &&
    //             i.selectedEnamelColor === selectedEnamelColor
    //         );

    //         if (isItemExists) {
    //             toast.error("Item Already in cart");
    //             return;
    //         }

    //         // Determine the stock to validate against
    //         let availableStock = data.stock; // Default stock

    //         if (selectedEnamelColor) {
    //             const enamelKey = `${selectedEnamelColor.toLowerCase()}${selectedColor}clrStock`;
    //             availableStock = data.Enamelcolorstock[selectedEnamelColor]?.[enamelKey] || 0;
    //         } else if (selectedColor) {
    //             const metalKey = `${selectedColor}clrStock`;
    //             availableStock = data.Metalcolorstock[metalKey] || 0;
    //         }

    //         // Validate stock
    //         // if (availableStock < count) {
    //         //     toast.error("Product Stock limited");
    //         //     return;
    //         // }

    //         // Proceed with adding to cart
    //         const cartData = {
    //             ...data,
    //             qty: count,
    //             selectedColor: selectedColor,
    //             showWithChain: showWithChain,
    //             selectedEnamelColor: selectedEnamelColor
    //         };
    //         dispatch(addToCart(cartData));
    //         toast.success("Product Added to cart");

    //         // Console log the updated cart value
    //         console.log("Updated Cart:", cart); // Assuming `cart` is from useSelector

    //         // Optionally, you can also console log the `cartData` if needed
    //         console.log("Added to Cart:", cartData);
    //         if (shouldNavigate) {
    //             navigate('/cart');
    //         }
    //     } else {
    //         toast.error("Please select color and chain options.");
    //     }
    // };

    const metalColors = {
        0: "Yellow Gold",
        1: "Rose Gold",
        2: "White Gold",
    };

    const addToCartHandler = (id, shouldNavigate = false) => {
        console.log("Selected Color Index:", selectedColor);
        console.log("Show With Chain:", showWithChain);
        console.log("Selected Enamel Color:", selectedEnamelColor);

        // Convert the selectedColor index to the actual metal color name
        const selectedMetalColor = metalColors[selectedColor];

        if (validateForm()) {
            // Check if the item already exists in the cart with the same combination of options
            const isItemExists = cart && cart.find((i) =>
                i._id === id &&
                i.selectedColor === selectedColor &&
                i.showWithChain === showWithChain &&
                i.selectedEnamelColor === selectedEnamelColor
            );

            if (isItemExists) {
                toast.error("Item already in cart");
                return;
            }

            // Determine the stock to validate against
            let availableStock = data.stock; // Default stock
            let stockMessage = ''; // Message to show stock availability

            if (selectedEnamelColor) {
                // Clean the selectedEnamelColor key to match the data format
                const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');

                // Construct the key to access the specific enamel color stock
                const enamelKey = `${cleanedEnamelColor}${selectedMetalColor.replace(/ /g, '')}clrStock`;

                // Access the stock value for the selected enamel color and metal color
                availableStock = data.Enamelcolorstock[cleanedEnamelColor]?.[enamelKey] || 0;

                if (availableStock === null) {
                    availableStock = 0; // Treat null as zero stock
                }

                stockMessage = `Stock for ${selectedEnamelColor} with ${selectedMetalColor}: ${availableStock}`;
            } else if (selectedCombination) {
                const formattedCombination = selectedCombination
                    .toLowerCase()
                    .replace(/[_+\s]/g, ''); // Normalize combination name
                console.log('Formatted Combination:', formattedCombination);
            
                const combinationStock = data?.combinationStocks?.[formattedCombination];
                console.log('Resolved Combination Stock:', combinationStock);
            
                if (combinationStock) {
                    const selectedMetalKey = selectedMetalColor.toLowerCase().replace(/\s/g, ''); // Normalize metal key
                    console.log('Selected Metal Key:', selectedMetalKey);
            
                    const yellowGoldStock = combinationStock?.yellowGold || 0;
                    const roseGoldStock = combinationStock?.roseGold || 0;
                    const whiteGoldStock = combinationStock?.whiteGold || 0;
            
                    console.log('Yellow Gold Stock:', yellowGoldStock);
                    console.log('Rose Gold Stock:', roseGoldStock);
                    console.log('White Gold Stock:', whiteGoldStock);
            
                    if (selectedMetalKey === 'yellowgold') {
                        availableStock = yellowGoldStock;
                    } else if (selectedMetalKey === 'rosegold') {
                        availableStock = roseGoldStock;
                    } else if (selectedMetalKey === 'whitegold') {
                        availableStock = whiteGoldStock;
                    }
            
                    // Check if stock is available
                    if (availableStock === 0 || availableStock === null) {
                        availableStock = 0;
                        stockMessage = `Stock for ${formattedCombination} with ${selectedMetalKey}: ${availableStock}`;
                        console.warn(stockMessage);
                        return;
                    }
                } else {
                    console.warn(`Combination not found: ${formattedCombination}`);
                    availableStock = 0;
                }
            
            }
            
            else if (selectedMetalColor) {
                // Construct the key to access the specific metal color stock
                const metalKey = `${selectedMetalColor.replace(/ /g, '')}clrStock`;

                // Access the stock value for the selected metal color
                availableStock = data.Metalcolorstock[metalKey] || 0;

                if (availableStock === null) {
                    availableStock = 0; // Treat null as zero stock
                }

                stockMessage = `Stock for ${selectedMetalColor}: ${availableStock}`;
            } else {
                // Default stock message
                stockMessage = `Default stock: ${availableStock}`;
            }

            // Validate stock and show message
            if (availableStock < count) {
                toast.error(`Stock limited. ${stockMessage}`);
                return;
            } else {
                // toast.info(stockMessage); // Inform the user about available stock
            }

            const chainPrice = selectedChainSize === '13inch' ? 7200 : (selectedChainSize === '18inch' ? 14400 : 0);

            // Proceed with adding to cart
            const cartData = {
                ...data,
                qty: count,
                selectedColor: selectedColor,
                showWithChain: showWithChain,
                selectedEnamelColor: selectedEnamelColor,
                selectedChainSize: selectedChainSize, // Add selected chain size,
                selectedCombination: selectedCombination,
                chainPrice: chainPrice
            };
            dispatch(addToCart(cartData));
            toast.success("Product added to cart");

            // Console log the updated cart value
            console.log("Updated Cart:", cart); // Assuming `cart` is from useSelector

            // Optionally, you can also console log the `cartData` if needed
            console.log("Added to Cart:", cartData);
            if (shouldNavigate) {
                navigate('/cart');
            }
        } else {
            // toast.error("Please select color and chain options.");
        }
    };







    



    const shareOnInstagram = (product) => {
        // const caption = `Check out this amazing product: ${product.name}!`;

        console.log(product, "share data")
        const url = `https://www.instagram.com/?url=${productUrl}`;
        window.open(url, '_blank');
    };

    useEffect(() => {

        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true)

        } else {
            setClick(false)
        }

    }, [wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishlist(data))


    }
    const addToWishlistHandler = (data) => {
        setClick(!click)
        dispatch(addToWishlist(data))


    }



    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };



    const [selectedColor, setSelectedColor] = useState(null);
    const handleColorChange = (colorIndex) => {
        setSelectedColor(colorIndex); // Update selectedColor state with the index of the color
        setSelect(0); // Reset selected image index to 0 when color changes

        // setShowWithChain(null);
    };
    const [showWithChain, setShowWithChain] = useState(null);

    const toggleChainOption = (option) => {
        if (option === 'with') {
            setShowWithChain(true);
            setSelectedChainSize('13inch'); // Set default to 13 inches
            setFinalPrice(data.discountPrice + 7200);
            setFinalOriginalPrice(data.originalPrice + 7200);
        } else {
            setShowWithChain(false);
            setSelectedChainSize(null); // Clear the selection when "Without Chain" is selected
            setFinalPrice(data.discountPrice);
            setFinalOriginalPrice(data.originalPrice);
        }
        // setShowWithChain(option === 'with'); // Set showWithChain based on the selected option ('with' or 'without')
        // setSelect(0); // Reset selected image index when toggling chain option
        // setSelectedColorIndex(null);
        if (option === 'without') {
            setSelectedChainSize(""); // Reset selected chain size when without chain is chosen
        }
    };

    // const imagesArray =
    // selectedColor === 0
    //     ? data.MetalColor.YellowGoldclr
    //     : selectedColor === 1
    //         ? data.MetalColor.RoseGoldclr
    //         : selectedColor === 2
    //             ? data.MetalColor.WhiteGoldclr

    //             : showWithChain === true
    //                 ? data.withchainimages
    //                 : showWithChain === false
    //                     ? data.withchainoutimages


    //                     : data.images;

    // Function to normalize key format (remove underscores and convert to camel case)






    const renderImages = () => {
        // Determine which array of images to render based on selectedColor


        const displayedImages = imagesArray.slice(0, 4); // Limit to first 4 images
        const remainingImageCount = imagesArray.length - displayedImages.length;

        return (
            <div className='w-full flex '>
                {displayedImages &&
                    displayedImages.map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-[24%] ${select === index ? 'border' : ''} cursor-pointer`}
                            onClick={() => setSelect(index)}
                        >
                            <img
                                // src={`${image?.url}`}
                                src={
                                    image?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                        ? image.url.replace(
                                            /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                            `${imgdburl}/uploads/images`
                                          )
                                        : `${imgdburl}${image?.url}` // Prepend imgdburl if not a Cloudinary URL
                                }
                                alt=""
                                className='w-[100%] h-[160px] object-contain'
                            />
                            {index === 3 && remainingImageCount > 0 && (
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold cursor-pointer"
                                    onClick={() => {
                                        setCurrentImageIndex(3);
                                        setShowGallery(true);
                                    }} // Open gallery modal
                                >
                                    + {remainingImageCount} more
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        );
    };

    const handleMessageSubmit = async () => {

        console.log(data, "checking")

        if (isAuthenticated) {
            const groupTitle = data._id + user._id
            const userId = user._id
            const sellerId = data.shopId
            await axios.post(`${server}/conversation/create-new-conversation`, {
                groupTitle, userId, sellerId
            }).then((res) => {
                navigate(`/conversation/${res.data.conversation._id}`)

            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } else {
            toast.error("Please Login to create a conversation")
        }

    }

    // const validateForm = () => {
    //     const hasChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;
    //     if (!hasChainOptions) {
    //         return selectedColor !== null;
    //     }
    //     return selectedColor !== null && showWithChain !== null;
    // };
    const validateForm = () => {
        const hasChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;
        const isEnamelColorRequired = shouldShowEnamel && availableEnamelColors.length > 0;
        const hasMetalColors = availableMetalColors.length > 0;
        if (!hasChainOptions) {
            if (hasMetalColors && selectedColor === null) {
                setValidationError('Please select a metal color..');
                return false;
            }
            if (isEnamelColorRequired && selectedEnamelColor === null) {
                setValidationError('Please select an enamel color.');
                return false;
            }
            return true;
        }

        if (hasMetalColors && selectedColor === null) {
            setValidationError('Please select a metal color.');
            return false;
        }
        if (showWithChain === null) {
            setValidationError('Please select a chain option.');
            return false;
        }
        if (isEnamelColorRequired && selectedEnamelColor === null) {
            setValidationError('Please select an enamel color.');
            return false;
        }

        return true;
    };
    useEffect(() => {
        // Reset validation error on color or chain change

        setValidationError('');
    }, [selectedColorIndex, showWithChain, selectedColor, selectedEnamelColor ]);

    // Determine if chain options should be displayed
    const shouldShowChainOptions = data.withchainimages.length > 0 || data.withchainoutimages.length > 0;

    // const getAvailableEnamelColors = (enamelColors) => {
    //     return Object.entries(enamelColors)
    //         .filter(([color, colorData]) => {
    //             // Format the enamel color part
    //             const baseColor = color.toLowerCase().replace(/_/g, '');

    //             // Construct the correct keys for data access
    //             const yellowGoldKey = `${baseColor}YellowGoldclr`;
    //             const roseGoldKey = `${baseColor}RoseGoldclr`;
    //             const whiteGoldKey = `${baseColor}WhiteGoldclr`;

    //             // Safeguard checks to ensure arrays are defined and not empty
    //             const hasYellowGoldclr = Array.isArray(colorData[yellowGoldKey]) && colorData[yellowGoldKey].length > 0;
    //             const hasRoseGoldclr = Array.isArray(colorData[roseGoldKey]) && colorData[roseGoldKey].length > 0;
    //             const hasWhiteGoldclr = Array.isArray(colorData[whiteGoldKey]) && colorData[whiteGoldKey].length > 0;

    //             // Debug: Log the availability status
    //             console.log(`Color: ${color}, YellowGold: ${hasYellowGoldclr}, RoseGold: ${hasRoseGoldclr}, WhiteGold: ${hasWhiteGoldclr}`);

    //             // Return true if any of the arrays are non-empty
    //             return hasYellowGoldclr || hasRoseGoldclr || hasWhiteGoldclr;
    //         })
    //         .map(([color]) => ({ _id: color, enamelColorName: color.replace(/_/g, ' ') })); // Format color names
    // };

    // Determine if there are any available enamel colors



    // const availableEnamelColors = getAvailableEnamelColors(data.enamelColors || {});
    // const shouldShowEnamel = availableEnamelColors.length > 0;

    // // Debug: Print available enamel colors
    // console.log("Available Enamel Colors:", availableEnamelColors);





    // Gallery Navigation Handlers

    // const getAvailableEnamelColors = (enamelColors, selectedMetalColor) => {
    //     return Object.entries(enamelColors)
    //         .filter(([color, colorData]) => {
    //             // Format the enamel color part
    //             const baseColor = color.toLowerCase().replace(/_/g, '');

    //             // Construct the correct key for the selected metal color
    //             const metalColorKey = `${baseColor}${selectedMetalColor}`;

    //             // Safeguard checks to ensure the array is defined and not empty
    //             const hasMetalColor = Array.isArray(colorData[metalColorKey]) && colorData[metalColorKey].length > 0;

    //             // Debug: Log the availability status
    //             console.log(`Color: ${color}, Metal Color Key: ${metalColorKey}, Has Metal Color: ${hasMetalColor}`);

    //             // Return true if the array for the selected metal color is non-empty
    //             return hasMetalColor;
    //         })
    //         .map(([color]) => ({ _id: color, enamelColorName: color.replace(/_/g, ' ') })); // Format color names
    // };

    // // Call the function with the selected metal color
    // const selectedMetalColorKey = selectedColor === 0 ? "YellowGoldclr" : selectedColor === 1 ? "RoseGoldclr" : "WhiteGoldclr";
    // const availableEnamelColors = getAvailableEnamelColors(data.enamelColors || {}, selectedMetalColorKey);
    // const shouldShowEnamel = availableEnamelColors.length > 0;

    // Debug: Print available enamel colors based on selected metal color
    // console.log("Available Enamel Colors for Selected Metal:", availableEnamelColors);


    const getAvailableEnamelColors = (enamelColors, selectedMetalColor) => {
        return Object.entries(enamelColors)
            .filter(([color, colorData]) => {
                const baseColor = color.toLowerCase().replace(/_/g, '');
                const enamelKeys = [
                    `${baseColor}YellowGoldclr`,
                    `${baseColor}RoseGoldclr`,
                    `${baseColor}WhiteGoldclr`
                ];

                if (selectedMetalColor) {
                    // Filter based on specific metal color
                    const enamelKey = `${baseColor}${selectedMetalColor}clr`;
                    return Array.isArray(colorData[enamelKey]) && colorData[enamelKey].length > 0;
                } else {
                    // Show all colors that have images in any metal color
                    return enamelKeys.some(key => Array.isArray(colorData[key]) && colorData[key].length > 0);
                }
            })
            .map(([color]) => {
                const baseColor = color.toLowerCase().replace(/_/g, '');
                const availableKeys = [
                    `${baseColor}YellowGoldclr`,
                    `${baseColor}RoseGoldclr`,
                    `${baseColor}WhiteGoldclr`
                ].filter(key => Array.isArray(enamelColors[color][key]) && enamelColors[color][key].length > 0);

                return {
                    _id: color,
                    enamelColorName: color.replace(/_/g, ' '),
                    availableKeys
                };
            });
    };



    // In your component, update the code to use the selected metal color when available:
    const availableEnamelColors = getAvailableEnamelColors(
        data.enamelColors || {},
        selectedColor !== null ? ["YellowGold", "RoseGold", "WhiteGold"][selectedColor] : null
    );

    console.log(availableEnamelColors,"see the vaiablae color")
    const shouldShowEnamel = availableEnamelColors.length > 0;
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < imagesArray.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : imagesArray.length - 1
        );
    };

    // --------------------------------

    const [selectedCombination, setSelectedCombination] = useState(''); 

    const getAvailableCombinationImages = (combinationImages, selectedMetalColor) => {
        console.log(combinationImages, "+===================");
    
        return Object.entries(combinationImages)
            .filter(([combination, metalData]) => {
                const baseCombination = combination.toLowerCase().replace(/_/g, '');
    
                // Metal colors for each combination (yellowGold, roseGold, whiteGold)
                const metalKeys = ['yellowGold', 'roseGold', 'whiteGold'];
    
                if (selectedMetalColor) {
                    // If a specific metal color is selected, filter for that metal
                    const metalKey = selectedMetalColor // Convert selected color to lowercase
                    return Array.isArray(metalData[metalKey]) && metalData[metalKey].length > 0;
                } else {
                    // If no specific metal color is selected, show all available metal colors
                    return metalKeys.some(key => Array.isArray(metalData[key]) && metalData[key].length > 0);
                }
            })
            .map(([combination, metalData]) => {
                const baseCombination = combination.toLowerCase().replace(/_/g, '');
    
                // Filter metal colors that have available images
                const availableMetalKeys = ['yellowGold', 'roseGold', 'whiteGold'].filter(key => 
                    Array.isArray(metalData[key]) && metalData[key].length > 0
                );
    
                // Flatten the images of the available metal colors
                const images = availableMetalKeys.map(key => metalData[key]).flat();
    
                return {
                    combinationName: combination.replace(/_/g, ' '), // Format combination name (e.g., blueblack -> Blue Black)
                    availableMetalKeys,
                    images
                };
            });
    };
    
    // In your component, call the function with the appropriate data and selected metal color
    const availableCombinationImages = getAvailableCombinationImages(
        data.combinationmetalImages || {}, // Ensure data is available
        selectedColor !== null ? ["yellowGold", "roseGold", "whiteGold"][selectedColor] : null
    );
    
    console.log(availableCombinationImages, "see the available combination images");
    
    // Check if there are available combinations
    const shouldShowCombinations = availableCombinationImages.length > 0;
    console.log(shouldShowCombinations, "----------------------------");
    



    function getAvailableMetalColors(metalColors) {
        return Object.keys(metalColors)
            .filter((key) => metalColors[key].length > 0)
            .map((key) => {
                return {
                    colorKey: key,
                    colorName: key.replace(/clr$/i, '')
                };
            });
    }
    const availableMetalColors = getAvailableMetalColors(data.MetalColor || {});
    const shouldShowMetalColors = availableMetalColors.length > 0;
    

    // const imagesArray = (() => {
    //     const enamelColorData = data.enamelColors[selectedEnamelColor] || {};
    //     console.log(enamelColorData, "see enamel data");
    //     console.log(selectedEnamelColor, "see enamel color");

    //     if (selectedEnamelColor) {
    //         const formattedColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');

    //         if (selectedColor !== null) {
    //             // Construct the enamel key for the selected metal color
    //             const enamelKey = `${formattedColor}${["YellowGold", "RoseGold", "WhiteGold"][selectedColor]}clr`;
    //             console.log("Enamel Key:", enamelKey);

    //             // Return images for the selected enamel and metal color
    //             const images = enamelColorData[enamelKey] || [];
    //             if (images.length > 0) {
    //                 return images;
    //             } else {
    //                 // Reset selectedEnamelColor if no images are found for the selected metal color
    //                 setSelectedEnamelColor(null);
    //             }
    //         } else {
    //             // Initial state: Show all images for the selected enamel color across all metal colors
    //             const availableKeys = getAvailableEnamelColors(data.enamelColors || {}, null)
    //                 .find(color => color._id === selectedEnamelColor)?.availableKeys || [];

    //             return availableKeys.flatMap(key => enamelColorData[key] || []);
    //         }
    //     }

    //      // Handle selected metal colors when no enamel color is selected
    //      if (selectedColor === 0 ) {
    //         return data.MetalColor.YellowGoldclr || []; // Return Yellow Gold images
            
    //     } else if (selectedColor === 1) {
    //         return data.MetalColor.RoseGoldclr || []; // Return Rose Gold images
    //     } else if (selectedColor === 2) {
    //         return data.MetalColor.WhiteGoldclr || []; // Return White Gold images
    //     }


    //     // Default to metal color images if no enamel color is selected
    //     if (showWithChain === true) {
    //         return data.withchainimages || []; // Return chain images if the chain is selected
    //     } else if (showWithChain === false) {
    //         return data.withchainoutimages || []; // Return non-chain images if the chain is not selected
    //     }
    
       
    

    //     return data.images || [];
    // })();


    const imagesArray = (() => {
        const enamelColorData = data.enamelColors[selectedEnamelColor] || {};
        const combinationData = data.combinationmetalImages || {};
        console.log(enamelColorData, "see enamel data");
        console.log(selectedEnamelColor, "see enamel color");
        
        // Handle Enamel Color and Metal Color Images
        if (selectedEnamelColor) {
            const formattedColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
            
            if (selectedColor !== null) {
                // Construct the enamel key for the selected metal color
                const enamelKey = `${formattedColor}${["YellowGold", "RoseGold", "WhiteGold"][selectedColor]}clr`;
                console.log("Enamel Key:", enamelKey);
    
                // Return images for the selected enamel and metal color
                const images = enamelColorData[enamelKey] || [];
                if (images.length > 0) {
                    return images;
                } else {
                    // Reset selectedEnamelColor if no images are found for the selected metal color
                    setSelectedEnamelColor(null);
                }
            } else {
                // Initial state: Show all images for the selected enamel color across all metal colors
                const availableKeys = getAvailableEnamelColors(data.enamelColors || {}, null)
                    .find(color => color._id === selectedEnamelColor)?.availableKeys || [];
    
                return availableKeys.flatMap(key => enamelColorData[key] || []);
            }
        }
        // Handle selected combination of metal color and enamel color
                if (selectedCombination) {
                    const formattedCombination = selectedCombination.toLowerCase().replace(/_/g, '');
                    console.log("Formatted Combination:", formattedCombination);

                    const combinationKey = combinationData[formattedCombination];
                    console.log("Combination Key Data:", combinationKey);

                    if (combinationKey) {
                        if (selectedColor !== null) {
                            // Handle specific metal color selection
                            const selectedMetal = ["yellowGold", "roseGold", "whiteGold"][selectedColor]; // Determine the metal color key

                            // Ensure the selectedMetal key exists and contains images
                            if (selectedMetal && Array.isArray(combinationKey[selectedMetal])) {
                                const images = combinationKey[selectedMetal];
                                if (images.length > 0) {
                                    return images; // Return images for the selected combination and metal color
                                } else {
                                    // console.warn(`No images found for combination: ${selectedCombination}, metal: ${selectedMetal}`);
                                }
                            } else {
                                // console.warn(`Invalid metal color or no images found for combination: ${selectedCombination}`);
                            }
                        } 
                        
                        // Check for all images related to the specific combination, ignoring metal color
                        const availableCombinationImages = [];
                        const availableMetalKeys = ["yellowGold", "roseGold", "whiteGold"];

                        // Collect all images across metal colors for the specific combination
                        availableMetalKeys.forEach(key => {
                            if (Array.isArray(combinationKey[key])) {
                                availableCombinationImages.push(...combinationKey[key]);
                            }
                        });

                        if (availableCombinationImages.length > 0) {
                            return availableCombinationImages; // Return all images for the selected combination
                        } else {
                            // console.warn(`No general images found for combination: ${selectedCombination}`);
                        }
                    } else {
                        // console.warn(`Invalid combination: ${selectedCombination}`);
                    }
                }
        
    
        // Handle selected metal colors when no enamel color is selected
        if (selectedColor === 0) {
            return data.MetalColor.YellowGoldclr || []; // Return Yellow Gold images
        } else if (selectedColor === 1) {
            return data.MetalColor.RoseGoldclr || []; // Return Rose Gold images
        } else if (selectedColor === 2) {
            return data.MetalColor.WhiteGoldclr || []; // Return White Gold images
        }
    
        // Handle Combination Color Images
       
        // Default behavior: Show images based on chain selection
        if (showWithChain === true) {
            return data.withchainimages || []; // Return chain images if the chain is selected
        } else if (showWithChain === false) {
            return data.withchainoutimages || []; // Return non-chain images if the chain is not selected
        }
    
        // Fallback: Return general images if no specific selection is made
        return data.images || [];
    })();
    console.log(imagesArray, "see image array");

    // --------------------------------


    const [finalPrice, setFinalPrice] = useState(data.discountPrice);
    const [finalOriginalPrice, setFinalOriginalPrice] = useState(data.originalPrice);


    const handleChainSizeChange = (event) => {
        setSelectedChainSize(event.target.value);

        // Calculate the new price based on the selected chain size
        const chainSize = event.target.value;
        let additionalPrice = 0;
        if (chainSize === "13inch") {
            additionalPrice = 7200;
        } else if (chainSize === "18inch") {
            additionalPrice = 14400;
        }
        const basePrice = data.discountPrice;
        setFinalPrice(basePrice + additionalPrice);
        setFinalOriginalPrice(data.originalPrice + additionalPrice);
    };

    const calculateDiscountPercentage = (originalPrice, discountPrice) => {

        // let chainwithoriginalPrice = 


        if (originalPrice > 0 && discountPrice > 0 && originalPrice > discountPrice) {
            return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
        }
        return 0;
    };
    const discountPercentage = calculateDiscountPercentage(finalOriginalPrice, finalPrice);
    const convertedFinalPrice = (finalPrice * (conversionRates[currency] || 1)).toFixed(0);
    const convertedFinalOriginalPrice = (finalOriginalPrice * (conversionRates[currency] || 1)).toFixed(0);
  
    console.log(selectedChainSize, "chain size")

    // const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const [pincode, setpincode] = useState("");
    const [estimatedDeliveryRange, setEstimatedDeliveryRange] = useState("Enter your zip code");
    const [isLoading, setIsLoading] = useState(false);
    const originPincode = "400093"; // You can set this dynamically if needed
    const pickupDate = new Date().toISOString().split("T")[0]; // Current date
    const [showResult, setShowResult] = useState(false); // State to control visibility

    // Function to format date as "13 Sept"
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        return `${day} ${month}`;
    };
    const [isZoomed, setIsZoomed] = useState(false);

    const calculateEDD = async () => {
        if (!pincode) {
            setEstimatedDeliveryRange("Please enter a pincode");
            setShowResult(true); // Show result even if there's an error
            return;
        }

        setIsLoading(true);
        setShowResult(false); // Hide result until calculation is done

        try {
            const response = await axios.post(
                `${server}/calculateEDD`, // Adjust your server URL here
                {
                    origin_pincode: originPincode,
                    destination_pincode: pincode,
                    pickup_date: pickupDate,
                }
            );
    
            if (response.data.status) {
                const deliveryDateStr = response.data.data.estimated_delivery;
                const deliveryDate = new Date(deliveryDateStr.split("-").reverse().join("-"));
    
                const startDate = formatDate(deliveryDate);
    
                // Add 2 days to the delivery date
                const endDate = new Date(deliveryDate);
                endDate.setDate(deliveryDate.getDate() + 2);
    
                const endDateFormatted = formatDate(endDate);
    
                // Set the delivery range in the format "13 Sept - 16 Sept"
                setEstimatedDeliveryRange(`${startDate} - ${endDateFormatted}`);
            } else {
                setEstimatedDeliveryRange("Could not calculate EDD");
            }
        } catch (error) {
            console.error("Error fetching EDD:", error);
            setEstimatedDeliveryRange("Error calculating EDD");
        } finally {
            setIsLoading(false);
            setShowResult(true); // Show result after calculation
        }
    };

    console.log(data,"see product detail")


    // const selectedImage = (() => {
    //     // If a metal color is selected
    //     if (selectedColor === 0) {
    //         if (showWithChain === true) {
    //             // If Yellow Gold with chain is selected, return the 4th image (index 3)
    //             return data.MetalColor.YellowGoldclr[2]?.url || data.images && data.images[0]?.url;
    //         } else {
    //             // If Yellow Gold without chain, return all Yellow Gold images
    //             return imagesArray.length > 0 ? imagesArray[select]?.url : data.MetalColor.YellowGoldclr[0]?.url;
    //         }
    //     } else if (selectedColor === 1) {
    //         // If Rose Gold is selected
    //         if (showWithChain === true) {
    //             return data.MetalColor.RoseGoldclr[2]?.url || data.images && data.images[0]?.url;
    //         } else {
    //             return imagesArray.length > 0 ? imagesArray[select]?.url : data.MetalColor.RoseGoldclr[0]?.url;
    //         }
    //     } else if (selectedColor === 2) {
    //         // If White Gold is selected
    //         if (showWithChain === true) {
    //             return data.MetalColor.WhiteGoldclr[2]?.url || data.images && data.images[0]?.url;
    //         } else {
    //             return imagesArray.length > 0 ? imagesArray[select]?.url : data.MetalColor.WhiteGoldclr[0]?.url;
    //         }
    //     } 
    
    //     // Fallback to the original image logic if no specific metal color or chain option is selected
    //     return select !== null && imagesArray.length > 0
    //         ? imagesArray[select]?.url
    //         : data.images && data.images[0]?.url;
    // })();

    const selectedImage = (() => {
        let imageUrl = null;
    
        if (selectedColor !== null && selectedEnamelColor === null && selectedCombination === null) {
            const metalColorImages = [
                data.MetalColor.YellowGoldclr || [],
                data.MetalColor.RoseGoldclr || [],
                data.MetalColor.WhiteGoldclr || []
            ];
    
            // Check with chain logic
            const images = metalColorImages[selectedColor];
            if (showWithChain && !select) {
                imageUrl = images[2]?.url;
            } else if (select !== null) {
                imageUrl = images[select]?.url;
            }
        }
    
        // If there's no specific selected color, fallback to the general images array
        if (!imageUrl && imagesArray.length > 0) {
            imageUrl = imagesArray[select]?.url || data.images?.[0]?.url;
        }
    
        return imageUrl;
    })();
   
   
   
    return (
        <div className='bg-white'>
            <>
            <Helmet>
                <title>{data.name} - Safe, Certified and Registered Natural Diamond & Gold jewellery for infants and Kids</title>
                <meta name="description" content={`Buy ${data.name} - ${data.description}`} />
                <meta name="keywords" content={`Infants jewellery, kids jewellery, ${data.category}, gold jewellery for kids, ${data.name} ${data.tags}`} />
                <link rel="canonical" href={productUrl} />
            </Helmet>

            </>
            {
                data ?
                    <div className={`${styles.section} w-[95%] 800px:w-[80%]`}>
                        <div className='w-full py-5'>
                            <div className='flex w-full 800px:flex flex-col sm:flex-row'>
                                <div className="w-full 800px:w-[50%] mr-5">

                                    {/* {select !== null && (
                                        selectedColor === 0 && data.MetalColor.YellowGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.YellowGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 1 && data.MetalColor.RoseGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.RoseGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : selectedColor === 2 && data.MetalColor.WhiteGoldclr ? (
                                            <img
                                                src={`${data.MetalColor.WhiteGoldclr[select]?.url}`}
                                                alt=""
                                                className='w-[100%] h-[60vh] object-contain'
                                            />
                                        ) : (
                                            data.images && data.images[select] ? (
                                                <img
                                                    src={`${data.images[select]?.url}`}
                                                    alt=""
                                                    className='w-[100%] h-[60vh] object-contain'
                                                />
                                            ) : (
                                                <img
                                                    src={`${data.images && data.images[0]?.url}`} // Default to the first image if select is null or out of range
                                                    alt=""
                                                    className='w-[100%] h-[60vh] object-contain'
                                                />
                                            )
                                        )
                                    )
                                    } */}

{/*                                     
                                    {select !== null && imagesArray.length > 0 ? (
                                        <img
                                            src={`${imagesArray[select]?.url}`}
                                            alt=""
                                            className='w-[100%] h-[60vh] object-contain'
                                        />
                                    ) : (
                                        <img
                                            src={`${data.images && data.images[0]?.url}`} // Default to the first image if select is null or out of range
                                            alt=""
                                            className='w-[100%] h-[60vh] object-contain'
                                        />
                                    )} */}

                                <Zoom 
                                    zoomMargin={40} 
                                    defaultStyles={{ overlay: { zIndex: 1000 } }} 
                                    onZoom={() => setIsZoomed(true)} // Set zoomed state to true when the modal opens
                                    onUnzoom={() => setIsZoomed(false)} // Reset when it closes
                                >
                                    <img
                                    loading='lazy'
                                        // src={selectedImage}
                                        src={
                                            selectedImage?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                ? selectedImage.replace(
                                                    /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                    `${imgdburl}/uploads/images`
                                                )
                                                : `${imgdburl}${selectedImage}` // Prepend imgdburl if not a Cloudinary URL
                                        }
                                        alt=""
                                        className="textshadowfilterimgod w-[100%] h-[60vh] object-contain !cursor-pointer" // Image to click and zoom
                                    />
                                </Zoom>

                                

                                    <div className='w-full flex'>
                                        {renderImages()}
                                        <Modal
                                            isOpen={showGallery}
                                            onRequestClose={() => setShowGallery(false)}
                                            className="flex justify-center items-center outline-none"
                                            overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
                                            style={{
                                                overlay: { zIndex: 1000 },
                                                content: { border: 'none', background: 'transparent', padding: 0 },
                                            }}
                                        >
                                            <div className="relative bg-white p-4 rounded-lg shadow-lg w-full h-full max-w-4xl flex justify-center items-center">
                                                <button
                                                    className="absolute top-4 right-4 text-black text-2xl"
                                                    onClick={() => setShowGallery(false)}
                                                >
                                                    &times;
                                                </button>
                                                <button
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
                                                    onClick={handlePrevImage}
                                                >
                                                    <IoChevronBackOutline />
                                                </button>
                                                <button
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
                                                    onClick={handleNextImage}
                                                >
                                                    <IoChevronForwardOutline />

                                                </button>
                                                <div className="flex flex-col items-center">
                                                    <img
                                                        loading='lazy'

                                                        // src={`${imagesArray[currentImageIndex]?.url}`}
                                                        src={
                                                            imagesArray[currentImageIndex]?.url?.match(/https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/)
                                                                ? imagesArray[currentImageIndex].url.replace(
                                                                    /https:\/\/res\.cloudinary\.com\/ddaef5aw1\/image\/upload\/v[0-9]+/,
                                                                    `${imgdburl}/uploads/images`
                                                                )
                                                                : `${imgdburl}${imagesArray[currentImageIndex]?.url}` // Prepend imgdburl if not a Cloudinary URL
                                                        }
                                                        alt=""
                                                        className="w-auto max-h-full object-contain"
                                                    />
                                                    <div className="mt-4 text-black">
                                                        {currentImageIndex + 1} / {imagesArray.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>



                                    </div>



                                </div>


                                <div className='w-full 800px:w-[50%] pt-2'>

                                    <h1 className={`${styles.productTitle} !font-[450] productpageproname`}>{data.name}</h1>
                                     <p className='text-[#727386] pt-1 text-[14px]'>Design Application No. {data.designno}</p>

                                    <h3 className={`text-[#727386] text-left  text-[14px] font-Poppins pt-1 productpageproskuid`}>{data.skuid}</h3>
                                    <p 
                                     className={`font-Poppins pt-1 text-[14px] productpageprodesc ${isExpanded ? '' : 'line-clamp'}`} 
                                      onClick={toggleReadMore}
                                     >
                                      {data.description}
                                    </p>

                                           {/* Conditionally render "View More" or "View Less" */}
                                     {!isExpanded && data.description.length > 100 && (
                                    <span 
                                        className='text-[14px] text-blue-400 cursor-pointer'
                                         onClick={toggleReadMore}
                                      >
                                       View More
                                    </span>
                                     )}
                                     {isExpanded && (
                                      <span 
                                         className='text-[14px] text-blue-400 cursor-pointer'
                                          onClick={toggleReadMore}
                                        >
                                     View Less
                                      </span>
                                    )}


                                    <div className="flex items-center pt-3">
                                    {/* <h4 className={`${styles.price} line-through`}>
                                            {finalOriginalPrice ? " ₹" + finalOriginalPrice : null}
                                        </h4>
                                        <h5 className={`${styles.productDiscountPrice} !stext-[#01463A]`}>

                                            ₹{finalPrice}
                                        </h5> */}

                                        {/* conversion price  */}
                                        <h4 className={`${styles.price} line-through`}>
                                            {finalOriginalPrice ? `${currency} ${convertedFinalOriginalPrice}` : null}
                                        </h4>

                                        {/* Discounted Price */}
                                        <h5 className={`${styles.productDiscountPrice} !text-[#01463A]`}>
                                            {currency} {convertedFinalPrice}
                                        </h5>

                                        
                                        {discountPercentage > 0 && (
                                            <span className="ml-2 text-[#4B4B4B] font-[450]">
                                                Save {discountPercentage}%
                                            </span>
                                        )}

                                    </div>
                                        
                                    {/* <div className="instockcon">
                                        <div className="instockconflex">
                                            {(() => {
                                                if (selectedEnamelColor !== null) {
                                                    const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                                                    const metalColor = metalColors[selectedColor].replace(/\s+/g, '');

                                                    const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
                                                    const enamelMetalStock = data?.Enamelcolorstock[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                                                    return enamelMetalStock > 0 ? (
                                                        // Green tick icon for in-stock
                                                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                                        </svg>
                                                    ) : (
                                                        // Red cross icon for out-of-stock
                                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 1L12 12" stroke="#FF0000" strokeWidth="2"/>
                                                            <path d="M12 1L1 12" stroke="#FF0000" strokeWidth="2"/>
                                                        </svg>
                                                    );
                                                }
                                                if (selectedColor && data.Enamelcolorstock === null) {
                                                    const metalStockKey = `${metalColors[selectedColor].replace(/\s+/g, '')}clrStock`;
                                                    const metalStock = data?.Metalcolorstock[metalStockKey] || 0;

                                                    return metalStock > 0 ? (
                                                        // Green tick icon for in-stock
                                                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                                        </svg>
                                                    ) : (
                                                        // Red cross icon for out-of-stock
                                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 1L12 12" stroke="#FF0000" strokeWidth="2"/>
                                                            <path d="M12 1L1 12" stroke="#FF0000" strokeWidth="2"/>
                                                        </svg>
                                                    );
                                                }
                                                if (data?.stock !== null) {
                                                    return data?.stock > 0 ? (
                                                        // Green tick icon for in-stock
                                                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                                        </svg>
                                                    ) : (
                                                        // Red cross icon for out-of-stock
                                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 1L12 12" stroke="#FF0000" strokeWidth="2"/>
                                                            <path d="M12 1L1 12" stroke="#FF0000" strokeWidth="2"/>
                                                        </svg>
                                                    );
                                                }

                                                // Default fallback: green tick
                                                return (
                                                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                                    </svg>
                                                );
                                            })()}
                                            <span
                                                style={{
                                                    color: (() => {
                                                        if (selectedEnamelColor !== null) {
                                                            const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                                                            const metalColor = metalColors[selectedColor].replace(/\s+/g, '');

                                                            const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
                                                            const enamelMetalStock = data?.Enamelcolorstock[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                                                            return enamelMetalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
                                                        }
                                                        if (selectedColor && data.Enamelcolorstock === null) {
                                                            const metalStockKey = `${metalColors[selectedColor].replace(/\s+/g, '')}clrStock`;
                                                            const metalStock = data?.Metalcolorstock[metalStockKey] || 0;

                                                            return metalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
                                                        }
                                                        if (data?.stock !== null) {
                                                            return data?.stock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
                                                        }

                                                        return '#0B8D08'; // Default fallback color
                                                    })()
                                                }}
                                                className="text-[14px] font-medium leading-[24px]"
                                            >
                                                {(() => {
                                                    if (selectedEnamelColor !== null) {
                                                        const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                                                        const metalColor = metalColors[selectedColor].replace(/\s+/g, '');

                                                        const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
                                                        const enamelMetalStock = data?.Enamelcolorstock[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                                                        return enamelMetalStock > 0 ? "In Stock" : "Out of Stock";
                                                    }
                                                    if (selectedColor && data.Enamelcolorstock === null) {
                                                        const metalStockKey = `${metalColors[selectedColor].replace(/\s+/g, '')}clrStock`;
                                                        const metalStock = data?.Metalcolorstock[metalStockKey] || 0;

                                                        return metalStock > 0 ? "In Stock" : "Out of Stock";
                                                    }
                                                    if (data?.stock !== null) {
                                                        return data?.stock > 0 ? "In Stock" : "Out of Stock";
                                                    }

                                                    return "In Stock"; // Default fallback
                                                })()}
                                            </span>
                                        </div>
                                    </div> */}

                                    


{/* <div className="instockcon">
  <div className="instockconflex">
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
    </svg>
    <span
      style={{
        color: (() => {
          if (selectedEnamelColor !== null && selectedEnamelColor !== undefined && selectedColor !== null && selectedColor !== undefined) {
            const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
            const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

            if (!metalColor) return '#FF0000'; // Fallback if metalColor is undefined

            const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
            const enamelMetalStock = data?.Enamelcolorstock[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

            return enamelMetalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
          }
          if (selectedColor && data.Enamelcolorstock === null) {
            const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;

            if (!metalStockKey) return '#FF0000'; // Fallback if metalStockKey is undefined

            const metalStock = data?.Metalcolorstock[metalStockKey] || 0;
            return metalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
          }
          if (data?.stock !== null) {
            return data?.stock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
          }

          return '#0B8D08'; // Default fallback color
        })()
      }}
      className="text-[14px] font-medium leading-[24px]"
    >
      {(() => {
        if (selectedEnamelColor !== null && selectedEnamelColor !== undefined) {
          const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
          const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

          if (!metalColor) return "Out of Stock"; // Fallback if metalColor is undefined

          const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
          const enamelMetalStock = data?.Enamelcolorstock[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

          return enamelMetalStock > 0 ? "In Stock" : "Out of Stock";
        }
        if (selectedColor) {
            const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;
          
            if (!metalStockKey) return "Out of Stock"; // Fallback if metalStockKey is undefined
          
            // Check if the stock exists and handle null or zero values
            const metalStock = data?.Metalcolorstock[metalStockKey];
          
            if (metalStock === null || metalStock === 0) {
              return "Out of Stock"; // Explicitly handle null and zero stock
            } else if (metalStock > 0) {
              return "In Stock";
            }
          }
        if (data?.stock !== null) {
          return data?.stock > 0 ? "In Stock" : "Out of Stock";
        }

        return "In Stock"; // Default fallback
      })()}
    </span>
  </div>
</div> */}

{/* <div className="instockcon">
  <div className="instockconflex">
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
    </svg>
    <span
      style={{
        color: (() => {
          // Log selected colors for debugging
          console.log("Checking stock for:", selectedEnamelColor, selectedColor);

          if (selectedEnamelColor && selectedColor >= 0) {
            const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
            const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

            // Log cleaned values
            console.log("cleanedEnamelColor:", cleanedEnamelColor);
            console.log("metalColor:", metalColor);

            if (!metalColor) return '#FF0000'; // Return red if metalColor is undefined

            const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
            const enamelMetalStock = data?.Enamelcolorstock?.[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

            // Log stock key and value
            console.log("enamelMetalStockKey:", enamelMetalStockKey);
            console.log("enamelMetalStock:", enamelMetalStock);

            return enamelMetalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
          }

          if (selectedColor >= 0  && selectedColor >= 0) {
            console.log(selectedColor,"color check")
            const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;
            console.log("metalStockKey:", metalStockKey);
            if (!metalStockKey) return '#FF0000'; // Return red if metalStockKey is undefined
            
            // Access the metal stock
            const metalStock = data?.Metalcolorstock?.[metalStockKey];
            console.log("metalStock:", metalStock);

            // Check stock values for 0 or null
            if (metalStock === null || metalStock === 0) {
              return '#FF0000'; // Red if out of stock or null
            }

            return '#0B8D08'; // Green if in stock
          }

          if (data?.stock !== null && data?.stock !== undefined) {
            return data.stock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
          }

          return '#0B8D08'; // Default fallback color
        })()
      }}
      className="text-[14px] font-medium leading-[24px]"
    >
      {(() => {
        if (selectedEnamelColor) {
          const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
          const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

          if (!metalColor) return "Out of Stock"; // Return "Out of Stock" if metalColor is undefined

          const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;
          const enamelMetalStock = data?.Enamelcolorstock?.[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

          return enamelMetalStock > 0 ? "In Stock" : "Out of Stock";
        }

        if (selectedColor >= 0) {
          const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;

          if (!metalStockKey) return "Out of Stock"; // Return "Out of Stock" if metalStockKey is undefined

          // Access the metal stock
          const metalStock = data?.Metalcolorstock?.[metalStockKey];

          // Check stock values for 0 or null
          if (metalStock === null || metalStock === 0) {
            return "Out of Stock"; // Out of stock if undefined, null, or zero
          }

          return metalStock > 0 ? "In Stock" : "Out of Stock";
        }

        if (data?.stock !== null && data?.stock !== undefined) {
          return data?.stock > 0 ? "In Stock" : "Out of Stock";
        }

        return "In Stock"; // Default fallback
      })()}
    </span>
  </div>
</div> */}

                    <div className="instockcon">
                    <div className="instockconflex">
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {(() => {

                                                        
                           


                            // Handle case when both enamel and metal colors are selected
                            if (selectedEnamelColor !== null && selectedEnamelColor !== undefined && selectedColor !== null) {
                            const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                            const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

                            console.warn("enamel code running ")


                            if (!metalColor) return  <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />; // Fallback if metalColor is undefined

                            const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;

                            // Log for debugging
                            console.log('Constructed Stock Key:', enamelMetalStockKey);
                            console.log('Enamel Color Stock Data:', data?.Enamelcolorstock?.[cleanedEnamelColor]);

                            const enamelMetalStock = data?.Enamelcolorstock?.[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                            // Debug stock value
                            console.log('Enamel-Metal Stock Value:', enamelMetalStock);

                            return enamelMetalStock > 0 ? 
                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" /> 
                            :  
                            <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />;
                            }

                            // Handle case when only metal color is selected
                            if (selectedColor >= 0 && shouldShowEnamel === false && shouldShowCombinations === false) {
                            const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;

                            console.warn("metal code running ")

                            if (!metalStockKey) return "Out of Stock"; // Fallback if metalStockKey is undefined

                            const metalStock = data?.Metalcolorstock?.[metalStockKey];

                            // Debug metal stock value
                            console.log('Metal Stock Key:', metalStockKey);
                            console.log('Metal Stock Value:', metalStock);

                            if (metalStock === null || metalStock === 0) {
                            console.warn("normal code running ")

                                return  <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />; // Explicitly handle null and zero stock
                            } else if (metalStock > 0) {
                                return <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" /> ;
                            }
                            }

                            // Handle global stock fallback when no specific color is selected
                            if (data?.stock !== null && data?.stock !== undefined) {
                            return data.stock > 0 ?  
                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" /> 
                            :
                            <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />;
                            }

                            if (selectedCombination !== null && selectedCombination !== undefined && selectedColor !== null && shouldShowEnamel === false) {
                                console.warn("Product combination stock is working");

                                // Clean up the selected combination and metal color
                                const combinationKey = selectedCombination ? selectedCombination.toLowerCase().replace(/_/g, '') : null; // e.g. 'blueblack'
                                const metalColor = (metalColors[selectedColor]?.replace(/\s+/g, '')).toLowerCase(); // e.g. 'rosegold'
                                
                                // Log the cleaned combination and metal color for debugging
                                console.log("Combination Key: ", combinationKey);
                                console.log("Metal Color: ", metalColor);

                                // If a combination is selected, check stock for that combination and metal color
                                if (combinationKey) {
                                    console.log("Checking stock for combination and metal color...");
                                    
                                    // Check if combinationStocks data exists for the selected combination key
                                    if (data?.combinationStocks?.[combinationKey]) {
                                        const stockData = data?.combinationStocks?.[combinationKey];
                                        console.log("Stock Data: ", stockData);

                                        // Convert stock data keys to lowercase to match the metalColor
                                        const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                            acc[key.toLowerCase()] = stockData[key]; // normalize the keys to lowercase
                                            return acc;
                                        }, {});

                                        console.log("Normalized Stock Data: ", normalizedStockData);

                                        // Check if stock data exists for the selected metal color (case-insensitive)
                                        if (normalizedStockData[metalColor] !== undefined) {
                                            const stockValue = normalizedStockData[metalColor];

                                            // If stock is null or 0, show red icon (Out of Stock)
                                            if (stockValue === null || stockValue === 0) {
                                                console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is out of stock.`);
                                                return (
                                                    <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />
                                                ); // Red icon
                                            }

                                            // If stock is available (greater than 0), show green icon (In Stock)
                                            if (stockValue > 0) {
                                                console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is available: ${stockValue}`);
                                                return (
                                                    <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                                ); // Green icon
                                            }
                                        } else {
                                            console.log(`No stock data available for combination ${combinationKey} and metal color ${metalColor}`);
                                            return (
                                                <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />
                                            ); // Red icon
                                        }
                                    } else {
                                        console.log(`No stock data available for combination ${combinationKey}`);
                                        return (
                                            <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />
                                        ); // Red icon
                                    }
                                } 
                                // If no combination is selected, check only based on metal color
                                else {
                                    console.log("Checking stock based only on metal color...");

                                    // Loop through all combinations to check if any stock data exists for the metal color
                                    let inStock = false;
                                    for (let combination in data?.combinationStocks) {
                                        const stockData = data?.combinationStocks[combination];
                                        console.log(`Checking stock for combination: ${combination}`);
                                        
                                        // Normalize stock data keys to lowercase
                                        const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                            acc[key.toLowerCase()] = stockData[key];
                                            return acc;
                                        }, {});

                                        // If stock exists for the selected metal color, set `inStock` to true
                                        if (normalizedStockData[metalColor] !== undefined && normalizedStockData[metalColor] > 0) {
                                            console.log(`Stock for metal color ${metalColor} is available in combination ${combination}`);
                                            inStock = true;
                                            break; // Exit loop once stock is found
                                        }
                                    }

                                    // Return the appropriate icon based on availability for metal color
                                    if (inStock) {
                                        return (
                                            <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" />
                                        ); // Green icon if in stock
                                    } else {
                                        console.log(`No stock data available for metal color ${metalColor}`);
                                        return (
                                            <path d="M1 1L12 10M12 1L1 10" stroke="#FF0000" strokeWidth="2" />
                                        ); // Red icon if out of stock
                                    }
                                }
                            }
                           

                            return  <path d="M13 1.1566L4.08571 11L0 6.48844L1.04743 5.33184L4.08571 8.6786L11.9526 0L13 1.1566Z" fill="#0B8D08" /> ; // Default fallback
                        })()}
                        </svg>
                        
                        <span
                        style={{
                            color: (() => {
                            // Handle case when both enamel and metal colors are selected

    
                            
                            if (selectedEnamelColor !== null && selectedEnamelColor !== undefined && selectedColor !== null) {
                                const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                                const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

                                if (!metalColor) return '#FF0000'; // Fallback if metalColor is undefined

                                // Construct the enamel-metal stock key
                                const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;

                                // Log for debugging purposes
                                console.log('Constructed Stock Key:', enamelMetalStockKey);
                                console.log('Enamel Color Stock Data:', data?.Enamelcolorstock?.[cleanedEnamelColor]);

                                const enamelMetalStock = data?.Enamelcolorstock?.[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                                // Debug stock data
                                console.log('Enamel-Metal Stock Value:', enamelMetalStock);

                                return enamelMetalStock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
                            }

                           

                            // Handle case when only metal color is selected
                            if (selectedColor >= 0 && shouldShowEnamel === false && shouldShowCombinations === false) {
                                const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;

                                if (!metalStockKey) return '#FF0000'; // Fallback if metalStockKey is undefined

                                const metalStock = data?.Metalcolorstock?.[metalStockKey] ;

                                console.log('Metal Stock Key:', metalStockKey);
                                console.log('Metal Stock Value:', metalStock);

                            
                                // // Initial rendering: If the stock data is not available, assume in stock
                                // if (metalStock === undefined ) {
                                //     console.warn("Initial state running, assuming stock is available");
                                //     return "#0B8D08"; // Default to green
                                // }
                                // Explicitly handle null and zero stock
                                if (metalStock === 0 || metalStock === null ) {
                                    // console.warn("normal code running");
                                    return "#FF0000"; // Red for out of stock
                                } else {
                                    return "#0B8D08"; // Green for in stock
                                }
                            

                                // Green if in stock, red if out of stock
                            }

                            // Handle global stock fallback when no specific color is selected
                            if (data?.stock !== null && data?.stock !== undefined) {
                                return data.stock > 0 ? '#0B8D08' : '#FF0000'; // Green if in stock, red if out of stock
                            }

                            if (selectedCombination !== null && selectedCombination !== undefined && selectedColor !== null && shouldShowEnamel === false) {
                                console.warn("Product combination stock is working");
                            
                                // Clean up the selected combination and metal color
                                const combinationKey = selectedCombination ? selectedCombination.toLowerCase().replace(/_/g, '') : null; // e.g. 'blueblack'
                                const metalColor = (metalColors[selectedColor]?.replace(/\s+/g, '')).toLowerCase(); // e.g. 'rosegold'
                                
                                // Log the cleaned combination and metal color for debugging
                                console.log("Combination Key: ", combinationKey);
                                console.log("Metal Color: ", metalColor);
                            
                                // If a combination is selected, check stock for that combination and metal color
                                if (combinationKey) {
                                    console.log("Checking stock for combination and metal color...");
                                    
                                    // Check if combinationStocks data exists for the selected combination key
                                    if (data?.combinationStocks?.[combinationKey]) {
                                        const stockData = data?.combinationStocks?.[combinationKey];
                                        console.log("Stock Data: ", stockData);
                            
                                        // Convert stock data keys to lowercase to match the metalColor
                                        const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                            acc[key.toLowerCase()] = stockData[key]; // normalize the keys to lowercase
                                            return acc;
                                        }, {});
                            
                                        console.log("Normalized Stock Data: ", normalizedStockData);
                            
                                        // Check if stock data exists for the selected metal color (case-insensitive)
                                        if (normalizedStockData[metalColor] !== undefined) {
                                            const stockValue = normalizedStockData[metalColor];
                            
                                            if (stockValue === null || stockValue === 0) {
                                                console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is out of stock.`);
                                                return "#FF0000"; // Red color if out of stock
                                            }
                            
                                            if (stockValue > 0) {
                                                console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is available: ${stockValue}`);
                                                return "#0B8D08"; // Green color if in stock
                                            }
                                        } else {
                                            console.log(`No stock data available for combination ${combinationKey} and metal color ${metalColor}`);
                                            return "#FF0000"; // Red if no stock data available
                                        }
                                    } else {
                                        console.log(`No stock data available for combination ${combinationKey}`);
                                        return "#FF0000"; // Red if no stock data for the combination
                                    }
                                } 
                                // If no combination is selected, check only based on metal color
                                else {
                                    console.log("Checking stock based only on metal color...");
                            
                                    // Loop through all combinations to check if any stock data exists for the metal color
                                    let inStock = false;
                                    for (let combination in data?.combinationStocks) {
                                        const stockData = data?.combinationStocks[combination];
                                        console.log(`Checking stock for combination: ${combination}`);
                                        
                                        // Normalize stock data keys to lowercase
                                        const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                            acc[key.toLowerCase()] = stockData[key];
                                            return acc;
                                        }, {});
                            
                                        // If stock exists for the selected metal color, set `inStock` to true
                                        if (normalizedStockData[metalColor] !== undefined && normalizedStockData[metalColor] > 0) {
                                            console.log(`Stock for metal color ${metalColor} is available in combination ${combination}`);
                                            inStock = true;
                                            break; // Exit loop once stock is found
                                        }
                                    }
                            
                                    // Return green or red color based on availability for metal color
                                    if (inStock) {
                                        return "#0B8D08"; // Green color if in stock
                                    } else {
                                        console.log(`No stock data available for metal color ${metalColor}`);
                                        return "#FF0000"; // Red if out of stock
                                    }
                                }
                            }
                           

                            return '#0B8D08'; // Default fallback color
                            })()
                        }}
                        className="text-[14px] font-medium leading-[24px]"
                        >
                        {(() => {
                            
                            // combination instock message 
                                              
                            // Handle case when both enamel and metal colors are selected
                            if (selectedEnamelColor !== null && selectedEnamelColor !== undefined && selectedColor !== null) {
                            const cleanedEnamelColor = selectedEnamelColor.toLowerCase().replace(/_/g, '');
                            const metalColor = metalColors[selectedColor]?.replace(/\s+/g, '');

                            console.warn("enamel code running ")


                            if (!metalColor) return "Out of Stock"; // Fallback if metalColor is undefined

                            const enamelMetalStockKey = `${cleanedEnamelColor}${metalColor}clrStock`;

                            // Log for debugging
                            console.log('Constructed Stock Key:', enamelMetalStockKey);
                            console.log('Enamel Color Stock Data:', data?.Enamelcolorstock?.[cleanedEnamelColor]);

                            const enamelMetalStock = data?.Enamelcolorstock?.[cleanedEnamelColor]?.[enamelMetalStockKey] || 0;

                            // Debug stock value
                            console.log('Enamel-Metal Stock Value:', enamelMetalStock);

                            return enamelMetalStock > 0 ? "In Stock" : "Out of Stock";
                            }

                            


                            // Handle case when only metal color is selected
                            if (selectedColor >= 0 && shouldShowEnamel === false && shouldShowCombinations === false) {
                            const metalStockKey = `${metalColors[selectedColor]?.replace(/\s+/g, '')}clrStock`;

                            console.warn("metal code running ")

                            if (!metalStockKey) return "Out of Stock"; // Fallback if metalStockKey is undefined

                            const metalStock = data?.Metalcolorstock?.[metalStockKey];

                            // Debug metal stock value
                            console.log('Metal Stock Key:', metalStockKey);
                            console.log('Metal Stock Value:', metalStock);

                            if (metalStock === null || metalStock === 0) {
                            console.warn("normal code running ")

                                return "Out of Stock"; // Explicitly handle null and zero stock
                            } else if (metalStock > 0) {
                                return "In Stock";
                            }
                            }

                            // Handle global stock fallback when no specific color is selected
                            if (data?.stock !== null && data?.stock !== undefined) {
                            return data.stock > 0 ? "In Stock" : "Out of Stock";
                            }
                            
                            if(selectedCombination !== null && selectedCombination !== undefined && selectedColor !== null && shouldShowEnamel === false){
                                console.warn("product combination stock is working ")


                                // Clean up the selected combination and metal color
                            // Clean up the selected combination and metal color
                                    const combinationKey = selectedCombination ? selectedCombination.toLowerCase().replace(/_/g, '') : null; // e.g. 'blueblack'
                                    const metalColor = (metalColors[selectedColor]?.replace(/\s+/g, '')).toLowerCase(); // e.g. 'rosegold'
                                    
                                    // Log the cleaned combination and metal color for debugging
                                    console.log("Combination Key: ", combinationKey);
                                    console.log("Metal Color: ", metalColor);

                                    // If a combination is selected, check stock for that combination and metal color
                                    if (combinationKey) {
                                        console.log("Checking stock for combination and metal color...");
                                        
                                        // Check if combinationStocks data exists for the selected combination key
                                        if (data?.combinationStocks?.[combinationKey]) {
                                            const stockData = data?.combinationStocks?.[combinationKey];
                                            console.log("Stock Data: ", stockData);

                                            // Convert stock data keys to lowercase to match the metalColor
                                            const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                                acc[key.toLowerCase()] = stockData[key]; // normalize the keys to lowercase
                                                return acc;
                                            }, {});

                                            console.log("Normalized Stock Data: ", normalizedStockData);

                                            // Check if stock data exists for the selected metal color (case-insensitive)
                                            if (normalizedStockData[metalColor] !== undefined) {
                                                const stockValue = normalizedStockData[metalColor];

                                                if (stockValue === null || stockValue === 0) {
                                                    console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is out of stock.`);
                                                    return "Out of Stock";
                                                }

                                                if (stockValue > 0) {
                                                    console.log(`Stock for combination ${combinationKey} and metal color ${metalColor} is available: ${stockValue}`);
                                                    return "In Stock";
                                                }
                                            } else {
                                                console.log(`No stock data available for combination ${combinationKey} and metal color ${metalColor}`);
                                                return "Out of Stock";
                                            }
                                        } else {
                                            console.log(`No stock data available for combination ${combinationKey}`);
                                            return "Out of Stock";
                                        }
                                    } 
                                    // If no combination is selected, check only based on metal color
                                    else {
                                        console.log("Checking stock based only on metal color...");

                                        // Loop through all combinations to check if any stock data exists for the metal color
                                        let inStock = false;
                                        for (let combination in data?.combinationStocks) {
                                            const stockData = data?.combinationStocks[combination];
                                            console.log(`Checking stock for combination: ${combination}`);
                                            
                                            // Normalize stock data keys to lowercase
                                            const normalizedStockData = Object.keys(stockData).reduce((acc, key) => {
                                                acc[key.toLowerCase()] = stockData[key];
                                                return acc;
                                            }, {});

                                            // If stock exists for the selected metal color, set `inStock` to true
                                            if (normalizedStockData[metalColor] !== undefined && normalizedStockData[metalColor] > 0) {
                                                console.log(`Stock for metal color ${metalColor} is available in combination ${combination}`);
                                                inStock = true;
                                                break; // Exit loop once stock is found
                                            }
                                        }

                                        // Return "In Stock" or "Out of Stock" based on availability for metal color
                                        if (inStock) {
                                            return "In Stock";
                                        } else {
                                            console.log(`No stock data available for metal color ${metalColor}`);
                                            return "Out of Stock";
                                        }
                                    }
                            }
                            

                            return "In Stock"; // Default fallback
                        })()}
                        </span>
                    </div>
                    </div>




                                    {/* metal options */}

                                    {/* <div>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <div className="metal-color-options">
                                                <h3 className='text-[20px] font-[600] font-Poppins'>Metal Color</h3>
                                                {Object.keys(data.MetalColor).map((key, index) => {
                                                    // Remove "clr" from the end of color name
                                                    const label = key.replace(/clr$/i, '');

                                                    return (
                                                        <div key={index} className='flex items-center text-[16px] font-Poppins py-1'>
                                                            <input
                                                                type="radio"
                                                                name='colorcode'
                                                                id={`color-${key}`}
                                                                value={key}
                                                                checked={selectedColor === index}
                                                                onChange={() => handleColorChange(index) || setSelectedColor(index)}
                                                            />
                                                            <label
                                                                className='pl-2 cursor-pointer'
                                                                htmlFor={`color-${key}`}
                                                            >
                                                                {label}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div> */}
                                    {/* <div className='metaloptionproduct'>
                                        {Object.keys(data.MetalColor).length > 0 && (
                                            <>
                                                <div className='metaltitle'>
                                                    <h3>Metal Color :</h3>
                                                </div>
                                                <div className='metalmaincolor'>
                                                    {Object.keys(data.MetalColor).map((key, index) => {
                                                        // Remove "clr" from the end of color name
                                                        const label = key.replace(/clr$/i, '');
                                                        const isSelected = selectedColor === index;

                                                        return (
                                                            <div key={index} className={`metalcolor ${isSelected ? 'selected' : ''}`}>
                                                                <input
                                                                    type="radio"
                                                                    name='colorcode'
                                                                    id={`color-${key}`}
                                                                    value={key}
                                                                    checked={isSelected}
                                                                    onChange={() => handleColorChange(index) || setSelectedColor(index)}
                                                                    className='hidden' // Hide the default radio button
                                                                />
                                                                <label
                                                                    htmlFor={`color-${key}`}
                                                                    className='flex items-center flex-col cursor-pointer'
                                                                >
                                                                    <span className={`metalcolorcon ${key} ${isSelected ? 'selected' : ''}`}></span>
                                                                    <span className='ml-2'>{label}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </div> */}
{/* workign code  */}

                                    {/* {
                                        shouldShowMetalColors && (
                                            <div className='metaloptionproduct'>
                                                {Object.keys(data.MetalColor).length > 0 && (
                                                    <>
                                                        <div className='metaltitle'>
                                                            <h3>Metal Color :</h3>
                                                        </div>
                                                        <div className='metalmaincolor'>
                                                            {Object.keys(data.MetalColor).map((key, index) => {
                                                                // Remove "clr" from the end of color name
                                                                const label = key.replace(/clr$/i, '');
                                                                const isSelected = selectedColor === index;

                                                                return (
                                                                    <div key={index} className={`metalcolor ${isSelected ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name='colorcode'
                                                                            id={`color-${key}`}
                                                                            value={key}
                                                                            checked={isSelected}
                                                                            onChange={() => handleColorChange(index)}
                                                                            className='hidden' // Hide the default radio button
                                                                        />
                                                                        <label
                                                                            htmlFor={`color-${key}`}
                                                                            className='flex items-center flex-col cursor-pointer'
                                                                        >
                                                                            <span className={`metalcolorcon ${key} ${isSelected ? 'selected' : ''}`}></span>
                                                                            <span className='ml-2'>{label}</span>
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                        )
                                    } */}
{/* workign code  */}
            {
                shouldShowMetalColors && (
                    <div className='metaloptionproduct'>
                        {Object.keys(data.MetalColor).length > 0 && (
                            <>
                                <div className='metaltitle'>
                                    <h3>Metal Color :</h3>
                                </div>
                                <div className='metalmaincolor'>
                                    {['YellowGoldclr', 'RoseGoldclr', 'WhiteGoldclr'].map((key, index) => {
                                        // Check if the color exists and has images
                                        const images = data.MetalColor[key] || [];
                                        const hasImages = images.length > 0;

                                        // If the color has no images, return null
                                        if (!hasImages) {
                                            return null;
                                        }

                                        // Remove "clr" from the end of the color name
                                        const label = key.replace(/clr$/i, '');
                                        const isSelected = selectedColor === index; // Compare with fixed index

                                        return (
                                            <div key={key} className={`metalcolor ${isSelected ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name='colorcode'
                                                    id={`color-${key}`}
                                                    value={key}
                                                    checked={isSelected}
                                                    onChange={() => handleColorChange(index)} // Use fixed index for selection
                                                    className='hidden' // Hide the default radio button
                                                />
                                                <label
                                                    htmlFor={`color-${key}`}
                                                    className='flex items-center flex-col cursor-pointer'
                                                >
                                                    <span className={`metalcolorcon ${key} ${isSelected ? 'selected' : ''}`}></span>
                                                    <span className='ml-2'>{label}</span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                )
            }




                                    {/* enamel option */}

                                    {/* {shouldShowEnamel && (
                                        <div className="enamelotion pt-3">
                                            <div className='enameltitle'>
                                                <h3 className="text-[20px] font-[600] font-Poppins">Enamel Color : </h3>
                                            </div>
                                            <div className="enamelselect text-[16px] font-Poppins py-1">
                                                <select
                                                    name="enamelColors"
                                                    id="enamelColors"
                                                    className="border"
                                                    onChange={(e) => setSelectedEnamelColor(e.target.value)}
                                                    value={selectedEnamelColor}
                                                >
                                                    <option value="">Select Enamel Color</option>
                                                    {availableEnamelColors.map((color) => (
                                                        <option key={color._id} value={color._id}>
                                                            {color.enamelColorName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )} */}
                                    {shouldShowEnamel && (
                                        <div className="enamelotion pt-3">
                                            <div className='enameltitle'>
                                                <h3 className="text-[20px] font-[600] font-Poppins">Enamel Color : </h3>
                                            </div>
                                            <div className="enamelselect text-[16px] font-Poppins py-1">
                                                <select
                                                    name="enamelColors"
                                                    id="enamelColors"
                                                    className="border"
                                                    onChange={(e) => setSelectedEnamelColor(e.target.value)}
                                                    value={selectedEnamelColor}
                                                >
                                                    <option value="">Select Enamel Color</option>
                                                    {availableEnamelColors.map((color) => (
                                                        <option key={color._id} value={color._id}>
                                                            {color.enamelColorName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}


                                    {/* combination of enamel */}
                                    {shouldShowCombinations && (
                                        <div className="enamelotion pt-3">
                                            <div className='enameltitle'>
                                                <h3 className="text-[20px] font-[600] font-Poppins">Enamel Combination : </h3>
                                            </div>
                                            <div className="enamelselect text-[16px] font-Poppins py-1">
                                                <select
                                                    name="combinationColors"
                                                    id="combinationColors"
                                                    className="border"
                                                    onChange={(e) => setSelectedCombination(e.target.value)}
                                                    value={selectedCombination}
                                                >
                                                    <option value="">Select Combination Color</option>
                                                    {availableCombinationImages.map((color, index) => (
                                                        <option key={index} value={color.combinationName}>
                                                            {color.combinationName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* chain options */}
                                    {/* {shouldShowChainOptions && (

                                        <div className='pt-3'>
                                            <h3 className='text-[20px] font-[600] font-Poppins'>Chain</h3>
                                            <div className='radio-option  text-[16px] font-Poppins py-1'>
                                                <input
                                                    type='radio'
                                                    id='withChain'
                                                    name='chainOption'
                                                    value='with'
                                                    onChange={() => toggleChainOption('with')}
                                                    checked={showWithChain}
                                                />
                                                <label htmlFor='withChain' className='pl-2 cursor-pointer'>
                                                    With 1 gm Chain ( 13 inches) (+₹ 7,200)
                                                </label>
                                            </div>
                                            <div className='radio-option text-[16px] font-Poppins py-1'>
                                                <input
                                                    type='radio'
                                                    id='withoutChain'
                                                    name='chainOption'
                                                    value='without'
                                                    onChange={() => toggleChainOption('without')}
                                                    checked={!showWithChain}
                                                />
                                                <label htmlFor='withoutChain' className='pl-2 cursor-pointer'>
                                                    Without Chain
                                                </label>
                                            </div>
                                        </div>
                                    )} */}



                                    {shouldShowChainOptions && (
                                        <div className='chainotionproduct'>
                                            <div className='chainopiontitle'>
                                                <h3>Chain Type :</h3>
                                            </div>

                                            <div className='chainotionproductflex'>
                                                <div className='withchainoption'>
                                                    <div className='withchainoptioncon text-[14px] font-Poppins py-1'>
                                                        <input
                                                        className='hidden'
                                                            type='radio'
                                                            id='withChain'
                                                            name='chainOption'
                                                            value='with'
                                                            onChange={() => toggleChainOption('with')}
                                                            checked={showWithChain}
                                                        />
                                                        <label htmlFor='withChain' className=' cursor-pointer'>
                                                            <div className={`tagwithchain ${showWithChain ? 'border border-[#006039]' : 'border-none'}`}>

                                                            With Chain
                                                            </div>
                                                            <div className={`chain-options mt-2 flex gap-2 ${showWithChain ? 'visible' : 'hidden'}`}>
                                                                <label className={`chain-size-label cursor-pointer flex `}>
                                                                    <input
                                                                        type="radio"
                                                                        name="chainSize"
                                                                        value="13inch"
                                                                        onChange={handleChainSizeChange}
                                                                        checked={selectedChainSize === '13inch'}
                                                                    />
                                                                    <span className={`chainboxtsec chain-size-text ${selectedChainSize === '13inch' ? '!font-[600] !bg-[#a8eeb6] border border-[#006039]' : ''}`}>
                                                                        {selectedChainSize === '13inch' ? '' : ''}
                                                                        13 inches
                                                                    </span>
                                                                </label>
                                                                <label className={`chain-size-label cursor-pointer flex `}>
                                                                    <input
                                                                        type="radio"
                                                                        name="chainSize"
                                                                        value="18inch"
                                                                        onChange={handleChainSizeChange}
                                                                        checked={selectedChainSize === '18inch'}
                                                                    />
                                                                    <span className={`chainboxtsec chain-size-text ${selectedChainSize === '18inch' ? '!font-[600] !bg-[#a8eeb6] border border-[#006039]' : ''}`}>
                                                                        {selectedChainSize === '18inch' ? '' : ''}
                                                                        18 inches
                                                                    </span>
                                                                </label>
                                                            </div>


                                                            {/* <div className={`withchainimgcon  ${showWithChain ? 'mt-[2px]' : 'mt-[22px]'} `}>
                                                                <img src={withchainimg} alt="" />
                                                            </div> */}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className='withchainoption'>
                                                    <div className='withchainoptioncon text-[14px] font-Poppins py-1'>
                                                        <input
                                                            className='hidden'
                                                            type='radio'
                                                            id='withoutChain'
                                                            name='chainOption'
                                                            value='without'
                                                            onChange={() => toggleChainOption('without')}
                                                            checked={!showWithChain}
                                                        />
                                                        <label htmlFor='withoutChain' className=' cursor-pointer'>
                                                            <div className={`tagwithchain ${!showWithChain ? 'border border-[#006039]' : 'border-none'}`}>

                                                            
                                                            Without Chain
                                                            </div>
                                                            {/* <div className='withchainimgcon mt-[22px]'>
                                                                <img src={withoutchainimg} alt="" />
                                                            </div> */}
                                                        </label>
                                                    </div>

                                                </div>



                                            </div>

                                        </div>

                                    )}



                                    {/* Validation Error */}
                                    {validationError && (
                                        <p className='text-red-500 text-sm mt-2'>{validationError}</p>
                                    )}

                                    





                                    <div className='flex items-center mt-5 gap-[20px] pr-3'>
                                        <div className='cartqtycon overflow-hidden'>
                                            <button onClick={decrementCount} className="text-black font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out">-</button>
                                            <span className="bg-white text-black font-medium px-4 py-[9.1px] font-Poppins overflow-hidden">
                                                {count}
                                            </span>
                                            <button onClick={incrementCount}
                                                className="text-black font-bold rounded-br rounded-tr px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            >+ </button>
                                        </div>

                                        <div
                                            className={`${styles.button} mt-2 rounded-[4px] !h-[45px] flex items-center !bg-[#01463A]`}
                                            onClick={() => addToCartHandler(data._id)}
                                        >
                                            <span className="text-[#fff] flex items-center font-Poppins">
                                                Add to cart <AiOutlineShoppingCart className="ml-1" />
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={`${styles.button} productbuynowbtn mt-2 rounded-[4px]  flex items-center `}
                                        onClick={() => addToCartHandler(data._id, true)}
                                    >
                                        <span className="flex items-center font-Poppins">
                                            Buy Now
                                        </span>
                                    </div>


                                    {/* add to wishlist */}

                                    <div className='productaddtowish'>
                                        {
                                            click ?

                                                <div className='productaddtowishflex cursor-pointer ' onClick={() => removeFromWishlistHandler(data)}>
                                                    <AiFillHeart
                                                        size={24}
                                                        className='cursor-pointer '
                                                        color={click ? "red" : "#333"}

                                                        title='Remove from wishlist'
                                                    />

                                                    <span>Already in wishlist</span>

                                                </div>
                                                :
                                                <div className='productaddtowishflex cursor-pointer ' onClick={() => addToWishlistHandler(data)}>
                                                    <AiOutlineHeart
                                                        size={24}

                                                        color={click ? "red" : "#333"}

                                                        title='Add to wishlist'


                                                    />
                                                    <span>Add to wishlist</span>
                                                </div>
                                        }
                                    </div>

                                    {/* share product */}
                                    <div className='shareproductlist'>
                                        <div className='sharelisttitle'>
                                            <h3>Share this product :</h3>

                                        </div>

                                        <div className='productsharelisticon'>
                                            <FacebookShareButton url={productUrl} >
                                                <FaFacebook size={28} className="share-icon" />

                                                {/* <FacebookIcon size={32} round={true} /> */}
                                            </FacebookShareButton>

                                            <WhatsappShareButton url={productUrl} >
                                                <FaWhatsapp size={28} className="share-icon" />

                                                {/* <WhatsappIcon size={28} round={true} /> */}
                                            </WhatsappShareButton>

                                            <EmailShareButton url={productUrl} >
                                                <MdOutlineEmail size={28} className="share-icon" />

                                                {/* <EmailIcon size={28} round={true} /> */}
                                            </EmailShareButton>

                                            <div onClick={() => { shareOnInstagram(data) }}>
                                                <FaInstagram size={28} className="share-icon" />

                                                {/* <i className="fa-brands fa-square-instagram instasty" style={{ cursor: 'pointer' }}></i> */}

                                            </div>

                                        </div>

                                    </div>




                                    {/* <div className={`${styles.button} mt-6 !w-[190px] p-4 !rounded !h-[40px]`} onClick={handleMessageSubmit}>
                                        <span className='text-white flex items-center'> Send Message <AiOutlineMessage className='ml-2' /></span>
                                    </div> */}

                                        <div className='checkdel mt-3'>
                                        <input type="text" placeholder='enter your pincode' value={pincode} onChange={(e)=>setpincode(e.target.value)}/>

                                        <button className='checkdelbtn' onClick={()=>{calculateEDD()}}>Check </button>
                                        {isLoading ? (
                                            <p>Loading...</p>
                                         ) : (
                                         showResult && <p className='text-[14px]'>Estimated Delivery: {estimatedDeliveryRange}  </p>
                                         )}
                                         </div>

                                </div>

                            </div>

                        </div>

                        <ProductDetailsInfo data={data} shouldShowChainOptions={shouldShowChainOptions} />


                    </div>
                    :
                    null
            }


        </div>
    )
}


const ProductDetailsInfo = ({ data ,shouldShowChainOptions }) => {
    const [active, setActive] = useState(1)
    console.log(data, "see the data")
    const [expanded, setExpanded] = useState(true);

    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${server}/get-allcategories`);
                // Filter categories based on type (gold or silver)
                const filteredGoldCategories = response.data.categories.filter(category => category.type === 'gold');
                setCategoriesData(filteredGoldCategories); // Store gold categories
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    console.log(categoriesData,"categoriesData-------------------")
    const productCategory = data?.category;


    return (
        <div className='bg-[#fcfcfc] shadow-lg  border-[0.1px] border-[#f8f8f8] mb-5 px-10 800px:px-2 py-2 rounded pb-5 productdetailspageresp'>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5 className={`${active === 1 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[16px]  px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins `} onClick={() => setActive(1)} >Product Details</h5>
                    {/* {
                    active === 1 ?
                     (
                        <div className={`${styles.active_indicator}`} />
                    ) : null} */}
                </div>
                <div className="relative">
                    <h5 className={`${active === 2 ? "text-[#1BB8E5] font-[700]" : "text-[#000]"} text-[16px] px-1 leading-5 cursor-pointer 800px:text-[20px] font-Poppins`} onClick={() => setActive(2)}>Product Reviews</h5>

                </div>

            </div>
            {
                active === 1 ?
                    <>
                        <div className='mb-3 productdetailspagerespcon'>
                            <h1 className={`text-[18px] font-[600] font-Poppins text-[#333] pt-1`}>{data.name}</h1>
                            <p className="font-Poppins pt-1">{data.description}</p>
                            <h3 className={`text-[#727386] text-left  text-[15px] font-Poppins pt-1`}>{data.skuid}</h3>

                        </div>

                        {/* table section */}

                        <div className='flex flex-wrap  gap-5'>

                            <div className="bg-[#5DC2B0] w-[300px] font-Poppins mb-3 rounded-[4px] productdetailresptable">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><AiOutlineGold /></span>
                                    {
                                    categoriesData
                                        .filter(category => category.title.toLowerCase().includes(productCategory.toLowerCase())) // Match by title or another attribute
                                        .length > 0 ? (
                                        categoriesData
                                            .filter(category => category.title.toLowerCase().includes(productCategory.toLowerCase()))
                                            .map((category) => (
                                            <span className="font-[500]" key={category._id}>
                                                Gold
                                            </span>
                                            ))
                                        ) : (
                                        <span className="font-[500]">Silver</span>
                                        )
                                    }
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[13px]'> {data?.goldWeight ? data.goldWeight.weight : "Not Updated"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Purity</div>
                                        <p className='text-[#4f3267] text-[13px]'>{data?.goldWeight ? data.goldWeight.purity : "18 kt"}</p>
                                    </div>
                                </div>
                            </div>
{/* 
                            <div className="bg-[#5DC2B0] w-[300px] font-Poppins mb-3 rounded-[4px] productdetailresptable">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><IoDiamondOutline /></span>
                                    <span className='font-[500]'>Diamond</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Weight</div>
                                        <p className='text-[#4f3267] text-[13px]'>{data?.diamondWeight ? data.diamondWeight.weight : "Not Updated"} </p>
                                    </div>
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Quality</div>
                                        <p className='text-[#4f3267] text-[13px]'>{data?.diamondWeight ? data.diamondWeight.quality : " GH-VS"}</p>
                                    </div>
                                </div>
                            </div> */}

                            {/* Render the main container only if there is valid weight or quality */}
{(data?.diamondWeight?.weight !== "NA" && data?.diamondWeight?.weight !== null) || 
(data?.diamondWeight?.quality !== "NA" && data?.diamondWeight?.quality !== null) ? (
  <div className="bg-[#5DC2B0] w-[300px] font-Poppins mb-3 rounded-[4px] productdetailresptable">
    <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
      <span><IoDiamondOutline /></span>
      <span className='font-[500]'>Diamond</span>
    </div>
    
    <div className="tsec2 flex font-Poppins">
      {/* Conditional rendering for Weight */}
      {data?.diamondWeight?.weight !== "NA" && data?.diamondWeight?.weight !== null ? (
        <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
          <div className='pb-[8px] font-[600] '>Weight</div>
          <p className='text-[#4f3267] text-[13px]'>
            {data?.diamondWeight?.weight || "Not Updated"}
          </p>
        </div>
      ) : null}

      {/* Conditional rendering for Quality */}
      {data?.diamondWeight?.quality !== "NA" && data?.diamondWeight?.quality !== null ? (
        <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
          <div className='pb-[8px] font-[600] '>Quality</div>
          <p className='text-[#4f3267] text-[13px]'>
            {data?.diamondWeight?.quality || "GH-VS"}
          </p>
        </div>
      ) : null}
    </div>
  </div>
) : null}


                            <div className="bg-[#5DC2B0] w-[300px] font-Poppins mb-3 rounded-[4px] productdetailresptable">
                                <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                    <span><RxDimensions /></span>
                                    <span className='font-[500]'>Dimension</span>
                                </div>
                                <div className="tsec2 flex font-Poppins">
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Height</div>
                                        <p className='text-[#4f3267] text-[13px]'> {data?.dimension ? data.dimension.height : "Not Updated"}</p>
                                    </div>
                                    <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[10px]'>
                                        <div className='pb-[8px] font-[600] '>Width</div>
                                        <p className='text-[#4f3267] text-[13px]'>{data?.dimension ? data.dimension.width : "Not Updated"} </p>
                                    </div>
                                </div>
                            </div>

                            {shouldShowChainOptions && 
                            <div className="bg-[#5DC2B0] w-[300px] font-Poppins mb-3 rounded-[4px] productdetailresptable">
                            <div className="t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                <span><GiHeartNecklace /></span>
                                <span className='font-[500]'>Chain </span>
                            </div>
                            <div className="tsec2 flex font-Poppins">
                                <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[2px]'>
                                    <div className='pb-[2px] font-[600] '>Length</div>
                                    <p className='text-[#4f3267] text-[13px]'>13 inch</p>
                                    <p className='text-[#4f3267] text-[13px]'>18 inch</p>

                                </div>
                                <div className='w-[200px] bg-[#b6f0e5] mr-[1.5px] px-[10px] py-[2px]'>
                                    <div className='pb-[2px] font-[600] '>Weight</div>
                                    <p className='text-[#4f3267] text-[13px]'> 1gms </p>
                                    <p className='text-[#4f3267] text-[13px]'> 2gms </p>

                                </div>
                            </div>
                            </div>

                            
                            }

                            

                        </div>
                        {/* table section */}




                        <div className="!bg-[#5DC2B0] w-full font-Poppins mb-3 mt-4">
                            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className='!bg-[#68c7b6] rounded-[8px]'
                                >
                                    <div className=" w-full  t1sec px-[12.5px] py-[16px] gap-2 flex items-center">
                                        <span><MdFeaturedPlayList /></span>
                                        <span className='font-[500]'>Features</span>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="bg-[#d1fbf3]">
                                    <div className="tsec2 flex flex-col font-Poppins">
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><GiMaterialsScience /></div>
                                            <p className='text-[#4f3267] text-[15px]'> Hypoallergenic Material</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><MdHealthAndSafety /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Quality and Safety First</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><FaChild /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Age-Appropriate Styles</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><GiHeartNecklace /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Everyday Use Jewelry</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><TbBrandMinecraft /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Crafted with Love</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><TbCertificate /></div>
                                            <p className='text-[#4f3267] text-[14px]'>Natural Diamonds with SGL Certificate</p>
                                        </div>
                                        <div className='w-[320px] bg-[#d1fbf3] mb-[1.5px] px-[10px] py-[10px] flex gap-[10px] items-center featurestsec'>
                                            <div className='font-[500] '><MdOutlineAppRegistration /></div>
                                            <p className='text-[#4f3267] text-[15px]'>Design Application No. {data.designno}</p>
                                        </div>




                                    </div>
                                </AccordionDetails>
                            </Accordion>


                        </div>



                        <div className="w-full mt-3 moreinfoproduct bg-white rounded-lg shadow-sm">
                            <div className="moreinfosec py-[20px] flex flex-wrap justify-center gap-4 md:gap-10">
                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#e8ffda', borderRadius: '50%' }}
                                        >
                                            <MdOutlineVerified size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        100% Certified
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#dbecff', borderRadius: '50%' }}
                                        >
                                            <RiRefund2Line size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        7 Days Money-Back
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#fff9ca', borderRadius: '50%' }}
                                        >
                                            <RiExchangeFundsLine size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                    Exchange Facility
                                    </span>
                                </div>

                                {/* <div className="flex flex-col justify-center items-center text-center w-1/2 md:w-auto">
                                    <span className="flex justify-center items-center">
                                        <span
                                            className="w-[50px] h-[50px] flex justify-center items-center"
                                            style={{ backgroundColor: '#ffe1e3', borderRadius: '50%' }}
                                        >
                                            <CiCalendarDate size={25} />
                                        </span>
                                    </span>
                                    <span className="font-Poppins text-[1rem]">
                                        One Year Warranty
                                    </span>
                                </div> */}
                            </div>

                            <p className="text-center text-[15px] font-[300] pb-4 font-Poppins text-[#333] mt-3">
                                Learn more about our{' '}
                                <Link className="text-[#4d9dbd]" to="/terms-and-conditions">
                                    TERMS & POLICIES
                                </Link>
                            </p>
                        </div>

                    </>
                    : null
            }


            {
                active === 2
                    ?
                    <div className='w-full  min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll'>
                        {
                            data && data.reviews.map((item, index) => (
                                <div key={index} className='w-full flex my-2'>
                                    <img src={`${backend_url}/${item.user.avatar}`} className='w-[60px] h-[60px] rounded-full' alt="" />

                                    <div className='pl-3'>
                                        <h1 className='font-[500] capitalize'>{item.user.name}</h1>
                                        <Ratings rating={data?.ratings} />
                                        {/* <div className='w-full flex mt-2 gap-4'>

                                            <img src={review1img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                            <img src={review2img} alt="" className='w-[200px] h-[200px] border object-fill shadow rounded-[5px]' />
                                        </div> */}
                                        <p className='w-[60%] mt-3'>{item.comment}</p>

                                    </div>


                                </div>
                            ))
                        }

                        <div className="w-full flex  justify-center">
                            {
                                data && data.reviews.length === 0 && (
                                    <h5>No Reviews have for this product</h5>
                                )
                            }


                        </div>
                    </div>
                    :
                    null
            }




        </div>



    )
}
export default ProductDetails
