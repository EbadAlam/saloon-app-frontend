"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../routes");
var _Google = _interopRequireDefault(require("@mui/icons-material/Google"));
var _Apple = _interopRequireDefault(require("@mui/icons-material/Apple"));
var _material = require("@mui/material");
var _ArrowOutward = _interopRequireDefault(require("@mui/icons-material/ArrowOutward"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Footer() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("footer", {
    className: "footerr"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container footer-inner"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer-inner-div footer-inner-div-logo"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "logo"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.home
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/logo-big.png"),
    alt: "Site Logo",
    style: {
      filter: 'brightness(0)'
    }
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer-inner-div"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "About Beauty Trafic"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Careers")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.helpCenter
  }, "Help & Support")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.blogs
  }, "Blog")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Sitemap"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer-inner-div"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "For business"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.forBusiness
  }, "For Partner")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.pricing
  }, "Pricing")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Support")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.status
  }, "Status"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer-inner-div"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Legal"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Privacy Policy")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Terms of Service")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Terms of use"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer-inner-div"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Find us on social"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Facebook ", /*#__PURE__*/_react.default.createElement(_ArrowOutward.default, null))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Instagram ", /*#__PURE__*/_react.default.createElement(_ArrowOutward.default, null))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Linkedin ", /*#__PURE__*/_react.default.createElement(_ArrowOutward.default, null))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, "Twitter ", /*#__PURE__*/_react.default.createElement(_ArrowOutward.default, null)))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "footer_bottom"
  }, "\xA9 ", new Date().getFullYear(), " Your Company"));
}
var _default = exports.default = Footer;