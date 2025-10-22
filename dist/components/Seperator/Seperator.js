"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Seperator() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "seperator"
  }, /*#__PURE__*/_react.default.createElement(_Divider.default, {
    orientation: "vertical",
    sx: {
      height: '40px',
      borderColor: 'gray'
    }
  }));
}
var _default = exports.default = Seperator;