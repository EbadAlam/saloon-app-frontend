"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _DeleteButton = _interopRequireDefault(require("../../DeleteButton/DeleteButton"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function WorkingHoursPage() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [loading, setLoading] = (0, _react.useState)(true);
  const [workingHours, setWorkingHours] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  (0, _react.useEffect)(() => {
    fetchWorkingHours();
  }, []);
  const fetchWorkingHours = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getStoreTimings/".concat(storeId));
      // console.log('timings ',data.timings);
      setWorkingHours(data.timings);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setFormData({
      day: '',
      startTime: '',
      endTime: '',
      store_id: storeId,
      isClosed: true,
      id: ''
    });
    setShowForm(prev => !prev);
  };
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const handleStatusChange = newStatus => {
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    fetchWorkingHours();
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  const [formData, setFormData] = (0, _react.useState)({
    day: '',
    startTime: '',
    endTime: '',
    store_id: storeId,
    isClosed: true,
    id: ''
  });
  const handleChange = field => event => {
    const value = field === 'isClosed' ? event.target.checked : event.target.value;
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      [field]: value
    }));
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post('/addStoreTimings', formData);
      setWorkingHours(data.timings);
      showAlert('success', data.message || 'Working hour saved');
      setFormData({
        day: '',
        startTime: '',
        endTime: '',
        store_id: storeId,
        isClosed: true,
        id: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save timings:', error);
    } finally {
      setLoading(false);
    }
  };
  const showAlert = (type, message) => {
    setAlertMessage(message);
    setAlertMessageType(type);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  const handleToggleEditForm = workingHouor => {
    setFormData({
      day: workingHouor.day,
      startTime: workingHouor.start_time,
      endTime: workingHouor.end_time,
      isClosed: workingHouor.is_closed,
      store_id: storeId,
      id: workingHouor.id
    });
    setShowForm(true);
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
  }, "Working Hours"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "dark-btn",
    variant: "contained",
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : 'Add/Edit Working Hours'))), showForm && /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleFormSubmit,
    sx: {
      mb: 3,
      p: 2,
      border: '1px solid #ddd',
      borderRadius: 2
    }
  }, formData.id ? /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    label: "Day",
    value: formData.day,
    onChange: handleChange('day'),
    fullWidth: true,
    margin: "normal",
    required: true
  }, daysOfWeek.map(day => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: day,
    value: day
  }, day))) : /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    label: "Day",
    value: formData.day,
    onChange: handleChange('day'),
    fullWidth: true,
    margin: "normal",
    required: true
  }, daysOfWeek.filter(day => !workingHours.some(wh => wh.day === day)).map(day => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: day,
    value: day
  }, day))), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Start Time",
    type: "time",
    value: formData.startTime,
    onChange: handleChange('startTime'),
    fullWidth: true,
    margin: "normal",
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      step: 300
    },
    required: !formData.isClosed
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "End Time",
    type: "time",
    value: formData.endTime,
    onChange: handleChange('endTime'),
    fullWidth: true,
    margin: "normal",
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      step: 300
    },
    required: !formData.isClosed
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Switch, {
      checked: formData.isClosed,
      onChange: handleChange('isClosed'),
      color: "primary"
    }),
    label: formData.isClosed ? 'Open' : 'Closed'
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    sx: {
      mt: 2
    }
  }, "Save")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    sx: {
      maxWidth: 800
    },
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Categories Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Day"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Start Time"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "End Time"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Closed"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Delete"))), workingHours && workingHours.length > 0 ? workingHours.map((singleHour, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleHour.day), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right",
    component: "th",
    scope: "row"
  }, singleHour.start_time_formatted), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right",
    component: "th",
    scope: "row"
  }, singleHour.end_time_formatted), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right",
    sx: {
      color: singleHour.is_closed === 'active' ? 'green' : 'red',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }, singleHour.is_closed === 'active' ? 'Open' : 'Closed'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right",
    component: "th",
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: singleHour.id,
    apiUrl: "/updateStoreTimingsIsClosed",
    status: singleHour.is_closed,
    onStatusChange: handleStatusChange,
    label: singleHour.is_closed === 'active' ? 'Close' : 'Open'
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: () => handleToggleEditForm(singleHour)
  }, "Edit")), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: singleHour.id,
    url: "/deleteStoreTiming",
    onStatusChange: handleStatusChange
  }))))) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Working Hours"))))));
}
var _default = exports.default = WorkingHoursPage;