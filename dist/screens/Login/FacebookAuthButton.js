"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactFacebookLogin = _interopRequireDefault(require("@greatsumini/react-facebook-login"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function FacebookAuthButton() {
  const handleResponse = response => {
    console.log("Facebook response:", response);
  };
  return /*#__PURE__*/React.createElement(_material.Box, {
    className: "loginSignupButton",
    display: "flex",
    justifyContent: "start",
    gap: "10px",
    alignItems: "center",
    onClick: () => document.getElementById('fb-login-btn').click(),
    sx: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(_material.Box, null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "33",
    height: "32",
    viewBox: "0 0 33 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32.5 16C32.5 7.1635 25.3365 0 16.5 0C7.6635 0 0.5 7.1635 0.5 16C0.5 23.986 6.351 30.6054 14 31.8056V20.625H9.9375V16H14V12.475C14 8.465 16.3888 6.25 20.0435 6.25C21.794 6.25 23.625 6.5625 23.625 6.5625V10.5H21.6075C19.6199 10.5 19 11.7334 19 12.9987V16H23.4375L22.7281 20.625H19V31.8056C26.649 30.6054 32.5 23.9861 32.5 16Z",
    fill: "#1877F2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22.7281 20.625L23.4375 16H19V12.9987C19 11.7332 19.6199 10.5 21.6075 10.5H23.625V6.5625C23.625 6.5625 21.794 6.25 20.0434 6.25C16.3888 6.25 14 8.465 14 12.475V16H9.9375V20.625H14V31.8056C14.827 31.9352 15.6629 32.0002 16.5 32C17.3371 32.0002 18.173 31.9352 19 31.8056V20.625H22.7281Z",
    fill: "white"
  }))), /*#__PURE__*/React.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#333333',
      fontSize: '18px',
      margin: '0'
    }
  }, "Continue with Facebook")), /*#__PURE__*/React.createElement(_reactFacebookLogin.default, {
    appId: process.env.REACT_APP_FACEBOOK_APP_ID,
    onSuccess: handleResponse,
    onFail: error => console.error('Login Failed!', error),
    onProfileSuccess: handleResponse,
    render: _ref => {
      let {
        onClick
      } = _ref;
      return /*#__PURE__*/React.createElement("button", {
        id: "fb-login-btn",
        onClick: onClick,
        style: {
          display: 'none'
        }
      }, "Login");
    }
  }));
}
var _default = exports.default = FacebookAuthButton;