"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _AuthContext = require("../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Admin/Layout/Layout"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function WorkersBookingsPage() {
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)();
  const [alertMessage, setAlertMessage] = (0, _react.useState)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [loader, setLoader] = (0, _react.useState)();
  const fetchWorkersBookings = (0, _react.useCallback)(async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getBooking/".concat(user.worker_store.store_id));
      setBookings(data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [user.worker_store.store_id]);
  (0, _react.useEffect)(() => {
    fetchWorkersBookings();
  }, [fetchWorkersBookings]);
  const handleAssignYourself = async bookingId => {
    setAlertMessage('');
    setAlertMessageType('');
    setLoader(bookingId);
    try {
      const {
        data
      } = await _axiosClient.default.post('/assignToMe', {
        booking_id: bookingId,
        worker_id: user.id
      });
      setAlertMessage(data.message);
      setAlertMessageType(data.messageType);
    } catch (err) {
      console.error('Assignment failed', err);
    } finally {
      fetchWorkersBookings();
      setLoader();
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Bookings")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Service Name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Time ETA"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "User"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Day"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Time"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Assign to you"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"))), bookings && bookings.length > 0 ? bookings.map((singleBooking, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
    key: singleBooking.id
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBooking.service.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBooking.service.eta), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBooking.user.username), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, new Date(singleBooking.booking_date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, new Date("1970-01-01T".concat(singleBooking.booking_time)).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBooking.worker ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "".concat(singleBooking.worker.id === user.id ? 'green' : 'red')
    }
  }, singleBooking.worker.id === user.id ? 'Yes' : 'No') : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loader && loader === singleBooking.id ? /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: "30px"
  }) : /*#__PURE__*/_react.default.createElement("p", {
    style: {
      cursor: 'pointer',
      color: '#007bff'
    },
    onClick: () => handleAssignYourself(singleBooking.id)
  }, "Assign yourself"))), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBooking.status)))) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Bookings"))))));
}
var _default = exports.default = WorkersBookingsPage;