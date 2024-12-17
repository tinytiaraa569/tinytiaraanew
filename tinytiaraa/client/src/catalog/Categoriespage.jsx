import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardHeader from '@/ShopDashboardPage/DashboardHeader';
import DashboardSideBar from '@/ShopDashboardPage/DashboardSideBar';
import { imgdburl, server } from '@/server';
import { Button, Typography, Grid, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle , Modal, Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FiEdit } from 'react-icons/fi';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import swal from 'sweetalert'; // Import SweetAlert
import * as XLSX from 'xlsx';

const PreviewCategory = ({ category, onClose }) => {
  const [showImages, setShowImages] = useState(false); // State to toggle image visibility

  return (
    <Modal open={true} onClose={onClose}>
      <Box className="w-[95vw] md:w-[800px] bg-white pl-8 pb-8 pr-8 rounded-xl shadow-lg mx-auto mt-16 max-h-[90vh] overflow-y-auto">
        {/* Title */}
        <div className="flex justify-end">
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="absolute top-3 right-1 text-gray-700 hover:text-gray-900"
          >
            <CloseIcon color="error" />
          </IconButton>
        </div>

        <Typography variant="h5" className="mb-6 font-bold text-center text-gray-800">
          Category Preview
        </Typography>

        {/* Category Details */}
        <div className="space-y-4 mt-2">
          <Typography variant="body1" className="text-lg text-gray-700">
            <strong>Category ID:</strong> {category?.id}
          </Typography>
          <Typography variant="body1" className="text-lg text-gray-700">
            <strong>Category Name:</strong> {category.title}
          </Typography>
          <Typography variant="body1" className="text-lg text-gray-700">
            <strong>Subtitle:</strong> {category.subTitle}
          </Typography>
        </div>

        {/* Subcategories */}
        <div className="mt-3">
          <Typography variant="body1" className="font-medium text-gray-800">
            <strong>Subcategories:</strong>
          </Typography>
          <Grid container spacing={3} className="mt-3">
            {category.subcategories.map((sub, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="body2" className="p-2 bg-gray-100 rounded-md text-center shadow-sm">
                  {sub.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Toggle Button for Images */}
        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowImages(!showImages)}
            className="px-4 py-2 rounded-lg shadow-md"
          >
            {showImages ? 'Hide Images' : 'Show Images'}
          </Button>
        </div>

        {/* Conditionally Rendered Images */}
        {showImages && (
          <>
            {/* Banner Image */}
            <div className="mt-6">
              <Typography variant="body1" className="font-medium text-gray-800">
                <strong>Banner Image:</strong>
              </Typography>
              <img
                src={`${imgdburl}${category.bannerimg?.url}`}
                alt="Banner"
                className="w-full h-auto object-cover mt-3 rounded-md shadow-md"
              />
            </div>

            {/* Product Banner Image */}
            <div className="mt-6">
              <Typography variant="body1" className="font-medium text-gray-800">
                <strong>Product Banner Image:</strong>
              </Typography>
              <img
                src={`${imgdburl}${category.productbanner?.url}`}
                alt="Product Banner"
                className="w-full h-auto object-cover mt-3 rounded-md shadow-md"
              />
            </div>

            {/* Category Image */}
            <div className="mt-6">
              <Typography variant="body1" className="font-medium text-gray-800">
                <strong>Category Image:</strong>
              </Typography>
              <img
                src={`${imgdburl}${category.image_Url?.url}`}
                alt="Category"
                className="w-full h-[300px] object-contain mt-3 rounded-md shadow-md"
              />
            </div>
          </>
        )}

        {/* Created At */}
        <Typography variant="body1" className="mt-6 text-lg text-gray-700">
          <strong>Created At:</strong> {new Date(category.createdAt).toLocaleString()}
        </Typography>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            className="px-6 py-2 rounded-lg shadow-md hover:bg-secondary-dark"
          >
            Close Preview
          </Button>
        </div>
      </Box>
    </Modal>
  );
};


const EditCategoryModal = ({ category, onClose, onSave ,setCategories }) => {
  const [title, setTitle] = useState(category.title);
  const [subTitle, setSubTitle] = useState(category.subTitle);
  const [bannerImg, setBannerImg] = useState(category.bannerimg?.url || ''); 
  const [productBanner, setProductBanner] = useState(category.productbanner?.url || '');
  const [imageUrl, setImageUrl] = useState(category.image_Url?.url || '');
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const [selectedProductBanner, setSelectedProductBanner] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [type, setType] = useState(category?.type || ''); // New state for type

  // Handle image preview and file selection
  const handleImageChange = (e, imageType) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          // Update state with a single image instead of an array
          if (imageType === 'bannerImg') {
            setSelectedBannerImage(reader.result);
          } else if (imageType === 'productBanner') {
            setSelectedProductBanner(reader.result);
          } else if (imageType === 'imageUrl') {
            setSelectedImageUrl(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
 

  // Save the changes to category
  const handleSave = async () => {
    if (!title ) {
      alert('All fields are required!');
      return;
    }
    const validTypes = ['gold', 'silver', 'coin'];
    if (!validTypes.includes(type.toLowerCase())) {
      alert('Invalid type. Please select one of the following: gold, silver, coin.');
      return;
    }
  
    try {
      // Construct payload including images
      const payload = {
        title,
        subTitle,
        type: type.toLowerCase(),
        bannerimg: selectedBannerImage || bannerImg,
        productbanner: selectedProductBanner || productBanner,
        image_Url: selectedImageUrl || imageUrl,
      };
  
      // Update the category using a PUT request
      await axios.put(`${server}/update-category/${category.id}`, payload);

      // Fetch the updated list of categories
      const response = await axios.get(`${server}/get-allcategories`);

      // Update the state with the updated list of categories
      setCategories(response.data.categories);

      // Optionally, call onSave with updated category details
      onSave({
        ...category,
        title,
        subTitle,
        type: type.toLowerCase(),
        bannerimg: selectedBannerImage || bannerImg,
        productbanner: selectedProductBanner || productBanner,
        image_Url: selectedImageUrl || imageUrl,
      });

      // Close the modal
      onClose();
    } catch (err) {
      alert('Failed to update category');
      console.error(err);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box className="w-[95vw] md:w-[600px] bg-white p-6 rounded-xl shadow-lg mx-auto mt-16 max-h-[90vh] overflow-y-auto">
        <Typography variant="h5" className="mb-6 font-bold text-center text-gray-800">
          Edit Category
        </Typography>

        <TextField
          label="Category Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          className="!mb-4 "
        />
        <TextField
          label="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          fullWidth
          className="!mb-4 "
        />
         

        <div className="mb-4">
          <label className="block mb-2">Select Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="gold"
                checked={type === 'gold'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Gold
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="silver"
                checked={type === 'silver'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Silver
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="coin"
                checked={type === 'coin'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Coin
            </label>
          </div>
        </div>

        {/* Display Banner Image and allow new image upload */}
        <div className="mb-4">
          <label className="block mb-2">Banner Image</label>
          {selectedBannerImage ? (
            <img src={selectedBannerImage} alt="Selected Banner" className="w-full h-auto mb-2" />
          ) : bannerImg ? (
            <img src={`${imgdburl}${bannerImg}`} alt="Current Banner" className="w-full h-auto mb-2" />
          ) : (
            <p>No Banner Image</p>
          )}
          <input type="file" onChange={(e) => handleImageChange(e, 'bannerImg')} className="hidden" id="bannerImgInput" />
          <label
            htmlFor="bannerImgInput"
            className="cursor-pointer inline-block px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
          >
            Change Banner Image
          </label>
        </div>

        {/* Display Product Banner and allow new image upload */}
        <div className="mb-4">
          <label className="block mb-2">Product Banner Image</label>
          {selectedProductBanner ? (
            <img src={selectedProductBanner} alt="Selected Product Banner" className="w-full h-auto mb-2" />
          ) : productBanner ? (
            <img src={`${imgdburl}${productBanner}`} alt="Current Product Banner" className="w-full h-auto mb-2" />
          ) : (
            <p>No Product Banner Image</p>
          )}
          <input type="file" onChange={(e) => handleImageChange(e, 'productBanner')} className="hidden" id="productBannerInput" />
          <label htmlFor="productBannerInput"
           className="cursor-pointer inline-block px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all">
            Change Product Banner Image
          </label>
        </div>

        {/* Display Additional Image and allow new image upload */}
        <div className="mb-4">
          <label className="block mb-2">Additional Image</label>
          {selectedImageUrl ? (
            <img src={selectedImageUrl} alt="Selected Image" className="w-full h-[300px]  object-contain mb-2" />
          ) : imageUrl ? (
            <img src={`${imgdburl}${imageUrl}`} alt="Current Image" className="w-full h-[300px] object-contain  mb-2" />
          ) : (
            <p>No Additional Image</p>
          )}
          <input type="file" onChange={(e) => handleImageChange(e, 'imageUrl')} className="hidden" id="imageUrlInput" />
          <label htmlFor="imageUrlInput"
           className="cursor-pointer inline-block px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all">
            Change Additional Image
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="contained" color="secondary" onClick={onClose} className="px-6 py-2 rounded-lg shadow-md !mr-2">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave} className="px-6 py-2 rounded-lg shadow-md">
            Save Changes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};






function Categoriespage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);

  // New state for editing subcategory
  const [editSubcategoryModal, setEditSubcategoryModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);

  const [selectedSubcategoryImage, setSelectedSubcategoryImage] = useState(null);

  const handleSubcategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedSubcategoryImage(reader.result); // Set the preview image as base64
      };
      reader.readAsDataURL(file); // Read the image file as base64
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/get-allcategories`);
        setCategories(response.data.categories);
        setLoading(false);
      } catch (err) {
        setError("Failed to load categories.");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const navigate = useNavigate()

  const handleSubcategoryChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  const handleAddSubcategory = async () => {
    if (!subcategoryName) {
      alert("Subcategory name is required");
      return;
    }
  
    try {
      // Ensure the selectedSubcategoryImage is not empty or null
      
  
      const subcategoryData = {
        categoryId: selectedCategoryId,
        name: subcategoryName,
        subcategoryImage: selectedSubcategoryImage, // Pass the image to the backend
      };
  
      // Send the POST request with the subcategory data, including the image
      await axios.post(`${server}/add-subcategory`, subcategoryData);
  
      // Reset form values after successfully adding the subcategory
      setSubcategoryName('');
      setSelectedCategoryId('');
      setSelectedSubcategoryImage(''); // Clear the subcategory image state
      setOpenSubcategoryModal(false); // Close the modal
  
      // Fetch the updated categories and subcategories
      const response = await axios.get(`${server}/get-allcategories`);
      setCategories(response.data.categories);
    } catch (err) {
      alert("Failed to add subcategory");
    }
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(`${server}/delete-subcategory/${subcategoryId}`);
      const response = await axios.get(`${server}/get-allcategories`);
      setCategories(response.data.categories);
      setOpenModal(false);

    } catch (err) {
      alert("Failed to delete subcategory");
    }
  };

  const handleOpenSubcategoryModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setOpenSubcategoryModal(true);
  };

  const handleCloseSubcategoryModal = () => {
    setOpenSubcategoryModal(false);
    setSubcategoryName('');
  };

  // Handle editing a subcategory
  const handleOpenEditSubcategoryModal = (subcategory) => {
    setEditingSubcategory(subcategory);
    setEditedName(subcategory.name);
    setEditedImageUrl(subcategory.image_Url?.url || '');
    setEditSubcategoryModal(true);
  };

  const handleCloseEditSubcategoryModal = () => {
    setEditSubcategoryModal(false);
    setEditingSubcategory(null);
    setEditedName('');
    setOpenModal(false);
   
    
   
  };

  const handleEditSubcategory = async () => {
    if (!editedName) {
      alert("Subcategory name cannot be empty");
      return;
    }
  
    // Prepare the image data
    const subcategoryImage = selectedSubcategoryImage ;
  
    try {
      // Construct the payload with the subcategory name and image
      const payload = {
        name: editedName,
        imageUrl: subcategoryImage, // Include the new or existing image URL
      };
  
      // Update the subcategory with the new name and image
      await axios.put(`${server}/edit-subcategory/${editingSubcategory._id}`, payload);
  
      // Close the modal
      handleCloseEditSubcategoryModal();
  
      // Fetch the updated categories list
      const response = await axios.get(`${server}/get-allcategories`);
      setCategories(response.data.categories);
    } catch (err) {
      alert("Failed to edit subcategory");
      console.error(err);
    }
  };

  
 
  const handleDelete = async (categoryId) => {
    try {
      // Show SweetAlert confirmation popup
      const confirmation = await swal({
        title: "Are you sure?",
        text: "You will not be able to undo this action!",
        icon: "warning",
        buttons: ["Cancel", "Yes, delete it!"],
        dangerMode: true,
      });
  
      // If user confirms, proceed with deletion
      if (confirmation) {
        // Make API call to delete the category
        await axios.delete(`${server}/delete-category/${categoryId}`);
  
        // Show success message using SweetAlert
        await swal("Deleted!", "Category deleted successfully!", "success");
  
        // Fetch the updated categories list after deletion
        const response = await axios.get(`${server}/get-allcategories`);
  
        // Update the state with the updated list of categories
        setCategories(response.data.categories);
  
        // Optionally close any modals (if required)
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
  
      // Show error message using SweetAlert
      await swal("Error", "Failed to delete category", "error");
    }
  };
  const columns = [
    { field: 'id', headerName: 'Category Id', minWidth: 110, flex: 0.7 },
    { field: 'title', headerName: 'Category Name', minWidth: 100, flex: 1.4 },
    // { field: 'subTitle', headerName: 'Subtitle', minWidth: 120, flex: 1.5 },
    {
      field: 'Preview',
      headerName: 'Preview',
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        console.log(params,"params data")
        return(
        <Button variant="outlined" color="primary" onClick={() => handlePreviewClick(params.row)}>
          <FaEye />
        </Button>
      )},
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row)}>
          <FiEdit />
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.id)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      field: 'AddSubcategory',
      headerName: 'Add Subcategory',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleOpenSubcategoryModal(params.row.id)}
          className='!text-[10px]'
        >
          Add Subcategory
        </Button>
      ),
    },
    {
      field: 'Subcategories',
      headerName: 'Subcategories',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleOpenModal(params.row)}
          className='!text-[10px]'
        >
          View Subcategories
        </Button>
      ),
    },
  ];

  const rows = categories.map((category) => ({
    id: category?._id,
    title: category?.title,
    // subTitle: category?.subTitle,
    subcategories: category?.subcategories,
    bannerimg: category?.bannerimg,
    productbanner: category?.productbanner,
    image_Url: category?.image_Url,
    type: category?.type, 
    createdAt: category?.createdAt,
  }));
  const [previewCategory, setPreviewCategory] = useState(null);

  const handlePreviewClick = (category) => {
    
    setPreviewCategory(category); // Set the category to be previewed
  };

  // Function to close the preview modal
  const handleClosePreview = () => {
    setPreviewCategory(null); // Close the modal
  };
  console.log(categories,"preview")


  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryModalOpen(true);
  };
  const handleCloseEditCategoryModal = () => {
    setEditCategoryModalOpen(false);
    setSelectedCategory(null);
    setEditedName('');
    setEditedImageUrl(''); // Reset edited image URL state
    setSelectedSubcategoryImage(''); // Clear selected subcategory image
    setOpenModal(false);
  };

  const handleSaveEditedCategory = (updatedCategory) => {
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  const exportToExcel = (data) => {
    // Prepare the data for export, including subcategories
    const formattedData = data.map((item) => {
      // Handle subcategories, joining their names with commas or indicating absence
      const subcategoriesList = item.subcategories && Array.isArray(item.subcategories) && item.subcategories.length > 0
        ? item.subcategories.map((sub) => sub.name).join(', ') // Only list names, no IDs
        : 'No Subcategories'; // Handle empty or missing subcategories
  
      // Create the base data object with subcategories list as a single field
      return {
        CategoryID: item._id,
        CategoryTitle: item.title,
        SubTitle: item.subTitle,
        Type: item.type,
        BannerImage: item.bannerimg?.url ? `${imgdburl}${item.bannerimg.url}` : 'N/A',
        ProductBanner: item.productbanner?.url ? `${imgdburl}${item.productbanner.url}` : 'N/A',
        ImageURL: item.image_Url?.url ? `${imgdburl}${item.image_Url.url}` : 'N/A',
        Order: item.order,
        Subcategories: subcategoriesList, // Include consolidated subcategories here
      };
    });
  
    // Create a new worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');
  
    // Export the workbook
    XLSX.writeFile(workbook, 'categories_with_subcategories.xlsx');
  };
  const location = useLocation();

  // Get the last segment of the URL (e.g., "dashboard" or "overview")
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1];

  // You can map the path segment to a more readable name
  const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter
  
  return (
    <div className="w-full ">
      <DashboardHeader />
      <div className="w-full flex">
        <div >
          <DashboardSideBar active={2} />
        </div>

        <div className="min-w-[82%] flex-grow mt-7 px-10 ">
          
         

          <div className="w-full flex items-center justify-between font-Poppins mb-5">
            <Typography variant="h5" color="textSecondary" className='font-[500]'>
              Categories
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
            </Typography>
            

            <Link to="/dashboard/categories/create">
              <Button
                variant="contained"
                color="primary"
                className="flex items-center px-5 py-2.5 rounded mb-5 mr-5"
              >
                <IoMdAdd color="white" />
                Add Category
              </Button>
            </Link>
          </div>

          {/* <Paper className="w-full flex justify-between p-4 mb-5" elevation={3}>
            <Button variant="contained" color="primary" className="flex items-center" onClick={() => exportToExcel(categories)}>
              <MdDownload className="mr-1" /> Export
            </Button>
            <Button variant="contained" color="error" className="flex items-center">
              <MdDelete className="mr-1" /> Delete
            </Button>
          </Paper> */}

          <div className="">
            <Typography variant="h6" className="font-semibold mb-8">
              All Categories
            </Typography>
            <div className="w-full mt-2">
              <div style={{ height: "auto", width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            </div>

            {/* Modal to show subcategories */}
            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Subcategories for {selectedCategory?.title}</DialogTitle>
              <DialogContent>
                <div>
                  {selectedCategory?.subcategories && selectedCategory?.subcategories.length > 0 ? (
                    selectedCategory.subcategories.map((subcategory) => (
                      <div key={subcategory._id} className="flex gap-4 items-center justify-between mb-3">
                        <Typography>{subcategory.name}</Typography>
                        <div className='flex gap-2'>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenEditSubcategoryModal(subcategory)}
                          >
                            <FiEdit />
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteSubcategory(subcategory._id)}
                            className="ml-2"
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography>No subcategories available.</Typography>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            {/* Modal to add a subcategory */}
            <Dialog open={openSubcategoryModal} onClose={handleCloseSubcategoryModal}>
              <DialogTitle>Add Subcategory</DialogTitle>
              <DialogContent>
                <TextField
                  label="Subcategory Name"
                  value={subcategoryName}
                  onChange={handleSubcategoryChange}
                  fullWidth
                  margin="normal"
                />

                 {/* Image Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSubcategoryImageChange} // Create a handler function for image input
                  style={{ display: 'block', marginTop: '16px' }}
                />
                {selectedSubcategoryImage && (
                  <img
                    src={selectedSubcategoryImage}
                    alt="Selected Subcategory"
                    style={{ marginTop: '10px', maxWidth: '100%', height: '300px' }}
                  />
                )}

              </DialogContent>
              <DialogActions>
                <Button onClick={handleAddSubcategory} color="primary">
                  Add
                </Button>
                <Button onClick={handleCloseSubcategoryModal} color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            {/* Modal to edit a subcategory */}
            <Dialog open={editSubcategoryModal} onClose={handleCloseEditSubcategoryModal}>
                <DialogTitle>Edit Subcategory</DialogTitle>
                <DialogContent>
                  {/* Input for Subcategory Name */}
                  <TextField
                    label="Subcategory Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    fullWidth
                    margin="normal"
                  />

                 

                  {/* File input for uploading new images */}
                  <div className="file-input-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSubcategoryImageChange}
                      className="file-input"
                    />
                  </div>

                  {/* Display a preview of the selected image if available */}
                  {selectedSubcategoryImage ? (
                  <img src={selectedSubcategoryImage} alt="Selected Image" className="w-full h-[300px] mb-2" />
                ) : editedImageUrl ? (
                  <img src={`${imgdburl}${editedImageUrl}`} alt="Current Image" className="w-full h-[300px] mb-2" />
                ) : (
                  <p>No Additional Image</p>
                )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleEditSubcategory} color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCloseEditSubcategoryModal} color="secondary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>


            {previewCategory && (
            <PreviewCategory category={previewCategory} onClose={handleClosePreview} />
          )}

           {/* Edit Category Modal */}
          {editCategoryModalOpen && selectedCategory && (
            <EditCategoryModal
              category={selectedCategory}
              onClose={handleCloseEditCategoryModal}
              onSave={handleSaveEditedCategory}
              setCategories={setCategories}
            />
          )}



          </div>
        </div>
      </div>
    </div>
  );
}

export default Categoriespage;
