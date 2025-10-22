"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("../Header/Header"));
var _Footer = _interopRequireDefault(require("../Footer/Footer"));
var _SideBar = _interopRequireDefault(require("../SideBar/SideBar"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../../../contexts/AuthContext");
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function AdminLayout(_ref) {
  let {
    children
  } = _ref;
  const {
    token,
    user
  } = (0, _AuthContext.useAuth)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  if (token) {
    if (user.user_info.role === 'owner' || user.user_info.role === 'worker' || user.user_info.role === 'master-admin') {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "dashboard-main-wrapper"
      }, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_SideBar.default, null), /*#__PURE__*/_react.default.createElement("div", {
        className: "dashboard-wrapper"
      }, children, /*#__PURE__*/_react.default.createElement(_Footer.default, null))));
    } else {
      navigate('/');
    }
  } else {
    navigate(_routes.ROUTES.loginSignup, {
      replace: true,
      state: {
        redirectToState: "home"
      }
    });
  }
}
var _default = exports.default = AdminLayout;