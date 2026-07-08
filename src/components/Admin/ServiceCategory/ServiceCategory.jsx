import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import { ROUTES } from '../../../routes';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import { useSnackbar } from '../../../contexts/SnackBarContext';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
  nav: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid #1a1a2e", borderRadius: "8px", background: "#fff", color: "#1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  addServicesBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  sep: { color: "#bbb", fontSize: "13px" },
  tables: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" },
  card: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", overflow: "hidden", position: "relative" },
  cardTitle: { padding: "14px 16px", fontSize: "12px", fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #f0efe8" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "10px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: "12px", borderBottom: "1px solid #f0efe8" },
  thRight: { padding: "10px 14px", textAlign: "right", color: "#888", fontWeight: 500, fontSize: "12px", borderBottom: "1px solid #f0efe8" },
  td: { padding: "11px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0" },
  tdRight: { padding: "11px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0", textAlign: "right" },
  tdNum: { padding: "11px 14px", color: "#aaa", fontSize: "12px", borderBottom: "0.5px solid #f5f4f0" },
  saveBtn: (disabled) => ({ padding: "8px 20px", borderRadius: "8px", background: disabled ? "#ccc" : "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: disabled ? "not-allowed" : "pointer", fontWeight: 500 }),
};

function ServiceCategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [allCatLoading, setAllCatLoading] = useState(true);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [removeCategories, setRemoveCategories] = useState([]);
  const { storeId } = useParams();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCategories();
    fetchAllCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getServicesCategory/${storeId}`);
      setServiceCategories(data.categories || []);
      setStoreName(data.storeName || '');
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setAllCatLoading(true);
    try {
      const { data } = await axiosClient.get('/getAllCategories');
      setAllCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch all categories:', error);
    } finally {
      setAllCatLoading(false);
    }
  };

  const availableCategories = allCategories.filter(
    (cat) => !serviceCategories.some((sc) => sc.category_id === cat.id)
  );

  const handleAddCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleRemoveCheckboxChange = (categoryId) => {
    setRemoveCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSave = async () => {
    try {
      if (selectedCategories.length > 0) {
        await axiosClient.post(`/addCategoriesToStore/${storeId}`, { category_ids: selectedCategories });
      }
      if (removeCategories.length > 0) {
        await axiosClient.post(`/removeCategoriesFromStore/`, { ids: removeCategories });
      }
      await fetchCategories();
      setSelectedCategories([]);
      setRemoveCategories([]);
      showSnackbar("Changes saved successfully!", "success");
    } catch (error) {
      console.error('Error saving changes:', error);
      showSnackbar("Failed to save changes.", "error");
    }
  };

  const noChanges = selectedCategories.length === 0 && removeCategories.length === 0;

  return (
    <AdminLayout>
      <div style={S.page}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.nav}>
            <button style={S.backBtn} onClick={() => window.history.back()}>
              <ArrowBackIcon style={{ fontSize: 14 }} /> Back
            </button>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.adminStores} style={S.crumb}>Stores</Link>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>{storeName || "..."}</Link>
            <span style={S.sep}>›</span>
            <span style={S.crumbActive}>Service Categories</span>
          </div>
          {/* {serviceCategories.length > 0 && (
            <Link
              to={ROUTES.getAdminAddServices(storeId)}
              state={{ servicesCategories: serviceCategories }}
            >
              <button style={S.addServicesBtn}>Add Services</button>
            </Link>
          )} */}
        </div>

        {/* Two tables side by side */}
        <div style={S.tables}>

          {/* Store categories */}
          <div style={S.card}>
            <div style={S.cardTitle}>Store categories</div>
            {loading && <Loader />}
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Title</th>
                  <th style={S.thRight}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {serviceCategories.length > 0 ? (
                  serviceCategories.filter((c) => c.category.status == 'active').map((cat, i) => (
                    <tr key={cat.category_id}>
                      <td style={S.tdNum}>{i + 1}</td>
                      <td style={S.td}>{cat.category?.title} </td>
                      <td style={S.tdRight}>
                        <input
                          type="checkbox"
                          checked={removeCategories.includes(cat.id)}
                          onChange={() => handleRemoveCheckboxChange(cat.id)}
                          style={{ width: 15, height: 15, accentColor: "#1a1a2e", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "28px" }}>No categories</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Available categories */}
          <div style={S.card}>
            <div style={S.cardTitle}>Available categories</div>
            {allCatLoading && <Loader />}
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Title</th>
                  <th style={S.thRight}>Add</th>
                </tr>
              </thead>
              <tbody>
                {availableCategories.filter((c) => c.status === 'active').length > 0 ? (
                  availableCategories
                    .filter((c) => c.status === 'active')
                    .map((cat, i) => (
                      <tr key={cat.id}>
                        <td style={S.tdNum}>{i + 1}</td>
                        <td style={S.td}>{cat.title}</td>
                        <td style={S.tdRight}>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleAddCheckboxChange(cat.id)}
                            style={{ width: 15, height: 15, accentColor: "#1a1a2e", cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "28px" }}>No categories</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button style={S.saveBtn(noChanges)} onClick={handleSave} disabled={noChanges}>
          Save changes
        </button>
      </div>
    </AdminLayout>
  );
}

export default ServiceCategoriesPage;