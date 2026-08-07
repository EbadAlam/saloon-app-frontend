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
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _ActiveDeactiveSwitchMaster = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster"));
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _routes = require("../../../../routes");
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
    minWidth: '1200px'
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
  thumbnail: {
    width: '80px',
    height: '54px',
    objectFit: 'cover',
    borderRadius: '8px'
  }
};
function MasterStoresPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [stores, setStores] = (0, _react.useState)([]);
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchStores();
  }, []);
  const fetchStores = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllStores?page=".concat(page));
      setStores(data.stores.data);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total
      });
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchStores(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchStores();
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
  }, "Stores"), /*#__PURE__*/_react.default.createElement("div", {
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
  }, "Owner Name"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Thumbnail"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Type"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Categories"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Services"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Workers"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Change Approve Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Change Active Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, stores && stores.length > 0 ? stores.map((store, index) => {
    var _store$user, _store$user2, _store$services_categ, _store$services_categ2, _store$services$lengt, _store$services, _store$workers$length, _store$workers;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: store.id,
      style: {
        background: index % 2 === 0 ? '#fff' : '#fafaf8'
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, index + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        fontWeight: 500
      })
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(store === null || store === void 0 ? void 0 : store.slug),
      target: "_blank",
      rel: "noopener noreferrer",
      style: S.linkText
    }, store === null || store === void 0 ? void 0 : store.title)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_store$user = store.user) === null || _store$user === void 0 ? void 0 : _store$user.id
      },
      style: S.linkText
    }, (_store$user2 = store.user) === null || _store$user2 === void 0 ? void 0 : _store$user2.username)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, store.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
      style: S.thumbnail,
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(store.thumbnail),
      alt: ""
    }) : '-'), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, store.type), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_store$services_categ = (_store$services_categ2 = store.services_categories) === null || _store$services_categ2 === void 0 ? void 0 : _store$services_categ2.length) !== null && _store$services_categ !== void 0 ? _store$services_categ : 0), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_store$services$lengt = (_store$services = store.services) === null || _store$services === void 0 ? void 0 : _store$services.length) !== null && _store$services$lengt !== void 0 ? _store$services$lengt : 0), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_store$workers$length = (_store$workers = store.workers) === null || _store$workers === void 0 ? void 0 : _store$workers.length) !== null && _store$workers$length !== void 0 ? _store$workers$length : 0), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: _objectSpread(_objectSpread({}, S.statusText), {}, {
        color: store.status === 'active' && store.is_active_by_admin == 1 ? '#27500a' : '#791f1f'
      })
    }, store.status === 'active' ? store.is_active_by_admin == 1 ? 'active' : store.is_active_by_admin != 1 ? 'Disabled by admin' : "" : 'Waiting for approval')), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
      id: store.id,
      apiUrl: "/updateStatusApproveMaster",
      status: store.status,
      label: store.status == 'active' ? 'Approved' : 'Approve',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitchMaster.default, {
      id: store.id,
      apiUrl: "/updateStatusMaster",
      status: store.is_active_by_admin,
      model: 'Store',
      label: store.is_active_by_admin == '1' ? 'Active' : 'Disabled',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: store.id,
      url: "/deleteStore",
      onStatusChange: handleStatusChange
    })));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 12,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No Stores"))))), /*#__PURE__*/_react.default.createElement("div", {
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
var _default = exports.default = MasterStoresPage;