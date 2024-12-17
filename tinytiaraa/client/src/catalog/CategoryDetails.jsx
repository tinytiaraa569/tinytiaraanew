import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, CircularProgress, Typography, Box } from '@mui/material';
import { server } from '@/server';

const CategoryDetails = () => {
  const { categoryId } = useParams();  // Get categoryId from URL
  const [category, setCategory] = useState(null);  // State to store category data
  const [loading, setLoading] = useState(true);   // State to handle loading state
  const [open, setOpen] = useState(true);         // State to manage modal visibility
  const navigate = useNavigate();  // Hook to navigate back to "Create Category"

  useEffect(() => {
    // Fetch category details by categoryId
    axios
      .get(`${server}/get-category/${categoryId}`)
      .then((response) => {
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
        setLoading(false);
      });
  }, [categoryId]);

  const handleClose = () => {
    setOpen(false);
    navigate('/create-category');  // Navigate back to create category page
  };  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="category-details-modal">
      <Box 
        className="modal-content" 
        sx={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4,
          width: '80%', 
          maxWidth: '800px',
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          {category.title}
        </Typography>
        
        <Box display="flex" justifyContent="center" mb={3}>
          <img 
            src={category.image_Url.url} 
            alt="Category Image" 
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} 
          />
        </Box>

        <Typography variant="subtitle1" align="center" sx={{ fontStyle: 'italic', mb: 2 }}>
          {category.subTitle}
        </Typography>

        <Box mb={2}>
          <Typography variant="body1">
            <strong>Category ID:</strong> {category._id}
          </Typography>
          <Typography variant="body1">
            <strong>Created At:</strong> {new Date(category.createdAt).toLocaleString()}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Subcategories:</Typography>
          <ul>
            {category.subcategories.map((subcategory) => (
              <li key={subcategory._id}>{subcategory.name}</li>
            ))}
          </ul>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Banner Image:</Typography>
          <img 
            src={category.bannerimg.url} 
            alt="Banner" 
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }} 
          />
        </Box>

        <Box mb={3}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Product Banner:</Typography>
          <img 
            src={category.productbanner.url} 
            alt="Product Banner" 
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }} 
          />
        </Box>

        <Button 
          onClick={handleClose} 
          variant="contained" 
          color="primary" 
          sx={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          Go Back to Create Category
        </Button>
      </Box>
    </Modal>
  );
};

export default CategoryDetails;
