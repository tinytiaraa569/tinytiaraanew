import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../Styles/styles';
import ProductCard from '../Productcard/ProductCard';
import './newarrivals.css';

function NewArrivals() {
  const { products } = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(10); // Default to 10 for larger screens

  const updateVisibleCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setVisibleCount(6); // Show 6 products on smaller screens (mobile/tablet)
    } else {
      setVisibleCount(10); // Show 10 products on larger screens (desktop)
    }
  };
  useEffect(() => {
    console.time('Products Load Time'); // Start the timer when the component mounts

    return () => {
      console.timeEnd('Products Load Time'); // End the timer when the component unmounts
    };
  }, []);

  const handleViewMore = () => {
    const scrollPosition = window.scrollY;
    setVisibleCount((prevCount) => prevCount + 10); // Load 10 more products
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      updateVisibleCount(); // Set visibleCount based on screen size initially
    }

    // Listen for window resize events to update the product count
    window.addEventListener('resize', updateVisibleCount);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, [products]);

  // Sort products by `sold_out` value in descending order (higher sold_out first)
  const sortedProducts = products && Array.isArray(products)
    ? [...products].sort((a, b) => b.sold_out - a.sold_out)
    : [];

  return (
    <div className='bg-[#fff] py-5'>
      <div className={`customheadingnewarrivals ${styles.section}`}>
        <div className={`${styles.heading} customheadingnewarrivalsheading`}>
          <h1 className='text-[#01463A] text-[30px] font-[400] text-center'>Featured product</h1>
          <p className='text-[#3A3A3A] text-[20px] text-center font-[300]'>Shop by our top-selling categories, bought frequently by most customers</p>
        </div>
        <div className="grid custom-grid gap-[20px]">
          {
            sortedProducts.slice(0, visibleCount).map((i, index) => (
              <ProductCard data={i} key={index} />
            ))
          }
        </div>
      </div>
      {
        sortedProducts.length > visibleCount && (
          <div className="text-center mt-[15px]">
            <button 
              className='productviewmore text-[17px] font-[600] font-Poppins cursor-pointer'
              onClick={handleViewMore}
            >
              View More
            </button>
          </div>
        )
      }
    </div>
  );
}

export default NewArrivals;
