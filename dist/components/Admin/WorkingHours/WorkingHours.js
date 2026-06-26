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
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _DeleteButton = _interopRequireDefault(require("../../DeleteButton/DeleteButton"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
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
  sep: {
    color: "#bbb",
    fontSize: "13px"
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
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px"
  },
  formTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "16px"
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px"
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
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
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
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500
  }
};
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function WorkingHoursPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [workingHours, setWorkingHours] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [storeName, setStoreName] = (0, _react.useState)('');
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const defaultForm = {
    day: '',
    startTime: '',
    endTime: '',
    store_id: storeId,
    isClosed: true,
    id: ''
  };
  const [formData, setFormData] = (0, _react.useState)(defaultForm);
  (0, _react.useEffect)(() => {
    fetchWorkingHours();
  }, []);
  const fetchWorkingHours = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getStoreTimings/".concat(storeId));
      setWorkingHours(data.timings);
      setStoreName(data.storeName || '');
    } catch (error) {
      console.error('Failed to fetch timings:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = field => e => {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      [field]: field === 'isClosed' ? e.target.checked : e.target.value
    }));
  };
  const handleToggleForm = () => {
    setFormData(defaultForm);
    setShowForm(prev => !prev);
  };
  const handleToggleEditForm = wh => {
    setFormData({
      day: wh.day,
      startTime: wh.start_time,
      endTime: wh.end_time,
      isClosed: wh.is_closed,
      store_id: storeId,
      id: wh.id
    });
    setShowForm(true);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post('/addStoreTimings', formData);
      setWorkingHours(data.timings);
      showSnackbar(data.message || 'Working hours saved', 'success');
      setFormData(defaultForm);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save timings:', error);
      showSnackbar('Failed to save', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = newStatus => {
    showSnackbar(newStatus.message, newStatus.success ? 'success' : 'error');
    fetchWorkingHours();
  };
  const isOpen = wh => wh.is_closed === 'active';
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.nav
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.backBtn,
    onClick: () => window.history.back()
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    style: {
      fontSize: 14
    }
  }), " Back"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.adminStores,
    style: S.crumb
  }, "Stores"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(storeId),
    style: S.crumb
  }, storeName || '...'), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Working Hours")), /*#__PURE__*/_react.default.createElement("button", {
    style: showForm ? S.cancelBtn : S.addBtn,
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : '+ Add Working Hours')), showForm && /*#__PURE__*/_react.default.createElement("div", {
    style: S.form
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.formTitle
  }, formData.id ? 'Edit Hours' : 'Add Hours'), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleFormSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.grid2
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    label: "Day",
    value: formData.day,
    onChange: handleChange('day'),
    fullWidth: true,
    size: "small",
    required: true
  }, (formData.id ? daysOfWeek : daysOfWeek.filter(d => !workingHours.some(wh => wh.day === d))).map(day => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: day,
    value: day
  }, day))), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_material.Switch, {
      checked: formData.isClosed,
      onChange: handleChange('isClosed'),
      sx: {
        '& .MuiSwitch-thumb': {
          background: '#1a1a2e'
        },
        '& .Mui-checked+.MuiSwitch-track': {
          background: '#1a1a2e'
        }
      }
    }),
    label: /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 13,
        color: '#555'
      }
    }, formData.isClosed ? 'Open' : 'Closed')
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Start Time",
    type: "time",
    value: formData.startTime,
    onChange: handleChange('startTime'),
    fullWidth: true,
    size: "small",
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
    size: "small",
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      step: 300
    },
    required: !formData.isClosed
  })), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.saveBtn
  }, "Save"))), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.card), {}, {
      maxWidth: 900
    })
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, ['#', 'Day', 'Start Time', 'End Time', 'Status', 'Toggle', 'Edit', ''].map(h => /*#__PURE__*/_react.default.createElement("th", {
    key: h,
    style: _objectSpread(_objectSpread({}, S.th), {}, {
      textAlign: h === '#' || h === 'Day' ? 'left' : 'center'
    })
  }, h)))), /*#__PURE__*/_react.default.createElement("tbody", null, workingHours.length > 0 ? workingHours.map((wh, i) => /*#__PURE__*/_react.default.createElement("tr", {
    key: wh.id
  }, /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdNum
  }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      fontWeight: 500
    })
  }, wh.day), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, wh.start_time_formatted || '—'), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, wh.end_time_formatted || '—'), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "999px",
      fontSize: "11px",
      fontWeight: 500,
      background: isOpen(wh) ? "#eaf3de" : "#fcebeb",
      color: isOpen(wh) ? "#27500a" : "#791f1f"
    }
  }, isOpen(wh) ? 'Open' : 'Closed')), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: wh.id,
    apiUrl: "/updateStoreTimingsIsClosed",
    status: wh.is_closed,
    onStatusChange: handleStatusChange,
    label: isOpen(wh) ? 'Close' : 'Open'
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.editBtn,
    onClick: () => handleToggleEditForm(wh)
  }, "Edit")), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center'
    })
  }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: wh.id,
    url: "/deleteStoreTiming",
    onStatusChange: handleStatusChange
  })))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 8,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No working hours added")))))));
}
var _default = exports.default = WorkingHoursPage;