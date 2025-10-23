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
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import BackButton from '../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function WorkingHoursPage() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [loading, setLoading] = useState(true);
  const [workingHours, setWorkingHours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { storeId } = useParams();
  useEffect(() => {
    fetchWorkingHours();
  }, []);
  const fetchWorkingHours = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getStoreTimings/${storeId}`);
      // console.log('timings ',data.timings);
      setWorkingHours(data.timings);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setFormData({
        day: '',
        startTime: '',
        endTime: '',
        store_id: storeId,
        isClosed: true,
        id:'',
      });
    setShowForm((prev) => !prev);
  };
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const handleStatusChange = (newStatus) => {
    setAlertMessage(newStatus.message);
    if(newStatus.success){
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    fetchWorkingHours();
    const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);

      return () => clearTimeout(timer);
  };
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    store_id: storeId,
    isClosed: true,
    id:'',
  });

  const handleChange = (field) => (event) => {
    const value = field === 'isClosed' ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/addStoreTimings',formData);
      setWorkingHours(data.timings);
      showAlert('success',data.message || 'Working hour saved');
      setFormData({
        day: '',
        startTime: '',
        endTime: '',
        store_id: storeId,
        isClosed: true,
        id:'',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save timings:', error);
    } finally {
      setLoading(false);
    }
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
  const handleToggleEditForm = (workingHouor) => {
    setFormData({
      day: workingHouor.day,
      startTime: workingHouor.start_time,
      endTime: workingHouor.end_time,
      isClosed: workingHouor.is_closed,
      store_id: storeId,
      id:workingHouor.id,
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
        <Stack className='btn_heads' direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Working Hours</Typography>
           <Stack direction="row" gap={2}>
            <BackButton />
            <Button className='dark-btn' variant="contained" onClick={handleToggleForm}>
              {showForm ? 'Cancel' : 'Add/Edit Working Hours'}
            </Button>
          </Stack>
        </Stack>

        {showForm && (
           <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
            >
              {formData.id ? (
                <TextField
                  select
                  label="Day"
                  value={formData.day}
                  onChange={handleChange('day')}
                  fullWidth
                  margin="normal"
                  required
                >
                  {daysOfWeek
                    .map(day => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                  ))}

                </TextField>
              ) : (
                <TextField
                  select
                  label="Day"
                  value={formData.day}
                  onChange={handleChange('day')}
                  fullWidth
                  margin="normal"
                  required
                >
                  {daysOfWeek
                    .filter(day => !workingHours.some(wh => wh.day === day))
                    .map(day => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                  ))}

                </TextField>
              )}
              

      <TextField
        label="Start Time"
        type="time"
        value={formData.startTime}
        onChange={handleChange('startTime')}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
        required={!formData.isClosed}
      />

      <TextField
        label="End Time"
        type="time"
        value={formData.endTime}
        onChange={handleChange('endTime')}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
        required={!formData.isClosed}
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.isClosed}
            onChange={handleChange('isClosed')}
            color="primary"
          />
        }
        label={formData.isClosed ? 'Open' : 'Closed'}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
        )}
        <TableContainer sx={{ maxWidth: 800 }} component={Paper}>
          <Table aria-label="Services Categories Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Day</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">End Time</TableCell>
                <TableCell align="right">Closed</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
             {workingHours && workingHours.length > 0 ? (
              workingHours.map((singleHour,index) => (
                <>
                  <TableBody>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleHour.day}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {singleHour.start_time_formatted}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {singleHour.end_time_formatted}
                    </TableCell>
                    <TableCell
                        align="right"
                        sx={{
                          color: singleHour.is_closed === 'active' ? 'green' : 'red',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      >
                      {singleHour.is_closed === 'active' ? 'Open' : 'Closed'}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      <ActiveDeactiveSwitch id={singleHour.id} apiUrl="/updateStoreTimingsIsClosed" status={singleHour.is_closed} onStatusChange={handleStatusChange} label={singleHour.is_closed === 'active' ? 'Close' : 'Open'} />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleToggleEditForm(singleHour)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleHour.id} url='/deleteStoreTiming' onStatusChange={handleStatusChange} />
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Working Hours
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default WorkingHoursPage;