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
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _routes = require("../../../../routes");
var _ActiveDeactiveSwitchMaster = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster"));
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
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
    minWidth: '1000px'
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
  }
};
function MasterServicesPage() {
  var _location$state$highl, _location$state;
  const [loading, setLoading] = (0, _react.useState)(true);
  const location = (0, _reactRouterDom.useLocation)();
  const [highlightId, setHighlightId] = (0, _react.useState)((_location$state$highl = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.highlightId) !== null && _location$state$highl !== void 0 ? _location$state$highl : '');
  const highlightedRef = (0, _react.useRef)(null);
  const [services, setServices] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchServices();
  }, []);
  const fetchServices = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllServices?page=".concat(page));
      setServices(data.services.data);
      setPagination({
        current_page: data.services.current_page,
        last_page: data.services.last_page,
        total: data.services.total
      });
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchServices(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  (0, _react.useEffect)(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId('');
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, services]);
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchServices();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h5", {
    style: S.title
  }, "Services"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.headerActions
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Title"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Store Name"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Price"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "ETA"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Category"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Gender (If specific)"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Change Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, services && services.length > 0 ? services.map((singleSer, index) => {
    var _singleSer$store, _singleSer$store2, _singleSer$category, _singleSer$category2, _singleSer$gender;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: singleSer.id,
      ref: singleSer.id === highlightId ? highlightedRef : null,
      style: {
        background: index % 2 === 0 ? '#fff' : '#fafaf8'
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, index + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        fontWeight: 500
      })
    }, singleSer.title), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_singleSer$store = singleSer.store) === null || _singleSer$store === void 0 ? void 0 : _singleSer$store.slug),
      target: "_blank",
      rel: "noopener noreferrer",
      style: S.linkText
    }, (_singleSer$store2 = singleSer.store) === null || _singleSer$store2 === void 0 ? void 0 : _singleSer$store2.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, singleSer.currency, " ", singleSer.price), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, singleSer.eta), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServicesCategories,
      state: {
        highlightId: (_singleSer$category = singleSer.category) === null || _singleSer$category === void 0 ? void 0 : _singleSer$category.id
      },
      style: S.linkText
    }, (_singleSer$category2 = singleSer.category) === null || _singleSer$category2 === void 0 ? void 0 : _singleSer$category2.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_singleSer$gender = singleSer.gender) !== null && _singleSer$gender !== void 0 ? _singleSer$gender : '-'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread(_objectSpread({}, S.statusText), {}, {
        color: singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? '#27500a' : '#791f1f'
      })
    }, singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'active' : singleSer.is_active_by_admin != 1 ? 'Disabled by admin' : "")), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitchMaster.default, {
      id: singleSer.id,
      apiUrl: "/updateStatusMaster",
      status: singleSer.is_active_by_admin,
      model: 'Service',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: singleSer.id,
      url: "/deleteServices",
      onStatusChange: handleStatusChange
    })));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 10,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No Services"))))), /*#__PURE__*/_react.default.createElement("div", {
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
var _default = exports.default = MasterServicesPage;