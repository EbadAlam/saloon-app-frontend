import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import AdminLayout from "../Layout/Layout";
import Loader from "../../Loader/Loader";
import axiosClient from "../../../axios-client";
import ActiveDeactiveSwitch from "../../ActiveDeactiveSwitch/ActiveDeactiveSwitch";
import DeleteButton from "../../DeleteButton/DeleteButton";
import { useSnackbar } from "../../../contexts/SnackBarContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../routes";

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  nav: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    border: "1px solid #1a1a2e",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  sep: { color: "#bbb", fontSize: "13px" },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  cancelBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden",
  },
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8",
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0",
  },
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a",
  },
  badgeDisabled: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#fcebeb",
    color: "#791f1f",
  },
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
  saveBtn: {
    marginTop: "16px",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
};

function Servicespage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [eta, setEta] = useState("");
  const [gender, setGender] = useState("");
  const [currency, setCurrency] = useState("PKR");
  const [serviceId, setServiceId] = useState("");
  const { showSnackbar } = useSnackbar();
  const { storeId } = useParams();
  const genderOptions = ["male", "female"];
  const etaOptions = [
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 15 minutes",
    "1 hour 30 minutes",
    "1 hour 45 minutes",
    "2 hours",
  ];

  useEffect(() => {
    fetchServices();
    fetchStoreCategories();
  }, []);

  const fetchStoreCategories = async () => {
    try {
      const { data } = await axiosClient.get(`/getStoreCategories/${storeId}`);
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getServices/${storeId}`);
      setServices(data.services);
      setStoreName(data.storeName);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategoryId("");
    setPrice("");
    setEta("");
    setGender("");
    setServiceId("");
    setCurrency("PKR");
  };

  const handleToggleForm = () => {
    resetForm();
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/addServices`, {
        store_id: storeId,
        title,
        service_category_id: categoryId,
        price,
        eta,
        gender,
        currency,
        serviceId,
      });
      setServices(data.services);
      showSnackbar(data.message || "Service saved", "success");
    } catch (error) {
      console.error("Failed to save service:", error);
      showSnackbar("Failed to save service", "error");
    } finally {
      setLoading(false);
      setShowForm(false);
      resetForm();
    }
  };

  const handleStatusChange = (newStatus) => {
    showSnackbar(newStatus.message, newStatus.success ? "success" : "error");
    fetchServices();
  };

  const handleToggleEditForm = (service) => {
    setTitle(service.title);
    setCategoryId(service.category.id);
    setPrice(service.price);
    setEta(service.eta);
    setGender(service.gender);
    setServiceId(service.id);
    setShowForm(true);
  };

  const isActive = (s) => s.status === "active" && s.is_active_by_admin == 1;

  return (
    <AdminLayout>
      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <div style={S.nav}>
            <button style={S.backBtn} onClick={() => window.history.back()}>
              <ArrowBackIcon style={{ fontSize: 14 }} /> Back
            </button>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.adminStores} style={S.crumb}>
              Stores
            </Link>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>
              {storeName || "..."}
            </Link>
            <span style={S.sep}>›</span>
            <span style={S.crumbActive}>Services</span>
          </div>
          <button
            style={showForm ? S.cancelBtn : S.addBtn}
            onClick={handleToggleForm}
          >
            {showForm ? "Cancel" : "+ Add Service"}
          </button>
        </div>

        {showForm && (
          <div style={S.form}>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <TextField
                  fullWidth
                  label="Service Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="small"
                />

                <FormControl fullWidth size="small">
                  <InputLabel id="cat-label">Service Category</InputLabel>
                  <Select
                    labelId="cat-label"
                    value={categoryId}
                    label="Service Category"
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    {categories
                      ?.filter((c) => c.category.status === "active")
                      .map((c) => (
                        <MenuItem key={c.id} value={c.category.id}>
                          {c.category.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currency}
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  select
                  fullWidth
                  label="Estimated Time"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  required
                  size="small"
                >
                  {etaOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>

                <FormControl fullWidth size="small">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {genderOptions.map((o) => (
                      <MenuItem key={o} value={o}>
                        {o.charAt(0).toUpperCase() + o.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <button type="submit" style={S.saveBtn}>
                {serviceId ? "Update Service" : "Save Service"}
              </button>
            </form>
          </div>
        )}
        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                {[
                  "#",
                  "Title",
                  "Category",
                  "ETA",
                  "Price",
                  "Gender",
                  "Status",
                  "Toggle",
                  "Edit",
                  "",
                ].map((h) => (
                  <th key={h} style={S.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services && services.length > 0 ? (
                services.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{ background: i % 2 === 0 ? "#fff" : "#fafaf8" }}
                  >
                    <td style={S.tdNum}>{i + 1}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{s.title}</td>
                    <td style={S.td}>{s.category.title}</td>
                    <td style={S.td}>{s.eta}</td>
                    <td style={S.td}>
                      {s.currency} {s.price}
                    </td>
                    <td
                      style={{ ...S.td, color: s.gender ? "#1a1a2e" : "#aaa" }}
                    >
                      {s.gender
                        ? s.gender.charAt(0).toUpperCase() + s.gender.slice(1)
                        : "—"}
                    </td>
                    <td style={S.td}>
                      <span
                        style={isActive(s) ? S.badgeActive : S.badgeDisabled}
                      >
                        {s.status === "active" && s.is_active_by_admin == 1
                          ? "Active"
                          : s.is_active_by_admin != 1
                            ? "Disabled by admin"
                            : "Inactive"}
                      </span>
                    </td>
                    <td style={S.td}>
                      {s.is_active_by_admin == 1 && (
                        <ActiveDeactiveSwitch
                          id={s.id}
                          apiUrl="/updateServicesStatus"
                          status={s.status}
                          onStatusChange={handleStatusChange}
                        />
                      )}
                    </td>
                    <td style={S.td}>
                      <button
                        style={S.editBtn}
                        onClick={() => handleToggleEditForm(s)}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={S.td}>
                      <DeleteButton
                        id={s.id}
                        url="/deleteServices"
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    style={{
                      ...S.td,
                      textAlign: "center",
                      color: "#aaa",
                      padding: "32px",
                    }}
                  >
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Servicespage;
