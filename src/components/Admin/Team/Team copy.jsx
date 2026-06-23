import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Alert,
  MenuItem
} from '@mui/material';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import axiosClient from '../../../axios-client';
import ActiveDeactiveSwitch from '../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import BackButton from '../../BackButton/BackButton';
import DeleteButton from '../../DeleteButton/DeleteButton';
import DummyImage from '../../DummyImage/DummyImage';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../../../contexts/SnackBarContext';
const badgeColors = [
  '#FFE5E5', // light red
  '#E5F4FF', // light blue
  '#E8FFE5', // light green
  '#FFF4E5', // light orange
  '#F3E5FF', // light purple
  '#FFFBE5', // light yellow
];
function TeamsPage() {
  const { user } = useAuth();
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [storeServices, setStoreServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    gender: '',
    password: '',
    profileImage: null,
    id:'',
    services: [],
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
   const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const [teamRes, serviceRes] = await Promise.all([
        axiosClient.get(`/getTeamMember/${storeId}`),
        axiosClient.get(`/getServices/${storeId}`),
      ]);
      // console.log(data.store.workers);
      setTeamMembers(teamRes.data.store.workers);
      setStoreServices(serviceRes.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setFormData({
      name: '',
      designation: '',
      email: '',
      profileImage: null,
      id:'',
    });
    setShowForm((prev) => !prev);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.name);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('designation', formData.designation);
      dataToSend.append('gender', formData.gender);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', storeId);
      dataToSend.append('id', formData.id);
      formData.services.forEach(id => dataToSend.append('services[]', id));
      const { data } = await axiosClient.post(`/addTeamMember`, dataToSend);
      setTeamMembers(data.store.workers);
      setAlertMessageType('success');
      setAlertMessage('Team member added');
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);

      setFormData({});
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Failed to fetch memebers:', error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };
  
  const handleStatusChange = (newStatus,fetch = true) => {
    setAlertMessage(newStatus.message);
    if(newStatus.success){
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if(fetch){
      fetchTeamMembers();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

      return () => clearTimeout(timer);
  };
  const showAlert = (type,message) => {
    setAlertMessage(message);
    setAlertMessageType(type);
    const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);
      return () => clearTimeout(timer);
  }
  const handleToggleEditForm = (user,workerServices) => {
    setFormData({
      name: user.username,
      designation: user.user_info?.designation,
      email: user.email,
      profileImage: user.user_info?.profile_image,
      id:user.id,
      gender: user.user_info?.gender,
      services: workerServices.map(ws => ws.service_id),
    });
    setShowForm(true);
  }
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType)
    }
  }, [alertMessage]);
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack className='btn_headss' direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Team Members</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              <Button className='dark-btn' variant="contained" onClick={handleToggleForm}>
                {showForm ? 'Cancel' : 'Add Team Member'}
              </Button>
            </Stack>
        </Stack>

        {showForm && (
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
          >
            <Typography variant="h6" mb={2}>Create Profile</Typography>

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>

{/* Services multi-select */}
<Box sx={{ mb: 2 }}>
  <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>
    Assign Services (worker will only be bookable for selected services)
  </Typography>
  <Box
    sx={{
      border: '1px solid #ccc',
      borderRadius: 1,
      p: 1.5,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      maxHeight: 200,
      overflowY: 'auto',
    }}
  >
    {storeServices.length === 0 && (
      <Typography variant="body2" color="text.secondary">
        No services found
      </Typography>
    )}
    {storeServices.map(service => {
      const isSelected = formData.services?.includes(service.id);
      return (
        <Box
          key={service.id}
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              services: isSelected
                ? prev.services.filter(id => id !== service.id)
                : [...(prev.services ?? []), service.id],
            }));
          }}
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '20px',
            border: '1px solid',
            borderColor: isSelected ? '#333' : '#ddd',
            backgroundColor: isSelected ? '#333' : 'transparent',
            color: isSelected ? '#fff' : '#333',
            cursor: 'pointer',
            fontSize: '13px',
            userSelect: 'none',
            transition: 'all 0.2s',
          }}
        >
          {service.title}
        </Box>
      );
    })}
  </Box>
  {formData.services?.length === 0 && (
    <Typography variant="caption" color="text.secondary">
      No services selected — worker will appear for all services
    </Typography>
  )}
</Box>
            {!formData.id && 
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            }
            
            <Button
              variant="outlined"
              component="label"
              sx={{ mb: 2 }}
            >
              Upload Profile Image
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </Button>
            {formData.profileImage && (
              <Typography variant="body2">
                Selected: {formData.profileImage.name}
              </Typography>
            )}
            <div>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save Member
              </Button>
            </div>
          </Box>
        )}
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Profile Img</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Change Status</TableCell> */}
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((singleMember,index) => (
                <>
                  <TableBody key={index+1}>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleMember.user?.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleMember.user?.email}
                    </TableCell>
                    <TableCell>
  {singleMember.services?.length > 0 ? (
    <Box display="flex" flexWrap="wrap" gap={0.5}>
      {singleMember.services.map((ws, index) => (
        <Box
          key={ws.service_id}
          sx={{
            px: 1, py: 0.3,
            borderRadius: '12px',
            background: badgeColors[index % badgeColors.length],
            fontSize: '12px',
          }}
        >
          {storeServices.find(s => s.id === ws.service_id)?.title ?? ws.service_id}
        </Box>
      ))}
    </Box>
  ) : (
    <Typography variant="caption" color="text.secondary">All services</Typography>
  )}
</TableCell>
                    <TableCell>
                      {/* {singleMember?.user?.user_info?.profile_image ? (
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${singleMember.user?.user_info?.profile_image}`}
                          alt="Profile"
                          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <DummyImage username={singleMember.user?.username} />
                      )} */}
                      {singleMember?.user?.user_info?.profile_image ? (
                        singleMember?.user?.user_info?.signup_platform == "manual" ? (
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}/${singleMember?.user?.user_info.profile_image}`}
                            alt="Profile"
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            src={singleMember?.user?.user_info.profile_image}
                            alt=""
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        )
                      ) : (
                        <DummyImage username={singleMember?.user?.username} />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleMember.user?.user_info.gender ?? 'N/A'}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleMember.user?.user_info.designation}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: singleMember.user?.account_status === 'active' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleMember.user?.account_status}
                    </TableCell>
                    {/* <TableCell
                    >
                     <ActiveDeactiveSwitch id={singleMember.user.id} apiUrl='/changeTeamMemberStatus' status={singleMember.user.account_status} onStatusChange={handleStatusChange} />
                    </TableCell> */}
                    <TableCell>
                      <Button variant="contained" onClick={() => handleToggleEditForm(singleMember.user, singleMember.services ?? [])}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleMember.user?.id} url='/deleteTeamMember' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Team
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default TeamsPage;