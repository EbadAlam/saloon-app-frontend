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
var _CarouselNew = _interopRequireDefault(require("../../components/Carousel/CarouselNew"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _SkeletonHome = _interopRequireDefault(require("../../components/Loader/SkeletonHome"));
var _SearchBar = _interopRequireDefault(require("../../components/SearchBar/SearchBar"));
var _Google = _interopRequireDefault(require("@mui/icons-material/Google"));
var _Apple = _interopRequireDefault(require("@mui/icons-material/Apple"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _DoneOutlined = _interopRequireDefault(require("@mui/icons-material/DoneOutlined"));
var _ArrowForward = _interopRequireDefault(require("@mui/icons-material/ArrowForward"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
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
        setCategories(data.categories);
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
    slidesToShow: 3,
    slidesToScroll: 3,
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
    className: "homeNewDesign homeNewDesignUpdated"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "main_banner"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_blob_1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_blob_2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_blob_3"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_badge"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-sparkles w-4 h-4 text-[#D4A373]"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  })), "Pakistan's Premier Beauty Marketplace"), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_heading"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Find & Book ", /*#__PURE__*/_react.default.createElement("span", null, "Trusted Beauty"), " Professionals")), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Compare prices, read reviews, explore portfolios, check availability, and book beauty services instantly \u2014 all in one place.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_btns"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, /*#__PURE__*/_react.default.createElement("button", {
    className: "find_service"
  }, "Find service")), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, /*#__PURE__*/_react.default.createElement("button", {
    className: "join_prof"
  }, "Join as professional"))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_meta"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "meta_box"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "count"
  }, "2,500+"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text"
  }, "Professionals")), /*#__PURE__*/_react.default.createElement("div", {
    className: "meta_box"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "count"
  }, "2,500+"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text"
  }, "Professionals")), /*#__PURE__*/_react.default.createElement("div", {
    className: "meta_box"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "count"
  }, "2,500+"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text"
  }, "Professionals")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "banner_image"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-border"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/new-home-banner-img.jpg"),
    alt: "Banner Image"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "categories"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "explore"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Browse Beauty Categories"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Discover trusted professionals across all beauty services")), /*#__PURE__*/_react.default.createElement("div", {
    className: "categories_cards"
  }, categories && categories.length > 0 && categories.slice(0, 5).map(singleCat => /*#__PURE__*/_react.default.createElement("div", {
    className: "category_card"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleCat.thumbnail),
    alt: singleCat.title
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "category_info"
  }, /*#__PURE__*/_react.default.createElement("h6", null, singleCat.title), /*#__PURE__*/_react.default.createElement("p", null, "420 services"))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sliders"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "recommended"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "Top Rated"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Featured Professionals"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Top-rated beauty experts trusted by thousands")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider"
  }, /*#__PURE__*/_react.default.createElement(_CarouselNew.default, {
    stores: stores.new
  }))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "how_it_works"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "head"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "simple process"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "How it works"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Book your next beauty and wellness appointment in 3 easy steps")), /*#__PURE__*/_react.default.createElement("div", {
    className: "steps"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step_img"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "step_no"
  }, "1"), /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-search w-9 h-9 text-white"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m21 21-4.3-4.3"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "step_title"
  }, "Search Service"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "step_description"
  }, "Browse or search for the beauty service you need in your area")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step_img"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "step_no"
  }, "2"), /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-users w-9 h-9 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "step_title"
  }, "Compare Providers"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "step_description"
  }, "View profiles, portfolios, prices, and reviews to find the perfect match")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "step_img"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "step_no"
  }, "3"), /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-calendar w-9 h-9 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8 2v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 2v4"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 10h18"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "step_title"
  }, "Book Instantly"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "step_description"
  }, "Select your preferred date and time, then confirm your booking securely"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "whyChooseUs"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "head"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "Our Promise"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Why Choose Our Platform?"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "The most trusted beauty services marketplace in Pakistan")), /*#__PURE__*/_react.default.createElement("div", {
    className: "cards"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card_img"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-shield-check w-7 h-7 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m9 12 2 2 4-4"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "card_title"
  }, "Verified Professionals"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "card_description"
  }, "All providers are verified with background checks and certifications")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card_img"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-dollar-sign w-7 h-7 text-white"
  }, /*#__PURE__*/_react.default.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "2",
    y2: "22"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "card_title"
  }, "Transparent Pricing"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "card_description"
  }, "No hidden charges. Compare prices upfront before booking")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card_img"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-star w-7 h-7 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "card_title"
  }, "Real Reviews"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "card_description"
  }, "Authentic reviews from verified clients to help you decide")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card_img"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-calendar w-7 h-7 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8 2v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 2v4"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M3 10h18"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "card_title"
  }, "Easy Booking"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "card_description"
  }, "Book appointments 24/7 with instant confirmation")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card_img"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-tag w-7 h-7 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "7.5",
    cy: "7.5",
    r: ".5",
    fill: "currentColor"
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    className: "card_title"
  }, "Best Deals"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "card_description"
  }, "Exclusive discounts and special offers for members"))))), reviews && reviews.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_slider"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "Testimonials"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "What Our Clients Say"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Real experiences from thousands of satisfied customers")), /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, reivewsSliderSettings, {
    className: "mt-5"
  }), reviews.map(singleRev => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "singleReview"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "testimonial_icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-quote w-5 h-5 text-white"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: singleRev.rating,
    size: "large",
    color: "gold"
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "review"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "review_tagline"
  }, singleRev.title), /*#__PURE__*/_react.default.createElement("p", {
    className: "review_text"
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
  }, singleRev.reviewer.user_info.city)))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "blob-1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "blob-2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "blob-3"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "badge"
  }, /*#__PURE__*/_react.default.createElement("p", null, "For Beauty Professionals")), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Grow Your Beauty Business ", /*#__PURE__*/_react.default.createElement("br", null), " ", /*#__PURE__*/_react.default.createElement("span", null, "With Us")), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Join Pakistan's largest beauty services marketplace and take your business to the next level. Get access to thousands of clients looking for your services."), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-boxes"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-box"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "count-number"
  }, "2,500+"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text"
  }, "Active Providers")), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-box"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "count-number"
  }, "50,000+"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text"
  }, "Monthly Bookings"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow_btns"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "register"
  }, "Register your business"), /*#__PURE__*/_react.default.createElement("button", {
    className: "learn-more"
  }, "Learn more"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-cards"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-users w-6 h-6 text-[#D4A373]"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Reach More Clients")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Connect with thousands of potential customers actively searching for beauty services"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-users w-6 h-6 text-[#D4A373]"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Reach More Clients")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Connect with thousands of potential customers actively searching for beauty services"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-users w-6 h-6 text-[#D4A373]"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Reach More Clients")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Connect with thousands of potential customers actively searching for beauty services"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-users w-6 h-6 text-[#D4A373]"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/_react.default.createElement("h5", null, "Reach More Clients")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Connect with thousands of potential customers actively searching for beauty services")))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "pricing-section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "Plans"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Simple, Transparent Pricing"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Choose the perfect plan to grow your beauty business")), /*#__PURE__*/_react.default.createElement("div", {
    className: "pricing-plans"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Starter"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "Perfect for individual professionals starting out")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "Free"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "forever")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Basic profile listing")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Up to 5 portfolio images")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Receive bookings")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Basic analytics")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Email support")))), /*#__PURE__*/_react.default.createElement("button", {
    className: "get-started"
  }, "Get started"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan popular"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "badge"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-sparkles w-3.5 h-3.5"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  })), /*#__PURE__*/_react.default.createElement("p", null, "most popular")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Professional"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "Most popular choice for growing businesses")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "PKR 2,999"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "per month")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Premium profile placement")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Unlimited portfolio images")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Priority bookings")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Advanced analytics & insights")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Priority support")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Featured in search results")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Custom booking page")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Promotional tools")))), /*#__PURE__*/_react.default.createElement("button", {
    className: "get-started"
  }, "Get started"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Premium"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "For established businesses that want it all")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "PKR 4,999"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "per month")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Everything in Professional")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Top placement guarantee")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Verified badge")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Social media integration")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Dedicated account manager")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Marketing campaigns")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "API access")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "White-label options")))), /*#__PURE__*/_react.default.createElement("button", {
    className: "get-started"
  }, "Get started")))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "blob-1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "blob-2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sub-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "badge"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-sparkles w-3.5 h-3.5"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  })), /*#__PURE__*/_react.default.createElement("p", null, "Join 50,000+ Happy Customers")), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Ready to Find Your Perfect ", /*#__PURE__*/_react.default.createElement("span", null, "Beauty Professional?")), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Start your beauty journey today. Book trusted professionals, compare prices, and transform your look with confidence."), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-actions"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "book-now"
  }, "Book now", /*#__PURE__*/_react.default.createElement(_ArrowForward.default, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "become-prof"
  }, "Become a professional")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "count"
  }, /*#__PURE__*/_react.default.createElement("p", null, "2,500+")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Verified Providers"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "count"
  }, /*#__PURE__*/_react.default.createElement("p", null, "2,500+")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Verified Providers"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "count"
  }, /*#__PURE__*/_react.default.createElement("p", null, "2,500+")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Verified Providers"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "cta-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "count"
  }, /*#__PURE__*/_react.default.createElement("p", null, "2,500+")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Verified Providers")))))))));
}
var _default = exports.default = Home;
const PrevArrow = _ref => {
  let {
    className,
    style,
    onClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "arrow-prev-custom custom-arrow",
    onClick: onClick
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
    className: "arrow-next-custom custom-arrow"
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};