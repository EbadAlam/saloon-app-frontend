"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Address(_ref) {
  let {
    details
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "get-dir-btn mt-2"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "address"
  }, details.address), /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.google.com/maps/dir/?api=1&destination=".concat(details.lat, ",").concat(details.lng),
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Get Directions"));
}
var _default = exports.default = Address;