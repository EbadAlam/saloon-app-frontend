"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Layout = _interopRequireDefault(require("../../Admin/Layout/Layout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function WorkerDashboard() {
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, "WorkerDashboard"));
}
var _default = exports.default = WorkerDashboard;