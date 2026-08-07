import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios-client";
import AdminLayout from "../../Layout/Layout";
import Loader from "../../../Loader/Loader";
import BackButton from "../../../BackButton/BackButton";
import { ROUTES } from "../../../../routes";
import { useSnackbar } from "../../../../contexts/SnackBarContext";

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  card: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' },
  th: {
    padding: '12px 14px', textAlign: 'left', color: '#888', fontWeight: 500, fontSize: '12px',
    textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #f0efe8', whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 14px', color: '#1a1a2e', fontSize: '13px', borderBottom: '0.5px solid #f5f4f0', verticalAlign: 'middle',
  },
  tdNum: { padding: '12px 14px', color: '#aaa', fontSize: '12px', borderBottom: '0.5px solid #f5f4f0' },
  linkText: { color: '#1a1a2e', fontSize: '13px', fontWeight: 500, textDecoration: 'underline' },
};

function MasterInqueriesPage() {
  const [loading, setLoading] = useState(true);
  const [inqueries, setInqueries] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  useEffect(() => {
    fetchInqueries();
  }, []);

  const fetchInqueries = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getAllInqueries?page=${page}`);
      setInqueries(data.inqueries.data);
      setPagination({
        current_page: data.inqueries.current_page,
        last_page: data.inqueries.last_page,
        total: data.inqueries.total,
      });
    } catch (error) {
      console.error("Failed to fetch inqueries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchInqueries(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Inqueries</h5>
          <div style={S.headerActions}>
            <BackButton />
          </div>
        </div>

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>#</th>
                <th style={S.th}>Username</th>
                <th style={S.th}>Email</th>
                <th style={S.th}>Topic</th>
                <th style={S.th}>Files Attach</th>
              </tr>
            </thead>
            <tbody>
              {inqueries && inqueries.length > 0 ? (
                inqueries.map((singleInquery, index) => (
                  <tr key={index + 1} style={{ background: index % 2 === 0 ? '#fff' : '#fafaf8' }}>
                    <td style={S.tdNum}>{index + 1}</td>
                    <td style={S.td}>
                      <Link
                        to={ROUTES.masterAdminUsers}
                        state={{ highlightId: singleInquery.user?.id }}
                        style={S.linkText}
                      >
                        {singleInquery.user?.username}
                      </Link>
                    </td>
                    <td style={S.td}>{singleInquery.user?.email}</td>
                    <td style={S.td}>{singleInquery.topic}</td>
                    <td style={S.td}>{JSON.parse(singleInquery?.files).length ?? 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ ...S.td, textAlign: 'center', color: '#aaa', padding: '32px' }}>
                    No Inqueries
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

export default MasterInqueriesPage;