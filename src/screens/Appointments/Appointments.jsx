import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import { useSnackbar } from "../../contexts/SnackBarContext";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import StarRating from "../../components/StarRating/StarRating";

const S = {
  wrap: { padding: "24px", background: "#f5f4f0", minHeight: "600px" },
  tabsContainer: {
    display: "flex",
    gap: "0",
    borderBottom: "0.5px solid #e0dfd8",
    marginBottom: "24px",
    overflowX: "auto",
  },
  tab: (active) => ({
    padding: "12px 20px",
    border: "none",
    background: "transparent",
    color: active ? "#1a1a2e" : "#888",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    borderBottom: active ? "2px solid #1a1a2e" : "2px solid transparent",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    position: "relative",
  }),
  tabBadge: {
    display: "inline-block",
    marginLeft: "6px",
    background: "#1a1a2e",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "10px",
    padding: "2px 7px",
    fontWeight: 600,
    minWidth: "20px",
    textAlign: "center",
  },
  contentSection: { display: "none" },
  contentSectionActive: { display: "block" },
  card: {
    background: "#fff",
    border: "0.5px solid #e0dfd8",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "12px",
    transition: "all 0.15s",
  },
  cardHeader: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    alignItems: "center",
  },
  cardImg: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: "10px",
    flexShrink: 0,
  },
  cardLeft: { flex: 1, minWidth: 0 },
  storeName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1a1a2e",
    textDecoration: "none",
    display: "block",
    marginBottom: "4px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "11px",
    color: "#888",
    marginBottom: "4px",
  },
  stars: { color: "#f0b429" },
  address: {
    fontSize: "11px",
    color: "#aaa",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardRight: {
    textAlign: "right",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
    borderLeft: "0.5px solid #f0efe8",
  },
  workerName: { fontSize: "13px", fontWeight: 500, color: "#1a1a2e" },
  workerRole: { fontSize: "11px", color: "#aaa" },
  cardContent: { padding: "0 12px 12px", borderTop: "0.5px solid #f0efe8" },
  serviceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  serviceName: { fontSize: "13px", fontWeight: 600, color: "#1a1a2e", flex: 1 },
  statusBadge: (status) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    ...(status === "pending"
      ? { background: "#FFF4E5", color: "#e07b00" }
      : status === "confirmed"
        ? { background: "#E6F1FB", color: "#0C447C" }
        : status === "in_progress"
          ? { background: "#EEEDFE", color: "#3C3489" }
          : status === "completed"
            ? { background: "#EAF3DE", color: "#27500a" }
            : status === "no show"
              ? { background: "#F1EFE8", color: "#444441" }
              : { background: "#FCEBEB", color: "#791f1f" }),
  }),
  serviceMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px",
  },
  metaItem: { fontSize: "12px", color: "#555" },
  metaPrice: { fontWeight: 600, color: "#1a1a2e" },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingTop: "8px",
    borderTop: "0.5px solid #f0efe8",
    flexWrap: "wrap",
  },
  timeInfo: { display: "flex", gap: "12px", fontSize: "12px", color: "#888" },
  timelineBadge: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    background: "#e8e6df",
    color: "#555",
  },
  actionButtons: { display: "flex", gap: "6px" },
  actionBtn: (type = "secondary") => ({
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.15s",
    ...(type === "primary"
      ? { background: "#1a1a2e", color: "#fff" }
      : type === "danger"
        ? {
            background: "#fcebeb",
            color: "#791f1f",
            border: "0.5px solid #e0b8b8",
          }
        : {
            background: "#f5f4f0",
            color: "#1a1a2e",
            border: "0.5px solid #e0dfd8",
          }),
  }),
  emptyBox: {
    border: "0.5px dashed #e0dfd8",
    borderRadius: "14px",
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  emptyText: { fontSize: "13px", color: "#aaa" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "14px",
    width: "90%",
    maxWidth: 400,
    padding: "20px",
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "12px",
  },
  modalWarning: {
    background: "#FFF4E5",
    border: "0.5px solid #f0d4a8",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "16px",
    fontSize: "12px",
    color: "#7a5800",
    lineHeight: "1.5",
  },
  modalActions: { display: "flex", gap: "8px", marginTop: "16px" },
};

function AppointmentsPage() {
  const location = useLocation();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelModal, setCancelModal] = useState({
    open: false,
    booking: null,
  });
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (location.state?.successMessage) {
      showSnackbar(location.state.successMessage, "success");
    }
  }, [location.state?.successMessage]);

  useEffect(() => {
    fetchUserBookings();
  }, [user.id]);

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getUserBookings/${user.id}`);
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showSnackbar("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };
  const parseBookingDate = (dateString, timeString) => {
    // Parse as local date, not UTC
    const [year, month, day] = dateString.split("-");
    return new Date(
      year,
      parseInt(month) - 1,
      parseInt(day),
      parseInt(timeString.split(":")[0]),
      parseInt(timeString.split(":")[1]),
    );
  };
  const getBookingsByStatus = (status) => {
    const now = new Date();
    if (!Array.isArray(bookings)) return [];
    if (status === "upcoming") {
      return bookings.filter((b) => {
        const bookingDate = new Date(`${b.booking_date}T${b.booking_time}`);
        return (
          bookingDate > now &&
          ["pending", "confirmed", "in_progress"].includes(b.status)
        );
      });
    }

    return bookings.filter((b) => b.status === status);
  };

  const getCountByStatus = (status) => {
    const booked = getBookingsByStatus(
      status === "upcoming" ? "pending" : status,
    );
    return Array.isArray(booked) ? booked.length : 0;
  };

  const canCancelBooking = (booking) => {
    const bookingDateTime = parseBookingDate(
      booking.booking_date,
      booking.booking_time,
    );
    const now = new Date();
    const hoursUntil = (bookingDateTime - now) / (1000 * 60 * 60);
    return hoursUntil > 24;
  };

  const getTimelineText = (booking) => {
    const bookingDateTime = parseBookingDate(
      booking.booking_date,
      booking.booking_time,
    );
    const now = new Date();
    const hoursUntil = (bookingDateTime - now) / (1000 * 60 * 60);

    if (hoursUntil <= 0) return "Appointment is today/past";
    if (hoursUntil < 24) return `in ${Math.floor(hoursUntil)}h`;

    const daysUntil = Math.floor(hoursUntil / 24);
    return `in ${daysUntil} day${daysUntil > 1 ? "s" : ""}`;
  };

  const handleCancelClick = (booking) => {
    if (canCancelBooking(booking)) {
      setCancelModal({ open: true, booking });
    } else {
      showSnackbar("Cannot cancel within 24 hours of appointment", "error");
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModal.booking) return;
    setCancelling(true);
    try {
      const { data } = await axiosClient.post(
        `/cancelBooking/${cancelModal.booking.id}`,
      );
      showSnackbar(data.message || "Appointment cancelled", "success");
      setCancelModal({ open: false, booking: null });
      fetchUserBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showSnackbar(
        error.response?.data?.message || "Failed to cancel",
        "error",
      );
    } finally {
      setCancelling(false);
    }
  };

  const tabs = [
    { key: "upcoming", label: "Pending" },
    { key: "confirmed", label: "✓ Confirmed" },
    { key: "completed", label: "✓ Completed" },
    { key: "cancelled", label: "✕ Cancelled" },
    { key: "no show", label: "⊘ No Show" },
  ];

  const BookingCard = ({ booking, showCancel = true }) => {
    const avgRating = booking.store?.reviews?.length
      ? (
          booking.store.reviews.reduce(
            (sum, r) => sum + parseFloat(r.rating || 0),
            0,
          ) / booking.store.reviews.length
        ).toFixed(1)
      : "N/A";

    return (
      <div
        style={S.card}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={S.cardHeader}>
          <img
            style={S.cardImg}
            src={`${process.env.REACT_APP_IMG_URL}/${booking.store?.thumbnail}`}
            alt={booking.store?.title}
            onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
          />
          <div style={S.cardLeft}>
            <a style={S.storeName} href={`/store/${booking.store?.slug}`}>
              {booking.store?.title}
            </a>
            <div style={S.ratingRow}>
              <span style={S.stars}>★★★★</span>
              <span>{avgRating}</span>
              <span style={{ color: "#ddd" }}>·</span>
              <span>({booking.store?.reviews?.length || 0})</span>
            </div>
            <div style={S.address}>{booking.store?.address}</div>
          </div>
          <div style={S.cardRight}>
            <span style={S.workerName}>
              {booking.worker?.username || "Any"}
            </span>
            <span style={S.workerRole}>
              {booking.worker?.user_info?.designation}
            </span>
          </div>
        </div>

        <div style={S.cardContent}>
          <div style={S.serviceHeader}>
            <span style={S.serviceName}>{booking.service?.title}</span>
            <span style={S.statusBadge(booking.status)}>
              {booking.status?.replace(/_/g, " ")}
            </span>
          </div>

          <div style={S.serviceMeta}>
            <span style={S.metaItem}>{booking.service?.eta}</span>
            <span style={{ color: "#ddd" }}>·</span>
            <span style={S.metaItem}>
              with {booking.worker?.username || "any professional"}
            </span>
            <span style={{ marginLeft: "auto", ...S.metaPrice }}>
              {booking.service?.currency} {booking.service?.price}
            </span>
          </div>

          <div style={S.cardFooter}>
            <div style={S.timeInfo}>
              <span>
                {new Date(
                  `1970-01-01T${booking.booking_time}`,
                ).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {" – "}
                {new Date(
                  `1970-01-01T${booking.booking_time_end}`,
                ).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
              <span>
                {new Date(
                  booking.booking_date.split("-")[0],
                  parseInt(booking.booking_date.split("-")[1]) - 1,
                  booking.booking_date.split("-")[2],
                ).toLocaleDateString("en-GB")}
              </span>
              {activeTab === "upcoming" && (
                <span style={S.timelineBadge}>{getTimelineText(booking)}</span>
              )}
              {activeTab === "cancelled" && (
                <span style={S.timelineBadge}>
                  Cancelled by{" "}
                  {booking.cancelled_by === "customer" ? "you" : "salon"}
                </span>
              )}
            </div>
            <div style={S.actionButtons}>
              {/* <button style={S.actionBtn("secondary")}>Details</button> */}
              {showCancel && (activeTab === "upcoming" || activeTab === "confirmed") && (
                <button
                  style={{
                    ...S.actionBtn("danger"),
                    opacity: canCancelBooking(booking) ? 1 : 0.5,
                    cursor: canCancelBooking(booking)
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => handleCancelClick(booking)}
                  disabled={!canCancelBooking(booking)}
                >
                  Cancel
                </button>
              )}
              {/* {activeTab === "completed" && (
                <button style={S.actionBtn("primary")}>Leave Review</button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="profile">
      <div className="container">
        <div style={{ display: "flex" }}>
          <UserSidebar />
          <div className="content">
            {loading && <Loader />}

            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              Appointments
            </h2>

            <div style={S.wrap}>
              {/* Tabs */}
              <div style={S.tabsContainer}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    style={S.tab(activeTab === tab.key)}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    <span style={S.tabBadge}>
                      {getCountByStatus(
                        tab.key === "upcoming" ? "pending" : tab.key,
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  style={
                    activeTab === tab.key
                      ? S.contentSectionActive
                      : S.contentSection
                  }
                >
                  {getBookingsByStatus(
                    tab.key === "upcoming" ? "pending" : tab.key,
                  ).length > 0 ? (
                    getBookingsByStatus(
                      tab.key === "upcoming" ? "pending" : tab.key,
                    ).map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        showCancel={tab.key === "upcoming" || tab.key === "confirmed"}
                      />
                    ))
                  ) : (
                    <div style={S.emptyBox}>
                      <div style={S.emptyTitle}>
                        No {tab.label.toLowerCase()} appointments
                      </div>
                      <div style={S.emptyText}>
                        {tab.key === "upcoming"
                          ? "Your upcoming appointments will appear here"
                          : `${tab.label} appointments will appear here`}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cancel Modal */}
            {cancelModal.open && (
              <div style={S.modalOverlay}>
                <div style={S.modal}>
                  <div style={S.modalTitle}>Cancel appointment?</div>
                  <div style={S.modalWarning}>
                    ⚠️ You can only cancel appointments{" "}
                    <strong>24 hours before</strong> the scheduled time.
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#555",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>{cancelModal.booking?.service?.title}</strong> on{" "}
                    {new Date(
                      cancelModal.booking?.booking_date,
                    ).toLocaleDateString()}{" "}
                    at{" "}
                    {new Date(
                      `1970-01-01T${cancelModal.booking?.booking_time}`,
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    with {cancelModal.booking?.worker?.username}
                  </p>
                  <div style={S.modalActions}>
                    <button
                      style={{
                        ...S.actionBtn("secondary"),
                        flex: 1,
                        padding: "10px",
                      }}
                      onClick={() =>
                        setCancelModal({ open: false, booking: null })
                      }
                      disabled={cancelling}
                    >
                      Keep Appointment
                    </button>
                    <button
                      style={{
                        ...S.actionBtn("danger"),
                        flex: 1,
                        padding: "10px",
                      }}
                      onClick={handleConfirmCancel}
                      disabled={cancelling}
                    >
                      {cancelling ? "Cancelling..." : "Yes, Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;
