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
  Select,
  MenuItem,
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
import { Link, useLocation } from 'react-router-dom';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import { ROUTES } from '../../../../routes';

function MasterBlogsPage() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const location = useLocation();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState('draft');
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const handleAlertClose = () => setAlertOpen(false);
  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBlogs?page=${page}`);
      setBlogs(data.blogs.data);
      setPagination({
        current_page: data.blogs.current_page,
        last_page: data.blogs.last_page,
        total: data.blogs.total,
      });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
      fetchBlogs(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
  const handleStatusChange = (newStatus,fetch = true) => {
    setAlertMessage(newStatus.message);
    if(newStatus.success){
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if(fetch){
      fetchBlogs();
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
  const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      setSelectAll(isChecked);
      const updatedBlogs = blogs.map(blog => {
          return { ...blog, isChecked };
      });

      setBlogs(updatedBlogs);
  };
  const handleCheckboxChange = (event, blogId) => {
    const isChecked = event.target.checked;


    const updatedBlogs = blogs.map(blog => {
        if (blog.id === blogId) {
            return { ...blog, isChecked };
        }
        return blog;
    });

    setBlogs(updatedBlogs);
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
      const selectedIds = blogs.filter(blog => blog.isChecked).map(blog => blog.id);
      if(selectedIds.length === 0) {
        showAlert('error','Select any blog to update');
      } else {
        setLoading(true);
        try {
          const payload = {
            model:'Blog',
            selectedIds,
            action:selectedOption,
          }
          const { data } = await axiosClient.post('/bulkOptionPerform',payload);
          showAlert('success',data.message || 'Bulk action perform');
          fetchBlogs();
        } catch (error) {
          console.error('Error performing bulk options ', error);
        } finally {
          setSelectAll(false);
          setBlogs(blogs.map(blog => ({ ...blog, isChecked: false })));
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
          <Typography variant="h4">Blogs</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
              <Link to={ROUTES.masterAdminBlogsAdd}>
                <Button variant="contained">
                  Add blog
                </Button>
              </Link>
            </Stack>
        </Stack>
        <Stack direction="row" justifyContent="start" gap="20px" alignItems="center" mb={2}>
          <Select
            defaultValue={selectedOption}
            sx={{width:'15%'}}
            onChange={handleOptionChange}
          >
            {['draft', 'published', 'delete'].map(status => (
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
        <TableContainer component={Paper}>
          <Table aria-label="Blogs Table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row"><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></TableCell>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
             {blogs && blogs.length > 0 ? (
              blogs.map((singleBlog,index) => (
                <>
                  <TableBody
                    key={singleBlog.id}
                  >
                    <TableCell component="td">
                      <input
                          className="allCheckboxes"
                          type="checkbox"
                          value={singleBlog.id}
                          checked={singleBlog.isChecked}
                          onChange={(event) => handleCheckboxChange(event, singleBlog.id)}
                      />
                  </TableCell>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBlog.title}
                    </TableCell>
                    <TableCell sx={{width:'200px'}} component="th" scope="row">
                      <img style={{width:'100%',borderRadius:'10px'}} src={`${process.env.REACT_APP_IMG_URL}/${singleBlog.thumbnail}`} alt="" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBlog.category}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {JSON.parse(singleBlog.tags).map(tag => `#${tag.trim()}`).join(" ")}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: singleBlog.status === 'published' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleBlog.status}
                    </TableCell>
                    <TableCell
                    >
                     <ActiveDeactiveSwitch id={singleBlog.id} apiUrl='/updateBlogStatus' status={singleBlog.status} onStatusChange={handleStatusChange} modal='blog' />
                    </TableCell>
                    <TableCell>
                      <Link to={ROUTES.getMasterAdminBlogsEdit(singleBlog.id)}>
                        <Button variant="contained">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleBlog.id} url='/deleteBlog' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Blogs
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

export default MasterBlogsPage;