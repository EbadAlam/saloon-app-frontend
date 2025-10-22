"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
var _ArrowForward = _interopRequireDefault(require("@mui/icons-material/ArrowForward"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _AuthContext = require("../../contexts/AuthContext");
var _DummyImage = _interopRequireDefault(require("../DummyImage/DummyImage"));
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function MenuButton() {
  var _user$user_info, _user$user_info2, _user$user_info3, _user$user_info4;
  const {
    user,
    token,
    logout
  } = (0, _AuthContext.useAuth)();
  const location = (0, _reactRouterDom.useLocation)();
  const [open, setOpen] = (0, _react.useState)(false);
  const menuRef = (0, _react.useRef)();
  const handleToggle = () => {
    setOpen(prev => !prev);
  };
  const handleClickOutside = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  (0, _react.useEffect)(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    position: "relative",
    ref: menuRef
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    id: "basic-button",
    onClick: handleToggle,
    endIcon: user && token ? /*#__PURE__*/_react.default.createElement(_KeyboardArrowDown.default, null) : /*#__PURE__*/_react.default.createElement(_Menu.default, null)
  }, user && token ?
  // user?.user_info?.profile_image ? (
  //   <img className='user_profile_img' src={`${process.env.REACT_APP_IMG_URL}/${user.user_info.profile_image}`} alt=""/>
  // ) : (
  //   <DummyImage username={user.username} />
  // )
  user !== null && user !== void 0 && (_user$user_info = user.user_info) !== null && _user$user_info !== void 0 && _user$user_info.profile_image ? (user === null || user === void 0 || (_user$user_info2 = user.user_info) === null || _user$user_info2 === void 0 ? void 0 : _user$user_info2.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(user === null || user === void 0 ? void 0 : user.user_info.profile_image),
    alt: "Profile",
    className: "user_profile_img"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: user === null || user === void 0 ? void 0 : user.user_info.profile_image,
    alt: "",
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
    username: user === null || user === void 0 ? void 0 : user.username
  }) : 'Menu'), open && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "custom-menu",
    sx: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: '#fff',
      boxShadow: 3,
      borderRadius: 2,
      minWidth: 300,
      zIndex: 10,
      p: 1,
      top: '50px'
    }
  }, user && token ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ((_user$user_info3 = user.user_info) === null || _user$user_info3 === void 0 ? void 0 : _user$user_info3.role) == 'owner' && /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Dashboard",
    to: _routes.ROUTES.adminDashboard,
    onClick: () => setOpen(false)
  }), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Profile",
    to: _routes.ROUTES.userProfile,
    onClick: () => setOpen(false)
  }), ((_user$user_info4 = user.user_info) === null || _user$user_info4 === void 0 ? void 0 : _user$user_info4.role) == 'customer' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Appointments",
    to: _routes.ROUTES.userAppointment,
    onClick: () => setOpen(false)
  }), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Favorites",
    to: _routes.ROUTES.userFav,
    onClick: () => setOpen(false)
  })), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Logout",
    onClick: () => {
      setOpen(false);
      logout();
    }
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    sx: {
      px: 2,
      py: 1
    },
    className: "menu-headings"
  }, "For Customers"), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Log in or sign up",
    to: "".concat(_routes.ROUTES.loginSignup, "?redirectTo=").concat(encodeURIComponent(location.pathname)),
    onClick: () => setOpen(false)
  }), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Download the app",
    to: _routes.ROUTES.getTheApp,
    onClick: () => setOpen(false)
  }), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: "Help and support",
    onClick: () => setOpen(false)
  }), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      my: 1
    }
  }), /*#__PURE__*/_react.default.createElement(CustomMenuItem, {
    label: /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 1
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h6",
      className: "menu-headings"
    }, "For businesses"), /*#__PURE__*/_react.default.createElement(_ArrowForward.default, null)),
    to: _routes.ROUTES.forBusiness,
    onClick: () => setOpen(false)
  }))));
}
const CustomMenuItem = _ref => {
  let {
    label,
    to,
    onClick
  } = _ref;
  const content = /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      px: 2,
      py: 1,
      cursor: 'pointer',
      fontSize: '18px',
      fontFamily: 'Barlow'
    },
    onClick: onClick
  }, label);
  return to ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: to,
    style: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }, content) : content;
};
var _default = exports.default = MenuButton;