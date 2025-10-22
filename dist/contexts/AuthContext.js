"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuth = exports.AuthProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const AuthContext = /*#__PURE__*/(0, _react.createContext)({});
const AuthProvider = _ref => {
  let {
    children
  } = _ref;
  const [user, setUser] = (0, _react.useState)(null);
  const [token, setToken] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    let savedToken, savedUser;
    savedToken = localStorage.getItem('ACCESS_TOKEN');
    savedUser = localStorage.getItem('AUTH_USER');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('AUTH_USER', JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('AUTH_USER');
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const weekday = date.toLocaleString('en-US', {
      weekday: 'short'
    });
    const month = date.toLocaleString('en-US', {
      month: 'short'
    });
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return "".concat(weekday, ", ").concat(month, " ").concat(day, " ").concat(year, " at ").concat(time);
  };
  const updateFavorites = favourite_stores => {
    let user;
    user = JSON.parse(localStorage.getItem("AUTH_USER"));
    user = _objectSpread(_objectSpread({}, user), {}, {
      favourite_stores: favourite_stores
    });
    localStorage.setItem("AUTH_USER", JSON.stringify(user));
  };
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      user,
      token,
      login,
      logout,
      loading,
      formatDate,
      updateFavorites
    }
  }, children);
};
exports.AuthProvider = AuthProvider;
const useAuth = () => (0, _react.useContext)(AuthContext);
exports.useAuth = useAuth;