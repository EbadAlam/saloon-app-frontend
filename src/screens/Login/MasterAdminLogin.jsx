import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../axios-client";
import { useAuth } from "../../contexts/AuthContext";
import RoleRedirector from "../../components/RoleRedirector/RoleRedirector";
import "./master-admin.scss";

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.03)',
    color: '#EDEBE8',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.14)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.28)' },
    '&.Mui-focused fieldset': { borderColor: '#9C8CFF' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#9C8CFF' },
  '& .MuiOutlinedInput-input': { color: '#EDEBE8' },
};

const buttonSx = {
  mt: 3,
  background: '#9C8CFF',
  borderRadius: '8px',
  padding: '12px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '14px',
  boxShadow: 'none',
  '&:hover': { background: '#8676ea', boxShadow: 'none' },
};

function MasterAdminLogin() {
  const { login, user, token } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, roles: ["master-admin"] };
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/masterLogin', payload);
      if (data.success) {
        login(data.user, data.token);
      } else {
        alert('You know how to login here 🤭');
      }
    } catch (error) {
      console.error('Error login master admin ', error);
    } finally {
      setLoading(false);
    }
  };

  if (user && token) {
    return <RoleRedirector user={user} />
  }

  return (
    <Box className="bt-madmin">
      {loading && <Loader />}
      <div className="bt-madmin__card">
        <span className="bt-madmin__tag">Restricted access</span>
        <Typography className="bt-madmin__title">Master Admin</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
            sx={fieldSx}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
            sx={fieldSx}
          />
          <Button fullWidth type="submit" variant="contained" sx={buttonSx}>
            Log in
          </Button>
        </form>
      </div>
    </Box>
  );
}

export default MasterAdminLogin;