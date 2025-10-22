"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../contexts/AuthContext");
var _routes = require("../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProtectedRoute = _ref => {
  let {
    children,
    admin = false
  } = _ref;
  const {
    user,
    token,
    loading
  } = (0, _AuthContext.useAuth)();
  const location = (0, _reactRouterDom.useLocation)();
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }
  if (!user || !token) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: _routes.ROUTES.loginSignup,
      replace: true,
      state: {
        redirectToState: "home"
      }
    });
  }
  if (admin) {
    var _user$user_info;
    if (((_user$user_info = user.user_info) === null || _user$user_info === void 0 ? void 0 : _user$user_info.role) === 'master-admin') {
      return children;
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "You're not allowed to access this page.");
    }
  }
  return children;
};
var _default = exports.default = ProtectedRoute;