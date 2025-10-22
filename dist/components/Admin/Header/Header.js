"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("../css/bootstrap/css/bootstrap.min.css");
require("../css/fonts/circular-std/style.css");
require("../css/fonts/fontawesome/css/fontawesome-all.css");
require("../css/fonts/material-design-iconic-font/css/materialdesignicons.min.css");
require("../css/libs/css/style.css");
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../../../contexts/AuthContext");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Header() {
  var _user$user_info, _user$user_info2;
  const {
    user,
    logout
  } = (0, _AuthContext.useAuth)();
  const [headerProfile, setHeaderProfile] = (0, _react.useState)(false);
  const [loading, setLoading] = (0, _react.useState)(false);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const headerProfileClick = () => {
    setHeaderProfile(!headerProfile);
  };
  const handleLogout = () => {
    logout();
    navigate(_routes.ROUTES.loginSignup, {
      replace: true,
      state: {
        redirectToState: "home"
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "dashboard-header"
  }, /*#__PURE__*/_react.default.createElement("nav", {
    className: "navbar navbar-expand-lg bg-white fixed-top"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "navbar-brand",
    style: {
      color: "#333333"
    }
  }, "Saloon Appointment"), /*#__PURE__*/_react.default.createElement("div", {
    className: "collapse navbar-collapse ",
    id: "navbarSupportedContent"
  }, loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement("ul", {
    className: "navbar-nav ml-auto navbar-right-top"
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item dropdown nav-user"
  }, /*#__PURE__*/_react.default.createElement("a", {
    onClick: headerProfileClick,
    className: "nav-link nav-user-img",
    href: "#",
    id: "navbarDropdownMenuLink2"
  }, (_user$user_info = user.user_info) !== null && _user$user_info !== void 0 && _user$user_info.profile_image ? ((_user$user_info2 = user.user_info) === null || _user$user_info2 === void 0 ? void 0 : _user$user_info2.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(user.user_info.profile_image),
    alt: "",
    className: "user-avatar-md rounded-circle"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: user.user_info.profile_image,
    alt: "",
    className: "user-avatar-md rounded-circle"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: "https://avatar.iran.liara.run/public/boy?username=".concat(user.username),
    alt: "",
    className: "user-avatar-md rounded-circle"
  })), headerProfile ? /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-menu-right nav-user-dropdown",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "nav-user-info"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "mb-0 text-white nav-user-name text-capitalize"
  }, user.username)), /*#__PURE__*/_react.default.createElement("a", {
    onClick: handleLogout,
    style: {
      cursor: "pointer"
    },
    className: "dropdown-item"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-power-off mr-2"
  }), "Logout")) : null)))));
}
var _default = exports.default = Header;