"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _AuthContext = require("../../contexts/AuthContext");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _UserSidebar = _interopRequireDefault(require("../../components/UserSidebar/UserSidebar"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  wrap: {
    padding: "24px",
    minHeight: "600px"
  },
  tabsContainer: {
    display: "flex",
    gap: "0",
    borderBottom: "0.5px solid #e0dfd8",
    marginBottom: "24px",
    overflowX: "auto"
  },
  tab: active => ({
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
    position: "relative"
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
    textAlign: "center"
  },
  contentSection: {
    display: "none"
  },
  contentSectionActive: {
    display: "block"
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e0dfd8",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "12px",
    transition: "all 0.15s"
  },
  cardHeader: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    alignItems: "center"
  },
  cardImg: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: "10px",
    flexShrink: 0
  },
  cardLeft: {
    flex: 1,
    minWidth: 0
  },
  storeName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1a1a2e",
    textDecoration: "none",
    display: "block",
    marginBottom: "4px"
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "11px",
    color: "#888",
    marginBottom: "4px"
  },
  stars: {
    color: "#f0b429"
  },
  address: {
    fontSize: "11px",
    color: "#aaa",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cardRight: {
    textAlign: "right",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
    borderLeft: "0.5px solid #f0efe8"
  },
  workerName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#1a1a2e"
  },
  workerRole: {
    fontSize: "11px",
    color: "#aaa"
  },
  cardContent: {
    padding: "0 12px 12px",
    borderTop: "0.5px solid #f0efe8"
  },
  serviceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  serviceName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a1a2e",
    flex: 1
  },
  bundleBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    background: "#E6F1FB",
    color: "#0C447C",
    whiteSpace: "nowrap"
  },
  bundleServicesList: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "8px 10px",
    marginBottom: "8px"
  },
  bundleServiceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#555",
    padding: "3px 0"
  },
  statusBadge: status => _objectSpread({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "capitalize",
    whiteSpace: "nowrap"
  }, status === "pending" ? {
    background: "#FFF4E5",
    color: "#e07b00"
  } : status === "confirmed" ? {
    background: "#E6F1FB",
    color: "#0C447C"
  } : status === "in_progress" ? {
    background: "#EEEDFE",
    color: "#3C3489"
  } : status === "completed" ? {
    background: "#EAF3DE",
    color: "#27500a"
  } : status === "no show" ? {
    background: "#F1EFE8",
    color: "#444441"
  } : {
    background: "#FCEBEB",
    color: "#791f1f"
  }),
  serviceMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px"
  },
  metaItem: {
    fontSize: "12px",
    color: "#555"
  },
  metaPrice: {
    fontWeight: 600,
    color: "#1a1a2e"
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingTop: "8px",
    borderTop: "0.5px solid #f0efe8",
    flexWrap: "wrap"
  },
  timeInfo: {
    display: "flex",
    gap: "12px",
    fontSize: "12px",
    color: "#888"
  },
  timelineBadge: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    background: "#e8e6df",
    color: "#555"
  },
  actionButtons: {
    display: "flex",
    gap: "6px"
  },
  actionBtn: function () {
    let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "secondary";
    return _objectSpread({
      padding: "6px 14px",
      borderRadius: "8px",
      border: "none",
      fontSize: "12px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.15s"
    }, type === "primary" ? {
      background: "#1a1a2e",
      color: "#fff"
    } : type === "danger" ? {
      background: "#fcebeb",
      color: "#791f1f",
      border: "0.5px solid #e0b8b8"
    } : {
      background: "#f5f4f0",
      color: "#1a1a2e",
      border: "0.5px solid #e0dfd8"
    });
  },
  emptyBox: {
    border: "0.5px dashed #e0dfd8",
    borderRadius: "14px",
    padding: "40px 20px",
    textAlign: "center"
  },
  emptyTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  emptyText: {
    fontSize: "13px",
    color: "#aaa"
  },
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
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    borderRadius: "14px",
    width: "90%",
    maxWidth: 400,
    padding: "20px"
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "12px"
  },
  modalWarning: {
    background: "#FFF4E5",
    border: "0.5px solid #f0d4a8",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "16px",
    fontSize: "12px",
    color: "#7a5800",
    lineHeight: "1.5"
  },
  modalActions: {
    display: "flex",
    gap: "8px",
    marginTop: "16px"
  }
};
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
const getBookingEta = booking => {
  var _booking$service4;
  if (booking !== null && booking !== void 0 && booking.bundle) {
    if (!booking.booking_time || !booking.booking_time_end) return "";
    const [sh, sm] = booking.booking_time.split(":").map(Number);
    const [eh, em] = booking.booking_time_end.split(":").map(Number);
    const totalMinutes = eh * 60 + em - (sh * 60 + sm);
    if (totalMinutes <= 0) return "";
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hrs > 0 && mins > 0) return "".concat(hrs, "h ").concat(mins, "min");
    if (hrs > 0) return "".concat(hrs, "h");
    return "".concat(mins, "min");
  }
  return (booking === null || booking === void 0 || (_booking$service4 = booking.service) === null || _booking$service4 === void 0 ? void 0 : _booking$service4.eta) || "";
};
function AppointmentsPage() {
  var _location$state2, _cancelModal$booking, _cancelModal$booking2, _cancelModal$booking3;
  const location = (0, _reactRouterDom.useLocation)();
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [activeTab, setActiveTab] = (0, _react.useState)("upcoming");
  const [cancelModal, setCancelModal] = (0, _react.useState)({
    open: false,
    booking: null
  });
  const [cancelling, setCancelling] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    var _location$state;
    if ((_location$state = location.state) !== null && _location$state !== void 0 && _location$state.successMessage) {
      showSnackbar(location.state.successMessage, "success");
    }
  }, [(_location$state2 = location.state) === null || _location$state2 === void 0 ? void 0 : _location$state2.successMessage]);
  (0, _react.useEffect)(() => {
    fetchUserBookings();
  }, [user.id]);
  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getUserBookings/".concat(user.id));
      setBookings(data.bookings);
      // console.log(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showSnackbar("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };
  const parseBookingDate = (dateString, timeString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, parseInt(month) - 1, parseInt(day), parseInt(timeString.split(":")[0]), parseInt(timeString.split(":")[1]));
  };
  const getBookingsByStatus = status => {
    const now = new Date();
    if (!Array.isArray(bookings)) return [];
    if (status === "upcoming") {
      return bookings.filter(b => {
        const bookingDate = new Date("".concat(b.booking_date, "T").concat(b.booking_time));
        return bookingDate > now && ["pending", "confirmed", "in_progress"].includes(b.status);
      });
    }
    return bookings.filter(b => b.status === status);
  };
  const getCountByStatus = status => {
    const booked = getBookingsByStatus(status === "upcoming" ? "pending" : status);
    return Array.isArray(booked) ? booked.length : 0;
  };
  const canCancelBooking = booking => {
    const bookingDateTime = parseBookingDate(booking.booking_date, booking.booking_time);
    const now = new Date();
    const hoursUntil = (bookingDateTime - now) / (1000 * 60 * 60);
    return hoursUntil > 24;
  };
  const getTimelineText = booking => {
    const bookingDateTime = parseBookingDate(booking.booking_date, booking.booking_time);
    const now = new Date();
    const hoursUntil = (bookingDateTime - now) / (1000 * 60 * 60);
    if (hoursUntil <= 0) return "Appointment is today/past";
    if (hoursUntil < 24) return "in ".concat(Math.floor(hoursUntil), "h");
    const daysUntil = Math.floor(hoursUntil / 24);
    return "in ".concat(daysUntil, " day").concat(daysUntil > 1 ? "s" : "");
  };
  const handleCancelClick = booking => {
    if (canCancelBooking(booking)) {
      setCancelModal({
        open: true,
        booking
      });
    } else {
      showSnackbar("Cannot cancel within 24 hours of appointment", "error");
    }
  };
  const handleConfirmCancel = async () => {
    if (!cancelModal.booking) return;
    setCancelling(true);
    try {
      const {
        data
      } = await _axiosClient.default.post("/cancelBooking/".concat(cancelModal.booking.id));
      showSnackbar(data.message || "Appointment cancelled", "success");
      setCancelModal({
        open: false,
        booking: null
      });
      fetchUserBookings();
    } catch (error) {
      var _error$response;
      console.error("Error cancelling booking:", error);
      showSnackbar(((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Failed to cancel", "error");
    } finally {
      setCancelling(false);
    }
  };
  const tabs = [{
    key: "upcoming",
    label: "Pending"
  }, {
    key: "confirmed",
    label: "✓ Confirmed"
  }, {
    key: "completed",
    label: "✓ Completed"
  }, {
    key: "cancelled",
    label: "✕ Cancelled"
  }, {
    key: "no show",
    label: "⊘ No Show"
  }];
  const BookingCard = _ref => {
    var _booking$store, _booking$store2, _booking$store3, _booking$store4, _booking$store5, _booking$store6, _booking$store7, _booking$worker, _booking$worker2, _booking$status, _booking$bundle3, _booking$service$eta, _booking$service5, _booking$bundle4, _booking$worker3;
    let {
      booking,
      showCancel = true
    } = _ref;
    const avgRating = (_booking$store = booking.store) !== null && _booking$store !== void 0 && (_booking$store = _booking$store.reviews) !== null && _booking$store !== void 0 && _booking$store.length ? (booking.store.reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / booking.store.reviews.length).toFixed(1) : "N/A";
    const isBundleBooking = !!booking.bundle;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: S.card,
      onMouseEnter: e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)",
      onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.cardHeader
    }, /*#__PURE__*/_react.default.createElement("img", {
      style: S.cardImg,
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat((_booking$store2 = booking.store) === null || _booking$store2 === void 0 ? void 0 : _booking$store2.thumbnail),
      alt: (_booking$store3 = booking.store) === null || _booking$store3 === void 0 ? void 0 : _booking$store3.title,
      onError: e => e.target.src = "https://via.placeholder.com/80"
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: S.cardLeft
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      style: S.storeName,
      to: _routes.ROUTES.getStoreFrontPage((_booking$store4 = booking.store) === null || _booking$store4 === void 0 ? void 0 : _booking$store4.slug),
      initialData: {
        storeDetails: booking.store
      }
    }, (_booking$store5 = booking.store) === null || _booking$store5 === void 0 ? void 0 : _booking$store5.title), /*#__PURE__*/_react.default.createElement("div", {
      style: S.ratingRow
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.stars
    }, "\u2605\u2605\u2605\u2605"), /*#__PURE__*/_react.default.createElement("span", null, avgRating), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#ddd"
      }
    }, "\xB7"), /*#__PURE__*/_react.default.createElement("span", null, "(", ((_booking$store6 = booking.store) === null || _booking$store6 === void 0 || (_booking$store6 = _booking$store6.reviews) === null || _booking$store6 === void 0 ? void 0 : _booking$store6.length) || 0, ")")), /*#__PURE__*/_react.default.createElement("div", {
      style: S.address
    }, (_booking$store7 = booking.store) === null || _booking$store7 === void 0 ? void 0 : _booking$store7.address)), /*#__PURE__*/_react.default.createElement("div", {
      style: S.cardRight
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.workerName
    }, ((_booking$worker = booking.worker) === null || _booking$worker === void 0 ? void 0 : _booking$worker.username) || "Any"), /*#__PURE__*/_react.default.createElement("span", {
      style: S.workerRole
    }, (_booking$worker2 = booking.worker) === null || _booking$worker2 === void 0 || (_booking$worker2 = _booking$worker2.user_info) === null || _booking$worker2 === void 0 ? void 0 : _booking$worker2.designation))), /*#__PURE__*/_react.default.createElement("div", {
      style: S.cardContent
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.serviceHeader
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.serviceName
    }, getBookingTitle(booking)), isBundleBooking && /*#__PURE__*/_react.default.createElement("span", {
      style: S.bundleBadge
    }, "Bundle"), /*#__PURE__*/_react.default.createElement("span", {
      style: S.statusBadge(booking.status)
    }, (_booking$status = booking.status) === null || _booking$status === void 0 ? void 0 : _booking$status.replace(/_/g, " "))), isBundleBooking && ((_booking$bundle3 = booking.bundle) === null || _booking$bundle3 === void 0 || (_booking$bundle3 = _booking$bundle3.services) === null || _booking$bundle3 === void 0 ? void 0 : _booking$bundle3.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
      style: S.bundleServicesList
    }, booking.bundle.services.map(s => /*#__PURE__*/_react.default.createElement("div", {
      style: S.bundleServiceRow,
      key: s.id
    }, /*#__PURE__*/_react.default.createElement("span", null, s.title), /*#__PURE__*/_react.default.createElement("span", null, s.currency, " ", s.price)))), /*#__PURE__*/_react.default.createElement("div", {
      style: S.serviceMeta
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.metaItem
    }, (_booking$service$eta = (_booking$service5 = booking.service) === null || _booking$service5 === void 0 ? void 0 : _booking$service5.eta) !== null && _booking$service$eta !== void 0 ? _booking$service$eta : (_booking$bundle4 = booking.bundle) === null || _booking$bundle4 === void 0 ? void 0 : _booking$bundle4.eta), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#ddd"
      }
    }, "\xB7"), /*#__PURE__*/_react.default.createElement("span", {
      style: S.metaItem
    }, "with ", ((_booking$worker3 = booking.worker) === null || _booking$worker3 === void 0 ? void 0 : _booking$worker3.username) || "any professional"), /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread({
        marginLeft: "auto"
      }, S.metaPrice)
    }, getBookingCurrency(booking), " ", getBookingPrice(booking))), /*#__PURE__*/_react.default.createElement("div", {
      style: S.cardFooter
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.timeInfo
    }, /*#__PURE__*/_react.default.createElement("span", null, new Date("1970-01-01T".concat(booking.booking_time)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    }), " – ", new Date("1970-01-01T".concat(booking.booking_time_end)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })), /*#__PURE__*/_react.default.createElement("span", null, new Date(booking.booking_date.split("-")[0], parseInt(booking.booking_date.split("-")[1]) - 1, booking.booking_date.split("-")[2]).toLocaleDateString("en-GB")), activeTab === "upcoming" && /*#__PURE__*/_react.default.createElement("span", {
      style: S.timelineBadge
    }, getTimelineText(booking)), activeTab === "cancelled" && /*#__PURE__*/_react.default.createElement("span", {
      style: S.timelineBadge
    }, "Cancelled by", " ", booking.cancelled_by === "customer" ? "you" : "salon")), /*#__PURE__*/_react.default.createElement("div", {
      style: S.actionButtons
    }, showCancel && (activeTab === "upcoming" || activeTab === "confirmed") && /*#__PURE__*/_react.default.createElement("button", {
      style: _objectSpread(_objectSpread({}, S.actionBtn("danger")), {}, {
        opacity: canCancelBooking(booking) ? 1 : 0.5,
        cursor: canCancelBooking(booking) ? "pointer" : "not-allowed"
      }),
      onClick: () => handleCancelClick(booking),
      disabled: !canCancelBooking(booking)
    }, "Cancel")))));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_UserSidebar.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.wrap
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: {
      fontSize: "24px",
      fontWeight: 600,
      marginBottom: "20px"
    }
  }, "Appointments"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.tabsContainer
  }, tabs.map(tab => /*#__PURE__*/_react.default.createElement("button", {
    key: tab.key,
    style: S.tab(activeTab === tab.key),
    onClick: () => setActiveTab(tab.key)
  }, tab.label, /*#__PURE__*/_react.default.createElement("span", {
    style: S.tabBadge
  }, getCountByStatus(tab.key === "upcoming" ? "pending" : tab.key))))), tabs.map(tab => /*#__PURE__*/_react.default.createElement("div", {
    key: tab.key,
    style: activeTab === tab.key ? S.contentSectionActive : S.contentSection
  }, getBookingsByStatus(tab.key === "upcoming" ? "pending" : tab.key).length > 0 ? getBookingsByStatus(tab.key === "upcoming" ? "pending" : tab.key).map(booking => /*#__PURE__*/_react.default.createElement(BookingCard, {
    key: booking.id,
    booking: booking,
    showCancel: tab.key === "upcoming" || tab.key === "confirmed"
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyBox
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyTitle
  }, "No ", tab.label.toLowerCase(), " appointments"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyText
  }, tab.key === "upcoming" ? "Your upcoming appointments will appear here" : "".concat(tab.label, " appointments will appear here")))))), cancelModal.open && /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalOverlay
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.modal
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalTitle
  }, "Cancel appointment?"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalWarning
  }, "\u26A0\uFE0F You can only cancel appointments", " ", /*#__PURE__*/_react.default.createElement("strong", null, "24 hours before"), " the scheduled time."), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      fontSize: "13px",
      color: "#555",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement("strong", null, getBookingTitle(cancelModal.booking)), " on", " ", new Date((_cancelModal$booking = cancelModal.booking) === null || _cancelModal$booking === void 0 ? void 0 : _cancelModal$booking.booking_date).toLocaleDateString(), " ", "at", " ", new Date("1970-01-01T".concat((_cancelModal$booking2 = cancelModal.booking) === null || _cancelModal$booking2 === void 0 ? void 0 : _cancelModal$booking2.booking_time)).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  }), " ", "with ", (_cancelModal$booking3 = cancelModal.booking) === null || _cancelModal$booking3 === void 0 || (_cancelModal$booking3 = _cancelModal$booking3.worker) === null || _cancelModal$booking3 === void 0 ? void 0 : _cancelModal$booking3.username), /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalActions
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: _objectSpread(_objectSpread({}, S.actionBtn("secondary")), {}, {
      flex: 1,
      padding: "10px"
    }),
    onClick: () => setCancelModal({
      open: false,
      booking: null
    }),
    disabled: cancelling
  }, "Keep Appointment"), /*#__PURE__*/_react.default.createElement("button", {
    style: _objectSpread(_objectSpread({}, S.actionBtn("danger")), {}, {
      flex: 1,
      padding: "10px"
    }),
    onClick: handleConfirmCancel,
    disabled: cancelling
  }, cancelling ? "Cancelling..." : "Yes, Cancel"))))))));
}
var _default = exports.default = AppointmentsPage;