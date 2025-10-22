import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { ROUTES } from '../../../routes';
import LocationPicker from '../../LocationPicker/LocationPicker';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function EditStore() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [storeDetails, setStoreDetails] = useState({
    title: '',
    about: '',
    address: '',
    gallery: [],
    thumbnail: '',
    lat: '',
    lng: '',
  });
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  useEffect(() => {
    fetchStoreDetails();
  }, []);

  const fetchStoreDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getStoreDetails/${storeId}`);
      setStoreDetails({
        title: data.storeDetails.title || '',
        about: data.storeDetails.about || '',
        address: data.storeDetails.address || '',
        gallery: data.storeDetails.gallery || [],
        thumbnail: data.storeDetails.thumbnail || '',
        lat: data.storeDetails.lat || '',
        lng: data.storeDetails.lng || '',
      });
    } catch (error) {
      console.error('Failed to fetch store details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStoreDetails({ ...storeDetails, [e.target.name]: e.target.value });
  };

  const handleGalleryChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    const imageToRemove = storeDetails.gallery[indexToRemove];
    if (imageToRemove?.id) {
      setImagesToDelete((prev) => [...prev, imageToRemove.id]);
    }

    const updatedGallery = storeDetails.gallery.filter((_, index) => index !== indexToRemove);
      setStoreDetails({ ...storeDetails, gallery: updatedGallery });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);
    const dataToSend = new FormData();

    dataToSend.append('title', storeDetails.title);
    dataToSend.append('about', storeDetails.about);
    dataToSend.append('address', storeDetails.address);
    dataToSend.append('lat', storeDetails.lat);
    dataToSend.append('lng', storeDetails.lng);
    
    galleryFiles.forEach((file, index) => {
      if (file instanceof File) {
        dataToSend.append(`gallery[${index}]`, file);
      }
    });
    if (thumbnailFile) {
        dataToSend.append('thumbnail', thumbnailFile);
    }
    imagesToDelete.forEach((id) => {
      dataToSend.append('deletedImages[]', id);
    });

    try {
      await axiosClient.post(`/updateStoreDetails/${storeId}`, dataToSend);
      navigate(ROUTES.adminStores, {
        state: { success: 'Store updated successfully!' },
      });
    } catch (err) {
      console.error('Failed to update store:', err);
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat();
        setErrorMessages(messages);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (errorMessages.length > 0) {
      errorMessages.forEach((err) => {
        showSnackbar(err, "error");
      });
    }
  }, [errorMessages]);
  return (
    <AdminLayout>
      <div className="container-fluid dashboard-content">
        {loading ? (
          <Loader />
        ) : (
          <>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}
            >
              <Typography variant="h6" mb={2}>
                Edit Store
              </Typography>

              <TextField
                fullWidth
                label="Store Name"
                name="title"
                value={storeDetails.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="About"
                name="about"
                value={storeDetails.about}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              {/* <TextField
                fullWidth
                label="Address"
                name="address"
                value={storeDetails.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
                disabled
              /> */}
              {typeof window !== "undefined" ? (
              <LocationPicker
                initialPosition={{ lat: storeDetails.lat, lng: storeDetails.lng }}
                onChange={(pos) => {
                  setStoreDetails(prev => ({
                    ...prev,
                    lat: pos.lat,
                    lng: pos.lng,
                    address: pos.address,
                  }));
                }}
              />
              ) : (
        <div>Loading...</div>
      )}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Thumbnail Image
                    </Typography>

                    {storeDetails.thumbnail && (
                    <Box sx={{ mb: 2 }}>
                        <img
                        src={`${process.env.REACT_APP_IMG_URL}${storeDetails.thumbnail}`}
                        alt="Thumbnail"
                        style={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #ddd'
                        }}
                        />
                    </Box>
                    )}

                    <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    Upload New Thumbnail
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => setThumbnailFile(e.target.files[0])}
                    />
                    </Button>
              {/* Existing Gallery */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Existing Gallery Images
              </Typography>
              {storeDetails.gallery?.length > 0 ? (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                  {storeDetails.gallery.map((img, idx) => (
                    <Box
                      key={img.id || idx}
                      sx={{ position: 'relative', width: 100, height: 100 }}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}${img.image}`}
                        alt={`Gallery ${idx}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 4,
                          border: '1px solid #ddd'
                        }}
                      />
                      <Box
                        onClick={() => handleRemoveGalleryImage(idx)}
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          background: '#f44336',
                          color: '#fff',
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          fontSize: 14,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        ×
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  No gallery images available.
                </Typography>
              )}

              {/* Upload New Images */}
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button variant="outlined" component="label">
                  Upload New Gallery Images
                  <input type="file" multiple hidden onChange={handleGalleryChange} />
                </Button>
              </Box>

              <Button type="submit" variant="contained">
                Update Store
              </Button>
            </Box>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default EditStore;
