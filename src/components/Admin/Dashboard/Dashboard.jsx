import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/Layout";
import Loader from "../../Loader/Loader";
import axiosClient from "../../../axios-client";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { Helmet } from "react-helmet-async";

// ---- Design tokens ----
const C = {
  ink: "#241623",
  inkMuted: "#7A6A78",
  canvas: "#FAF5F1",
  card: "#FFFFFF",
  rose: "#A73B58",
  roseSoft: "#F3E1E6",
  sage: "#6E8F74",
  sageSoft: "#E7EEE7",
  sand: "#E6DAD1",
  gold: "#C08A3E",
  goldSoft: "#F6EBD9",
};

const S = {
  page: { padding: "28px 32px 48px", background: C.canvas, minHeight: "100vh" },
  header: { marginBottom: "28px" },
  eyebrow: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "11px", fontWeight: 600,
    color: C.rose, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0,
  },
  greeting: {
    fontFamily: "'Fraunces', serif", fontSize: "34px", fontWeight: 600,
    color: C.ink, margin: "8px 0 4px", lineHeight: 1.15,
  },
  dateLine: { fontFamily: "'Work Sans', sans-serif", fontSize: "13px", color: C.inkMuted, margin: 0 },

  kpiGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "14px", marginBottom: "32px",
  },
  kpiCard: {
    background: C.card, borderRadius: "16px", border: `1px solid ${C.sand}`,
    padding: "20px 22px",
  },
  kpiLabel: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "11px", fontWeight: 600,
    color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0,
  },
  kpiValue: {
    fontFamily: "'Fraunces', serif", fontSize: "32px", fontWeight: 600,
    color: C.ink, margin: "10px 0 0", lineHeight: 1,
  },
  kpiNote: { fontFamily: "'Work Sans', sans-serif", fontSize: "12px", color: C.inkMuted, margin: "8px 0 0" },

  sectionGrid: {
    display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "18px", marginBottom: "18px",
  },
  panel: {
    background: C.card, borderRadius: "18px", border: `1px solid ${C.sand}`,
    padding: "24px", overflow: "hidden",
  },
  panelHeaderRow: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "18px" },
  panelTitle: {
    fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 600, color: C.ink, margin: 0,
  },
  panelSub: { fontFamily: "'Work Sans', sans-serif", fontSize: "12px", color: C.inkMuted, margin: 0 },

  // Timeline / appointment rail (signature element)
  railRow: { display: "flex", gap: "14px", alignItems: "stretch" },
  railCol: { display: "flex", flexDirection: "column", alignItems: "center", width: "14px", flexShrink: 0 },
  railDot: { width: "10px", height: "10px", borderRadius: "50%", background: C.rose, marginTop: "6px", flexShrink: 0 },
  railLine: { width: "2px", flex: 1, background: C.sand, marginTop: "4px" },
  ticket: {
    flex: 1, display: "flex", gap: "14px", alignItems: "center",
    padding: "14px 16px", marginBottom: "14px", borderRadius: "14px",
    background: C.roseSoft, textDecoration: "none",
  },
  ticketTime: {
    fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600,
    color: C.rose, minWidth: "68px",
  },
  ticketService: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: C.ink, margin: 0,
  },
  ticketMeta: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "12px", color: C.inkMuted, margin: "2px 0 0",
  },

  // Upcoming list (secondary, quieter)
  upRow: {
    display: "flex", gap: "14px", alignItems: "center", padding: "12px 14px",
    marginBottom: "10px", borderRadius: "12px", background: C.canvas, textDecoration: "none",
  },
  upDate: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "11px", fontWeight: 600,
    color: C.sage, minWidth: "64px", textTransform: "uppercase", letterSpacing: "0.04em",
  },
  upService: { fontFamily: "'Work Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: C.ink, margin: 0 },
  upMeta: { fontFamily: "'Work Sans', sans-serif", fontSize: "11px", color: C.inkMuted, margin: "2px 0 0" },

  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "36px 12px", textAlign: "center",
  },
  emptyIcon: { fontSize: "26px", marginBottom: "8px" },
  emptyText: { fontFamily: "'Fraunces', serif", fontSize: "16px", color: C.inkMuted, margin: 0 },

  // Trend panel (custom sparkbars, replaces MUI charts)
  trendGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  trendCol: {},
  trendHeadRow: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "14px" },
  trendLabel: {
    fontFamily: "'Work Sans', sans-serif", fontSize: "12px", fontWeight: 600,
    color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0,
  },
  trendTotal: { fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 600, color: C.ink, margin: 0 },
  sparkRow: {
    display: "flex", alignItems: "flex-end", gap: "5px", height: "84px",
    borderBottom: `1px solid ${C.sand}`, paddingBottom: "2px",
  },
  sparkBarWrap: { flex: 1, display: "flex", alignItems: "flex-end", height: "100%", cursor: "default" },
  sparkBar: { width: "100%", borderRadius: "4px 4px 2px 2px", minHeight: "3px" },
  sparkAxisRow: { display: "flex", justifyContent: "space-between", marginTop: "8px" },
  sparkAxisLabel: { fontFamily: "'Work Sans', sans-serif", fontSize: "10px", color: C.inkMuted },
};

const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
`;

function greetingForHour(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}`).toLocaleString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function formatDayLabel(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}`).toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function formatShortDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Aggregates a list of { date, count } (possibly split across stores) into
// one total-per-date series, sorted chronologically.
function aggregateByDate(items) {
  const totals = {};
  items.forEach((item) => {
    totals[item.date] = (totals[item.date] || 0) + item.count;
  });
  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

function Sparkbars({ points, color }) {
  if (!points.length) {
    return (
      <div style={{ ...S.sparkRow, alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "12px", color: C.inkMuted }}>
          No data yet
        </span>
      </div>
    );
  }
  const max = Math.max(1, ...points.map((p) => p.value));
  return (
    <>
      <div style={S.sparkRow}>
        {points.map((p) => (
          <div key={p.date} style={S.sparkBarWrap} title={`${formatShortDate(p.date)}: ${p.value}`}>
            <div style={{ ...S.sparkBar, height: `${Math.max(4, (p.value / max) * 100)}%`, background: color }} />
          </div>
        ))}
      </div>
      <div style={S.sparkAxisRow}>
        <span style={S.sparkAxisLabel}>{formatShortDate(points[0].date)}</span>
        <span style={S.sparkAxisLabel}>{formatShortDate(points[points.length - 1].date)}</span>
      </div>
    </>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reviewsTrend, setReviewsTrend] = useState([]);
  const [todaysApp, setTodaysApp] = useState([]);
  const [upcommingApp, setUpcommingApp] = useState([]);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/getDashboardDataVendor/${user.id}`);
        setData(data.bookingsTrend);
        setTodaysApp(data.todaysBookings);
        setUpcommingApp(data.upcomingBookings);
        setReviewsTrend(data.reviewsTrend);
        setSummary(data.summary ?? null);
      } catch (error) {
        console.error("Error fetching data ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bookingPoints = aggregateByDate(data);
  const reviewPoints = aggregateByDate(reviewsTrend);
  const bookingTotal = bookingPoints.reduce((sum, p) => sum + p.value, 0);
  const reviewTotal = reviewPoints.reduce((sum, p) => sum + p.value, 0);

  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const todayLabel = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const kpis = [
    { label: "Today's Appointments", value: summary?.todaysCount ?? todaysApp.length, note: "Scheduled for today" },
    { label: "Upcoming (7 days)", value: summary?.upcomingCount ?? upcommingApp.length, note: "Booked this week" },
    { label: "Bookings This Month", value: summary?.bookingsThisMonth, note: "Across all stores" },
    {
      label: "Average Rating",
      value: summary?.averageRating != null ? `${summary.averageRating} ★` : "—",
      note: summary?.totalReviews != null ? `${summary.totalReviews} reviews total` : "No reviews yet",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Vendor Dashboard - Beauty Trafic</title>
      </Helmet>
      <style>{fontImport}</style>
      <AdminLayout>
        {loading && <Loader />}
        <div style={S.page}>
          <div style={S.header}>
            <p style={S.eyebrow}>Beauty Trafic · Vendor</p>
            <h1 style={S.greeting}>{greeting}, {user?.username || "there"}</h1>
            <p style={S.dateLine}>{todayLabel}</p>
          </div>

          <div style={S.kpiGrid}>
            {kpis.map((kpi) => (
              <div key={kpi.label} style={S.kpiCard}>
                <p style={S.kpiLabel}>{kpi.label}</p>
                <p style={S.kpiValue}>{kpi.value === undefined || kpi.value === null ? "—" : kpi.value}</p>
                <p style={S.kpiNote}>{kpi.note}</p>
              </div>
            ))}
          </div>

          <div style={S.sectionGrid}>
            {/* Signature: today's appointment rail */}
            <div style={S.panel}>
              <div style={S.panelHeaderRow}>
                <h2 style={S.panelTitle}>Today's schedule</h2>
                <p style={S.panelSub}>{todaysApp?.length || 0} appointment{todaysApp?.length === 1 ? '' : 's'}</p>
              </div>

              {todaysApp?.length > 0 ? (
                <div>
                  {todaysApp.map((singleApp, i) => (
                    <div style={S.railRow} key={singleApp.id ?? i}>
                      <div style={S.railCol}>
                        <div style={S.railDot} />
                        {i !== todaysApp.length - 1 && <div style={S.railLine} />}
                      </div>
                      <div style={S.ticket}>
                        <span style={S.ticketTime}>{formatTime(singleApp.booking_date, singleApp.booking_time)}</span>
                        <div>
                          <p style={S.ticketService}>{singleApp.service?.title}</p>
                          <p style={S.ticketMeta}>
                            {singleApp.user?.username}
                            {singleApp.worker ? ` · with ${singleApp.worker.username}` : ""}
                            {singleApp.service?.eta ? ` · ${singleApp.service.eta}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={S.emptyState}>
                  <div style={S.emptyIcon}>🌤️</div>
                  <p style={S.emptyText}>No appointments today</p>
                </div>
              )}
            </div>

            {/* Upcoming, quieter secondary list */}
            <div style={S.panel}>
              <div style={S.panelHeaderRow}>
                <h2 style={S.panelTitle}>Coming up</h2>
                <p style={S.panelSub}>Next 7 days</p>
              </div>

              {upcommingApp?.length > 0 ? (
                <div>
                  {upcommingApp.map((singleApp, i) => (
                    <Link
                      key={singleApp.id ?? i}
                      to={ROUTES.getAdminBookings(singleApp.store.id)}
                      style={S.upRow}
                    >
                      <span style={S.upDate}>{formatDayLabel(singleApp.booking_date, singleApp.booking_time)}</span>
                      <div>
                        <p style={S.upService}>{singleApp.service?.title}</p>
                        <p style={S.upMeta}>
                          {singleApp.user?.username}
                          {singleApp.worker ? ` · with ${singleApp.worker.username}` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={S.emptyState}>
                  <div style={S.emptyIcon}>📖</div>
                  <p style={S.emptyText}>Your schedule is empty</p>
                </div>
              )}
            </div>
          </div>

          <div style={S.panel}>
            <div style={S.panelHeaderRow}>
              <h2 style={S.panelTitle}>Trends</h2>
              <p style={S.panelSub}>Daily totals across all stores</p>
            </div>
            <div style={S.trendGrid}>
              <div style={S.trendCol}>
                <div style={S.trendHeadRow}>
                  <p style={S.trendLabel}>Bookings</p>
                  <p style={S.trendTotal}>{bookingTotal}</p>
                </div>
                <Sparkbars points={bookingPoints} color={C.rose} />
              </div>
              <div style={S.trendCol}>
                <div style={S.trendHeadRow}>
                  <p style={S.trendLabel}>Reviews</p>
                  <p style={S.trendTotal}>{reviewTotal}</p>
                </div>
                <Sparkbars points={reviewPoints} color={C.sage} />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Dashboard;