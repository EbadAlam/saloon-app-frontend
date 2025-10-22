"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function VerifyEmail() {
  const {
    id,
    token
  } = (0, _reactRouterDom.useParams)();
  const [status, setStatus] = (0, _react.useState)('loading');
  const [message, setMessage] = (0, _react.useState)('');
  const hasCalledRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;
    const verify = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get("/verify-email/".concat(id, "/").concat(token));
        setStatus('success');
        setMessage(data.message || 'Email verified successfully.');
      } catch (err) {
        var _err$response;
        setStatus('error');
        const msg = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || 'Verification failed.';
        setMessage(msg);
      }
    };
    verify();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      maxWidth: 600,
      m: 'auto',
      mt: 8,
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    gutterBottom: true
  }, "Email Verification"), status === 'loading' && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null), status === 'success' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "success"
  }, message), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.home,
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    size: "small"
  }, "Home"))), status === 'error' && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, message));
}
var _default = exports.default = VerifyEmail;