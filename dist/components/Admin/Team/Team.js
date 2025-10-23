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
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
var _DeleteButton = _interopRequireDefault(require("../../DeleteButton/DeleteButton"));
var _DummyImage = _interopRequireDefault(require("../../DummyImage/DummyImage"));
var _reactRouterDom = require("react-router-dom");
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function TeamsPage() {
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [teamMembers, setTeamMembers] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [formData, setFormData] = (0, _react.useState)({
    name: '',
    designation: '',
    email: '',
    password: '',
    profileImage: null,
    id: ''
  });
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
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
      const {
        data
      } = await _axiosClient.default.get("/getTeamMember/".concat(storeId));
      console.log(data.store.workers);
      setTeamMembers(data.store.workers);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setFormData({
      name: '',
      designation: '',
      email: '',
      profileImage: null,
      id: ''
    });
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
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', storeId);
      dataToSend.append('id', formData.id);
      const {
        data
      } = await _axiosClient.default.post("/addTeamMember", dataToSend);
      setTeamMembers(data.store.workers);
      setAlertMessageType('success');
      setAlertMessage('Team member added');
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);
      setFormData({});
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Failed to fetch memebers:', error);
    } finally {
      setLoading(false);
      setShowForm(false);
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
      fetchTeamMembers();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
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
  const handleToggleEditForm = user => {
    var _user$user_info, _user$user_info2;
    setFormData({
      name: user.username,
      designation: (_user$user_info = user.user_info) === null || _user$user_info === void 0 ? void 0 : _user$user_info.designation,
      email: user.email,
      profileImage: (_user$user_info2 = user.user_info) === null || _user$user_info2 === void 0 ? void 0 : _user$user_info2.profile_image,
      id: user.id
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
    className: "btn_heads",
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Team Members"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "dark-btn",
    variant: "contained",
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : 'Add Team Member'))), showForm && /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleFormSubmit,
    sx: {
      mb: 3,
      p: 2,
      border: '1px solid #ddd',
      borderRadius: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    mb: 2
  }, "Create Profile"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Name",
    name: "name",
    value: formData.name,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Designation",
    name: "designation",
    value: formData.designation,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Email",
    name: "email",
    type: "email",
    value: formData.email,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), !formData.id && /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Password",
    name: "password",
    type: "text",
    value: formData.password,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label",
    sx: {
      mb: 2
    }
  }, "Upload Profile Image", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    name: "profileImage",
    accept: "image/*",
    hidden: true,
    onChange: handleChange
  })), formData.profileImage && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "Selected: ", formData.profileImage.name), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    sx: {
      mt: 2
    }
  }, "Save Member")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Username"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Email"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Profile Img"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Designation"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), teamMembers && teamMembers.length > 0 ? teamMembers.map((singleMember, index) => {
    var _singleMember$user, _singleMember$user2, _singleMember$user3, _singleMember$user4, _singleMember$user5, _singleMember$user6, _singleMember$user7, _singleMember$user8, _singleMember$user9, _singleMember$user0, _singleMember$user1;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: index + 1
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleMember$user = singleMember.user) === null || _singleMember$user === void 0 ? void 0 : _singleMember$user.username), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleMember$user2 = singleMember.user) === null || _singleMember$user2 === void 0 ? void 0 : _singleMember$user2.email), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, singleMember !== null && singleMember !== void 0 && (_singleMember$user3 = singleMember.user) !== null && _singleMember$user3 !== void 0 && (_singleMember$user3 = _singleMember$user3.user_info) !== null && _singleMember$user3 !== void 0 && _singleMember$user3.profile_image ? (singleMember === null || singleMember === void 0 || (_singleMember$user4 = singleMember.user) === null || _singleMember$user4 === void 0 || (_singleMember$user4 = _singleMember$user4.user_info) === null || _singleMember$user4 === void 0 ? void 0 : _singleMember$user4.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleMember === null || singleMember === void 0 || (_singleMember$user5 = singleMember.user) === null || _singleMember$user5 === void 0 ? void 0 : _singleMember$user5.user_info.profile_image),
      alt: "Profile",
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: singleMember === null || singleMember === void 0 || (_singleMember$user6 = singleMember.user) === null || _singleMember$user6 === void 0 ? void 0 : _singleMember$user6.user_info.profile_image,
      alt: "",
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
      username: singleMember === null || singleMember === void 0 || (_singleMember$user7 = singleMember.user) === null || _singleMember$user7 === void 0 ? void 0 : _singleMember$user7.username
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleMember$user8 = singleMember.user) === null || _singleMember$user8 === void 0 ? void 0 : _singleMember$user8.user_info.designation), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      sx: {
        color: ((_singleMember$user9 = singleMember.user) === null || _singleMember$user9 === void 0 ? void 0 : _singleMember$user9.account_status) === 'active' ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, (_singleMember$user0 = singleMember.user) === null || _singleMember$user0 === void 0 ? void 0 : _singleMember$user0.account_status), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
      variant: "contained",
      onClick: () => handleToggleEditForm(singleMember.user)
    }, "Edit")), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: (_singleMember$user1 = singleMember.user) === null || _singleMember$user1 === void 0 ? void 0 : _singleMember$user1.id,
      url: "/deleteTeamMember",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Team"))))));
}
var _default = exports.default = TeamsPage;