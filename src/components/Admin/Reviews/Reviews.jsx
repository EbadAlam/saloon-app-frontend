import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import axiosClient from '../../../axios-client';
import AdminLayout from '../../Admin/Layout/Layout';
import StarRating from '../../StarRating/StarRating';
import { Link, useParams } from 'react-router-dom';
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
  card: { background: "#fff", borderRadius: "12px", border: "0.5px solid #e0dfd8", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "12px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #f0efe8" },
  td: { padding: "12px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  tdNum: { padding: "12px 14px", color: "#aaa", fontSize: "12px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  reviewText: { fontSize: "13px", color: "#555" },
};

function AdminReviewsPage() {
  const { user, formatDate } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [storeName, setStoreName] = useState('');
  const { storeId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getWorkerReviews/${storeId}`);
        setReviews(data.reviews);
        setStoreName(data.storeName || '');
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user.id]);

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
            <span style={S.crumbActive}>Reviews</span>
          </div>
        </div>

        {/* Table */}
        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                {['#','Title','Review','Rating','User','Worker','Date'].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafaf8' }}>
                  <td style={S.tdNum}>{i + 1}</td>
                  <td style={{ ...S.td, fontWeight: 500 }}>{r.title}</td>
                  <td style={S.td}>
                    <span style={S.reviewText} title={r.review}>{r.review}</span>
                  </td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500 }}>{r.rating}</span>
                      <StarRating rating={r.rating} />
                    </div>
                  </td>
                  <td style={S.td}>{r.reviewer?.username}</td>
                  <td style={S.td}>{r.reviewee?.username ?? '—'}</td>
                  <td style={{ ...S.td, color: '#888' }}>{formatDate(r.reviewed_at)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>No reviews yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminReviewsPage;