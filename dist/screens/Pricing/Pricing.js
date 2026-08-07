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
var _PricingSection = _interopRequireDefault(require("../../components/PricingSection/PricingSection"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Pricing() {
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "pricing_page"
  }, /*#__PURE__*/_react.default.createElement(_PricingSection.default, null));
}
var _default = exports.default = Pricing;