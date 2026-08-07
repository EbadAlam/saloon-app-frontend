import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import { ROUTES } from '../../../../routes';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { marginBottom: '28px' },
  eyebrow: { fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 },
  title: { fontSize: '24px', fontWeight: 600, color: '#1a1a2e', margin: '6px 0 0' },
  subtitle: { fontSize: '13px', color: '#888', margin: '6px 0 0' },
  sectionLabel: {
    fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase',
    letterSpacing: '0.06em', margin: '0 0 12px',
  },
  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px', marginBottom: '32px',
  },
  statCard: {
    background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8',
    padding: '18px 20px',
  },
  statLabel: { fontSize: '12px', fontWeight: 500, color: '#888', margin: 0 },
  statValue: { fontSize: '26px', fontWeight: 600, color: '#1a1a2e', margin: '8px 0 0' },
  statNote: { fontSize: '11px', margin: '4px 0 0' },
  navGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px',
  },
  navCard: {
    display: 'block', background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8',
    padding: '18px 20px', textDecoration: 'none', transition: 'border-color 0.15s ease',
  },
  navIconWrap: {
    width: '38px', height: '38px', borderRadius: '10px', background: '#f0efe8',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '12px',
  },
  navTitle: { fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  navDesc: { fontSize: '12px', color: '#888', margin: '4px 0 0' },
  errorBanner: {
    background: '#fdf2f2', border: '0.5px solid #f0d5d5', borderRadius: '12px',
    padding: '14px 18px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px',
  },
  errorDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#c0392b', flexShrink: 0 },
  errorText: { fontSize: '13px', color: '#8a2c22', margin: 0 },
};

// Labels mapped to the keys returned by GET /getDashboardStats -> { stats: { users, stores, ... } }
const STAT_LABELS = [
  { key: 'users', label: 'Total Users' },
  { key: 'stores', label: 'Total Stores' },
  { key: 'services', label: 'Total Services' },
  { key: 'bundles', label: 'Total Bundles' },
  { key: 'bookings', label: 'Total Bookings' },
  { key: 'reviews', label: 'Total Reviews' },
  { key: 'blogs', label: 'Total Blogs' },
  { key: 'inqueries', label: 'Total Inqueries' },
];

const navItems = [
  { icon: '👤', title: 'Users', desc: 'Manage owners, workers & customers', to: ROUTES.masterAdminUsers },
  { icon: '🏬', title: 'Stores', desc: 'Approve and manage vendor stores', to: ROUTES.masterAdminStores },
  { icon: '🧾', title: 'Services', desc: 'All vendor services across the platform', to: ROUTES.masterAdminServices },
  { icon: '🗂️', title: 'Categories', desc: 'Service category management', to: ROUTES.masterAdminServicesCategories },
  { icon: '📦', title: 'Bundles', desc: 'Grouped-service bundles by vendor', to: ROUTES.masterAdminBundles },
  { icon: '📅', title: 'Bookings', desc: 'All bookings across every store', to: ROUTES.masterAdminBookings },
  { icon: '⭐', title: 'Reviews', desc: 'Moderate customer reviews', to: ROUTES.masterAdminReviews },
  { icon: '📝', title: 'Blogs', desc: 'Publish and manage blog posts', to: ROUTES.masterAdminBlogs },
  { icon: '✉️', title: 'Inqueries', desc: 'Support and contact inqueries', to: ROUTES.masterAdminInqueries },
];

function MasterDashboard() {
  const [statValues, setStatValues] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      setLoadingStats(true);
      setFetchError(false);
      try {
        const { data } = await axiosClient.get('/getDashboardStatsMasterAdmin');
        if (!cancelled) {
          setStatValues(data.stats ?? {});
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        if (!cancelled) {
          setFetchError(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingStats(false);
        }
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return (
    <AdminLayout>
      <div style={S.page}>
        <div style={S.header}>
          <p style={S.eyebrow}>Master Admin</p>
          <h1 style={S.title}>Dashboard</h1>
          <p style={S.subtitle}>Platform-wide overview and quick access to every section.</p>
        </div>

        {fetchError && (
          <div style={S.errorBanner}>
            <span style={S.errorDot} />
            <p style={S.errorText}>Couldn't load dashboard stats right now. The numbers below may be out of date.</p>
          </div>
        )}

        <p style={S.sectionLabel}>Overview</p>
        <div style={S.statGrid}>
          {STAT_LABELS.map((stat) => {
            const value = statValues?.[stat.key];
            const hasValue = typeof value === 'number';
            return (
              <div key={stat.key} style={S.statCard}>
                <p style={S.statLabel}>{stat.label}</p>
                <p style={S.statValue}>
                  {loadingStats ? '…' : hasValue ? value.toLocaleString() : '—'}
                </p>
                <p style={{ ...S.statNote, color: !loadingStats && !hasValue ? '#b33' : '#bbb' }}>
                  {loadingStats ? 'Loading…' : hasValue ? 'Live count' : 'Unavailable'}
                </p>
              </div>
            );
          })}
        </div>

        <p style={S.sectionLabel}>Manage</p>
        <div style={S.navGrid}>
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              style={S.navCard}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1a1a2e')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e0dfd8')}
            >
              <div style={S.navIconWrap}>{item.icon}</div>
              <p style={S.navTitle}>{item.title}</p>
              <p style={S.navDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default MasterDashboard;