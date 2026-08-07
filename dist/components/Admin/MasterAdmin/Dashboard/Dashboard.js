"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _routes = require("../../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: '24px',
    background: '#f5f4f0',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '28px'
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: 0
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: '6px 0 0'
  },
  subtitle: {
    fontSize: '13px',
    color: '#888',
    margin: '6px 0 0'
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: '0 0 12px'
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px',
    marginBottom: '32px'
  },
  statCard: {
    background: '#fff',
    borderRadius: '12px',
    border: '0.5px solid #e0dfd8',
    padding: '18px 20px'
  },
  statLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#888',
    margin: 0
  },
  statValue: {
    fontSize: '26px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: '8px 0 0'
  },
  statNote: {
    fontSize: '11px',
    margin: '4px 0 0'
  },
  navGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '14px'
  },
  navCard: {
    display: 'block',
    background: '#fff',
    borderRadius: '12px',
    border: '0.5px solid #e0dfd8',
    padding: '18px 20px',
    textDecoration: 'none',
    transition: 'border-color 0.15s ease'
  },
  navIconWrap: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#f0efe8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginBottom: '12px'
  },
  navTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0
  },
  navDesc: {
    fontSize: '12px',
    color: '#888',
    margin: '4px 0 0'
  },
  errorBanner: {
    background: '#fdf2f2',
    border: '0.5px solid #f0d5d5',
    borderRadius: '12px',
    padding: '14px 18px',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  errorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#c0392b',
    flexShrink: 0
  },
  errorText: {
    fontSize: '13px',
    color: '#8a2c22',
    margin: 0
  }
};

// Labels mapped to the keys returned by GET /getDashboardStats -> { stats: { users, stores, ... } }
const STAT_LABELS = [{
  key: 'users',
  label: 'Total Users'
}, {
  key: 'stores',
  label: 'Total Stores'
}, {
  key: 'services',
  label: 'Total Services'
}, {
  key: 'bundles',
  label: 'Total Bundles'
}, {
  key: 'bookings',
  label: 'Total Bookings'
}, {
  key: 'reviews',
  label: 'Total Reviews'
}, {
  key: 'blogs',
  label: 'Total Blogs'
}, {
  key: 'inqueries',
  label: 'Total Inqueries'
}];
const navItems = [{
  icon: '👤',
  title: 'Users',
  desc: 'Manage owners, workers & customers',
  to: _routes.ROUTES.masterAdminUsers
}, {
  icon: '🏬',
  title: 'Stores',
  desc: 'Approve and manage vendor stores',
  to: _routes.ROUTES.masterAdminStores
}, {
  icon: '🧾',
  title: 'Services',
  desc: 'All vendor services across the platform',
  to: _routes.ROUTES.masterAdminServices
}, {
  icon: '🗂️',
  title: 'Categories',
  desc: 'Service category management',
  to: _routes.ROUTES.masterAdminServicesCategories
}, {
  icon: '📦',
  title: 'Bundles',
  desc: 'Grouped-service bundles by vendor',
  to: _routes.ROUTES.masterAdminBundles
}, {
  icon: '📅',
  title: 'Bookings',
  desc: 'All bookings across every store',
  to: _routes.ROUTES.masterAdminBookings
}, {
  icon: '⭐',
  title: 'Reviews',
  desc: 'Moderate customer reviews',
  to: _routes.ROUTES.masterAdminReviews
}, {
  icon: '📝',
  title: 'Blogs',
  desc: 'Publish and manage blog posts',
  to: _routes.ROUTES.masterAdminBlogs
}, {
  icon: '✉️',
  title: 'Inqueries',
  desc: 'Support and contact inqueries',
  to: _routes.ROUTES.masterAdminInqueries
}];
function MasterDashboard() {
  const [statValues, setStatValues] = (0, _react.useState)(null);
  const [loadingStats, setLoadingStats] = (0, _react.useState)(true);
  const [fetchError, setFetchError] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    let cancelled = false;
    const fetchStats = async () => {
      setLoadingStats(true);
      setFetchError(false);
      try {
        const {
          data
        } = await _axiosClient.default.get('/getDashboardStatsMasterAdmin');
        if (!cancelled) {
          var _data$stats;
          setStatValues((_data$stats = data.stats) !== null && _data$stats !== void 0 ? _data$stats : {});
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        if (!cancelled) {
          setFetchError(true);
        }
      } finally {
        if (!cancelled) {
          setLoadingStats(false);
        }
      }
    };
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: S.eyebrow
  }, "Master Admin"), /*#__PURE__*/_react.default.createElement("h1", {
    style: S.title
  }, "Dashboard"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.subtitle
  }, "Platform-wide overview and quick access to every section.")), fetchError && /*#__PURE__*/_react.default.createElement("div", {
    style: S.errorBanner
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.errorDot
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: S.errorText
  }, "Couldn't load dashboard stats right now. The numbers below may be out of date.")), /*#__PURE__*/_react.default.createElement("p", {
    style: S.sectionLabel
  }, "Overview"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.statGrid
  }, STAT_LABELS.map(stat => {
    const value = statValues === null || statValues === void 0 ? void 0 : statValues[stat.key];
    const hasValue = typeof value === 'number';
    return /*#__PURE__*/_react.default.createElement("div", {
      key: stat.key,
      style: S.statCard
    }, /*#__PURE__*/_react.default.createElement("p", {
      style: S.statLabel
    }, stat.label), /*#__PURE__*/_react.default.createElement("p", {
      style: S.statValue
    }, loadingStats ? '…' : hasValue ? value.toLocaleString() : '—'), /*#__PURE__*/_react.default.createElement("p", {
      style: _objectSpread(_objectSpread({}, S.statNote), {}, {
        color: !loadingStats && !hasValue ? '#b33' : '#bbb'
      })
    }, loadingStats ? 'Loading…' : hasValue ? 'Live count' : 'Unavailable'));
  })), /*#__PURE__*/_react.default.createElement("p", {
    style: S.sectionLabel
  }, "Manage"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.navGrid
  }, navItems.map(item => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    key: item.title,
    to: item.to,
    style: S.navCard,
    onMouseEnter: e => e.currentTarget.style.borderColor = '#1a1a2e',
    onMouseLeave: e => e.currentTarget.style.borderColor = '#e0dfd8'
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.navIconWrap
  }, item.icon), /*#__PURE__*/_react.default.createElement("p", {
    style: S.navTitle
  }, item.title), /*#__PURE__*/_react.default.createElement("p", {
    style: S.navDesc
  }, item.desc))))));
}
var _default = exports.default = MasterDashboard;