import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/Layout";
import { useAuth } from "../../../contexts/AuthContext";
import axiosClient from "../../../axios-client";
import Loader from "../../Loader/Loader";
import Cards from "../Cards/Cards";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useSnackbar } from "../../../contexts/SnackBarContext";

function Stores() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location]);
  useEffect(() => {
    const payload = {
      user_id: user.id,
    };
    const fetchUserDetails = async () => {
      try {
        const { data } = await axiosClient.post(`/getStores`, payload);
        // console.log(data.stores);
        setStores(data.stores);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [user]);
  useEffect(() => {
    if (success) {
      showSnackbar(success, "success");
    }
  }, [success]);
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Typography variant="h3" gutterBottom>
          Stores
        </Typography>
        {stores &&
          stores.length > 0 &&
          stores.length < user.user_info.allowed && (
            <Button
              variant="contained"
              className="mb-2"
              sx={{ background: "#333333" }}
            >
              <NavLink to={ROUTES.adminStoresAdd} style={{ color: "white" }}>
                Add Store
              </NavLink>
            </Button>
          )}
        <TableContainer component={Paper}>
          <Table aria-label="Stores Table">
            <TableHead>
              <TableRow sx={{ background: "#d8a7b1" }}>
                <TableCell align="left" sx={{ color: "white" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white" }}>Store Name</TableCell>
                <TableCell sx={{ color: "white" }}>Thumbnail</TableCell>
                <TableCell sx={{ color: "white" }}>Store Leads</TableCell>
                <TableCell sx={{ color: "white" }}>Whatsapp Leads</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {stores && stores.length > 0 ? (
              stores.map((singleStore,index) => (
                <TableRow key={singleStore.id}>
                  <TableCell align="left">{index+1}</TableCell>
                  <TableCell scope="row">
                    {singleStore.title}
                  </TableCell>
                  <TableCell scope="row">
                    {singleStore.thumbnail ? (
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`}
                        alt="Thumbnail"
                        style={{
                          width: 200,
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      "No Thumbnail"
                    )}
                  </TableCell>
                  <TableCell scope="row">
                    {singleStore.store_leads_count} leads
                  </TableCell>
                  <TableCell scope="row">
                    {singleStore.whatsapp_leads_count} leads
                  </TableCell>
                  <TableCell
                  
                    scope="row"
                    sx={{ textTransform: "capitalize", fontWeight: "700" }}
                  >
                    {singleStore.is_active_by_admin != 1 ? (
                      <span
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <ErrorIcon />
                        Store deactive by admin
                      </span>
                    ) : singleStore.status != "active" ? (
                      <span
                        style={{
                          color: "#ffbc00",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <AccessTimeIcon />
                        (Waiting for approval by admin)
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <CircleIcon />
                        {singleStore.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell scope="row">
                    <Link
                      to={ROUTES.getAdminSingleStore(singleStore.id)}
                      style={{ color: "white" }}
                    >
                      <Button
                        sx={{ background: "#333333" }}
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableCell align="left">
                  No Stores.&nbsp;
                  <NavLink
                    to={ROUTES.adminStoresAdd}
                    style={{ textDecoration: "underline", color: "inherit" }}
                  >
                    Add Now
                  </NavLink>
                </TableCell>
            )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
}

export default Stores;
