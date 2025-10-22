"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Signup() {
  const [form, setForm] = (0, _react.useState)({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer' // default role
  });
  const [profileImage, setProfileImage] = (0, _react.useState)(null);
  const [errors, setErrors] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [success, setSuccess] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(false);
  const handleChange = e => {
    setForm(_objectSpread(_objectSpread({}, form), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const handleFileChange = e => {
    setProfileImage(e.target.files[0]);
  };
  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess(null);
    const payload = new FormData();
    Object.entries(form).forEach(_ref => {
      let [key, value] = _ref;
      payload.append(key, value);
    });
    if (profileImage) {
      payload.append('profile_image', profileImage);
    }
    try {
      const {
        data
      } = await _axiosClient.default.post('/signup', payload);
      if (data.success === false) {
        setErrors([data.message || 'Signup failed.']);
        return;
      }
      setSuccess(data.message || 'Signup successful! Check your email.');
      setForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer'
      });
      setProfileImage(null);
    } catch (err) {
      var _err$response;
      if ((_err$response = err.response) !== null && _err$response !== void 0 && (_err$response = _err$response.data) !== null && _err$response !== void 0 && _err$response.errors) {
        const errorList = Object.values(err.response.data.errors).flat();
        setErrors(errorList);
      } else {
        var _err$response2;
        setErrors([((_err$response2 = err.response) === null || _err$response2 === void 0 || (_err$response2 = _err$response2.data) === null || _err$response2 === void 0 ? void 0 : _err$response2.message) || 'Signup failed.']);
      }
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (success) {
      showSnackbar(success, "success");
    }
  }, [success]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      maxWidth: 400,
      margin: 'auto',
      mt: 5,
      p: 3,
      border: '1px solid #ddd',
      borderRadius: 2,
      boxShadow: 1,
      position: 'relative'
    }
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    mb: 2
  }, "Signup"), errors.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error",
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: '1.2em'
    }
  }, errors.map((err, i) => /*#__PURE__*/_react.default.createElement("li", {
    key: i
  }, err)))), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSignup,
    encType: "multipart/form-data"
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    margin: "normal",
    label: "Name",
    name: "name",
    value: form.name,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    margin: "normal",
    label: "Email",
    name: "email",
    type: "email",
    value: form.email,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "role-label"
  }, "Login As"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "role-label",
    id: "role",
    value: form.role,
    label: "Login As",
    onChange: e => setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
      role: e.target.value
    })),
    disabled: loading
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "customer"
  }, "Customer"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "owner"
  }, "Owner"))), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    margin: "normal",
    label: "Password",
    name: "password",
    type: "password",
    value: form.password,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    margin: "normal",
    label: "Confirm Password",
    name: "password_confirmation",
    type: "password",
    value: form.password_confirmation,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label",
    fullWidth: true,
    sx: {
      mt: 2
    }
  }, "Upload Profile Image", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: handleFileChange
  })), profileImage && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      mt: 1
    }
  }, "Selected: ", profileImage.name), /*#__PURE__*/_react.default.createElement(_material.Button, {
    fullWidth: true,
    variant: "contained",
    type: "submit",
    sx: {
      mt: 2
    },
    disabled: loading
  }, "Signup")));
}
var _default = exports.default = Signup;