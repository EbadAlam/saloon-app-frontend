"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Header = _interopRequireDefault(require("../Header/Header"));
var _Footer = _interopRequireDefault(require("../Header/Footer/Footer"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MainLayout() {
  const location = (0, _reactRouterDom.useLocation)();
  const isHomePage = location.pathname === _routes.ROUTES.home;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement("main", {
    style: !isHomePage ? {
      background: '#FFF8F0',
      minHeight: '50vh'
    } : {
      minHeight: '50vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null)), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
}
var _default = exports.default = MainLayout;