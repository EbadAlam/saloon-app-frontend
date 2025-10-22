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
  Box,
} from '@mui/material';
import Loader from '../../Loader/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import axiosClient from '../../../axios-client';
import AdminLayout from '../../Admin/Layout/Layout';
import StarRating from '../../StarRating/StarRating';
import { useParams } from 'react-router-dom';
import BackButton from '../../BackButton/BackButton';

function AdminReviewsPage() {
  const { user, formatDate } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { storeId } = useParams();
  useEffect(() => {
    const fetchWorkersReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getWorkerReviews/${storeId}`);
        setReviews(data.reviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkersReviews();
  }, [user.id]);
  
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Reviews</Typography>
          <BackButton />
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="Services Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
             {reviews && reviews.length > 0 ? (
              reviews.map((singleReview,index) => (
                <>
                  <TableBody key={singleReview.id}>
                    <TableCell align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleReview.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleReview.review}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center" gap={1}>
                        {singleReview.rating}
                        <StarRating rating={singleReview.rating} />
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleReview.reviewer.username}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleReview.reviewee?.username ?? '-'}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {formatDate(singleReview.reviewed_at)}
                    </TableCell>
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">
                  No Reviews
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default AdminReviewsPage;