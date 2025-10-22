// src/components/Layout/Header.jsx
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuButton from '../Menu/Menu';
import { ROUTES } from '../../routes';
import { Box, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const { user, token } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.home;
  return (
    <header className='header' style={!isHomePage ? {background:'#FFF8F0'} : {}}>
        <div className="container">
            <div className="logo">
              <NavLink to={ROUTES.home}>
                <img src={`${process.env.REACT_APP_BASE_URL}/logo.png`} alt="" style={isHomePage ? {filter:'brightness(0)'} : {}} />
              </NavLink>
            </div>
            {!isHomePage && (
              <Box className="search_bar_header">
                <SearchBar />
              </Box>
            )}
            <div className="menu-btn desktop">
              <Box className="nav" display='flex' alignItems='center' justifyContent='end' gap="25px">
                {!user && !token && (
                  <>
                    <Box className="login_btn">
                      <Link to={`${ROUTES.loginSignup}?redirectTo=${encodeURIComponent(location.pathname)}`}>
                        <Button sx={{color:'black', fontWeight:'600', textTransform:'capitalize', fontSize:'16px'}}>Login</Button>
                      </Link>
                    </Box>
                    <Box className="list_business_btn">
                      <Link to={ROUTES.forBusiness}>
                        <Button sx={{color:'black', fontWeight:'600', textTransform:'capitalize', fontSize:'16px',border:'1px solid #333333', borderRadius:'25px', padding:'5px 15px'}}>List Your Business</Button>
                      </Link>
                    </Box>
                  </>
                )}
                <MenuButton />
               </Box>
            </div>
        </div>
    </header>
  );
}

export default Header;
