import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Pagination } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import DummyImage from '../../../DummyImage/DummyImage';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { ROUTES } from '../../../../routes';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import ReloadButton from '../../../ReloadButton/ReloadButton';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  addBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px',
    borderRadius: '8px', background: '#1a1a2e', color: '#fff', border: 'none',
    fontSize: '13px', cursor: 'pointer', fontWeight: 500,
  },
  form: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', padding: '20px', marginBottom: '20px' },
  formTitle: { fontSize: '15px', fontWeight: 600, color: '#1a1a2e', marginBottom: '14px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' },
  input: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', boxSizing: 'border-box',
  },
  select: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', background: '#fff', color: '#1a1a2e', boxSizing: 'border-box',
  },
  uploadBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
    borderRadius: '8px', background: '#fff', color: '#1a1a2e', border: '1px solid #1a1a2e',
    fontSize: '13px', cursor: 'pointer', fontWeight: 500, marginBottom: '12px',
  },
  fileName: { fontSize: '12px', color: '#888', marginLeft: '10px' },
  saveBtn: {
    marginTop: '6px', padding: '9px 20px', borderRadius: '8px', background: '#1a1a2e',
    color: '#fff', border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 500,
  },
  toolbarRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: '32px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px',
  },
  bulkGroup: { display: 'flex', alignItems: 'center', gap: '10px', width: '260px' },
  applyBtn: {
    padding: '9px 18px', borderRadius: '8px', background: '#1a1a2e', color: '#fff',
    border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap',
  },
  filterGroup: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' },
  filterInput: {
    padding: '9px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', background: '#fff', color: '#1a1a2e', width: '160px', boxSizing: 'border-box',
  },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1100px' },
  th: {
    padding: '12px 14px', textAlign: 'left', color: '#888', fontWeight: 500, fontSize: '12px',
    textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #f0efe8', whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 14px', color: '#1a1a2e', fontSize: '13px', borderBottom: '0.5px solid #f5f4f0', verticalAlign: 'middle',
  },
  tdNum: { padding: '12px 14px', color: '#aaa', fontSize: '12px', borderBottom: '0.5px solid #f5f4f0' },
  badge: {
    display: 'inline-block', padding: '2px 8px', borderRadius: '999px', fontSize: '10px',
    fontWeight: 500, marginLeft: '8px',
  },
  badgeVerified: { background: '#eaf3de', color: '#27500a' },
  badgeUnverified: { background: '#f0efe8', color: '#888' },
  statusText: { fontWeight: 600, fontSize: '12px', textTransform: 'capitalize' },
  editBtn: {
    padding: '5px 14px', borderRadius: '7px', background: '#1a1a2e', color: '#fff',
    border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
  },
  avatarImg: { width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' },
  storeLink: { display: 'block', color: '#1a1a2e', fontSize: '12px', textDecoration: 'underline' },
};

function UsersPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [highlightId, setHighlightId] = useState(location.state?.highlightId ?? '');
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  const highlightedRef = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    name: '', designation: '', email: '', role: '', password: '',
    profileImage: null, id: null, allowed_store: 1, store_id: null,
  });

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('active');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axiosClient.get('/getStoresAdmin/');
        setStores(data.stores);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    };
    fetchStores();
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllUsers?page=${page}`);
      setUsers(data.users.data);
      setPagination({
        current_page: data.users.current_page,
        last_page: data.users.last_page,
        total: data.users.total,
      });
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleForm = () => {
    setFormData({
      name: '', designation: '', email: '', role: '', password: '',
      profileImage: null, id: null, allowed_store: 1, store_id: null,
    });
    setShowForm((prev) => !prev);
  };

  const handleToggleEditForm = (singleUser) => {
    setFormData({
      id: singleUser.id,
      name: singleUser.username,
      role: singleUser.user_info?.role,
      designation: singleUser.user_info?.designation,
      email: singleUser.email,
      allowed_store: singleUser.user_info?.allowed,
      password: '',
      profileImage: null,
      store_id: null,
    });
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.name);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('designation', formData.designation);
      dataToSend.append('role', formData.role);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', formData.store_id);
      dataToSend.append('id', formData.id);
      dataToSend.append('allowed', formData.allowed_store);
      const { data } = await axiosClient.post(`/addEditUserAdmin`, dataToSend);
      if (data.success) {
        showAlert('success', formData.id ? 'User updated' : 'User added');
        fetchTeamMembers();
        setFormData({});
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to add members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus, fetch = true) => {
    showAlert(newStatus.success ? 'success' : 'error', newStatus.message);
    if (fetch) fetchTeamMembers();
  };

  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const payload = { status: newStatus };
      const { data } = await axiosClient.put(`/updateUserStatus/${id}`, payload);
      setLoading(false);
      handleStatusChange(data);
    } catch (error) {
      console.error('Error updating user status ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add('blink-highlight');
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove('blink-highlight');
        setHighlightId(null);
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, users]);

  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? u.user_info?.role === roleFilter : true;
    const matchesStatus = statusFilter ? u.account_status === statusFilter : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setUsers(users.map((u) => ({ ...u, isChecked })));
  };

  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;
    setUsers(users.map((u) => (u.id === userId ? { ...u, isChecked } : u)));
  };

  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  const handleApply = () => {
    if (selectedOption === 'delete') {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };

  const showAlert = (alertType, message) => {
    setAlertMessage(message);
    setAlertMessageType(alertType);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };

  const bulkActionFunction = async () => {
    const selectedIds = filteredUsers.filter((u) => u.isChecked).map((u) => u.id);
    if (selectedIds.length === 0) {
      showAlert('error', 'Select any user to update');
      return;
    }
    setLoading(true);
    try {
      const payload = { model: 'User', selectedIds, action: selectedOption };
      const { data } = await axiosClient.post('/bulkOptionPerform', payload);
      showAlert('success', data.message || 'Bulk action perform');
      fetchTeamMembers();
      setSelectAll(false);
      setSelectedOption('active');
      setUsers(users.map((u) => ({ ...u, isChecked: false })));
    } catch (error) {
      console.error('Error performing bulk options ', error);
    } finally {
      setLoading(false);
      setAlertOpen(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchTeamMembers(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AdminLayout>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete these users? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Cancel</Button>
          <Button color="error" onClick={bulkActionFunction} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Users</h5>
          <div style={S.headerActions}>
            <BackButton />
            <button style={S.addBtn} onClick={handleToggleForm}>
              {showForm ? 'Cancel' : '+ Add User'}
            </button>
          </div>
        </div>

        {showForm && (
          <div style={S.form}>
            <div style={S.formTitle}>Create Profile</div>
            <form onSubmit={handleFormSubmit}>
              <div style={S.formGrid}>
                <input
                  style={S.input}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                />
                <select style={S.select} name="role" value={formData.role || ''} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="owner">Owner</option>
                  <option value="customer">Customer</option>
                  <option value="worker">Worker</option>
                </select>

                {formData.role === 'worker' && (
                  <>
                    <input
                      style={S.input}
                      type="text"
                      placeholder="Designation"
                      name="designation"
                      value={formData.designation || ''}
                      onChange={handleChange}
                    />
                    {!formData.id && stores && stores.length > 0 && (
                      <select style={S.select} name="store_id" value={formData.store_id || ''} onChange={handleChange}>
                        <option value="">Select Store</option>
                        {stores.map((singleStore) => (
                          <option key={singleStore.id} value={singleStore.id}>
                            {singleStore.title}
                          </option>
                        ))}
                      </select>
                    )}
                  </>
                )}

                {formData.role === 'owner' && (
                  <input
                    style={S.input}
                    type="number"
                    placeholder="Allowed Store"
                    name="allowed_store"
                    value={formData.allowed_store || ''}
                    onChange={handleChange}
                  />
                )}

                <input
                  style={S.input}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                />

                {formData.id == null && (
                  <input
                    style={S.input}
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                  />
                )}
              </div>

              <div>
                <label style={S.uploadBtn}>
                  Upload Profile Image
                  <input type="file" name="profileImage" accept="image/*" hidden onChange={handleChange} />
                </label>
                {formData.profileImage && <span style={S.fileName}>Selected: {formData.profileImage.name}</span>}
              </div>

              <button type="submit" style={S.saveBtn}>
                Save User
              </button>
            </form>
          </div>
        )}

        <div style={S.toolbarRow}>
          <div style={S.bulkGroup}>
            <select style={S.select} value={selectedOption} onChange={handleOptionChange}>
              {['active', 'deactive', 'verify', 'suspend', 'delete'].map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button style={S.applyBtn} onClick={handleApply}>
              Save
            </button>
          </div>

          <div style={S.filterGroup}>
            <ReloadButton onReload={fetchTeamMembers} />
            <input
              style={S.filterInput}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select style={{ ...S.filterInput, width: '130px' }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">All Roles</option>
              <option value="owner">Owner</option>
              <option value="customer">Customer</option>
              <option value="worker">Worker</option>
            </select>
            <select style={{ ...S.filterInput, width: '130px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
              <option value="suspend">Suspend</option>
            </select>
          </div>
        </div>

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>
                  <input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} />
                </th>
                <th style={S.th}>#</th>
                <th style={S.th}>Username</th>
                <th style={S.th}>Email</th>
                <th style={S.th}>Profile Img</th>
                <th style={S.th}>Designation</th>
                <th style={S.th}>Store</th>
                <th style={S.th}>Allowed Stores</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Status</th>
                <th style={S.th}>Edit</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((singleUser, index) =>
                  singleUser?.user_info?.role !== 'master-admin' ? (
                    <tr
                      key={singleUser.id}
                      ref={singleUser.id === highlightId ? highlightedRef : null}
                      style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}
                    >
                      <td style={S.td}>
                        <input
                          className="allCheckboxes"
                          type="checkbox"
                          value={singleUser.id}
                          checked={!!singleUser.isChecked}
                          onChange={(event) => handleCheckboxChange(event, singleUser.id)}
                        />
                      </td>
                      <td style={S.tdNum}>{index + 1}</td>
                      <td style={{ ...S.td, fontWeight: 500 }}>{singleUser.username}</td>
                      <td style={S.td}>
                        {singleUser.email}
                        <span
                          style={{
                            ...S.badge,
                            ...(singleUser.email_verified == 'true' ? S.badgeVerified : S.badgeUnverified),
                          }}
                        >
                          {singleUser.email_verified == 'true' ? 'Verified' : 'Not Verified'}
                        </span>
                      </td>
                      <td style={S.td}>
                        {singleUser.user_info?.profile_image ? (
                          singleUser.user_info?.signup_platform == 'manual' ? (
                            <img
                              style={S.avatarImg}
                              src={`${process.env.REACT_APP_IMG_URL}/${singleUser.user_info.profile_image}`}
                              alt="Profile"
                            />
                          ) : (
                            <img style={S.avatarImg} src={singleUser.user_info.profile_image} alt="" />
                          )
                        ) : (
                          <DummyImage username={singleUser.username} />
                        )}
                      </td>
                      <td style={S.td}>
                        {singleUser?.user_info?.role == 'owner'
                          ? 'Owner'
                          : singleUser?.user_info?.role == 'customer'
                            ? 'Customer'
                            : singleUser?.user_info?.designation}
                      </td>
                      <td style={S.td}>
                        {singleUser?.user_info?.role === 'owner' ? (
                          singleUser.stores
                            ?.filter((store) => store.status === 'active')
                            .map((store) => (
                              <Link
                                key={store.id}
                                to={ROUTES.getStoreFrontPage(store.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={S.storeLink}
                              >
                                {store.title}
                              </Link>
                            ))
                        ) : singleUser?.user_info?.role === 'worker' &&
                          singleUser?.worker_store?.store?.status === 'active' ? (
                          <Link
                            to={ROUTES.getStoreFrontPage(singleUser.worker_store.store.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={S.storeLink}
                          >
                            {singleUser.worker_store.store.title}
                          </Link>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td style={S.td}>{singleUser?.user_info?.role == 'owner' ? singleUser.user_info?.allowed : 0}</td>
                      <td style={S.td}>
                        <span style={{ ...S.statusText, color: singleUser.account_status === 'active' ? '#27500a' : '#791f1f' }}>
                          {singleUser.account_status}
                        </span>
                      </td>
                      <td style={S.td}>
                        <select
                          style={S.select}
                          value={
                            ['active', 'deactive', 'suspend'].includes(singleUser.account_status)
                              ? singleUser.account_status
                              : 'active'
                          }
                          onChange={(e) => handleStatusChangeStatus(singleUser.id, e.target.value)}
                        >
                          {['active', 'deactive', 'suspend', singleUser.email_verified == 'false' && 'verify']
                            .filter(Boolean)
                            .map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td style={S.td}>
                        <button style={S.editBtn} onClick={() => handleToggleEditForm(singleUser)}>
                          Edit
                        </button>
                      </td>
                      <td style={S.td}>
                        <DeleteButton id={singleUser.id} url="/deleteTeamMember" onStatusChange={handleStatusChange} />
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan={12} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '16px' }}>
          <Pagination
            count={pagination.last_page}
            page={pagination.current_page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default UsersPage;