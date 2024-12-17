import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';
import ProductDetails from './ProductDetails';
import SuggestedProduct from '../SuggestedProduct/SuggestedProduct';
import { useSelector } from 'react-redux';
import RecentlyViewedProducts from '@/RecentlyViewedProducts/RecentlyViewedProducts';

function ProductDetailsPage() {
    const { products } = useSelector((state) => state.products);
    console.log(products);

    const { name } = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const product = products.find(
                (product) => product.name === productName || product.name.replace(/ /g, "-") === name
            );
            if (product) {
                setData(null); // Reset data to avoid showing the previous product's details temporarily.
                
                // Delay setting the new product data slightly to ensure reset occurs.
                setTimeout(() => {
                    setData(product);
                }, 0); 

                const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

                // Add the product if it's not already in the list
                const updatedViewedProducts = [product, ...viewedProducts.filter(p => p._id !== product._id)];

                // Limit to the most recent 4 products
                const limitedViewedProducts = updatedViewedProducts.slice(0, 4);

                setRecentlyViewed(limitedViewedProducts);
                localStorage.setItem('recentlyViewed', JSON.stringify(limitedViewedProducts));
            } else {
                console.log(`Product with name '${productName}' not found`);
            }
        } else {
            console.log('Products array is not available yet');
        }
    }, [productName, name, products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productName]);

    return (
        <div>
            {data && <ProductDetails data={data} />}
            {data && <SuggestedProduct data={data} />}
            {data && <RecentlyViewedProducts recentlyViewed={recentlyViewed} />}
        </div>
    );
}

export default ProductDetailsPage;
