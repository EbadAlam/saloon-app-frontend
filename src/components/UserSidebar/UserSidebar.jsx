import { Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
function UserSidebar() {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    if(!user && !token){
        navigate(ROUTES.loginSignup);
    }
    const location = useLocation();
  return (
    <Box className="sidebar">
        <Typography variant='h2'>{user?.username}</Typography>
        <Box className="items">
            <Link to={ROUTES.userProfile}>
                <Box className={`item ${location.pathname === ROUTES.userProfile ? "active" : ""}`}>
                    <Box className="icon">
                        <AccountCircleOutlinedIcon />
                    </Box>
                    <Box className="title">Profile</Box>
                </Box>
            </Link>
            {user.user_info?.role == 'customer' && (
                <>
                    <Link to={ROUTES.userAppointment}>
                        <Box className={`item ${location.pathname === ROUTES.userAppointment ? "active" : ""}`}>
                            <Box className="icon">
                                <CalendarTodayOutlinedIcon />
                            </Box>
                            <Box className="title">Appointments</Box>
                        </Box>
                    </Link>
                    <Link to={ROUTES.userFav}>
                        <Box className={`item ${location.pathname === ROUTES.userFav ? "active" : ""}`}>
                            <Box className="icon">
                                <FavoriteBorderOutlinedIcon />
                            </Box>
                            <Box className="title">Favorites</Box>
                        </Box>
                    </Link>
                </>
            )}
            <Box className={`item ${location.pathname === ROUTES.login ? "active" : ""}`}>
                <Box className="icon">
                    <LogoutOutlinedIcon />
                </Box>
                <Box className="title">Logout</Box>
            </Box>
        </Box>
    </Box>
  )
}

export default UserSidebar