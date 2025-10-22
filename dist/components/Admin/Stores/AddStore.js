"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _AuthContext = require("../../../contexts/AuthContext");
var _reactRouterDom = require("react-router-dom");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _LocationPicker = _interopRequireDefault(require("../../LocationPicker/LocationPicker"));
var _routes = require("../../../routes");
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function AddStore() {
  var _form$lat, _form$lng;
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [form, setForm] = (0, _react.useState)({
    title: "",
    address: "",
    about: "",
    type: '',
    lat: "",
    lng: ""
  });
  const [thumbnail, setThumbnail] = (0, _react.useState)(null);
  const [location, setLocation] = (0, _react.useState)(null);
  const [success, setSuccess] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const handleChange = e => {
    setForm(_objectSpread(_objectSpread({}, form), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const handleLocationChange = pos => {
    setLocation({
      lat: pos.lat,
      lng: pos.lng
    });
    setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
      address: pos.address || ''
    }));
  };
  const handleThumbnailChange = e => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("address", form.address);
    formData.append("about", form.about);
    formData.append("user_id", user.id);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);
    formData.append("type", form.type);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    try {
      const {
        data
      } = await _axiosClient.default.post("/addStores", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate(_routes.ROUTES.adminStores, {
        state: {
          success: data.message || "Store created successfully."
        }
      });
    } catch (err) {
      var _err$response;
      const msg = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Failed to create store.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (success) {
      showSnackbar(success, "success");
    }
  }, [success]);
  (0, _react.useEffect)(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    gutterBottom: true
  }, "Add Store"), /*#__PURE__*/_react.default.createElement(_material.Paper, {
    sx: {
      p: 3,
      maxWidth: 600
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleSubmit
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Title",
    name: "title",
    value: form.title,
    onChange: handleChange,
    margin: "normal",
    required: true,
    disabled: loading
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    select: true,
    label: "Type",
    name: "type",
    value: form.type,
    onChange: handleChange,
    margin: "normal",
    required: true,
    disabled: loading
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "Select a type"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "Hair Saloon"
  }, "Hair Saloon"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "Massage"
  }, "Massage"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "Face Facial"
  }, "Face Facial"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "Barber"
  }, "Barber"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "Beauty Saloon"
  }, "Beauty Saloon")), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "About",
    name: "about",
    value: form.about,
    onChange: handleChange,
    margin: "normal",
    multiline: true,
    rows: 4,
    disabled: loading
  }), typeof window !== "undefined" ? /*#__PURE__*/_react.default.createElement(_LocationPicker.default
  // onChange={(val) => setForm({ ...form, ...val })}
  , {
    initialPosition: {
      lat: (_form$lat = form.lat) !== null && _form$lat !== void 0 ? _form$lat : 24.8607,
      lng: (_form$lng = form.lng) !== null && _form$lng !== void 0 ? _form$lng : 67.0011
    },
    onChange: pos => {
      setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
        lat: pos.lat,
        lng: pos.lng,
        address: pos.address
      }));
    }
  }) : /*#__PURE__*/_react.default.createElement("div", null, "Loading..."), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      mt: 2,
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label"
  }, "Upload Thumbnail", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: handleThumbnailChange
  }))), thumbnail && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      mt: 1
    }
  }, "Selected: ", thumbnail.name), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    type: "submit",
    sx: {
      mt: 3
    },
    disabled: loading
  }, "Save Store")))));
}
var _default = exports.default = AddStore;