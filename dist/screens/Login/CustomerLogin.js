"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _routes = require("../../routes");
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _AuthContext = require("../../contexts/AuthContext");
var _RoleRedirector = _interopRequireDefault(require("../../components/RoleRedirector/RoleRedirector"));
require("./login-signup.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    background: '#FFFFFF',
    '& fieldset': {
      borderColor: '#E7DACB'
    },
    '&:hover fieldset': {
      borderColor: '#4E2E45'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4E2E45'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#4E2E45'
  }
};
const primaryButtonSx = {
  mt: 2,
  background: '#4E2E45',
  borderRadius: '10px',
  padding: '13px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '15px',
  boxShadow: 'none',
  '&:hover': {
    background: '#3c2337',
    boxShadow: 'none'
  }
};
function CustomerLoginPage() {
  const location = (0, _reactRouterDom.useLocation)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    login,
    user,
    token
  } = (0, _AuthContext.useAuth)();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const handleClick = () => {
    if (showForm != 'basic') {
      setShowForm('basic');
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(_routes.ROUTES.home);
      }
    }
  };
  const [email, setEmail] = (0, _react.useState)('random@gmail.com');
  const [password, setPassword] = (0, _react.useState)('random123');
  const [passwordConfirm, setPasswordConfirm] = (0, _react.useState)('');
  const [username, setUsername] = (0, _react.useState)('');
  const [phoneNumber, setPhoneNumber] = (0, _react.useState)('');
  const [loading, setLoading] = (0, _react.useState)(false);
  const [showForm, setShowForm] = (0, _react.useState)('basic');
  const [profileImage, setProfileImage] = (0, _react.useState)(null);
  const [showAlert, setShowAlert] = (0, _react.useState)(false);
  const [alertMessage, setAlertMessage] = (0, _react.useState)();
  const [alertType, setAlertType] = (0, _react.useState)('error');
  const [errors, setErrors] = (0, _react.useState)([]);
  const [acceptedTerms, setAcceptedTerms] = (0, _react.useState)(false);
  const handleEmailCheck = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email: email,
      roles: ['customer']
    };
    try {
      const {
        data
      } = await _axiosClient.default.post('/check-user-email', payload);
      if (data.userExists) {
        setShowForm('password');
      } else {
        setShowForm('completeForm');
      }
    } catch (err) {
      var _err$response;
      console.error('user check failed', ((_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.data) || err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = e => {
    setProfileImage(e.target.files[0]);
  };
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
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
        setTimeout(() => {
          navigate(redirectTo || _routes.ROUTES.home);
        }, 100);
      } else {
        setAlertType('error');
        setAlertMessage(data.message || "Something went wrong!");
        setShowAlert(true);
      }
    } catch (err) {
      var _err$response2;
      console.error('error login: ', ((_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.data) || err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setAlertMessage(null);
    setAlertType(null);
    const payload = new FormData();
    payload.append('username', username);
    payload.append('email', email);
    payload.append('phone_number', phoneNumber);
    payload.append('password', password);
    payload.append('password_confirmation', passwordConfirm);
    payload.append('role', 'customer');
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
      setAlertMessage(data.message || 'Signup successful! Check your email.');
      setAlertType('success');
      setShowAlert(true);
      setProfileImage(null);
      setUsername('');
      setPhoneNumber('');
      setEmail(email);
      setPassword('');
      setPasswordConfirm('');
      setShowForm('basic');
    } catch (err) {
      var _err$response3;
      if ((_err$response3 = err.response) !== null && _err$response3 !== void 0 && (_err$response3 = _err$response3.data) !== null && _err$response3 !== void 0 && _err$response3.errors) {
        const errorList = Object.values(err.response.data.errors).flat();
        setErrors(errorList);
      } else {
        var _err$response4;
        setErrors([((_err$response4 = err.response) === null || _err$response4 === void 0 || (_err$response4 = _err$response4.data) === null || _err$response4 === void 0 ? void 0 : _err$response4.message) || 'Signup failed.']);
      }
    } finally {
      setLoading(false);
    }
  };
  const forgotPasswordHandle = async () => {
    setLoading(true);
    try {
      const payload = {
        email
      };
      const {
        data
      } = await _axiosClient.default.post('/forgotPassword', payload);
      if (data.success) {
        setAlertType('success');
        setAlertMessage(data.message || 'Email sent');
        setShowAlert(true);
      } else {
        setAlertType('error');
        setAlertMessage(data.message || 'Something went wrong, try again later');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error sending email: ', error);
    } finally {
      setLoading(false);
    }
  };
  if (user && token) {
    return /*#__PURE__*/React.createElement(_RoleRedirector.default, {
      user: user
    });
  }
  return /*#__PURE__*/React.createElement(_material.Box, {
    className: "bt-auth"
  }, loading && /*#__PURE__*/React.createElement(_Loader.default, null), /*#__PURE__*/React.createElement("button", {
    className: "bt-auth__back",
    onClick: handleClick,
    "aria-label": "Go back"
  }, /*#__PURE__*/React.createElement(_ArrowBack.default, {
    fontSize: "small"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bt-auth__content bt-auth__content--center"
  }, showAlert && /*#__PURE__*/React.createElement(_material.Alert, {
    className: "bt-auth-alert",
    action: /*#__PURE__*/React.createElement(_material.IconButton, {
      "aria-label": "close",
      color: "inherit",
      size: "small",
      onClick: () => setShowAlert(false)
    }, /*#__PURE__*/React.createElement(_Close.default, {
      fontSize: "inherit"
    })),
    sx: {
      mb: 2
    },
    severity: alertType
  }, alertMessage), errors.length > 0 && /*#__PURE__*/React.createElement(_material.Alert, {
    className: "bt-auth-alert",
    severity: "error",
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: '1.2em',
      textAlign: 'left'
    }
  }, errors.map((err, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, err)))), showForm === 'basic' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "bt-auth__eyebrow"
  }, "Customers"), /*#__PURE__*/React.createElement("h1", {
    className: "bt-auth__title"
  }, "Welcome to ", /*#__PURE__*/React.createElement("span", null, "BeautyTrafic")), /*#__PURE__*/React.createElement("p", {
    className: "bt-auth__subtitle"
  }, "Create an account or log in to book and manage your appointments."), /*#__PURE__*/React.createElement("div", {
    className: "bt-auth-form"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    className: "bt-auth-social",
    to: "".concat(process.env.REACT_APP_LARAVEL_BASE_URL, "/auth/google/redirect?login_type=customer")
  }, /*#__PURE__*/React.createElement("span", {
    className: "bt-auth-social__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 33 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.6475 1.0525C8.45019 2.16167 5.69285 4.26691 3.78046 7.059C1.86808 9.85109 0.901465 13.1829 1.02259 16.5649C1.14372 19.947 2.34621 23.201 4.45343 25.8492C6.56065 28.4973 9.46153 30.3999 12.73 31.2775C15.3798 31.9612 18.156 31.9913 20.82 31.365C23.2333 30.8229 25.4644 29.6634 27.295 28C29.2002 26.2159 30.5831 23.9462 31.295 21.435C32.0688 18.7042 32.2065 15.8323 31.6975 13.04H16.8175V19.2125H25.435C25.2628 20.197 24.8937 21.1366 24.3499 21.9751C23.806 22.8136 23.0986 23.5338 22.27 24.0925C21.2177 24.7886 20.0315 25.2569 18.7875 25.4675C17.5398 25.6995 16.2601 25.6995 15.0125 25.4675C13.748 25.2061 12.5517 24.6841 11.5 23.935C9.81036 22.739 8.54168 21.0398 7.87499 19.08C7.19702 17.0835 7.19702 14.919 7.87499 12.9225C8.34955 11.523 9.13407 10.2488 10.17 9.19499C11.3555 7.96686 12.8563 7.08899 14.5079 6.65769C16.1594 6.22638 17.8979 6.25832 19.5325 6.75C20.8094 7.14197 21.9771 7.82684 22.9425 8.75C23.9142 7.78333 24.8842 6.81416 25.8525 5.8425C26.3525 5.32 26.8975 4.82249 27.39 4.2875C25.9164 2.91619 24.1867 1.84914 22.3 1.1475C18.8642 -0.10003 15.1049 -0.133556 11.6475 1.0525Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.6474 1.05249C15.1046 -0.134368 18.8639 -0.101725 22.2999 1.14499C24.187 1.8514 25.9159 2.92358 27.3874 4.29999C26.8874 4.83499 26.3599 5.33499 25.8499 5.85499C24.8799 6.82332 23.9108 7.78832 22.9424 8.74999C21.9771 7.82683 20.8094 7.14197 19.5324 6.74999C17.8984 6.25659 16.16 6.22281 14.508 6.65235C12.856 7.08188 11.3542 7.95814 10.1674 9.18499C9.13153 10.2388 8.34701 11.513 7.87244 12.9125L2.68994 8.89999C4.54496 5.22139 7.75681 2.40755 11.6474 1.05249Z",
    fill: "#E33629"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1.31512 12.8749C1.59367 11.4944 2.05613 10.1575 2.69012 8.8999L7.87262 12.9224C7.19466 14.9189 7.19466 17.0834 7.87262 19.0799C6.14595 20.4132 4.41845 21.7532 2.69012 23.0999C1.103 19.9407 0.618951 16.3412 1.31512 12.8749Z",
    fill: "#F8BD00"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.8175 13.0376H31.6975C32.2065 15.8299 32.0688 18.7018 31.295 21.4326C30.5831 23.9438 29.2002 26.2135 27.295 27.9976C25.6225 26.6926 23.9425 25.3976 22.27 24.0926C23.0992 23.5333 23.8069 22.8123 24.3508 21.9729C24.8946 21.1335 25.2634 20.193 25.435 19.2076H16.8175C16.815 17.1526 16.8175 15.0951 16.8175 13.0376Z",
    fill: "#587DBD"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.6875 23.1001C4.41583 21.7667 6.14333 20.4267 7.87 19.0801C8.53802 21.0406 9.80851 22.7398 11.5 23.9351C12.555 24.6807 13.7538 25.1984 15.02 25.4551C16.2676 25.6871 17.5474 25.6871 18.795 25.4551C20.039 25.2445 21.2252 24.7762 22.2775 24.0801C23.95 25.3851 25.63 26.6801 27.3025 27.9851C25.4722 29.6494 23.241 30.8098 20.8275 31.3526C18.1635 31.9788 15.3873 31.9488 12.7375 31.2651C10.6418 30.7055 8.68419 29.7191 6.9875 28.3676C5.19165 26.9418 3.72489 25.145 2.6875 23.1001Z",
    fill: "#319F43"
  }))), /*#__PURE__*/React.createElement("span", null, "Continue with Google")), /*#__PURE__*/React.createElement("div", {
    className: "bt-auth-divider"
  }, /*#__PURE__*/React.createElement("span", null, "or")), /*#__PURE__*/React.createElement("form", {
    className: "bt-auth-fields",
    onSubmit: handleEmailCheck
  }, /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Email address",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    fullWidth: true,
    sx: primaryButtonSx,
    disabled: loading
  }, "Continue")), /*#__PURE__*/React.createElement("p", {
    className: "bt-auth-switch"
  }, "Have a business account?", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.ownerLogin,
    className: "bt-auth-switch__link"
  }, "Sign in as professional")))), showForm === 'password' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "bt-auth__eyebrow"
  }, "Customers"), /*#__PURE__*/React.createElement("h1", {
    className: "bt-auth__title"
  }, "Welcome ", /*#__PURE__*/React.createElement("span", null, "back")), /*#__PURE__*/React.createElement("p", {
    className: "bt-auth__subtitle"
  }, "Enter your password to log in as ", email), /*#__PURE__*/React.createElement("div", {
    className: "bt-auth-form"
  }, /*#__PURE__*/React.createElement("form", {
    className: "bt-auth-fields",
    onSubmit: handleLogin
  }, /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Password",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    fullWidth: true,
    sx: primaryButtonSx,
    disabled: loading
  }, "Login")), /*#__PURE__*/React.createElement("p", {
    className: "bt-auth-note"
  }, "Forgot password?", ' ', /*#__PURE__*/React.createElement("span", {
    className: "bt-auth-note__action",
    onClick: forgotPasswordHandle
  }, "Click here to reset.")))), showForm === 'completeForm' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "bt-auth__eyebrow"
  }, "Customers"), /*#__PURE__*/React.createElement("h1", {
    className: "bt-auth__title"
  }, "Create ", /*#__PURE__*/React.createElement("span", null, "account")), /*#__PURE__*/React.createElement("p", {
    className: "bt-auth__subtitle"
  }, "You're almost there! Complete these details for ", email), /*#__PURE__*/React.createElement("div", {
    className: "bt-auth-form"
  }, /*#__PURE__*/React.createElement("form", {
    className: "bt-auth-fields",
    onSubmit: handleSignup
  }, /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Name",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "text",
    value: username,
    onChange: e => setUsername(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Phone number",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "number",
    value: phoneNumber,
    onChange: e => setPhoneNumber(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Password",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.TextField, {
    label: "Confirm password",
    variant: "outlined",
    fullWidth: true,
    margin: "normal",
    type: "password",
    value: passwordConfirm,
    onChange: e => setPasswordConfirm(e.target.value),
    required: true,
    disabled: loading,
    sx: textFieldSx
  }), /*#__PURE__*/React.createElement(_material.Button, {
    variant: "outlined",
    component: "label",
    fullWidth: true,
    className: "bt-auth-upload",
    sx: {
      mt: 2
    }
  }, "Upload profile image", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: handleFileChange
  })), profileImage && /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      mt: 1,
      color: 'var(--bt-ink-soft)'
    }
  }, "Selected: ", profileImage.name), /*#__PURE__*/React.createElement(_material.FormControlLabel, {
    control: /*#__PURE__*/React.createElement(_material.Checkbox, {
      checked: acceptedTerms,
      onChange: e => setAcceptedTerms(e.target.checked),
      disabled: loading,
      sx: {
        color: '#4E2E45',
        '&.Mui-checked': {
          color: '#4E2E45'
        }
      }
    }),
    label: /*#__PURE__*/React.createElement(_material.Typography, {
      variant: "body2"
    }, "I agree to the Terms and Conditions"),
    sx: {
      mt: 2
    }
  }), /*#__PURE__*/React.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    fullWidth: true,
    sx: primaryButtonSx,
    disabled: loading || !acceptedTerms
  }, "Sign up"))))));
}
var _default = exports.default = CustomerLoginPage;