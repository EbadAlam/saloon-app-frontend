"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _UserSidebar = _interopRequireDefault(require("../../components/UserSidebar/UserSidebar"));
var _AuthContext = require("../../contexts/AuthContext");
var _HomeOutlined = _interopRequireDefault(require("@mui/icons-material/HomeOutlined"));
var _WorkOutlineOutlined = _interopRequireDefault(require("@mui/icons-material/WorkOutlineOutlined"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _CreateOutlined = _interopRequireDefault(require("@mui/icons-material/CreateOutlined"));
var _LocationOn = _interopRequireDefault(require("@mui/icons-material/LocationOn"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ProfilePage() {
  var _user$user_info, _user$user_info2, _user$user_info3, _user$user_info4, _userData$user_info$p, _userData$user_info4, _userData$user_info$d, _userData$user_info5, _userData$user_info$g, _userData$user_info6, _userData$user_info7, _userData$user_info8, _userData$user_info9, _userData$user_info0;
  const {
    user,
    login,
    token
  } = (0, _AuthContext.useAuth)();
  const fileInputRef = (0, _react.useRef)(null);
  const [addressModal, setAddressModal] = (0, _react.useState)(false);
  const [addressType, setAddressType] = (0, _react.useState)('home');
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [addressLoading, setAddressLoading] = (0, _react.useState)(false);
  const [imgLoading, setImgLoading] = (0, _react.useState)(false);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [userData, setUserData] = (0, _react.useState)({});
  const [location, setLocation] = (0, _react.useState)("");
  const [formData, setFormData] = (0, _react.useState)({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: ""
  });
  (0, _react.useEffect)(() => {
    if (userData) {
      var _userData$user_info, _userData$user_info2, _userData$user_info3;
      setFormData({
        name: userData.username || "",
        phoneNumber: ((_userData$user_info = userData.user_info) === null || _userData$user_info === void 0 ? void 0 : _userData$user_info.phone_number) || "",
        dateOfBirth: ((_userData$user_info2 = userData.user_info) === null || _userData$user_info2 === void 0 ? void 0 : _userData$user_info2.dob) || "",
        gender: ((_userData$user_info3 = userData.user_info) === null || _userData$user_info3 === void 0 ? void 0 : _userData$user_info3.gender) || ""
      });
    }
  }, [userData]);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [name]: numericValue
      }));
    } else {
      setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [name]: value
      }));
    }
  };
  const handleKeyPress = e => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getUserDetail/".concat(user.id));
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user details ', error);
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    fetchUserDetails();
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      var _data$user$user_info, _data$user$user_info2, _data$user$user_info3;
      const payload = {
        username: formData.name,
        phoneNumber: formData.phoneNumber,
        dob: formData.dateOfBirth,
        gender: formData.gender
      };
      const {
        data
      } = await _axiosClient.default.post("/updateUserInfo/".concat(user.id), payload);
      login(data.user, token);
      setUserData(data.user);
      setShowForm(false);
      setFormData({
        name: data.user.username,
        phoneNumber: (_data$user$user_info = data.user.user_info) === null || _data$user$user_info === void 0 ? void 0 : _data$user$user_info.phone_number,
        dateOfBirth: (_data$user$user_info2 = data.user.user_info) === null || _data$user$user_info2 === void 0 ? void 0 : _data$user$user_info2.dob,
        gender: (_data$user$user_info3 = data.user.user_info) === null || _data$user$user_info3 === void 0 ? void 0 : _data$user$user_info3.gender
      });
    } catch (err) {
      console.error('error updating profile', err);
    } finally {
      setLoading(false);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#FFF8F0',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
  };
  const handleClose = () => setAddressModal(false);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      setImgLoading(true);
      try {
        const formData = new FormData();
        formData.append('profile_image', file);
        const {
          data
        } = await _axiosClient.default.post("/updateUserProfileImg/".concat(user.id), formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        let tempUser = JSON.parse(localStorage.getItem("AUTH_USER"));
        tempUser = _objectSpread(_objectSpread({}, tempUser), {}, {
          user_info: _objectSpread(_objectSpread({}, tempUser.user_info), {}, {
            profile_image: data.profile_image
          })
        });
        localStorage.setItem("AUTH_USER", JSON.stringify(tempUser));
        login(tempUser, token);
      } catch (err) {
        console.error('Error updating profile img', err);
      } finally {
        setImgLoading(false);
      }
    }
  };
  const handleSubmitAddressForm = async e => {
    e.preventDefault();
    setAddressLoading(true);
    try {
      const payload = {
        address: location,
        address_type: addressType
      };
      await _axiosClient.default.post("/addUserAddress/".concat(user.id), payload);
      setLocation('');
      fetchUserDetails();
      setAddressModal(false);
    } catch (error) {
      console.error('Error adding address', error);
    } finally {
      setAddressLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile"
  }, /*#__PURE__*/_react.default.createElement(_material.Modal, {
    open: addressModal,
    onClose: handleClose,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: style,
    component: "form",
    onSubmit: handleSubmitAddressForm
  }, addressLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    id: "modal-modal-title",
    variant: "h6",
    component: "h2"
  }, "Add ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      textTransform: 'capitalize'
    }
  }, addressType)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    sx: {
      fontSize: '16px'
    }
  }, "Address*"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    required: true,
    margin: "normal",
    label: "Location",
    placeholder: "Add your location",
    variant: "outlined",
    value: location,
    onChange: e => setLocation(e.target.value),
    InputProps: {
      startAdornment: /*#__PURE__*/_react.default.createElement(_material.InputAdornment, {
        position: "start"
      }, /*#__PURE__*/_react.default.createElement(_LocationOn.default, {
        color: "action"
      }))
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    color: "primary",
    sx: {
      mt: 2,
      background: '#333333',
      padding: '15px',
      borderRadius: '10px'
    },
    fullWidth: true
  }, "Save"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex"
  }, /*#__PURE__*/_react.default.createElement(_UserSidebar.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2",
    className: "heading"
  }, "Profile"), userData && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "divs"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "update_profile_div"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "edit_btn"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    onClick: () => setShowForm(prev => !prev),
    sx: {
      cursor: "pointer",
      fontSize: '18px',
      color: '#D8A7B1',
      fontFamily: 'Barlow'
    }
  }, showForm ? 'Cancel' : 'Edit')), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile_img_div"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile_img"
  }, user !== null && user !== void 0 && (_user$user_info = user.user_info) !== null && _user$user_info !== void 0 && _user$user_info.profile_image ? (user === null || user === void 0 || (_user$user_info2 = user.user_info) === null || _user$user_info2 === void 0 ? void 0 : _user$user_info2.signup_platform) == 'manual' ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(user === null || user === void 0 || (_user$user_info3 = user.user_info) === null || _user$user_info3 === void 0 ? void 0 : _user$user_info3.profile_image),
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: user === null || user === void 0 || (_user$user_info4 = user.user_info) === null || _user$user_info4 === void 0 ? void 0 : _user$user_info4.profile_image,
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
    username: user.username,
    width: "100px",
    height: "100px"
  }), imgLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile_img_edit",
    onClick: handleClick,
    sx: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react.default.createElement(_CreateOutlined.default, null)), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    ref: fileInputRef,
    style: {
      display: "none"
    },
    onChange: handleFileChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2",
    className: "heading"
  }, userData.username)), /*#__PURE__*/_react.default.createElement("hr", null), showForm ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "editForm"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Name",
    name: "name",
    value: formData.name,
    onChange: handleChange,
    fullWidth: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Phone Number",
    name: "phoneNumber",
    value: formData.phoneNumber,
    onChange: handleChange,
    onKeyPress: handleKeyPress,
    fullWidth: true,
    type: "number",
    inputProps: {
      maxLength: 15
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date",
    value: formData.dateOfBirth,
    onChange: handleChange,
    InputLabelProps: {
      shrink: true
    },
    fullWidth: true,
    inputProps: {
      max: new Date().toISOString().split("T")[0]
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    select: true,
    label: "Gender",
    name: "gender",
    value: formData.gender,
    onChange: handleChange,
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "Select Gender"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "male"
  }, "Male"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "female"
  }, "Female"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "other"
  }, "Other")), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    type: "submit",
    sx: {
      backgrouond: '#D8A7B1'
    }
  }, "Update")))) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "infoDiv"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Name")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      textTransform: 'capitalize'
    },
    className: "heading"
  }, userData.username))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Mobile Number")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, (_userData$user_info$p = (_userData$user_info4 = userData.user_info) === null || _userData$user_info4 === void 0 ? void 0 : _userData$user_info4.phone_number) !== null && _userData$user_info$p !== void 0 ? _userData$user_info$p : '-'))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Email")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, userData.email))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Date of birth")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, (_userData$user_info$d = (_userData$user_info5 = userData.user_info) === null || _userData$user_info5 === void 0 ? void 0 : _userData$user_info5.dob) !== null && _userData$user_info$d !== void 0 ? _userData$user_info$d : '-'))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Gender")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      textTransform: 'capitalize'
    },
    className: "heading"
  }, (_userData$user_info$g = (_userData$user_info6 = userData.user_info) === null || _userData$user_info6 === void 0 ? void 0 : _userData$user_info6.gender) !== null && _userData$user_info$g !== void 0 ? _userData$user_info$g : '-'))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "addressBoxMain"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2",
    className: "heading"
  }, "My Address"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "addressDivs"
  }, userData !== null && userData !== void 0 && (_userData$user_info7 = userData.user_info) !== null && _userData$user_info7 !== void 0 && _userData$user_info7.home_address ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_HomeOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address_info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Home")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, userData === null || userData === void 0 || (_userData$user_info8 = userData.user_info) === null || _userData$user_info8 === void 0 ? void 0 : _userData$user_info8.home_address)))) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address",
    onClick: () => {
      setAddressModal(true);
      setAddressType('home');
      setLocation('');
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_HomeOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address_info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Home")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, "Add a home adddress")))), userData !== null && userData !== void 0 && (_userData$user_info9 = userData.user_info) !== null && _userData$user_info9 !== void 0 && _userData$user_info9.work_address ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_WorkOutlineOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address_info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Work")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, userData === null || userData === void 0 || (_userData$user_info0 = userData.user_info) === null || _userData$user_info0 === void 0 ? void 0 : _userData$user_info0.work_address)))) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address",
    onClick: () => {
      setAddressModal(true);
      setAddressType('work');
      setLocation('');
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_WorkOutlineOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address_info"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    className: "heading"
  }, "Work")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "value"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "heading"
  }, "Add a work adddress")))))))))));
}
var _default = exports.default = ProfilePage;