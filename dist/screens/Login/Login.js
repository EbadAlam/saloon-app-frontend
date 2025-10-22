"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _AuthContext = require("../../contexts/AuthContext");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _RoleRedirector = _interopRequireDefault(require("../../components/RoleRedirector/RoleRedirector"));
var _Visibility = _interopRequireDefault(require("@mui/icons-material/Visibility"));
var _VisibilityOff = _interopRequireDefault(require("@mui/icons-material/VisibilityOff"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Login() {
  const [email, setEmail] = (0, _react.useState)('alexanderhigh69@gmail.com');
  const [password, setPassword] = (0, _react.useState)('hello123');
  const [showAlert, setShowAlert] = (0, _react.useState)(false);
  const [alertMessage, setAlertMessage] = (0, _react.useState)();
  const [alertType, setAlertType] = (0, _react.useState)('error');
  const [loading, setLoading] = (0, _react.useState)(false);
  const [showPassword, setShowPassword] = (0, _react.useState)(false);
  const {
    login,
    token,
    user
  } = (0, _AuthContext.useAuth)();
  if (user && token) {
    return /*#__PURE__*/_react.default.createElement(_RoleRedirector.default, {
      user: user
    });
  }
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    const payload = {
      email: email,
      password: password
    };
    try {
      const {
        data
      } = await _axiosClient.default.post('/login', payload);
      if (data.success === true) {
        login(data.user, data.token);
        setAlertType('success');
        setAlertMessage(data.message || "Login Succesfull!");
        setShowAlert(true);
      } else {
        setAlertMessage(data.message || "Something went wrong!");
        setShowAlert(true);
      }
      setLoading(false);
    } catch (err) {
      var _err$response;
      console.error('Login failed:', ((_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.data) || err.message);
      setLoading(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleMouseUpPassword = event => {
    event.preventDefault();
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Paper, {
    elevation: 3,
    sx: {
      padding: 4,
      width: 350,
      position: 'relative'
    }
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    gutterBottom: true,
    align: "center"
  }, "Login"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleLogin
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Email",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    disabled: loading
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    sx: {
      width: '100%',
      mt: 3
    },
    variant: "outlined"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    htmlFor: "outlined-adornment-password"
  }, "Password"), /*#__PURE__*/_react.default.createElement(_material.OutlinedInput, {
    id: "outlined-adornment-password",
    type: showPassword ? 'text' : 'password',
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true,
    disabled: loading,
    endAdornment: /*#__PURE__*/_react.default.createElement(_material.InputAdornment, {
      position: "end"
    }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
      "aria-label": showPassword ? 'hide the password' : 'display the password',
      onClick: handleClickShowPassword,
      onMouseDown: handleMouseDownPassword,
      onMouseUp: handleMouseUpPassword,
      edge: "end"
    }, showPassword ? /*#__PURE__*/_react.default.createElement(_VisibilityOff.default, null) : /*#__PURE__*/_react.default.createElement(_Visibility.default, null))),
    label: "Password"
  })), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    color: "primary",
    fullWidth: true,
    sx: {
      mt: 2
    },
    disabled: loading
  }, "Login")), /*#__PURE__*/_react.default.createElement(_material.Collapse, {
    in: showAlert
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    action: /*#__PURE__*/_react.default.createElement(_material.IconButton, {
      "aria-label": "close",
      color: "inherit",
      size: "small",
      onClick: () => {
        setShowAlert(false);
      }
    }, /*#__PURE__*/_react.default.createElement(_Close.default, {
      fontSize: "inherit"
    })),
    sx: {
      mb: 2
    },
    severity: alertType
  }, alertMessage)))));
}
var _default = exports.default = Login;