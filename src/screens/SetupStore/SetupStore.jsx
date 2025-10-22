import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { useSnackbar } from '../../contexts/SnackBarContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import axiosClient from '../../axios-client';
import DoneIcon from '@mui/icons-material/Done';
function SetupStore() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;
    useEffect(() => {
        if (!userId) {
        navigate(ROUTES.loginSignup); 
        }
    }, [userId, navigate]);
    const { showSnackbar } = useSnackbar();
    const [step,setStep] = useState(1);
    const [loading,setLoading] = useState(false);
    const [showPopup,setShowPopup] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        type:'',
        account_type:'',
        team_size:'',
        store_type:'',
        address: "",
        lat:"",
        lng:"",
        user_id:userId,
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const validateStep = () => {
        switch (step) {
          case 1:
            return form.title.trim() !== "";
          case 2:
            return form.type.trim() !== "";
          case 3:
            return form.account_type.trim() !== "";
          case 4:
            if (form.account_type === "team") {
              return form.team_size.trim() !== "";
            }
            if (form.account_type === "independent") {
              return form.team_size.trim() !== "";
            }
            return true;
          case 5:
            return form.store_type.trim() !== "";
          case 6:
            return form.address.trim() !== "";
          default:
            return true;
        }
    };
    useEffect(() => {
        if(error){
            showSnackbar(error,'error');
        }
    }, [error])
    const handleContinue = () => {
        setError("");
        if ((step === 5 && form.store_type !== 'physical_location') || step === 6) {
            handleFormSubmit();
        } else {
            if (!validateStep()) {
                setError("Please fill in all required fields before continuing.");
                return;
            }

            setError("");

            if (step === 3 && form.account_type === "independent") {
                setStep(5);
                return;
            }

            setStep(step + 1);
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title:form.title,
                address:form.address,
                lat:form.lat,
                lng:form.lng,
                user_id:form.user_id,
                type:form.type,
                account_type:form.account_type,
                store_type:form.store_type,
                team_size:form.team_size,
            };
            const { data } = await axiosClient.post("/addStores", payload);
            if(data.success) {
                setShowPopup(true);
            }
        } catch (error) {
            console.error('error adding store: ', error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <Box className='setup_page'>
        {showPopup && (
            <Box className="success_popup">
                <Box className="icon">
                    <DoneIcon />
                </Box>
                <Typography variant='h2'>Your business is set up</Typography>
                <Link to={ROUTES.adminDashboard}>
                    <Button>
                        Done
                    </Button>
                </Link>
            </Box>
        )}
        <Box className="container">
            <Box className="continue_btn">
                <Button variant='contained' className='back_button' onClick={() => setStep(step > 1 ? (form.account_type === "independent" && step === 5) ? step - 2 : step - 1 : step)}>
                    <ArrowBackIcon />
                </Button>
                <Button
                    variant="contained"
                    onClick={handleContinue}
                    disabled={loading}
                >
                    Continue
                    {loading && <CircularProgress size="20px" color="white" sx={{marginLeft:'10px'}} />}
                </Button>

            </Box>
            {
                step === 1 ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>What's your business name?</Typography>
                        <Typography variant='body1'>This is the brand name your clients will see</Typography>
                        <Box className="field">
                            <label htmlFor="business_name">Business Name</label>
                            <input type="text" id="business_name" name="title" value={form.title} onChange={handleChange} />
                        </Box>
                    </Box>
                ) : step === 2 ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>Select your business type</Typography>
                        <Typography variant='body1'>Choose your service type</Typography>
                        <Box className="field">
                            <label htmlFor="business_type">Business Type</label>
                            <Select sx={{width:'100%'}} name='type' id='business_type' onChange={handleChange} value={form.type} displayEmpty>
                                <MenuItem value="" disabled>Select a type</MenuItem>
                                <MenuItem value="Hair Saloon">Hair Saloon</MenuItem>
                                <MenuItem value="Massage">Massage</MenuItem>
                                <MenuItem value="Face Facial">Face Facial</MenuItem>
                                <MenuItem value="Barber">Barber</MenuItem>
                                <MenuItem value="Beauty Saloon">Beauty Saloon</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                ) : step === 3 ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>Select account type</Typography>
                        <Typography variant='body1'>This will help us set up your account correctly</Typography>
                        <Box className="fields">
                            <Box className={`field radio ${form.account_type == 'independent' ? 'active' : ''}`}>
                                <label htmlFor="account_type1">
                                    <Box className="icon">
                                        <PersonIcon />
                                    </Box>
                                    <Typography variant='body2'>I'm an independent</Typography>
                                </label>
                                <input type="radio" id="account_type1" name="account_type" value="independent" onChange={handleChange} />
                            </Box>
                            <Box className={`field radio ${form.account_type == 'team' ? 'active' : ''}`}>
                                <label htmlFor="account_type2">
                                    <Box className="icon">
                                        <GroupIcon />
                                    </Box>
                                    <Typography variant='body2'>I have team</Typography>
                                </label>
                                <input type="radio" id="account_type2" name="account_type" value="team" onChange={handleChange} />
                            </Box>
                        </Box>
                    </Box>
                ) : step === 4 && form.account_type === 'team' ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>What's your team size</Typography>
                        <Box className={`field radio ${form.team_size == '2-5 people' ? 'active' : ''}`}>
                            <label htmlFor="team_size1">
                                <Typography variant='body2'>2-5 people</Typography>
                            </label>
                            <input type="radio" id="team_size1" name="team_size" value="2-5 people" onChange={handleChange} />
                        </Box>
                        <Box className={`field radio ${form.team_size == '6-10 people' ? 'active' : ''}`}>
                            <label htmlFor="team_size2">
                                <Typography variant='body2'>6-10 people</Typography>
                            </label>
                            <input type="radio" id="team_size2" name="team_size" value="6-10 people" onChange={handleChange} />
                        </Box>
                        <Box className={`field radio ${form.team_size == '11+ people' ? 'active' : ''}`}>
                            <label htmlFor="team_size3">
                                <Typography variant='body2'>11+ people</Typography>
                            </label>
                            <input type="radio" id="team_size3" name="team_size" value="11+ people" onChange={handleChange} />
                        </Box>
                    </Box>
                ) : step === 5 ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>Where do you provide your services?</Typography>
                        <Box className={`field radio ${form.store_type == 'physical_location' ? 'active' : ''}`}>
                            <label htmlFor="store_type1">
                                <Typography variant='body2'>Clients come to me at a physical location</Typography>
                            </label>
                            <input type="radio" id="store_type1" name="store_type" value="physical_location" onChange={handleChange} />
                        </Box>
                        <Box className={`field radio ${form.store_type == 'mobile_operator' ? 'active' : ''}`}>
                            <label htmlFor="store_type2">
                                <Typography variant='body2'>I visit my client as a mobile operator</Typography>
                            </label>
                            <input type="radio" id="store_type2" name="store_type" value="mobile_operator" onChange={handleChange} />
                        </Box>
                        <Box className={`field radio ${form.store_type == 'online_service' ? 'active' : ''}`}>
                            <label htmlFor="store_type3">
                                <Typography variant='body2'>I provide virtual services online</Typography>
                            </label>
                            <input type="radio" id="store_type3" name="store_type" value="online_service" onChange={handleChange} />
                        </Box>
                    </Box>
                ) : step === 6 ? (
                    <Box className="form">
                        <Typography variant='body1'>Account Setup</Typography>
                        <Typography variant='h1'>Set your venue's physical location</Typography>
                        <Typography variant='body1'>Add your primary business location so your clients can easily find you</Typography>
                        <Box>
                            {typeof window !== "undefined" ? (
                            <LocationPicker
                                initialPosition={{ lat: form.lat ?? 48.8584, lng: form.lng ?? 2.2945 }}
                                onChange={(pos) => {
                                    setForm(prev => ({
                                    ...prev,
                                    lat: pos.lat,
                                    lng: pos.lng,
                                    address: pos.address,
                                    }));
                                }}
                            />
                            ) : (
        <div>Loading...</div>
      )}
                        </Box>
                    </Box>
                ) : ''
            }
        </Box>
    </Box>
  )
}

export default SetupStore