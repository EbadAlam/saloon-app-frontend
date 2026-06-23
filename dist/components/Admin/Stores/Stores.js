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
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _OpenInNew = _interopRequireDefault(require("@mui/icons-material/OpenInNew"));
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
  const navigate = (0, _reactRouterDom.useNavigate)();
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
  (0, _react.useEffect)(() => {
    if (stores && stores.length === 1) {
      navigate(_routes.ROUTES.getAdminSingleStore(stores[0].id));
    }
  }, [stores]);
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
  }, "Add Store")), stores && stores.length > 1 ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "16px",
      paddingTop: "8px"
    }
  }, stores.map(singleStore => /*#__PURE__*/_react.default.createElement("div", {
    key: singleStore.id,
    style: {
      background: "#fff",
      border: "0.5px solid #e0e0e0",
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, singleStore.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(singleStore.thumbnail),
    alt: "Thumbnail",
    style: {
      width: "100%",
      height: 140,
      objectFit: "cover",
      display: "block"
    }
  }) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100%",
      height: 140,
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#aaa",
      fontSize: 13
    }
  }, "No Thumbnail"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "14px 16px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 500,
      fontSize: 15,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, singleStore.title), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      fontSize: 12,
      color: "#666"
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, singleStore.store_leads_count, " store leads"), /*#__PURE__*/_react.default.createElement("span", null, singleStore.whatsapp_leads_count, " WhatsApp leads")), singleStore.is_active_by_admin != 1 ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 8px",
      borderRadius: 6,
      background: "#FCEBEB",
      color: "#A32D2D"
    }
  }, /*#__PURE__*/_react.default.createElement(_Error.default, {
    sx: {
      fontSize: 13
    }
  }), " Deactivated by admin") : singleStore.status != "active" ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 8px",
      borderRadius: 6,
      background: "#FAEEDA",
      color: "#854F0B"
    }
  }, /*#__PURE__*/_react.default.createElement(_AccessTime.default, {
    sx: {
      fontSize: 13
    }
  }), " Pending approval") : /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 8px",
      borderRadius: 6,
      background: "#EAF3DE",
      color: "#3B6D11"
    }
  }, /*#__PURE__*/_react.default.createElement(_Circle.default, {
    sx: {
      fontSize: 10
    }
  }), " Active")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px 16px",
      borderTop: "0.5px solid #e0e0e0"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(singleStore.id),
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    fullWidth: true,
    sx: {
      background: "#333333"
    }
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, {
    sx: {
      fontSize: "20px",
      marginRight: "5px"
    }
  }), "Edit")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreFrontPage(singleStore.slug),
    style: {
      textDecoration: "none"
    },
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    fullWidth: true,
    sx: {
      border: "1px solid #333333",
      background: "transparent",
      marginTop: "10px",
      color: "#000"
    }
  }, /*#__PURE__*/_react.default.createElement(_OpenInNew.default, {
    sx: {
      fontSize: "20px",
      marginRight: "5px"
    }
  }), "Preview")))))) : !stores || stores.length === 0 ? /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: 16
    }
  }, "No stores yet.", " ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: _routes.ROUTES.adminStoresAdd,
    style: {
      textDecoration: "underline",
      color: "inherit"
    }
  }, "Add now")) : null /* single store = redirected via useEffect */));
}
var _default = exports.default = Stores;