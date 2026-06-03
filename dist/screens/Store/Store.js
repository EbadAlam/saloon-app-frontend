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
var _AccessTime = _interopRequireDefault(require("@mui/icons-material/AccessTime"));
var _ArrowBackIosNew = _interopRequireDefault(require("@mui/icons-material/ArrowBackIosNew"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _IosShare = _interopRequireDefault(require("@mui/icons-material/IosShare"));
require("react-indiana-drag-scroll/dist/style.css");
var _material = require("@mui/material");
var _routes = require("../../routes");
var _storeRecentlyViewed = require("../../Utils/storeRecentlyViewed");
var _reactHelmetAsync = require("react-helmet-async");
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _ReviewsSlider = _interopRequireDefault(require("../../components/ReviewsSlider/ReviewsSlider"));
var _reactIndianaDragScroll = _interopRequireDefault(require("react-indiana-drag-scroll"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function StorePage(_ref) {
  var _storeDetails$reviews, _storeDetails$service, _storeDetails$service2, _storeDetails$workers, _storeDetails$reviews2, _storeDetails$reviews3, _storeDetails$reviews4, _storeDetails$workers2, _storeDetails$working, _storeDetails$reviews5;
  let {
    initialData
  } = _ref;
  const {
    formatDate,
    user,
    token,
    updateFavorites
  } = (0, _AuthContext.useAuth)();
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [loadingFav, setLoadingFav] = (0, _react.useState)(false);
  const scrollRef = (0, _react.useRef)(null);
  const rightSideRef = (0, _react.useRef)(null);
  const [isSticky, setIsSticky] = (0, _react.useState)(false);
  const [storeDetails, setStoreDetails] = (0, _react.useState)(() => {
    if (initialData) return initialData;else if (typeof window !== "undefined" && window.__INITIAL_DATA__) return window.__INITIAL_DATA__.storeDetails;
    return null;
  });
  const [loading, setLoading] = (0, _react.useState)(!storeDetails);
  const [alertMessage, setAlertMessage] = (0, _react.useState)("");
  const [isFav, setIsFav] = (0, _react.useState)(false);
  const theme = (0, _material.useTheme)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [isScrolled, setIsScrolled] = (0, _react.useState)(false);
  const [MapComponents, setMapComponents] = (0, _react.useState)(null);
  const isMobile = (0, _material.useMediaQuery)(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = (0, _react.useState)(false);
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
      const fetchStoreDetails = async () => {
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
      delete window.__INITIAL_DATA__;
    }
  }, []);
  (0, _react.useEffect)(() => {
    if (storeDetails && user && Array.isArray(storeDetails.favourited_by_users)) {
      const isUserFav = storeDetails.favourited_by_users.some(singleFav => (singleFav === null || singleFav === void 0 ? void 0 : singleFav.id) === (user === null || user === void 0 ? void 0 : user.id));
      setIsFav(isUserFav);
    }
  }, [storeDetails, user]);
  (0, _react.useEffect)(() => {
    if (storeDetails !== null && storeDetails !== void 0 && storeDetails.id) (0, _storeRecentlyViewed.saveRecentlyViewedStore)(storeDetails);
  }, [storeDetails]);

  // sticky right side observer
  (0, _react.useEffect)(() => {
    if (!rightSideRef.current) return;
    const handleScroll = () => {
      var _rightSideRef$current, _rightSideRef$current2;
      const top = (_rightSideRef$current = (_rightSideRef$current2 = rightSideRef.current) === null || _rightSideRef$current2 === void 0 ? void 0 : _rightSideRef$current2.getBoundingClientRect().top) !== null && _rightSideRef$current !== void 0 ? _rightSideRef$current : 0;
      setIsSticky(top <= 20);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
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
    if (endTime <= startTime) endTime.setDate(endTime.getDate() + 1);
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

  // Share using Web Share API, fallback to clipboard
  const handleCopy = async () => {
    const storeUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.title) || "Check this out",
          text: "Check out ".concat(storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.title, " on BeautyTrafic"),
          url: storeUrl
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(storeUrl).then(() => {
        setAlertMessage("Link copied to clipboard!");
        setTimeout(() => setAlertMessage(""), 2000);
      });
    }
  };

  // Share to friend button handler
  const handleShareToFriend = async () => {
    const storeUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.title,
          text: "Hey! I found this amazing place \u2014 ".concat(storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.title, ". Check it out!"),
          url: storeUrl
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(storeUrl).then(() => {
        showSnackbar("Link copied! Share it with your friend.", "success");
      });
    }
  };
  (0, _react.useEffect)(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      setTimeout(() => setAlertMessage(""), 2000);
      setIsFav(!isFav);
    } catch (error) {
      console.error("Failed to add or remove to favourites", error);
    } finally {
      setLoadingFav(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) showSnackbar(alertMessage, "success");
  }, [alertMessage]);

  // Scroll categories left/right
  const scrollCategories = direction => {
    if (scrollRef.current) {
      const container = scrollRef.current.getElement ? scrollRef.current.getElement() : scrollRef.current;
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
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
  }))))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isMobile && /*#__PURE__*/_react.default.createElement("div", {
    className: "gallery-mobile"
  }, /*#__PURE__*/_react.default.createElement(_CustomGallery.default, {
    images: storeDetails.gallery,
    thumbnail: storeDetails.thumbnail
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "storeNew"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      background: "transparent",
      paddingBlock: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "store_title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2",
    sx: {
      color: "#333333",
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600"
    }
  }, storeDetails.title)), /*#__PURE__*/_react.default.createElement("div", {
    className: "store_data_mobile"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "storeMeta"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      color: "#333333",
      fontSize: "16px"
    }
  }, storeDetails.type || "Saloon"), storeDetails.reviews && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "\u2022", /*#__PURE__*/_react.default.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarOutlined.default, null), " ", /*#__PURE__*/_react.default.createElement("strong", null, averageRatingStore, " "), /*#__PURE__*/_react.default.createElement("span", null, "(", storeDetails.reviews.length, ")")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "address"
  }, /*#__PURE__*/_react.default.createElement("p", null, storeDetails.address)), /*#__PURE__*/_react.default.createElement("div", {
    className: "storeAbout"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      color: "#333333",
      fontSize: "18px",
      fontWeight: "600"
    }
  }, "About"), /*#__PURE__*/_react.default.createElement("div", {
    className: "about_wrapper ".concat(expanded ? "expanded" : "")
  }, /*#__PURE__*/_react.default.createElement("p", null, storeDetails.about), /*#__PURE__*/_react.default.createElement("span", {
    className: "read_more",
    onClick: () => setExpanded(!expanded)
  }, expanded ? "Read Less" : "Read More")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "info_save_div"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "store_info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, averageRatingStore)), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: averageRatingStore,
    color: "gold"
  })), /*#__PURE__*/_react.default.createElement(_Seperator.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "timing"
  }, /*#__PURE__*/_react.default.createElement("p", null, getTodayTiming(storeDetails.working_hours))), /*#__PURE__*/_react.default.createElement(_Seperator.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "address"
  }, /*#__PURE__*/_react.default.createElement("p", null, storeDetails.address)), /*#__PURE__*/_react.default.createElement(_Seperator.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "get-dir-btn"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.google.com/maps/dir/?api=1&destination=".concat(storeDetails.lat, ",").concat(storeDetails.lng),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement("b", null, "Get Directions")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "save_share"
  }, user && token && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loadingFav && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: "20px"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "save",
    onClick: handleAddToFav
  }, isFav ? /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Remove from favourites"
  }, /*#__PURE__*/_react.default.createElement(_FavoriteOutlined.default, null)) : /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Add to favourites"
  }, /*#__PURE__*/_react.default.createElement(_FavoriteBorderOutlined.default, null)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "share",
    onClick: handleCopy
  }, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Share"
  }, /*#__PURE__*/_react.default.createElement(_ReplyAllOutlined.default, null)))))), !isMobile && /*#__PURE__*/_react.default.createElement("div", {
    className: "gallery"
  }, /*#__PURE__*/_react.default.createElement(_CustomGallery.default, {
    images: storeDetails.gallery,
    thumbnail: storeDetails.thumbnail,
    slug: storeDetails.slug
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "two_sections"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "left_side"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Services"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    size: "small",
    onClick: () => scrollCategories("left"),
    sx: {
      flexShrink: 0,
      border: "1px solid #e0e0e0",
      borderRadius: "50%",
      width: 30,
      height: 30,
      background: "#fff",
      "&:hover": {
        background: "#f5f5f5"
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowBackIosNew.default, {
    sx: {
      fontSize: 14
    }
  })), /*#__PURE__*/_react.default.createElement(_reactIndianaDragScroll.default, {
    ref: scrollRef,
    className: "services_categories_scroll services_categories",
    style: {
      flex: 1,
      overflow: "hidden"
    }
  }, storeDetails === null || storeDetails === void 0 || (_storeDetails$service = storeDetails.services_categories) === null || _storeDetails$service === void 0 ? void 0 : _storeDetails$service.filter(singleCat => singleCat.status === "active").map(singleCat => /*#__PURE__*/_react.default.createElement("div", {
    key: singleCat.id,
    className: "category ".concat(selectedCategory === (singleCat === null || singleCat === void 0 ? void 0 : singleCat.id) ? "active" : ""),
    onClick: () => setSelectedCategory(singleCat === null || singleCat === void 0 ? void 0 : singleCat.id)
  }, singleCat.title))), /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    size: "small",
    onClick: () => scrollCategories("right"),
    sx: {
      flexShrink: 0,
      border: "1px solid #e0e0e0",
      borderRadius: "50%",
      width: 30,
      height: 30,
      background: "#fff",
      "&:hover": {
        background: "#f5f5f5"
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, {
    sx: {
      fontSize: 14
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "services"
  }, (storeDetails === null || storeDetails === void 0 || (_storeDetails$service2 = storeDetails.services) === null || _storeDetails$service2 === void 0 ? void 0 : _storeDetails$service2.length) > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, storeDetails.services.filter(service => {
    var _service$category;
    return selectedCategory ? service.service_category_id === selectedCategory : true && ((_service$category = service.category) === null || _service$category === void 0 ? void 0 : _service$category.status) === "active";
  }).slice(0, 8).filter(service => service.status === "active" && service.is_active_by_admin == 1).map(singleSer => /*#__PURE__*/_react.default.createElement("div", {
    className: "service",
    key: singleSer.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "title"
  }, singleSer.title), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "service_meta",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "eta"
  }, /*#__PURE__*/_react.default.createElement(_AccessTime.default, null), " ", singleSer.eta), /*#__PURE__*/_react.default.createElement("p", {
    className: "gender ".concat(singleSer.gender)
  }, singleSer.gender && "Only for ".concat(singleSer.gender)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "book_btn"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "price"
  }, singleSer.currency, " ", singleSer.price), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails,
      service: singleSer
    }
  }, /*#__PURE__*/_react.default.createElement("button", null, "Book"))))), storeDetails.services.filter(service => selectedCategory ? service.category_id === selectedCategory : true).length > 4 && /*#__PURE__*/_react.default.createElement("div", {
    className: "see-all-btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, /*#__PURE__*/_react.default.createElement("button", null, "See All"))))), storeDetails.workers && ((_storeDetails$workers = storeDetails.workers) === null || _storeDetails$workers === void 0 ? void 0 : _storeDetails$workers.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "teams_div_new"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Team"), /*#__PURE__*/_react.default.createElement("div", {
    className: "team_members new"
  }, storeDetails.workers.filter(worker => {
    var _worker$user;
    return ((_worker$user = worker.user) === null || _worker$user === void 0 ? void 0 : _worker$user.account_status) === "active";
  }).map(worker => {
    var _worker$user2, _worker$user3, _worker$user$username;
    const wReviews = (worker === null || worker === void 0 || (_worker$user2 = worker.user) === null || _worker$user2 === void 0 ? void 0 : _worker$user2.reviews_received) || [];
    const wTotal = wReviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    const averageRating = wReviews.length > 0 ? (wTotal / wReviews.length).toFixed(1) : "";
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "single_member",
      key: (_worker$user3 = worker.user) === null || _worker$user3 === void 0 ? void 0 : _worker$user3.id
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "profile_img ".concat(worker.user.user_info.profile_image ? "" : "no-img")
    }, worker.user.user_info.profile_image ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL).concat(worker.user.user_info.profile_image),
      alt: ""
    }) : /*#__PURE__*/_react.default.createElement("p", {
      className: "dummy_img"
    }, ((_worker$user$username = worker.user.username) === null || _worker$user$username === void 0 ? void 0 : _worker$user$username.charAt(0)) || "?"), averageRating && /*#__PURE__*/_react.default.createElement("div", {
      className: "worker_rating ".concat(worker.user.user_info.gender)
    }, /*#__PURE__*/_react.default.createElement(_StarOutlined.default, null), " ", averageRating)), /*#__PURE__*/_react.default.createElement("div", {
      className: "worker_info"
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: "username"
    }, worker.user.username), /*#__PURE__*/_react.default.createElement("p", {
      className: "designation"
    }, worker.user.user_info.designation)));
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.reviews) && (storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews2 = storeDetails.reviews) === null || _storeDetails$reviews2 === void 0 ? void 0 : _storeDetails$reviews2.length) > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "reviews-div"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Customer Reviews"), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    size: "large",
    color: "gold",
    rating: averageRatingStore
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      marginBottom: "20px",
      fontSize: "18px"
    }
  }, averageRatingStore, " out of 5 based on ", reviews.length, " reviews"), /*#__PURE__*/_react.default.createElement("div", {
    className: "reviews mt-3"
  }, (_storeDetails$reviews3 = storeDetails.reviews) === null || _storeDetails$reviews3 === void 0 ? void 0 : _storeDetails$reviews3.slice(0, 6).filter(review => review.status === "active").map(singleReview => /*#__PURE__*/_react.default.createElement("div", {
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
    color: "gold"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "review-text"
  }, /*#__PURE__*/_react.default.createElement("p", null, singleReview.review))))), ((_storeDetails$reviews4 = storeDetails.reviews) === null || _storeDetails$reviews4 === void 0 ? void 0 : _storeDetails$reviews4.length) > 6 && /*#__PURE__*/_react.default.createElement("div", {
    className: "see_all_reviews_btn_div mt-3"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAllReviewPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, "See more...")))), user && token && (user === null || user === void 0 ? void 0 : user.id) != storeDetails.user_id && !((_storeDetails$workers2 = storeDetails.workers) !== null && _storeDetails$workers2 !== void 0 && _storeDetails$workers2.some(worker => {
    var _worker$user4;
    return ((_worker$user4 = worker.user) === null || _worker$user4 === void 0 ? void 0 : _worker$user4.id) == (user === null || user === void 0 ? void 0 : user.id);
  })) && /*#__PURE__*/_react.default.createElement("div", {
    className: "add_review mt-4"
  }, /*#__PURE__*/_react.default.createElement(_AddReviewForm.default, {
    storeId: storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.id,
    userId: user === null || user === void 0 ? void 0 : user.id,
    onSubmit: handleAddReview,
    storeUsers: storeDetails.workers
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "about about-desktop mt-5"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "About"), /*#__PURE__*/_react.default.createElement("p", {
    className: "store_about"
  }, storeDetails.about), /*#__PURE__*/_react.default.createElement("div", {
    className: "map"
  }, storeDetails.lat && storeDetails.lng && typeof window !== "undefined" && /*#__PURE__*/_react.default.createElement(MapContainer, {
    center: [storeDetails.lat, storeDetails.lng],
    zoom: 15,
    className: "store_map"
  }, /*#__PURE__*/_react.default.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react.default.createElement(Marker, {
    position: [storeDetails.lat, storeDetails.lng]
  })), /*#__PURE__*/_react.default.createElement(_Address.default, {
    details: storeDetails
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "opening-hours mt-5"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Business Hours"), /*#__PURE__*/_react.default.createElement("ul", null, (storeDetails === null || storeDetails === void 0 || (_storeDetails$working = storeDetails.working_hours) === null || _storeDetails$working === void 0 ? void 0 : _storeDetails$working.length) > 0 && storeDetails.working_hours.map(singleHour => /*#__PURE__*/_react.default.createElement("li", {
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
  })), /*#__PURE__*/_react.default.createElement("p", null, singleHour.day)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, singleHour.start_time_formatted, " \u2013", " ", singleHour.end_time_formatted, " ", singleHour.is_closed !== "active" ? /*#__PURE__*/_react.default.createElement("strong", {
    style: {
      color: "red"
    }
  }, "Closed") : ""))))), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleShareToFriend,
    style: {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 24px",
      border: "1px solid #D8A7B1",
      borderRadius: "10px",
      background: "transparent",
      color: "#333",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "#D8A7B1";
      e.currentTarget.style.color = "#fff";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "#333";
    }
  }, /*#__PURE__*/_react.default.createElement(_IosShare.default, {
    sx: {
      fontSize: 18
    }
  }), "Refer a Friend"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "right_side",
    ref: rightSideRef,
    style: {
      position: "sticky",
      top: "140px",
      right: 0
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "padding"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "store-info ".concat(isScrolled ? "visible" : "")
  }, /*#__PURE__*/_react.default.createElement("h2", null, storeDetails.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, averageRatingStore)), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: averageRatingStore
  }), /*#__PURE__*/_react.default.createElement("span", null, "(", storeDetails === null || storeDetails === void 0 || (_storeDetails$reviews5 = storeDetails.reviews) === null || _storeDetails$reviews5 === void 0 ? void 0 : _storeDetails$reviews5.length, ")"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "book_now_btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug),
    state: {
      storeDetails: storeDetails
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "book_now"
  }, "Book Now")))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "seperator"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "padding"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "time"
  }, /*#__PURE__*/_react.default.createElement(_AccessTimeOutlined.default, null), /*#__PURE__*/_react.default.createElement("b", null, getTodayTiming(storeDetails.working_hours))), /*#__PURE__*/_react.default.createElement("div", {
    className: "location mt-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/_react.default.createElement(_RoomOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_Address.default, {
    details: storeDetails
  })))))))));
}
var _default = exports.default = StorePage;