"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axios = _interopRequireDefault(require("axios"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _AuthContext = require("../../contexts/AuthContext");
var _LoginModal = _interopRequireDefault(require("../../components/LoginModal/LoginModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function HelpCenter() {
  const {
    user,
    login
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [topic, setTopic] = (0, _react.useState)("");
  const [description, setDescription] = (0, _react.useState)("");
  const [files, setFiles] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [loginLoading, setLoginLoading] = (0, _react.useState)(false);
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [showLoginForm, setShowLoginForm] = (0, _react.useState)(false);
  const handleFileChange = e => {
    setFiles(e.target.files);
  };
  const [loginMessage, setLoginMessage] = (0, _react.useState)('');
  const [email, setEmail] = (0, _react.useState)('random@gmail.com');
  const [password, setPassword] = (0, _react.useState)('random123');
  const handleLoginSubmit = async e => {
    if (e !== null && e !== void 0 && e.preventDefault) e.preventDefault();
    setLoginLoading(true);
    try {
      const payload = {
        email: email,
        password: password
      };
      const {
        data
      } = await _axiosClient.default.post('/login', payload);
      if (data.success) {
        login(data.user, data.token);
        setShowLoginForm(false);
      } else {
        setLoginMessage(data.message);
      }
    } catch (err) {
      console.error('Error login ', err);
    } finally {
      setLoginLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "error");
    }
  }, [alertMessage]);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      setShowLoginForm(true);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("topic", topic);
      formData.append("user_id", user.id);
      formData.append("description", description);
      for (let i = 0; i < files.length; i++) {
        formData.append("attachments[]", files[i]);
      }
      const {
        data
      } = await _axiosClient.default.post("/submitInquery", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (data.success) {
        showSnackbar(data.message, "success");
        setTopic("");
        setDescription("");
        setFiles([]);
      }
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
      showSnackbar("An error occured, please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "help_center"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_LoginModal.default, {
    open: showLoginForm,
    onClose: () => setShowLoginForm(false),
    email: email,
    password: password,
    setEmail: setEmail,
    setPassword: setPassword,
    onSubmit: handleLoginSubmit,
    loading: loginLoading,
    loginMessage: loginMessage,
    message: "Login or sign up to submit your inquiry"
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bread_crumbs"
  }, /*#__PURE__*/_react.default.createElement(_material.Breadcrumbs, {
    separator: "\u203A",
    "aria-label": "breadcrumb"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    key: "1"
  }, "Help Center"), ",", /*#__PURE__*/_react.default.createElement(_material.Typography, {
    key: "2"
  }, "Contact Us"), ",", /*#__PURE__*/_react.default.createElement(_material.Typography, {
    key: "3",
    sx: {
      color: "text.primary"
    }
  }, "Email Us"), ",")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2",
    sx: {
      mb: 2
    }
  }, "Email Us"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "email_form"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "help-topic-label"
  }, "Select a Help Topic"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "help-topic-label",
    value: topic,
    label: "Select a Help Topic",
    onChange: e => setTopic(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "account"
  }, "Account Issues"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "booking"
  }, "Booking Help"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "payment"
  }, "Payment Problems"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "technical"
  }, "Technical Support"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "other"
  }, "Other"))), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    multiline: true,
    rows: 4,
    label: "Describe your issue",
    value: description,
    onChange: e => setDescription(e.target.value),
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label",
    sx: {
      mb: 2
    }
  }, "Attach Files", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    multiple: true,
    hidden: true,
    onChange: handleFileChange
  })), files.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      mb: 2
    }
  }, files.length, " file(s) selected"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    sx: {
      width: "100%"
    },
    disabled: !topic || !description
  }, "Submit")))));
}
var _default = exports.default = HelpCenter;