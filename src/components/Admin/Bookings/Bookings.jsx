import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSnackbar } from "../../../contexts/SnackBarContext";
import BookingDetailsModal from "../BookingDetailsModal/BookingDetailsModal";
import ReloadButton from "../../ReloadButton/ReloadButton";

function AdminBookingsPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
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
        const formatted = data.bookings.map((booking) => {
          const start = new Date(
            `${booking.booking_date}T${booking.booking_time}`
          );
          let etaMinutes = 0;
          if (booking.service?.eta) {
            const etaStr = booking.service.eta.toLowerCase();
            if (etaStr.includes("hr")) {
              etaMinutes += parseInt(etaStr) * 60;
            }
            if (etaStr.includes("min")) {
              etaMinutes += parseInt(etaStr);
            }
          }

          const end = new Date(start.getTime() + etaMinutes * 60000);
          const color = getRandomLightColor();
          return {
            id: booking.id,
            title: booking.service?.title || "Booking",
            start,
            end,
            allDay: false,
            color: color,
            textColor: "#000",
            extendedProps: {
              username: booking.user?.username || "Guest",
              worker: booking.worker?.username || "Not assigned",
              booking: booking,
            },
          };
        });

        setEvents(formatted);
        axiosClient.post(`/updateBookingSeen/${storeId}`);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
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
        payload
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
  const renderEventContent = (eventInfo) => {
    return (
      <div className="p-1 text-xs">
        <b>{eventInfo.event.title}</b>
        <div>
          {new Date(
            `1970-01-01T${eventInfo.event.extendedProps.booking?.booking_time}`
          ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          {" - "}
          {new Date(
            `1970-01-01T${eventInfo.event.extendedProps.booking?.booking_time_end}`
          ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </div>
        <div>User: {eventInfo.event.extendedProps.username}</div>
        <div>Worker: {eventInfo.event.extendedProps.worker}</div>
        <div>
          Status:{" "}
          <span
            style={{
              color:
                eventInfo.event.extendedProps.booking?.status === "pending"
                  ? "#ff7800"
                  : eventInfo.event.extendedProps.booking?.status ===
                    "completed"
                  ? "green"
                  : "red",
            }}
          >
            {eventInfo.event.extendedProps.booking?.status}
          </span>
        </div>
        <div>
          {eventInfo.event.extendedProps.booking?.is_seen == "false" && (
            <span style={{ color: "red" }}>New</span>
          )}
        </div>
      </div>
    );
  };
  // const [calendarView, setCalendarView] = useState(
  //   window.innerWidth < 768 ? "listWeek" : "dayGridMonth"
  // );
  // useEffect(() => {
  //   const handleResize = () => {
  //     setCalendarView(window.innerWidth < 768 ? "listWeek" : "dayGridMonth");
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <>
      {loading && <Loader />}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">
              Bookings <ReloadButton onReload={fetchStoreBookings} />
            </Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
            </Stack>
          </Stack>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            eventDisplay="block"
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default AdminBookingsPage;
