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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination
} from '@mui/material';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

function MasterCategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const location = useLocation();
  const [highlightId,setHighlightId] = useState(location.state?.highlightId ?? '');
  const highlightedRef = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState('active');
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllCategoriesMaster?page=${page}`);
      setCategories(data.categories.data);
      setPagination({
        current_page: data.categories.current_page,
        last_page: data.categories.last_page,
        total: data.categories.total,
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
      fetchCategories(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  const handleToggleForm = () => {
    setTitle('');
    setCategoryId('');
    setShowForm((prev) => !prev);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: categoryId,
        title,
      }
      const { data } = await axiosClient.post(`/addNewCategory`, payload);
      setAlertMessageType('success');
      setAlertMessage(data.message || 'New category added');
      fetchCategories();
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);

      setTitle('');
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Failed to add/edit category:', error);
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
      fetchCategories();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

      return () => clearTimeout(timer);
  };
  const showAlert = (alertType, message) => {
    setAlertMessage(message);
    setAlertMessageType(alertType);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

      return () => clearTimeout(timer);
  };
  useEffect(() => {
      if (!loading && highlightedRef.current) {
        highlightedRef.current.classList.add("blink-highlight");
        const timeout = setTimeout(() => {
          highlightedRef.current.classList.remove("blink-highlight");
          setHighlightId('');
        }, 2400);
        return () => clearTimeout(timeout);
      }
    }, [highlightId, loading, categories]);
    const handleToggleEditForm = (id,title) => {
      setCategoryId(id);
      setTitle(title);
      setShowForm(true);
    }
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        const updatedCategories = categories.map(category => {
            return { ...category, isChecked };
        });

        setCategories(updatedCategories);
    };
    const handleCheckboxChange = (event, categoryId) => {
        const isChecked = event.target.checked;


        const updatedCategories = categories.map(category => {
            if (category.id === categoryId) {
                return { ...category, isChecked };
            }
            return category;
        });

        setCategories(updatedCategories);
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
    const bulkActionFunction = async () => {
      const selectedIds = categories.filter(category => category.isChecked).map(category => category.id);
      if(selectedIds.length === 0) {
        showAlert('error','Select any category to update');
      } else {
        setLoading(true);
        try {
          const payload = {
            model:'ServicesCategory',
            selectedIds,
            action:selectedOption,
          }
          const { data } = await axiosClient.post('/bulkOptionPerform',payload);
          showAlert('success',data.message || 'Bulk action perform');
          fetchCategories();
        } catch (error) {
          console.error('Error performing bulk options ', error);
        } finally {
          setSelectAll(false);
          setCategories(categories.map(category => ({ ...category, isChecked: false })));
          setLoading(false);
          setAlertOpen(false);
        }
      }
    }
    useEffect(() => {
      if (alertMessage) {
        showSnackbar(alertMessage, alertMessageType)
      }
    }, [alertMessage]);
  return (
    <AdminLayout>
      <Box>
      <Dialog open={alertOpen} onClose={handleAlertClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete these items? This action cannot be undone.
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
          <Typography variant="h4">Categories</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              <Button variant="contained" onClick={handleToggleForm}>
                {showForm ? 'Cancel' : 'Add Category'}
              </Button>
            </Stack>
        </Stack>
        <Stack direction="row" justifyContent="start" gap="20px" alignItems="center" mb={2}>
          <Select
            defaultValue={selectedOption}
            sx={{width:'15%'}}
            onChange={handleOptionChange}
          >
            {['active', 'deactive', 'delete'].map(status => (
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

        {showForm && (
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
          >
            <Typography variant="h6" mb={2}>{categoryId ? 'Update' : 'Add new'} category</Typography>

            <TextField
              fullWidth
              label="Category name"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              {categoryId ? 'Update Category' : 'Add category'}
            </Button>
          </Box>
        )}
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row"><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></TableCell>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Services Associated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {categories && categories.length > 0 ? (
              categories.map((singleCat,index) => (
                <>
                  <TableBody
                    key={singleCat.id}
                    ref={singleCat.id === highlightId ? highlightedRef : null}
                  >
                    <TableCell component="td">
                      <input
                          className="allCheckboxes"
                          type="checkbox"
                          value={singleCat.id}
                          checked={singleCat.isChecked}
                          onChange={(event) => handleCheckboxChange(event, singleCat.id)}
                      />
                  </TableCell>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleCat.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleCat.services?.length ?? 0}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: singleCat.status === 'active' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleCat.status}
                    </TableCell>
                    <TableCell
                    >
                     <ActiveDeactiveSwitch id={singleCat.id} apiUrl='/updateServicesCategoryStatus' status={singleCat.status} onStatusChange={handleStatusChange} />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleToggleEditForm(singleCat.id,singleCat.title)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleCat.id} url='/deleteServicesCategory' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Categories
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

export default MasterCategoriesPage;