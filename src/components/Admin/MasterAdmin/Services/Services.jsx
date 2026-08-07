import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { ROUTES } from '../../../../routes';
import ActiveDeactiveSwitchMaster from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1000px' },
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
};

function MasterServicesPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [highlightId, setHighlightId] = useState(location.state?.highlightId ?? '');
  const highlightedRef = useRef(null);
  const [services, setServices] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllServices?page=${page}`);
      setServices(data.services.data);
      setPagination({
        current_page: data.services.current_page,
        last_page: data.services.last_page,
        total: data.services.total,
      });
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchServices(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId('');
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, services]);

  const handleStatusChange = (newStatus, fetch = true) => {
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchServices();
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
          <h5 style={S.title}>Services</h5>
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
                <th style={S.th}>Store Name</th>
                <th style={S.th}>Price</th>
                <th style={S.th}>ETA</th>
                <th style={S.th}>Category</th>
                <th style={S.th}>Gender (If specific)</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Status</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services && services.length > 0 ? (
                services.map((singleSer, index) => (
                  <tr
                    key={singleSer.id}
                    ref={singleSer.id === highlightId ? highlightedRef : null}
                    style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}
                  >
                    <td style={S.tdNum}>{index + 1}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{singleSer.title}</td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.getStoreFrontPage(singleSer.store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={S.linkText}
                      >
                        {singleSer.store?.title}
                      </Link>
                    </td>
                    <td style={S.td}>{singleSer.currency} {singleSer.price}</td>
                    <td style={S.td}>{singleSer.eta}</td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.masterAdminServicesCategories}
                        state={{ highlightId: singleSer.category?.id }}
                        style={S.linkText}
                      >
                        {singleSer.category?.title}
                      </Link>
                    </td>
                    <td style={S.td}>{singleSer.gender ?? '-'}</td>
                    <td style={S.td}>
                      <span
                        style={{
                          ...S.statusText,
                          color: singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? '#27500a' : '#791f1f',
                        }}
                      >
                        {singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'active' : singleSer.is_active_by_admin != 1 ? 'Disabled by admin' : ""}
                      </span>
                    </td>
                    <td style={S.td}>
                      <ActiveDeactiveSwitchMaster id={singleSer.id} apiUrl='/updateStatusMaster' status={singleSer.is_active_by_admin} model={'Service'} onStatusChange={handleStatusChange} />
                    </td>
                    <td style={S.td}>
                      <DeleteButton id={singleSer.id} url='/deleteServices' onStatusChange={handleStatusChange} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Services
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

export default MasterServicesPage;