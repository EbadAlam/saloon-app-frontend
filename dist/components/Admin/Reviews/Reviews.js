"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _AuthContext = require("../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Admin/Layout/Layout"));
var _StarRating = _interopRequireDefault(require("../../StarRating/StarRating"));
var _reactRouterDom = require("react-router-dom");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _routes = require("../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: "24px",
    background: "#f5f4f0",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    border: "1px solid #1a1a2e",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  crumb: {
    fontSize: "14px",
    color: "#888",
    textDecoration: "none"
  },
  crumbActive: {
    fontSize: "14px",
    color: "#1a1a2e",
    fontWeight: 500
  },
  sep: {
    color: "#bbb",
    fontSize: "13px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8"
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle"
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle"
  },
  reviewText: {
    fontSize: "13px",
    color: "#555"
  }
};
function AdminReviewsPage() {
  const {
    user,
    formatDate
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [reviews, setReviews] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)('');
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  (0, _react.useEffect)(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getWorkerReviews/".concat(storeId));
        setReviews(data.reviews);
        setStoreName(data.storeName || '');
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user.id]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.nav
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.backBtn,
    onClick: () => window.history.back()
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    style: {
      fontSize: 14
    }
  }), " Back"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.adminStores,
    style: S.crumb
  }, "Stores"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(storeId),
    style: S.crumb
  }, storeName || '...'), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Reviews"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, ['#', 'Title', 'Review', 'Rating', 'User', 'Worker', 'Date'].map(h => /*#__PURE__*/_react.default.createElement("th", {
    key: h,
    style: S.th
  }, h)))), /*#__PURE__*/_react.default.createElement("tbody", null, reviews.length > 0 ? reviews.map((r, i) => {
    var _r$reviewer, _r$reviewee$username, _r$reviewee;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: r.id,
      style: {
        background: i % 2 === 0 ? '#fff' : '#fafaf8'
      }
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        fontWeight: 500
      })
    }, r.title), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: S.reviewText,
      title: r.review
    }, r.review)), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: '13px',
        fontWeight: 500
      }
    }, r.rating), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: r.rating
    }))), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_r$reviewer = r.reviewer) === null || _r$reviewer === void 0 ? void 0 : _r$reviewer.username), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_r$reviewee$username = (_r$reviewee = r.reviewee) === null || _r$reviewee === void 0 ? void 0 : _r$reviewee.username) !== null && _r$reviewee$username !== void 0 ? _r$reviewee$username : '—'), /*#__PURE__*/_react.default.createElement("td", {
      style: _objectSpread(_objectSpread({}, S.td), {}, {
        color: '#888'
      })
    }, formatDate(r.reviewed_at)));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 7,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No reviews yet")))))));
}
var _default = exports.default = AdminReviewsPage;