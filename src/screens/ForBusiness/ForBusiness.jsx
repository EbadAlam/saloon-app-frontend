import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function ForBusiness() {
  return (
    <Box className="mainDiv for_business">
        <Box className="first_section">
            <Box className="container" sx={{position:'relative',zIndex:1}}>
                <Typography variant='h1'>The #01 Software for salons and spas</Typography>
                <Typography variant='h3'>Simple flexible and powerful booking software for your business.</Typography>
                <Box className="buttons mt-5">
                    <Link to={ROUTES.ownerLogin}>
                        <Button className="get_started">
                            Get started now
                        </Button>
                    </Link>
                    <Button className="watch_overview">
                        <PlayArrowOutlinedIcon />
                        Watch an overview
                    </Button>
                </Box>
                <Box className="img mt-5">
                    <img src={`${process.env.REACT_APP_BASE_URL}/for_business_page_img.png`} alt="" />
                </Box>
                <Box className="ratings">
                    <Box className="single_rat">
                        <Box className="icon_title">
                            <Box className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                                    <path d="M6.86487 14.1274L8.44923 14.5583C9.45951 14.8341 9.96332 14.9719 10.316 15.3246C10.6687 15.6773 10.8065 16.1811 11.081 17.1901L11.5132 18.7757C12.7449 23.2902 13.3601 25.5467 14.7124 25.621C16.0648 25.6926 16.9186 23.5129 18.6236 19.1563L23.3038 7.19465C24.6429 3.77403 25.3124 2.06239 24.4453 1.1953C23.5782 0.328207 21.8666 0.997748 18.446 2.33683L6.48436 7.01699C2.1277 8.72201 -0.0519598 9.57584 0.0196348 10.9282C0.0912293 12.2805 2.34911 12.8944 6.86487 14.1274Z" fill="#333333"/>
                                </svg>
                            </Box>
                            <Box className="title">
                                <Typography variant='h4'>Captera</Typography>
                            </Box>
                        </Box>
                        <Box className="rate">
                            <StarIcon />
                            4.0
                        </Box>
                    </Box>
                    <Box className="single_rat">
                        <Box className="icon_title">
                            <Box className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                    <path d="M30.4219 1.875H2.85938C1.578 1.875 0.609375 2.84362 0.609375 4.125V27.75C0.609375 29.0314 1.57794 30.125 2.85938 30.125H30.2969C31.5783 30.125 32.6094 29.0314 32.6094 27.75V4.125C32.6094 2.84356 31.7033 1.875 30.4219 1.875ZM18.474 15.2766L21.5479 17.9963V9.71506H24.0479V17.9964L27.1217 15.2766L28.7784 17.1489L22.7979 22.4405L16.8174 17.1489L18.474 15.2766ZM6.68344 17.5704L4.91569 15.8026L9.34281 11.3756L4.91569 6.94838L6.68344 5.18062L12.8784 11.3756L6.68344 17.5704ZM29.2969 27.0625H16.3594V24.5625H29.2969V27.0625Z" fill="#333333"/>
                                </svg>
                            </Box>
                            <Box className="title">
                                <Typography variant='h4'>Get App</Typography>
                            </Box>
                        </Box>
                        <Box className="rate">
                            <StarIcon />
                            5.0
                        </Box>
                    </Box>
                    <Box className="single_rat">
                        <Box className="icon_title">
                            <Box className="icon">
                                <StarIcon fontSize='large' />
                            </Box>
                            <Box className="title">
                                <Typography variant='h4'>Trustpilot</Typography>
                            </Box>
                        </Box>
                        <Box className="rate">
                            <StarIcon />
                            3.5
                        </Box>
                    </Box>
                    <Box className="single_rat">
                        <Box className="icon_title">
                            <Box className="icon">
                                <ChatBubbleIcon />
                            </Box>
                            <Box className="title">
                                <Typography variant='h4'>Software</Typography>
                            </Box>
                        </Box>
                        <Box className="rate">
                            <StarIcon />
                            5.0
                        </Box>
                    </Box>
                </Box>
                <Box className="count_info mt-5">
                    <Box className="partners">
                        <Typography variant="h2">150,000+</Typography>
                        <Typography variant="h3">Partner businesses</Typography>
                    </Box>
                    <Box className="partners">
                        <Typography variant="h2">110+ countries</Typography>
                        <Typography variant="h3">using BeautyTrafic</Typography>
                    </Box>
                    <Box className="partners">
                        <Typography variant="h2">350,000+</Typography>
                        <Typography variant="h3">Stylists & professionals</Typography>
                    </Box>
                    <Box className="partners">
                        <Typography variant="h2">350,000+</Typography>
                        <Typography variant="h3">Stylists & professionals</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="bg_img">
                <img src={`${process.env.REACT_APP_BASE_URL}/for_business_page_img_bg.png`} alt="" />
            </Box>
        </Box>
    </Box>
  )
}

export default ForBusiness