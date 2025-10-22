"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _AuthContext = require("../../../contexts/AuthContext");
var _xCharts = require("@mui/x-charts");
var _material = require("@mui/material");
var _SignalCellularAlt = _interopRequireDefault(require("@mui/icons-material/SignalCellularAlt"));
var _EventBusy = _interopRequireDefault(require("@mui/icons-material/EventBusy"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Dashboard() {
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [reviewsTrend, setReviewsTrend] = (0, _react.useState)([]);
  const [todaysApp, setTodaysApp] = (0, _react.useState)([]);
  const [upcommingApp, setUpcommingApp] = (0, _react.useState)([]);
  const [data, setData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getDashboardDataVendor/".concat(user.id));
        console.log('data ', data);
        setData(data.bookingsTrend);
        setTodaysApp(data.todaysBookings);
        setUpcommingApp(data.upcomingBookings);
        setReviewsTrend(data.reviewsTrend);
      } catch (error) {
        console.error('Error fetching data ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const uniqueDates = [...new Set(data.map(item => item.date))];
  const uniqueStores = [...new Set(data.map(item => item.store_name))];
  const series = uniqueStores.map(store => ({
    label: store,
    data: uniqueDates.map(date => {
      const entry = data.find(d => d.date === date && d.store_name === store);
      return entry ? entry.count : 0;
    })
  }));
  const uniqueDatesReviews = [...new Set(reviewsTrend.map(item => item.date))];
  const uniqueStoresReviews = [...new Set(reviewsTrend.map(item => item.store_name))];
  const seriesReviews = uniqueStoresReviews.map(store => ({
    label: store,
    data: uniqueDatesReviews.map(date => {
      const entry = reviewsTrend.find(d => d.date === date && d.store_name === store);
      return entry ? entry.count : 0;
    })
  }));
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "charts_main"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_chart upcomming_app"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "charts"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "card_header"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      margin: '10px',
      fontSize: '30px'
    }
  }, "Upcoming appointments (Next 7 days)")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "lists"
  }, (upcommingApp === null || upcommingApp === void 0 ? void 0 : upcommingApp.length) > 0 ? upcommingApp.map(singleApp => {
    var _singleApp$service, _singleApp$user, _singleApp$service2;
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getAdminBookings(singleApp.store.id)
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "list-item"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "date"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "date_day"
    }, new Date("".concat(singleApp.booking_date, "T").concat(singleApp.booking_time)).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "date_time"
    }, new Date("".concat(singleApp.booking_date, "T").concat(singleApp.booking_time)).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking_det"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "service_name"
    }, (_singleApp$service = singleApp.service) === null || _singleApp$service === void 0 ? void 0 : _singleApp$service.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "eta_worker"
    }, (_singleApp$user = singleApp.user) === null || _singleApp$user === void 0 ? void 0 : _singleApp$user.username, ", ", (_singleApp$service2 = singleApp.service) === null || _singleApp$service2 === void 0 ? void 0 : _singleApp$service2.eta, " ", singleApp.worker ? "with ".concat(singleApp.worker.username) : ''))));
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "noList"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_SignalCellularAlt.default, null)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Your schedule is empty"))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_chart upcomming_app_today"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "charts"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "card_header"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      margin: '10px',
      fontSize: '30px'
    }
  }, "Today's next appointments")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "lists"
  }, (todaysApp === null || todaysApp === void 0 ? void 0 : todaysApp.length) > 0 ? todaysApp.map(singleApp => {
    var _singleApp$service3, _singleApp$user2, _singleApp$service4;
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "list-item"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "date"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "date_day"
    }, new Date("".concat(singleApp.booking_date, "T").concat(singleApp.booking_time)).toLocaleString('en-US', {
      weekday: 'short'
    })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "date_time"
    }, new Date("".concat(singleApp.booking_date, "T").concat(singleApp.booking_time)).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking_det"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "service_name"
    }, (_singleApp$service3 = singleApp.service) === null || _singleApp$service3 === void 0 ? void 0 : _singleApp$service3.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      className: "eta_worker"
    }, (_singleApp$user2 = singleApp.user) === null || _singleApp$user2 === void 0 ? void 0 : _singleApp$user2.username, ", ", (_singleApp$service4 = singleApp.service) === null || _singleApp$service4 === void 0 ? void 0 : _singleApp$service4.eta, " ", singleApp.worker ? "with ".concat(singleApp.worker.username) : '')));
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "noList"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_EventBusy.default, null)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "No Appointments Today"))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bookings_chart"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "charts"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "card_header"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      margin: '10px',
      fontSize: '30px'
    }
  }, "Booking Trends")), /*#__PURE__*/_react.default.createElement(_xCharts.LineChart, {
    height: 450,
    xAxis: [{
      scaleType: 'point',
      data: uniqueDates,
      label: "Date"
    }],
    yAxis: [{
      min: 0,
      max: Math.max(10, Math.ceil(Math.max(...series.flatMap(s => s.data)))),
      tickMinStep: 1,
      valueFormatter: value => Math.round(value)
    }],
    series: series.map((s, i) => _objectSpread(_objectSpread({}, s), {}, {
      curve: "monotoneX",
      showMark: false,
      lineWidth: 3,
      area: false
    })),
    grid: {
      horizontal: true,
      vertical: true
    },
    sx: {
      borderRadius: "12px",
      padding: "16px",
      "& .MuiChartsAxis-root": {
        fontSize: "0.85rem",
        fill: "#374151"
      },
      "& .MuiChartsLegend-root": {
        fontSize: "0.9rem"
      }
    }
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_chart"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "charts"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "card_header"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      margin: '10px',
      fontSize: '30px'
    }
  }, "Reviews Trends")), /*#__PURE__*/_react.default.createElement(_xCharts.LineChart, {
    height: 450,
    xAxis: [{
      scaleType: 'point',
      data: uniqueDatesReviews,
      label: "Date"
    }],
    yAxis: [{
      min: 0,
      max: Math.max(10, Math.ceil(Math.max(...seriesReviews.flatMap(s => s.data)))),
      tickMinStep: 1,
      valueFormatter: value => Math.round(value)
    }],
    series: seriesReviews.map((s, i) => _objectSpread(_objectSpread({}, s), {}, {
      curve: "linear",
      showMark: false,
      lineWidth: 1,
      area: false
    })),
    grid: {
      horizontal: true,
      vertical: true
    },
    sx: {
      borderRadius: "12px",
      padding: "16px",
      "& .MuiChartsAxis-root": {
        fontSize: "0.85rem",
        fill: "#374151"
      },
      "& .MuiChartsLegend-root": {
        fontSize: "0.9rem"
      }
    }
  })))));
}
var _default = exports.default = Dashboard;