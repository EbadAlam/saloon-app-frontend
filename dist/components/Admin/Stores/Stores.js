"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _AuthContext = require("../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _Cards = _interopRequireDefault(require("../Cards/Cards"));
var _Circle = _interopRequireDefault(require("@mui/icons-material/Circle"));
var _AccessTime = _interopRequireDefault(require("@mui/icons-material/AccessTime"));
var _Error = _interopRequireDefault(require("@mui/icons-material/Error"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../routes");
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Stores() {
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [stores, setStores] = (0, _react.useState)([]);
  const location = (0, _reactRouterDom.useLocation)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [success, setSuccess] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    var _location$state;
    if ((_location$state = location.state) !== null && _location$state !== void 0 && _location$state.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);
  (0, _react.useEffect)(() => {
    const payload = {
      user_id: user.id
    };
    const fetchUserDetails = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.post("/getStores", payload);
        // console.log(data.stores);
        setStores(data.stores);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [user]);
  (0, _react.useEffect)(() => {
    if (success) {
      showSnackbar(success, "success");
    }
  }, [success]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    gutterBottom: true
  }, "Stores"), stores && stores.length > 0 && stores.length < user.user_info.allowed && /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    className: "mb-2",
    sx: {
      background: "#333333"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: _routes.ROUTES.adminStoresAdd,
    style: {
      color: "white"
    }
  }, "Add Store")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Stores Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, {
    sx: {
      background: "#d8a7b1"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left",
    sx: {
      color: "white"
    }
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Store Name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Thumbnail"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Store Leads"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Whatsapp Leads"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: "white"
    }
  }, "Edit"))), /*#__PURE__*/_react.default.createElement(_material.TableBody, null, stores && stores.length > 0 ? stores.map((singleStore, index) => /*#__PURE__*/_react.default.createElement(_material.TableRow, {
    key: singleStore.id
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row"
  }, singleStore.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row"
  }, singleStore.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(singleStore.thumbnail),
    alt: "Thumbnail",
    style: {
      width: 200,
      borderRadius: "5px"
    }
  }) : "No Thumbnail"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row"
  }, "2 leads"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row"
  }, "2 leads"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row",
    sx: {
      textTransform: "capitalize",
      fontWeight: "700"
    }
  }, singleStore.is_active_by_admin != 1 ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "red",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Error.default, null), "Store deactive by admin") : singleStore.status != "active" ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#ffbc00",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_AccessTime.default, null), "(Waiting for approval by admin)") : /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "green",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Circle.default, null), singleStore.status)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(singleStore.id),
    style: {
      color: "white"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333"
    },
    variant: "contained"
  }, "Edit"))))) : /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "No Stores.\xA0", /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: _routes.ROUTES.adminStoresAdd,
    style: {
      textDecoration: "underline",
      color: "inherit"
    }
  }, "Add Now")))))));
}
var _default = exports.default = Stores;