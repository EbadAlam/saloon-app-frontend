"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _Check = _interopRequireDefault(require("@mui/icons-material/Check"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Pricing() {
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "pricing_page"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "intro"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "left_side"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "The only free software for beauty and wellness professionals"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Focus on what you do best. With BeautyTrafic Professional app you can effortlessly manage your schedule and client communication from anywhere, at any time, right from your phone."), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.ownerLogin
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Signup"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "img_side"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/pricing-page-intro-img.png"),
    alt: ""
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "fees"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Free for all, ", /*#__PURE__*/_react.default.createElement("span", null, "no monthly fee")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Unlimited usage with no subscription fees! The only free platform for beauty and wellness"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullets"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "side"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited appointment bookings"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Super easy to use across mobiles, tablets and desktops"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited team members"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Invite your team to join your account and stay up-to-date with appointment notifications"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited locations"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Manage multiple venues from one main account with no limitations")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "side"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited appointment bookings"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Super easy to use across mobiles, tablets and desktops"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited team members"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Invite your team to join your account and stay up-to-date with appointment notifications"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bullet"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Check.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Unlimited locations"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Manage multiple venues from one main account with no limitations"))))))));
}
var _default = exports.default = Pricing;