"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("../../contexts/AuthContext");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _AccountCircleOutlined = _interopRequireDefault(require("@mui/icons-material/AccountCircleOutlined"));
var _CalendarTodayOutlined = _interopRequireDefault(require("@mui/icons-material/CalendarTodayOutlined"));
var _FavoriteBorderOutlined = _interopRequireDefault(require("@mui/icons-material/FavoriteBorderOutlined"));
var _LogoutOutlined = _interopRequireDefault(require("@mui/icons-material/LogoutOutlined"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function UserSidebar() {
  var _user$user_info;
  const {
    user,
    token,
    logout
  } = (0, _AuthContext.useAuth)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [logoutDialogOpen, setLogoutDialogOpen] = (0, _react.useState)(false);
  if (!user && !token) {
    navigate(_routes.ROUTES.loginSignup);
  }
  const location = (0, _reactRouterDom.useLocation)();
  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };
  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sidebar"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, user === null || user === void 0 ? void 0 : user.username), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "items"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.userProfile
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "item ".concat(location.pathname === _routes.ROUTES.userProfile ? "active" : "")
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_AccountCircleOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, "Profile"))), ((_user$user_info = user.user_info) === null || _user$user_info === void 0 ? void 0 : _user$user_info.role) == "customer" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.userAppointment
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "item ".concat(location.pathname === _routes.ROUTES.userAppointment ? "active" : "")
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_CalendarTodayOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, "Appointments"))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.userFav
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "item ".concat(location.pathname === _routes.ROUTES.userFav ? "active" : "")
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_FavoriteBorderOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, "Favorites")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "item ".concat(location.pathname === _routes.ROUTES.login ? "active" : ""),
    onClick: handleLogoutClick,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_LogoutOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, "Logout")), /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: logoutDialogOpen,
    onClose: handleCancelLogout
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Logout"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, "Are you sure you want to logout?"), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleCancelLogout,
    color: "inherit"
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: logout,
    color: "error",
    variant: "contained"
  }, "Logout")))));
}
var _default = exports.default = UserSidebar;