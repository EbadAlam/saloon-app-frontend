"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function GetTheApp() {
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "get_the_app"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Download our mobile apps"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Book unforgettable beauty and wellness experiences with our mobile app, or run your business with our powerful, award-winning iOS and Android booking platform"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "download_sections"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "download_section android"
  }))));
}
var _default = exports.default = GetTheApp;