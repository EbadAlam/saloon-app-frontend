"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function BackComponent(_ref) {
  let {
    fallback = '/'
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    className: "backButtonCp",
    sx: {
      paddingTop: '50px'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, null)), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)));
}
var _default = exports.default = BackComponent;