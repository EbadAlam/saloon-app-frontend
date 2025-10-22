"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _routes = require("../../routes");
var _reactRouterDom = require("react-router-dom");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _reactHelmetAsync = require("react-helmet-async");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function LoginSignupPage() {
  var _location$state;
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const location = (0, _reactRouterDom.useLocation)();
  const redirectToState = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.redirectToState;
  const handleClick = () => {
    if (redirectToState == "home") {
      navigate(_routes.ROUTES.home);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(_routes.ROUTES.home);
    }
  };
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const error = searchParams.get("error");
  if (error && error == "role-mismatch") {
    showSnackbar("This account is already registered with different role.", "error");
    navigate(_routes.ROUTES.loginSignup, {
      replace: true
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Beauty Traffic login page")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    sx: {
      height: "100vh",
      overflow: "hidden",
      background: "#FFF8F0"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "login-signup-div",
    sx: {
      width: "55%",
      padding: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "back-div"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, null))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "buttons",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "50px",
    sx: {
      marginTop: "50px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Log in Or Sign up")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    className: "login-signup-sub-div",
    sx: {
      width: "55%"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: redirectTo ? "".concat(_routes.ROUTES.customerLogin, "?redirectTo=").concat(encodeURIComponent(redirectTo)) : _routes.ROUTES.customerLogin
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "loginSignupButton",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "#333333",
      fontSize: "18px",
      margin: "0"
    }
  }, "BeautyTrafic For Customers"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "#33333378",
      fontSize: "18px",
      margin: "0"
    }
  }, "Book Salons and spas near you")), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "33",
    height: "33",
    viewBox: "0 0 33 33",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.73922 16.311L28.8787 16.311M28.8787 16.311L17.4795 27.7102M28.8787 16.311L17.4795 4.91186",
    stroke: "#333333",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: redirectTo ? "".concat(_routes.ROUTES.ownerLogin, "?redirectTo=").concat(encodeURIComponent(redirectTo)) : _routes.ROUTES.ownerLogin
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "loginSignupButton",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "#333333",
      fontSize: "18px",
      margin: "0"
    }
  }, "BeautyTrafic For Professionals"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: "#33333378",
      fontSize: "18px",
      margin: "0"
    }
  }, "Manage and grow your business")), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "33",
    height: "33",
    viewBox: "0 0 33 33",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.73922 16.311L28.8787 16.311M28.8787 16.311L17.4795 27.7102M28.8787 16.311L17.4795 4.91186",
    stroke: "#333333",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_img",
    sx: {
      width: "45%"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/login-signup-page-img.png"),
    alt: "Banner Img",
    style: {
      width: "100%"
    }
  }))));
}
var _default = exports.default = LoginSignupPage;