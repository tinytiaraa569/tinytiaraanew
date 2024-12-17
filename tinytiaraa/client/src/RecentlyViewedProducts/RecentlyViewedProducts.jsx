import React from 'react';
import ProductCard from '../MainSection/Productcard/ProductCard';
import styles from '../Styles/styles';

function RecentlyViewedProducts({ recentlyViewed }) {
  return (
    <div className='bg-[#f5f4f4]'>
      <div className={`p-4 ${styles.section}`}>
        <h2 className={`${styles.heading} text-[22px] font-[500] border-b mb-5 font-Poppins recentlyheadingtext`}>
          Recently Viewed Products
        </h2>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {recentlyViewed && recentlyViewed.length > 0 ? (
            recentlyViewed.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))
          ) : (
            <p className="text-center">No recently viewed products</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentlyViewedProducts;
