"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _FavoriteBorderOutlined = _interopRequireDefault(require("@mui/icons-material/FavoriteBorderOutlined"));
var _FavoriteOutlined = _interopRequireDefault(require("@mui/icons-material/FavoriteOutlined"));
var _ReplyAllOutlined = _interopRequireDefault(require("@mui/icons-material/ReplyAllOutlined"));
var _Seperator = _interopRequireDefault(require("../../components/Seperator/Seperator"));
var _CustomGallery = _interopRequireDefault(require("../../components/CustomGallery/CustomGallery"));
var _StarOutlined = _interopRequireDefault(require("@mui/icons-material/StarOutlined"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _AuthContext = require("../../contexts/AuthContext");
var _AddReviewForm = _interopRequireDefault(require("../../components/AddReviewForm/AddReviewForm"));
var _Address = _interopRequireDefault(require("../../components/Address/Address"));
var _AccessTimeOutlined = _interopRequireDefault(require("@mui/icons-material/AccessTimeOutlined"));
var _RoomOutlined = _interopRequireDefault(require("@mui/icons-material/RoomOutlined"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _TabContext = _interopRequireDefault(require("@mui/lab/TabContext"));
var _TabList = _interopRequireDefault(require("@mui/lab/TabList"));
var _TabPanel = _interopRequireDefault(require("@mui/lab/TabPanel"));
var _material = require("@mui/material");
var _routes = require("../../routes");
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ReviewsSlider = _interopRequireDefault(require("../../components/ReviewsSlider/ReviewsSlider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function StorePage(_ref) {
  var _storeDetails$reviews;
  let {
    initialData
  } = _ref;
  const {
    formatDate,
    user,
    token,
    updateFavorites
  } = (0, _AuthContext.useAuth)();
  const [activeTab, setActiveTab] = (0, _react.useState)("1");
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [loadingFav, setLoadingFav] = (0, _react.useState)(false);
  const isBrowser = typeof window !== "undefined";
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
  const theme = (0, _material.useTheme)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [MapComponents, setMapComponents] = (0, _react.useState)(null);
  const isMobile = (0, _material.useMediaQuery)(theme.breakpoints.down("sm"));
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
  const [selectedCategory, setSelectedCategory] = (0, _react.useState)(null);
  const handleAddReview = async reviewData => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.post("addReview", reviewData);
      setStoreDetails(data.storeDetails);
    } catch (error) {
      console.error("Failed to fetch store details:", error);
    } finally {
      setLoading(false);
    }
  };
  const reviews = (storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews = storeDetails.reviews) === null || _storeDetails$reviews === void 0 ? void 0 : _storeDetails$reviews.filter(review => review.status === "active")) || [];
  const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
  const averageRatingStore = reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  const handleCopy = () => {
    const storeUrl = window.location.href;
    navigator.clipboard.writeText(storeUrl).then(() => {
      setAlertMessage("Link copied to clipboard!");
      setTimeout(() => setAlertMessage(""), 2000);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };
  const handleAddToFav = async () => {
    setLoadingFav(true);
    try {
      const payload = {
        store_id: storeDetails.id,
        user_id: user.id
      };
      let data;
      if (isFav) {
        ({
          data
        } = await _axiosClient.default.post("removeFromFavourite", payload));
      } else {
        ({
          data
        } = await _axiosClient.default.post("addToFavourite", payload));
      }
      updateFavorites(data.favouriteStores);
      setAlertMessage(data.message);
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      setIsFav(!isFav);
    } catch (error) {
      console.error("Failed to add or remove to favourites", error);
    } finally {
      setLoadingFav(false);
    }
  };
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
      background: "url(http://127.0.0.1:8000/storage//thumbnails/3UpeT36WJGKaP8vpkbw93xXbWbkYUlzCmBLUJcUV.jpg)"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "overlay"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "banner_content container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_name"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Store_Name")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: 5,
    color: "#ffb200",
    size: "medium"
  }), "255 Review"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "timing"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Timing 9:00 AM to 10:00 PM Open")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bookNow_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, null, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Book Now"))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "About",
    value: "1"
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Services",
    value: "2"
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Team Members",
    value: "3"
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Reviews",
    value: "4"
  }), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    label: "Photos",
    value: "5"
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "1"
  }, "About"), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "2"
  }, "Services"), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "3"
  }, "Team Members"), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "4"
  }, "Reviews"), /*#__PURE__*/_react.default.createElement(_TabPanel.default, {
    value: "5"
  }, "Photos")))))));
}
var _default = exports.default = StorePage;