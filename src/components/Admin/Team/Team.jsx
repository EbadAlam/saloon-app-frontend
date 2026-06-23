import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import axiosClient from '../../../axios-client';
import DeleteButton from '../../DeleteButton/DeleteButton';
import DummyImage from '../../DummyImage/DummyImage';
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../contexts/SnackBarContext';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from '../../../routes';

// const badgeColors = ['#FFE5E5','#E5F4FF','#E8FFE5','#FFF4E5','#F3E5FF','#FFFBE5'];
const badgeColors = [
  '#CFFAFE', // Cyan
  '#FFE4E6', // Rose
  '#DBEAFE', // Blue
  '#DCFCE7', // Green
  '#FEF3C7', // Amber
  '#F3E8FF', // Purple
  '#FCE7F3', // Pink
  '#CCFBF1', // Teal
  '#E0F2FE', // Sky
  '#ECFCCB', // Lime
  '#FDE68A', // Yellow
  '#FEE2E2', // Red
  '#EDE9FE', // Violet
  '#D1FAE5', // Emerald
  '#FFEDD5', // Orange
  '#FAE8FF', // Fuchsia
];

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
  nav: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid #1a1a2e", borderRadius: "8px", background: "#fff", color: "#1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  pageTitle: { fontSize: "20px", fontWeight: 600, color: "#1a1a2e" },
  addBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  cancelBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", background: "#fff", color: "#1a1a2e", border: "1px solid #1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  form: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", padding: "20px", marginBottom: "20px" },
  formTitle: { fontSize: "15px", fontWeight: 600, color: "#1a1a2e", marginBottom: "16px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" },
  label: { fontSize: "12px", color: "#888", marginBottom: "6px", fontWeight: 500 },
  servicesBox: { border: "1px solid #e0dfd8", borderRadius: "8px", padding: "12px", display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "160px", overflowY: "auto" },
  serviceChipActive: { padding: "4px 12px", borderRadius: "20px", border: "1px solid #1a1a2e", background: "#1a1a2e", color: "#fff", cursor: "pointer", fontSize: "12px", userSelect: "none" },
  serviceChipInactive: { padding: "4px 12px", borderRadius: "20px", border: "1px solid #ddd", background: "transparent", color: "#555", cursor: "pointer", fontSize: "12px", userSelect: "none" },
  uploadBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 16px", borderRadius: "8px", background: "#fff", color: "#1a1a2e", border: "1px solid #1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500, marginBottom: "8px" },
  saveBtn: { marginTop: "16px", padding: "8px 20px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  card: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "12px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #f0efe8" },
  td: { padding: "12px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  tdNum: { padding: "12px 14px", color: "#aaa", fontSize: "12px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  badgeActive: { display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, background: "#eaf3de", color: "#27500a" },
  badgeInactive: { display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, background: "#fcebeb", color: "#791f1f" },
  editBtn: { padding: "5px 14px", borderRadius: "7px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "12px", cursor: "pointer", fontWeight: 500 },
  avatar: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover" },
};

function TeamsPage() {
  const { user } = useAuth();
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeServices, setStoreServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '', designation: '', email: '', gender: '', password: '', profileImage: null, id: '', services: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => { fetchTeamMembers(); }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const [teamRes, serviceRes] = await Promise.all([
        axiosClient.get(`/getTeamMember/${storeId}`),
        axiosClient.get(`/getServices/${storeId}`),
      ]);
      setTeamMembers(teamRes.data.store.workers);
      setStoreServices(serviceRes.data.services);
      setStoreName(teamRes.data.store.title);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setFormData({ name: '', designation: '', email: '', gender: '', password: '', profileImage: null, id: '', services: [] });

  const handleToggleForm = () => { resetForm(); setShowForm((prev) => !prev); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.name);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('designation', formData.designation);
      dataToSend.append('gender', formData.gender);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', storeId);
      dataToSend.append('id', formData.id);
      formData.services.forEach(id => dataToSend.append('services[]', id));
      const { data } = await axiosClient.post(`/addTeamMember`, dataToSend);
      setTeamMembers(data.store.workers);
      showSnackbar('Team member saved', 'success');
      resetForm();
    } catch (error) {
      console.error('Failed to save member:', error);
      showSnackbar('Failed to save member', 'error');
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const handleStatusChange = (newStatus, fetch = true) => {
    showSnackbar(newStatus.message, newStatus.success ? 'success' : 'error');
    if (fetch) fetchTeamMembers();
  };

  const handleToggleEditForm = (u, workerServices) => {
    setFormData({
      name: u.username, designation: u.user_info?.designation, email: u.email,
      profileImage: u.user_info?.profile_image, id: u.id, gender: u.user_info?.gender,
      services: workerServices.map(ws => ws.service_id),
    });
    setShowForm(true);
  };

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  return (
    <AdminLayout>
      {loading && <Loader />}
      <div style={S.page}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.nav}>
            <button style={S.backBtn} onClick={() => window.history.back()}>
              <ArrowBackIcon style={{ fontSize: 14 }} /> Back
            </button>
            <span style={{ color: "#bbb", fontSize: "13px" }}>›</span>
            <Link to={ROUTES.adminStores} style={S.crumb}>
              Stores
            </Link>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>
              {storeName || "..."}
            </Link>
            <span style={S.sep}>›</span>
            <span style={S.crumbActive}>Team Members</span>
          </div>
          <button style={showForm ? S.cancelBtn : S.addBtn} onClick={handleToggleForm}>
            {showForm ? "Cancel" : "+ Add Team Member"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={S.form}>
            <div style={S.formTitle}>{formData.id ? "Edit Member" : "Add Member"}</div>
            <form onSubmit={handleFormSubmit}>
              <div style={S.grid2}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} size="small" required />
                <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} size="small" />
                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} size="small" required />
                <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} size="small">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
                {!formData.id && (
                  <TextField fullWidth label="Password" name="password" type="text" value={formData.password} onChange={handleChange} size="small" required />
                )}
              </div>

              {/* Services */}
              <div style={{ marginBottom: "12px" }}>
                <div style={S.label}>Assign services <span style={{ color: "#bbb", fontWeight: 400 }}>(worker will only be bookable for selected services)</span></div>
                <div style={S.servicesBox}>
                  {storeServices.length === 0 && <span style={{ fontSize: "13px", color: "#aaa" }}>No services found</span>}
                  {storeServices.map(service => {
                    const isSelected = formData.services?.includes(service.id);
                    return (
                      <span key={service.id} style={isSelected ? S.serviceChipActive : S.serviceChipInactive} onClick={() => toggleService(service.id)}>
                        {service.title}
                      </span>
                    );
                  })}
                </div>
                {formData.services?.length === 0 && (
                  <span style={{ fontSize: "11px", color: "#aaa" }}>No services selected — worker will appear for all services</span>
                )}
              </div>

              {/* Upload */}
              <label style={S.uploadBtn}>
                Upload profile image
                <input type="file" name="profileImage" accept="image/*" hidden onChange={handleChange} />
              </label>
              {formData.profileImage?.name && (
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Selected: {formData.profileImage.name}</div>
              )}

              <div>
                <button type="submit" style={S.saveBtn}>{formData.id ? "Update Member" : "Save Member"}</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                {["#", "Name", "Email", "Services", "Photo", "Gender", "Designation", "Status", "Edit", ""].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.map((m, i) => (
                  <tr key={m.user?.id}>
                    <td style={S.tdNum}>{i + 1}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{m.user?.username}</td>
                    <td style={{ ...S.td, color: "#555" }}>{m.user?.email}</td>
                    <td style={S.td}>
                      {m.services?.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {m.services.map((ws, idx) => (
                            <span key={ws.service_id} style={{ padding: "2px 10px", borderRadius: "12px", background: badgeColors[Math.floor(Math.random() * badgeColors.length)], fontSize: "11px" }}>
                              {storeServices.find(s => s.id === ws.service_id)?.title ?? ws.service_id}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "#aaa" }}>All services</span>
                      )}
                    </td>
                    <td style={S.td}>
                      {m.user?.user_info?.profile_image ? (
                        <img
                          src={m.user.user_info.signup_platform === "manual"
                            ? `${process.env.REACT_APP_IMG_URL}/${m.user.user_info.profile_image}`
                            : m.user.user_info.profile_image}
                          alt="Profile"
                          style={S.avatar}
                        />
                      ) : (
                        <DummyImage username={m.user?.username} />
                      )}
                    </td>
                    <td style={S.td}>{m.user?.user_info?.gender ?? '—'}</td>
                    <td style={S.td}>{m.user?.user_info?.designation ?? '—'}</td>
                    <td style={S.td}>
                      <span style={m.user?.account_status === 'active' ? S.badgeActive : S.badgeInactive}>
                        {m.user?.account_status}
                      </span>
                    </td>
                    <td style={S.td}>
                      <button style={S.editBtn} onClick={() => handleToggleEditForm(m.user, m.services ?? [])}>Edit</button>
                    </td>
                    <td style={S.td}>
                      <DeleteButton id={m.user?.id} url='/deleteTeamMember' onStatusChange={handleStatusChange} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "32px" }}>No team members</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TeamsPage;