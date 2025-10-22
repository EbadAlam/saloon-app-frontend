import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes'

function Pricing() {
  return (
    <Box className="pricing_page">
        <Box className="container">
            <Box className="intro">
                <Box className="left_side">
                    <Typography variant='h2'>The only free software for beauty and wellness professionals</Typography>
                    <Typography variant='body1'>Focus on what you do best. With BeautyTrafic Professional app you can effortlessly manage your schedule and client communication from anywhere, at any time, right from your phone.</Typography>
                    <Link to={ROUTES.ownerLogin}>
                        <Button variant='contained'>Signup</Button>
                    </Link>
                </Box>
                <Box className="img_side">
                    <img src={`${process.env.REACT_APP_BASE_URL}/pricing-page-intro-img.png`} alt="" />
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Pricing