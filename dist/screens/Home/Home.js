"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _SkeletonHome = _interopRequireDefault(require("../../components/Loader/SkeletonHome"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _StoreCard = _interopRequireDefault(require("../../components/StoreCard/StoreCard"));
var _ReviewsSlider = _interopRequireDefault(require("../../components/ReviewsSlider/ReviewsSlider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const isBrowser = typeof window !== "undefined";
function Home() {
  var _location$state, _stores$new, _stores$trending;
  const location = (0, _reactRouterDom.useLocation)();
  const [successMessage, setSuccessMessage] = (0, _react.useState)(((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.successMessage) || "");
  const [loading, setLoading] = (0, _react.useState)(true);
  const [stores, setStores] = (0, _react.useState)({});
  const [categories, setCategories] = (0, _react.useState)([]);
  const [bookingCount, setBookingCount] = (0, _react.useState)(0);
  const [reviews, setReviews] = (0, _react.useState)({});
  const [recentStores, setRecentStores] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  (0, _react.useEffect)(() => {
    if (!isBrowser) return;
    document.body.classList.remove("search-page");
  }, [location, isBrowser]);
  (0, _react.useEffect)(() => {
    if (!isBrowser) return;
    const viewed = (0, _storeRecentlyViewed.getRecentlyViewedStores)();
    setRecentStores(viewed);
  }, []);
  (0, _react.useEffect)(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  (0, _react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const fetchStores = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getStores");
        setStores(data.stores);
        setBookingCount(data.bookingCount);
        setReviews(data.reviews);
        setCategories(data.categories);
      } catch (err) {
        console.error("error fetching stores ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);
  const categoriesSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  (0, _react.useEffect)(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
  const bubbles = Array.from({
    length: 12
  }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 60 + Math.random() * 60
  }));
  const [visibleCount, setVisibleCount] = (0, _react.useState)(6);
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 12);
  };
  const visibleCategories = categories.slice(0, visibleCount);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Beauty Traffic"), /*#__PURE__*/_react.default.createElement("meta", {
    name: "description",
    content: "A place where you can find al nearby saloons and book an appointment just by sitting at home"
  })), loading ? /*#__PURE__*/_react.default.createElement(_SkeletonHome.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "main_banner new_banner"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content",
    sx: {
      zIndex: "1",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bg_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/new-banner-bg.webp"),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bubble_section"
  }, bubbles.map((b, i) => /*#__PURE__*/_react.default.createElement("img", {
    key: i,
    src: "".concat(process.env.REACT_APP_BASE_URL, "/bubble.png"),
    alt: "bubble",
    className: "bubble",
    "data-speed": b.speed,
    style: {
      left: "".concat(b.left, "%"),
      top: "".concat(b.top, "%"),
      width: "".concat(b.size, "px")
    }
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/banner-1-fg-img.png"),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "discover local gems"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "relax & renew at", /*#__PURE__*/_react.default.createElement("br", null), " top salons & spa's"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sequi minus iure, molestias eaque placeat enim in temporibus, eum voluptate totam, nisi repellendus? Quidem distinctio vero non, illo magni amet!"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    style: {
      width: "fit-content"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Explore Now"))))))), visibleCategories && visibleCategories.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "categories_section"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Search by category"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "categories"
  }, visibleCategories.map(singleCategory => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "category",
    key: singleCategory.id
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getCategoryPage(singleCategory.slug)
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "cat_image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleCategory.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "cat_name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, singleCategory.title))))), visibleCount < categories.length && /*#__PURE__*/_react.default.createElement(_material.Box, {
    textAlign: "center",
    className: "show_more_div"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    color: "primary",
    onClick: handleShowMore,
    sx: {
      px: 3
    }
  }, "Show More"))))), categories && categories.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "categories_section mobile"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Search by category"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "categories"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, categoriesSliderSettings, categories.map(singleCategory => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "category",
    key: singleCategory.id
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getCategoryPage(singleCategory.slug)
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "cat_image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleCategory.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "cat_name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, singleCategory.title))))))))), (stores === null || stores === void 0 || (_stores$new = stores.new) === null || _stores$new === void 0 ? void 0 : _stores$new.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_section new_stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: "#333333",
      textAlign: "center"
    }
  }, "New to Site"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores"
  }, stores.new.map(singleStore => /*#__PURE__*/_react.default.createElement(_StoreCard.default, {
    key: singleStore.id,
    storeDetails: singleStore
  }))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "second_banner new_banner"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content",
    sx: {
      zIndex: "1",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bg_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/new-banner-2-bg.webp"),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bubble_section"
  }, Array.from({
    length: 10
  }).map((_, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: i,
    className: "bubble"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "discover local gems"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "relax & renew at", /*#__PURE__*/_react.default.createElement("br", null), " top salons & spa's"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sequi minus iure, molestias eaque placeat enim in temporibus, eum voluptate totam, nisi repellendus? Quidem distinctio vero non, illo magni amet!"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    style: {
      width: "fit-content"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Explore Now"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "image"
  }))))), (stores === null || stores === void 0 || (_stores$trending = stores.trending) === null || _stores$trending === void 0 ? void 0 : _stores$trending.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_section trending_stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: "#333333",
      textAlign: "center"
    }
  }, "Treandy Saloons and Spa's"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores"
  }, stores.trending.map(singleStore => /*#__PURE__*/_react.default.createElement(_StoreCard.default, {
    storeDetails: singleStore
  }))))), /*#__PURE__*/_react.default.createElement(_ReviewsSlider.default, {
    reviews: reviews
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "top_rated"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "The top-rated destination for beauty and wellness"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "One solution, one software. Trusted by the best in the beauty and wellness industry"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1",
    className: "count"
  }, "1 Billion+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Appointments booked on beauty trafic"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "count_info mt-5"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "150,000+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Partner businesses")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "110+ countries"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "using BeautyTrafic")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "350,000+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Stylists & professionals"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "for_business mt-5"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Beauty trafic for Business"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Boost your salon or spa business for free with the world\u2019s leading booking platform \u2014 rated No. 1 by industry experts."), /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333",
      color: "#FFF8F0",
      borderRadius: "30px",
      padding: "10px 15px",
      marginBlock: "15px"
    }
  }, "Find out more"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Excellent 5/5"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating",
    sx: {
      marginBlock: "15px"
    }
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: 5
  })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Over ", reviews.length, " reviews."))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/for_business.png"),
    alt: ""
  }))))));
}
var _default = exports.default = Home;