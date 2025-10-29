import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes';
import CheckIcon from '@mui/icons-material/Check';

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
            <Box className="fees">
                <Typography variant='h2'>Free for all, <span>no monthly fee</span></Typography>
                <Typography variant='body1'>Unlimited usage with no subscription fees! The only free platform for beauty and wellness</Typography>
                <Box className="bullets">
                    <Box className="side">
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited appointment bookings</Typography>
                                <Typography variant='body1'>Super easy to use across mobiles, tablets and desktops</Typography>
                            </Box>
                        </Box>
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited team members</Typography>
                                <Typography variant='body1'>Invite your team to join your account and stay up-to-date with appointment notifications</Typography>
                            </Box>
                        </Box>
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited locations</Typography>
                                <Typography variant='body1'>Manage multiple venues from one main account with no limitations</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="side">
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited appointment bookings</Typography>
                                <Typography variant='body1'>Super easy to use across mobiles, tablets and desktops</Typography>
                            </Box>
                        </Box>
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited team members</Typography>
                                <Typography variant='body1'>Invite your team to join your account and stay up-to-date with appointment notifications</Typography>
                            </Box>
                        </Box>
                        <Box className="bullet">
                            <Box className="icon">
                                <CheckIcon />
                            </Box>
                            <Box className="text">
                                <Typography variant='h3'>Unlimited locations</Typography>
                                <Typography variant='body1'>Manage multiple venues from one main account with no limitations</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Pricing