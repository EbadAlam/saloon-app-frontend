import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../../axios-client';
import { ROUTES } from '../../routes';
import { useSnackbar } from '../../contexts/SnackBarContext';
import { Box, Button, TextField, Typography } from '@mui/material';

function PasswordReset() {
  const { email, reset_token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [alert,setAlert] = useState({
    message: '',
    type:''
  });
  const [alertType,setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        message:'Passwords do not match',
        type:'error'
      });
      return;
    }
    setAlert({
        message: '',
        type:''
    });
    setLoading(true);

    try {
        const { data } = await axiosClient.post('/resetPassword', {
            email,
            token: reset_token,
            password,
            password_confirmation: confirmPassword,
        });
        setAlert({
            message: data.message || "Password reset successful!",
            type:'success'
        });  
        setTimeout(() => {
            navigate(ROUTES.loginSignup);
        }, 2000);

    } catch (err) {
      setAlert({
            message: err.response?.data?.message || "Something went wrong, please try again.",
            type:'error'
        });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    showSnackbar(alert.message,alert.type);
  },[alert])
  return (
    <div style={{ maxWidth: "600px", margin: "0px auto", padding: "40px" }}>
      <Box display='flex' justifyContent='center' flexDirection='column' gap='10px' alignItems='center'>
        <Box display='flex' flexDirection='column' gap='15px' textAlign='center'>
            <Typography variant='h4' sx={{fontSize:'32px'}}><b>Password Reset</b></Typography>
            <Typography variant='h5' sx={{fontSize:'18px'}}>Resetting password for <b>{email}</b></Typography>
        </Box>
        <Box display='flex' justifyContent='center' gap='10px' alignItems='center' sx={{width:'100%'}}>
            <form style={{width:'100%'}} onSubmit={handleSubmit}>
                <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2,background:'#333333',borderRadius:'10px', padding:'15px' }}
                    disabled={loading}
                    >
                    Reset Password
                </Button>
            </form>
        </Box>
    </Box>
    </div>
  );
}

export default PasswordReset;
