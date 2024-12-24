import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { imgdburl, server } from '@/server';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
} from '@mui/material';

function Allpopup() {
  const [popupData, setPopupData] = useState({
    title: '',
    bannerimg: '',
  });
  const [popups, setPopups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const fileInputRefs = {
    bannerimg: useRef(null),
  };

  const fetchPopups = async () => {
    try {
      const { data } = await axios.get(`${server}/get-allpopup`);
      setPopups(data.popup);
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const { name } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPopupData((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImage = (imageField) => {
    setPopupData((prev) => ({ ...prev, [imageField]: '' }));
    if (fileInputRefs[imageField].current) {
      fileInputRefs[imageField].current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${server}/update-popup/${editId}`, popupData);
        swal('Success', 'Popup updated successfully!', 'success');
      } else {
        await axios.post(`${server}/create-popup`, popupData);
        swal('Success', 'Popup created successfully!', 'success');
      }
      setPopupData({ title: '', bannerimg: '' });
      setIsEditing(false);
      setEditId(null);
      fetchPopups();
    } catch (error) {
      console.error('Error submitting popup:', error);
      swal('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleToggleLive = async (id, isLive) => {
    try {
      if (isLive) {
        await axios.put(`${server}/toogle-popup`);
      } else {
        await axios.put(`${server}/toogle-popup/${id}`);
      }

      setPopups((prev) =>
        prev.map((popup) =>
          popup._id === id
            ? { ...popup, isLive: !isLive }
            : { ...popup, isLive: false }
        )
      );
    } catch (error) {
      console.error('Error toggling popup live status:', error);
    }
  };

  const handleEdit = (popup) => {
    setPopupData({
      title: popup.title,
      bannerimg: popup.bannerimg,
    });
    setIsEditing(true);
    setEditId(popup._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/delete-popup/${id}`);
      setPopups((prev) => prev.filter((popup) => popup._id !== id));
      swal('Deleted!', 'Popup deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting popup:', error);
      swal('Error', 'Failed to delete popup.', 'error');
    }
  };

  const getBannerImageSrc = (bannerimg) => {
    if (!bannerimg) return '';
    if (typeof bannerimg === 'string' && bannerimg.startsWith('data:image/')) {
      return bannerimg;
    }
    if (bannerimg?.url) {
      return `${imgdburl}${bannerimg.url}`;
    }
    return bannerimg;
  };

   const location = useLocation();
  
      // Get the last segment of the URL (e.g., "dashboard" or "overview")
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const currentPage = pathSegments[pathSegments.length - 1];
    
      // You can map the path segment to a more readable name
      const breadcrumbText = currentPage.charAt(0).toUpperCase() + currentPage.slice(1); // Capitalize first letter
  
      useEffect(() => {
          window.scrollTo(0, 0)
        }, [])
  

  return (
    <div className='bg-[#f9f9f9] w-full flex justify-center !font-poppins'>
       <Box p={4} sx={{width:"90%" , backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
       <h2 className='text-[24px] font-[500]'>Manage Popups</h2>
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

     


      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
         <div className='mb-5'>
        <h3 className='text-[18px] text-[#0d0d0dd3] border-b-2 border-b-[#00000084] inline-block'>Create New Popup</h3>
      </div>
        <TextField
          fullWidth
          label="Popup Title"
          name="title"
          value={popupData.title}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <input
          type="file"
          name="bannerimg"
          ref={fileInputRefs.bannerimg}
          onChange={handleImageChange}
          accept="image/*"
          style={{ marginBottom: '16px' }}
        />
        {popupData.bannerimg && (
          <Box
            position="relative"
            mt={2}
            width={150}
            height={100}
            sx={{ border: '1px solid #ddd', borderRadius: 2 }}
          >
            <img
              src={getBannerImageSrc(popupData.bannerimg)}
              alt="Banner Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
              }}
            />
            <IconButton
              onClick={() => handleRemoveImage('bannerimg')}
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: 2,
              }}
            >
              <RxCross2 />
            </IconButton>
          </Box>
        )}
        <div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, fontWeight: 'bold', backgroundColor: '#007bff' }}
          >
          {isEditing ? 'Update Popup' : 'Create Popup'}
        </Button>
          </div>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Banner</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Live</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {popups.map((popup) => (
              <TableRow key={popup._id} hover>
                <TableCell>{popup.title}</TableCell>
                <TableCell>
                  <img
                    src={getBannerImageSrc(popup.bannerimg)}
                    alt="Popup Banner"
                    style={{
                      width: 60,
                      height: 40,
                      borderRadius: 4,
                      border: '1px solid #ddd',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={popup.isLive}
                    onChange={() => handleToggleLive(popup._id, popup.isLive)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(popup)}
                    sx={{ mr: 1 }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(popup._id)}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    </div>
   
  );
}

export default Allpopup;
