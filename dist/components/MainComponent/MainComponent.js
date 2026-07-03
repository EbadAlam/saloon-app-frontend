"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _HeaderNew = _interopRequireDefault(require("../Header/HeaderNew"));
var _Footer = _interopRequireDefault(require("../Header/Footer/Footer"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MainLayout() {
  const location = (0, _reactRouterDom.useLocation)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HeaderNew.default, null), /*#__PURE__*/_react.default.createElement("main", {
    className: "main-layout"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null)), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
}
var _default = exports.default = MainLayout;