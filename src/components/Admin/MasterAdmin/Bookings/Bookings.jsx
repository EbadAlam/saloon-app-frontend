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
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes';

function MasterBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllBookings?page=${page}`);
      setBookings(data.bookings.data);
      setPagination({
        current_page: data.bookings.current_page,
        last_page: data.bookings.last_page,
        total: data.bookings.total,
      });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchBookings(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <Table aria-label="Reviews Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Store name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Service name</TableCell>
                <TableCell>Service Category</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
             {bookings && bookings.length > 0 ? (
              bookings.map((booking,index) => (
                <>
                  <TableBody key={index+1}>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link 
                        to={ROUTES.getStoreFrontPage(booking.store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {booking.store?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: booking.user?.id }}
                      >
                        {booking.user?.username}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminServices}
                        state={{ highlightId: booking.service?.id }}
                      >
                        {booking.service?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminServicesCategories}
                        state={{ highlightId: booking.service?.category?.id }}
                      >
                        {booking.service?.category?.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.service?.eta}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.booking_date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.booking_time}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.worker?.username ?
                        <Link
                          to={ROUTES.masterAdminUsers}
                          state={{ highlightId: booking.worker?.id }}
                        >
                          {booking.worker?.username}
                        </Link>
                      : '-'}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: booking.status === 'pending' ? 'chocolate' : booking.status == 'completed' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {booking.status}
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

export default MasterBookingsPage;