"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnackbar = exports.SnackbarProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // SnackbarProvider.js
const SnackbarContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const useSnackbar = () => (0, _react.useContext)(SnackbarContext);
exports.useSnackbar = useSnackbar;
const SnackbarProvider = _ref => {
  let {
    children
  } = _ref;
  const [snackbar, setSnackbar] = (0, _react.useState)({
    open: false,
    message: "",
    type: "success"
  });
  const showSnackbar = (0, _react.useCallback)(function (message) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    setSnackbar({
      open: true,
      message,
      type
    });
  }, []);
  const handleClose = () => {
    setSnackbar(prev => _objectSpread(_objectSpread({}, prev), {}, {
      open: false
    }));
  };

  // ✅ Skip rendering <Snackbar> on the server
  const isBrowser = typeof window !== "undefined";
  return /*#__PURE__*/_react.default.createElement(SnackbarContext.Provider, {
    value: {
      showSnackbar
    }
  }, children, isBrowser && /*#__PURE__*/_react.default.createElement(_material.Snackbar, {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    open: snackbar.open,
    autoHideDuration: 4000,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    onClose: handleClose,
    severity: snackbar.type,
    variant: "filled",
    sx: {
      width: "100%"
    }
  }, snackbar.message)));
};
exports.SnackbarProvider = SnackbarProvider;