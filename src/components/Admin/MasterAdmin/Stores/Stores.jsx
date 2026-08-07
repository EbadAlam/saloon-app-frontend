import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import ActiveDeactiveSwitchMaster from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { ROUTES } from '../../../../routes';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1200px' },
  th: {
    padding: '12px 14px', textAlign: 'left', color: '#888', fontWeight: 500, fontSize: '12px',
    textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #f0efe8', whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 14px', color: '#1a1a2e', fontSize: '13px', borderBottom: '0.5px solid #f5f4f0', verticalAlign: 'middle',
  },
  tdNum: { padding: '12px 14px', color: '#aaa', fontSize: '12px', borderBottom: '0.5px solid #f5f4f0' },
  linkText: { color: '#1a1a2e', fontSize: '13px', fontWeight: 500, textDecoration: 'underline' },
  statusText: { fontWeight: 600, fontSize: '12px', textTransform: 'capitalize' },
  thumbnail: { width: '80px', height: '54px', objectFit: 'cover', borderRadius: '8px' },
};

function MasterStoresPage() {
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();
  const [stores, setStores] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllStores?page=${page}`);
      setStores(data.stores.data);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total,
      });
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchStores(page);
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
      fetchStores();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType)
    }
  }, [alertMessage]);

  return (
    <AdminLayout>
      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Stores</h5>
          <div style={S.headerActions}>
            <BackButton />
          </div>
        </div>

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>#</th>
                <th style={S.th}>Title</th>
                <th style={S.th}>Owner Name</th>
                <th style={S.th}>Thumbnail</th>
                <th style={S.th}>Type</th>
                <th style={S.th}>Categories</th>
                <th style={S.th}>Services</th>
                <th style={S.th}>Workers</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Approve Status</th>
                <th style={S.th}>Change Active Status</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stores && stores.length > 0 ? (
                stores.map((store, index) => (
                  <tr key={store.id} style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={S.tdNum}>{index + 1}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>
                      <Link
                        to={ROUTES.getStoreFrontPage(store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={S.linkText}
                      >
                        {store?.title}
                      </Link>
                    </td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: store.user?.id }}
                        style={S.linkText}
                      >
                        {store.user?.username}
                      </Link>
                    </td>
                    <td style={S.td}>
                      {store.thumbnail ? (
                        <img
                          style={S.thumbnail}
                          src={`${process.env.REACT_APP_IMG_URL}/${store.thumbnail}`}
                          alt=""
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td style={S.td}>{store.type}</td>
                    <td style={S.td}>{store.services_categories?.length ?? 0}</td>
                    <td style={S.td}>{store.services?.length ?? 0}</td>
                    <td style={S.td}>{store.workers?.length ?? 0}</td>
                    <td style={S.td}>
                      <span
                        style={{
                          ...S.statusText,
                          color: store.status === 'active' && store.is_active_by_admin == 1 ? '#27500a' : '#791f1f',
                        }}
                      >
                        {store.status === 'active' ? store.is_active_by_admin == 1 ? 'active' : store.is_active_by_admin != 1 ? 'Disabled by admin' : "" : 'Waiting for approval'}
                      </span>
                    </td>
                    <td style={S.td}>
                      <ActiveDeactiveSwitch
                        id={store.id}
                        apiUrl='/updateStatusApproveMaster'
                        status={store.status}
                        label={store.status == 'active' ? 'Approved' : 'Approve'}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                    <td style={S.td}>
                      <ActiveDeactiveSwitchMaster
                        id={store.id}
                        apiUrl='/updateStatusMaster'
                        status={store.is_active_by_admin}
                        model={'Store'}
                        label={store.is_active_by_admin == '1' ? 'Active' : 'Disabled'}
                        onStatusChange={handleStatusChange}
                      />
                    </td>
                    <td style={S.td}>
                      <DeleteButton id={store.id} url='/deleteStore' onStatusChange={handleStatusChange} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Stores
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

export default MasterStoresPage;