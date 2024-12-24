import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardHeader from '@/ShopDashboardPage/DashboardHeader';
import ShopProductDetails from './ShopProductDetails';

function ShopProductDetailsPage() {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, ' ');

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products.find((product) => product._id === id);
      if (product) {
        setData(product);
      } else {
        console.log(`Product with name '${productName}' not found`);
      }
    } else {
      console.log('Products array is not available yet');
    }
  }, [productName, products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productName]);
  console.log(data,"see the data ")

  return (
    <div>
      <DashboardHeader />
      {data && <ShopProductDetails product={data} />}
    </div>
  );
}

export default ShopProductDetailsPage;
