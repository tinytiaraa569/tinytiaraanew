import DashboardHeader from '@/ShopDashboardPage/DashboardHeader';
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar';
import React, { useState, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import swal from 'sweetalert';
import { server } from '@/server';

function NewCategoryPage() {
  const [categoryData, setCategoryData] = useState({
    title: '',
    subTitle: '',
    bannerimg: '',
    productbanner: '',
    image_Url: '',
    type: 'Gold', // Default selection for type field
  });

  const navigate = useNavigate();
  const fileInputRefs = {
    bannerimg: useRef(null),
    productbanner: useRef(null),
    image_Url: useRef(null),
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes for individual image fields

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const { name } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCategoryData((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle removing an image
  const handleRemoveImage = (imageField) => {
    setCategoryData((prev) => ({ ...prev, [imageField]: '' }));
    if (fileInputRefs[imageField].current) {
      fileInputRefs[imageField].current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!categoryData.title.trim()) {
      swal({
        title: "Error",
        text: "Category title is required.",
        icon: "error",
        button: "Ok",
      });
      return;
    }

    const bannerData = { ...categoryData };

    try {
      // Send a POST request to create the category
      await axios.post(`${server}/create-category`, bannerData);
      swal({
        title: "Category Created!",
        text: "Your new category has been successfully created.",
        icon: "success",
        button: "Ok",
      });
      navigate("/create-category"); // Redirect to the categories page after successful submission
    } catch (error) {
      console.error("Error while creating category:", error);
      swal({
        title: "Oops!",
        text: "Something went wrong while creating your category. Please try again.",
        icon: "error",
        button: "Ok",
      });
    }
  };

  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="w-full flex">
        <div className="w-[100px] md:w-[330px] max-w-[800px] min-w-[100px]">
          <DashboardSideBar active={2} />
        </div>

        <div className="w-full mt-5 px-6">
          <div className="flex items-center justify-between bg-slate-600 text-white rounded-lg py-6 px-12 mb-6">
            <h2 className="text-xl font-semibold">New Category</h2>
            <RxCross2
              className="cursor-pointer"
              size={22}
              onClick={() => {
                navigate("/create-category");
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Category Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={categoryData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter category title"
                required
              />
            </div>

            {/* Subtitle Field */}
            <div className="mb-4">
              <label htmlFor="subTitle" className="block text-gray-700 font-medium mb-2">
                Category Subtitle
              </label>
              <input
                type="text"
                id="subTitle"
                name="subTitle"
                value={categoryData.subTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter category subtitle"
              />
            </div>

            {/* Banner Image File Input */}
            <div className="mb-4">
              <label htmlFor="bannerimg" className="block text-gray-700 font-medium mb-2">
                Banner Image
              </label>
              <input
                type="file"
                id="bannerimg"
                name="bannerimg"
                ref={fileInputRefs.bannerimg}
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                accept="image/*"
              />
              {categoryData.bannerimg && (
                <div className="mt-4 flex justify-center relative group">
                  <div className="relative w-60 h-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow">
                    <img
                      src={categoryData.bannerimg}
                      alt="Banner Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage('bannerimg')}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <RxCross2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Product Banner Image File Input */}
            <div className="mb-4">
              <label htmlFor="productbanner" className="block text-gray-700 font-medium mb-2">
                Product Banner Image
              </label>
              <input
                type="file"
                id="productbanner"
                name="productbanner"
                ref={fileInputRefs.productbanner}
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                accept="image/*"
              />
              {categoryData.productbanner && (
                <div className="mt-4 flex justify-center relative group">
                  <div className="relative w-60 h-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow">
                    <img
                      src={categoryData.productbanner}
                      alt="Product Banner Preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage('productbanner')}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <RxCross2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Category Image URL or File Upload */}
            <div className="mb-4">
              <label htmlFor="image_Url" className="block text-gray-700 font-medium mb-2">
                Category Image (File)
              </label>
              <input
                type="file"
                id="image_Url"
                name="image_Url"
                ref={fileInputRefs.image_Url}
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                accept="image/*"
              />
              {categoryData.image_Url && (
                <div className="mt-4 flex justify-center relative group">
                  <div className="relative w-60 h-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow">
                    <img
                      src={categoryData.image_Url}
                      alt="Category Image Preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage('image_Url')}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <RxCross2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

             {/* Radio Button Selection for Type Field */}
             <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Category Type
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Gold"
                    checked={categoryData.type === 'Gold'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Gold</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Silver"
                    checked={categoryData.type === 'Silver'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Silver</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Coin"
                    checked={categoryData.type === 'Coin'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Coin</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCategoryPage;
