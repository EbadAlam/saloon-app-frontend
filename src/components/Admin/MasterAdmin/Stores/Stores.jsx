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
  Pagination
} from '@mui/material';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes';
import ActiveDeactiveSwitchMaster from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster';
import DummyImage from '../../../DummyImage/DummyImage';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

function MasterStoresPage() {
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  const [stores, setStores] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [title, setTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
    
  useEffect(() => {
    fetchStores();
  }, []);
  const fetchStores = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllStores?page=${page}`);
      setStores(data.stores.data);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total,
      });
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchStores(page);
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
  
  const handleStatusChange = (newStatus,fetch = true) => {
    setAlertMessage(newStatus.message);
    if(newStatus.success){
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if(fetch){
      fetchStores();
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
          <Typography variant="h4">Stores</Typography>
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
          <Table aria-label="Stores Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Owner Name</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Workers</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Approve Status</TableCell>
                <TableCell>Change Active Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {stores && stores.length > 0 ? (
              stores.map((store,index) => (
                <>
                  <TableBody key={index+1}>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link 
                        to={ROUTES.getStoreFrontPage(store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: store.user?.id }}
                      >
                        {store.user?.username}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {store.thumbnail ? (
                        <img style={{width:'100px',borderRadius:'10px'}} src={`${process.env.REACT_APP_IMG_URL}/${store.thumbnail}`} />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {store.type}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {store.services_categories?.length ?? 0}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {store.services?.length ?? 0}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {store.workers?.length ?? 0}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: store.status === 'active' && store.is_active_by_admin == 1 ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {store.status === 'active' ? store.is_active_by_admin == 1 ? 'active' : store.is_active_by_admin != 1 ? 'Disabled by admin' : "" : 'Waiting for approval'}
                    </TableCell>
                    <TableCell>
                     <ActiveDeactiveSwitch 
                      id={store.id} 
                      apiUrl='/updateStatusApproveMaster' 
                      status={store.status} 
                      label={store.status == 'active' ? 'Approved' : 'Approve'} 
                      onStatusChange={handleStatusChange} 
                     />
                    </TableCell>
                    <TableCell>
                     <ActiveDeactiveSwitchMaster 
                      id={store.id} 
                      apiUrl='/updateStatusMaster' 
                      status={store.is_active_by_admin} 
                      model={'Store'} 
                      label={store.is_active_by_admin == '1' ? 'Active' : 'Disabled'} 
                      onStatusChange={handleStatusChange} 
                     />
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={store.id} url='/deleteStore' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Stores
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

export default MasterStoresPage;