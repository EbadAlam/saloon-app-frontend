"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("../../contexts/AuthContext");
var _UserSidebar = _interopRequireDefault(require("../../components/UserSidebar/UserSidebar"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _LocationOn = _interopRequireDefault(require("@mui/icons-material/LocationOn"));
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
    background: "#f5f4f0",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px"
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: 600,
    color: "#1a1a2e"
  },
  editBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  editBtnCancel: {
    background: "#f5f4f0",
    color: "#1a1a2e",
    border: "0.5px solid #e0dfd8"
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "0.5px solid #e0dfd8",
    padding: "24px",
    overflow: "hidden"
  },
  profileSection: {
    gridColumn: 1
  },
  addressSection: {
    gridColumn: 2
  },
  avatarWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: "20px"
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block"
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    background: "#1a1a2e",
    borderRadius: "50%",
    border: "3px solid #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s"
  },
  profileName: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "20px"
  },
  infoGroup: {
    marginBottom: "16px"
  },
  infoLabel: {
    fontSize: "11px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "4px",
    display: "block"
  },
  infoValue: {
    fontSize: "14px",
    color: "#1a1a2e",
    fontWeight: 500
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginBottom: "12px"
  },
  formLabel: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "6px",
    display: "block",
    fontWeight: 500
  },
  formInput: {
    width: "100%",
    padding: "10px 12px",
    border: "0.5px solid #e0dfd8",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1a1a2e",
    fontFamily: "sans-serif"
  },
  submitBtn: {
    padding: "10px 20px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
    width: "100%",
    marginTop: "12px"
  },
  addressList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  addressCard: {
    border: "0.5px solid #e0dfd8",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  addressIcon: {
    width: 44,
    height: 44,
    borderRadius: "10px",
    background: "#f0efe8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a1a2e",
    fontSize: "20px",
    flexShrink: 0
  },
  addressContent: {
    flex: 1,
    minWidth: 0
  },
  addressType: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "4px"
  },
  addressValue: {
    fontSize: "12px",
    color: "#888",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
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
    padding: "24px"
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "16px"
  },
  modalInput: {
    width: "100%",
    padding: "10px 12px",
    border: "0.5px solid #e0dfd8",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    fontFamily: "sans-serif"
  },
  modalActions: {
    display: "flex",
    gap: "8px"
  },
  modalBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  modalBtnPrimary: {
    background: "#1a1a2e",
    color: "#fff"
  },
  modalBtnSecondary: {
    background: "#f5f4f0",
    color: "#1a1a2e",
    border: "0.5px solid #e0dfd8"
  }
};
function ProfilePage() {
  var _user$user_info, _userData$user_info$p, _userData$user_info4, _userData$user_info$d, _userData$user_info5, _userData$user_info$g, _userData$user_info6, _userData$user_info7, _userData$user_info8, _userData$user_info9, _userData$user_info0, _userData$user_info1, _userData$user_info10;
  const {
    user,
    login,
    token
  } = (0, _AuthContext.useAuth)();
  const fileInputRef = (0, _react.useRef)(null);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [showAddressModal, setShowAddressModal] = (0, _react.useState)(false);
  const [addressType, setAddressType] = (0, _react.useState)('home');
  const [loading, setLoading] = (0, _react.useState)(false);
  const [imgLoading, setImgLoading] = (0, _react.useState)(false);
  const [userData, setUserData] = (0, _react.useState)({});
  const [location, setLocation] = (0, _react.useState)("");
  const [formData, setFormData] = (0, _react.useState)({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: ""
  });
  (0, _react.useEffect)(() => {
    fetchUserDetails();
  }, [user.id]);
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
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getUserDetail/".concat(user.id));
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user details', error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    if (name === "phoneNumber") {
      setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [name]: value.replace(/\D/g, "")
      }));
    } else {
      setFormData(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [name]: value
      }));
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
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
    } catch (err) {
      console.error('error updating profile', err);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      setImgLoading(true);
      try {
        const formDataImg = new FormData();
        formDataImg.append('profile_image', file);
        const {
          data
        } = await _axiosClient.default.post("/updateUserProfileImg/".concat(user.id), formDataImg, {
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
    setLoading(true);
    try {
      await _axiosClient.default.post("/addUserAddress/".concat(user.id), {
        address: location,
        address_type: addressType
      });
      setLocation('');
      fetchUserDetails();
      setShowAddressModal(false);
    } catch (error) {
      console.error('Error adding address', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAvatarClick = () => {
    var _fileInputRef$current;
    return (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 ? void 0 : _fileInputRef$current.click();
  };
  const openAddressModal = type => {
    setAddressType(type);
    setLocation('');
    setShowAddressModal(true);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "profile",
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_UserSidebar.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "content",
    style: {
      flex: 1
    }
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.wrap
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: S.pageTitle
  }, "Profile"), /*#__PURE__*/_react.default.createElement("button", {
    style: _objectSpread(_objectSpread({}, S.editBtn), showForm ? S.editBtnCancel : {}),
    onClick: () => setShowForm(!showForm)
  }, showForm ? 'Cancel' : 'Edit Profile')), /*#__PURE__*/_react.default.createElement("div", {
    style: S.contentGrid
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.avatarWrapper
  }, user !== null && user !== void 0 && (_user$user_info = user.user_info) !== null && _user$user_info !== void 0 && _user$user_info.profile_image ? user.user_info.signup_platform === 'manual' ? /*#__PURE__*/_react.default.createElement("img", {
    style: S.avatar,
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(user.user_info.profile_image),
    alt: "Profile"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    style: S.avatar,
    src: user.user_info.profile_image,
    alt: "Profile"
  }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
    username: user.username,
    width: "100",
    height: "100"
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: S.avatarEdit,
    onClick: handleAvatarClick,
    title: "Change photo"
  }, "\uD83D\uDCF7"), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    ref: fileInputRef,
    style: {
      display: "none"
    },
    onChange: handleFileChange
  }), imgLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: S.profileName
  }, userData.username), !showForm ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: S.infoGroup
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoLabel
  }, "Name"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoValue
  }, userData.username)), /*#__PURE__*/_react.default.createElement("div", {
    style: S.infoGroup
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoLabel
  }, "Email"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoValue
  }, userData.email)), /*#__PURE__*/_react.default.createElement("div", {
    style: S.infoGroup
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoLabel
  }, "Mobile Number"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoValue
  }, (_userData$user_info$p = (_userData$user_info4 = userData.user_info) === null || _userData$user_info4 === void 0 ? void 0 : _userData$user_info4.phone_number) !== null && _userData$user_info$p !== void 0 ? _userData$user_info$p : '—')), /*#__PURE__*/_react.default.createElement("div", {
    style: S.infoGroup
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoLabel
  }, "Date of Birth"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoValue
  }, (_userData$user_info$d = (_userData$user_info5 = userData.user_info) === null || _userData$user_info5 === void 0 ? void 0 : _userData$user_info5.dob) !== null && _userData$user_info$d !== void 0 ? _userData$user_info$d : '—')), /*#__PURE__*/_react.default.createElement("div", {
    style: S.infoGroup
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.infoLabel
  }, "Gender"), /*#__PURE__*/_react.default.createElement("span", {
    style: _objectSpread(_objectSpread({}, S.infoValue), {}, {
      textTransform: "capitalize"
    })
  }, (_userData$user_info$g = (_userData$user_info6 = userData.user_info) === null || _userData$user_info6 === void 0 ? void 0 : _userData$user_info6.gender) !== null && _userData$user_info$g !== void 0 ? _userData$user_info$g : '—'))) : /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.formGrid
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.formLabel
  }, "Name"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.formInput,
    type: "text",
    name: "name",
    value: formData.name,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.formGrid
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.formLabel
  }, "Email"), /*#__PURE__*/_react.default.createElement("input", {
    style: _objectSpread(_objectSpread({}, S.formInput), {}, {
      background: "#f5f4f0",
      cursor: "not-allowed"
    }),
    type: "email",
    value: userData.email,
    disabled: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.formGrid
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.formLabel
  }, "Mobile Number"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.formInput,
    type: "tel",
    name: "phoneNumber",
    value: formData.phoneNumber,
    onChange: handleChange,
    maxLength: "15"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.formGrid
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.formLabel
  }, "Date of Birth"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.formInput,
    type: "date",
    name: "dateOfBirth",
    value: formData.dateOfBirth,
    onChange: handleChange,
    max: new Date().toISOString().split("T")[0]
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.formGrid
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.formLabel
  }, "Gender"), /*#__PURE__*/_react.default.createElement("select", {
    style: S.formInput,
    name: "gender",
    value: formData.gender,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Gender"), /*#__PURE__*/_react.default.createElement("option", {
    value: "male"
  }, "Male"), /*#__PURE__*/_react.default.createElement("option", {
    value: "female"
  }, "Female"), /*#__PURE__*/_react.default.createElement("option", {
    value: "other"
  }, "Other"))), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.submitBtn
  }, "Save Changes"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: _objectSpread(_objectSpread({}, S.pageTitle), {}, {
      fontSize: "16px",
      marginBottom: "16px"
    })
  }, "My Addresses"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressList
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.addressCard), (_userData$user_info7 = userData.user_info) !== null && _userData$user_info7 !== void 0 && _userData$user_info7.home_address ? {} : {
      borderStyle: "dashed",
      color: "#aaa"
    }),
    onClick: () => openAddressModal('home')
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressIcon
  }, "\uD83C\uDFE0"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressContent
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressType
  }, "Home"), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.addressValue), (_userData$user_info8 = userData.user_info) !== null && _userData$user_info8 !== void 0 && _userData$user_info8.home_address ? {} : {
      fontStyle: "italic",
      color: "#aaa"
    })
  }, ((_userData$user_info9 = userData.user_info) === null || _userData$user_info9 === void 0 ? void 0 : _userData$user_info9.home_address) || 'Add a home address'))), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.addressCard), (_userData$user_info0 = userData.user_info) !== null && _userData$user_info0 !== void 0 && _userData$user_info0.work_address ? {} : {
      borderStyle: "dashed",
      color: "#aaa"
    }),
    onClick: () => openAddressModal('work')
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressIcon
  }, "\uD83D\uDCBC"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressContent
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.addressType
  }, "Work"), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.addressValue), (_userData$user_info1 = userData.user_info) !== null && _userData$user_info1 !== void 0 && _userData$user_info1.work_address ? {} : {
      fontStyle: "italic",
      color: "#aaa"
    })
  }, ((_userData$user_info10 = userData.user_info) === null || _userData$user_info10 === void 0 ? void 0 : _userData$user_info10.work_address) || 'Add a work address'))))))), showAddressModal && /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalOverlay,
    onClick: () => setShowAddressModal(false)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.modal,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: S.modalTitle
  }, "Add ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      textTransform: "capitalize"
    }
  }, addressType), " Address"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmitAddressForm
  }, /*#__PURE__*/_react.default.createElement("input", {
    style: S.modalInput,
    type: "text",
    placeholder: "Enter your address",
    value: location,
    onChange: e => setLocation(e.target.value),
    required: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: S.modalActions
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    style: _objectSpread(_objectSpread({}, S.modalBtn), S.modalBtnSecondary),
    onClick: () => setShowAddressModal(false)
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: _objectSpread(_objectSpread({}, S.modalBtn), S.modalBtnPrimary)
  }, "Save Address")))))))));
}
var _default = exports.default = ProfilePage;