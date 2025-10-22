"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Bookings"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Reviews Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Store name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Username"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Service name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Service Category"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "ETA"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Date"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Time"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Worker"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"))), bookings && bookings.length > 0 ? bookings.map((booking, index) => {
    var _booking$store, _booking$store2, _booking$user, _booking$user2, _booking$service, _booking$service2, _booking$service3, _booking$service4, _booking$service5, _booking$worker, _booking$worker2, _booking$worker3;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: index + 1
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_booking$store = booking.store) === null || _booking$store === void 0 ? void 0 : _booking$store.slug),
      target: "_blank",
      rel: "noopener noreferrer"
    }, (_booking$store2 = booking.store) === null || _booking$store2 === void 0 ? void 0 : _booking$store2.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_booking$user = booking.user) === null || _booking$user === void 0 ? void 0 : _booking$user.id
      }
    }, (_booking$user2 = booking.user) === null || _booking$user2 === void 0 ? void 0 : _booking$user2.username)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServices,
      state: {
        highlightId: (_booking$service = booking.service) === null || _booking$service === void 0 ? void 0 : _booking$service.id
      }
    }, (_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServicesCategories,
      state: {
        highlightId: (_booking$service3 = booking.service) === null || _booking$service3 === void 0 || (_booking$service3 = _booking$service3.category) === null || _booking$service3 === void 0 ? void 0 : _booking$service3.id
      }
    }, (_booking$service4 = booking.service) === null || _booking$service4 === void 0 || (_booking$service4 = _booking$service4.category) === null || _booking$service4 === void 0 ? void 0 : _booking$service4.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_booking$service5 = booking.service) === null || _booking$service5 === void 0 ? void 0 : _booking$service5.eta), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, booking.booking_date), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, booking.booking_time), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_booking$worker = booking.worker) !== null && _booking$worker !== void 0 && _booking$worker.username ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_booking$worker2 = booking.worker) === null || _booking$worker2 === void 0 ? void 0 : _booking$worker2.id
      }
    }, (_booking$worker3 = booking.worker) === null || _booking$worker3 === void 0 ? void 0 : _booking$worker3.username) : '-'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      sx: {
        color: booking.status === 'pending' ? 'chocolate' : booking.status == 'completed' ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, booking.status)));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Bookings")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      marginTop: '10px'
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