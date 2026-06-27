import { Box, Button, InputAdornment, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserSidebar from '../../components/UserSidebar/UserSidebar'
import { useAuth } from '../../contexts/AuthContext'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DummyImage from '../../components/DummyImage/DummyImage';
import Loader from '../../components/Loader/Loader';
import axiosClient from '../../axios-client';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LocationOnIcon from "@mui/icons-material/LocationOn";

function ProfilePage() {
    const { user,login,token } = useAuth();
    const fileInputRef = useRef(null);
    const [addressModal, setAddressModal] = useState(false);
    const [addressType, setAddressType] = useState('home');
    const [showForm, setShowForm] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [location, setLocation] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
    });
    useEffect(() => {
        if (userData) {
            setFormData({
            name: userData.username || "",
            phoneNumber: userData.user_info?.phone_number || "",
            dateOfBirth: userData.user_info?.dob || "",
            gender: userData.user_info?.gender || "",
            });
        }
    }, [userData]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
        const numericValue = value.replace(/\D/g, "");
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
        } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        }
    };
    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get(`/getUserDetail/${user.id}`);
            setUserData(data.user);
        } catch (error) {
            console.error('Error fetching user details ', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
      fetchUserDetails();
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                username: formData.name,
                phoneNumber: formData.phoneNumber,
                dob: formData.dateOfBirth,
                gender: formData.gender,
            }
            const { data } = await axiosClient.post(`/updateUserInfo/${user.id}`,payload);
            login(data.user, token);
            setUserData(data.user);
            setShowForm(false);
            setFormData({
                name: data.user.username,
                phoneNumber: data.user.user_info?.phone_number,
                dateOfBirth: data.user.user_info?.dob,
                gender: data.user.user_info?.gender,
            });
        } catch (err) { 
            console.error('error updating profile',err);
        } finally {
            setLoading(false);
        }
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#FFF8F0',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius:'10px'
    };
    const handleClose = () => setAddressModal(false);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setImgLoading(true);
            try {
                const formData = new FormData();
                formData.append('profile_image', file);

                const { data } = await axiosClient.post(
                    `/updateUserProfileImg/${user.id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                let tempUser = JSON.parse(localStorage.getItem("AUTH_USER"));

                tempUser = {
                    ...tempUser,
                    user_info: {
                        ...tempUser.user_info,
                        profile_image: data.profile_image
                    }
                };

                localStorage.setItem("AUTH_USER", JSON.stringify(tempUser));
                login(tempUser,token)

            } catch (err) {
                console.error('Error updating profile img', err);
            } finally {
                setImgLoading(false);
            }
        }
    };
    const handleSubmitAddressForm = async (e) => {
        e.preventDefault();
        setAddressLoading(true);
        try {
            const payload = {
                address: location,
                address_type: addressType,
            };
            await axiosClient.post(`/addUserAddress/${user.id}`,payload);
            setLocation('');
            fetchUserDetails();
            setAddressModal(false);
        } catch (error) {
            console.error('Error adding address', error)
        } finally {
            setAddressLoading(false);
        }
    };

  return (
    <Box className="profile">
        <Modal
            open={addressModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmitAddressForm}>
                {addressLoading && <Loader /> }
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add <span style={{textTransform:'capitalize'}}>{addressType}</span>
                </Typography>
                <Typography variant="h6" sx={{fontSize:'16px'}}>
                    Address*
                </Typography>
                <TextField
                    fullWidth
                    required
                    margin="normal"
                    label="Location"
                    placeholder='Add your location'
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2,background:'#333333',padding:'15px',borderRadius:'10px' }}
                    fullWidth
                >
                    Save
                </Button>
            </Box>
        </Modal>
        <Box className="container">
            <Box display='flex'>
                <UserSidebar />
                <Box className="content">
                    {
                        loading && <Loader />
                    }
                    <Typography variant='h2' className='heading'>Profile</Typography>
                    {userData && (
                        <Box className="divs">
                            <Box className="update_profile_div">
                               <Box 
                                    className="edit_btn"
                                >
                                    <Typography variant='body1'
                                        onClick={() => setShowForm(prev => !prev)} 
                                        sx={{ cursor: "pointer",fontSize:'18px',color:'#D8A7B1',fontFamily:'Barlow' }}
                                    >{showForm ? 'Cancel' : 'Edit'}</Typography>
                                </Box>
                                <Box className="profile_img_div">
                                    <Box className="profile_img">
                                        {
                                            user?.user_info?.profile_image ? (
                                                user?.user_info?.signup_platform == 'manual' ? (
                                                    <img src={`${process.env.REACT_APP_IMG_URL}/${user?.user_info?.profile_image}`} alt="" />
                                                ) : (
                                                    <img src={user?.user_info?.profile_image} alt="" />
                                                )
                                            ) : (
                                                <DummyImage username={user.username} width='100px' height='100px' />
                                            )
                                        }
                                        {
                                            imgLoading && <Loader />
                                        }
                                    </Box>
                                    <Box
                                        className="profile_img_edit"
                                        onClick={handleClick}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <CreateOutlinedIcon />
                                    </Box>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    
                                </Box>
                                <Box className="name">
                                    <Typography variant='h2' className='heading'>{userData.username}</Typography>
                                </Box>
                                <hr />
                                {showForm ? (
                                     <Box className="editForm">
                                        <form onSubmit={handleSubmit}>
                                            <Stack spacing={2}>
                                                <TextField
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Phone Number"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                    onKeyPress={handleKeyPress}
                                                    fullWidth
                                                    type="number"
                                                    inputProps={{ maxLength: 15 }}
                                                />
                                                <TextField
                                                    label="Date of Birth"
                                                    name="dateOfBirth"
                                                    type="date"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    inputProps={{
                                                        max: new Date().toISOString().split("T")[0],
                                                    }}
                                                    />
                                                <TextField
                                                    select
                                                    label="Gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    fullWidth
                                                >
                                                    <MenuItem value="">Select Gender</MenuItem>
                                                    <MenuItem value="male">Male</MenuItem>
                                                    <MenuItem value="female">Female</MenuItem>
                                                    <MenuItem value="other">Other</MenuItem>
                                                </TextField>

                                                <Button variant="contained" type="submit" sx={{backgrouond:'#D8A7B1'}}>
                                                    Update
                                                </Button>
                                            </Stack>
                                        </form>
                                    </Box>
                                ) : (
                                    <Box className="infoDiv">
                                        <Box className="info">
                                            <Box className="label">
                                                <Typography variant='h3' className='heading'>Name</Typography>
                                            </Box>
                                            <Box className="value">
                                                <Typography variant='body1' sx={{textTransform:'capitalize'}} className='heading'>{userData.username}</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="info">
                                            <Box className="label">
                                                <Typography variant='h3' className='heading'>Mobile Number</Typography>
                                            </Box>
                                            <Box className="value">
                                                <Typography variant='body1' className='heading'>{userData.user_info?.phone_number ?? '-'}</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="info">
                                            <Box className="label">
                                                <Typography variant='h3' className='heading'>Email</Typography>
                                            </Box>
                                            <Box className="value">
                                                <Typography variant='body1' className='heading'>{userData.email}</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="info">
                                            <Box className="label">
                                                <Typography variant='h3' className='heading'>Date of birth</Typography>
                                            </Box>
                                            <Box className="value">
                                                <Typography variant='body1' className='heading'>{userData.user_info?.dob ?? '-'}</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="info">
                                            <Box className="label">
                                                <Typography variant='h3' className='heading'>Gender</Typography>
                                            </Box>
                                            <Box className="value">
                                                <Typography variant='body1' sx={{textTransform:'capitalize'}} className='heading'>{userData.user_info?.gender ?? '-'}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                                
                            </Box>
                            <Box className="addressBoxMain">
                                <Typography variant='h2' className='heading'>My Address</Typography>
                                <Box className="addressDivs">
                                    {userData?.user_info?.home_address ? (
                                        <Box className="address">
                                            <Box className="icon">
                                                <HomeOutlinedIcon />
                                            </Box>
                                            <Box className="address_info">
                                                <Box className="label">
                                                    <Typography variant='h3' className='heading'>Home</Typography>
                                                </Box>
                                                <Box className="value">
                                                    <Typography variant='body1' className='heading'>{userData?.user_info?.home_address}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box className="address" onClick={() => {setAddressModal(true);setAddressType('home');setLocation('');}}>
                                            <Box className="icon">
                                                <HomeOutlinedIcon />
                                            </Box>
                                            <Box className="address_info">
                                                <Box className="label">
                                                    <Typography variant='h3' className='heading'>Home</Typography>
                                                </Box>
                                                <Box className="value">
                                                    <Typography variant='body1' className='heading'>Add a home adddress</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                    {userData?.user_info?.work_address ? (
                                        <Box className="address">
                                            <Box className="icon">
                                                <WorkOutlineOutlinedIcon />
                                            </Box>
                                            <Box className="address_info">
                                                <Box className="label">
                                                    <Typography variant='h3' className='heading'>Work</Typography>
                                                </Box>
                                                <Box className="value">
                                                    <Typography variant='body1' className='heading'>{userData?.user_info?.work_address}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box className="address" onClick={() => {setAddressModal(true);setAddressType('work');setLocation('');}}>
                                            <Box className="icon">
                                                <WorkOutlineOutlinedIcon />
                                            </Box>
                                            <Box className="address_info">
                                                <Box className="label">
                                                    <Typography variant='h3' className='heading'>Work</Typography>
                                                </Box>
                                                <Box className="value">
                                                    <Typography variant='body1' className='heading'>Add a work adddress</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default ProfilePage