import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import { ROUTES } from '../../../../routes';

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
  toolbarRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' },
  select: {
    padding: '9px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', background: '#fff', color: '#1a1a2e', width: '160px', boxSizing: 'border-box',
  },
  applyBtn: {
    padding: '9px 18px', borderRadius: '8px', background: '#1a1a2e', color: '#fff',
    border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap',
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
  statusText: { fontWeight: 600, fontSize: '12px', textTransform: 'capitalize' },
  thumbnail: { width: '110px', height: '68px', objectFit: 'cover', borderRadius: '8px' },
  tag: {
    display: 'inline-block', padding: '2px 8px', borderRadius: '999px', background: '#f0efe8',
    color: '#1a1a2e', fontSize: '11px', fontWeight: 500, marginRight: '4px', marginBottom: '4px',
  },
  editBtn: {
    padding: '5px 14px', borderRadius: '7px', background: '#1a1a2e', color: '#fff',
    border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
  },
};

function MasterBlogsPage() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState('draft');
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const handleAlertClose = () => setAlertOpen(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBlogs?page=${page}`);
      setBlogs(data.blogs.data);
      setPagination({
        current_page: data.blogs.current_page,
        last_page: data.blogs.last_page,
        total: data.blogs.total,
      });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = (newStatus, fetch = true) => {
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchBlogs();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

    return () => clearTimeout(timer);
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

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setBlogs(blogs.map((blog) => ({ ...blog, isChecked })));
  };

  const handleCheckboxChange = (event, blogId) => {
    const isChecked = event.target.checked;
    setBlogs(blogs.map((blog) => (blog.id === blogId ? { ...blog, isChecked } : blog)));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleApply = () => {
    if (selectedOption === 'delete') {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };

  const bulkActionFunction = async () => {
    const selectedIds = blogs.filter((blog) => blog.isChecked).map((blog) => blog.id);
    if (selectedIds.length === 0) {
      showAlert('error', 'Select any blog to update');
    } else {
      setLoading(true);
      try {
        const payload = {
          model: 'Blog',
          selectedIds,
          action: selectedOption,
        };
        const { data } = await axiosClient.post('/bulkOptionPerform', payload);
        showAlert('success', data.message || 'Bulk action perform');
        fetchBlogs();
      } catch (error) {
        console.error('Error performing bulk options ', error);
      } finally {
        setSelectAll(false);
        setBlogs(blogs.map((blog) => ({ ...blog, isChecked: false })));
        setLoading(false);
        setAlertOpen(false);
      }
    }
  };

  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType)
    }
  }, [alertMessage]);

  return (
    <AdminLayout>
      <Dialog open={alertOpen} onClose={handleAlertClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete these items? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Cancel</Button>
          <Button color="error" onClick={bulkActionFunction} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Blogs</h5>
          <div style={S.headerActions}>
            <BackButton />
            <Link to={ROUTES.masterAdminBlogsAdd} style={{ textDecoration: 'none' }}>
              <button style={S.addBtn}>+ Add blog</button>
            </Link>
          </div>
        </div>

        <div style={S.toolbarRow}>
          <select style={S.select} value={selectedOption} onChange={handleOptionChange}>
            {['draft', 'published', 'delete'].map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button style={S.applyBtn} onClick={handleApply}>
            Save
          </button>
        </div>

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>
                  <input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} />
                </th>
                <th style={S.th}>#</th>
                <th style={S.th}>Title</th>
                <th style={S.th}>Thumbnail</th>
                <th style={S.th}>Category</th>
                <th style={S.th}>Tags</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Status</th>
                <th style={S.th}>Edit</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogs && blogs.length > 0 ? (
                blogs.map((singleBlog, index) => (
                  <tr key={singleBlog.id} style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={S.td}>
                      <input
                        className="allCheckboxes"
                        type="checkbox"
                        value={singleBlog.id}
                        checked={!!singleBlog.isChecked}
                        onChange={(event) => handleCheckboxChange(event, singleBlog.id)}
                      />
                    </td>
                    <td style={S.tdNum}>{index + 1}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{singleBlog.title}</td>
                    <td style={S.td}>
                      <img style={S.thumbnail} src={`${process.env.REACT_APP_IMG_URL}/${singleBlog.thumbnail}`} alt="" />
                    </td>
                    <td style={S.td}>{singleBlog.category}</td>
                    <td style={S.td}>
                      {JSON.parse(singleBlog.tags).map((tag) => (
                        <span key={tag} style={S.tag}>#{tag.trim()}</span>
                      ))}
                    </td>
                    <td style={S.td}>
                      <span
                        style={{
                          ...S.statusText,
                          color: singleBlog.status === 'published' ? '#27500a' : '#791f1f',
                        }}
                      >
                        {singleBlog.status}
                      </span>
                    </td>
                    <td style={S.td}>
                      <ActiveDeactiveSwitch id={singleBlog.id} apiUrl='/updateBlogStatus' status={singleBlog.status} onStatusChange={handleStatusChange} modal='blog' />
                    </td>
                    <td style={S.td}>
                      <Link to={ROUTES.getMasterAdminBlogsEdit(singleBlog.id)}>
                        <button style={S.editBtn}>Edit</button>
                      </Link>
                    </td>
                    <td style={S.td}>
                      <DeleteButton id={singleBlog.id} url='/deleteBlog' onStatusChange={handleStatusChange} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Blogs
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

export default MasterBlogsPage;