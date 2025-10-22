import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import axiosClient from '../../axios-client';
import { ROUTES } from '../../routes';

function VerifyEmail() {
  const { id, token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  const hasCalledRef = useRef(false);

    useEffect(() => {
    if (hasCalledRef.current) return;

    hasCalledRef.current = true;

    const verify = async () => {
        try {
        const { data } = await axiosClient.get(`/verify-email/${id}/${token}`);
        setStatus('success');
        setMessage(data.message || 'Email verified successfully.');
        } catch (err) {
        setStatus('error');
        const msg = err.response?.data?.message || 'Verification failed.';
        setMessage(msg);
        }
    };
    verify();
    }, []);


  return (
    <Box sx={{ maxWidth: 600, m: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Email Verification
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {status === 'success' && (
        <>
          <Alert severity="success">{message}</Alert>
          <Link
              to={ROUTES.home}
              rel="noopener noreferrer"
            >
              <Button size="small">Home</Button>
            </Link>
        </>
      )}
      {status === 'error' && <Alert severity="error">{message}</Alert>}
    </Box>
  );
}

export default VerifyEmail;
