import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, TextField, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../../routes';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../../axios-client';
import Loader from '../../components/Loader/Loader';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext';

function ProfessionalLoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleClick = () => {
        if(showForm != 'basic'){
            setShowForm('basic');
        } else {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate(ROUTES.home);
            }
        }
    }
    const [email,setEmail] = useState('alexanderhigh69@gmail.com');
    const [password,setPassword] = useState('hello123');
    const [verificationCode,setVerificationCode] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const [username,setUsername] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [loading,setLoading] = useState(false);
    const [showForm,setShowForm] = useState('basic');
    const [profileImage, setProfileImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [alertType, setAlertType] = useState('error');
    const [errors, setErrors] = useState([]);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleEmailCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            email: email,
            roles: ['owner', 'worker']
        }
        try {
            const { data } = await axiosClient.post('/check-user-email',payload);
            if(data.userExists) {
                setShowForm('password');
            } else {
                setShowForm('completeForm');
            }
        } catch (err) {
            console.error('user check failed', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }
    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            email: email,
            password: password,
        };
        try {
            const {data} = await axiosClient.post('/login', payload);
            if(data.success === true){
                login(data.user, data.token);
                setAlertType('success');
                setAlertMessage(data.message || "Login Succesfull!");
                setShowAlert(true);
                if(data.user.user_info?.role == 'owner') {
                    navigate(ROUTES.adminDashboard);
                } else {
                    navigate(ROUTES.workerDashboard);
                }
            } else {
                setAlertMessage(data.message || "Something went wrong!");
                setShowAlert(true);
            }
        } catch (err){
            console.error('error login: ',  err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        setAlertMessage(null);
        setAlertType(null);

        const payload = new FormData();
        payload.append('username', username);
        payload.append('email', email);
        payload.append('phone_number', phoneNumber);
        payload.append('password', password);
        payload.append('password_confirmation', passwordConfirm);
        payload.append('role', 'owner');
        

        if (profileImage) {
            payload.append('profile_image', profileImage);
        }

        try {
        const { data } = await axiosClient.post('/signup', payload);

        if (data.success === false) {
            setErrors([data.message || 'Signup failed.']);
            return;
        }

        setAlertMessage(data.message || 'Signup successful! Check your email.');
        setAlertType('success');
        setShowAlert(true);
        setProfileImage(null);
        setUsername('');
        setPhoneNumber('');
        setEmail(email);
        setPassword('');
        setPasswordConfirm('');
        setShowForm('verifyEmail');
        } catch (err) {
        if (err.response?.data?.errors) {
            const errorList = Object.values(err.response.data.errors).flat();
            setErrors(errorList);
        } else {
            setErrors([err.response?.data?.message || 'Signup failed.']);
        }
        } finally {
        setLoading(false);
        }
    };
    const handleVerification = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                email,
                verificationCode,
            }
            const { data } = await axiosClient.post('/verifyEmailByCode',payload);
            if(data.success){
                navigate(ROUTES.setupStore, { state: { userId: data.user.id } });
            }
        } catch (error) {
            console.error('Error sending email: ',error);
        } finally {
            setLoading(false);
        }
    }
    const forgotPasswordHandle = async () => {
        setLoading(true);
        try {
            const payload = {
                email,
            };
            const { data } = await axiosClient.post('/forgotPassword',payload);
            if(data.success){
                setAlertType('success');
                setAlertMessage(data.message || 'Email sent');
                setShowAlert(true);
            } else {
                setAlertType('error');
                setAlertMessage(data.message || 'Something went wrong, try again later');
                setShowAlert(true);
            } 
        } catch (error) {
            console.error('Error sending email: ',error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <Box display='flex' sx={{background:'#FFF8F0'}}>
        <Box className="login-signup-div" sx={{width:'55%', padding:'40px'}}>
            <div className="back-div">
                <button onClick={handleClick} >
                    <ArrowBackIcon />
                </button>
            </div>
            {showAlert && (
                <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setShowAlert(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={alertType}
                    >
                    {alertMessage}
                </Alert>
            )}
            {errors.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </Alert>
            )}
            <Box className="buttons" display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap='50px' sx={{marginTop:'50px', position:'relative'}}>
                {loading && (
                    <Loader />
                )}
                    {showForm === 'basic' ? (
                    <>
                        <Box display='flex' flexDirection='column' textAlign='center'>
                            <Typography variant='h4' sx={{fontSize:'32px'}}><b>Beauty Trafic for Professionals</b></Typography>
                            <Typography variant='h5' sx={{fontSize:'18px'}}>Create an account or log in to book and manage your business</Typography>
                        </Box>
                        <Box display='flex' flexDirection='column' gap='30px' className="login-signup-sub-div" sx={{width:'60%'}}>
                            <Box display='flex' justifyContent='center' gap='10px' alignItems='center'>
                                <form style={{width:'100%'}} onSubmit={handleEmailCheck}>
                                    <TextField
                                    label="Enter email address"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2,background:'#333333',borderRadius:'10px', padding:'15px' }}
                                        disabled={loading}
                                        >
                                    Continue
                                    </Button>
                                </form>
                            </Box>
                            <Box display='flex' justifyContent='center' gap='10px' alignItems='center'>
                                <Box sx={{width:'45%'}}>
                                    <hr />
                                </Box>
                                <Box display='flex' flexDirection='column' gap='15px'>
                                    <p style={{color:'#333333',fontSize:'18px',margin:'0'}}>OR</p>
                                </Box>
                                <Box sx={{width:'45%'}}>
                                    <hr />
                                </Box>
                            </Box>
                            <Link to={ROUTES.ownerLogin}>
                                <Box className='loginSignupButton' display='flex' justifyContent='start' gap='10px' alignItems='center'>
                                    <Box>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                            <path d="M32.5 16C32.5 7.1635 25.3365 0 16.5 0C7.6635 0 0.5 7.1635 0.5 16C0.5 23.986 6.351 30.6054 14 31.8056V20.625H9.9375V16H14V12.475C14 8.465 16.3888 6.25 20.0435 6.25C21.794 6.25 23.625 6.5625 23.625 6.5625V10.5H21.6075C19.6199 10.5 19 11.7334 19 12.9987V16H23.4375L22.7281 20.625H19V31.8056C26.649 30.6054 32.5 23.9861 32.5 16Z" fill="#1877F2"/>
                                            <path d="M22.7281 20.625L23.4375 16H19V12.9987C19 11.7332 19.6199 10.5 21.6075 10.5H23.625V6.5625C23.625 6.5625 21.794 6.25 20.0434 6.25C16.3888 6.25 14 8.465 14 12.475V16H9.9375V20.625H14V31.8056C14.827 31.9352 15.6629 32.0002 16.5 32C17.3371 32.0002 18.173 31.9352 19 31.8056V20.625H22.7281Z" fill="white"/>
                                        </svg>
                                    </Box>
                                    <Box display='flex' flexDirection='column' gap='15px'>
                                        <p style={{color:'#333333',fontSize:'18px',margin:'0'}}>Continue with Facebook</p>
                                    </Box>
                                </Box>
                            </Link>
                            <Link to={`${process.env.REACT_APP_LARAVEL_BASE_URL}/auth/google/redirect?login_type=owner`}>
                                <Box className='loginSignupButton' display='flex' justifyContent='start' gap='10px' alignItems='center'>
                                    <Box>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                            <path d="M11.6475 1.0525C8.45019 2.16167 5.69285 4.26691 3.78046 7.059C1.86808 9.85109 0.901465 13.1829 1.02259 16.5649C1.14372 19.947 2.34621 23.201 4.45343 25.8492C6.56065 28.4973 9.46153 30.3999 12.73 31.2775C15.3798 31.9612 18.156 31.9913 20.82 31.365C23.2333 30.8229 25.4644 29.6634 27.295 28C29.2002 26.2159 30.5831 23.9462 31.295 21.435C32.0688 18.7042 32.2065 15.8323 31.6975 13.04H16.8175V19.2125H25.435C25.2628 20.197 24.8937 21.1366 24.3499 21.9751C23.806 22.8136 23.0986 23.5338 22.27 24.0925C21.2177 24.7886 20.0315 25.2569 18.7875 25.4675C17.5398 25.6995 16.2601 25.6995 15.0125 25.4675C13.748 25.2061 12.5517 24.6841 11.5 23.935C9.81036 22.739 8.54168 21.0398 7.87499 19.08C7.19702 17.0835 7.19702 14.919 7.87499 12.9225C8.34955 11.523 9.13407 10.2488 10.17 9.19499C11.3555 7.96686 12.8563 7.08899 14.5079 6.65769C16.1594 6.22638 17.8979 6.25832 19.5325 6.75C20.8094 7.14197 21.9771 7.82684 22.9425 8.75C23.9142 7.78333 24.8842 6.81416 25.8525 5.8425C26.3525 5.32 26.8975 4.82249 27.39 4.2875C25.9164 2.91619 24.1867 1.84914 22.3 1.1475C18.8642 -0.10003 15.1049 -0.133556 11.6475 1.0525Z" fill="white"/>
                                            <path d="M11.6474 1.05249C15.1046 -0.134368 18.8639 -0.101725 22.2999 1.14499C24.187 1.8514 25.9159 2.92358 27.3874 4.29999C26.8874 4.83499 26.3599 5.33499 25.8499 5.85499C24.8799 6.82332 23.9108 7.78832 22.9424 8.74999C21.9771 7.82683 20.8094 7.14197 19.5324 6.74999C17.8984 6.25659 16.16 6.22281 14.508 6.65235C12.856 7.08188 11.3542 7.95814 10.1674 9.18499C9.13153 10.2388 8.34701 11.513 7.87244 12.9125L2.68994 8.89999C4.54496 5.22139 7.75681 2.40755 11.6474 1.05249Z" fill="#E33629"/>
                                            <path d="M1.31512 12.8749C1.59367 11.4944 2.05613 10.1575 2.69012 8.8999L7.87262 12.9224C7.19466 14.9189 7.19466 17.0834 7.87262 19.0799C6.14595 20.4132 4.41845 21.7532 2.69012 23.0999C1.103 19.9407 0.618951 16.3412 1.31512 12.8749Z" fill="#F8BD00"/>
                                            <path d="M16.8175 13.0376H31.6975C32.2065 15.8299 32.0688 18.7018 31.295 21.4326C30.5831 23.9438 29.2002 26.2135 27.295 27.9976C25.6225 26.6926 23.9425 25.3976 22.27 24.0926C23.0992 23.5333 23.8069 22.8123 24.3508 21.9729C24.8946 21.1335 25.2634 20.193 25.435 19.2076H16.8175C16.815 17.1526 16.8175 15.0951 16.8175 13.0376Z" fill="#587DBD"/>
                                            <path d="M2.6875 23.1001C4.41583 21.7667 6.14333 20.4267 7.87 19.0801C8.53802 21.0406 9.80851 22.7398 11.5 23.9351C12.555 24.6807 13.7538 25.1984 15.02 25.4551C16.2676 25.6871 17.5474 25.6871 18.795 25.4551C20.039 25.2445 21.2252 24.7762 22.2775 24.0801C23.95 25.3851 25.63 26.6801 27.3025 27.9851C25.4722 29.6494 23.241 30.8098 20.8275 31.3526C18.1635 31.9788 15.3873 31.9488 12.7375 31.2651C10.6418 30.7055 8.68419 29.7191 6.9875 28.3676C5.19165 26.9418 3.72489 25.145 2.6875 23.1001Z" fill="#319F43"/>
                                        </svg>
                                    </Box>
                                    <Box display='flex' flexDirection='column' gap='15px'>
                                        <p style={{color:'#333333',fontSize:'18px',margin:'0'}}>Continue with Google</p>
                                    </Box>
                                </Box>
                            </Link>
                            <Link to={ROUTES.ownerLogin}>
                                <Box className='loginSignupButton' display='flex' justifyContent='start' gap='10px' alignItems='center'>
                                    <Box>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
                                            <path d="M19.9966 28.1003C18.4459 29.6035 16.7527 29.3662 15.1229 28.6541C13.3981 27.9262 11.8157 27.8946 9.99598 28.6541C7.71736 29.6352 6.51476 29.3503 5.15392 28.1003C-2.56807 20.1409 -1.42876 8.01994 7.33759 7.57687C9.4738 7.68764 10.9612 8.74783 12.2113 8.84277C14.0785 8.463 15.8666 7.37116 17.8604 7.51358C20.2498 7.70346 22.0537 8.65289 23.2405 10.3618C18.3035 13.3209 19.4744 19.8245 24 21.6442C23.098 24.0177 21.9271 26.3755 19.9808 28.1161L19.9966 28.1003ZM12.0531 7.48193C11.8157 3.95323 14.6798 1.04166 17.9712 0.756836C18.43 4.83936 14.2684 7.87752 12.0531 7.48193Z" fill="black"/>
                                        </svg>
                                    </Box>
                                    <Box display='flex' flexDirection='column' gap='15px'>
                                        <p style={{color:'#333333',fontSize:'18px',margin:'0'}}>Continue with Apple</p>
                                    </Box>
                                </Box>
                            </Link>
                            
                            <Box display='flex' justifyContent='center' flexDirection='column' gap='5px' alignItems='center'>
                                <Box display='flex' flexDirection='column' gap='15px'>
                                    <p style={{color:'#333333',fontSize:'18px',margin:'0',fontWeight:'600'}}>Are you a customer looking to book an appointment?</p>
                                </Box>
                                <Box display='flex' flexDirection='column' gap='15px'>
                                    <Link to={ROUTES.customerLogin}>
                                        <p style={{color:'#D08998',fontSize:'18px',margin:'0'}}>Go to Beauty Trafic for customers</p>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </>
                ) : showForm === 'password' ? (
                    <>
                        <Box display='flex' justifyContent='center' flexDirection='column' gap='10px' alignItems='center'>
                            <Box display='flex' flexDirection='column' gap='15px' textAlign='center'>
                                <Typography variant='h4' sx={{fontSize:'32px'}}><b>Welcome back</b></Typography>
                                <Typography variant='h5' sx={{fontSize:'18px'}}>Enter your password and login as <b>{email}</b></Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' gap='10px' alignItems='center' sx={{width:'100%'}}>
                                <form style={{width:'100%'}} onSubmit={handleLogin}>
                                    <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2,background:'#333333',borderRadius:'10px', padding:'15px' }}
                                        disabled={loading}
                                        >
                                        Login
                                    </Button>
                                </form>
                            </Box>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 2 }}
                                >
                                Forgot Password? Click <span onClick={forgotPasswordHandle} style={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}>here</span> to reset.
                            </Typography>
                        </Box>
                    </>
                ) : showForm === 'completeForm' ? (
                    <Box display='flex' justifyContent='center' flexDirection='column' gap='10px' alignItems='center'>
                        <Box display='flex' flexDirection='column' textAlign='center'>
                            <Typography variant='h4' sx={{fontSize:'32px'}}><b>Create account</b></Typography>
                            <Typography variant='h5' sx={{fontSize:'18px'}}>You're almost there! Create your new account for <b>{email}</b> by completing these details</Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' gap='10px' alignItems='center' sx={{width:'100%'}}>
                                <form style={{width:'100%'}} onSubmit={handleSignup}>
                                    <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={loading}
                                    />
                                    <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    disabled={loading}
                                    />
                                    <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="password"
                                        value={passwordConfirm}
                                        // password_confirmation
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Upload Profile Image
                                        <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleFileChange}
                                        />
                                    </Button>
                                    {profileImage && (
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                        Selected: {profileImage.name}
                                        </Typography>
                                    )}
                                    <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        disabled={loading}
                                    />
                                    }
                                    label={
                                    <Typography variant="body2">
                                        I agree to the Terms and Conditions
                                    </Typography>
                                    }
                                    sx={{ mt: 2 }}
                                />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2,background:'#333333',borderRadius:'10px', padding:'15px' }}
                                        disabled={loading || !acceptedTerms}
                                        >
                                        Signup
                                    </Button>
                                </form>
                            </Box>
                    </Box>
                ) : showForm === 'verifyEmail' ?
                    (<>
                        <Box display='flex' justifyContent='center' flexDirection='column' gap='10px' alignItems='center'>
                            <Box display='flex' flexDirection='column' gap='15px' textAlign='center'>
                                <Typography variant='h4' sx={{fontSize:'32px'}}><b>Enter Code</b></Typography>
                                <Typography variant='h5' sx={{fontSize:'18px'}}>Enter the verification code we've sent to <b>{email}</b></Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' gap='10px' alignItems='center' sx={{width:'100%'}}>
                                <form style={{width:'100%'}} onSubmit={handleVerification}>
                                    <TextField
                                        label="Verification code"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2,background:'#333333',borderRadius:'10px', padding:'15px' }}
                                        disabled={loading}
                                        >
                                        Verify
                                    </Button>
                                </form>
                            </Box>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 2 }}
                                >
                                Forgot Password? Click <span onClick={forgotPasswordHandle} style={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}>here</span> to reset.
                            </Typography>
                        </Box>
                    </>)
                : ('')}
                
                
            </Box>
        </Box>
        <Box className="banner_img" sx={{width:'45%'}}>
            <img src={`${process.env.REACT_APP_BASE_URL}/customer-login-page-img.png`} alt="Banner Img" style={{width:'100%'}} />
        </Box>
    </Box>
  )
}

export default ProfessionalLoginPage