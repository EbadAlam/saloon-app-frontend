"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _reactRouterDom = require("react-router-dom");
var _react2 = _interopRequireDefault(require("@fullcalendar/react"));
var _daygrid = _interopRequireDefault(require("@fullcalendar/daygrid"));
var _timegrid = _interopRequireDefault(require("@fullcalendar/timegrid"));
var _interaction = _interopRequireDefault(require("@fullcalendar/interaction"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
var _BookingDetailsModal = _interopRequireDefault(require("../BookingDetailsModal/BookingDetailsModal"));
var _ReloadButton = _interopRequireDefault(require("../../ReloadButton/ReloadButton"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _CalendarMonth = _interopRequireDefault(require("@mui/icons-material/CalendarMonth"));
var _TableRows = _interopRequireDefault(require("@mui/icons-material/TableRows"));
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: "24px",
    background: "#f5f4f0",
    minHeight: "100vh"
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
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden"
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
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle"
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle"
  },
  viewToggle: {
    display: "inline-flex",
    border: "0.5px solid #e0dfd8",
    borderRadius: "8px",
    overflow: "hidden"
  },
  viewBtn: active => ({
    padding: "6px 12px",
    border: "none",
    background: active ? "#1a1a2e" : "#fff",
    color: active ? "#fff" : "#888",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: 500
  }),
  bulkBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderBottom: "0.5px solid #f0efe8",
    background: "#fafaf8"
  },
  bulkSelect: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "0.5px solid #e0dfd8",
    fontSize: "13px",
    color: "#1a1a2e",
    background: "#fff",
    cursor: "pointer"
  },
  applyBtn: {
    padding: "6px 16px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  applyBtnDisabled: {
    padding: "6px 16px",
    borderRadius: "8px",
    background: "#ccc",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "not-allowed",
    fontWeight: 500
  }
};
const getStatusStyle = status => ({
  pending: {
    background: "#FFF4E5",
    color: "#e07b00"
  },
  confirmed: {
    background: "#E6F1FB",
    color: "#0C447C"
  },
  in_progress: {
    background: "#EEEDFE",
    color: "#3C3489"
  },
  completed: {
    background: "#EAF3DE",
    color: "#27500a"
  },
  no_show: {
    background: "#F1EFE8",
    color: "#444441"
  },
  cancelled: {
    background: "#FCEBEB",
    color: "#791f1f"
  }
})[status] || {
  background: "#F1EFE8",
  color: "#444441"
};
const getStatusDot = status => ({
  pending: "#e07b00",
  confirmed: "#378ADD",
  in_progress: "#7F77DD",
  completed: "#639922",
  no_show: "#888780",
  cancelled: "#E24B4A"
})[status] || "#888780";

// A booking is either tied to a single service or to a bundle (a group of
// services booked as one). These helpers centralize the "which one do I
// show" fallback so every render spot stays in sync.
const getBookingTitle = booking => {
  var _booking$bundle, _booking$service;
  return (booking === null || booking === void 0 || (_booking$bundle = booking.bundle) === null || _booking$bundle === void 0 ? void 0 : _booking$bundle.title) || (booking === null || booking === void 0 || (_booking$service = booking.service) === null || _booking$service === void 0 ? void 0 : _booking$service.title) || "Booking";
};
const getBookingCurrency = booking => {
  var _booking$bundle2, _booking$service2;
  return (booking === null || booking === void 0 || (_booking$bundle2 = booking.bundle) === null || _booking$bundle2 === void 0 ? void 0 : _booking$bundle2.currency) || (booking === null || booking === void 0 || (_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.currency) || "";
};
const getBookingPrice = booking => {
  var _booking$service3;
  return booking !== null && booking !== void 0 && booking.bundle ? booking.bundle.price : booking === null || booking === void 0 || (_booking$service3 = booking.service) === null || _booking$service3 === void 0 ? void 0 : _booking$service3.price;
};
function AdminBookingsPage() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [open, setOpen] = (0, _react.useState)(false);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [filteredBookings, setFilteredBookings] = (0, _react.useState)([]);
  const [events, setEvents] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)("");
  const [selectedEvent, setSelectedEvent] = (0, _react.useState)(null);
  const [view, setView] = (0, _react.useState)("calendar");
  const [selectedRows, setSelectedRows] = (0, _react.useState)([]);
  const [bulkStatus, setBulkStatus] = (0, _react.useState)("");
  const calendarRef = (0, _react.useRef)(null);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  (0, _react.useEffect)(() => {
    fetchStoreBookings();
  }, []);
  const getRandomLightColor = () => {
    const r = Math.floor(180 + Math.random() * 75);
    const g = Math.floor(180 + Math.random() * 75);
    const b = Math.floor(180 + Math.random() * 75);
    return "#".concat(r.toString(16).padStart(2, "0")).concat(g.toString(16).padStart(2, "0")).concat(b.toString(16).padStart(2, "0"));
  };
  const mapBookingsToEvents = list => list.map(booking => {
    var _booking$service4, _booking$user, _booking$worker;
    const start = parseBookingDate(booking.booking_date, booking.booking_time);
    let etaMinutes = 0;
    if ((_booking$service4 = booking.service) !== null && _booking$service4 !== void 0 && _booking$service4.eta) {
      const s = booking.service.eta.toLowerCase();
      const hr = s.match(/(\d+)\s*hour/);
      const min = s.match(/(\d+)\s*minutes/);
      if (hr) etaMinutes += parseInt(hr[1]) * 60;
      if (min) etaMinutes += parseInt(min[1]);
    } else if (booking.booking_time_end) {
      // Bundles don't carry a single service.eta, so fall back to the
      // actual stored end time to compute the event's duration.
      const end = parseBookingDate(booking.booking_date, booking.booking_time_end);
      etaMinutes = Math.max(0, (end - start) / 60000);
    }
    return {
      id: booking.id,
      title: getBookingTitle(booking),
      start,
      end: new Date(start.getTime() + etaMinutes * 60000),
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
  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getBooking/".concat(storeId));
      if (data.success) {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
        setStoreName(data.storeName || "");
        setEvents(mapBookingsToEvents(data.bookings));
        _axiosClient.default.post("/updateBookingSeen/".concat(storeId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const parseBookingDate = (dateString, timeString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, parseInt(month) - 1, parseInt(day), parseInt(timeString.split(":")[0]), parseInt(timeString.split(":")[1]));
  };
  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.put("/updateBookingStatus/".concat(id), {
        status: newStatus
      });
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
      const {
        data
      } = await _axiosClient.default.post("/bulkUpdateBookingStatus", {
        ids: selectedRows,
        status: bulkStatus
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
  const toggleRow = id => setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleAll = () => setSelectedRows(selectedRows.length === bookings.length ? [] : bookings.map(b => b.id));
  const handleEventClick = clickInfo => {
    setSelectedEvent(clickInfo.event);
    setOpen(true);
  };
  const handleBookingFilter = filter => {
    const key = filter.toLowerCase();
    const filtered = key === "all" || key === "total bookings" ? bookings : bookings.filter(b => b.status === key);
    if (view === "list") {
      setFilteredBookings(filtered);
    } else if (view === "calendar") {
      setEvents(mapBookingsToEvents(filtered));
    }
  };
  (0, _react.useEffect)(() => {
    if (!calendarRef.current) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pendingPast = bookings.filter(b => {
      const bDate = new Date(b.booking_date.split("-")[0], parseInt(b.booking_date.split("-")[1]) - 1, b.booking_date.split("-")[2]);
      return bDate < today && b.status === "pending";
    }).length;
    const pendingFuture = bookings.filter(b => {
      const bDate = new Date(b.booking_date.split("-")[0], parseInt(b.booking_date.split("-")[1]) - 1, b.booking_date.split("-")[2]);
      return bDate >= today && b.status === "pending";
    }).length;
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
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: getStatusDot(booking === null || booking === void 0 ? void 0 : booking.status),
        verticalAlign: "middle"
      }
    }));
  };
  const statCards = (() => {
    const pending = bookings.filter(b => b.status === "pending").length;
    const confirmed = bookings.filter(b => b.status === "confirmed").length;
    const completed = bookings.filter(b => b.status === "completed").length;
    const cancelled = bookings.filter(b => b.status === "cancelled").length;
    const noShow = bookings.filter(b => b.status === "no show").length;
    return [{
      label: "Total bookings",
      val: bookings.length,
      color: "#1a1a2e"
    }, {
      label: "Pending",
      val: pending,
      color: "#e07b00"
    }, {
      label: "Confirmed",
      val: confirmed,
      color: "#007bff"
    }, {
      label: "Completed",
      val: completed,
      color: "#27500a"
    }, {
      label: "Cancelled",
      val: cancelled,
      color: "#791f1f"
    }, {
      label: "No Show",
      val: noShow,
      color: "#dc3545"
    }];
  })();
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, selectedEvent && /*#__PURE__*/_react.default.createElement(_BookingDetailsModal.default, {
    open: open,
    onClose: () => setOpen(false),
    booking: selectedEvent.extendedProps.booking,
    handleStatusChangeStatus: handleStatusChangeStatus
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
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
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.viewToggle
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.viewBtn(view === "calendar"),
    onClick: () => setView("calendar")
  }, /*#__PURE__*/_react.default.createElement(_CalendarMonth.default, {
    style: {
      fontSize: 14
    }
  }), " Calendar"), /*#__PURE__*/_react.default.createElement("button", {
    style: S.viewBtn(view === "list"),
    onClick: () => setView("list")
  }, /*#__PURE__*/_react.default.createElement(_TableRows.default, {
    style: {
      fontSize: 14
    }
  }), " List"))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gap: "12px",
      marginBottom: "20px"
    }
  }, statCards.map(s => /*#__PURE__*/_react.default.createElement("div", {
    key: s.label,
    onClick: () => handleBookingFilter(s.label),
    style: {
      background: "#fff",
      border: "0.5px solid #e0dfd8",
      borderRadius: "12px",
      padding: "14px 16px",
      cursor: "pointer"
    }
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
  }, s.val)))), view === "calendar" && /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
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
  })), view === "list" && /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.bulkBar
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "13px",
      color: "#888"
    }
  }, selectedRows.length > 0 ? "".concat(selectedRows.length, " selected") : "Select rows to bulk update"), /*#__PURE__*/_react.default.createElement("select", {
    style: S.bulkSelect,
    value: bulkStatus,
    onChange: e => setBulkStatus(e.target.value),
    disabled: selectedRows.length === 0
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Change status to\u2026"), /*#__PURE__*/_react.default.createElement("option", {
    value: "confirmed"
  }, "Confirmed"), /*#__PURE__*/_react.default.createElement("option", {
    value: "completed"
  }, "Completed"), /*#__PURE__*/_react.default.createElement("option", {
    value: "no show"
  }, "No Show"), /*#__PURE__*/_react.default.createElement("option", {
    value: "cancelled"
  }, "Cancelled")), /*#__PURE__*/_react.default.createElement("button", {
    style: selectedRows.length === 0 || !bulkStatus ? S.applyBtnDisabled : S.applyBtn,
    disabled: selectedRows.length === 0 || !bulkStatus,
    onClick: handleBulkApply
  }, "Apply")), /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectedRows.length === filteredBookings.length && filteredBookings.length > 0,
    onChange: toggleAll,
    style: {
      accentColor: "#1a1a2e",
      cursor: "pointer"
    }
  })), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Customer"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "cancelled/no show"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Service"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Worker"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Date"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Time"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Price"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"))), /*#__PURE__*/_react.default.createElement("tbody", null, filteredBookings.length > 0 ? filteredBookings.map((b, i) => {
    var _b$user, _b$user2, _b$user3, _b$worker, _b$status;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: b.id,
      style: {
        background: selectedRows.includes(b.id) ? "#f0f4ff" : i % 2 === 0 ? "#fff" : "#fafaf8",
        cursor: "pointer"
      },
      onClick: () => toggleRow(b.id)
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      checked: selectedRows.includes(b.id),
      onChange: () => toggleRow(b.id),
      onClick: e => e.stopPropagation(),
      style: {
        accentColor: "#1a1a2e",
        cursor: "pointer"
      }
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, ((_b$user = b.user) === null || _b$user === void 0 ? void 0 : _b$user.username) || "Guest"), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, ((_b$user2 = b.user) === null || _b$user2 === void 0 ? void 0 : _b$user2.cancelled_count) || "0", "/", ((_b$user3 = b.user) === null || _b$user3 === void 0 ? void 0 : _b$user3.no_show_count) || "0"), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        fontWeight: 500
      })
    }, getBookingTitle(b), b.bundle && /*#__PURE__*/_react.default.createElement("span", {
      style: {
        marginLeft: "6px",
        fontSize: "10px",
        fontWeight: 600,
        color: "#0C447C",
        background: "#E6F1FB",
        padding: "2px 6px",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: "0.03em"
      }
    }, "Bundle")), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, ((_b$worker = b.worker) === null || _b$worker === void 0 ? void 0 : _b$worker.username) || "Any"), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, new Date(b.booking_date.split("-")[0], parseInt(b.booking_date.split("-")[1]) - 1, b.booking_date.split("-")[2]).toLocaleDateString("en-GB")), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, new Date("1970-01-01T".concat(b.booking_time)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    }), " – ", new Date("1970-01-01T".concat(b.booking_time_end)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, getBookingCurrency(b), " ", getBookingPrice(b)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread(_objectSpread({}, getStatusStyle(b.status)), {}, {
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
        textTransform: "capitalize"
      })
    }, (_b$status = b.status) === null || _b$status === void 0 ? void 0 : _b$status.replace("_", " "))));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 9,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "32px"
    })
  }, "No bookings")))))));
}
var _default = exports.default = AdminBookingsPage;