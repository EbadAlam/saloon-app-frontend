import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Box, Button, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function Footer() {
  return (
    <>
    <footer className='footerr'>
      <Box className="container footer-inner">
        <Box className="footer-inner-div footer-inner-div-logo">
          <Box className="logo">
            <Link to={ROUTES.home}>
                <img src={`${process.env.REACT_APP_BASE_URL}/logo-big.png`} alt="Site Logo" style={{filter:'brightness(0)'}} />
              </Link>
          </Box>
          {/* <Box className="app_btn">
            <Link to={ROUTES.getTheApp}>
              <Button>
                Get the app
                <Box className="google_icon icon">
                  <GoogleIcon />
                </Box>
                <Box className="apple_icon icon">
                  <AppleIcon />
                </Box>
                <Box className="play_store_icon icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M3 3.71831V28.2808C3.00016 28.3341 3.01606 28.3862 3.04569 28.4305C3.07532 28.4747 3.11737 28.5093 3.16656 28.5298C3.21575 28.5503 3.2699 28.5558 3.32222 28.5456C3.37453 28.5355 3.42268 28.5101 3.46062 28.4727L16.25 16.0002L3.46062 3.52644C3.42268 3.48902 3.37453 3.46364 3.32222 3.45349C3.2699 3.44333 3.21575 3.44884 3.16656 3.46933C3.11737 3.48982 3.07532 3.52438 3.04569 3.56867C3.01606 3.61297 3.00016 3.66502 3 3.71831ZM21.6125 10.8752L5.57625 2.04019L5.56625 2.03456C5.29 1.88456 5.0275 2.25831 5.25375 2.47581L17.8244 14.4958L21.6125 10.8752ZM5.255 29.5246C5.0275 29.7421 5.29 30.1158 5.5675 29.9658L5.5775 29.9602L21.6125 21.1252L17.8244 17.5033L5.255 29.5246ZM28.0863 14.4377L23.6081 11.9714L19.3975 16.0002L23.6081 20.0271L28.0863 17.5627C29.3044 16.8896 29.3044 15.1108 28.0863 14.4377Z" fill="#2E2E2E"/>
                  </svg>
                </Box>  
              </Button>
            </Link>
          </Box> */}
        </Box>
        <Box className="footer-inner-div">
          <Typography variant='h3'>About Beauty Trafic</Typography>
          <Typography variant='body1'>
            <Link>
                Careers
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link to={ROUTES.helpCenter}>
                Help & Support
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link to={ROUTES.blogs}>
                Blog
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Sitemap
            </Link>
          </Typography>
        </Box>
        <Box className="footer-inner-div">
          <Typography variant='h3'>For business</Typography>
          <Typography variant='body1'>
            <Link to={ROUTES.forBusiness}>
                For Partner
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link to={ROUTES.pricing}>
                Pricing
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Support
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link to={ROUTES.status}>
                Status
            </Link>
          </Typography>
        </Box>
        <Box className="footer-inner-div">
          <Typography variant='h3'>Legal</Typography>
          <Typography variant='body1'>
            <Link>
                Privacy Policy
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Terms of Service 
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Terms of use
            </Link>
          </Typography>
        </Box>
        <Box className="footer-inner-div">
          <Typography variant='h3'>Find us on social</Typography>
          <Typography variant='body1'>
            <Link>
                Facebook <ArrowOutwardIcon />
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Instagram <ArrowOutwardIcon />
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Linkedin <ArrowOutwardIcon />
            </Link>
          </Typography>
          <Typography variant='body1'>
            <Link>
                Twitter <ArrowOutwardIcon />
            </Link>
          </Typography>
        </Box>
        
      </Box>
    </footer>
    <Box className="footer_bottom">
      © {new Date().getFullYear()} Your Company 
    </Box>
    </>
  );
}

export default Footer;
