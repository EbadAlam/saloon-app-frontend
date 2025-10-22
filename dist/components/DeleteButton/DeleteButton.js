"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function DeleteButton(_ref) {
  let {
    id,
    url,
    onStatusChange
  } = _ref;
  const [open, setOpen] = (0, _react.useState)(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    try {
      const {
        data
      } = await _axiosClient.default.delete("".concat(url, "/").concat(id));
      if (onStatusChange) {
        onStatusChange(data);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      onStatusChange({
        message: 'An error Occured! Try again later',
        success: false
      }, false);
    }
    setOpen(false);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: handleOpen,
    color: "error",
    "aria-label": "delete"
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, null)), /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: open,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Deletion"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, /*#__PURE__*/_react.default.createElement(_material.DialogContentText, null, "Are you sure you want to delete this item? This action cannot be undone.")), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleDelete,
    color: "error",
    autoFocus: true
  }, "Delete"))));
}
var _default = exports.default = DeleteButton;