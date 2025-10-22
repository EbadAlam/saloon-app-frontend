"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _AuthContext = require("../../contexts/AuthContext");
var _RoleRedirector = _interopRequireDefault(require("../../components/RoleRedirector/RoleRedirector"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MasterAdminLogin() {
  const {
    login,
    user,
    token
  } = (0, _AuthContext.useAuth)();
  const [formData, setFormData] = (0, _react.useState)({
    email: "",
    password: ""
  });
  const [loading, setLoading] = (0, _react.useState)(false);
  const handleChange = e => {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const payload = _objectSpread(_objectSpread({}, formData), {}, {
      roles: ["master-admin"]
    });
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post('/masterLogin', payload);
      if (data.success) {
        login(data.user, data.token);
      } else {
        alert('You know how to login here 🤭');
      }
    } catch (error) {
      console.error('Error login master admin ', error);
    } finally {
      setLoading(false);
    }
  };
  if (user && token) {
    return /*#__PURE__*/_react.default.createElement(_RoleRedirector.default, {
      user: user
    });
  }
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      maxWidth: 400,
      mx: "auto",
      mt: 5,
      p: 3,
      boxShadow: 3,
      borderRadius: 2,
      position: 'relative'
    }
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    mb: 2,
    textAlign: "center"
  }, "Master Admin Login"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Email",
    name: "email",
    value: formData.email,
    onChange: handleChange,
    margin: "normal",
    type: "email",
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Password",
    name: "password",
    value: formData.password,
    onChange: handleChange,
    margin: "normal",
    type: "password",
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    fullWidth: true,
    type: "submit",
    variant: "contained",
    sx: {
      mt: 2
    }
  }, "Login")));
}
var _default = exports.default = MasterAdminLogin;