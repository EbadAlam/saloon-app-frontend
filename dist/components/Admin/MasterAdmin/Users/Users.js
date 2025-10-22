"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _DummyImage = _interopRequireDefault(require("../../../DummyImage/DummyImage"));
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _routes = require("../../../../routes");
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
var _ReloadButton = _interopRequireDefault(require("../../../ReloadButton/ReloadButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function UsersPage() {
  var _location$state$highl, _location$state;
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [users, setUsers] = (0, _react.useState)([]);
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const [stores, setStores] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const location = (0, _reactRouterDom.useLocation)();
  const [highlightId, setHighlightId] = (0, _react.useState)((_location$state$highl = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.highlightId) !== null && _location$state$highl !== void 0 ? _location$state$highl : '');
  const [alertOpen, setAlertOpen] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  const highlightedRef = (0, _react.useRef)(null);
  const [selectAll, setSelectAll] = (0, _react.useState)(false);
  const [formData, setFormData] = (0, _react.useState)({
    name: '',
    designation: '',
    email: '',
    role: '',
    password: '',
    profileImage: null,
    id: null,
    allowed_store: 1,
    store_id: null
  });
  const [search, setSearch] = (0, _react.useState)("");
  const [roleFilter, setRoleFilter] = (0, _react.useState)("");
  const [statusFilter, setStatusFilter] = (0, _react.useState)("");
  const [selectedOption, setSelectedOption] = (0, _react.useState)('active');
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
    const fetchStores = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get('/getStoresAdmin/');
        setStores(data.stores);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    };
    fetchStores();
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllUsers?page=".concat(page));
      setUsers(data.users.data);
      setPagination({
        current_page: data.users.current_page,
        last_page: data.users.last_page,
        total: data.users.total
      });
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
      role: '',
      password: '',
      profileImage: null,
      id: null,
      allowed_store: 1,
      store_id: null
    });
    setShowForm(prev => !prev);
  };
  const handleToggleEditForm = singleUser => {
    var _singleUser$user_info, _singleUser$user_info2, _singleUser$user_info3;
    setFormData({
      name: '',
      designation: '',
      email: '',
      role: '',
      password: '',
      profileImage: null,
      id: null,
      store_id: null,
      allowed_store: 1
    });
    setFormData({
      id: singleUser.id,
      name: singleUser.username,
      role: (_singleUser$user_info = singleUser.user_info) === null || _singleUser$user_info === void 0 ? void 0 : _singleUser$user_info.role,
      designation: (_singleUser$user_info2 = singleUser.user_info) === null || _singleUser$user_info2 === void 0 ? void 0 : _singleUser$user_info2.designation,
      email: singleUser.email,
      allowed_store: (_singleUser$user_info3 = singleUser.user_info) === null || _singleUser$user_info3 === void 0 ? void 0 : _singleUser$user_info3.allowed
    });
    setShowForm(true);
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
      dataToSend.append('role', formData.role);
      dataToSend.append('profileImage', formData.profileImage);
      dataToSend.append('owner_id', user.id);
      dataToSend.append('store_id', formData.store_id);
      dataToSend.append('id', formData.id);
      dataToSend.append('allowed', formData.allowed_store);
      const {
        data
      } = await _axiosClient.default.post("/addEditUserAdmin", dataToSend);
      if (data.success) {
        showAlert('success', formData.id ? 'User updated' : 'User added');
        setAlertMessage(formData.id ? 'User updated' : 'User added');
        fetchTeamMembers();
        setFormData({});
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to add memebers:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (newStatus.success) {
      showAlert('success', newStatus.message);
    } else {
      showAlert('error', newStatus.message);
    }
    if (fetch) {
      fetchTeamMembers();
    }
  };
  const handleStatusChangeStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      const payload = {
        status: newStatus
      };
      const {
        data
      } = await _axiosClient.default.put("/updateUserStatus/".concat(id), payload);
      setLoading(false);
      handleStatusChange(data);
    } catch (error) {
      console.error('Error updating user status ', error);
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId(null);
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, users]);
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  const filteredUsers = users.filter(u => {
    var _u$user_info;
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? ((_u$user_info = u.user_info) === null || _u$user_info === void 0 ? void 0 : _u$user_info.role) === roleFilter : true;
    const matchesStatus = statusFilter ? u.account_status === statusFilter : true;
    return matchesSearch && matchesRole && matchesStatus;
  });
  const handleSelectAll = event => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedUsers = users.map(user => {
      return _objectSpread(_objectSpread({}, user), {}, {
        isChecked
      });
    });
    setUsers(updatedUsers);
  };
  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return _objectSpread(_objectSpread({}, user), {}, {
          isChecked
        });
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const handleApply = () => {
    if (selectedOption === 'delete') {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };
  const showAlert = (alertType, message) => {
    setAlertMessage(message);
    setAlertMessageType(alertType);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  const bulkActionFunction = async () => {
    const selectedIds = filteredUsers.filter(user => user.isChecked).map(user => user.id);
    if (selectedIds.length === 0) {
      showAlert('error', 'Select any user to update');
    } else {
      setLoading(true);
      try {
        const payload = {
          model: 'User',
          selectedIds,
          action: selectedOption
        };
        const {
          data
        } = await _axiosClient.default.post('/bulkOptionPerform', payload);
        showAlert('success', data.message || 'Bulk action perform');
        fetchTeamMembers();
        setSelectAll(false);
        setSelectedOption('active');
        setUsers(users.map(user => _objectSpread(_objectSpread({}, user), {}, {
          isChecked: false
        })));
      } catch (error) {
        console.error('Error performing bulk options ', error);
      } finally {
        setLoading(false);
        setAlertOpen(false);
      }
    }
  };
  const handlePageChange = (e, page) => {
    fetchTeamMembers(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: alertOpen,
    onClose: handleAlertClose
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Deletion"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, /*#__PURE__*/_react.default.createElement(_material.DialogContentText, null, "Are you sure you want to delete these users? This action cannot be undone.")), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleAlertClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "error",
    onClick: bulkActionFunction,
    autoFocus: true
  }, "Delete")))), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Users"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : 'Add User'))), showForm && /*#__PURE__*/_react.default.createElement(_material.Box, {
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
    select: true,
    label: "Role",
    name: "role",
    value: formData.role,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "owner"
  }, "Owner"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "customer"
  }, "Customer"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "worker"
  }, "Worker")), formData.role == 'worker' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Designation",
    name: "designation",
    value: formData.designation,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), !formData.id && stores && stores.length > 0 && /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    select: true,
    label: "Store",
    name: "store_id",
    value: formData.store_id,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }, stores.map(singleStore => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: singleStore.id
  }, singleStore.title)))), formData.role == 'owner' && /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Allowed Store",
    name: "allowed_store",
    value: formData.allowed_store,
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
  }), formData.id == null && /*#__PURE__*/_react.default.createElement(_material.TextField, {
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
      mt: 2,
      display: 'block'
    }
  }, "Save User")), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 4,
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "start",
    gap: "20px",
    alignItems: "center",
    sx: {
      width: '30%'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    defaultValue: selectedOption,
    sx: {
      width: '100%'
    },
    onChange: handleOptionChange
  }, ['active', 'deactive', 'verify', 'suspend', 'delete'].map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleApply
  }, "Save")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "end",
    gap: 2,
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_ReloadButton.default, {
    onReload: fetchTeamMembers
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    sx: {
      width: '15%'
    },
    label: "Search",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    sx: {
      width: '10%'
    },
    select: true,
    label: "Role",
    value: roleFilter,
    onChange: e => setRoleFilter(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "All"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "owner"
  }, "Owner"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "customer"
  }, "Customer"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "worker"
  }, "Worker")), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    sx: {
      width: '10%'
    },
    select: true,
    label: "Status",
    value: statusFilter,
    onChange: e => setStatusFilter(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "All"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "active"
  }, "Active"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "deactive"
  }, "Deactive"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "suspend"
  }, "Suspend")))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "selectAllBoxes",
    type: "checkbox",
    onChange: handleSelectAll,
    checked: selectAll
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Username"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Email"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Profile Img"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Designation"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Store"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Allowed Stores"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((singleUser, index) => {
    var _singleUser$user_info4, _singleUser$user_info5, _singleUser$user_info6, _singleUser$user_info7, _singleUser$user_info8, _singleUser$user_info9, _singleUser$user_info0, _singleUser$stores, _singleUser$user_info1, _singleUser$worker_st, _singleUser$user_info10, _singleUser$user_info11;
    return (singleUser === null || singleUser === void 0 || (_singleUser$user_info4 = singleUser.user_info) === null || _singleUser$user_info4 === void 0 ? void 0 : _singleUser$user_info4.role) !== 'master-admin' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: singleUser.id,
      ref: singleUser.id === highlightId ? highlightedRef : null
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "td"
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: "allCheckboxes",
      type: "checkbox",
      value: singleUser.id,
      checked: singleUser.isChecked,
      onChange: event => handleCheckboxChange(event, singleUser.id)
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleUser.username), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleUser.email, /*#__PURE__*/_react.default.createElement("span", {
      className: "badge badge-".concat(singleUser.email_verified == 'true' ? 'primary' : 'secondary', " ml-3")
    }, singleUser.email_verified == 'true' ? 'Verified' : 'Not Verified')), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, (_singleUser$user_info5 = singleUser.user_info) !== null && _singleUser$user_info5 !== void 0 && _singleUser$user_info5.profile_image ? ((_singleUser$user_info6 = singleUser.user_info) === null || _singleUser$user_info6 === void 0 ? void 0 : _singleUser$user_info6.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleUser.user_info.profile_image),
      alt: "Profile",
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: singleUser.user_info.profile_image,
      alt: "",
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
      username: singleUser.username
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (singleUser === null || singleUser === void 0 || (_singleUser$user_info7 = singleUser.user_info) === null || _singleUser$user_info7 === void 0 ? void 0 : _singleUser$user_info7.role) == 'owner' ? 'Owner' : (singleUser === null || singleUser === void 0 || (_singleUser$user_info8 = singleUser.user_info) === null || _singleUser$user_info8 === void 0 ? void 0 : _singleUser$user_info8.role) == 'customer' ? 'Customer' : singleUser === null || singleUser === void 0 || (_singleUser$user_info9 = singleUser.user_info) === null || _singleUser$user_info9 === void 0 ? void 0 : _singleUser$user_info9.designation), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (singleUser === null || singleUser === void 0 || (_singleUser$user_info0 = singleUser.user_info) === null || _singleUser$user_info0 === void 0 ? void 0 : _singleUser$user_info0.role) === 'owner' ? (_singleUser$stores = singleUser.stores) === null || _singleUser$stores === void 0 ? void 0 : _singleUser$stores.filter(store => store.status === 'active').map(store => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      key: store.id,
      to: _routes.ROUTES.getStoreFrontPage(store.slug),
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: 'block'
      }
    }, store.title)) : (singleUser === null || singleUser === void 0 || (_singleUser$user_info1 = singleUser.user_info) === null || _singleUser$user_info1 === void 0 ? void 0 : _singleUser$user_info1.role) === 'worker' && (singleUser === null || singleUser === void 0 || (_singleUser$worker_st = singleUser.worker_store) === null || _singleUser$worker_st === void 0 || (_singleUser$worker_st = _singleUser$worker_st.store) === null || _singleUser$worker_st === void 0 ? void 0 : _singleUser$worker_st.status) === 'active' ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleUser.worker_store.store.slug),
      target: "_blank",
      rel: "noopener noreferrer"
    }, singleUser.worker_store.store.title) : '-'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (singleUser === null || singleUser === void 0 || (_singleUser$user_info10 = singleUser.user_info) === null || _singleUser$user_info10 === void 0 ? void 0 : _singleUser$user_info10.role) == 'owner' ? (_singleUser$user_info11 = singleUser.user_info) === null || _singleUser$user_info11 === void 0 ? void 0 : _singleUser$user_info11.allowed : 0), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      sx: {
        color: singleUser.account_status === 'active' ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, singleUser.account_status), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Select, {
      value: ['active', 'deactive', 'suspend'].includes(singleUser.account_status) ? singleUser.account_status : 'active',
      onChange: e => handleStatusChangeStatus(singleUser.id, e.target.value)
    }, ['active', 'deactive', 'suspend', singleUser.email_verified == 'false' && 'verify'].filter(Boolean).map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
      key: status,
      value: status
    }, status.charAt(0).toUpperCase() + status.slice(1))))), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
      variant: "contained",
      onClick: () => handleToggleEditForm(singleUser)
    }, "Edit")), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: singleUser.id,
      url: "/deleteTeamMember",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Users")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Pagination, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))));
}
var _default = exports.default = UsersPage;