import React, { useEffect, useState } from "react";
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
  Pagination,
} from "@mui/material";
import axiosClient from "../../../../axios-client";
import AdminLayout from "../../Layout/Layout";
import Loader from "../../../Loader/Loader";
import BackButton from "../../../BackButton/BackButton";
import ActiveDeactiveSwitch from "../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch";
import DeleteButton from "../../../DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { useSnackbar } from "../../../../contexts/SnackBarContext";

function MasterInqueriesPage() {
  const [loading, setLoading] = useState(true);
  const [inqueries, setInqueries] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessageType, setAlertMessageType] = useState("");
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  useEffect(() => {
    fetchInqueries();
  }, []);
  const fetchInqueries = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllInqueries?page=${page}`);
      setInqueries(data.inqueries.data);
      setPagination({
        current_page: data.inqueries.current_page,
        last_page: data.inqueries.last_page,
        total: data.inqueries.total,
      });
    } catch (error) {
      console.error("Failed to fetch inqueries:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchInqueries(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleStatusChange = (newStatus, fetch = true) => {
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType("success");
    } else {
      setAlertMessageType("error");
    }
    if (fetch) {
      fetchInqueries();
    }
    const timer = setTimeout(() => {
      setAlertMessage("");
      setAlertMessageType("");
    }, 3000);

    return () => clearTimeout(timer);
  };
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Inqueries</Typography>
          <Stack direction="row" gap={2}>
            <BackButton />
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="Reviews Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Files Attach</TableCell>
              </TableRow>
            </TableHead>
            {inqueries && inqueries.length > 0 ? (
              inqueries.map((singleInquery, index) => (
                <>
                  <TableBody key={index + 1}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: singleInquery.user?.id }}
                      >
                        {singleInquery.user?.username}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleInquery.user?.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleInquery.topic}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {JSON.parse(singleInquery?.files).length ?? 0}
                    </TableCell>
                    {/*<TableCell component="th" scope="row">
                      {singleReview.review}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {singleReview.rating}
                    </TableCell>
                     <TableCell component="th" scope="row">
                      {singleReview.reviewee?.username ?
                        <Link
                          to={ROUTES.masterAdminUsers}
                          state={{ highlightId: singleReview.reviewee?.id }}
                        >
                          {singleReview.reviewee?.username}
                        </Link>
                      : '-'}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: singleReview.status === 'active' ? 'green' : 'red',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {singleReview.status}
                    </TableCell>
                    <TableCell>
                     <ActiveDeactiveSwitch id={singleReview.id} apiUrl='/updateReviewStatus' status={singleReview.status} onStatusChange={handleStatusChange} />
                    </TableCell>
                    <TableCell>
                     <DeleteButton id={singleReview.id} url='/deleteReview' onStatusChange={handleStatusChange} />
                    </TableCell> */}
                  </TableBody>
                </>
              ))
            ) : (
              <TableBody>
                <TableCell align="center">No Inqueries</TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: "10px" }}>
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

export default MasterInqueriesPage;
