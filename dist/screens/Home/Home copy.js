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
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isBrowser = typeof window !== "undefined";
function Home() {
  var _location$state;
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
      } catch (err) {
        console.error("error fetching stores ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);
  const reivewsSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: /*#__PURE__*/_react.default.createElement(NextArrow, null),
    prevArrow: /*#__PURE__*/_react.default.createElement(PrevArrow, null),
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
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
  })), loading ? /*#__PURE__*/_react.default.createElement(_SkeletonHome.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "main_banner",
    sx: {
      paddingBlock: '100px'
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
      color: "#333333",
      fontSize: "100px",
      fontWeight: "500",
      fontFamily: "Bebas Neue"
    }
  }, "Book Local Beauty & Wellness Service...")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search_bar"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "booking_count"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      color: "#333333",
      fontSize: "32px",
      fontWeight: "500",
      fontFamily: "Barlow",
      textAlign: "center"
    }
  }, bookingCount, " appointments are booked today.")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "get_app_btn mt-5",
    display: "flex",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getTheApp
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#FFF8F0",
      color: "#333333",
      borderRadius: "40px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    }
  }, "Get the app ", /*#__PURE__*/_react.default.createElement(_QrCode.default, null))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "background-gradient"
  }))), recentStores.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "recommended",
    sx: {
      background: "",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingBlock: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: '#333333'
    }
  }, "Recently Viewed"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: recentStores
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sliders"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "recommended",
    sx: {
      background: "#D8A7B1",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingBlock: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: '#333333'
    }
  }, "Recommended"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.new
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "new_to_site",
    sx: {
      background: "#E4F1F2",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingBlock: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: '#333333'
    }
  }, "New to BeautyTrafic"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.new
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "trending",
    sx: {
      background: "#e4e4e466",
      zIndex: "3"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      paddingBlock: "40px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: '#333333'
    }
  }, "Trending"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_Carousel.default, {
    stores: stores.trending
  }))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "download_app_section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "avail_heading",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Available on"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "google_icon icon"
  }, /*#__PURE__*/_react.default.createElement(_Google.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "apple_icon icon"
  }, /*#__PURE__*/_react.default.createElement(_Apple.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "play_store_icon icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 3.71831V28.2808C3.00016 28.3341 3.01606 28.3862 3.04569 28.4305C3.07532 28.4747 3.11737 28.5093 3.16656 28.5298C3.21575 28.5503 3.2699 28.5558 3.32222 28.5456C3.37453 28.5355 3.42268 28.5101 3.46062 28.4727L16.25 16.0002L3.46062 3.52644C3.42268 3.48902 3.37453 3.46364 3.32222 3.45349C3.2699 3.44333 3.21575 3.44884 3.16656 3.46933C3.11737 3.48982 3.07532 3.52438 3.04569 3.56867C3.01606 3.61297 3.00016 3.66502 3 3.71831ZM21.6125 10.8752L5.57625 2.04019L5.56625 2.03456C5.29 1.88456 5.0275 2.25831 5.25375 2.47581L17.8244 14.4958L21.6125 10.8752ZM5.255 29.5246C5.0275 29.7421 5.29 30.1158 5.5675 29.9658L5.5775 29.9602L21.6125 21.1252L17.8244 17.5033L5.255 29.5246ZM28.0863 14.4377L23.6081 11.9714L19.3975 16.0002L23.6081 20.0271L28.0863 17.5627C29.3044 16.8896 29.3044 15.1108 28.0863 14.4377Z",
    fill: "#2E2E2E"
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "download_heading"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "Download the Beauty trafic app..."), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Book unforgettable beauty and wellness experiences with the BeautyTrafic mobile app")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "get_app_btn mt-5",
    display: "flex",
    justifyContent: "center",
    sx: {
      width: '65%'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getTheApp
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#FFF8F0",
      color: "#333333",
      borderRadius: "40px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    }
  }, "Get the app ", /*#__PURE__*/_react.default.createElement(_QrCode.default, null)))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "mobile_img",
    src: "".concat(process.env.REACT_APP_BASE_URL, "/avail_banner_img_1.png"),
    alt: ""
  }), /*#__PURE__*/_react.default.createElement("img", {
    className: "pillers_img",
    src: "".concat(process.env.REACT_APP_BASE_URL, "/pillers.png"),
    alt: ""
  }))), reviews && reviews.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_slider"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: '32px',
      fontFamily: 'Barlow',
      fontWeight: '600'
    }
  }, "Reviews"), /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, reivewsSliderSettings, {
    className: "mt-5"
  }), reviews.map(singleRev => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "singleReview"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "userInfo"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profileImg"
  }, singleRev.reviewer.user_info.profile_image ? singleRev.reviewer.user_info.signup_platform == 'manual' ? /*#__PURE__*/_react.default.createElement("img", {
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
      fontSize: '16px',
      fontWeight: '600',
      fontFamily: 'Barlow'
    }
  }, singleRev.reviewer.username), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '14px',
      fontFamily: 'Barlow'
    }
  }, singleRev.reviewer.user_info.city))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: singleRev.rating,
    color: "#F4C430"
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '16px',
      fontWeight: '600',
      fontFamily: 'Barlow'
    }
  }, singleRev.rating)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "review"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '18px',
      fontWeight: '600',
      fontFamily: 'Barlow'
    }
  }, singleRev.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '14px',
      fontFamily: 'Barlow'
    }
  }, singleRev.review))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
      background: '#333333',
      color: '#FFF8F0',
      borderRadius: '30px',
      padding: '10px 15px',
      marginBlock: '15px'
    }
  }, "Find out more"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Excellent 5/5"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating",
    sx: {
      marginBlock: '15px'
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
      backgroundColor: '#F7CAC9',
      color: 'black',
      '&:hover': {
        color: 'black'
      },
      position: 'absolute',
      left: '90%',
      top: '-90px',
      zIndex: 1,
      borderRadius: '20px 0px 0px 20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowBackIos.default, null));
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
      backgroundColor: '#F7CAC9',
      color: 'black',
      '&:hover': {
        color: 'black'
      },
      position: 'absolute',
      right: '4%',
      top: '-90px',
      zIndex: 1,
      borderRadius: '0px 20px 20px 0px'
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};