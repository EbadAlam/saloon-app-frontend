import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
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
  servicesCell: { display: "flex", flexWrap: "wrap", gap: "4px", maxWidth: "260px" },
  serviceChip: {
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "999px",
    background: "#f0efe8",
    color: "#1a1a2e",
  },
  originalPrice: {
    color: "#aaa",
    textDecoration: "line-through",
    fontSize: "11px",
    marginRight: "6px",
  },
  helperText: { fontSize: "12px", color: "#888", marginTop: "4px" },
};

function Bundlespage() {
  const [loading, setLoading] = useState(true);
  const [bundles, setBundles] = useState([]);
  const [storeServices, setStoreServices] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceIds, setServiceIds] = useState([]);
  const [price, setPrice] = useState("");
  const [eta, setEta] = useState("");
  const [currency, setCurrency] = useState("PKR");
  const [bundleId, setBundleId] = useState("");
  const etaOptions = [
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 15 minutes",
    "1 hour 30 minutes",
    "1 hour 45 minutes",
    "2 hours",
  ];
  const { showSnackbar } = useSnackbar();
  const { storeId } = useParams();

  useEffect(() => {
    fetchBundles();
    fetchStoreServices();
  }, []);

  const fetchStoreServices = async () => {
    try {
      // Reusing the existing services endpoint from Servicespage rather than
      // guessing a new one — swap this if you have a dedicated route.
      const { data } = await axiosClient.get(`/getServices/${storeId}`);
      setStoreServices(data.services || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const fetchBundles = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBundles/${storeId}`);
      setBundles(data.bundles || []);
      setStoreName(data.storeName || "");
    } catch (error) {
      console.error("Failed to fetch bundles:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setServiceIds([]);
    setPrice("");
    setEta("");
    setBundleId("");
    setCurrency("PKR");
  };

  const handleToggleForm = () => {
    resetForm();
    setShowForm((prev) => !prev);
  };

  const originalTotal = storeServices
    .filter((s) => serviceIds.includes(s.id))
    .reduce((sum, s) => sum + Number(s.price || 0), 0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        service_ids: serviceIds,
        price,
        eta,
        currency,
        store_id:storeId,
      };

      if (bundleId) {
        await axiosClient.post(`/updateBundle/${bundleId}`, payload);
      } else {
        await axiosClient.post(`/addBundle`, payload);
      }

      showSnackbar(bundleId ? "Bundle updated" : "Bundle saved", "success");
      await fetchBundles();
    } catch (error) {
      console.error("Failed to save bundle:", error);
      showSnackbar("Failed to save bundle", "error");
    } finally {
      setLoading(false);
      setShowForm(false);
      resetForm();
    }
  };

  const handleStatusChange = (newStatus) => {
    showSnackbar(newStatus.message, newStatus.success ? "success" : "error");
    fetchBundles();
  };

  const handleToggleEditForm = (bundle) => {
    setTitle(bundle.title);
    setDescription(bundle.description || "");
    setServiceIds(bundle.services.map((s) => s.id));
    setPrice(bundle.price);
    setEta(bundle.eta || "");
    setBundleId(bundle.id);
    setShowForm(true);
  };

  const isActive = (b) => b.status === "active" && b.is_active_by_admin == 1;

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
            <span style={S.crumbActive}>Bundles</span>
          </div>
          <button
            style={showForm ? S.cancelBtn : S.addBtn}
            onClick={handleToggleForm}
          >
            {showForm ? "Cancel" : "+ Add Bundle"}
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
                  label="Bundle Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="small"
                />

                <FormControl fullWidth size="small">
                  <InputLabel id="services-label">Services Included</InputLabel>
                  <Select
                    labelId="services-label"
                    multiple
                    value={serviceIds}
                    label="Services Included"
                    onChange={(e) => setServiceIds(e.target.value)}
                    input={<OutlinedInput label="Services Included" />}
                    renderValue={(selected) =>
                      storeServices
                        .filter((s) => selected.includes(s.id))
                        .map((s) => s.title)
                        .join(", ")
                    }
                    required
                  >
                    {storeServices?.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        <Checkbox checked={serviceIds.includes(s.id)} />
                        <ListItemText
                          primary={s.title}
                          secondary={`${s.currency} ${s.price}`}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div>
                  <TextField
                    fullWidth
                    label="Bundle Price"
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
                  {serviceIds.length > 0 && (
                    <div style={S.helperText}>
                      Combined price of selected services: {currency}{" "}
                      {originalTotal}
                    </div>
                  )}
                </div>

                <TextField
                  select
                  fullWidth
                  label="Estimated Time"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  size="small"
                >
                  {etaOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  size="small"
                  multiline
                  minRows={2}
                  style={{ gridColumn: "1 / -1" }}
                />
              </div>

              <button type="submit" style={S.saveBtn}>
                {bundleId ? "Update Bundle" : "Save Bundle"}
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
                  "Services Included",
                  "Price",
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
              {bundles && bundles.length > 0 ? (
                bundles.map((b, i) => {
                  const originalSum = (b.services || []).reduce(
                    (sum, s) => sum + Number(s.price || 0),
                    0
                  );
                  return (
                    <tr
                      key={b.id}
                      style={{ background: i % 2 === 0 ? "#fff" : "#fafaf8" }}
                    >
                      <td style={S.tdNum}>{i + 1}</td>
                      <td style={{ ...S.td, fontWeight: 500 }}>{b.title}</td>
                      <td style={S.td}>
                        <div style={S.servicesCell}>
                          {(b.services || []).map((s) => (
                            <span key={s.id} style={S.serviceChip}>
                              {s.title}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={S.td}>
                        {originalSum > Number(b.price) && (
                          <span style={S.originalPrice}>
                            {b.currency} {originalSum}
                          </span>
                        )}
                        {b.currency} {b.price}
                      </td>
                      <td style={S.td}>
                        <span
                          style={isActive(b) ? S.badgeActive : S.badgeDisabled}
                        >
                          {b.status === "active" && b.is_active_by_admin == 1
                            ? "Active"
                            : b.is_active_by_admin != 1
                              ? "Disabled by admin"
                              : "Inactive"}
                        </span>
                      </td>
                      <td style={S.td}>
                        {b.is_active_by_admin == 1 && (
                          <ActiveDeactiveSwitch
                            id={b.id}
                            apiUrl="/updateBundleStatus"
                            status={b.status}
                            onStatusChange={handleStatusChange}
                          />
                        )}
                      </td>
                      <td style={S.td}>
                        <button
                          style={S.editBtn}
                          onClick={() => handleToggleEditForm(b)}
                        >
                          Edit
                        </button>
                      </td>
                      <td style={S.td}>
                        <DeleteButton
                          id={b.id}
                          url="/deleteBundle"
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      ...S.td,
                      textAlign: "center",
                      color: "#aaa",
                      padding: "32px",
                    }}
                  >
                    No bundles found
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

export default Bundlespage;