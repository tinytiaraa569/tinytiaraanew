import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../MainSection/Productcard/ProductCard";
import "./productpage.css";
import { RiCloseFill } from "react-icons/ri"; // Import the cross icon
import { IoSearchOutline } from "react-icons/io5";
// import { categoriesData } from "@/static/data";
import bannerimg from "./banner.jpg";
import allproductbanner from "./allproductbanner.jpg";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import axios from "axios";
import { imgdburl, server } from "@/server";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [sortOption, setSortOption] = useState("");
  const [selectedMetalColor, setSelectedMetalColor] = useState("");
  const { products } = useSelector((state) => state.products);
  const [selectedEnamelColor, setSelectedEnamelColor] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  
  // console.log(products, "products");

  const [categoriesData, setCategoriesData] = useState([]);
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

    console.log(categoriesData,"from product page ")

  const categoryData = searchParams.get("category");
  const subcategoryData = searchParams.get("subcategory");
  const metalType = searchParams.get("type");
  console.log(metalType,"Metal type -----------")
  console.log(categoryData, "see what is category data");
  console.log(subcategoryData, "see what is subcategory data");
  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Adjust breakpoint as needed
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return isMobile;
  };
  const isMobile = useIsMobile();


  useEffect(() => {
    if (isMobile) {
      setIsFilterVisible(false);
    } else {
      setIsFilterVisible(true);
    }
  }, [isMobile]);
  useEffect(() => {
    // Extract the parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const categoryData = searchParams.get("category");
    const subcategoryData = searchParams.get("subcategory"); // Extract the subcategory
    
    
    console.log(categoryData, "see what is category data");
    console.log(subcategoryData, "see what is subcategory data");

    // Find the category that matches the categoryData
    if (categoryData && categoriesData?.length > 0) {
        const matchedCategory = categoriesData.find(
            (category) => category?.title === categoryData
        );
        setSelectedCategory(matchedCategory);
    }

    // Set the selected subcategory if it exists
    if (subcategoryData) {
        setSelectedSubcategory(subcategoryData); // Assuming selectedSubcategory is defined in state
    }
}, [location.search,categoriesData]); // Dependency array to re-run when URL changes

  // useEffect(() => {
  //   const subcategoryData = searchParams.get("subcategory");
  //   console.log(subcategoryData, "see what is subcategory data");
  //   console.log(products,"from sub cat")
  //   if (subcategoryData ) {
  //     const productsInSubcategory = products.filter(
  //       (product) => product.subcategory === subcategoryData
  //     );
  //     console.log(productsInSubcategory,"subcatgory filtered adtaa ")
  //     setFilteredData(productsInSubcategory);
  //     console.log(productsInSubcategory,"check sub cate")
  //   }
  // }, [location.search]);
  console.log(filteredData, "filtered products checking");

  // Handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  useEffect(() => {
    // Extract price range from query params
    const minPrice = parseInt(searchParams.get("priceMin"), 10);
    const maxPrice = parseInt(searchParams.get("priceMax"), 10);

    // Set the priceRange state based on query parameters or leave it empty
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([]); // No price range filtering
    }

    if (products) {
      setLoading(false);
      filterProducts();
    } else {
      setLoading(true);
    }
  }, [searchParams, products, selectedEnamelColor]); // Include only searchParams and products as dependencies

  useEffect(() => {
    const ageGroupParam = searchParams.get("ageGroup");
    if (ageGroupParam) {
      setSelectedAgeGroup(ageGroupParam);
    }
  }, [searchParams]);
  useEffect(() => {
    filterProducts();
  }, [priceRange, selectedAgeGroup]);

  console.log("slected", selectedAgeGroup);
  const getCategoryProductCount = (categoryTitle) => {
    // Ensure that products are defined and is an array
    if (!products || !Array.isArray(products)) {
      return 0; // Return 0 if products is undefined or not an array
    }

    return products.filter((product) => product.category === categoryTitle)
      .length;
  };
  const filterProducts = () => {
    try {
      if (!products || !Array.isArray(products)) {
        throw new Error("Products data is not available.");
      }

      let filteredProducts = [...products];

      // Filter by category
      if (categoryData) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === categoryData
        );
      }


       // Filter by category
       if (subcategoryData) {
        filteredProducts = filteredProducts.filter(
          (product) => product.subcategory === subcategoryData
        );
      }


      // if (metalType === "silver") {
      //   filteredProducts = filteredProducts.filter(
      //     (product) => ["Tabeez Collection", "kids accessories"].includes(product.category)
      //   );
      // }

      // if (metalType === "gold") {
      //   filteredProducts = filteredProducts.filter(
      //     (product) => !["Tabeez Collection", "kids accessories"].includes(product.category)
      //   );
      // }

      if (metalType) {
        const validCategories = categoriesData
          .filter((category) => category?.type === metalType)
          .map((category) => category.title); // Extract category titles that match the metalType
  
        filteredProducts = filteredProducts.filter((product) =>
          validCategories.includes(product.category)
        );
      }
      // console.log(metalType,"Metaltype -----")
      // console.log(categoriesData,"catgeoy data ")
  
      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by price range only if priceRange is set
      if (priceRange.length === 2) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.discountPrice >= priceRange[0] &&
            product.discountPrice <= priceRange[1]
        );
      }

      // Filter by metal color
      if (selectedMetalColor) {
        filteredProducts = filteredProducts.filter((product) =>
          Object.keys(product.MetalColor).includes(selectedMetalColor)
        );
      }

      //filter enamel color
      if (selectedEnamelColor === "Pink") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Pink
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Pink?.pinkYellowGoldclr?.length > 0 ||
              product.enamelColors?.Pink?.pinkRoseGoldclr?.length > 0 ||
              product.enamelColors?.Pink?.pinkWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Black") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Black
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Black?.blackYellowGoldclr?.length > 0 ||
              product.enamelColors?.Black?.blackRoseGoldclr?.length > 0 ||
              product.enamelColors?.Black?.blackWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Red") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Red
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Red?.redYellowGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Deep_Blue") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Deep_Blue
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Deep_Blue?.deepblueYellowGoldclr?.length >
                0 ||
              product.enamelColors?.Deep_Blue?.deepblueRoseGoldclr?.length >
                0 ||
              product.enamelColors?.Deep_Blue?.deepblueWhiteGoldclr?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Lotus_Green") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Lotus_Green
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Lotus_Green?.lotusgreenYellowGoldclr
                ?.length > 0 ||
              product.enamelColors?.Lotus_Green?.lotusgreenRoseGoldclr?.length >
                0 ||
              product.enamelColors?.Lotus_Green?.lotusgreenWhiteGoldclr
                ?.length > 0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Deep_Green") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Deep_Green
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Deep_Green?.deepgreenYellowGoldclr?.length >
                0 ||
              product.enamelColors?.Deep_Green?.deepgreenRoseGoldclr?.length >
                0 ||
              product.enamelColors?.Deep_Green?.deepgreenWhiteGoldclr?.length >
                0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      } else if (selectedEnamelColor === "Turquoise") {
        console.log(`${selectedEnamelColor} selected color`);
        const normalizedSelectedColor = selectedEnamelColor.toLowerCase(); // Convert the selected color to lowercase
        const requiredMetalColors = [
          "YellowGoldclr",
          "RoseGoldclr",
          "WhiteGoldclr",
        ];
        filteredProducts = filteredProducts.filter((product) => {
          console.log("Checking product:", product); // Log the product being checked

          // Check if all required metal colors have the selected enamel color
          const hasAllColors = requiredMetalColors.every((metalColor) => {
            // Construct the dynamic key for the enamel color
            const key = `${normalizedSelectedColor}${metalColor}`;
            console.log(
              `Checking key: ${key} in enamelColors:`,
              product.enamelColors?.Turquoise
            );

            // Check if the product has enamel colors for this key
            const hasColor =
              product.enamelColors?.Turquoise?.turquoiseYellowGoldclr?.length >
                0 ||
              product.enamelColors?.Turquoise?.turquoiseRoseGoldclr?.length >
                0 ||
              product.enamelColors?.Turquoise?.turquoiseWhiteGoldclr?.length >
                0;
            console.log(`Product has ${key}:`, hasColor);

            return hasColor;
          });

          console.log(`Product ${product.name} has all colors:`, hasAllColors);
          return hasAllColors;
        });
        console.log("Filtered by enamel color:", filteredProducts);
      }

      if (selectedTag) {
        filteredProducts = filteredProducts.filter((product) =>
          product.tags.toLowerCase().includes(selectedTag.toLowerCase())
        );
      }

      // if (selectedAgeGroup) {
      //   filteredProducts = filteredProducts.filter((product) => {
      //     // Check if `ageGroup` is defined and is an object
      //     if (product.ageGroup && typeof product.ageGroup === "object") {
      //       // Check if `selectedAgeGroup` exists in `ageGroup`
      //       return product.ageGroup[selectedAgeGroup] === true;
      //     }
      //     return false; // Exclude products with undefined or invalid `ageGroup`
      //   });
      // }

      if (selectedAgeGroup) {
        filteredProducts = filteredProducts.filter((product) => {
            // Check if `ageGroup` is defined and is an object
            if (product.ageGroup && typeof product.ageGroup === "object") {
                if (selectedAgeGroup === "momandme") {
                    // Check if `infants`, `kids`, and `mom` are true for "momandme"
                    return (
                        product.ageGroup.infants === true &&
                        product.ageGroup.kids === true &&
                        product.ageGroup.mom === true
                    );
                } else {
                    // Check if `selectedAgeGroup` exists in `ageGroup`
                    return product.ageGroup[selectedAgeGroup] === true;
                }
            }
            return false; // Exclude products with undefined or invalid `ageGroup`
        });
    }



      // Sort products
      switch (sortOption) {
        case "priceLowToHigh":
          filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
          break;
        case "priceHighToLow":
          filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
          break;
        case "nameAToZ":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "nameZToA":
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "bestseller":
          filteredProducts.sort(
            (a, b) => (b.sold_out || 0) - (a.sold_out || 0)
          ); // Sort by highest sold_out first
          console.log(
            "Sorted by bestseller:",
            filteredProducts.map((p) => p.sold_out)
          ); // Debug
          break;
        default:
          break;
      }
      console.log("Final filtered products:", filteredProducts);
      setFilteredData(filteredProducts);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(filteredData,"filtering products --------")

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    updateURLParams({ search: e.target.value });
  };
  useEffect(() => {
    // Ensure filtering happens only after categoriesData and products are loaded
    if (categoriesData.length > 0 && products.length > 0) {
      filterProducts();
    }
  }, [categoriesData, metalType]);

  const handlePriceChange = (e, index) => {
    const newValue = Number(e.target.value);
    console.log(newValue,"new value of range")
    setPriceRange((prevRange) => {
      const updatedRange = [...prevRange];
      
      if (index === 0) {
        // Moving the minimum slider
        updatedRange[0] = newValue;
        // Ensure min is less than or equal to max
        if (updatedRange[0] > updatedRange[1]) {
          updatedRange[1] = updatedRange[0]; // Adjust max if min exceeds max
        }
      } else if (index === 1) {
        // Moving the maximum slider
        updatedRange[1] = newValue;
        // Ensure max is greater than or equal to min
        if (updatedRange[1] < updatedRange[0]) {
          updatedRange[0] = updatedRange[1]; // Adjust min if max is less than min
        }
      }
  
      // Automatically set min to 0 if max is moved
      if (index === 1) {
        updatedRange[0] = 0;
      }

      
  
      // Update URL parameters with new price range
      // updateURLParams({ priceMin: updatedRange[0], priceMax: updatedRange[1] });
  
      return updatedRange;
    });
  };


 
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    updateURLParams({ sort: e.target.value });
  };

  const handleMetalColorChange = (e) => {
    setSelectedMetalColor(e.target.value);
    updateURLParams({ metalColor: e.target.value });
  };

  const updateURLParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    setSearchParams(params);
  };

  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
    updateURLParams({ ageGroup: e.target.value });
  };
  const handleTagClick = (tag) => {
   
    
    console.log(tag.toLowerCase(), "product tagselcted");
    setSelectedTag(tag.toLowerCase());
    updateURLParams({ tag });
   
    
    if (isMobile) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scrolling
      });

      // Hide the filter section
      setIsFilterVisible(false);
    }
  };
  const removeFilter = (type) => {
    switch (type) {
      case "price":
        setPriceRange([]);
        updateURLParams({ priceMin: "", priceMax: "" });
        break;
      case "metalColor":
        setSelectedMetalColor("");
        updateURLParams({ metalColor: "" });
        break;
      case "search":
        setSearchQuery("");
        updateURLParams({ search: "" });
        break;
      case "sort":
        setSortOption("");
        updateURLParams({ sort: "" });
        break;

      case "enamelColor":
        setSelectedEnamelColor("");
        updateURLParams({ enamelColor: "" });
        break;
      case "tag":
        setSelectedTag("");
        updateURLParams({ tag: "" });
        break;
      case "ageGroup":
        setSelectedAgeGroup("");
        updateURLParams({ ageGroup: "" });
        break;
      case "category":
        setSelectedCategory(null);
        updateURLParams({ category: "" });
        break;
      case "subcategory": // New case for subcategory
        setSelectedSubcategory(""); // Adjust this line based on your state variable name
        updateURLParams({ subcategory: "" }); // Adjust this line based on how you're managing URL parameters
        break;
      

      default:
        break;
    }
    filterProducts(); // Reapply filters after removal
  };

  const handleEnamelColorChange = (color) => {
    setSelectedEnamelColor(color);
    updateURLParams({ enamelColor: color });

    if (isMobile) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scrolling
      });

      // Hide the filter section
      setIsFilterVisible(false);
    }
  };
  const navigate = useNavigate();

  

  const handleViewProducts = (categoryTitle) => {

    
    // Navigate to the products page with the category as a query parameter
    navigate(`/products?category=${categoryTitle}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling
    });
    if (isMobile) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scrolling
      });

      // Hide the filter section
      setIsFilterVisible(false);
    }
  };

  const query = new URLSearchParams(location.search);
  const selectedEnamelColorimg = query.get('enamelColor') || ''; // Default to empty string if no color is selected

  const submitHandle = (category, subcategory = null) => {
    const subcategoryParam = subcategory ? `&subcategory=${subcategory.name}` : '';
    navigate(`/products?category=${category.title}${subcategoryParam}`);
  };

  const [selectedSubcat, setSelectedSubcat] = useState(null); // State to track selected subcategory

// Handle tab click to filter images based on subcategory
  const handleSubcatClick = (subcat) => {
    setSelectedSubcat(subcat); // Update the selected subcategory
  };
  console.log(selectedCategory,'selectedCategory')

  // useEffect(() => {
  //   if (metalType) {
  //     // Clear filters specific to categories
  //     removeFilter("price");
  //     removeFilter("metalColor");
  //     removeFilter("search");
  //     removeFilter("sort");
  //     removeFilter("enamelColor");
  //     removeFilter("tag");
  //     removeFilter("ageGroup");
  //     removeFilter("category");
  //     removeFilter("subcategory");
      
  //   }
  // }, [metalType]);
 
 
  useEffect(() => {
    if (metalType) {
      // Reset all states
      setPriceRange([]);
      setSelectedMetalColor("");
      setSearchQuery("");
      setSortOption("");
      setSelectedEnamelColor("");
      setSelectedTag("");
      setSelectedAgeGroup("");
      setSelectedCategory(null);
      setSelectedSubcategory("");
  
      // Update URL parameters in bulk
      updateURLParams({
        priceMin: "",
        priceMax: "",
        metalColor: "",
        search: "",
        sort: "",
        enamelColor: "",
        tag: "",
        ageGroup: "",
        category: "",
        subcategory: ""
      });
  
      // Apply filters after resetting states
      filterProducts();
    }
  }, [metalType]);


  // if(!categoryData){
    const sortedData = filteredData.sort((a, b) => {
      // Check if the product belongs to "Religious Collections"
      const isReligiousA = a.category === "Religious Collections";
      const isReligiousB = b.category === "Religious Collections";
    
      // Prioritize "Religious Collections"
      if (isReligiousA && !isReligiousB) return -1; // A is religious, B is not
      if (!isReligiousA && isReligiousB) return 1; // B is religious, A is not
    
      // Secondary sorting by CreatedAt (newest first)
      return new Date(b.CreatedAt) - new Date(a.CreatedAt);
    });

  // }
  
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sortedData]);
  

 

  return (
    <>
      {/* <div className="productbanner">
        <img src={allproductbanner} alt="" />
      </div> */}

      <div>
        {/* Render the banner of the selected category */}
        {selectedCategory ? (
          <div className="productbanner">
            <img
              loading="lazy"
              src={`${imgdburl}${selectedCategory.productbanner.url}`}
              alt={selectedCategory.title}
              
            />
          </div>
        ) : (
          <div className="productbanner">
             <img
              loading="lazy"
              src={allproductbanner}
              
            />
          </div>
          
        )}
      </div>
      {/* <button
        onClick={toggleFilterVisibility}
        className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-md border border-gray-300 shadow-sm transition-all duration-150 ease-in-out"
      >
        <span className="font-medium">
          {isFilterVisible ? "Hide filter" : "Show filter"}
        </span>
        {isFilterVisible ? (
          <FiChevronUp size={20} className="ml-2 text-gray-600" />
        ) : (
          <FiChevronDown size={20} className="ml-2 text-gray-600" />
        )}
      </button> */}
       <button
      onClick={toggleFilterVisibility}
      className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg border border-gray-400 shadow-sm text-[12px] font-medium transition-all duration-150 ease-in-out sm:p-2.5 sm:text-base md:p-3 md:text-[14px]"
    >
      <span>{isFilterVisible ? "Hide" : "Show"} filter</span>
      {isFilterVisible ? (
        <FiChevronUp size={14} className="ml-2 text-gray-600" />
      ) : (
        <FiChevronDown size={14} className="ml-2 text-gray-600" />
      )}
    </button>
      <div
        className={`productpagemain flex  ${
          isFilterVisible ? "" : "justify-center"
        }`}
      >
        {/* Sidebar Filter Section */}

        {isFilterVisible && (
          <div
            className={`filtersection ${
              isFilterVisible ? "visible" : "hidden"
            }  `}
          >
            <div className="filtersechead">
              {/* Applied Filters */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Applied Filters</h3>

                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Search: {searchQuery}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("search")}
                      />
                    </div>
                  )}
                  {priceRange.length === 2 && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>
                        Price: {priceRange[0]} - {priceRange[1]}
                      </span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("price")}
                      />
                    </div>
                  )}
                  {selectedMetalColor && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Metal Color: {selectedMetalColor}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("metalColor")}
                      />
                    </div>
                  )}
                  {sortOption && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Sort: {sortOption}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("sort")}
                      />
                    </div>
                  )}
                  {selectedEnamelColor && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Enamel Color: {selectedEnamelColor}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("enamelColor")}
                      />
                    </div>
                  )}
                  {selectedTag && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>Tag: {selectedTag}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("tag")}
                      />
                    </div>
                  )}

                  {selectedAgeGroup && (
                    <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                      <span>AgeGroup: {selectedAgeGroup}</span>
                      <RiCloseFill
                        className="ml-2 cursor-pointer"
                        onClick={() => removeFilter("ageGroup")}
                      />
                    </div>
                  )}

                {selectedCategory && (
                        <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                            <span className="text-[12px]">Category: {selectedCategory.title}</span>
                            <RiCloseFill
                                className="ml-2 cursor-pointer"
                                onClick={() => removeFilter("category")}
                            />
                        </div>
                    )}

                {selectedSubcategory && ( // New check for selected subcategory
                        <div className="flex items-center bg-blue-200 px-2 py-1 rounded-md">
                          <span className="text-[12px]">Subcategory: {selectedSubcategory}</span>
                          <RiCloseFill
                            className="ml-2 cursor-pointer"
                            onClick={() => removeFilter("subcategory")} // Handle removal
                          />
                        </div>
                      )}
                </div>
              </div>

              <div className="searchfilter">
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="searchfilterinp"
                />

                <IoSearchOutline className="serachiconfilter" />
              </div>
            </div>

            <div className="filterprice ml-4">
              <h5>Filter by Price</h5>
              <div className="card-conteiner">
                <div className="card-content">
                  <div className="rangeslider mb-2">
                    <input
                      className="min input-ranges"
                      name="range_0"
                      type="range"
                      min={0}
                      max={priceRange[1] }
                      value={priceRange[0] || 0}
                      onChange={(e) => handlePriceChange(e, 0)}
                    />
                    <input
                      className="max input-ranges"
                      name="range_1"
                      type="range"
                      min={priceRange[0] }
                      max={60000}
                      value={priceRange[1] || 60000}
                      onChange={(e) => handlePriceChange(e, 1)}
                    />
                  </div>
                </div>
              </div>
              <span>Price: ₹{priceRange[0] || 0}</span>
              <span className="pl-1 pr-1">-</span>
              <span className="mb-5">₹{priceRange[1] || 60000}</span>
            </div>
            <div className="marginbottom"></div>

            <div className="filtercategory ml-2">
              <h5>Product Categories</h5>
              <div className="filtercategorylist">
                {categoriesData.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      handleViewProducts(category.title)
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                    }

                    }
                  >
                    <ul>
                      <li>
                        {category.title} (
                        {getCategoryProductCount(category.title)})
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="marginbottom"></div>
            </div>

            <div className="Enamelcolours">
              <h5>Enamel Colors</h5>
              <div className="enamelscolorlist">
                <div
                  className="enamelclrbox deepblue"
                  onClick={
                    () => {
                      handleEnamelColorChange("Deep_Blue")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }

                  }
                ></div>
                <div
                  className="enamelclrbox pink"
                  onClick={() => {
                    handleEnamelColorChange("Pink")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  }
                ></div>
                <div
                  className="enamelclrbox turquoise"
                  onClick={() =>{
                    handleEnamelColorChange("Turquoise")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  } 
                  }
                ></div>
                <div
                  className="enamelclrbox red"
                  onClick={() => 
                    {
                      handleEnamelColorChange("Red")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  }
                ></div>
                <div
                  className="enamelclrbox black"
                  onClick={() => {

                    handleEnamelColorChange("Black")
                    window.scrollTo({ top: 0, behavior: "smooth" })  
                  }
                  }
                ></div>
                <div
                  className="enamelclrbox deepgreen"
                  onClick={() => {
                    handleEnamelColorChange("Deep_Green")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                    
                  }
                ></div>
                <div
                  className="enamelclrbox lotusgreen"
                  onClick={() =>{
                    handleEnamelColorChange("Lotus_Green")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  }
                ></div>
              </div>
              <div className="marginbottom"> </div>
            </div>

            <div className="producttags">
              <h5>Product Tags</h5>

              <div className="producttagflex">
                <div
                  className="producttagsingle"
                  onClick={() => {
                    handleTagClick("Pendant")
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }

                  }
                >
                  Pendant
                </div>
                <div
                  className="producttagsingle"
                  onClick={() =>{
                    handleTagClick("Earrings")
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }

                  }
                >
                  Earrings
                </div>
                <div
                  className="producttagsingle"
                  onClick={() => {
                    handleTagClick("Bracelets")
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }

                  }
                >
                  Bracelets
                </div>

                <div
                  className="producttagsingle"
                  onClick={() => {
                    handleTagClick("Nazariya")
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }
                  }
                >
                  Nazariya
                </div>
                <div
                  className="producttagsingle"
                  onClick={() => 
                    {
                      handleTagClick("Mom & me")
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }

                  }
                >
                  Mom & me
                </div>
                <div
                  className="producttagsingle"
                  onClick={() => 
                    {
                      handleTagClick("Gift")
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }

                  }
                >
                  Gifts
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            {/* <div className="mb-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
            type="number"
              min={0}
              value={priceRange[0] || ""}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min"
            />
            <input
            type="number"
              min={0}
              value={priceRange[1] || ""}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Max"
            />
          </div>
        </div> */}
          </div>
        )}
        {/* Products Display Section */}
        <div
          className={`parentfilteradjustlast transition-all duration-300 ${
            isFilterVisible ? "w-3/4" : "w-[95%]"
          }`}
        >
          <div className="sortfilter">
            <div className="mb-4 flex items-center justify-end gap-3">
              <h3 className="font-semibold mb-2">Sort By</h3>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className=" border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="nameAToZ">Name: A to Z</option>
                <option value="nameZToA">Name: Z to A</option>
                <option value="bestseller">Bestseller</option>{" "}
                {/* Add bestseller option */}
              </select>
            </div>
            <div className="sortline"></div>
          </div>
          <div className="section filtsecbig">
            <h1 className="text-center text-2xl font-semibold mb-5">
              {categoryData ? categoryData : "All Products"}
            </h1>

            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredData.length === 0  && selectedCategory ? (
              <>
              <p className="text-center text-[14px] text-[#030303b7]">
                We're working on restocking our collection. Stay tuned for new arrivals soon!
              </p>
 {/* Display extracat data */}
             
              
              
              <div className="mt-6">

              { selectedCategory?.extraimgurl && Array.isArray(selectedCategory.extraimgurl) && selectedCategory.extraimgurl.length > 0 ?
               (<>
               {Object.entries(
                  selectedCategory?.extraimgurl?.reduce((acc, image) => {
                    // If the collection doesn't exist in the accumulator, add it
                    if (!acc[image.collection]) {
                      acc[image.collection] = [];
                    }
                    // Add the image to the respective collection
                    acc[image.collection].push(image);
                    return acc;
                  }, {})
                ).map(([collectionName, images]) => (
                  <div key={collectionName} className="mb-12 ">
                    {/* Display the collection name */}
                    <h2 className="comingcollectionline text-center text-lg font-semibold ">
                      {collectionName} 
                    </h2>
                    {selectedCategory?.extracat?.length > 0 && (
                      <div className="mt-3 mb-3 pb-2">
                        
                        <div className="flex justify-center">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {selectedCategory?.extracat?.map((category, index) => (
                              <div
                              onClick={() => handleSubcatClick(category.catname)} 
                                key={index}
                                className="subpendantcat cursor-pointer w-[200px] bg-white border border-[#41d399c1] shadow-lg rounded-[22px] p-4 text-center transition-transform duration-300 hover:shadow-xl hover:scale-105"
                              >
                                <h3 className="font-Poppins text-[16px] text-[#000000c2] mb-2">{category.catname}</h3>
                                <div className="overflow-hidden">
                                  {category.catimg && (
                                    <img
                                      src={category.catimg}
                                      alt={category.catname}
                                      className="w-full h-32 object-contain  rounded-md mt-2"
                                    />
                                  )}
                                </div>
                                <div className=" mb-3">
                                  <button className="subpendantcatbtn px-5 py-2 bg-[#35a578] text-white rounded hover:bg-[#006039] text-[10px]">
                                    View {category.catname}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-center text-[12px] text-[#00000081] ">A preview of what's to come! Discover a sneak peek of our upcoming collection, with more stunning pieces arriving soon.</p>
                    <div className="text-center text-[12px] text-[#1d1d1dc9] mb-4">(coming soon...)</div>
                    {/* Render images of the collection below the collection name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images
                  // Filter images by selected subcategory or show all images if no subcategory is selected
                  .filter((image) =>
                    selectedSubcat ? image.subcat === selectedSubcat : true
                  )
                  .map((image, index) => (
                    <Zoom
                      key={index}
                      zoomMargin={40}
                      defaultStyles={{ overlay: { zIndex: 1000 } }}
                      onZoom={() => setIsZoomed(true)}
                      onUnzoom={() => setIsZoomed(false)}
                    >
                      <img
                        loading="lazy"
                        src={image.url}
                        alt={`extra-${index}`}
                        className="!cursor-pointer w-full h-60 object-cover shadow-lg rounded-lg border border-gray-200"
                      />
                    </Zoom>
                  ))}
                    </div>
                  </div>
                ))}

               </>) :
              (<>
              <p className="text-center">Loading your products, please wait...</p>
              </>)}
                {/* Group images by collection and convert the result to an array */}
                
              </div>
            </>
            
            
            ) : (
              <>

          {/* {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
                  <div className="mt-8">
                      <h2 className="text-center text-xl font-semibold mb-4">Subcategories</h2>
                      <div className="flex justify-center">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {selectedCategory.subcategories.map((subcat, subIndex) => (
                                  <div key={subIndex} className="bg-white shadow-md rounded-lg p-4 text-center">
                                      <h3 className="font-Poppins text-lg">{subcat.name}</h3>
                                      {subcat.imageUrl && (
                                          <img src={subcat.imageUrl} alt={subcat.name} className="w-full h-32 object-cover rounded-md mt-2" />
                                      )}
                                      <button
                                          onClick={() => submitHandle(selectedCategory, subcat)}
                                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                      >
                                          View {subcat.name}
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              )} */}


              {/* //only for diamond endant */}
              {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
                      <div className="mt-3 mb-10 pb-7 border-b border-[#5DC2B0]">
                          <h2 className="text-center text-[18px] font-[500] text-[#000000cf] mb-4">SubCategories</h2>
                          <div className="flex justify-center">
                              <div className={`grid justify-center grid-cols-1 sm:grid-cols-2 ${selectedCategory.subcategories.length >= 4 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "}  gap-8`}>
                                  {selectedCategory.subcategories.map((subcat, subIndex) => (
                                      <div onClick={() => submitHandle(selectedCategory, subcat)} key={subIndex} className="subpendantcat cursor-pointer w-[210px] bg-white border border-[#41d399c1] shadow-lg rounded-[22px] p-4 text-center transition-transform duration-300 hover:shadow-xl hover:scale-105">

                                          <h3 className="font-Poppins text-[16px] text-[#000000c2] mb-2">{subcat.name}</h3>
                                          <div className="overflow-hidden">

                                          {subcat?.image_Url && (
                                            <img
                                            src={`${imgdburl}${subcat.image_Url.url}`}
                                            alt={subcat.name}
                                            className={`w-full h-32 object-contain ${selectedCategory.title === "kids accessories" ? "" : "scale-125"}  rounded-md mt-2`}
                                            />
                                          )}
                                          </div>
                                          <div className={`${selectedCategory.title === "kids accessories" ? "mt-[-2px]" : "mt-[-15px]"}  mb-3`}>
                                          <button
                                              
                                              className="subpendantcatbtn px-5 py-2 bg-[#35a578] text-white rounded hover:bg-[#006039] text-[10px]"
                                              >
                                              View {subcat.name}
                                          </button>
                                            </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

{/* 
                  {/* //only for kids accessories */}
                  {/* {selectedCategory && selectedCategory.title === "kids accessories" && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
                      <div className="mt-3 mb-10 pb-7 border-b border-[#5DC2B0]">
                          <h2 className="text-center text-[18px] font-[500] text-[#000000cf] mb-4">SubCategories</h2>
                          <div className="flex justify-center">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                  {selectedCategory.subcategories.map((subcat, subIndex) => (
                                      <div onClick={() => submitHandle(selectedCategory, subcat)} key={subIndex} className="subpendantcat cursor-pointer w-[230px] bg-white border border-[#41d399c1] shadow-lg rounded-[22px] p-4 text-center transition-transform duration-300 hover:shadow-xl hover:scale-105">

                                          <h3 className="font-Poppins text-[16px] text-[#000000c2] mb-2">{subcat.name}</h3>
                                          <div className="overflow-hidden">

                                          {subcat?.imageUrl && (
                                            <img
                                            src={subcat.imageUrl}
                                            alt={subcat.name}
                                            className="w-full !h-[100px] object-contain  rounded-md mt-[-5px]"
                                            />
                                          )}
                                          </div>
                                          <div className="mt-[-5px] mb-3">
                                          <button
                                              
                                              className="subpendantcatbtn px-5 py-2 bg-[#35a578] text-white rounded hover:bg-[#006039] text-[10px]"
                                              >
                                              View {subcat.name}
                                          </button>
                                            </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )} */} 




              <div
                className={`adjustgridfilter grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${
                  isFilterVisible ? "xl:grid-cols-4" : "xl:grid-cols-5"
                } mb-12`}
                >
                {/* {filteredData.map((product, index) => (
                  <ProductCard data={product} key={index} selectedEnamelColorimg={selectedEnamelColorimg} />
                ))} */}
                

                {
                  sortedData.map((product, index) => (
                    <ProductCard
                      data={product}
                      key={index}
                      selectedEnamelColorimg={selectedEnamelColorimg}
                    />
                  ))
                }

                
              </div>
                </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
