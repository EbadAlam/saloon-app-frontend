"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SingleStore;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _Circle = _interopRequireDefault(require("@mui/icons-material/Circle"));
var _ErrorOutline = _interopRequireDefault(require("@mui/icons-material/ErrorOutline"));
var _AccessTime = _interopRequireDefault(require("@mui/icons-material/AccessTime"));
var _OpenInNew = _interopRequireDefault(require("@mui/icons-material/OpenInNew"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const statusConfig = storeData => {
  if (storeData.is_active_by_admin != 1) return {
    label: 'Disabled by admin',
    icon: /*#__PURE__*/_react.default.createElement(_ErrorOutline.default, {
      sx: {
        fontSize: 12
      }
    }),
    sx: {
      background: '#FCEBEB',
      color: '#A32D2D'
    }
  };
  if (storeData.status !== 'active') return {
    label: 'Pending approval',
    icon: /*#__PURE__*/_react.default.createElement(_AccessTime.default, {
      sx: {
        fontSize: 12
      }
    }),
    sx: {
      background: '#FAEEDA',
      color: '#854F0B'
    }
  };
  return {
    label: 'Active',
    icon: /*#__PURE__*/_react.default.createElement(_Circle.default, {
      sx: {
        fontSize: 9
      }
    }),
    sx: {
      background: '#EAF3DE',
      color: '#3B6D11'
    }
  };
};
const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: 11,
  fontWeight: 500,
  padding: '4px 10px',
  borderRadius: 20,
  whiteSpace: 'nowrap'
};
const actionBtn = {
  fontSize: 12,
  textTransform: 'none',
  border: '0.5px solid #ddd',
  borderRadius: '8px',
  color: '#333',
  background: '#fff',
  '&:hover': {
    background: '#f5f5f5'
  },
  px: 1.5,
  py: 0.75
};
const sectionLabel = {
  fontSize: 11,
  letterSpacing: '0.06em',
  color: '#aaa',
  textTransform: 'uppercase',
  mb: 1
};
function SingleStore() {
  var _storeData$bookings$f, _storeData$bookings, _storeData$services_c, _storeData$services_c2, _storeData$services$l, _storeData$services, _storeData$working_ho, _storeData$working_ho2, _storeData$title, _storeData$about, _storeData$store_lead, _storeData$whatsapp_l, _storeData$services_c3, _storeData$services_c4, _storeData$services$l2, _storeData$services2, _storeData$working_ho3, _storeData$working_ho4, _storeData$workers$le, _storeData$workers, _storeData$bookings$l, _storeData$bookings2, _storeData$reviews$le, _storeData$reviews;
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [storeData, setStoreData] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    _axiosClient.default.get("/getStoreDetails/".concat(storeId)).then(_ref => {
      let {
        data
      } = _ref;
      setStoreData(data.storeDetails);
      console.log('Store details:', data.storeDetails);
      setLoading(false);
    }).catch(err => console.error('Error fetching store details:', err));
  }, [storeId]);
  const unseenBookings = (_storeData$bookings$f = storeData === null || storeData === void 0 || (_storeData$bookings = storeData.bookings) === null || _storeData$bookings === void 0 ? void 0 : _storeData$bookings.filter(b => b.is_seen === 'false').length) !== null && _storeData$bookings$f !== void 0 ? _storeData$bookings$f : 0;
  const hasCategories = ((_storeData$services_c = storeData === null || storeData === void 0 || (_storeData$services_c2 = storeData.services_categories) === null || _storeData$services_c2 === void 0 ? void 0 : _storeData$services_c2.length) !== null && _storeData$services_c !== void 0 ? _storeData$services_c : 0) > 0;
  const hasServices = ((_storeData$services$l = storeData === null || storeData === void 0 || (_storeData$services = storeData.services) === null || _storeData$services === void 0 ? void 0 : _storeData$services.length) !== null && _storeData$services$l !== void 0 ? _storeData$services$l : 0) > 0;
  const hasHours = ((_storeData$working_ho = storeData === null || storeData === void 0 || (_storeData$working_ho2 = storeData.working_hours) === null || _storeData$working_ho2 === void 0 ? void 0 : _storeData$working_ho2.length) !== null && _storeData$working_ho !== void 0 ? _storeData$working_ho : 0) > 0;
  const status = storeData ? statusConfig(storeData) : null;
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    mb: 3.5
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: () => navigate(-1),
    startIcon: /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
      sx: {
        fontSize: 14
      }
    }),
    sx: _objectSpread(_objectSpread({}, actionBtn), {}, {
      fontSize: 13
    })
  }, "Back"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 13,
    color: "#aaa"
  }, "Stores \u203A ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#555'
    }
  }, (_storeData$title = storeData === null || storeData === void 0 ? void 0 : storeData.title) !== null && _storeData$title !== void 0 ? _storeData$title : '...'))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      border: '0.5px solid #e0e0e0',
      borderRadius: 4,
      overflow: 'hidden',
      background: '#fff',
      maxWidth: "50%"
    }
  }, loading ? /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "100%",
    height: 240
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    position: "relative"
  }, storeData.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(storeData.thumbnail),
    alt: storeData.title,
    style: {
      width: '100%',
      height: 240,
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: '100%',
      height: 240,
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13
    }
  }, "No thumbnail"), storeData.is_active_by_admin != 1 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 14,
      fontWeight: 500
    }
  }, "This store is disabled by admin")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: {
      xs: 2.5,
      md: 3.5
    }
  }, loading ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    width: "50%",
    height: 30
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    width: "25%",
    height: 20
  })) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 1.5,
    mb: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 21,
    fontWeight: 500,
    color: "#111"
  }, storeData.title), /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "span",
    sx: _objectSpread(_objectSpread({}, pill), status.sx)
  }, status.icon, " ", status.label)), !loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, storeData.address && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 13,
    color: "#888",
    mb: 0.75
  }, storeData.address), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.7,
    mb: 2.5
  }, (_storeData$about = storeData.about) !== null && _storeData$about !== void 0 ? _storeData$about : 'No details about this store.')), !loading && /*#__PURE__*/_react.default.createElement(_material.Stack, {
    gap: 1,
    mb: 2.5
  }, !hasCategories && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error",
    sx: {
      fontSize: 12,
      py: 0.5
    }
  }, "No service categories yet.", ' ', /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id)
  }, "Add now")), !hasServices && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error",
    sx: {
      fontSize: 12,
      py: 0.5
    }
  }, !hasCategories ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "No services yet. ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id)
  }, "Add categories first")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddServices(storeData.id),
    state: {
      servicesCategories: storeData.services_categories
    }
  }, "Add services"), " \u2014 your store has none yet.")), !hasHours && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error",
    sx: {
      fontSize: 12,
      py: 0.5
    }
  }, "No working hours set.", ' ', /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddWorkingHours(storeData.id)
  }, "Add now"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      height: '0.5px',
      background: '#efefef',
      mb: 2.5
    }
  }), loading ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1.5,
    mb: 2.5
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    height: 72,
    sx: {
      borderRadius: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    height: 72,
    sx: {
      borderRadius: 2
    }
  })) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1.5,
    mb: 2.5
  }, [{
    label: 'Store leads',
    val: (_storeData$store_lead = storeData.store_leads_count) !== null && _storeData$store_lead !== void 0 ? _storeData$store_lead : 0,
    sub: 'total submissions'
  }, {
    label: 'WhatsApp leads',
    val: (_storeData$whatsapp_l = storeData.whatsapp_leads_count) !== null && _storeData$whatsapp_l !== void 0 ? _storeData$whatsapp_l : 0,
    sub: 'click-throughs'
  }].map(s => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: s.label,
    sx: {
      background: '#f8f8f8',
      borderRadius: 2,
      p: '12px 14px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 11,
    color: "#999",
    mb: 0.5
  }, s.label), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 19,
    fontWeight: 500,
    color: "#111"
  }, s.val), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    fontSize: 11,
    color: "#bbb",
    mt: 0.25
  }, s.sub)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      height: '0.5px',
      background: '#efefef',
      mb: 2.5
    }
  }), !loading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: sectionLabel
  }, "Quick actions"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    flexWrap: "wrap",
    gap: 1,
    mb: 3
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreFrontPage(storeData.slug),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: _objectSpread(_objectSpread({}, actionBtn), {}, {
      background: '#1a1a1a',
      color: '#fff',
      borderColor: '#1a1a1a',
      '&:hover': {
        background: '#333'
      }
    }),
    endIcon: /*#__PURE__*/_react.default.createElement(_OpenInNew.default, {
      sx: {
        fontSize: 13
      }
    })
  }, "View store")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminEditStore(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn,
    startIcon: /*#__PURE__*/_react.default.createElement(_Edit.default, {
      sx: {
        fontSize: 13
      }
    })
  }, "Edit store"))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: sectionLabel
  }, "Manage"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    flexWrap: "wrap",
    gap: 1
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Service categories (", (_storeData$services_c3 = (_storeData$services_c4 = storeData.services_categories) === null || _storeData$services_c4 === void 0 ? void 0 : _storeData$services_c4.length) !== null && _storeData$services_c3 !== void 0 ? _storeData$services_c3 : 0, ")")), hasCategories && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddServices(storeData.id),
    state: {
      servicesCategories: storeData.services_categories
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Services (", (_storeData$services$l2 = (_storeData$services2 = storeData.services) === null || _storeData$services2 === void 0 ? void 0 : _storeData$services2.length) !== null && _storeData$services$l2 !== void 0 ? _storeData$services$l2 : 0, ")")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddWorkingHours(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Working hours (", (_storeData$working_ho3 = (_storeData$working_ho4 = storeData.working_hours) === null || _storeData$working_ho4 === void 0 ? void 0 : _storeData$working_ho4.length) !== null && _storeData$working_ho3 !== void 0 ? _storeData$working_ho3 : 0, ")")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddTeamMembers(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Team members (", (_storeData$workers$le = (_storeData$workers = storeData.workers) === null || _storeData$workers === void 0 ? void 0 : _storeData$workers.length) !== null && _storeData$workers$le !== void 0 ? _storeData$workers$le : 0, ")")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminBookings(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Badge, {
    badgeContent: unseenBookings,
    color: "primary"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Bookings (", (_storeData$bookings$l = (_storeData$bookings2 = storeData.bookings) === null || _storeData$bookings2 === void 0 ? void 0 : _storeData$bookings2.length) !== null && _storeData$bookings$l !== void 0 ? _storeData$bookings$l : 0, ")"))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminReviews(storeData.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: actionBtn
  }, "Reviews (", (_storeData$reviews$le = (_storeData$reviews = storeData.reviews) === null || _storeData$reviews === void 0 ? void 0 : _storeData$reviews.length) !== null && _storeData$reviews$le !== void 0 ? _storeData$reviews$le : 0, ")"))))))));
}