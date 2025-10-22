"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _AuthContext = require("../../../contexts/AuthContext");
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Admin/Layout/Layout"));
var _StarRating = _interopRequireDefault(require("../../StarRating/StarRating"));
var _reactRouterDom = require("react-router-dom");
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AdminReviewsPage() {
  const {
    user,
    formatDate
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [reviews, setReviews] = (0, _react.useState)([]);
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  (0, _react.useEffect)(() => {
    const fetchWorkersReviews = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getWorkerReviews/".concat(storeId));
        setReviews(data.reviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkersReviews();
  }, [user.id]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Reviews"), /*#__PURE__*/_react.default.createElement(_BackButton.default, null)), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Review"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Rating"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "User"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Worker"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Time"))), reviews && reviews.length > 0 ? reviews.map((singleReview, index) => {
    var _singleReview$reviewe, _singleReview$reviewe2;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: singleReview.id
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleReview.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleReview.review), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      alignItems: "center",
      gap: 1
    }, singleReview.rating, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: singleReview.rating
    }))), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleReview.reviewer.username), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleReview$reviewe = (_singleReview$reviewe2 = singleReview.reviewee) === null || _singleReview$reviewe2 === void 0 ? void 0 : _singleReview$reviewe2.username) !== null && _singleReview$reviewe !== void 0 ? _singleReview$reviewe : '-'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, formatDate(singleReview.reviewed_at))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Reviews"))))));
}
var _default = exports.default = AdminReviewsPage;