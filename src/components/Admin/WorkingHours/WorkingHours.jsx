import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import ActiveDeactiveSwitch from '../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { useSnackbar } from '../../../contexts/SnackBarContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../../../routes';

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
  nav: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid #1a1a2e", borderRadius: "8px", background: "#fff", color: "#1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  sep: { color: "#bbb", fontSize: "13px" },
  addBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  cancelBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "8px", background: "#fff", color: "#1a1a2e", border: "1px solid #1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  form: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", padding: "20px", marginBottom: "20px" },
  formTitle: { fontSize: "15px", fontWeight: 600, color: "#1a1a2e", marginBottom: "16px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" },
  saveBtn: { marginTop: "16px", padding: "8px 20px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  card: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "12px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #f0efe8" },
  td: { padding: "12px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  tdNum: { padding: "12px 14px", color: "#aaa", fontSize: "12px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  editBtn: { padding: "5px 14px", borderRadius: "7px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "12px", cursor: "pointer", fontWeight: 500 },
};

const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function WorkingHoursPage() {
  const [loading, setLoading] = useState(true);
  const [workingHours, setWorkingHours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [storeName, setStoreName] = useState('');
  const { showSnackbar } = useSnackbar();
  const { storeId } = useParams();

  const defaultForm = { day: '', startTime: '', endTime: '', store_id: storeId, isClosed: true, id: '' };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => { fetchWorkingHours(); }, []);

  const fetchWorkingHours = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getStoreTimings/${storeId}`);
      setWorkingHours(data.timings);
      setStoreName(data.storeName || '');
    } catch (error) {
      console.error('Failed to fetch timings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: field === 'isClosed' ? e.target.checked : e.target.value });
  };

  const handleToggleForm = () => {
    setFormData(defaultForm);
    setShowForm((prev) => !prev);
  };

  const handleToggleEditForm = (wh) => {
    setFormData({ day: wh.day, startTime: wh.start_time, endTime: wh.end_time, isClosed: wh.is_closed, store_id: storeId, id: wh.id });
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/addStoreTimings', formData);
      setWorkingHours(data.timings);
      showSnackbar(data.message || 'Working hours saved', 'success');
      setFormData(defaultForm);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save timings:', error);
      showSnackbar('Failed to save', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    showSnackbar(newStatus.message, newStatus.success ? 'success' : 'error');
    fetchWorkingHours();
  };

  const isOpen = (wh) => wh.is_closed === 'active';

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
            <span style={S.sep}>›</span>
            <Link to={ROUTES.adminStores} style={S.crumb}>Stores</Link>
            <span style={S.sep}>›</span>
            <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>{storeName || '...'}</Link>
            <span style={S.sep}>›</span>
            <span style={S.crumbActive}>Working Hours</span>
          </div>
          <button style={showForm ? S.cancelBtn : S.addBtn} onClick={handleToggleForm}>
            {showForm ? 'Cancel' : '+ Add Working Hours'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={S.form}>
            <div style={S.formTitle}>{formData.id ? 'Edit Hours' : 'Add Hours'}</div>
            <form onSubmit={handleFormSubmit}>
              <div style={S.grid2}>
                <TextField select label="Day" value={formData.day} onChange={handleChange('day')} fullWidth size="small" required>
                  {(formData.id ? daysOfWeek : daysOfWeek.filter(d => !workingHours.some(wh => wh.day === d))).map(day => (
                    <MenuItem key={day} value={day}>{day}</MenuItem>
                  ))}
                </TextField>

                <FormControlLabel
                  control={<Switch checked={formData.isClosed} onChange={handleChange('isClosed')} sx={{ '& .MuiSwitch-thumb': { background: '#1a1a2e' }, '& .Mui-checked+.MuiSwitch-track': { background: '#1a1a2e' } }} />}
                  label={<span style={{ fontSize: 13, color: '#555' }}>{formData.isClosed ? 'Open' : 'Closed'}</span>}
                />

                <TextField label="Start Time" type="time" value={formData.startTime} onChange={handleChange('startTime')} fullWidth size="small" InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} required={!formData.isClosed} />
                <TextField label="End Time"   type="time" value={formData.endTime}   onChange={handleChange('endTime')}   fullWidth size="small" InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }} required={!formData.isClosed} />
              </div>
              <button type="submit" style={S.saveBtn}>Save</button>
            </form>
          </div>
        )}

        {/* Table */}
        <div style={{ ...S.card, maxWidth: 900 }}>
          <table style={S.table}>
            <thead>
              <tr>
                {['#','Day','Start Time','End Time','Status','Toggle','Edit',''].map(h => (
                  <th key={h} style={{ ...S.th, textAlign: h === '#' || h === 'Day' ? 'left' : 'center' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workingHours.length > 0 ? workingHours.map((wh, i) => (
                <tr key={wh.id}>
                  <td style={S.tdNum}>{i + 1}</td>
                  <td style={{ ...S.td, fontWeight: 500 }}>{wh.day}</td>
                  <td style={{ ...S.td, textAlign: 'center' }}>{wh.start_time_formatted || '—'}</td>
                  <td style={{ ...S.td, textAlign: 'center' }}>{wh.end_time_formatted || '—'}</td>
                  <td style={{ ...S.td, textAlign: 'center' }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, background: isOpen(wh) ? "#eaf3de" : "#fcebeb", color: isOpen(wh) ? "#27500a" : "#791f1f" }}>
                      {isOpen(wh) ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td style={{ ...S.td, textAlign: 'center' }}>
                    <ActiveDeactiveSwitch id={wh.id} apiUrl="/updateStoreTimingsIsClosed" status={wh.is_closed} onStatusChange={handleStatusChange} label={isOpen(wh) ? 'Close' : 'Open'} />
                  </td>
                  <td style={{ ...S.td, textAlign: 'center' }}>
                    <button style={S.editBtn} onClick={() => handleToggleEditForm(wh)}>Edit</button>
                  </td>
                  <td style={{ ...S.td, textAlign: 'center' }}>
                    <DeleteButton id={wh.id} url='/deleteStoreTiming' onStatusChange={handleStatusChange} />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>No working hours added</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default WorkingHoursPage;