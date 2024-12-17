// import React from 'react'
// import './Slider.css'
// import { categoriesData } from '@/static/data'
// import { useNavigate } from 'react-router-dom';

// function Categories() {

//     const navigate = useNavigate();

//     const handleViewProducts = (categoryTitle) => {
//         // Navigate to the products page with the category as a query parameter
//         navigate(`/products?category=${categoryTitle}`);
//         window.scrollTo({ top: 0, behavior: "smooth" }); 
//       };
//     return (
//         <div className='Categories pb-5'  >
//             <h1 className='Categoriesexplore text-[30px] font-[450]'>Explore By Category</h1>

//             <div className="categoriessection">
//                 {categoriesData.slice(0, 8).map((category) => (
//                     <div className="categoriescard" key={category.id} onClick={() => handleViewProducts(category.title)}>
//                         <div className="categoriesimg">
//                             <img loading='lazy' src={category.bannerimg} alt={category.title} />
//                             <div className="categoriestext">
//                                 <div className='adjust'>
//                                     <h3>{category.title}</h3>
//                                     <button>view products</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Categories

import React, { useEffect, useState } from 'react';
import './Slider.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { server, imgdburl } from '@/server';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Number of visible cards
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/get-allcategories`);
        const filteredAndSortedCategories = response.data.categories
        
        .sort((a, b) => a.order - b.order); 
        // console.log(filteredAndSortedCategories,"filtered sort category")
        setCategories(filteredAndSortedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleViewProducts = (categoryTitle) => {
    navigate(`/products?category=${categoryTitle}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleViewMore = () => {
    setVisibleCount(categories.length); // Show all categories
  };

  return (
    <div className="Categories pb-5">
      <h1 className="Categoriesexplore text-[30px] font-[450]">Explore By Category</h1>

      <div className="categoriessection !relative !overflow-hidden">
        {loading ? (
          // Render skeletons with a greyish color and loading effect
          Array(8).fill(0).map((_, index) => (

            <div className="categoriescard" key={index}>
            <div className="">
              <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded"></div> {/* Matches height={150} */}
            </div>
            {/* <div className="">
              <div className="adjust space-y-2">
                <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded"></div> {/* Matches height={20}, width="70%" */}
                {/* <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div> {/* Matches height={15}, width="50%" */}
              {/* </div>
            </div> */}
          </div>
            // <div className="categoriescard" key={index}>
            //   <div className="categoriesimg">
            //     <Skeleton
            //       height={150}
            //       width="100%"
            //       baseColor="#e0e0e0" // Greyish base color
            //       highlightColor="#f0f0f0" // Slightly lighter highlight color for loading effect
            //     />
            //   </div>
            //   <div className="categoriestext">
            //     <div className="adjust">
            //       <Skeleton
            //         height={20}
            //         width="70%"
            //         baseColor="#e0e0e0"
            //         highlightColor="#f0f0f0"
            //       />
            //       <Skeleton
            //         height={15}
            //         width="50%"
            //         baseColor="#e0e0e0"
            //         highlightColor="#f0f0f0"
            //         style={{ marginTop: 8 }}
            //       />
            //     </div>
            //   </div>
            // </div>
          ))
        ) : categories.length > 0 ? (
            categories.slice(0, visibleCount).map((category) => (
            <div
              className="categoriescard"
              key={category.id}
              onClick={() => handleViewProducts(category.title)}
            >
              <div className="categoriesimg">
                <img loading="lazy" src={`${imgdburl}${category?.bannerimg?.url}`} alt={category.title} />
                <div className="categoriestext">
                  <div className="adjust">
                    <h3>{category.title}</h3>
                    <button>View Products</button>
                  </div>
                </div>
              </div>
            </div>
          ))
         
        ) : (
          <p>No categories available</p>
        )}
      </div>
      {visibleCount < categories.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleViewMore}
                className="px-6 py-2 bg-[#35a578] text-white rounded hover:bg-[#006039] transition-all duration-300"
              >
                View More
              </button>
            </div>
          )}
    </div>
  );
}

export default Categories;

