"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _routes = require("../../routes");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function PasswordReset() {
  const {
    email,
    reset_token
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [password, setPassword] = (0, _react.useState)('');
  const [confirmPassword, setConfirmPassword] = (0, _react.useState)('');
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [message, setMessage] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [alert, setAlert] = (0, _react.useState)({
    message: '',
    type: ''
  });
  const [alertType, setAlertType] = (0, _react.useState)('');
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        message: 'Passwords do not match',
        type: 'error'
      });
      return;
    }
    setAlert({
      message: '',
      type: ''
    });
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post('/resetPassword', {
        email,
        token: reset_token,
        password,
        password_confirmation: confirmPassword
      });
      setAlert({
        message: data.message || "Password reset successful!",
        type: 'success'
      });
      setTimeout(() => {
        navigate(_routes.ROUTES.loginSignup);
      }, 2000);
    } catch (err) {
      var _err$response;
      setAlert({
        message: ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Something went wrong, please try again.",
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    showSnackbar(alert.message, alert.type);
  }, [alert]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      maxWidth: "600px",
      margin: "0px auto",
      padding: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    sx: {
      fontSize: '32px'
    }
  }, /*#__PURE__*/_react.default.createElement("b", null, "Password Reset")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    sx: {
      fontSize: '18px'
    }
  }, "Resetting password for ", /*#__PURE__*/_react.default.createElement("b", null, email))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    sx: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    style: {
      width: '100%'
    },
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "New Password",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true,
    disabled: loading
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Confirm Password",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    required: true,
    disabled: loading
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    color: "primary",
    fullWidth: true,
    sx: {
      mt: 2,
      background: '#333333',
      borderRadius: '10px',
      padding: '15px'
    },
    disabled: loading
  }, "Reset Password")))));
}
var _default = exports.default = PasswordReset;