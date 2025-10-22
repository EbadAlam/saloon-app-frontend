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
var _DummyImage = _interopRequireDefault(require("../../DummyImage/DummyImage"));
var _reactRouterDom = require("react-router-dom");
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AdminBookingsPage() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  (0, _react.useEffect)(() => {
    fetchStoreBookings();
  }, []);
  const fetchStoreBookings = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getBooking/".concat(storeId));
      setBookings(data.bookings);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchStoreBookings();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
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
      console.error('Error updating user status ', error);
      setLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Bookings"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Bookings Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "User"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Email"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Service"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "ETA"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Worker"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Date"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Time"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Status"))), bookings && bookings.length > 0 ? bookings.map((singleBooking, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
    key: index + 1
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    align: "left",
    scope: "row"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, singleBooking.user.username), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, singleBooking.user.email), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, singleBooking.service.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, singleBooking.service.eta), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, singleBooking.worker ? singleBooking.worker.username : '---'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, new Date(singleBooking.booking_date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, new Date("1970-01-01T".concat(singleBooking.booking_time)).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: singleBooking.status === 'pending' ? '#ff7800' : singleBooking.status === 'completed' ? 'green' : 'red',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }, singleBooking.status), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "tr",
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    defaultValue: singleBooking.status,
    onChange: e => handleStatusChangeStatus(singleBooking.id, e.target.value)
  }, ['pending', 'cancelled', 'completed'].map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))))))) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Bookings"))))));
}
var _default = exports.default = AdminBookingsPage;