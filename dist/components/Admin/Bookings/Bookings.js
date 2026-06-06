"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
var _reactRouterDom = require("react-router-dom");
var _react2 = _interopRequireDefault(require("@fullcalendar/react"));
var _daygrid = _interopRequireDefault(require("@fullcalendar/daygrid"));
var _timegrid = _interopRequireDefault(require("@fullcalendar/timegrid"));
var _interaction = _interopRequireDefault(require("@fullcalendar/interaction"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
var _BookingDetailsModal = _interopRequireDefault(require("../BookingDetailsModal/BookingDetailsModal"));
var _ReloadButton = _interopRequireDefault(require("../../ReloadButton/ReloadButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AdminBookingsPage() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [open, setOpen] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [events, setEvents] = (0, _react.useState)([]);
  const [alertMessage, setAlertMessage] = (0, _react.useState)("");
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)("");
  const [selectedEvent, setSelectedEvent] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  const getRandomLightColor = () => {
    const r = Math.floor(180 + Math.random() * 75);
    const g = Math.floor(180 + Math.random() * 75);
    const b = Math.floor(180 + Math.random() * 75);
    const toHex = c => c.toString(16).padStart(2, "0");
    return "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
  };
  (0, _react.useEffect)(() => {
    fetchStoreBookings();
  }, []);
  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getBooking/".concat(storeId));
      if (data.success) {
        setBookings(data.bookings);
        const formatted = data.bookings.map(booking => {
          var _booking$service, _booking$service2, _booking$user, _booking$worker;
          const start = new Date("".concat(booking.booking_date, "T").concat(booking.booking_time));
          let etaMinutes = 0;
          if ((_booking$service = booking.service) !== null && _booking$service !== void 0 && _booking$service.eta) {
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
            title: ((_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.title) || "Booking",
            start,
            end,
            allDay: false,
            color: color,
            textColor: "#000",
            extendedProps: {
              username: ((_booking$user = booking.user) === null || _booking$user === void 0 ? void 0 : _booking$user.username) || "Guest",
              worker: ((_booking$worker = booking.worker) === null || _booking$worker === void 0 ? void 0 : _booking$worker.username) || "Not assigned",
              booking: booking
            }
          };
        });
        setEvents(formatted);
        _axiosClient.default.post("/updateBookingSeen/".concat(storeId));
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
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
        status: newStatus
      };
      const {
        data
      } = await _axiosClient.default.put("/updateBookingStatus/".concat(id), payload);
      setLoading(false);
      handleStatusChange(data);
    } catch (error) {
      console.error("Error updating booking status ", error);
      setLoading(false);
    }
  };
  const handleEventClick = clickInfo => {
    setSelectedEvent(clickInfo.event);
    let booking = null;
    if (clickInfo.event) {
      booking = clickInfo.event.extendedProps.booking;
    }
    setOpen(true);
  };
  const calendarRef = (0, _react.useRef)(null);

  // add this effect after fetchStoreBookings sets events:
  (0, _react.useEffect)(() => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pendingPast = bookings.filter(b => {
      const d = new Date(b.booking_date);
      return d < today && b.status === "pending";
    }).length;
    const pendingFuture = bookings.filter(b => {
      const d = new Date(b.booking_date);
      return d >= today && b.status === "pending";
    }).length;

    // inject badges into toolbar
    const toolbar = document.querySelector(".fc-toolbar");
    if (!toolbar) return;

    // remove old badges if re-rendering
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
  const renderEventContent = eventInfo => {
    var _eventInfo$event$exte, _eventInfo$event$exte2, _eventInfo$event$exte3, _eventInfo$event$exte4, _eventInfo$event$exte5, _eventInfo$event$exte6;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "p-1 text-xs"
    }, /*#__PURE__*/_react.default.createElement("b", null, eventInfo.event.title), /*#__PURE__*/_react.default.createElement("div", null, new Date("1970-01-01T".concat((_eventInfo$event$exte = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte === void 0 ? void 0 : _eventInfo$event$exte.booking_time)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    }), " - ", new Date("1970-01-01T".concat((_eventInfo$event$exte2 = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte2 === void 0 ? void 0 : _eventInfo$event$exte2.booking_time_end)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })), /*#__PURE__*/_react.default.createElement("div", null, "User: ", eventInfo.event.extendedProps.username), /*#__PURE__*/_react.default.createElement("div", null, "Worker: ", eventInfo.event.extendedProps.worker), /*#__PURE__*/_react.default.createElement("div", null, "Status:", " ", /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: ((_eventInfo$event$exte3 = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte3 === void 0 ? void 0 : _eventInfo$event$exte3.status) === "pending" ? "#ff7800" : ((_eventInfo$event$exte4 = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte4 === void 0 ? void 0 : _eventInfo$event$exte4.status) === "completed" ? "green" : "red"
      }
    }, (_eventInfo$event$exte5 = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte5 === void 0 ? void 0 : _eventInfo$event$exte5.status)), /*#__PURE__*/_react.default.createElement("div", null, ((_eventInfo$event$exte6 = eventInfo.event.extendedProps.booking) === null || _eventInfo$event$exte6 === void 0 ? void 0 : _eventInfo$event$exte6.is_seen) == "false" && /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "red"
      }
    }, "New")));
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Layout.default, null, selectedEvent && /*#__PURE__*/_react.default.createElement(_BookingDetailsModal.default, {
    open: open,
    onClose: () => setOpen(false),
    booking: selectedEvent.extendedProps.booking,
    handleStatusChangeStatus: handleStatusChangeStatus
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Bookings ", /*#__PURE__*/_react.default.createElement(_ReloadButton.default, {
    onReload: fetchStoreBookings
  })), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement(_react2.default, {
    ref: calendarRef,
    plugins: [_daygrid.default, _timegrid.default, _interaction.default],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: ""
    },
    eventDisplay: "block",
    events: events,
    eventContent: renderEventContent,
    eventClick: handleEventClick
  }))));
}
var _default = exports.default = AdminBookingsPage;