"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ActiveDeactiveSwitch(_ref) {
  let {
    id,
    apiUrl,
    status,
    onStatusChange,
    label = 'Update',
    modal = ''
  } = _ref;
  const handleToggle = async () => {
    try {
      let newStatus = '';
      if (modal == 'blog') {
        newStatus = status === 'published' ? 'draft' : 'published';
      } else {
        newStatus = status === 'active' ? 'inactive' : 'active';
      }
      const {
        data
      } = await _axiosClient.default.put("".concat(apiUrl, "/").concat(id), {
        status: newStatus
      });
      if (onStatusChange) {
        onStatusChange(data);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    sx: {
      display: 'block'
    },
    control: /*#__PURE__*/_react.default.createElement(_material.Switch, {
      onChange: handleToggle,
      checked: modal == 'blog' ? status === 'published' : status === 'active',
      name: "loading",
      color: "primary"
    }),
    label: label
  });
}
var _default = exports.default = ActiveDeactiveSwitch;