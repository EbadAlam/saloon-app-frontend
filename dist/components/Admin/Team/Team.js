"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _AuthContext = require("../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _DeleteButton = _interopRequireDefault(require("../../DeleteButton/DeleteButton"));
var _DummyImage = _interopRequireDefault(require("../../DummyImage/DummyImage"));
var _reactRouterDom = require("react-router-dom");
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
// const badgeColors = ['#FFE5E5','#E5F4FF','#E8FFE5','#FFF4E5','#F3E5FF','#FFFBE5'];
const badgeColors = ['#CFFAFE',
// Cyan
'#FFE4E6',
// Rose
'#DBEAFE',
// Blue
'#DCFCE7',
// Green
'#FEF3C7',
// Amber
'#F3E8FF',
// Purple
'#FCE7F3',
// Pink
'#CCFBF1',
// Teal
'#E0F2FE',
// Sky
'#ECFCCB',
// Lime
'#FDE68A',
// Yellow
'#FEE2E2',
// Red
'#EDE9FE',
// Violet
'#D1FAE5',
// Emerald
'#FFEDD5',
// Orange
'#FAE8FF' // Fuchsia
];
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
  pageTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1a1a2e"
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
  label: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "6px",
    fontWeight: 500
  },
  servicesBox: {
    border: "1px solid #e0dfd8",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    maxHeight: "160px",
    overflowY: "auto"
  },
  serviceChipActive: {
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid #1a1a2e",
    background: "#1a1a2e",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px",
    userSelect: "none"
  },
  serviceChipInactive: {
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "transparent",
    color: "#555",
    cursor: "pointer",
    fontSize: "12px",
    userSelect: "none"
  },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 16px",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
    marginBottom: "8px"
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
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a"
  },
  badgeInactive: {
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover"
  }
};
function TeamsPage() {
  var _formData$services2, _formData$profileImag;
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [teamMembers, setTeamMembers] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)("");
  const [storeServices, setStoreServices] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [formData, setFormData] = (0, _react.useState)({
    name: '',
    designation: '',
    email: '',
    gender: '',
    password: '',
    profileImage: null,
    id: '',
    services: []
  });
  const handleChange = e => {
    const {
      name,
      value,
      files
    } = e.target;
    if (name === 'profileImage') {
      setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        profileImage: files[0]
      }));
    } else {
      setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        [name]: value
      }));
    }
  };
  (0, _react.useEffect)(() => {
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const [teamRes, serviceRes] = await Promise.all([_axiosClient.default.get("/getTeamMember/".concat(storeId)), _axiosClient.default.get("/getServices/".concat(storeId))]);
      setTeamMembers(teamRes.data.store.workers);
      setStoreServices(serviceRes.data.services);
      setStoreName(teamRes.data.store.title);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => setFormData({
    name: '',
    designation: '',
    email: '',
    gender: '',
    password: '',
    profileImage: null,
    id: '',
    services: []
  });
  const handleToggleForm = () => {
    resetForm();
    setShowForm(prev => !prev);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append('username', formData.name);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('designation', formData.designation);
      dataToSend.append('gender', formData.gender);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', storeId);
      dataToSend.append('id', formData.id);
      formData.services.forEach(id => dataToSend.append('services[]', id));
      const {
        data
      } = await _axiosClient.default.post("/addTeamMember", dataToSend);
      setTeamMembers(data.store.workers);
      showSnackbar('Team member saved', 'success');
      resetForm();
    } catch (error) {
      console.error('Failed to save member:', error);
      showSnackbar('Failed to save member', 'error');
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    showSnackbar(newStatus.message, newStatus.success ? 'success' : 'error');
    if (fetch) fetchTeamMembers();
  };
  const handleToggleEditForm = (u, workerServices) => {
    var _u$user_info, _u$user_info2, _u$user_info3;
    setFormData({
      name: u.username,
      designation: (_u$user_info = u.user_info) === null || _u$user_info === void 0 ? void 0 : _u$user_info.designation,
      email: u.email,
      profileImage: (_u$user_info2 = u.user_info) === null || _u$user_info2 === void 0 ? void 0 : _u$user_info2.profile_image,
      id: u.id,
      gender: (_u$user_info3 = u.user_info) === null || _u$user_info3 === void 0 ? void 0 : _u$user_info3.gender,
      services: workerServices.map(ws => ws.service_id)
    });
    setShowForm(true);
  };
  const toggleService = serviceId => {
    setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
      services: prev.services.includes(serviceId) ? prev.services.filter(id => id !== serviceId) : [...prev.services, serviceId]
    }));
  };
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
    style: {
      color: "#bbb",
      fontSize: "13px"
    }
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
  }, "Team Members")), /*#__PURE__*/_react.default.createElement("button", {
    style: showForm ? S.cancelBtn : S.addBtn,
    onClick: handleToggleForm
  }, showForm ? "Cancel" : "+ Add Team Member")), showForm && /*#__PURE__*/_react.default.createElement("div", {
    style: S.form
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.formTitle
  }, formData.id ? "Edit Member" : "Add Member"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleFormSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.grid2
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Name",
    name: "name",
    value: formData.name,
    onChange: handleChange,
    size: "small",
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Designation",
    name: "designation",
    value: formData.designation,
    onChange: handleChange,
    size: "small"
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Email",
    name: "email",
    type: "email",
    value: formData.email,
    onChange: handleChange,
    size: "small",
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    fullWidth: true,
    label: "Gender",
    name: "gender",
    value: formData.gender,
    onChange: handleChange,
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "male"
  }, "Male"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "female"
  }, "Female")), !formData.id && /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Password",
    name: "password",
    type: "text",
    value: formData.password,
    onChange: handleChange,
    size: "small",
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: "12px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.label
  }, "Assign services ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb",
      fontWeight: 400
    }
  }, "(worker will only be bookable for selected services)")), /*#__PURE__*/_react.default.createElement("div", {
    style: S.servicesBox
  }, storeServices.length === 0 && /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "13px",
      color: "#aaa"
    }
  }, "No services found"), storeServices.map(service => {
    var _formData$services;
    const isSelected = (_formData$services = formData.services) === null || _formData$services === void 0 ? void 0 : _formData$services.includes(service.id);
    return /*#__PURE__*/_react.default.createElement("span", {
      key: service.id,
      style: isSelected ? S.serviceChipActive : S.serviceChipInactive,
      onClick: () => toggleService(service.id)
    }, service.title);
  })), ((_formData$services2 = formData.services) === null || _formData$services2 === void 0 ? void 0 : _formData$services2.length) === 0 && /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#aaa"
    }
  }, "No services selected \u2014 worker will appear for all services")), /*#__PURE__*/_react.default.createElement("label", {
    style: S.uploadBtn
  }, "Upload profile image", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    name: "profileImage",
    accept: "image/*",
    hidden: true,
    onChange: handleChange
  })), ((_formData$profileImag = formData.profileImage) === null || _formData$profileImag === void 0 ? void 0 : _formData$profileImag.name) && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#888",
      marginBottom: "8px"
    }
  }, "Selected: ", formData.profileImage.name), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.saveBtn
  }, formData.id ? "Update Member" : "Save Member")))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, ["#", "Name", "Email", "Services", "Photo", "Gender", "Designation", "Status", "Edit", ""].map(h => /*#__PURE__*/_react.default.createElement("th", {
    key: h,
    style: S.th
  }, h)))), /*#__PURE__*/_react.default.createElement("tbody", null, teamMembers && teamMembers.length > 0 ? teamMembers.map((m, i) => {
    var _m$user, _m$user2, _m$user3, _m$services, _m$user4, _m$user5, _m$user$user_info$gen, _m$user6, _m$user$user_info$des, _m$user7, _m$user8, _m$user9, _m$user0;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: (_m$user = m.user) === null || _m$user === void 0 ? void 0 : _m$user.id
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        fontWeight: 500
      })
    }, (_m$user2 = m.user) === null || _m$user2 === void 0 ? void 0 : _m$user2.username), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        color: "#555"
      })
    }, (_m$user3 = m.user) === null || _m$user3 === void 0 ? void 0 : _m$user3.email), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, ((_m$services = m.services) === null || _m$services === void 0 ? void 0 : _m$services.length) > 0 ? /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "4px"
      }
    }, m.services.map((ws, idx) => {
      var _storeServices$find$t, _storeServices$find;
      return /*#__PURE__*/_react.default.createElement("span", {
        key: ws.service_id,
        style: {
          padding: "2px 10px",
          borderRadius: "12px",
          background: badgeColors[Math.floor(Math.random() * badgeColors.length)],
          fontSize: "11px"
        }
      }, (_storeServices$find$t = (_storeServices$find = storeServices.find(s => s.id === ws.service_id)) === null || _storeServices$find === void 0 ? void 0 : _storeServices$find.title) !== null && _storeServices$find$t !== void 0 ? _storeServices$find$t : ws.service_id);
    })) : /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: "12px",
        color: "#aaa"
      }
    }, "All services")), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_m$user4 = m.user) !== null && _m$user4 !== void 0 && (_m$user4 = _m$user4.user_info) !== null && _m$user4 !== void 0 && _m$user4.profile_image ? /*#__PURE__*/_react.default.createElement("img", {
      src: m.user.user_info.signup_platform === "manual" ? "".concat(process.env.REACT_APP_IMG_URL, "/").concat(m.user.user_info.profile_image) : m.user.user_info.profile_image,
      alt: "Profile",
      style: S.avatar
    }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
      username: (_m$user5 = m.user) === null || _m$user5 === void 0 ? void 0 : _m$user5.username
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_m$user$user_info$gen = (_m$user6 = m.user) === null || _m$user6 === void 0 || (_m$user6 = _m$user6.user_info) === null || _m$user6 === void 0 ? void 0 : _m$user6.gender) !== null && _m$user$user_info$gen !== void 0 ? _m$user$user_info$gen : '—'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_m$user$user_info$des = (_m$user7 = m.user) === null || _m$user7 === void 0 || (_m$user7 = _m$user7.user_info) === null || _m$user7 === void 0 ? void 0 : _m$user7.designation) !== null && _m$user$user_info$des !== void 0 ? _m$user$user_info$des : '—'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: ((_m$user8 = m.user) === null || _m$user8 === void 0 ? void 0 : _m$user8.account_status) === 'active' ? S.badgeActive : S.badgeInactive
    }, (_m$user9 = m.user) === null || _m$user9 === void 0 ? void 0 : _m$user9.account_status)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("button", {
      style: S.editBtn,
      onClick: () => {
        var _m$services2;
        return handleToggleEditForm(m.user, (_m$services2 = m.services) !== null && _m$services2 !== void 0 ? _m$services2 : []);
      }
    }, "Edit")), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: (_m$user0 = m.user) === null || _m$user0 === void 0 ? void 0 : _m$user0.id,
      url: "/deleteTeamMember",
      onStatusChange: handleStatusChange
    })));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 10,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "32px"
    })
  }, "No team members")))))));
}
var _default = exports.default = TeamsPage;