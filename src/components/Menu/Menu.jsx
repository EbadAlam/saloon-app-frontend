import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useAuth } from '../../contexts/AuthContext';
import DummyImage from '../DummyImage/DummyImage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function MenuButton() {
  const { user, token,logout} = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box position="relative" ref={menuRef}>
      <Button
        id="basic-button"
        onClick={handleToggle}
        endIcon={user && token ? <KeyboardArrowDownIcon /> : <MenuIcon />}
      >
        {user && token ? (
          user?.user_info?.profile_image ? (
            user?.user_info?.signup_platform == "manual" ? (
              <img
                src={`${process.env.REACT_APP_IMG_URL}/${user?.user_info.profile_image}`}
                alt="Profile"
                className='user_profile_img' 
              />
            ) : (
              <img
                src={user?.user_info.profile_image}
                alt=""
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
            )
          ) : (
            <DummyImage username={user?.username} />
          )
        ) : (
          'Menu'
        )}
        
      </Button>

      {open && (
        <Box
          className="custom-menu"
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: '#fff',
            boxShadow: 3,
            borderRadius: 2,
            minWidth: 300,
            zIndex: 10,
            p: 1,
            top:'50px'
          }}
        >
          {user && token ? (
            <>
            {
              user.user_info?.role == 'owner' && <CustomMenuItem label="Dashboard" to={ROUTES.adminDashboard} onClick={() => setOpen(false)} />
            }
              <CustomMenuItem label="Profile" to={ROUTES.userProfile} onClick={() => setOpen(false)} />
                {user.user_info?.role == 'customer' && (
                  <>
                    <CustomMenuItem label="Appointments" to={ROUTES.userAppointment} onClick={() => setOpen(false)} />
                    <CustomMenuItem label="Favorites" to={ROUTES.userFav} onClick={() => setOpen(false)} />
                  </>
                )}
              <CustomMenuItem label="Logout" onClick={() => { setOpen(false); logout(); }} />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ px: 2, py: 1 }} className="menu-headings">For Customers</Typography>
              <CustomMenuItem label="Log in or sign up" to={`${ROUTES.loginSignup}?redirectTo=${encodeURIComponent(location.pathname)}`} onClick={() => setOpen(false)} />
              <CustomMenuItem label="Download the app" to={ROUTES.getTheApp} onClick={() => setOpen(false)} />
              <CustomMenuItem label="Help and support" onClick={() => setOpen(false)} />
              <Divider sx={{ my: 1 }} />
              <CustomMenuItem
                label={
                  <Box display="flex" alignItems="center" justifyContent='space-between' gap={1}>
                    <Typography variant="h6" className="menu-headings">For businesses</Typography>
                    <ArrowForwardIcon />
                  </Box>
                }
                to={ROUTES.forBusiness}
                onClick={() => setOpen(false)}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

const CustomMenuItem = ({ label, to, onClick }) => {
  const content = (
    <Box
      sx={{
        px: 2,
        py: 1,
        cursor: 'pointer',
        fontSize:'18px',
        fontFamily:'Barlow'
      }}
      onClick={onClick}
    >
      {label}
    </Box>
  );

  return to ? (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  ) : content;
};

export default MenuButton;
