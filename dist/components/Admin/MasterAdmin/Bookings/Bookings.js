"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    border: '0.5px solid #e0dfd8',
    overflow: 'hidden',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    minWidth: '1150px'
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    color: '#888',
    fontWeight: 500,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    borderBottom: '1px solid #f0efe8',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '12px 14px',
    color: '#1a1a2e',
    fontSize: '13px',
    borderBottom: '0.5px solid #f5f4f0',
    verticalAlign: 'middle'
  },
  tdNum: {
    padding: '12px 14px',
    color: '#aaa',
    fontSize: '12px',
    borderBottom: '0.5px solid #f5f4f0'
  },
  linkText: {
    color: '#1a1a2e',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'underline'
  },
  statusText: {
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  typeBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'capitalize'
  }
};
function MasterBookingsPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [bookings, setBookings] = (0, _react.useState)([]);
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllBookings?page=".concat(page));
      setBookings(data.bookings.data);
      setPagination({
        current_page: data.bookings.current_page,
        last_page: data.bookings.last_page,
        total: data.bookings.total
      });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchBookings(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h5", {
    style: S.title
  }, "Bookings"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.headerActions
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Store name"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Username"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Type"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Service / Bundle name"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Service Category"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "ETA"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Date"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Time"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Worker"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"))), /*#__PURE__*/_react.default.createElement("tbody", null, bookings && bookings.length > 0 ? bookings.map((booking, index) => {
    var _booking$store, _booking$store2, _booking$user, _booking$user2, _booking$bundle, _booking$bundle2, _booking$service, _booking$service2, _booking$service3, _booking$service4, _bookedItem$eta, _booking$worker, _booking$worker2, _booking$worker3;
    const isBundle = !!booking.bundle;
    const bookedItem = isBundle ? booking.bundle : booking.service;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: index + 1,
      style: {
        background: index % 2 === 0 ? '#fff' : '#fafaf8'
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, index + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_booking$store = booking.store) === null || _booking$store === void 0 ? void 0 : _booking$store.slug),
      target: "_blank",
      rel: "noopener noreferrer",
      style: S.linkText
    }, (_booking$store2 = booking.store) === null || _booking$store2 === void 0 ? void 0 : _booking$store2.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_booking$user = booking.user) === null || _booking$user === void 0 ? void 0 : _booking$user.id
      },
      style: S.linkText
    }, (_booking$user2 = booking.user) === null || _booking$user2 === void 0 ? void 0 : _booking$user2.username)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread(_objectSpread({}, S.typeBadge), {}, {
        background: isBundle ? '#efe6f7' : '#f0efe8',
        color: isBundle ? '#5b2c8a' : '#555'
      })
    }, isBundle ? 'Bundle' : 'Service')), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, isBundle ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminBundles,
      state: {
        highlightId: (_booking$bundle = booking.bundle) === null || _booking$bundle === void 0 ? void 0 : _booking$bundle.id
      },
      style: S.linkText
    }, (_booking$bundle2 = booking.bundle) === null || _booking$bundle2 === void 0 ? void 0 : _booking$bundle2.title) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServices,
      state: {
        highlightId: (_booking$service = booking.service) === null || _booking$service === void 0 ? void 0 : _booking$service.id
      },
      style: S.linkText
    }, (_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, isBundle ? '-' : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServicesCategories,
      state: {
        highlightId: (_booking$service3 = booking.service) === null || _booking$service3 === void 0 || (_booking$service3 = _booking$service3.category) === null || _booking$service3 === void 0 ? void 0 : _booking$service3.id
      },
      style: S.linkText
    }, (_booking$service4 = booking.service) === null || _booking$service4 === void 0 || (_booking$service4 = _booking$service4.category) === null || _booking$service4 === void 0 ? void 0 : _booking$service4.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_bookedItem$eta = bookedItem === null || bookedItem === void 0 ? void 0 : bookedItem.eta) !== null && _bookedItem$eta !== void 0 ? _bookedItem$eta : '-'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, booking.booking_date), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, booking.booking_time), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_booking$worker = booking.worker) !== null && _booking$worker !== void 0 && _booking$worker.username ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_booking$worker2 = booking.worker) === null || _booking$worker2 === void 0 ? void 0 : _booking$worker2.id
      },
      style: S.linkText
    }, (_booking$worker3 = booking.worker) === null || _booking$worker3 === void 0 ? void 0 : _booking$worker3.username) : '-'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread(_objectSpread({}, S.statusText), {}, {
        color: booking.status === 'pending' ? '#a15c00' : booking.status == 'completed' ? '#27500a' : '#791f1f'
      })
    }, booking.status)));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 11,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No Bookings"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: '16px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Pagination, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))));
}
var _default = exports.default = MasterBookingsPage;