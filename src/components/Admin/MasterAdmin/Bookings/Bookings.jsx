import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import { ROUTES } from '../../../../routes';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1150px' },
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
  typeBadge: {
    display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
    fontSize: '11px', fontWeight: 500, textTransform: 'capitalize',
  },
};

function MasterBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllBookings?page=${page}`);
      setBookings(data.bookings.data);
      setPagination({
        current_page: data.bookings.current_page,
        last_page: data.bookings.last_page,
        total: data.bookings.total,
      });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchBookings(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Bookings</h5>
          <div style={S.headerActions}>
            <BackButton />
          </div>
        </div>

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>#</th>
                <th style={S.th}>Store name</th>
                <th style={S.th}>Username</th>
                <th style={S.th}>Type</th>
                <th style={S.th}>Service / Bundle name</th>
                <th style={S.th}>Service Category</th>
                <th style={S.th}>ETA</th>
                <th style={S.th}>Date</th>
                <th style={S.th}>Time</th>
                <th style={S.th}>Worker</th>
                <th style={S.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking, index) => {
                  const isBundle = !!booking.bundle;
                  const bookedItem = isBundle ? booking.bundle : booking.service;
                  return (
                    <tr key={index + 1} style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}>
                      <td style={S.tdNum}>{index + 1}</td>
                      <td style={S.td}>
                        <Link
                          to={ROUTES.getStoreFrontPage(booking.store?.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={S.linkText}
                        >
                          {booking.store?.title}
                        </Link>
                      </td>
                      <td style={S.td}>
                        <Link
                          to={ROUTES.masterAdminUsers}
                          state={{ highlightId: booking.user?.id }}
                          style={S.linkText}
                        >
                          {booking.user?.username}
                        </Link>
                      </td>
                      <td style={S.td}>
                        <span
                          style={{
                            ...S.typeBadge,
                            background: isBundle ? '#efe6f7' : '#f0efe8',
                            color: isBundle ? '#5b2c8a' : '#555',
                          }}
                        >
                          {isBundle ? 'Bundle' : 'Service'}
                        </span>
                      </td>
                      <td style={S.td}>
                        {isBundle ? (
                          <Link
                            to={ROUTES.masterAdminBundles}
                            state={{ highlightId: booking.bundle?.id }}
                            style={S.linkText}
                          >
                            {booking.bundle?.title}
                          </Link>
                        ) : (
                          <Link
                            to={ROUTES.masterAdminServices}
                            state={{ highlightId: booking.service?.id }}
                            style={S.linkText}
                          >
                            {booking.service?.title}
                          </Link>
                        )}
                      </td>
                      <td style={S.td}>
                        {isBundle ? (
                          '-'
                        ) : (
                          <Link
                            to={ROUTES.masterAdminServicesCategories}
                            state={{ highlightId: booking.service?.category?.id }}
                            style={S.linkText}
                          >
                            {booking.service?.category?.title}
                          </Link>
                        )}
                      </td>
                      <td style={S.td}>{bookedItem?.eta ?? '-'}</td>
                      <td style={S.td}>{booking.booking_date}</td>
                      <td style={S.td}>{booking.booking_time}</td>
                      <td style={S.td}>
                        {booking.worker?.username ? (
                          <Link
                            to={ROUTES.masterAdminUsers}
                            state={{ highlightId: booking.worker?.id }}
                            style={S.linkText}
                          >
                            {booking.worker?.username}
                          </Link>
                        ) : '-'}
                      </td>
                      <td style={S.td}>
                        <span
                          style={{
                            ...S.statusText,
                            color: booking.status === 'pending' ? '#a15c00' : booking.status == 'completed' ? '#27500a' : '#791f1f',
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Bookings
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

export default MasterBookingsPage;