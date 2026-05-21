"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnackbar = exports.SnackbarProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _sonner = require("sonner");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// // SnackbarProvider.js
// import React, { createContext, useContext, useState, useCallback } from "react";
// import { Snackbar, Alert } from "@mui/material";

// const SnackbarContext = createContext(undefined);

// export const useSnackbar = () => useContext(SnackbarContext);

// export const SnackbarProvider = ({ children }) => {
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     type: "success",
//   });

//   const showSnackbar = useCallback((message, type = "success") => {
//     setSnackbar({ open: true, message, type });
//   }, []);

//   const handleClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   // ✅ Skip rendering <Snackbar> on the server
//   const isBrowser = typeof window !== "undefined";

//   return (
//     <SnackbarContext.Provider value={{ showSnackbar }}>
//       {children}
//       {isBrowser && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleClose}
//         >
//           <Alert
//             onClose={handleClose}
//             severity={snackbar.type}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       )}
//     </SnackbarContext.Provider>
//   );
// };

// SnackbarProvider.js

const SnackbarContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const useSnackbar = () => (0, _react.useContext)(SnackbarContext);
exports.useSnackbar = useSnackbar;
const SnackbarProvider = _ref => {
  let {
    children
  } = _ref;
  const showSnackbar = (0, _react.useCallback)(function (message) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    switch (type) {
      case "success":
        _sonner.toast.success(message);
        break;
      case "error":
        _sonner.toast.error(message);
        break;
      case "warning":
        _sonner.toast.warning(message);
        break;
      case "info":
        _sonner.toast.info(message);
        break;
      default:
        (0, _sonner.toast)(message);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(SnackbarContext.Provider, {
    value: {
      showSnackbar
    }
  }, children, /*#__PURE__*/_react.default.createElement(_sonner.Toaster, {
    position: "top-right",
    richColors: true,
    closeButton: true,
    duration: 4000
  }));
};
exports.SnackbarProvider = SnackbarProvider;