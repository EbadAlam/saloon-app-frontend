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
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination
} from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import DummyImage from '../../../DummyImage/DummyImage';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { ROUTES } from '../../../../routes';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import ReloadButton from '../../../ReloadButton/ReloadButton';

function UsersPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [highlightId,setHighlightId] = useState(location.state?.highlightId ?? '');
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  const highlightedRef = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    role: '',
    password: '',
    profileImage: null,
    id:null,
    allowed_store:1,
      store_id:null,
  });

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState('active');

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
  const fetchStores = async () => {
    try {
      const { data } = await axiosClient.get('/getStoresAdmin/');
      setStores(data.stores);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    }
  };
    fetchStores();
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllUsers?page=${page}`);
      setUsers(data.users.data);
      setPagination({
        current_page: data.users.current_page,
        last_page: data.users.last_page,
        total: data.users.total,
      });
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
      role: '',
      password: '',
      profileImage: null,
      id:null,
      allowed_store:1,
      store_id:null,
    });
    setShowForm((prev) => !prev);
  };
  const handleToggleEditForm = (singleUser) => {
    setFormData({
      name: '',
      designation: '',
      email: '',
      role: '',
      password: '',
      profileImage: null,
      id:null,
      store_id:null,
      allowed_store:1,
    });
    setFormData({
      id: singleUser.id,
      name: singleUser.username,
      role: singleUser.user_info?.role,
      designation: singleUser.user_info?.designation,
      email: singleUser.email,
      allowed_store:singleUser.user_info?.allowed,
    });
    setShowForm(true);
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.name);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('designation', formData.designation);
      dataToSend.append('role', formData.role);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', formData.store_id);
      dataToSend.append('id', formData.id);
      dataToSend.append('allowed', formData.allowed_store);
      const { data } = await axiosClient.post(`/addEditUserAdmin`, dataToSend);
      if(data.success){
        showAlert('success',formData.id ? 'User updated' : 'User added');
        setAlertMessage(formData.id ? 'User updated' : 'User added');
        fetchTeamMembers();
        setFormData({});
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to add memebers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = (newStatus,fetch = true) => {
    if(newStatus.success){
      showAlert('success', newStatus.message);
    } else {
      showAlert('error', newStatus.message);
    }
    if(fetch){
      fetchTeamMembers();
    }
  };
  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const payload = {
        status:newStatus,
      }
      const { data } = await axiosClient.put(`/updateUserStatus/${id}`,payload);
      setLoading(false);
      handleStatusChange(data);
    } catch (error) {
      console.error('Error updating user status ',error);
      setLoading(false);
    }
  };
  useEffect(() => {
      if (!loading && highlightedRef.current) {
        highlightedRef.current.classList.add("blink-highlight");
        const timeout = setTimeout(() => {
          highlightedRef.current.classList.remove("blink-highlight");
          setHighlightId(null);
        }, 2400);
        return () => clearTimeout(timeout);
      }
    }, [highlightId, loading, users]);
  useEffect(() => {
      if (alertMessage) {
        showSnackbar(alertMessage, alertMessageType)
      }
    }, [alertMessage]);
    const filteredUsers = users.filter((u) => {
      const matchesSearch =
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter ? u.user_info?.role === roleFilter : true;
      const matchesStatus = statusFilter ? u.account_status === statusFilter : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        const updatedUsers = users.map(user => {
            return { ...user, isChecked };
        });

        setUsers(updatedUsers);
    };
    const handleCheckboxChange = (event, userId) => {
      const isChecked = event.target.checked;


      const updatedUsers = users.map(user => {
          if (user.id === userId) {
              return { ...user, isChecked };
          }
          return user;
      });

      setUsers(updatedUsers);
  };
  const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
      if(selectedOption === 'delete') {
        setAlertOpen(true);
      } else {
        bulkActionFunction();
      }
    }
    const showAlert = (alertType, message) => {
      setAlertMessage(message);
      setAlertMessageType(alertType);
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);

        return () => clearTimeout(timer);
    };
  const bulkActionFunction = async () => {
      const selectedIds = filteredUsers.filter(user => user.isChecked).map(user => user.id);
      if(selectedIds.length === 0) {
        showAlert('error','Select any user to update');
      } else {
        setLoading(true);
        try {
          const payload = {
            model:'User',
            selectedIds,
            action:selectedOption,
          }
          const { data } = await axiosClient.post('/bulkOptionPerform',payload);
          showAlert('success',data.message || 'Bulk action perform');
          fetchTeamMembers();
          setSelectAll(false);
          setSelectedOption('active');
          setUsers(users.map(user => ({ ...user, isChecked: false })));
        } catch (error) {
          console.error('Error performing bulk options ', error);
        } finally {
          setLoading(false);
          setAlertOpen(false);
        }
      }
    }
    const handlePageChange = (e, page) => {
      fetchTeamMembers(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  return (
    <AdminLayout>
      <Box>
        <Dialog open={alertOpen} onClose={handleAlertClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete these users? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose}>Cancel</Button>
            <Button color="error" onClick={bulkActionFunction} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Users</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              <Button variant="contained" onClick={handleToggleForm}>
                {showForm ? 'Cancel' : 'Add User'}
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
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="worker">Worker</MenuItem>
            </TextField>
            {formData.role == 'worker' && (
              <>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                {!formData.id && stores && stores.length > 0 && (
                    <TextField
                    fullWidth
                    select
                    label="Store"
                    name="store_id"
                    value={formData.store_id}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  >
                    {stores.map((singleStore) => (
                      <MenuItem value={singleStore.id}>{singleStore.title}</MenuItem>
                    ))}
                </TextField>
                )}
              </>
            )}
            {formData.role == 'owner' && (
              <TextField
                fullWidth
                label="Allowed Store"
                name="allowed_store"
                value={formData.allowed_store}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            {formData.id == null && (
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="text"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            )}
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

            <Button type="submit" variant="contained" sx={{ mt: 2,display:'block' }}>
              Save User
            </Button>
          </Box>
        )}
         <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
            <Stack direction="row" justifyContent="start" gap="20px" alignItems="center" sx={{width:'30%'}}>
              <Select
                defaultValue={selectedOption}
                sx={{width:'100%'}}
                onChange={handleOptionChange}
              >
                {['active', 'deactive', 'verify', 'suspend', 'delete'].map(status => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              <Button variant="contained"  onClick={handleApply}>
                Save
              </Button>
            </Stack>
            <Box display="flex" justifyContent='end' gap={2} sx={{width:'100%'}}>
              <ReloadButton onReload={fetchTeamMembers} />
              <TextField
                sx={{width:'15%'}}
                label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                sx={{width:'10%'}}
                select
                label="Role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="worker">Worker</MenuItem>
              </TextField>
              <TextField
                sx={{width:'10%'}}
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="deactive">Deactive</MenuItem>
                <MenuItem value="suspend">Suspend</MenuItem>
              </TextField>
            </Box>
          </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row"><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></TableCell>
                <TableCell align="left">#</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Profile Img</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Allowed Stores</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((singleUser,index) => (
                singleUser?.user_info?.role !== 'master-admin' &&
                <>
                  <TableBody
                    key={singleUser.id}
                    ref={singleUser.id === highlightId ? highlightedRef : null}
                  >
                    <TableCell component="td">
                        <input
                            className="allCheckboxes"
                            type="checkbox"
                            value={singleUser.id}
                            checked={singleUser.isChecked}
                            onChange={(event) => handleCheckboxChange(event, singleUser.id)}
                        />
                    </TableCell>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleUser.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleUser.email} 
                      <span className={`badge badge-${singleUser.email_verified == 'true' ? 'primary' : 'secondary'} ml-3`}>{singleUser.email_verified == 'true' ? 'Verified' : 'Not Verified'}</span>
                    </TableCell>
                    <TableCell>
                      {/* {singleUser?.user_info?.profile_image ? (
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}${singleUser?.user_info?.profile_image}`}
                          alt="Profile"
                          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <DummyImage username={singleUser.username} />
                      )} */}
                      {singleUser.user_info?.profile_image ? (
                        singleUser.user_info?.signup_platform == "manual" ? (
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}/${singleUser.user_info.profile_image}`}
                            alt="Profile"
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            src={singleUser.user_info.profile_image}
                            alt=""
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        )
                      ) : (
                        <DummyImage username={singleUser.username} />
                      )}

                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleUser?.user_info?.role == 'owner' ? 'Owner' : singleUser?.user_info?.role == 'customer' ? 'Customer' : singleUser?.user_info?.designation}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleUser?.user_info?.role === 'owner'
                        ? singleUser.stores
                            ?.filter(store => store.status === 'active')
                            .map(store => (
                              <Link
                                key={store.id}
                                to={ROUTES.getStoreFrontPage(store.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                               style={{display:'block'}} 
                              >
                                {store.title}
                              </Link>
                            ))
                        : singleUser?.user_info?.role === 'worker' &&
                          singleUser?.worker_store?.store?.status === 'active' ? (
                            <Link
                              to={ROUTES.getStoreFrontPage(singleUser.worker_store.store.slug)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {singleUser.worker_store.store.title}
                            </Link>
                          ) : ('-')}

                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleUser?.user_info?.role == 'owner' ? singleUser.user_info?.allowed : 0}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: singleUser.account_status === 'active' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleUser.account_status}
                    </TableCell>
                    <TableCell>
                    <Select
                      value={
                        ['active', 'deactive', 'suspend'].includes(singleUser.account_status)
                          ? singleUser.account_status
                          : 'active'
                      }
                      onChange={(e) => handleStatusChangeStatus(singleUser.id, e.target.value)}
                    >
                      {['active', 'deactive', 'suspend', singleUser.email_verified == 'false' && 'verify']
                        .filter(Boolean)
                        .map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </MenuItem>
                        ))}
                    </Select>

                  </TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleToggleEditForm(singleUser)}>
                          Edit
                        </Button>
                      </TableCell>
                    <TableCell>
                     <DeleteButton id={singleUser.id} url='/deleteTeamMember' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Users
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

export default UsersPage;