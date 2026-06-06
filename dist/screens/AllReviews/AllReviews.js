"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BackComponent = _interopRequireDefault(require("../../components/BackComponent/BackComponent"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _material = require("@mui/material");
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _AuthContext = require("../../contexts/AuthContext");
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AllReviewsPage() {
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const [storeDetails, setStoreDetails] = (0, _react.useState)((state === null || state === void 0 ? void 0 : state.storeDetails) || null);
  const [loading, setLoading] = (0, _react.useState)(!(state !== null && state !== void 0 && state.storeDetails));
  const [sortBy, setSortBy] = (0, _react.useState)("latest");
  const [selectedRatings, setSelectedRatings] = (0, _react.useState)([]);
  const {
    formatDate
  } = (0, _AuthContext.useAuth)();
  const filterRef = (0, _react.useRef)(null);
  const [isSticky, setIsSticky] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getStoreBySlug/".concat(slug));
        setStoreDetails(data.storeDetails);
      } catch (error) {
        console.error("Failed to fetch store details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!storeDetails && slug) {
      fetchStoreDetails();
    }
  }, [storeDetails, slug]);
  if (loading || !storeDetails) {
    return /*#__PURE__*/_react.default.createElement(_Loader.default, null);
  }
  const reviews = storeDetails.reviews || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore = reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(value => ({
    value,
    count: reviews.filter(review => Math.round(review.rating) === value).length
  }));
  const handleRatingFilterChange = value => {
    setSelectedRatings(prev => prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]);
  };
  const filteredReviews = reviews.filter(review => selectedRatings.length === 0 ? true : selectedRatings.includes(Math.round(review.rating))).sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.reviewed_at) - new Date(a.reviewed_at);
    }
    if (sortBy === "best") {
      return b.rating - a.rating;
    }
    if (sortBy === "worst") {
      return a.rating - b.rating;
    }
    return 0;
  });
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "all-reviews-container"
  }, /*#__PURE__*/_react.default.createElement(_BackComponent.default, {
    fallback: _routes.ROUTES.getStoreFrontPage(storeDetails.slug)
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "start",
    gap: "50px",
    className: "all-reviews-main",
    sx: {
      paddingInline: "150px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "all-reviews-reviews",
    sx: {
      width: "60%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    className: "mt-5"
  }, "Reviews"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    className: "mt-3"
  }, filteredReviews.length, " reviews"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    sx: {
      margin: "0"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "p"
  }, "Sort by"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    value: sortBy,
    onChange: e => setSortBy(e.target.value),
    size: "small",
    sx: {
      mt: 1.5,
      minWidth: 120,
      borderRadius: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "latest"
  }, "Latest"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "best"
  }, "Best"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: "worst"
  }, "Worst")))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
    className: "all-reviews"
  }, filteredReviews.length > 0 ? filteredReviews.filter(review => review.status === "active").map(singleReview => {
    var _singleReview$reviewe;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "review mt-3",
      key: singleReview.id
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "user_info"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "user_img"
    }, singleReview.reviewer.user_info && singleReview.reviewer.user_info.profile_image ? ((_singleReview$reviewe = singleReview.reviewer.user_info) === null || _singleReview$reviewe === void 0 ? void 0 : _singleReview$reviewe.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleReview.reviewer.user_info.profile_image),
      alt: "Profile"
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: singleReview.reviewer.user_info.profile_image,
      alt: "",
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        objectFit: "cover"
      }
    }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
      username: singleReview.reviewer.username
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "user-name-time"
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: "username"
    }, singleReview.reviewer.username), /*#__PURE__*/_react.default.createElement("p", {
      className: "time"
    }, formatDate(singleReview.reviewed_at)))), /*#__PURE__*/_react.default.createElement("div", {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: singleReview.rating,
      color: "gold"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "review-text"
    }, /*#__PURE__*/_react.default.createElement("p", null, singleReview.review)));
  }) : /*#__PURE__*/_react.default.createElement(_material.Typography, null, "No reviews found for selected filter"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    ref: filterRef,
    className: "all-reviews-filter",
    sx: {
      width: {
        xs: "100%",
        md: "40%"
      },
      position: {
        xs: "static",
        md: "sticky"
      },
      top: {
        md: "50px"
      },
      right: 0
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rating_filter"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rating_star"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: "5",
    color: "gold",
    size: "large"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "avg_count"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, averageRatingStore, " \u2022 ", storeDetails.reviews.length, " reviews")), /*#__PURE__*/_react.default.createElement("div", {
    className: "filter_by mt-3"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "Filter By", /*#__PURE__*/_react.default.createElement(_material.Box, null, ratingCounts.map(_ref => {
    let {
      value,
      count
    } = _ref;
    const percentage = totalReviews ? count / totalReviews * 100 : 0;
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: value,
      display: "flex",
      alignItems: "center",
      mb: 1,
      gap: 1
    }, /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      size: "small",
      checked: selectedRatings.includes(value),
      onChange: () => handleRatingFilterChange(value)
    }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      sx: {
        width: 12
      }
    }, value), /*#__PURE__*/_react.default.createElement(_material.Box, {
      sx: {
        flexGrow: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_material.LinearProgress, {
      variant: "determinate",
      value: percentage,
      sx: {
        height: 6,
        borderRadius: 3,
        backgroundColor: "#eee",
        "& .MuiLinearProgress-bar": {
          backgroundColor: "#000"
        }
      }
    })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      sx: {
        width: 30,
        textAlign: "right"
      }
    }, count));
  }))))))));
}
var _default = exports.default = AllReviewsPage;