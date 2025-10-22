"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReloadButton;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _Refresh = _interopRequireDefault(require("@mui/icons-material/Refresh"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ReloadButton(_ref) {
  let {
    onReload
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: onReload,
    sx: {
      alignSelf: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Refresh.default, null));
}