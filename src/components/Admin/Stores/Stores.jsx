import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/Layout";
import { useAuth } from "../../../contexts/AuthContext";
import axiosClient from "../../../axios-client";
import Loader from "../../Loader/Loader";
import Cards from "../Cards/Cards";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorIcon from "@mui/icons-material/Error";
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { useSnackbar } from "../../../contexts/SnackBarContext";

function Stores() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  useEffect(() => {
  if (stores && stores.length === 1) {
    navigate(ROUTES.getAdminSingleStore(stores[0].id));
  }
}, [stores]);
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
        {stores && stores.length > 1 ? (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "16px",
      paddingTop: "8px",
    }}
  >
    {stores.map((singleStore) => (
      <div
        key={singleStore.id}
        style={{
          background: "#fff",
          border: "0.5px solid #e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Thumbnail */}
        {singleStore.thumbnail ? (
          <img
            src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`}
            alt="Thumbnail"
            style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 140,
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: 13,
            }}
          >
            No Thumbnail
          </div>
        )}

        {/* Body */}
        <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>{singleStore.title}</p>

          <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#666" }}>
            <span>{singleStore.store_leads_count} store leads</span>
            <span>{singleStore.whatsapp_leads_count} WhatsApp leads</span>
          </div>

          {/* Status badge */}
          {singleStore.is_active_by_admin != 1 ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: "#FCEBEB", color: "#A32D2D" }}>
              <ErrorIcon sx={{ fontSize: 13 }} /> Deactivated by admin
            </span>
          ) : singleStore.status != "active" ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: "#FAEEDA", color: "#854F0B" }}>
              <AccessTimeIcon sx={{ fontSize: 13 }} /> Pending approval
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6, background: "#EAF3DE", color: "#3B6D11" }}>
              <CircleIcon sx={{ fontSize: 10 }} /> Active
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "10px 16px", borderTop: "0.5px solid #e0e0e0" }}>
          <Link to={ROUTES.getAdminSingleStore(singleStore.id)} style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth sx={{ background: "#333333" }}>
            <EditIcon sx={{fontSize:"20px",marginRight:"5px"}} />
              Edit
            </Button>
          </Link>
          <Link to={ROUTES.getStoreFrontPage(singleStore.slug)} style={{ textDecoration: "none" }} target="_blank">
            <Button variant="outlined" fullWidth sx={{ border: "1px solid #333333", background:"transparent",marginTop:"10px", color:"#000" }}>
              <OpenInNewIcon sx={{fontSize:"20px",marginRight:"5px"}} />
              Preview
            </Button>
          </Link>
        </div>
      </div>
    ))}
  </div>
) : !stores || stores.length === 0 ? (
  <p style={{ marginTop: 16 }}>
    No stores yet.{" "}
    <NavLink to={ROUTES.adminStoresAdd} style={{ textDecoration: "underline", color: "inherit" }}>
      Add now
    </NavLink>
  </p>
) : null /* single store = redirected via useEffect */}
      </div>
    </AdminLayout>
  );
}

export default Stores;
