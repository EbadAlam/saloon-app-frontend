"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/components/BackButton.jsx

function BackButton(_ref) {
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
  return /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    startIcon: /*#__PURE__*/_react.default.createElement(_ArrowBack.default, null),
    onClick: handleClick,
    sx: {
      background: '#333333'
    }
  }, "Back");
}
var _default = exports.default = BackButton;