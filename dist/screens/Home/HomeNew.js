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
var _SearchBar = _interopRequireDefault(require("../../components/SearchBar/SearchBar"));
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
  (0, _react.useEffect)(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
  const categoriesSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }]
  };
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "";
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Beauty Traffic"), /*#__PURE__*/_react.default.createElement("meta", {
    name: "description",
    content: "A place where you can find al nearby saloons and book an appointment just by sitting at home"
  })), loading ? /*#__PURE__*/_react.default.createElement(_SkeletonHome.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "home_new"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "home_banner"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_content container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "heading"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Book beauty & wellness ", /*#__PURE__*/_react.default.createElement("br", null), "near you")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "categories_slider"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, categoriesSliderSettings, categories && categories.length > 0 && categories.map((singleCat, index) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getCategoryPage(singleCat.slug)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "category",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, singleCat.title)))))))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "heading"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "New"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getCategoryPage('all')
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "view_all"
  }, "View All"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_cards"
  }, (stores === null || stores === void 0 || (_stores$new = stores.new) === null || _stores$new === void 0 ? void 0 : _stores$new.length) > 0 && stores.new.slice(0, 5).map((singleStore, index) => {
    var _singleStore$reviews$;
    const rating = calculateAverageRating(singleStore.reviews);
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_card",
      key: index
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "image"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
    }, singleStore.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleStore.thumbnail),
      alt: ""
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_BASE_URL, "/store-dummy-img.png"),
      alt: ""
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_content"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3"
    }, singleStore.title)), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: rating,
      color: "#ffb200",
      size: "small"
    }), " (", (_singleStore$reviews$ = singleStore.reviews.length) !== null && _singleStore$reviews$ !== void 0 ? _singleStore$reviews$ : 0, ")"), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "address"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1"
    }, singleStore.address)), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getBookingPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Book Now")))));
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "heading"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "trending"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getCategoryPage('all')
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "view_all"
  }, "View All"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_cards"
  }, (stores === null || stores === void 0 || (_stores$trending = stores.trending) === null || _stores$trending === void 0 ? void 0 : _stores$trending.length) > 0 && stores.trending.slice(0, 5).map((singleStore, index) => {
    var _singleStore$reviews$2;
    const rating = calculateAverageRating(singleStore.reviews);
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_card",
      key: index
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "image"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
    }, singleStore.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleStore.thumbnail),
      alt: ""
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_BASE_URL, "/store-dummy-img.png"),
      alt: ""
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_content"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3"
    }, singleStore.title)), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: rating,
      color: "#ffb200",
      size: "small"
    }), " (", (_singleStore$reviews$2 = singleStore.reviews.length) !== null && _singleStore$reviews$2 !== void 0 ? _singleStore$reviews$2 : 0, ")"), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "address"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1"
    }, singleStore.address)), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getBookingPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Book Now")))));
  })))))));
}
var _default = exports.default = Home;