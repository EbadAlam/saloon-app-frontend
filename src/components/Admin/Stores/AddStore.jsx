import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem,
} from "@mui/material";
import AdminLayout from "../Layout/Layout";
import axiosClient from "../../../axios-client";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import LocationPicker from "../../LocationPicker/LocationPicker";
import { ROUTES } from "../../../routes";
import { useSnackbar } from "../../../contexts/SnackBarContext";

function AddStore() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    address: "",
    about: "",
    type:'',
    lat:"",
    lng:"",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [location, setLocation] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLocationChange = (pos) => {
    setLocation({ lat: pos.lat, lng: pos.lng });
    setForm((prev) => ({
      ...prev,
      address: pos.address || '',
    }));
  };
  const handleThumbnailChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("address", form.address);
    formData.append("about", form.about);
    formData.append("user_id", user.id);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);
    formData.append("type", form.type);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const { data } = await axiosClient.post("/addStores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(ROUTES.adminStores, {
        state: { success: data.message || "Store created successfully." },
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create store.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  
    useEffect(() => {
        if (success) {
          showSnackbar(success, "success")
        }
      }, [success]);
    useEffect(() => {
        if (error) {
          showSnackbar(error, "error")
        }
      }, [error]);
  return (
    <AdminLayout>
      <div className="container-fluid dashboard-content">
        <Typography variant="h4" gutterBottom>
          Add Store
        </Typography>

        <Paper sx={{ p: 3, maxWidth: 600 }}>

          <Box component="form" onSubmit={handleSubmit}>
            {loading && <Loader />}

            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            >
              <MenuItem value="">Select a type</MenuItem>
              <MenuItem value="Hair Saloon">Hair Saloon</MenuItem>
              <MenuItem value="Massage">Massage</MenuItem>
              <MenuItem value="Face Facial">Face Facial</MenuItem>
              <MenuItem value="Barber">Barber</MenuItem>
              <MenuItem value="Beauty Saloon">Beauty Saloon</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="About"
              name="about"
              value={form.about}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              disabled={loading}
            />
            {/* <TextField
              fullWidth
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              margin="normal"
              required
            />
            <LocationPicker onChange={handleLocationChange} /> */}
            {/* <TextField
              fullWidth
              label="Address"
              name="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              margin="normal"
              required
            /> */}
            {typeof window !== "undefined" ? (
              <LocationPicker
                // onChange={(val) => setForm({ ...form, ...val })}
                initialPosition={{ lat: form.lat ?? 24.8607, lng: form.lng ?? 67.0011 }}
                onChange={(pos) => {
                  setForm(prev => ({
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
            <Box sx={{ mt: 2, width: "100%" }}>
              <Button variant="outlined" component="label">
                Upload Thumbnail
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleThumbnailChange}
                />
              </Button>
            </Box>
            {thumbnail && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {thumbnail.name}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              Save Store
            </Button>
          </Box>
        </Paper>
      </div>
    </AdminLayout>
  );
}

export default AddStore;
