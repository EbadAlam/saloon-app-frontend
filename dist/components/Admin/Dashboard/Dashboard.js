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
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../routes");
var _reactHelmetAsync = require("react-helmet-async");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// ---- Design tokens ----
const C = {
  ink: "#241623",
  inkMuted: "#7A6A78",
  canvas: "#FAF5F1",
  card: "#FFFFFF",
  rose: "#A73B58",
  roseSoft: "#F3E1E6",
  sage: "#6E8F74",
  sageSoft: "#E7EEE7",
  sand: "#E6DAD1",
  gold: "#C08A3E",
  goldSoft: "#F6EBD9"
};
const S = {
  page: {
    padding: "28px 32px 48px",
    background: C.canvas,
    minHeight: "100vh"
  },
  header: {
    marginBottom: "28px"
  },
  eyebrow: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: C.rose,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    margin: 0
  },
  greeting: {
    fontFamily: "'Fraunces', serif",
    fontSize: "34px",
    fontWeight: 600,
    color: C.ink,
    margin: "8px 0 4px",
    lineHeight: 1.15
  },
  dateLine: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "13px",
    color: C.inkMuted,
    margin: 0
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "14px",
    marginBottom: "32px"
  },
  kpiCard: {
    background: C.card,
    borderRadius: "16px",
    border: "1px solid ".concat(C.sand),
    padding: "20px 22px"
  },
  kpiLabel: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: C.inkMuted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: 0
  },
  kpiValue: {
    fontFamily: "'Fraunces', serif",
    fontSize: "32px",
    fontWeight: 600,
    color: C.ink,
    margin: "10px 0 0",
    lineHeight: 1
  },
  kpiNote: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "12px",
    color: C.inkMuted,
    margin: "8px 0 0"
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "18px",
    marginBottom: "18px"
  },
  panel: {
    background: C.card,
    borderRadius: "18px",
    border: "1px solid ".concat(C.sand),
    padding: "24px",
    overflow: "hidden"
  },
  panelHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "18px"
  },
  panelTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: 600,
    color: C.ink,
    margin: 0
  },
  panelSub: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "12px",
    color: C.inkMuted,
    margin: 0
  },
  // Timeline / appointment rail (signature element)
  railRow: {
    display: "flex",
    gap: "14px",
    alignItems: "stretch"
  },
  railCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "14px",
    flexShrink: 0
  },
  railDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: C.rose,
    marginTop: "6px",
    flexShrink: 0
  },
  railLine: {
    width: "2px",
    flex: 1,
    background: C.sand,
    marginTop: "4px"
  },
  ticket: {
    flex: 1,
    display: "flex",
    gap: "14px",
    alignItems: "center",
    padding: "14px 16px",
    marginBottom: "14px",
    borderRadius: "14px",
    background: C.roseSoft,
    textDecoration: "none"
  },
  ticketTime: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "13px",
    fontWeight: 600,
    color: C.rose,
    minWidth: "68px"
  },
  ticketService: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: C.ink,
    margin: 0
  },
  ticketMeta: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "12px",
    color: C.inkMuted,
    margin: "2px 0 0"
  },
  // Upcoming list (secondary, quieter)
  upRow: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    padding: "12px 14px",
    marginBottom: "10px",
    borderRadius: "12px",
    background: C.canvas,
    textDecoration: "none"
  },
  upDate: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: C.sage,
    minWidth: "64px",
    textTransform: "uppercase",
    letterSpacing: "0.04em"
  },
  upService: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: C.ink,
    margin: 0
  },
  upMeta: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "11px",
    color: C.inkMuted,
    margin: "2px 0 0"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "36px 12px",
    textAlign: "center"
  },
  emptyIcon: {
    fontSize: "26px",
    marginBottom: "8px"
  },
  emptyText: {
    fontFamily: "'Fraunces', serif",
    fontSize: "16px",
    color: C.inkMuted,
    margin: 0
  },
  // Trend panel (custom sparkbars, replaces MUI charts)
  trendGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px"
  },
  trendCol: {},
  trendHeadRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "14px"
  },
  trendLabel: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: C.inkMuted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: 0
  },
  trendTotal: {
    fontFamily: "'Fraunces', serif",
    fontSize: "22px",
    fontWeight: 600,
    color: C.ink,
    margin: 0
  },
  sparkRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "5px",
    height: "84px",
    borderBottom: "1px solid ".concat(C.sand),
    paddingBottom: "2px"
  },
  sparkBarWrap: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
    cursor: "default"
  },
  sparkBar: {
    width: "100%",
    borderRadius: "4px 4px 2px 2px",
    minHeight: "3px"
  },
  sparkAxisRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px"
  },
  sparkAxisLabel: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: "10px",
    color: C.inkMuted
  }
};
const fontImport = "\n@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');\n";
function greetingForHour(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
function formatTime(dateStr, timeStr) {
  return new Date("".concat(dateStr, "T").concat(timeStr)).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function formatDayLabel(dateStr, timeStr) {
  return new Date("".concat(dateStr, "T").concat(timeStr)).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function formatShortDate(dateStr) {
  return new Date("".concat(dateStr, "T00:00:00")).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

// Aggregates a list of { date, count } (possibly split across stores) into
// one total-per-date series, sorted chronologically.
function aggregateByDate(items) {
  const totals = {};
  items.forEach(item => {
    totals[item.date] = (totals[item.date] || 0) + item.count;
  });
  return Object.entries(totals).sort((_ref, _ref2) => {
    let [a] = _ref;
    let [b] = _ref2;
    return a.localeCompare(b);
  }).map(_ref3 => {
    let [date, value] = _ref3;
    return {
      date,
      value
    };
  });
}
function Sparkbars(_ref4) {
  let {
    points,
    color
  } = _ref4;
  if (!points.length) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: _objectSpread(_objectSpread({}, S.sparkRow), {}, {
        alignItems: "center",
        justifyContent: "center"
      })
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "12px",
        color: C.inkMuted
      }
    }, "No data yet"));
  }
  const max = Math.max(1, ...points.map(p => p.value));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: S.sparkRow
  }, points.map(p => /*#__PURE__*/_react.default.createElement("div", {
    key: p.date,
    style: S.sparkBarWrap,
    title: "".concat(formatShortDate(p.date), ": ").concat(p.value)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, S.sparkBar), {}, {
      height: "".concat(Math.max(4, p.value / max * 100), "%"),
      background: color
    })
  })))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.sparkAxisRow
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.sparkAxisLabel
  }, formatShortDate(points[0].date)), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sparkAxisLabel
  }, formatShortDate(points[points.length - 1].date))));
}
function Dashboard() {
  var _summary$todaysCount, _summary$upcomingCoun;
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [reviewsTrend, setReviewsTrend] = (0, _react.useState)([]);
  const [todaysApp, setTodaysApp] = (0, _react.useState)([]);
  const [upcommingApp, setUpcommingApp] = (0, _react.useState)([]);
  const [data, setData] = (0, _react.useState)([]);
  const [summary, setSummary] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var _data$summary;
        const {
          data
        } = await _axiosClient.default.get("/getDashboardDataVendor/".concat(user.id));
        setData(data.bookingsTrend);
        setTodaysApp(data.todaysBookings);
        setUpcommingApp(data.upcomingBookings);
        setReviewsTrend(data.reviewsTrend);
        setSummary((_data$summary = data.summary) !== null && _data$summary !== void 0 ? _data$summary : null);
      } catch (error) {
        console.error("Error fetching data ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const bookingPoints = aggregateByDate(data);
  const reviewPoints = aggregateByDate(reviewsTrend);
  const bookingTotal = bookingPoints.reduce((sum, p) => sum + p.value, 0);
  const reviewTotal = reviewPoints.reduce((sum, p) => sum + p.value, 0);
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const todayLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const kpis = [{
    label: "Today's Appointments",
    value: (_summary$todaysCount = summary === null || summary === void 0 ? void 0 : summary.todaysCount) !== null && _summary$todaysCount !== void 0 ? _summary$todaysCount : todaysApp.length,
    note: "Scheduled for today"
  }, {
    label: "Upcoming (7 days)",
    value: (_summary$upcomingCoun = summary === null || summary === void 0 ? void 0 : summary.upcomingCount) !== null && _summary$upcomingCoun !== void 0 ? _summary$upcomingCoun : upcommingApp.length,
    note: "Booked this week"
  }, {
    label: "Bookings This Month",
    value: summary === null || summary === void 0 ? void 0 : summary.bookingsThisMonth,
    note: "Across all stores"
  }, {
    label: "Average Rating",
    value: (summary === null || summary === void 0 ? void 0 : summary.averageRating) != null ? "".concat(summary.averageRating, " \u2605") : "—",
    note: (summary === null || summary === void 0 ? void 0 : summary.totalReviews) != null ? "".concat(summary.totalReviews, " reviews total") : "No reviews yet"
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Vendor Dashboard - Beauty Trafic")), /*#__PURE__*/_react.default.createElement("style", null, fontImport), /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: S.eyebrow
  }, "Beauty Trafic \xB7 Vendor"), /*#__PURE__*/_react.default.createElement("h1", {
    style: S.greeting
  }, greeting, ", ", (user === null || user === void 0 ? void 0 : user.username) || "there"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.dateLine
  }, todayLabel)), /*#__PURE__*/_react.default.createElement("div", {
    style: S.kpiGrid
  }, kpis.map(kpi => /*#__PURE__*/_react.default.createElement("div", {
    key: kpi.label,
    style: S.kpiCard
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: S.kpiLabel
  }, kpi.label), /*#__PURE__*/_react.default.createElement("p", {
    style: S.kpiValue
  }, kpi.value === undefined || kpi.value === null ? "—" : kpi.value), /*#__PURE__*/_react.default.createElement("p", {
    style: S.kpiNote
  }, kpi.note)))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.sectionGrid
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.panel
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.panelHeaderRow
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: S.panelTitle
  }, "Today's schedule"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.panelSub
  }, (todaysApp === null || todaysApp === void 0 ? void 0 : todaysApp.length) || 0, " appointment", (todaysApp === null || todaysApp === void 0 ? void 0 : todaysApp.length) === 1 ? '' : 's')), (todaysApp === null || todaysApp === void 0 ? void 0 : todaysApp.length) > 0 ? /*#__PURE__*/_react.default.createElement("div", null, todaysApp.map((singleApp, i) => {
    var _singleApp$id, _singleApp$service, _singleApp$user, _singleApp$service2;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: S.railRow,
      key: (_singleApp$id = singleApp.id) !== null && _singleApp$id !== void 0 ? _singleApp$id : i
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.railCol
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.railDot
    }), i !== todaysApp.length - 1 && /*#__PURE__*/_react.default.createElement("div", {
      style: S.railLine
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: S.ticket
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.ticketTime
    }, formatTime(singleApp.booking_date, singleApp.booking_time)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      style: S.ticketService
    }, (_singleApp$service = singleApp.service) === null || _singleApp$service === void 0 ? void 0 : _singleApp$service.title), /*#__PURE__*/_react.default.createElement("p", {
      style: S.ticketMeta
    }, (_singleApp$user = singleApp.user) === null || _singleApp$user === void 0 ? void 0 : _singleApp$user.username, singleApp.worker ? " \xB7 with ".concat(singleApp.worker.username) : "", (_singleApp$service2 = singleApp.service) !== null && _singleApp$service2 !== void 0 && _singleApp$service2.eta ? " \xB7 ".concat(singleApp.service.eta) : ""))));
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyState
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyIcon
  }, "\uD83C\uDF24\uFE0F"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.emptyText
  }, "No appointments today"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.panel
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.panelHeaderRow
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: S.panelTitle
  }, "Coming up"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.panelSub
  }, "Next 7 days")), (upcommingApp === null || upcommingApp === void 0 ? void 0 : upcommingApp.length) > 0 ? /*#__PURE__*/_react.default.createElement("div", null, upcommingApp.map((singleApp, i) => {
    var _singleApp$id2, _singleApp$service3, _singleApp$user2;
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      key: (_singleApp$id2 = singleApp.id) !== null && _singleApp$id2 !== void 0 ? _singleApp$id2 : i,
      to: _routes.ROUTES.getAdminBookings(singleApp.store.id),
      style: S.upRow
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.upDate
    }, formatDayLabel(singleApp.booking_date, singleApp.booking_time)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
      style: S.upService
    }, (_singleApp$service3 = singleApp.service) === null || _singleApp$service3 === void 0 ? void 0 : _singleApp$service3.title), /*#__PURE__*/_react.default.createElement("p", {
      style: S.upMeta
    }, (_singleApp$user2 = singleApp.user) === null || _singleApp$user2 === void 0 ? void 0 : _singleApp$user2.username, singleApp.worker ? " \xB7 with ".concat(singleApp.worker.username) : "")));
  })) : /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyState
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyIcon
  }, "\uD83D\uDCD6"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.emptyText
  }, "Your schedule is empty")))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.panel
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.panelHeaderRow
  }, /*#__PURE__*/_react.default.createElement("h2", {
    style: S.panelTitle
  }, "Trends"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.panelSub
  }, "Daily totals across all stores")), /*#__PURE__*/_react.default.createElement("div", {
    style: S.trendGrid
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.trendCol
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.trendHeadRow
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: S.trendLabel
  }, "Bookings"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.trendTotal
  }, bookingTotal)), /*#__PURE__*/_react.default.createElement(Sparkbars, {
    points: bookingPoints,
    color: C.rose
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.trendCol
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.trendHeadRow
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: S.trendLabel
  }, "Reviews"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.trendTotal
  }, reviewTotal)), /*#__PURE__*/_react.default.createElement(Sparkbars, {
    points: reviewPoints,
    color: C.sage
  })))))));
}
var _default = exports.default = Dashboard;