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
require("./login-signup.scss");
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
    className: "bt-auth"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "bt-auth__back",
    onClick: handleClick,
    "aria-label": "Go back"
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    fontSize: "small"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "bt-auth__content"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth__eyebrow"
  }, "Get started"), /*#__PURE__*/_react.default.createElement("h1", {
    className: "bt-auth__title"
  }, "Book it. ", /*#__PURE__*/_react.default.createElement("span", null, "Or run it.")), /*#__PURE__*/_react.default.createElement("p", {
    className: "bt-auth__subtitle"
  }, "Choose how you'll use BeautyTrafic"), /*#__PURE__*/_react.default.createElement("div", {
    className: "bt-auth__options"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "bt-auth-card",
    to: redirectTo ? "".concat(_routes.ROUTES.customerLogin, "?redirectTo=").concat(encodeURIComponent(redirectTo)) : _routes.ROUTES.customerLogin
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 21s-7.5-4.6-10-9.1C.4 8.4 2 4.8 5.6 4.1c2-.4 4 .5 6.4 3 2.4-2.5 4.4-3.4 6.4-3 3.6.7 5.2 4.3 3.6 7.8C19.5 16.4 12 21 12 21z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__main"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__title"
  }, "For Customers"), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__subtitle"
  }, "Book salons and spas near you")), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__divider",
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__stub"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "bt-auth-card bt-auth-card--pro",
    to: redirectTo ? "".concat(_routes.ROUTES.ownerLogin, "?redirectTo=").concat(encodeURIComponent(redirectTo)) : _routes.ROUTES.ownerLogin
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "2.4",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "2.4",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.3 7.6 20 18M20 6 8.3 16.4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__main"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__title"
  }, "For Professionals"), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__subtitle"
  }, "Manage and grow your business")), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__divider",
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "bt-auth-card__stub"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))))));
}
var _default = exports.default = LoginSignupPage;