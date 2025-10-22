import React, { useEffect, useRef, useState } from 'react';
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
  Pagination
} from '@mui/material';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../routes';
import ActiveDeactiveSwitchMaster from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

function MasterServicesPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [highlightId,setHighlightId] = useState(location.state?.highlightId ?? '');
  const highlightedRef = useRef(null);
  const [services, setServices] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [title, setTitle] = useState('');
  const { showSnackbar } = useSnackbar();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  useEffect(() => {
    fetchServices();
  }, []);
  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllServices?page=${page}`);
      setServices(data.services.data);
      setPagination({
        current_page: data.services.current_page,
        last_page: data.services.last_page,
        total: data.services.total,
      });
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchServices(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // const handleToggleForm = () => {
  //   setShowForm((prev) => !prev);
  // };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       title,
  //     }
  //     const { data } = await axiosClient.post(`/addNewCategory`, payload);
  //     setAlertMessageType('success');
  //     setAlertMessage(data.message || 'New category added');
  //     fetchCategories();
  //     const timer = setTimeout(() => {
  //       setAlertMessage('');
  //       setAlertMessageType('');
  //     }, 3000);

  //     setTitle('');
  //     return () => clearTimeout(timer);
  //   } catch (error) {
  //     console.error('Failed to add new category:', error);
  //   } finally {
  //     setLoading(false);
  //     setShowForm(false);
  //   }
  // };

  useEffect(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
          setHighlightId('');
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, services]);

  const handleStatusChange = (newStatus,fetch = true) => {
    setAlertMessage(newStatus.message);
    if(newStatus.success){
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if(fetch){
      fetchServices();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

      return () => clearTimeout(timer);
  };
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType)
    }
  }, [alertMessage]);
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Services</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              {/* <Button variant="contained" onClick={handleToggleForm}>
                {showForm ? 'Cancel' : 'Add Service'}
              </Button> */}
            </Stack>
        </Stack>

        {/* {showForm && (
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
          >
            <Typography variant="h6" mb={2}>Add new category</Typography>

            <TextField
              fullWidth
              label="Category name"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Add category
            </Button>
          </Box>
        )} */}
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Store Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Gender (If specific)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {services && services.length > 0 ? (
              services.map((singleSer,index) => (
                <>
                  <TableBody
                    key={singleSer.id}
                    ref={singleSer.id === highlightId ? highlightedRef : null}
                  >
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleSer.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link 
                        to={ROUTES.getStoreFrontPage(singleSer.store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {singleSer.store?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleSer.currency} {singleSer.price}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleSer.eta}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminServicesCategories}
                        state={{ highlightId: singleSer.category?.id }}
                      >
                        {singleSer.category?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleSer.gender ?? '-'}
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
                    >
                     <ActiveDeactiveSwitchMaster id={singleSer.id} apiUrl='/updateStatusMaster' status={singleSer.is_active_by_admin} model={'Service'} onStatusChange={handleStatusChange} />
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
        <Box sx={{marginTop:'10px'}}>
          <Pagination
            count={pagination.last_page}
            page={pagination.current_page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </div>
    </AdminLayout>
  );
}

export default MasterServicesPage;