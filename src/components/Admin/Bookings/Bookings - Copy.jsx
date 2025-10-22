import React, { useEffect, useState } from 'react';
import {
  Typography,
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
  Alert
} from '@mui/material';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import BackButton from '../../BackButton/BackButton';
import DummyImage from '../../DummyImage/DummyImage';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function AdminBookingsPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { showSnackbar } = useSnackbar();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  useEffect(() => {
      if (alertMessage) {
        showSnackbar(alertMessage, alertMessageType)
      }
    }, [alertMessage]);
  useEffect(() => {
    fetchStoreBookings();
  }, []);
  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBooking/${storeId}`);
      setBookings(data.bookings);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
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
      fetchStoreBookings();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

      return () => clearTimeout(timer);
  };
  const handleStatusChangeStatus = async (id, newStatus) => {
      setLoading(true);
      try {
        const payload = {
          status:newStatus,
        }
        const { data } = await axiosClient.put(`/updateBookingStatus/${id}`,payload);
        setLoading(false);
        handleStatusChange(data);
      } catch (error) {
        console.error('Error updating user status ',error);
        setLoading(false);
      }
    };
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Bookings</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
            </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="Bookings Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
              </TableRow>
            </TableHead>
             {bookings && bookings.length > 0 ? (
              bookings.map((singleBooking,index) => (
                <>
                  <TableBody key={index+1}>
                    <TableCell component="tr" align="left" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {singleBooking.user.username}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {singleBooking.user.email}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {singleBooking.service.title}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {singleBooking.service.eta}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {singleBooking.worker ? singleBooking.worker.username : '---'}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {new Date(singleBooking.booking_date + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      {new Date(`1970-01-01T${singleBooking.booking_time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </TableCell>
                    {/* <TableCell component="tr" scope="row">
                      {singleBooking.status}
                    </TableCell> */}
                    <TableCell
                      sx={{
                        color: singleBooking.status === 'pending' ? '#ff7800' : singleBooking.status === 'completed' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleBooking.status}
                    </TableCell>
                    <TableCell component="tr" scope="row">
                      <Select
                        defaultValue={singleBooking.status}
                        onChange={(e) => handleStatusChangeStatus(singleBooking.id, e.target.value)}
                      >

                        {['pending', 'cancelled', 'completed'].map(status => (
                          <MenuItem
                            key={status}
                            value={status}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Bookings
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default AdminBookingsPage;