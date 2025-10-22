"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Menu = _interopRequireDefault(require("../Menu/Menu"));
var _routes = require("../../routes");
var _material = require("@mui/material");
var _AuthContext = require("../../contexts/AuthContext");
var _SearchBar = _interopRequireDefault(require("../SearchBar/SearchBar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/components/Layout/Header.jsx

function Header() {
  const {
    user,
    token
  } = (0, _AuthContext.useAuth)();
  const location = (0, _reactRouterDom.useLocation)();
  const isHomePage = location.pathname === _routes.ROUTES.home;
  return /*#__PURE__*/_react.default.createElement("header", {
    className: "header",
    style: !isHomePage ? {
      background: '#FFF8F0'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: _routes.ROUTES.home
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/logo.png"),
    alt: "",
    style: isHomePage ? {
      filter: 'brightness(0)'
    } : {}
  }))), !isHomePage && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search_bar_header"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-btn desktop"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "nav",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "25px"
  }, !user && !token && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "login_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "".concat(_routes.ROUTES.loginSignup, "?redirectTo=").concat(encodeURIComponent(location.pathname))
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      color: 'black',
      fontWeight: '600',
      textTransform: 'capitalize',
      fontSize: '16px'
    }
  }, "Login"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "list_business_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.forBusiness
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      color: 'black',
      fontWeight: '600',
      textTransform: 'capitalize',
      fontSize: '16px',
      border: '1px solid #333333',
      borderRadius: '25px',
      padding: '5px 15px'
    }
  }, "List Your Business")))), /*#__PURE__*/_react.default.createElement(_Menu.default, null)))));
}
var _default = exports.default = Header;