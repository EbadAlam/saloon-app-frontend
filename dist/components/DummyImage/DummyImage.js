"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function DummyImage(_ref) {
  let {
    username,
    width = '40px',
    height = '40px'
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width,
      height,
      borderRadius: '50%',
      backgroundColor: '#ccc',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'uppercase'
    }
  }, (username === null || username === void 0 ? void 0 : username.charAt(0)) || '?');
}
var _default = exports.default = DummyImage;