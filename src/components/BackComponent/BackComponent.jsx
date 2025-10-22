import { Box } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function BackComponent({ fallback = '/' }) {
    const navigate = useNavigate();
    const handleClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    }
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className="backButtonCp" sx={{paddingTop:'50px'}}>
        <button
            onClick={handleClick}
        >
            <ArrowBackIcon />
        </button>
        <button
            onClick={handleClick}
        >
            <CloseIcon />
        </button>
    </Box>
  )
}

export default BackComponent