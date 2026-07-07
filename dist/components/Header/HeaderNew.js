"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _material = require("@mui/material");
var _AuthContext = require("../../contexts/AuthContext");
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Header() {
  const {
    user,
    token
  } = (0, _AuthContext.useAuth)();
  const location = (0, _reactRouterDom.useLocation)();
  const [mobileMenuOpen, setMobileMenuOpen] = (0, _react.useState)(false);
  const [scrolled, setScrolled] = (0, _react.useState)(false);
  const isHomePage = location.pathname === _routes.ROUTES.home;
  (0, _react.useEffect)(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  (0, _react.useEffect)(() => {
    setMobileMenuOpen(false);
  }, [location]);
  const menuItems = [{
    label: "Stores",
    href: _routes.ROUTES.getCategoryPage('all')
  }, {
    label: "Pricing",
    href: _routes.ROUTES.pricing
  }, {
    label: "For Professionals",
    href: _routes.ROUTES.forBusiness
  }, {
    label: "Blogs",
    href: _routes.ROUTES.blogs
  }, {
    label: "Contact Us",
    href: _routes.ROUTES.contact
  }];
  return /*#__PURE__*/_react.default.createElement("header", {
    className: "new-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header-desktop"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logo-div"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.home
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  }))), /*#__PURE__*/_react.default.createElement("h4", null, "Beauty hub")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-div"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "menu"
  }, menuItems.map(item => /*#__PURE__*/_react.default.createElement("li", {
    key: item.label,
    className: "menu-item"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: item.href
  }, item.label))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "accounts-div"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "sign-in"
  }, "Sign In")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.forBusiness
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "join-prof"
  }, "Join as Professional")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "mobile-toggle"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "hamburger-btn",
    onClick: () => setMobileMenuOpen(true),
    size: "large"
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, null))))), /*#__PURE__*/_react.default.createElement(_material.Drawer, {
    anchor: "right",
    open: mobileMenuOpen,
    onClose: () => setMobileMenuOpen(false),
    className: "mobile-drawer",
    PaperProps: {
      className: "drawer-paper"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "drawer-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "drawer-header"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.home,
    onClick: () => setMobileMenuOpen(false)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  }))), /*#__PURE__*/_react.default.createElement("h4", null, "Beauty hub"))), /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "close-btn",
    onClick: () => setMobileMenuOpen(false),
    size: "large"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null))), /*#__PURE__*/_react.default.createElement("ul", {
    className: "mobile-menu"
  }, menuItems.map(item => /*#__PURE__*/_react.default.createElement("li", {
    key: item.label,
    className: "mobile-menu-item"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: item.href,
    onClick: () => setMobileMenuOpen(false)
  }, item.label)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "mobile-actions"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup,
    onClick: () => setMobileMenuOpen(false),
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "sign-in-mobile"
  }, "Sign In")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.becomeProvider,
    onClick: () => setMobileMenuOpen(false),
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "join-prof-mobile"
  }, "Join as Professional"))))));
}
var _default = exports.default = Header;