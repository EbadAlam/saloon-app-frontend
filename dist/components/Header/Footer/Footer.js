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
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "app_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getTheApp
  }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Get the app", /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "google_icon icon"
  }, /*#__PURE__*/_react.default.createElement(_Google.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "apple_icon icon"
  }, /*#__PURE__*/_react.default.createElement(_Apple.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "play_store_icon icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 3.71831V28.2808C3.00016 28.3341 3.01606 28.3862 3.04569 28.4305C3.07532 28.4747 3.11737 28.5093 3.16656 28.5298C3.21575 28.5503 3.2699 28.5558 3.32222 28.5456C3.37453 28.5355 3.42268 28.5101 3.46062 28.4727L16.25 16.0002L3.46062 3.52644C3.42268 3.48902 3.37453 3.46364 3.32222 3.45349C3.2699 3.44333 3.21575 3.44884 3.16656 3.46933C3.11737 3.48982 3.07532 3.52438 3.04569 3.56867C3.01606 3.61297 3.00016 3.66502 3 3.71831ZM21.6125 10.8752L5.57625 2.04019L5.56625 2.03456C5.29 1.88456 5.0275 2.25831 5.25375 2.47581L17.8244 14.4958L21.6125 10.8752ZM5.255 29.5246C5.0275 29.7421 5.29 30.1158 5.5675 29.9658L5.5775 29.9602L21.6125 21.1252L17.8244 17.5033L5.255 29.5246ZM28.0863 14.4377L23.6081 11.9714L19.3975 16.0002L23.6081 20.0271L28.0863 17.5627C29.3044 16.8896 29.3044 15.1108 28.0863 14.4377Z",
    fill: "#2E2E2E"
  }))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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