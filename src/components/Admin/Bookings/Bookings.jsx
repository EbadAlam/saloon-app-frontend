import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
import AdminLayout from "../Layout/Layout";
import Loader from "../../Loader/Loader";
import axiosClient from "../../../axios-client";
import BackButton from "../../BackButton/BackButton";
import { Link, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSnackbar } from "../../../contexts/SnackBarContext";
import BookingDetailsModal from "../BookingDetailsModal/BookingDetailsModal";
import ReloadButton from "../../ReloadButton/ReloadButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../routes";
const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  nav: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    border: "1px solid #1a1a2e",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  sep: { color: "#bbb", fontSize: "13px" },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  cancelBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden",
  },
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8",
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0",
  },
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a",
  },
  badgeDisabled: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#fcebeb",
    color: "#791f1f",
  },
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
  saveBtn: {
    marginTop: "16px",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
};
function AdminBookingsPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [events, setEvents] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { showSnackbar } = useSnackbar();
  const [alertMessageType, setAlertMessageType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  const getRandomLightColor = () => {
    const r = Math.floor(180 + Math.random() * 75);
    const g = Math.floor(180 + Math.random() * 75);
    const b = Math.floor(180 + Math.random() * 75);

    const toHex = (c) => c.toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  useEffect(() => {
    fetchStoreBookings();
  }, []);
  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBooking/${storeId}`);
      if (data.success) {
        setBookings(data.bookings);
        setStoreName(data.storeName || "");

        setEvents(mapBookingsToEvents(data.bookings));
        axiosClient.post(`/updateBookingSeen/${storeId}`);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };
  const mapBookingsToEvents = (bookings) => {
    return bookings.map((booking) => {
      const start = new Date(`${booking.booking_date}T${booking.booking_time}`);

      let etaMinutes = 0;

      if (booking.service?.eta) {
        const etaStr = booking.service.eta.toLowerCase();

        const hrMatch = etaStr.match(/(\d+)\s*hour/);
        const minMatch = etaStr.match(/(\d+)\s*minutes/);

        if (hrMatch) etaMinutes += parseInt(hrMatch[1]) * 60;
        if (minMatch) etaMinutes += parseInt(minMatch[1]);
      }

      const end = new Date(start.getTime() + etaMinutes * 60000);

      return {
        id: booking.id,
        title: booking.service?.title || "Booking",
        start,
        end,
        allDay: false,
        color: getRandomLightColor(),
        textColor: "#000",
        extendedProps: {
          username: booking.user?.username || "Guest",
          worker: booking.worker?.username || "Not assigned",
          booking,
        },
      };
    });
  };
  const handleStatusChange = (newStatus, fetch = true) => {
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType("success");
    } else {
      setAlertMessageType("error");
    }
    if (fetch) {
      fetchStoreBookings();
    }
    const timer = setTimeout(() => {
      setAlertMessage("");
      setAlertMessageType("");
    }, 3000);

    return () => clearTimeout(timer);
  };
  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const payload = {
        status: newStatus,
      };
      const { data } = await axiosClient.put(
        `/updateBookingStatus/${id}`,
        payload,
      );
      setLoading(false);
      handleStatusChange(data);
    } catch (error) {
      console.error("Error updating booking status ", error);
      setLoading(false);
    }
  };
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    let booking = null;
    if (clickInfo.event) {
      booking = clickInfo.event.extendedProps.booking;
    }
    setOpen(true);
  };
  const calendarRef = useRef(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pendingPast = bookings.filter((b) => {
      const d = new Date(b.booking_date);
      return d < today && b.status === "pending";
    }).length;

    const pendingFuture = bookings.filter((b) => {
      const d = new Date(b.booking_date);
      return d >= today && b.status === "pending";
    }).length;

    const toolbar = document.querySelector(".fc-toolbar");
    if (!toolbar) return;

    document.querySelectorAll(".booking-badge").forEach((el) => el.remove());

    const prevBtn = document.querySelector(".fc-prev-button");
    const nextBtn = document.querySelector(".fc-next-button");

    if (prevBtn && pendingPast > 0) {
      const badge = document.createElement("span");
      badge.className = "booking-badge past-badge";
      badge.innerText = pendingPast;
      prevBtn.style.position = "relative";
      prevBtn.appendChild(badge);
    }

    if (nextBtn && pendingFuture > 0) {
      const badge = document.createElement("span");
      badge.className = "booking-badge future-badge";
      badge.innerText = pendingFuture;
      nextBtn.style.position = "relative";
      nextBtn.appendChild(badge);
    }
  }, [bookings]);

  const renderEventContent = (eventInfo) => {
    const booking = eventInfo.event.extendedProps.booking;
    const statusColor =
      booking?.status === "pending"
        ? "#e07b00"
        : booking?.status === "completed"
          ? "#27500a"
          : "#791f1f";

    return (
      <div
        style={{
          padding: "3px 6px",
          fontSize: "11px",
          lineHeight: 1.4,
          cursor: "pointer",
        }}
      >
        <b style={{ display: "block", fontWeight: 600 }}>
          {eventInfo.event.title}
        </b>
        <span style={{ opacity: 0.6 }}>
          {new Date(`1970-01-01T${booking?.booking_time}`).toLocaleTimeString(
            [],
            { hour: "numeric", minute: "2-digit" },
          )}
          {" – "}
          {new Date(
            `1970-01-01T${booking?.booking_time_end}`,
          ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </span>
        <span
          style={{
            display: "inline-block",
            marginLeft: "4px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: statusColor,
            verticalAlign: "middle",
          }}
        />
      </div>
    );
  };
  const handleBookingFilter = (filter) => {
    // console.log("Filtering bookings with filter:", filter);
    let filtered = bookings;

    if (!filter || filter === "all" || filter === "total bookings") {
      filtered = filtered;
    } else if (filter === "pending") {
      filtered = filtered.filter((b) => b.status === "pending");
    } else if (filter === "completed") {
      filtered = filtered.filter((b) => b.status === "completed");
    } else if (filter === "cancelled") {
      filtered = filtered.filter((b) => b.status === "cancelled");
    }
    // console.log("Filtered bookings:", filtered);
    setEvents(mapBookingsToEvents(filtered));
  };
  return (
    <>
      <AdminLayout>
        {selectedEvent && (
          <BookingDetailsModal
            open={open}
            onClose={() => setOpen(false)}
            booking={selectedEvent.extendedProps.booking}
            handleStatusChangeStatus={handleStatusChangeStatus}
          />
        )}

        <div className="container-fluid dashboard-content">
          {loading && <Loader />}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button style={S.backBtn} onClick={() => window.history.back()}>
                <ArrowBackIcon style={{ fontSize: 13 }} /> Back
              </button>
              <span style={{ color: "#bbb" }}>›</span>
              <Link to={ROUTES.adminStores} style={S.crumb}>
                Stores
              </Link>
              <span style={{ color: "#bbb" }}>›</span>
              <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>
                {storeName || "..."}
              </Link>
              <span style={{ color: "#bbb" }}>›</span>
              <span style={S.crumbActive}>Bookings</span>
              <ReloadButton onReload={fetchStoreBookings} />
            </div>
          </div>
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const pending = bookings.filter(
              (b) => b.status === "pending",
            ).length;
            const completed = bookings.filter(
              (b) => b.status === "completed",
            ).length;
            const cancelled = bookings.filter(
              (b) => b.status === "cancelled",
            ).length;
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {[
                  {
                    label: "Total bookings",
                    val: bookings.length,
                    sub: "This month",
                    color: "#1a1a2e",
                  },
                  {
                    label: "Pending",
                    val: pending,
                    sub: "Awaiting action",
                    color: "#e07b00",
                  },
                  {
                    label: "Completed",
                    val: completed,
                    sub: "This month",
                    color: "#27500a",
                  },
                  {
                    label: "Cancelled",
                    val: cancelled,
                    sub: "This month",
                    color: "#791f1f",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "#fff",
                      border: "0.5px solid #e0dfd8",
                      borderRadius: "12px",
                      padding: "14px 16px",
                    }}
                    onClick={() => handleBookingFilter(s.label.toLowerCase())}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "6px",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: s.color,
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#aaa",
                        marginTop: "2px",
                      }}
                    >
                      {/* {s.sub} */}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              border: "0.5px solid #e0dfd8",
              overflow: "hidden",
            }}
          >
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              eventDisplay="block"
              events={events}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default AdminBookingsPage;
