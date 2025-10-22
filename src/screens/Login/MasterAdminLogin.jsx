import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../axios-client";
import { useAuth } from "../../contexts/AuthContext";
import RoleRedirector from "../../components/RoleRedirector/RoleRedirector";

function MasterAdminLogin() { 
const { login,user,token } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      roles: ["master-admin"],
    };

    setLoading(true);
    try {
        const { data } = await axiosClient.post('/masterLogin',payload);
        if(data.success) {
            login(data.user,data.token);
        } else {
            alert('You know how to login here 🤭');
        }
    } catch (error) {
        console.error('Error login master admin ',error);
    } finally {
        setLoading(false);
    }
    
  };
  if(user && token){
    return <RoleRedirector user={user} />
    }
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        position:'relative'
      }}
    >
        {
            loading && <Loader />
        }
      <Typography variant="h5" mb={2} textAlign="center">
        Master Admin Login
      </Typography>
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
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default MasterAdminLogin;
