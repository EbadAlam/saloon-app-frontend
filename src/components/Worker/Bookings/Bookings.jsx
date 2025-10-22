import React, { useCallback, useEffect, useState } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import Loader from '../../Loader/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import axiosClient from '../../../axios-client';
import AdminLayout from '../../Admin/Layout/Layout';
import { useSnackbar } from '../../../contexts/SnackBarContext';

function WorkersBookingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [alertMessageType, setAlertMessageType] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const { showSnackbar } = useSnackbar();
  const [loader, setLoader] = useState();
  
  
  const fetchWorkersBookings = useCallback(async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getBooking/${user.worker_store.store_id}`);
        setBookings(data.bookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    },[user.worker_store.store_id]);
    useEffect(() => {
        fetchWorkersBookings();
    }, [fetchWorkersBookings]);
  const handleAssignYourself = async (bookingId) => {
    setAlertMessage('');
    setAlertMessageType('');
    setLoader(bookingId);
    try {
      const { data } = await axiosClient.post('/assignToMe', {
        booking_id: bookingId,
        worker_id: user.id,
      });
      setAlertMessage(data.message);
      setAlertMessageType(data.messageType);
    } catch (err) {
      console.error('Assignment failed', err);
    } finally {
      fetchWorkersBookings(); 
      setLoader();
    }
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
          <Typography variant="h4">Bookings</Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Time ETA</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Assign to you</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
             {bookings && bookings.length > 0 ? (
              bookings.map((singleBooking,index) => (
                <>
                  <TableBody key={singleBooking.id}>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBooking.service.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBooking.service.eta}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBooking.user.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(singleBooking.booking_date + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(`1970-01-01T${singleBooking.booking_time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {
                        singleBooking.worker ? (
                          <span style={{color: `${singleBooking.worker.id === user.id ? 'green' : 'red'}`}}>{singleBooking.worker.id === user.id ? 'Yes' : 'No'}</span>
                        ) : (
                          <>
                          {loader && loader === singleBooking.id ? (
                            <CircularProgress size="30px" />
                          ) : (
                              <p
                              style={{ cursor: 'pointer', color: '#007bff' }}
                              onClick={() => handleAssignYourself(singleBooking.id)}
                              >
                              Assign yourself
                            </p>
                          )}
                        </>
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleBooking.status}
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

export default WorkersBookingsPage;