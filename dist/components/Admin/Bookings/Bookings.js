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
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const S = {
  page: {
    padding: "24px",
    background: "#f5f4f0",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
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
    fontWeight: 500
  },
  sep: {
    color: "#bbb",
    fontSize: "13px"
  },
  crumb: {
    fontSize: "14px",
    color: "#888",
    textDecoration: "none"
  },
  crumbActive: {
    fontSize: "14px",
    color: "#1a1a2e",
    fontWeight: 500
  },
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
    fontWeight: 500
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
    fontWeight: 500
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden"
  },
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8"
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0"
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0"
  },
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a"
  },
  badgeDisabled: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#fcebeb",
    color: "#791f1f"
  },
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500
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
    fontWeight: 500
  }
};
function AdminBookingsPage() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [open, setOpen] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [filteredBookings, setFilteredBookings] = (0, _react.useState)(bookings);
  const [events, setEvents] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)("");
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
        setStoreName(data.storeName || "");
        setEvents(mapBookingsToEvents(data.bookings));
        _axiosClient.default.post("/updateBookingSeen/".concat(storeId));
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };
  const mapBookingsToEvents = bookings => {
    return bookings.map(booking => {
      var _booking$service, _booking$service2, _booking$user, _booking$worker;
      const start = new Date("".concat(booking.booking_date, "T").concat(booking.booking_time));
      let etaMinutes = 0;
      if ((_booking$service = booking.service) !== null && _booking$service !== void 0 && _booking$service.eta) {
        const etaStr = booking.service.eta.toLowerCase();
        const hrMatch = etaStr.match(/(\d+)\s*hour/);
        const minMatch = etaStr.match(/(\d+)\s*minutes/);
        if (hrMatch) etaMinutes += parseInt(hrMatch[1]) * 60;
        if (minMatch) etaMinutes += parseInt(minMatch[1]);
      }
      const end = new Date(start.getTime() + etaMinutes * 60000);
      return {
        id: booking.id,
        title: ((_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.title) || "Booking",
        start,
        end,
        allDay: false,
        color: getRandomLightColor(),
        textColor: "#000",
        extendedProps: {
          username: ((_booking$user = booking.user) === null || _booking$user === void 0 ? void 0 : _booking$user.username) || "Guest",
          worker: ((_booking$worker = booking.worker) === null || _booking$worker === void 0 ? void 0 : _booking$worker.username) || "Not assigned",
          booking
        }
      };
    });
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
    const toolbar = document.querySelector(".fc-toolbar");
    if (!toolbar) return;
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
    const booking = eventInfo.event.extendedProps.booking;
    const statusColor = (booking === null || booking === void 0 ? void 0 : booking.status) === "pending" ? "#e07b00" : (booking === null || booking === void 0 ? void 0 : booking.status) === "completed" ? "#27500a" : "#791f1f";
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: "3px 6px",
        fontSize: "11px",
        lineHeight: 1.4,
        cursor: "pointer"
      }
    }, /*#__PURE__*/_react.default.createElement("b", {
      style: {
        display: "block",
        fontWeight: 600
      }
    }, eventInfo.event.title), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        opacity: 0.6
      }
    }, new Date("1970-01-01T".concat(booking === null || booking === void 0 ? void 0 : booking.booking_time)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    }), " – ", new Date("1970-01-01T".concat(booking === null || booking === void 0 ? void 0 : booking.booking_time_end)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        display: "inline-block",
        marginLeft: "4px",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: statusColor,
        verticalAlign: "middle"
      }
    }));
  };
  const handleBookingFilter = filter => {
    // console.log("Filtering bookings with filter:", filter);
    let filtered = bookings;
    if (!filter || filter === "all" || filter === "total bookings") {
      filtered = filtered;
    } else if (filter === "pending") {
      filtered = filtered.filter(b => b.status === "pending");
    } else if (filter === "completed") {
      filtered = filtered.filter(b => b.status === "completed");
    } else if (filter === "cancelled") {
      filtered = filtered.filter(b => b.status === "cancelled");
    }
    // console.log("Filtered bookings:", filtered);
    setEvents(mapBookingsToEvents(filtered));
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Layout.default, null, selectedEvent && /*#__PURE__*/_react.default.createElement(_BookingDetailsModal.default, {
    open: open,
    onClose: () => setOpen(false),
    booking: selectedEvent.extendedProps.booking,
    handleStatusChangeStatus: handleStatusChangeStatus
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.backBtn,
    onClick: () => window.history.back()
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    style: {
      fontSize: 13
    }
  }), " Back"), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb"
    }
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.adminStores,
    style: S.crumb
  }, "Stores"), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb"
    }
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(storeId),
    style: S.crumb
  }, storeName || "..."), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb"
    }
  }, "\u203A"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Bookings"), /*#__PURE__*/_react.default.createElement(_ReloadButton.default, {
    onReload: fetchStoreBookings
  }))), (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pending = bookings.filter(b => b.status === "pending").length;
    const completed = bookings.filter(b => b.status === "completed").length;
    const cancelled = bookings.filter(b => b.status === "cancelled").length;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "12px",
        marginBottom: "20px"
      }
    }, [{
      label: "Total bookings",
      val: bookings.length,
      sub: "This month",
      color: "#1a1a2e"
    }, {
      label: "Pending",
      val: pending,
      sub: "Awaiting action",
      color: "#e07b00"
    }, {
      label: "Completed",
      val: completed,
      sub: "This month",
      color: "#27500a"
    }, {
      label: "Cancelled",
      val: cancelled,
      sub: "This month",
      color: "#791f1f"
    }].map(s => /*#__PURE__*/_react.default.createElement("div", {
      key: s.label,
      style: {
        background: "#fff",
        border: "0.5px solid #e0dfd8",
        borderRadius: "12px",
        padding: "14px 16px"
      },
      onClick: () => handleBookingFilter(s.label.toLowerCase())
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        fontSize: "11px",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "6px"
      }
    }, s.label), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        fontSize: "22px",
        fontWeight: 600,
        color: s.color
      }
    }, s.val), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        fontSize: "11px",
        color: "#aaa",
        marginTop: "2px"
      }
    }))));
  })(), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "14px",
      border: "0.5px solid #e0dfd8",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react.default.createElement(_react2.default, {
    ref: calendarRef,
    plugins: [_daygrid.default, _timegrid.default, _interaction.default],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    eventDisplay: "block",
    events: events,
    eventContent: renderEventContent,
    eventClick: handleEventClick
  })))));
}
var _default = exports.default = AdminBookingsPage;