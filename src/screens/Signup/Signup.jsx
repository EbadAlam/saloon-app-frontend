import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axiosClient from '../../axios-client';
import Loader from '../../components/Loader/Loader';
import { useSnackbar } from '../../contexts/SnackBarContext';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer',  // default role
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(null);

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (profileImage) {
      payload.append('profile_image', profileImage);
    }

    try {
      const { data } = await axiosClient.post('/signup', payload);

      if (data.success === false) {
        setErrors([data.message || 'Signup failed.']);
        return;
      }

      setSuccess(data.message || 'Signup successful! Check your email.');
      setForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
      });
      setProfileImage(null);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorList = Object.values(err.response.data.errors).flat();
        setErrors(errorList);
      } else {
        setErrors([err.response?.data?.message || 'Signup failed.']);
      }
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (success) {
    showSnackbar(success, "success")
  }
}, [success]);
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 5,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1,
        position: 'relative',
      }}
    >
      {loading && <Loader />}
      <Typography variant="h5" mb={2}>Signup</Typography>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </Alert>
      )}


      <form onSubmit={handleSignup} encType="multipart/form-data">
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Login As</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={form.role}
            label="Login As"
            onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
            disabled={loading}
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
          </Select>
        </FormControl>


        

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload Profile Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {profileImage && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {profileImage.name}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Signup
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
