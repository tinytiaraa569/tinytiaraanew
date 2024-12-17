import React, { useEffect, useState } from 'react';
import styles from '../../Styles/styles';
import ProductCard from '../Productcard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '@/redux/actions/product';

function FeatureProduct() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products || {}); // Add a fallback for products
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // State to track number of visible products

  useEffect(() => {
    // Dispatch an action to fetch all products (ensure the action is correctly set up in your redux store)
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Update the data when products change
    if (products && products.length > 0) {
      const visibleProducts = products.slice(0, visibleCount); // Get the visible products
      setData(visibleProducts); // Set data state with the visible products
    }
  }, [products, visibleCount]);

  const handleViewMore = () => {
    // Increase visibleCount by 10 more items
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className='bg-[#f5f4f4] py-5'>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className='text-center mb-[5px]'>Featured Items</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0">
          {data && data.length !== 0 ? (
            data.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      <div className="text-center">
        {products && visibleCount < products.length && ( // Check if products exist before accessing length
          <h4
            className='text-[17px] font-[600] font-Poppins cursor-pointer'
            onClick={handleViewMore}
          >
            View More
          </h4>
        )}
      </div>
    </div>
  );
}

export default FeatureProduct;
