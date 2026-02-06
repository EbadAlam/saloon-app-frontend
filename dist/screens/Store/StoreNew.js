"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _AuthContext = require("../../contexts/AuthContext");
var _Address = _interopRequireDefault(require("../../components/Address/Address"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _TabContext = _interopRequireDefault(require("@mui/lab/TabContext"));
var _TabList = _interopRequireDefault(require("@mui/lab/TabList"));
var _TabPanel = _interopRequireDefault(require("@mui/lab/TabPanel"));
var _Masonry = _interopRequireDefault(require("@mui/lab/Masonry"));
var _material = require("@mui/material");
var _routes = require("../../routes");
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function StorePage(_ref) {
  var _storeDetails$reviews2, _storeDetails$reviews3, _storeDetails$gallery2, _storeDetails$service2, _storeDetails$workers2, _storeDetails$reviews4, _storeDetails$service3, _storeDetails$service4, _storeDetails$reviews5, _storeDetails$reviews6, _storeDetails$reviews7, _storeDetails$gallery3, _storeDetails$working;
  let {
    initialData
  } = _ref;
  const {
    formatDate,
    user
  } = (0, _AuthContext.useAuth)();
  const [activeTab, setActiveTab] = (0, _react.useState)("photos");
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [storeDetails, setStoreDetails] = (0, _react.useState)(() => {
    if (initialData) {
      return initialData;
    } else if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
      return window.__INITIAL_DATA__.storeDetails;
    }
    return null;
  });
  const [loading, setLoading] = (0, _react.useState)(!storeDetails);
  const [alertMessage, setAlertMessage] = (0, _react.useState)("");
  const [isFav, setIsFav] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [MapComponents, setMapComponents] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (typeof window !== "undefined") {
      Promise.all([Promise.resolve().then(() => _interopRequireWildcard(require("leaflet"))), Promise.resolve().then(() => _interopRequireWildcard(require("react-leaflet"))), Promise.resolve().then(() => _interopRequireWildcard(require("leaflet/dist/leaflet.css")))]).then(_ref2 => {
        let [L, ReactLeaflet] = _ref2;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        });
        setMapComponents(ReactLeaflet);
      });
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (!storeDetails || slug !== storeDetails.slug) {
      console.log("details not found");
      const fetchStoreDetails = async () => {
        console.log("fetching details");
        setLoading(true);
        try {
          var _user$user_info;
          const {
            data
          } = await _axiosClient.default.get("/getStoreBySlug/".concat(slug));
          if (data.storeDetails.status !== "active" && (user === null || user === void 0 || (_user$user_info = user.user_info) === null || _user$user_info === void 0 ? void 0 : _user$user_info.role) !== "master-admin") {
            navigate(_routes.ROUTES.home);
          }
          setStoreDetails(data.storeDetails);
          console.log("details fetched: ", data.storeDetails);
        } catch (error) {
          console.error("Failed to fetch store details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStoreDetails();
    }
  }, [storeDetails, slug]);
  (0, _react.useEffect)(() => {
    if (window.__INITIAL_DATA__) {
      console.log("data from window: ", window.__INITIAL_DATA__);
      console.log("data from state: ", storeDetails);
      delete window.__INITIAL_DATA__;
      console.log("removing data froms windows");
    }
  }, []);
  (0, _react.useEffect)(() => {
    const defaultTab = getDefaultTab(storeDetails);
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [storeDetails]);
  const getDefaultTab = storeDetails => {
    var _storeDetails$gallery, _storeDetails$service, _storeDetails$workers, _storeDetails$reviews;
    if ((storeDetails === null || storeDetails === void 0 || (_storeDetails$gallery = storeDetails.gallery) === null || _storeDetails$gallery === void 0 ? void 0 : _storeDetails$gallery.length) > 0) return 'photos';
    if ((storeDetails === null || storeDetails === void 0 || (_storeDetails$service = storeDetails.services) === null || _storeDetails$service === void 0 ? void 0 : _storeDetails$service.length) > 0) return 'services';
    if ((storeDetails === null || storeDetails === void 0 || (_storeDetails$workers = storeDetails.workers) === null || _storeDetails$workers === void 0 ? void 0 : _storeDetails$workers.length) > 0) return 'team_members';
    if ((storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews = storeDetails.reviews) === null || _storeDetails$reviews === void 0 ? void 0 : _storeDetails$reviews.length) > 0) return 'reviews';
    if (storeDetails !== null && storeDetails !== void 0 && storeDetails.about || storeDetails !== null && storeDetails !== void 0 && storeDetails.address || storeDetails !== null && storeDetails !== void 0 && storeDetails.lat && storeDetails !== null && storeDetails !== void 0 && storeDetails.lng) return 'about';
    return false; // no tabs available
  };
  (0, _react.useEffect)(() => {
    if (storeDetails && user && Array.isArray(storeDetails.favourited_by_users)) {
      const isUserFav = storeDetails.favourited_by_users.some(singleFav => (singleFav === null || singleFav === void 0 ? void 0 : singleFav.id) === (user === null || user === void 0 ? void 0 : user.id));
      setIsFav(isUserFav);
    }
  }, [storeDetails, user]);
  (0, _react.useEffect)(() => {
    if (storeDetails !== null && storeDetails !== void 0 && storeDetails.id) {
      (0, _storeRecentlyViewed.saveRecentlyViewedStore)(storeDetails);
    }
  }, [storeDetails]);
  const getTodayTiming = workingHours => {
    if (!Array.isArray(workingHours)) return null;
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long"
    });
    const todayTiming = workingHours.find(item => item.day.toLowerCase() === today.toLowerCase());
    const timing = todayTiming || workingHours[0];
    if (!timing) return null;
    const {
      start_time_formatted,
      end_time_formatted,
      start_time,
      end_time,
      is_closed
    } = timing;
    const now = new Date();
    const [startHour, startMinute] = start_time.split(":").map(Number);
    const [endHour, endMinute] = end_time.split(":").map(Number);
    const startTime = new Date(now);
    startTime.setHours(startHour, startMinute, 0, 0);
    const endTime = new Date(now);
    endTime.setHours(endHour, endMinute, 0, 0);
    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    const isWithinTime = now >= startTime && now <= endTime;
    const isActuallyOpen = is_closed === "active" && isWithinTime;
    return /*#__PURE__*/_react.default.createElement("span", null, "Timing ", start_time_formatted, " to ", end_time_formatted, " ", isActuallyOpen ? /*#__PURE__*/_react.default.createElement("strong", {
      style: {
        color: "green"
      }
    }, "Open") : /*#__PURE__*/_react.default.createElement("strong", {
      style: {
        color: "red"
      }
    }, "Closed"));
  };
  const reviews = (storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews2 = storeDetails.reviews) === null || _storeDetails$reviews2 === void 0 ? void 0 : _storeDetails$reviews2.filter(review => review.status === "active")) || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore = reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "success");
    }
  }, [alertMessage]);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  if (!MapComponents) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: "400px",
        background: "#eee"
      }
    }, "Loading map...");
  }
  const {
    MapContainer,
    TileLayer,
    Marker
  } = MapComponents;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, storeDetails ? "".concat(storeDetails.title, " - BeautyTrafic") : "BeautyTrafic"), /*#__PURE__*/_react.default.createElement("meta", {
    name: "description",
    content: storeDetails ? storeDetails.about : "Discover top salons on BeautyTrafic"
  })), loading || !storeDetails ? /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      background: "transparent",
      paddingBlock: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 300,
    height: 40
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-address"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 150,
    height: 40
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 200,
    height: 40
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 150,
    height: 40
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-info"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "100%",
    height: 150
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-gallery"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "100%",
    height: 200
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-services"
  }, [1, 2, 3, 4].map(i => /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    key: i,
    variant: "rectangular",
    width: "100%",
    height: 100,
    style: {
      margin: "10px 0"
    }
  }))))) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_detail_new"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_banner",
    sx: {
      background: "url(".concat(process.env.REACT_APP_IMG_URL).concat(storeDetails.thumbnail, ")")
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_content container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, storeDetails.title)), ((_storeDetails$reviews3 = storeDetails.reviews) === null || _storeDetails$reviews3 === void 0 ? void 0 : _storeDetails$reviews3.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: averageRatingStore,
    color: "#ffb200",
    size: "medium"
  }), storeDetails.reviews.length > 1 ? "".concat(storeDetails.reviews.length, " Reviews") : "1 Review"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "timing"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, getTodayTiming(storeDetails.working_hours))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bookNow_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Book Now"))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_details"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "100%",
      typography: "body1"
    }
  }, /*#__PURE__*/_react.default.createElement(_TabContext.default, {
    value: activeTab
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      borderBottom: 1,
      borderColor: "divider"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_TabList.default, {
    onChange: handleChange,
    className: "store_tabs_ist"
  }, ((_storeDetails$gallery2 = storeDetails.gallery) === null || _storeDetails$gallery2 === void 0 ? void 0 : _storeDetails$gallery2.length) > 0 && /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Photos",
    value: "photos"
  }), ((_storeDetails$service2 = storeDetails.services) === null || _storeDetails$service2 === void 0 ? void 0 : _storeDetails$service2.length) > 0 && /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Services",
    value: "services"
  }), ((_storeDetails$workers2 = storeDetails.workers) === null || _storeDetails$workers2 === void 0 ? void 0 : _storeDetails$workers2.length) > 0 && /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Team Members",
    value: "team_members"
  }), ((_storeDetails$reviews4 = storeDetails.reviews) === null || _storeDetails$reviews4 === void 0 ? void 0 : _storeDetails$reviews4.length) > 0 && /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Reviews",
    value: "reviews"
  }), (storeDetails.about || storeDetails.address || storeDetails.lat && storeDetails.lng) && /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "About",
    value: "about"
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container store_details_sides",
    display: "flex"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "70%"
    },
    className: "store_details_left"
  }, /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "about"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_about"
  }, /*#__PURE__*/_react.default.createElement("p", null, storeDetails.about), /*#__PURE__*/_react.default.createElement("div", {
    className: "map"
  }, storeDetails.lat && storeDetails.lng && typeof window !== "undefined" && /*#__PURE__*/_react.default.createElement(MapContainer, {
    center: [storeDetails.lat, storeDetails.lng],
    zoom: 15,
    style: {
      height: 500,
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react.default.createElement(Marker, {
    position: [storeDetails.lat, storeDetails.lng]
  })), /*#__PURE__*/_react.default.createElement(_Address.default, {
    details: storeDetails
  })))), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "services"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_services"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_title_btn"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Services"), ((_storeDetails$service3 = storeDetails.services) === null || _storeDetails$service3 === void 0 ? void 0 : _storeDetails$service3.length) > 6 && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "View All", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "badge"
  }, storeDetails.services.length)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "services"
  }, ((_storeDetails$service4 = storeDetails.services) === null || _storeDetails$service4 === void 0 ? void 0 : _storeDetails$service4.length) > 0 && storeDetails.services.slice(0, 6).map((singleSer, index) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, singleSer.title)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_price_eta"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5"
  }, singleSer.price, " ", singleSer.currency), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, singleSer.eta)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_gender"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, singleSer.gender ? "Only for ".concat(singleSer.gender) : "Available for all")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_book"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails,
      service: singleSer
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Book Now")))))))), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "team_members"
  }, "Team members"), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "reviews"
  }, (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.reviews) && (storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews5 = storeDetails.reviews) === null || _storeDetails$reviews5 === void 0 ? void 0 : _storeDetails$reviews5.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "reviews-div"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Our Happy Customers"), /*#__PURE__*/_react.default.createElement("div", {
    className: "reviews mt-3"
  }, (_storeDetails$reviews6 = storeDetails.reviews) === null || _storeDetails$reviews6 === void 0 ? void 0 : _storeDetails$reviews6.slice(0, 9).filter(review => review.status === "active").map(singleReview => /*#__PURE__*/_react.default.createElement("div", {
    className: "review",
    key: singleReview === null || singleReview === void 0 ? void 0 : singleReview.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "user_info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "user_img"
  }, singleReview.reviewer.user_info && singleReview.reviewer.user_info.profile_image ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(singleReview.reviewer.user_info.profile_image),
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
    username: singleReview.reviewer.username
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "user-name-time"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "username"
  }, /*#__PURE__*/_react.default.createElement("b", null, singleReview.reviewer.username)), /*#__PURE__*/_react.default.createElement("p", {
    className: "time"
  }, formatDate(singleReview.reviewed_at)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: singleReview.rating,
    color: "#7b7bfa"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "review-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, singleReview.review))))), ((_storeDetails$reviews7 = storeDetails.reviews) === null || _storeDetails$reviews7 === void 0 ? void 0 : _storeDetails$reviews7.length) > 9 && /*#__PURE__*/_react.default.createElement("div", {
    className: "see_all_reviews_btn_div mt-3"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAllReviewPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, "See more...")))), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "photos"
  }, /*#__PURE__*/_react.default.createElement(_Masonry.default, {
    columns: {
      xs: 2,
      md: 3
    },
    spacing: 2
  }, (_storeDetails$gallery3 = storeDetails.gallery) === null || _storeDetails$gallery3 === void 0 ? void 0 : _storeDetails$gallery3.map((item, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(item.image),
    alt: storeDetails.title,
    style: {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      display: "block",
      width: "100%"
    }
  })))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "30%"
    },
    className: "store_details_right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "right_side",
    style: {
      width: "100%",
      padding: "0px",
      marginTop: "25px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "opening-hours"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Working Hours"), /*#__PURE__*/_react.default.createElement("ul", {
    style: {
      width: "100%"
    }
  }, (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.working_hours) && (storeDetails === null || storeDetails === void 0 || (_storeDetails$working = storeDetails.working_hours) === null || _storeDetails$working === void 0 ? void 0 : _storeDetails$working.length) > 0 && storeDetails.working_hours.map(singleHour => /*#__PURE__*/_react.default.createElement("li", {
    key: singleHour.id
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "16",
    viewBox: "0 0 15 16",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "7.5",
    cy: "8",
    r: "7.5",
    fill: "#D8A7B1"
  })), /*#__PURE__*/_react.default.createElement("p", null, singleHour.day)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, singleHour.start_time_formatted, " -", " ", singleHour.end_time_formatted, " ", singleHour.is_closed !== "active" ? /*#__PURE__*/_react.default.createElement("strong", {
    style: {
      color: "red"
    }
  }, "Closed") : ""))))))))))))));
}
var _default = exports.default = StorePage;