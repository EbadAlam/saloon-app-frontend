import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';

function StatusPage() {
  return (
    <Box className="status_page">
        <Box className="container">
            <Box className="main_mess">
                <Box className="icon">
                    <CheckIcon />
                </Box>
                <Typography variant='h2'>
                    BeautyTrafic Services Are Operating - No Issues 
                </Typography>
            </Box>
            <Box className="detail_mess">
                <Box className="single_detail_mess">
                    <Box className="icon">
                        <CheckIcon />
                    </Box>
                    <Box className="mess">
                        <Typography variant='h2'>BeautyTrafic for Businesses</Typography>
                        <Typography variant='body1'>Calendar, booking, client management and point of sale</Typography>
                    </Box>
                    <Box className="issue">
                        <Typography variant='body1'>No Issues</Typography>
                    </Box>
                </Box>
                <Box className="single_detail_mess">
                    <Box className="icon">
                        <CheckIcon />
                    </Box>
                    <Box className="mess">
                        <Typography variant='h2'>Payments</Typography>
                        <Typography variant='body1'>Online payments, card terminal transactions and upfront payments</Typography>
                    </Box>
                    <Box className="issue">
                        <Typography variant='body1'>No Issues</Typography>
                    </Box>
                </Box>
                <Box className="single_detail_mess">
                    <Box className="icon">
                        <CheckIcon />
                    </Box>
                    <Box className="mess">
                        <Typography variant='h2'>Marketplace</Typography>
                        <Typography variant='body1'>Online booking through your website, social pages and the Beautytrafic app</Typography>
                    </Box>
                    <Box className="issue">
                        <Typography variant='body1'>No Issues</Typography>
                    </Box>
                </Box>
                <Box className="single_detail_mess">
                    <Box className="icon">
                        <CheckIcon />
                    </Box>
                    <Box className="mess">
                        <Typography variant='h2'>Messaging</Typography>
                        <Typography variant='body1'>Client notifications and blasts via text, WhatsApp and email</Typography>
                    </Box>
                    <Box className="issue">
                        <Typography variant='body1'>No Issues</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>  
  )
}

export default StatusPage