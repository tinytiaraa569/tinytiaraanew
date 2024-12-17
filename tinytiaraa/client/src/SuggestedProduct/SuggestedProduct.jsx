import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Styles/styles';
import ProductCard from '../MainSection/Productcard/ProductCard';

function SuggestedProduct({ data }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { products } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (products && data) {
      // Filter products by both category and subcategory
      const filteredProducts = products.filter((product) => {
        return (
          product.category === data.category &&
          product.subcategory === data.subcategory
        );
      });

      // Limit to 5 products
      setProductData(filteredProducts.slice(0, 5));
    }
  }, [products, data]); // Re-run when products or data changes

  return (
    <div className="bg-[#f5f4f4]">
      {data && (
        <div className={`p-4 ${styles.section}`}>
          <h2 className={`${styles.heading} text-[22px] font-[500] border-b mb-5 font-Poppins suggestheadingadjust`}>
            You may also like
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productData &&
              productData.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestedProduct;
