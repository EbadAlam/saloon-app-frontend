"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Person = _interopRequireDefault(require("@mui/icons-material/Person"));
var _Group = _interopRequireDefault(require("@mui/icons-material/Group"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _LocationPicker = _interopRequireDefault(require("../../components/LocationPicker/LocationPicker"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _Done = _interopRequireDefault(require("@mui/icons-material/Done"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function SetupStore() {
  var _location$state, _form$lat, _form$lng;
  const location = (0, _reactRouterDom.useLocation)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const userId = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.userId;
  (0, _react.useEffect)(() => {
    if (!userId) {
      navigate(_routes.ROUTES.loginSignup);
    }
  }, [userId, navigate]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [step, setStep] = (0, _react.useState)(1);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [showPopup, setShowPopup] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)("");
  const [form, setForm] = (0, _react.useState)({
    title: "",
    type: '',
    account_type: '',
    team_size: '',
    store_type: '',
    address: "",
    lat: "",
    lng: "",
    user_id: userId
  });
  const handleChange = e => {
    setForm(_objectSpread(_objectSpread({}, form), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const validateStep = () => {
    switch (step) {
      case 1:
        return form.title.trim() !== "";
      case 2:
        return form.type.trim() !== "";
      case 3:
        return form.account_type.trim() !== "";
      case 4:
        if (form.account_type === "team") {
          return form.team_size.trim() !== "";
        }
        if (form.account_type === "independent") {
          return form.team_size.trim() !== "";
        }
        return true;
      case 5:
        return form.store_type.trim() !== "";
      case 6:
        return form.address.trim() !== "";
      default:
        return true;
    }
  };
  (0, _react.useEffect)(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);
  const handleContinue = () => {
    setError("");
    if (step === 5 && form.store_type !== 'physical_location' || step === 6) {
      handleFormSubmit();
    } else {
      if (!validateStep()) {
        setError("Please fill in all required fields before continuing.");
        return;
      }
      setError("");
      if (step === 3 && form.account_type === "independent") {
        setStep(5);
        return;
      }
      setStep(step + 1);
    }
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        address: form.address,
        lat: form.lat,
        lng: form.lng,
        user_id: form.user_id,
        type: form.type,
        account_type: form.account_type,
        store_type: form.store_type,
        team_size: form.team_size
      };
      const {
        data
      } = await _axiosClient.default.post("/addStores", payload);
      if (data.success) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('error adding store: ', error);
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "setup_page"
  }, showPopup && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "success_popup"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Done.default, null)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Your business is set up"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.adminDashboard
  }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Done"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "continue_btn"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    className: "back_button",
    onClick: () => setStep(step > 1 ? form.account_type === "independent" && step === 5 ? step - 2 : step - 1 : step)
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, null)), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleContinue,
    disabled: loading
  }, "Continue", loading && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: "20px",
    color: "white",
    sx: {
      marginLeft: '10px'
    }
  }))), step === 1 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "What's your business name?"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "This is the brand name your clients will see"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "business_name"
  }, "Business Name"), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "business_name",
    name: "title",
    value: form.title,
    onChange: handleChange
  }))) : step === 2 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Select your business type"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Choose your service type"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "business_type"
  }, "Business Type"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    sx: {
      width: '100%'
    },
    name: "type",
    id: "business_type",
    onChange: handleChange,
    value: form.type,
    displayEmpty: true
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "",
    disabled: true
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
  }, "Beauty Saloon")))) : step === 3 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Select account type"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "This will help us set up your account correctly"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "fields"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.account_type == 'independent' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "account_type1"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Person.default, null)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "I'm an independent")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "account_type1",
    name: "account_type",
    value: "independent",
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.account_type == 'team' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "account_type2"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Group.default, null)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "I have team")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "account_type2",
    name: "account_type",
    value: "team",
    onChange: handleChange
  })))) : step === 4 && form.account_type === 'team' ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "What's your team size"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.team_size == '2-5 people' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "team_size1"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "2-5 people")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "team_size1",
    name: "team_size",
    value: "2-5 people",
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.team_size == '6-10 people' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "team_size2"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "6-10 people")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "team_size2",
    name: "team_size",
    value: "6-10 people",
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.team_size == '11+ people' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "team_size3"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "11+ people")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "team_size3",
    name: "team_size",
    value: "11+ people",
    onChange: handleChange
  }))) : step === 5 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Where do you provide your services?"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.store_type == 'physical_location' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "store_type1"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "Clients come to me at a physical location")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "store_type1",
    name: "store_type",
    value: "physical_location",
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.store_type == 'mobile_operator' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "store_type2"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "I visit my client as a mobile operator")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "store_type2",
    name: "store_type",
    value: "mobile_operator",
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "field radio ".concat(form.store_type == 'online_service' ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "store_type3"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2"
  }, "I provide virtual services online")), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    id: "store_type3",
    name: "store_type",
    value: "online_service",
    onChange: handleChange
  }))) : step === 6 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Account Setup"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Set your venue's physical location"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Add your primary business location so your clients can easily find you"), /*#__PURE__*/_react.default.createElement(_material.Box, null, typeof window !== "undefined" ? /*#__PURE__*/_react.default.createElement(_LocationPicker.default, {
    initialPosition: {
      lat: (_form$lat = form.lat) !== null && _form$lat !== void 0 ? _form$lat : 48.8584,
      lng: (_form$lng = form.lng) !== null && _form$lng !== void 0 ? _form$lng : 2.2945
    },
    onChange: pos => {
      setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
        lat: pos.lat,
        lng: pos.lng,
        address: pos.address
      }));
    }
  }) : /*#__PURE__*/_react.default.createElement("div", null, "Loading..."))) : ''));
}
var _default = exports.default = SetupStore;