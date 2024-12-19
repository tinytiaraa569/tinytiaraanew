import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { imgdburl, server } from '@/server';
import { useNavigate } from 'react-router-dom';
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

  // Fetch all popups
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

      // Refetch popups to update the list
      fetchPopups();
    } catch (error) {
      console.error('Error submitting popup:', error);
      swal('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleToggleLive = async (id, isLive) => {
    try {
      // If the popup is currently live and selected again, turn it off (set all to false)
      if (isLive) {
        await axios.put(`${server}/toogle-popup`);  // Call API to set all popups to inactive
      } else {
        // If the popup is not live, set it to live and deactivate others
        await axios.put(`${server}/toogle-popup/${id}`);
      }
  
      // Update local state: Set only the selected popup to live and others to false
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

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Manage Popups
      </Typography>

      {/* Popup Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'white',
        }}
      >
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
        />
        {popupData.bannerimg && (
          <Box position="relative" mt={2} width={150} height={100}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          {isEditing ? 'Update Popup' : 'Create Popup'}
        </Button>
      </Box>

      {/* Popups List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Banner</TableCell>
              <TableCell>Live</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {popups.map((popup) => (
              <TableRow key={popup._id}>
                <TableCell>{popup.title}</TableCell>
                <TableCell>
                  <img
                    src={getBannerImageSrc(popup.bannerimg)}
                    alt="Popup Banner"
                    style={{ width: 60, height: 40, borderRadius: 4 }}
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
  );
}

export default Allpopup;
