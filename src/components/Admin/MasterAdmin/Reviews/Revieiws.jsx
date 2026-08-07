import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import ActiveDeactiveSwitch from '../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import { ROUTES } from '../../../../routes';
import { useSnackbar } from '../../../../contexts/SnackBarContext';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '1050px' },
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
  reviewText: { maxWidth: '320px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
};

function MasterReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageType, setAlertMessageType] = useState('');
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllReviews?page=${page}`);
      setReviews(data.reviews.data);
      setPagination({
        current_page: data.reviews.current_page,
        last_page: data.reviews.last_page,
        total: data.reviews.total,
      });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchReviews(page);
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
      fetchReviews();
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
          <h5 style={S.title}>Reviews</h5>
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
                <th style={S.th}>Title</th>
                <th style={S.th}>Review</th>
                <th style={S.th}>Rating</th>
                <th style={S.th}>Worker</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Status</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviews && reviews.length > 0 ? (
                reviews.map((singleReview, index) => (
                  <tr key={index + 1} style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={S.tdNum}>{index + 1}</td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.getStoreFrontPage(singleReview.store?.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={S.linkText}
                      >
                        {singleReview.store?.title}
                      </Link>
                    </td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: singleReview.reviewer?.id }}
                        style={S.linkText}
                      >
                        {singleReview.reviewer?.username}
                      </Link>
                    </td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{singleReview.title}</td>
                    <td style={S.td}>
                      <span style={S.reviewText} title={singleReview.review}>{singleReview.review}</span>
                    </td>
                    <td style={S.td}>{singleReview.rating}</td>
                    <td style={S.td}>
                      {singleReview.reviewee?.username ? (
                        <Link
                          to={ROUTES.masterAdminUsers}
                          state={{ highlightId: singleReview.reviewee?.id }}
                          style={S.linkText}
                        >
                          {singleReview.reviewee?.username}
                        </Link>
                      ) : '-'}
                    </td>
                    <td style={S.td}>
                      <span
                        style={{
                          ...S.statusText,
                          color: singleReview.status === 'active' ? '#27500a' : '#791f1f',
                        }}
                      >
                        {singleReview.status}
                      </span>
                    </td>
                    <td style={S.td}>
                      <ActiveDeactiveSwitch id={singleReview.id} apiUrl='/updateReviewStatus' status={singleReview.status} onStatusChange={handleStatusChange} />
                    </td>
                    <td style={S.td}>
                      <DeleteButton id={singleReview.id} url='/deleteReview' onStatusChange={handleStatusChange} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Reviews
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

export default MasterReviewsPage;