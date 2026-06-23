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
function Servicespage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [services, setServices] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)("");
  const [categories, setCategories] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)("");
  const [categoryId, setCategoryId] = (0, _react.useState)("");
  const [price, setPrice] = (0, _react.useState)("");
  const [eta, setEta] = (0, _react.useState)("");
  const [gender, setGender] = (0, _react.useState)("");
  const [currency, setCurrency] = (0, _react.useState)("PKR");
  const [serviceId, setServiceId] = (0, _react.useState)("");
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const genderOptions = ["male", "female"];
  const etaOptions = ["30 minutes", "45 minutes", "1 hour", "1 hour 15 minutes", "1 hour 30 minutes", "1 hour 45 minutes", "2 hours"];
  (0, _react.useEffect)(() => {
    fetchServices();
    fetchStoreCategories();
  }, []);
  const fetchStoreCategories = async () => {
    try {
      const {
        data
      } = await _axiosClient.default.get("/getStoreCategories/".concat(storeId));
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  const fetchServices = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getServices/".concat(storeId));
      setServices(data.services);
      setStoreName(data.storeName);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setTitle("");
    setCategoryId("");
    setPrice("");
    setEta("");
    setGender("");
    setServiceId("");
    setCurrency("PKR");
  };
  const handleToggleForm = () => {
    resetForm();
    setShowForm(prev => !prev);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post("/addServices", {
        store_id: storeId,
        title,
        service_category_id: categoryId,
        price,
        eta,
        gender,
        currency,
        serviceId
      });
      setServices(data.services);
      showSnackbar(data.message || "Service saved", "success");
    } catch (error) {
      console.error("Failed to save service:", error);
      showSnackbar("Failed to save service", "error");
    } finally {
      setLoading(false);
      setShowForm(false);
      resetForm();
    }
  };
  const handleStatusChange = newStatus => {
    showSnackbar(newStatus.message, newStatus.success ? "success" : "error");
    fetchServices();
  };
  const handleToggleEditForm = service => {
    setTitle(service.title);
    setCategoryId(service.category.id);
    setPrice(service.price);
    setEta(service.eta);
    setGender(service.gender);
    setServiceId(service.id);
    setShowForm(true);
  };
  const isActive = s => s.status === "active" && s.is_active_by_admin == 1;
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
  }, storeName || "..."), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Services")), /*#__PURE__*/_react.default.createElement("button", {
    style: showForm ? S.cancelBtn : S.addBtn,
    onClick: handleToggleForm
  }, showForm ? "Cancel" : "+ Add Service")), showForm && /*#__PURE__*/_react.default.createElement("div", {
    style: S.form
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleFormSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Service Title",
    value: title,
    onChange: e => setTitle(e.target.value),
    required: true,
    size: "small"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "cat-label"
  }, "Service Category"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "cat-label",
    value: categoryId,
    label: "Service Category",
    onChange: e => setCategoryId(e.target.value),
    required: true
  }, categories === null || categories === void 0 ? void 0 : categories.filter(c => c.category.status === "active").map(c => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: c.id,
    value: c.category.id
  }, c.category.title)))), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Price",
    type: "number",
    value: price,
    onChange: e => setPrice(e.target.value),
    required: true,
    size: "small",
    InputProps: {
      startAdornment: /*#__PURE__*/_react.default.createElement(_material.InputAdornment, {
        position: "start"
      }, currency)
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    fullWidth: true,
    label: "Estimated Time",
    value: eta,
    onChange: e => setEta(e.target.value),
    required: true,
    size: "small"
  }, etaOptions.map(o => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: o,
    value: o
  }, o))), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "gender-label"
  }, "Gender"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "gender-label",
    value: gender,
    label: "Gender",
    onChange: e => setGender(e.target.value)
  }, genderOptions.map(o => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: o,
    value: o
  }, o.charAt(0).toUpperCase() + o.slice(1)))))), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.saveBtn
  }, serviceId ? "Update Service" : "Save Service"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, ["#", "Title", "Category", "ETA", "Price", "Gender", "Status", "Toggle", "Edit", ""].map(h => /*#__PURE__*/_react.default.createElement("th", {
    key: h,
    style: S.th
  }, h)))), /*#__PURE__*/_react.default.createElement("tbody", null, services && services.length > 0 ? services.map((s, i) => /*#__PURE__*/_react.default.createElement("tr", {
    key: s.id,
    style: {
      background: i % 2 === 0 ? "#fff" : "#fafaf8"
    }
  }, /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdNum
  }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      fontWeight: 500
    })
  }, s.title), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, s.category.title), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, s.eta), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, s.currency, " ", s.price), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      color: s.gender ? "#1a1a2e" : "#aaa"
    })
  }, s.gender ? s.gender.charAt(0).toUpperCase() + s.gender.slice(1) : "—"), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: isActive(s) ? S.badgeActive : S.badgeDisabled
  }, s.status === "active" && s.is_active_by_admin == 1 ? "Active" : s.is_active_by_admin != 1 ? "Disabled by admin" : "Inactive")), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, s.is_active_by_admin == 1 && /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: s.id,
    apiUrl: "/updateServicesStatus",
    status: s.status,
    onStatusChange: handleStatusChange
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.editBtn,
    onClick: () => handleToggleEditForm(s)
  }, "Edit")), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: s.id,
    url: "/deleteServices",
    onStatusChange: handleStatusChange
  })))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 10,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "32px"
    })
  }, "No services found")))))));
}
var _default = exports.default = Servicespage;