"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axiosClient = _interopRequireDefault(require("./axios-client"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AppWrapper(_ref) {
  let {
    children
  } = _ref;
  const [serverUp, setServerUp] = (0, _react.useState)(false);
  const [checking, setChecking] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const checkServer = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get('/health', {
          timeout: 5000
        });
        if ((data === null || data === void 0 ? void 0 : data.status) === "ok") {
          setServerUp(true);
        } else {
          setServerUp(false);
        }
      } catch (error) {
        console.error('Error in server: ', error);
        setServerUp(false);
      } finally {
        setChecking(false);
      }
    };
    checkServer();
  }, []);
  if (checking) {
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      sx: {
        height: '100vh'
      }
    }, /*#__PURE__*/_react.default.createElement("h1", null, "\uD83D\uDD04 Checking server status..."), /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null));
  }
  if (!serverUp) {
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      sx: {
        height: '100vh'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        border: '5px solid red',
        width: 'fit-content',
        padding: '5px 10px',
        rotate: '5deg'
      }
    }, /*#__PURE__*/_react.default.createElement("h1", {
      style: {
        color: 'red',
        margin: 0
      }
    }, "\uD83D\uDEA8 Server Down")), /*#__PURE__*/_react.default.createElement("p", null, "Please try again later."));
  }
  return children;
}
var _default = exports.default = AppWrapper;