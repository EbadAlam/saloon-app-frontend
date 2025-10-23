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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  InputAdornment
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import ActiveDeactiveSwitch from '../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import BackButton from '../../BackButton/BackButton';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function Servicespage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const genderOptions = ['Male', 'Female'];
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [eta, setEta] = useState('');
  const [gender, setGender] = useState('');
  const { showSnackbar } = useSnackbar();
  const [currency, setCurrency] = useState('PKR');
  const [serviceId, setServiceId] = useState('');
  const { storeId } = useParams();
  const { state } = useLocation();
  const currencyOptions = [
    { label: 'USD ($)', symbol: '$' },
    { label: 'AED', symbol: 'AED' },
  ];
  useEffect(() => {
    const fetchStoreCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getStoreCategories/${storeId}`);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
    fetchStoreCategories();
  }, []);
  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getServices/${storeId}`);
      setServices(data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setTitle('');
    setCategoryId('');
    setPrice('');
    setEta('');
    setGender('');
    setServiceId('');
    setShowForm((prev) => !prev);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      store_id:storeId,
      title: title,
      service_category_id: categoryId,
      price: price,
      eta: eta,
      gender: gender,
      currency: currency,
      serviceId,
    }
    try {
      const { data } = await axiosClient.post(`/addServices`, payload);
      setServices(data.services);
      showAlert('success',data.message || 'Service added');
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
    setTitle('');
    setCategoryId('');
    setPrice('');
    setEta('');
    setGender('');
    setCurrency('PKR');
  };
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const handleStatusChange = (newStatus) => {
    showAlert(newStatus.success ? 'success' : 'error',newStatus.message)
    fetchServices();
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
  const handleToggleEditForm = (service) => {
    setTitle(service.title);
    setCategoryId(service.category.id);
    setPrice(service.price);
    setEta(service.eta);
    setGender(service.gender);
    setServiceId(service.id);
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
        <Stack className='btn_heads' direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Services</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              <Button className='dark-btn' variant="contained" onClick={handleToggleForm}>
                {showForm ? 'Cancel' : 'Add Services'}
              </Button>
            </Stack>
        </Stack>

        {showForm && (
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
          >
            <TextField
              fullWidth
              label="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Service Category</InputLabel>
              <Select
                labelId="category-label"
                value={categoryId}
                label="Service Category"
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories?.filter(cat => cat.category.status === 'active').map((cat) => (
                  <MenuItem key={cat.id} value={cat.category.id}>
                    {cat.category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl sx={{ minWidth: 100, mb: 3 }} margin="normal">
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                displayEmpty
              >
                {currencyOptions.map((opt) => (
                  <MenuItem key={opt.symbol} value={opt.symbol}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
          </FormControl> */}

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
            }}
          />

            <TextField
              fullWidth
              label="Estimated Time (e.g. 30 mins)"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              required
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Save Service
            </Button>
          </Box>
        )}
        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">ETA</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Change Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
             {services && services.length > 0 ? (
              services.map((singleSer,index) => (
                <>
                  <TableBody>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleSer.title}
                    </TableCell>
                    <TableCell align="right">
                      {singleSer.category.title}
                    </TableCell>
                    <TableCell align="right">
                      {singleSer.eta}
                    </TableCell>
                    <TableCell align="right">
                      {singleSer.currency} {singleSer.price}
                    </TableCell>
                    <TableCell align="right">
                      {singleSer.gender ?? '---'}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'active' : singleSer.is_active_by_admin != 1 ? 'Disabled by admin' : ""}
                    </TableCell>
                    <TableCell
                      align="right"
                    >
                      {singleSer.is_active_by_admin == 1 && (
                        <ActiveDeactiveSwitch id={singleSer.id} apiUrl='/updateServicesStatus' status={singleSer.status} onStatusChange={handleStatusChange} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleToggleEditForm(singleSer)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleSer.id} url='/deleteServices' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Services
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default Servicespage;