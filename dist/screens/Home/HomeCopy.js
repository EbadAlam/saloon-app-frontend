"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _QrCode = _interopRequireDefault(require("@mui/icons-material/QrCode"));
var _routes = require("../../routes");
var _Carousel = _interopRequireDefault(require("../../components/Carousel/Carousel"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _SkeletonHome = _interopRequireDefault(require("../../components/Loader/SkeletonHome"));
var _SearchBar = _interopRequireDefault(require("../../components/SearchBar/SearchBar"));
var _Google = _interopRequireDefault(require("@mui/icons-material/Google"));
var _Apple = _interopRequireDefault(require("@mui/icons-material/Apple"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isBrowser = typeof window !== "undefined";
function Home() {
  var _location$state, _stores$recentlyViewe;
  const location = (0, _reactRouterDom.useLocation)();
  const [successMessage, setSuccessMessage] = (0, _react.useState)(((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.successMessage) || "");
  const [loading, setLoading] = (0, _react.useState)(true);
  const [stores, setStores] = (0, _react.useState)({});
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
  // useEffect(() => {
  //   if (!isBrowser) return;
  //   const viewed = getRecentlyViewedStoreIds();
  //   setRecentStores(viewed);
  // }, []);
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
        const viewedStoreIds = (0, _storeRecentlyViewed.getRecentlyViewedStoreIds)();
        const {
          data
        } = await _axiosClient.default.post("/getStoresHome", {
          viewedStoreIds: viewedStoreIds
        });
        setStores(data.stores);
        setBookingCount(data.bookingCount);
        setReviews(data.reviews);
      } catch (err) {
        console.error("error fetching stores ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);
  const reivewsSliderSettings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: /*#__PURE__*/_react.default.createElement(NextArrow, null),
    prevArrow: /*#__PURE__*/_react.default.createElement(PrevArrow, null),
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
      }
    }]
  };
  (0, _react.useEffect)(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Beauty Traffic"), /*#__PURE__*/_react.default.createElement("meta", {
    name: "description",
    content: "A place where you can find al nearby saloons and book an appointment just by sitting at home"
  })), loading ? /*#__PURE__*/_react.default.createElement(_SkeletonHome.default, null) : /*#__PURE__*/_react.default.createElement("div", {
    className: "homeNewDesign"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "main_banner",
    sx: {
      paddingBlock: "100px",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content",
    sx: {
      zIndex: "1",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "heading"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1",
    sx: {
      color: "#000",
      fontSize: "40px",
      textAlign: "center"
    }
  }, "Book Local Beauty & Wellness Service..."), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "20px",
      textAlign: "center"
    }
  }, "Find the best salons, barbershops, medspas, wellness centers, and beauty specialists that millions of people around the world trust.")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search_bar"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "booking_count"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      textAlign: "center"
    }
  }, bookingCount, " appointments are booked today."))), /*#__PURE__*/_react.default.createElement("div", {
    className: "background-gradient"
  }))), (stores === null || stores === void 0 || (_stores$recentlyViewe = stores.recentlyViewedStores) === null || _stores$recentlyViewe === void 0 ? void 0 : _stores$recentlyViewe.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "recommended",
    sx: {
      background: "",
      zIndex: "3",
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingTop: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px"
    }
  }, "Recently Viewed"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sliders"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.recentlyViewedStores
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sliders"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "recommended",
    sx: {
      background: "",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingTop: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px"
    }
  }, "Recommended"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.new
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "new_to_site",
    sx: {
      background: "",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingTop: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px"
    }
  }, "New to BeautyTrafic"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.new
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "trending",
    sx: {
      background: "",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingTop: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px"
    }
  }, "Trending"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.trending
  }))))), reviews && reviews.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_slider"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "30px",
      fontFamily: "Barlow",
      fontWeight: "700",
      textTransform: "capitalize"
    }
  }, "What client says"), /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, reivewsSliderSettings, {
    className: "mt-5"
  }), reviews.map(singleRev => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "singleReview"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: singleRev.rating,
    size: "large",
    color: "gold"
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "review"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "22px",
      fontWeight: "600",
      fontFamily: "Barlow",
      textTransform: "capitalize"
    }
  }, singleRev.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    className: "review_content",
    variant: "body1",
    sx: {
      fontSize: "18px",
      fontFamily: "Barlow"
    }
  }, singleRev.review)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "userInfo"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profileImg"
  }, singleRev.reviewer.user_info.profile_image ? singleRev.reviewer.user_info.signup_platform == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleRev.reviewer.user_info.profile_image),
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: singleRev.reviewer.user_info.profile_image,
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
    username: singleRev.reviewer.username
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "username"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: "Barlow"
    }
  }, singleRev.reviewer.username), singleRev.reviewer.user_info.city && /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "14px",
      fontFamily: "Barlow"
    }
  }, singleRev.reviewer.user_info.city)))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
const PrevArrow = _ref => {
  let {
    className,
    style,
    onClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "arrow-prev-custom",
    onClick: onClick,
    sx: {
      backgroundColor: "white",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": {
        color: "black",
        backgroundColor: "#ffc0cb87"
      },
      position: "absolute",
      left: "-40px",
      rotate: "180deg",
      top: "40%",
      zIndex: 1,
      borderRadius: "20px",
      border: "1px solid #ffc0cb87",
      width: "40px",
      height: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};
const NextArrow = _ref2 => {
  let {
    className,
    style,
    onClick
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: onClick,
    className: "arrow-next-custom",
    sx: {
      backgroundColor: "white",
      color: "black",
      transition: "all 0.3s ease",
      "&:hover": {
        color: "black",
        backgroundColor: "#ffc0cb87"
      },
      position: "absolute",
      right: "-40px",
      top: "40%",
      zIndex: 1,
      borderRadius: "20px",
      border: "1px solid #ffc0cb87",
      width: "40px",
      height: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};