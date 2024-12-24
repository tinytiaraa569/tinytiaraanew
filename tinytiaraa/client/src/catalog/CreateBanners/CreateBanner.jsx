import styles from "@/Styles/styles";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdDownload, MdEdit } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing arrow icons
import { Link, useLocation } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import XLSX
import axios from "axios";
import { imgdburl, server } from "@/server";
import swal from "sweetalert"; // Import SweetAlert
import AboutBanner from "./AboutBanner";
import Custombanner from "./Custombanner";
import ContactBanner from "./ContactBanner";


function CreateBanner() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // Dummy data for banners
  const [banners, setBanners] = useState([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bannersToDelete, setBannersToDelete] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('Home');

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

    // Fetch banners from API
    useEffect(() => {
      const fetchBanners = async () => {
        try {
          const response = await axios.get(`${server}/get-allbanners`);
          // Sort banners by their order property before setting state
          const sortedBanners = response.data.banners.sort((a, b) => a.order - b.order);
          setBanners(sortedBanners);
          setLoading(false);
        } catch (err) {
          setError("Failed to load banners.");
          setLoading(false);
        }
      };
    
      fetchBanners();
    }, []);
  
  // Handle banner selection
  const handleSelectBanner = (id) => {
    console.log(id,"selected id")
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner._id === id ? { ...banner, selected: !banner.selected } : banner
      )
    );
  };

  // Handle banner deletion
  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(`${server}/delete-banner/${id}`);
      setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id));
      swal("Success", "Banner deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting banner:", err);
      setError("Failed to delete banner.");
      swal("Oops!", "Failed to delete banner.", "error");
    }
  };

  const handleMultipleDelete = async  () => {
    // setBanners((prevBanners) => prevBanners.filter((banner) => !bannersToDelete.includes(banner._id)));
    // setBannersToDelete([]);
    // setShowDeletePopup(false);
    try {
      // Call API to delete multiple banners
      await axios.post(`${server}/delete-multiple-banners`, { ids: bannersToDelete });

      // Update state to remove deleted banners from UI
      setBanners((prevBanners) => prevBanners.filter((banner) => !bannersToDelete.includes(banner._id)));
      setBannersToDelete([]);
      setShowDeletePopup(false);
      swal("Success", "Selected banners deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting multiple banners:", err);
      setError("Failed to delete selected banners.");
      swal("Oops!", "Failed to delete selected banners.", "error");
    }
  };

  // Example function to change order of banners
  const changeBannerOrder = async (index, direction) => {
    const newBanners = [...banners];
    const targetIndex = index + direction;
  
    // Check if the new index is out of bounds
    if (targetIndex < 0 || targetIndex >= newBanners.length) return;
  
    // Move the selected banner up or down in the array
    const [movedBanner] = newBanners.splice(index, 1);
    newBanners.splice(targetIndex, 0, movedBanner);
  
    // Reassign order for each banner to ensure a sequential order
    const orderedBanners = newBanners.map((banner, order) => ({
      id: banner._id,
      order,
    }));
  
    // Update state with the new order
    setBanners(newBanners);
  
    // Send the new order to backend
    try {
      await axios.post(`${server}/update-banner-order`, { orderedBanners });
      console.log("Banner order updated successfully!");
    } catch (error) {
      console.error("Failed to update banner order:", error);
      swal("Oops!", "Failed to update banner order.", "error");
    }
  };

  // Function to export banners to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(banners.map(({ _id, title, link, images }) => ({
      ID: _id,
      Title: title,
      Link: link,
      ImageURL: images && images.length > 0 ? `${imgdburl}${images[0].url}` : '',
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
    XLSX.writeFile(workbook, "banners.xlsx");
  };
  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>{error}</p>;

  const renderSelectedBanner = () => {
    switch (selectedCollection) {
      case 'About':
        return <AboutBanner />;
      case 'CustomJewelry':
        return <Custombanner />;
      case 'Contact':
        return <ContactBanner />;
      default:
        return <div> 
          <>

          <div className="flex bg-slate-700 text-white rounded-lg py-4 px-6 justify-between items-center shadow-inner">
            <Link to="/dashboard/banner/create">
              <button
                className="flex items-center bg-blue-600 px-4 py-2 rounded transition duration-300 hover:bg-blue-500"
              >
                <IoMdAdd size={20} className="mr-2" />
                <span className="text-[16px] font-Poppins font-semibold">Add Banner</span>
              </button>
            </Link>
            {/* Excel Export Button */}
            <button
              className="flex items-center bg-green-600 px-4 py-2 rounded transition duration-300 hover:bg-green-500"
              onClick={exportToExcel} // Call export function
            >
              <MdDownload className="mr-2" /> Export to Excel
            </button>


            <button
              className="flex items-center bg-red-600 px-4 py-2 rounded transition duration-300 hover:bg-red-500"
              onClick={() => {
                const selectedBanners = banners.filter(banner => banner.selected);
                if (selectedBanners.length > 0) {
                  setBannersToDelete(selectedBanners.map(banner => banner._id));
                  setShowDeletePopup(true);
                } else {
                  setShowNotification(true); // Show notification instead of alert
                }
              }}
            >
              <MdDelete className="mr-2" /> Delete
            </button>
          </div>

          {/* Banner list */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`border !rounded-[5px] p-4 shadow-lg  ${
                    banner.selected ? "bg-blue-100 border-blue-500" : "bg-white"
                  }`}
                >
                  <img
                  src={`${imgdburl}${banner.images[0]?.url}`}
                    alt={banner.title}
                    className="w-full h-[200px] object-contain rounded-md mb-4"
                  />
                  <div className="flex justify-between">

                  <h4 className="text-lg font-semibold mb-2">{banner.title}</h4>
                  <a href={banner.link} className="text-blue-500 hover:underline">
                    /{banner.link}
                  </a>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    {/* Edit Button */}
                    <Link
                      to={`/dashboard/banner/edit/${banner._id}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <MdEdit className="mr-2" /> Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      className="text-red-600 hover:underline flex items-center"
                      onClick={() => handleDeleteBanner(banner._id)}
                    >
                      <MdDelete className="mr-2" /> Delete
                    </button>
                  </div>

                  {/* Select Checkbox */}
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      checked={banner.selected}
                      onChange={() => handleSelectBanner(banner._id)}
                      className="mr-2"
                    />
                    <label>Select</label>
                  </div>

                  {/* Reorder Buttons with icons */}
                  <div className="flex justify-between mt-2">
                    <button
                    className="flex items-center text-gray-600 hover:text-gray-800"
                    onClick={() => changeBannerOrder(index, -1)}
                    disabled={index === 0}
                    >
                    <FaArrowUp className="mr-1" /> Move Up
                    </button>
                    <button
                    className="flex items-center text-gray-600 hover:text-gray-800"
                    onClick={() => changeBannerOrder(index, 1)}
                    disabled={index === banners.length - 1}
                    >
                    <FaArrowDown className="mr-1" /> Move Down
                    </button>
                    </div>
                          </div>
                        ))}
                      </div>
                    </div>

          {/* Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete the selected banners?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleMultipleDelete}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Popup */}
          {showNotification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-black">Please select at least one banner.</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2 mt-2"
                  onClick={() => setShowNotification(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          </>
        </div>; // Default or 'Home' case
    }
  };
  const location = useLocation();

  // Get the last segment of the URL (e.g., "dashboard" or "overview")
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1];

  // You can map the path segment to a more readable name
  const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter

  return (
    <div className="w-full min-h-[90vh] h-auto pt-2 px-10 p-5 bg-[#f0f8ff] shadow-md rounded-lg">
      <div className="flex mt-4 justify-between mb-3">
        <div>

      <h3 className={`font-poppins text-[20px]  text-gray-700 font-[600]`}>
        Create Banners
      </h3>
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4 mt-1">
            <ol className="flex space-x-2">
            <li>
                <Link to={"/dashboard"} className="hover:text-blue-500">Home</Link>
            </li>
            <li>&gt;</li> {/* Separator */}
            <li>
                <span className="text-gray-400">{breadcrumbText}</span> {/* Active breadcrumb */}
            </li>
            </ol>
        </nav>
              
        </div>

      <div className="flex items-center justify-between font-Poppins mb-4">
      <div className="relative">
          <select
            value={selectedCollection}
            onChange={handleCollectionChange}
            className="bg-white border border-gray-300 text-[#555] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Home">Home Banners Collection</option>
            <option value="About">About Banners Collection</option>
            <option value="CustomJewelry">CustomJewelry Banners Collection</option>
            <option value="Contact">Contact Banners Collection</option>
          </select>
        </div>
        </div>


        
      </div>

     
      {renderSelectedBanner()}
    </div>
  );
}

export default CreateBanner;
