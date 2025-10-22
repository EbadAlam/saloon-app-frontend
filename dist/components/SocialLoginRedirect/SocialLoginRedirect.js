"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("../../contexts/AuthContext");
var _reactRouterDom = require("react-router-dom");
var _RoleRedirector = _interopRequireDefault(require("../RoleRedirector/RoleRedirector"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function SocialLoginRedirect() {
  const {
    login
  } = (0, _AuthContext.useAuth)();
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [userData, setUserData] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const parsedUser = JSON.parse(user);
    if (token && parsedUser) {
      login(parsedUser, token);
      setUserData(parsedUser);
    } else {
      navigate(_routes.ROUTES.loginSignup);
    }
  }, [searchParams, navigate, login]);
  if (userData) {
    return /*#__PURE__*/_react.default.createElement(_RoleRedirector.default, {
      user: userData
    });
  }
  return /*#__PURE__*/_react.default.createElement("p", null, "Processing login...");
}
var _default = exports.default = SocialLoginRedirect;