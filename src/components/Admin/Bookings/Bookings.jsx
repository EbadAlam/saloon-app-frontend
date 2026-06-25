import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layout/Layout";
import Loader from "../../Loader/Loader";
import axiosClient from "../../../axios-client";
import { Link, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSnackbar } from "../../../contexts/SnackBarContext";
import BookingDetailsModal from "../BookingDetailsModal/BookingDetailsModal";
import ReloadButton from "../../ReloadButton/ReloadButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { ROUTES } from "../../../routes";

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", border: "1px solid #1a1a2e", borderRadius: "8px", background: "#fff", color: "#1a1a2e", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  crumb: { fontSize: "14px", color: "#888", textDecoration: "none" },
  crumbActive: { fontSize: "14px", color: "#1a1a2e", fontWeight: 500 },
  card: { background: "#fff", borderRadius: "14px", border: "0.5px solid #e0dfd8", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { padding: "12px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #f0efe8" },
  td: { padding: "12px 14px", color: "#1a1a2e", fontSize: "13px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  tdNum: { padding: "12px 14px", color: "#aaa", fontSize: "12px", borderBottom: "0.5px solid #f5f4f0", verticalAlign: "middle" },
  viewToggle: { display: "inline-flex", border: "0.5px solid #e0dfd8", borderRadius: "8px", overflow: "hidden" },
  viewBtn: (active) => ({ padding: "6px 12px", border: "none", background: active ? "#1a1a2e" : "#fff", color: active ? "#fff" : "#888", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500 }),
  bulkBar: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: "0.5px solid #f0efe8", background: "#fafaf8" },
  bulkSelect: { padding: "6px 12px", borderRadius: "8px", border: "0.5px solid #e0dfd8", fontSize: "13px", color: "#1a1a2e", background: "#fff", cursor: "pointer" },
  applyBtn: { padding: "6px 16px", borderRadius: "8px", background: "#1a1a2e", color: "#fff", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500 },
  applyBtnDisabled: { padding: "6px 16px", borderRadius: "8px", background: "#ccc", color: "#fff", border: "none", fontSize: "13px", cursor: "not-allowed", fontWeight: 500 },
};

const getStatusStyle = (status) => ({
  pending:     { background: "#FFF4E5", color: "#e07b00" },
  confirmed:   { background: "#E6F1FB", color: "#0C447C" },
  in_progress: { background: "#EEEDFE", color: "#3C3489" },
  completed:   { background: "#EAF3DE", color: "#27500a" },
  no_show:     { background: "#F1EFE8", color: "#444441" },
  cancelled:   { background: "#FCEBEB", color: "#791f1f" },
}[status] || { background: "#F1EFE8", color: "#444441" });

const getStatusDot = (status) => ({
  pending: "#e07b00", confirmed: "#378ADD", in_progress: "#7F77DD",
  completed: "#639922", no_show: "#888780", cancelled: "#E24B4A",
}[status] || "#888780");

function AdminBookingsPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("calendar");
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const calendarRef = useRef(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => { fetchStoreBookings(); }, []);

  const getRandomLightColor = () => {
    const r = Math.floor(180 + Math.random() * 75);
    const g = Math.floor(180 + Math.random() * 75);
    const b = Math.floor(180 + Math.random() * 75);
    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
  };

  const mapBookingsToEvents = (list) => list.map((booking) => {
    const start = new Date(`${booking.booking_date}T${booking.booking_time}`);
    let etaMinutes = 0;
    if (booking.service?.eta) {
      const s = booking.service.eta.toLowerCase();
      const hr = s.match(/(\d+)\s*hour/);
      const min = s.match(/(\d+)\s*minutes/);
      if (hr) etaMinutes += parseInt(hr[1]) * 60;
      if (min) etaMinutes += parseInt(min[1]);
    }
    return {
      id: booking.id,
      title: booking.service?.title || "Booking",
      start,
      end: new Date(start.getTime() + etaMinutes * 60000),
      allDay: false,
      color: getRandomLightColor(),
      textColor: "#000",
      extendedProps: { username: booking.user?.username || "Guest", worker: booking.worker?.username || "Not assigned", booking },
    };
  });

  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBooking/${storeId}`);
      if (data.success) {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
        setStoreName(data.storeName || "");
        setEvents(mapBookingsToEvents(data.bookings));
        axiosClient.post(`/updateBookingSeen/${storeId}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.put(`/updateBookingStatus/${id}`, { status: newStatus });
      showSnackbar(data.message, data.success ? "success" : "error");
      fetchStoreBookings();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBulkApply = async () => {
    if (!bulkStatus || selectedRows.length === 0) return;
    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/bulkUpdateBookingStatus`, {
        ids: selectedRows,
        status: bulkStatus,
      });
      showSnackbar(data.message || "Updated", data.success ? "success" : "error");
      setSelectedRows([]);
      setBulkStatus("");
      fetchStoreBookings();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to update", "error");
      setLoading(false);
    }
  };

  const toggleRow = (id) => setSelectedRows((prev) => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === bookings.length ? [] : bookings.map(b => b.id));

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpen(true);
  };

  const handleBookingFilter = (filter) => {
    const key = filter.toLowerCase();
    const filtered = (key === "all" || key === "total bookings") ? bookings : bookings.filter(b => b.status === key);
    if(view === "list") {
      setFilteredBookings(filtered);
    } else if(view === "calendar") {
      setEvents(mapBookingsToEvents(filtered));
    }
  };

  useEffect(() => {
    if (!calendarRef.current) return;
    const today = new Date(); today.setHours(0,0,0,0);
    const pendingPast = bookings.filter(b => new Date(b.booking_date) < today && b.status === "pending").length;
    const pendingFuture = bookings.filter(b => new Date(b.booking_date) >= today && b.status === "pending").length;
    document.querySelectorAll(".booking-badge").forEach(el => el.remove());
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
    return (
      <div style={{ padding: "3px 6px", fontSize: "11px", lineHeight: 1.4, cursor: "pointer" }}>
        <b style={{ display: "block", fontWeight: 600 }}>{eventInfo.event.title}</b>
        <span style={{ opacity: 0.6 }}>
          {new Date(`1970-01-01T${booking?.booking_time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          {" – "}
          {new Date(`1970-01-01T${booking?.booking_time_end}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </span>
        <span style={{ display: "inline-block", marginLeft: "4px", width: "8px", height: "8px", borderRadius: "50%", background: getStatusDot(booking?.status), verticalAlign: "middle" }} />
      </div>
    );
  };

    const statCards = (() => {
      const pending   = bookings.filter(b => b.status === "pending").length;
      const confirmed = bookings.filter(b => b.status === "confirmed").length;
      const completed = bookings.filter(b => b.status === "completed").length;
      const cancelled = bookings.filter(b => b.status === "cancelled").length;
      const noShow = bookings.filter(b => b.status === "no show").length;
      return [
        { label: "Total bookings", val: bookings.length, color: "#1a1a2e" },
        { label: "Pending",        val: pending,          color: "#e07b00" },
        { label: "Confirmed",      val: confirmed,        color: "#007bff" },
        { label: "Completed",      val: completed,        color: "#27500a" },
        { label: "Cancelled",      val: cancelled,        color: "#791f1f" },
        { label: "No Show",        val: noShow,           color: "#dc3545" },
      ];
  })();

  return (
    <AdminLayout>
      {selectedEvent && (
        <BookingDetailsModal
          open={open}
          onClose={() => setOpen(false)}
          booking={selectedEvent.extendedProps.booking}
          handleStatusChangeStatus={handleStatusChangeStatus}
        />
      )}
      <div style={S.page}>
        {loading && <Loader />}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={S.backBtn} onClick={() => window.history.back()}>
              <ArrowBackIcon style={{ fontSize: 13 }} /> Back
            </button>
            <span style={{ color: "#bbb" }}>›</span>
            <Link to={ROUTES.adminStores} style={S.crumb}>Stores</Link>
            <span style={{ color: "#bbb" }}>›</span>
            <Link to={ROUTES.getAdminSingleStore(storeId)} style={S.crumb}>{storeName || "..."}</Link>
            <span style={{ color: "#bbb" }}>›</span>
            <span style={S.crumbActive}>Bookings</span>
            <ReloadButton onReload={fetchStoreBookings} />
          </div>

          <div style={S.viewToggle}>
            <button style={S.viewBtn(view === "calendar")} onClick={() => setView("calendar")}>
              <CalendarMonthIcon style={{ fontSize: 14 }} /> Calendar
            </button>
            <button style={S.viewBtn(view === "list")} onClick={() => setView("list")}>
              <TableRowsIcon style={{ fontSize: 14 }} /> List
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "12px", marginBottom: "20px" }}>
          {statCards.map(s => (
            <div
              key={s.label}
              onClick={() => handleBookingFilter(s.label)}
              style={{ background: "#fff", border: "0.5px solid #e0dfd8", borderRadius: "12px", padding: "14px 16px", cursor: "pointer" }}
            >
              <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{s.label}</div>
              <div style={{ fontSize: "22px", fontWeight: 600, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {view === "calendar" && (
          <div style={S.card}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}
              eventDisplay="block"
              events={events}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
            />
          </div>
        )}

        {view === "list" && (
          <div style={S.card}>

            <div style={S.bulkBar}>
              <span style={{ fontSize: "13px", color: "#888" }}>
                {selectedRows.length > 0 ? `${selectedRows.length} selected` : "Select rows to bulk update"}
              </span>
              <select
                style={S.bulkSelect}
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                disabled={selectedRows.length === 0}
              >
                <option value="">Change status to…</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="no show">No Show</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                style={selectedRows.length === 0 || !bulkStatus ? S.applyBtnDisabled : S.applyBtn}
                disabled={selectedRows.length === 0 || !bulkStatus}
                onClick={handleBulkApply}
              >
                Apply
              </button>
            </div>

            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredBookings.length && filteredBookings.length > 0}
                      onChange={toggleAll}
                      style={{ accentColor: "#1a1a2e", cursor: "pointer" }}
                    />
                  </th>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Customer</th>
                  <th style={S.th}>cancelled/no show</th>
                  <th style={S.th}>Service</th>
                  <th style={S.th}>Worker</th>
                  <th style={S.th}>Date</th>
                  <th style={S.th}>Time</th>
                  <th style={S.th}>Price</th>
                  <th style={S.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? filteredBookings.map((b, i) => (
                  <tr
                    key={b.id}
                    style={{ background: selectedRows.includes(b.id) ? "#f0f4ff" : i % 2 === 0 ? "#fff" : "#fafaf8", cursor: "pointer" }}
                    onClick={() => toggleRow(b.id)}
                  >
                    <td style={S.td}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(b.id)}
                        onChange={() => toggleRow(b.id)}
                        onClick={e => e.stopPropagation()}
                        style={{ accentColor: "#1a1a2e", cursor: "pointer" }}
                      />
                    </td>
                    <td style={S.tdNum}>{i + 1}</td>
                    <td style={S.td}>{b.user?.username || "Guest"}</td>
                    <td style={S.td}>{b.user?.cancelled_count || "0"}/{b.user?.no_show_count || "0"}</td>
                    <td style={{ ...S.td, fontWeight: 500 }}>{b.service?.title}</td>
                    <td style={S.td}>{b.worker?.username || "Any"}</td>
                    <td style={S.td}>{b.booking_date?.split("-").reverse().join("/")}</td>
                    <td style={S.td}>
                      {new Date(`1970-01-01T${b.booking_time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      {" – "}
                      {new Date(`1970-01-01T${b.booking_time_end}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                    </td>
                    <td style={S.td}>{b.service?.currency} {b.service?.price}</td>
                    <td style={S.td}>
                      <span style={{ ...getStatusStyle(b.status), padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500, textTransform: "capitalize" }}>
                        {b.status?.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={9} style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "32px" }}>No bookings</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBookingsPage;