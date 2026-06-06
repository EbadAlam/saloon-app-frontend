"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Footer() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
  }, "Copyright \xA9 ", new Date().getFullYear(), ". All rights reserved."), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md-right footer-links d-none d-sm-block"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "javascript: void(0);"
  }, "About"), /*#__PURE__*/_react.default.createElement("a", {
    href: "javascript: void(0);"
  }, "Support"), /*#__PURE__*/_react.default.createElement("a", {
    href: "javascript: void(0);"
  }, "Contact Us"))))));
}
var _default = exports.default = Footer;