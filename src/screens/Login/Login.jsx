import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../axios-client';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/Loader/Loader';
import RoleRedirector from '../../components/RoleRedirector/RoleRedirector';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [email, setEmail] = useState('alexanderhigh69@gmail.com');
  const [password, setPassword] = useState('hello123');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const { login,token,user } = useAuth();
if(user && token){
  return <RoleRedirector user={user} />
}
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setShowAlert(false);
  const payload = {
    email: email,
    password: password,
  };

  try {
    const { data } = await axiosClient.post('/login', payload);
    if(data.success === true){
      login(data.user, data.token);
      setAlertType('success');
      setAlertMessage(data.message || "Login Succesfull!");
      setShowAlert(true);
    } else {
      setAlertMessage(data.message || "Something went wrong!");
      setShowAlert(true);
    }
    setLoading(false);
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    setLoading(false);
  }
};

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: 350, position:'relative' }}>
          {
            loading && (
                <Loader />
            )
        }
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {/* <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            /> */}
            <FormControl sx={{width:'100%',mt:3}} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Login
            </Button>
          </form>
          <Collapse in={showAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity={alertType}
          >
            {alertMessage}
          </Alert>
        </Collapse>
        </Paper>
      </Box>
    </>
  );
}

export default Login;
