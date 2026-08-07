"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _material = require("@mui/material");
var _routes = require("../../routes");
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _DummyImage = _interopRequireDefault(require("../../components/DummyImage/DummyImage"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _ArrowBackIosNew = _interopRequireDefault(require("@mui/icons-material/ArrowBackIosNew"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
var _AuthContext = require("../../contexts/AuthContext");
var _LoginModal = _interopRequireDefault(require("../../components/LoginModal/LoginModal"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _BookingConfirmModal = _interopRequireDefault(require("../../components/BookingConfirmModal/BookingConfirmModal"));
var _reactIndianaDragScroll = _interopRequireDefault(require("react-indiana-drag-scroll"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function BookingPage() {
  var _storeDetails$reviews, _storeDetails$service, _storeDetails$service2, _storeDetails$workers, _storeDetails$workers2;
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const {
    user,
    token,
    login
  } = (0, _AuthContext.useAuth)();
  const scrollRef = (0, _react.useRef)(null);

  // ── Bundle vs Service booking mode ──────────────────────────────────────
  const isBundleBooking = !!(state !== null && state !== void 0 && state.bundle);
  const bundleData = (state === null || state === void 0 ? void 0 : state.bundle) || null;
  const [storeDetails, setStoreDetails] = (0, _react.useState)((state === null || state === void 0 ? void 0 : state.storeDetails) || null);
  const [loading, setLoading] = (0, _react.useState)(!(state !== null && state !== void 0 && state.storeDetails));
  const [loginLoading, setLoginLoading] = (0, _react.useState)(false);
  const [selectedCategory, setSelectedCategory] = (0, _react.useState)(null);
  const [loginMessage, setLoginMessage] = (0, _react.useState)("");
  const [alertMessage, setAlertMessage] = (0, _react.useState)("");
  const [step, setStep] = (0, _react.useState)(1);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [showLoginForm, setShowLoginForm] = (0, _react.useState)(false);
  const [indWorker, setIndWorker] = (0, _react.useState)(false);
  const [closeStore, setCloseStore] = (0, _react.useState)(false);
  const [thankyou, setThankyou] = (0, _react.useState)(false);
  const [timeSlots, setTimeSlots] = (0, _react.useState)([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = (0, _react.useState)("");
  const [selectedServices, setSelectedServices] = (0, _react.useState)(() => {
    if (state !== null && state !== void 0 && state.bundle) {
      return (state.bundle.services || []).map(s => _objectSpread(_objectSpread({}, s), {}, {
        worker_id: "",
        worker_name: "",
        bundle_id: state.bundle.id
      }));
    }
    if (state !== null && state !== void 0 && state.service) {
      return [_objectSpread(_objectSpread({}, state.service), {}, {
        worker_id: "",
        worker_name: ""
      })];
    }
    return [];
  });
  const [selectedProfessional, setSelectedProfessional] = (0, _react.useState)({
    id: "",
    username: "any professional"
  });
  const sideBarRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const fetchStoreDetails = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getStoreBySlug/".concat(slug));
        // console.log('data', data.storeDetails);
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
  (0, _react.useEffect)(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.getAttribute("id").replace("cat-", ""));
          setSelectedCategory(id);
        }
      });
    }, {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0.1
    });
    const sections = document.querySelectorAll(".service-category-section");
    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [storeDetails]);
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleClick = () => {
    if (step > 1) {
      // Bundles skip the Professionals step (step 2), so going back from
      // Time (step 3) should return to Services (step 1), not step 2.
      const prevStep = step === 3 && isBundleBooking ? 1 : step - 1;
      setStep(prevStep);
      setIndWorker(false);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(_routes.ROUTES.getStoreFrontPage(storeDetails.slug));
      }
    }
  };
  const handleClickClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(_routes.ROUTES.getStoreFrontPage(storeDetails.slug));
    }
  };
  const goToNextStep = () => {
    // Bundles skip the Professionals step entirely.
    const nextStep = step === 1 && isBundleBooking ? 3 : step + 1;
    setStep(nextStep);
    setIndWorker(false);
  };
  const updateWorkerId = (serviceId, workerId, workerName) => {
    setSelectedServices(prevServices => prevServices.map(service => service.id === serviceId ? _objectSpread(_objectSpread({}, service), {}, {
      worker_id: workerId,
      worker_name: workerName
    }) : service));
  };
  const [selectedDate, setSelectedDate] = (0, _react.useState)(new Date().toISOString().split("T")[0]);
  const dates = Array.from({
    length: 60
  }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  });
  const getDayName = date => {
    return date.toLocaleDateString("en-US", {
      weekday: "short"
    });
  };
  const getFullDayName = date => {
    return date.toLocaleDateString("en-US", {
      weekday: "long"
    });
  };
  const getDateNumber = date => {
    return String(date.getDate()).padStart(2, "0");
  };
  const getISODate = date => {
    return date.toISOString().split("T")[0];
  };
  const [currentMonth, setCurrentMonth] = (0, _react.useState)(() => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  });
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: true,
    nextArrow: /*#__PURE__*/_react.default.createElement(NextArrow, {
      className: "next-arrow"
    }),
    prevArrow: /*#__PURE__*/_react.default.createElement(PrevArrow, {
      className: "prev-arrow"
    }),
    afterChange: currentSlide => {
      const visibleDate = dates[currentSlide];
      const monthYear = visibleDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      });
      setCurrentMonth(monthYear);
    },
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    }]
  };
  const averageRating = storeDetails !== null && storeDetails !== void 0 && (_storeDetails$reviews = storeDetails.reviews) !== null && _storeDetails$reviews !== void 0 && _storeDetails$reviews.length ? (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0)) / (storeDetails === null || storeDetails === void 0 ? void 0 : storeDetails.reviews.length) : 0;
  const formatTo12Hour = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return "".concat(hour12, ":").concat(String(minute).padStart(2, "0"), " ").concat(period);
  };
  const convertTo24Hour = time12h => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    }
    return "".concat(hours.padStart(2, "0"), ":").concat(minutes);
  };
  const addMinutesToTime = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return "".concat(String(newHours).padStart(2, "0"), ":").concat(String(newMinutes).padStart(2, "0"));
  };
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    while (startHour < endHour || startHour === endHour && startMinute < endMinute) {
      const startFormatted = formatTo12Hour(startHour, startMinute);
      let endSlotHour = startHour;
      let endSlotMinute = startMinute + 30;
      if (endSlotMinute >= 60) {
        endSlotHour += 1;
        endSlotMinute = endSlotMinute % 60;
      }
      slots.push("".concat(startFormatted));
      startHour = endSlotHour;
      startMinute = endSlotMinute;
    }
    return slots;
  };
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const filteredSlots = timeSlots.filter(slot => {
    const slotStart = convertTo24Hour(slot);
    if (selectedDate === todayStr) {
      const currentTime = "".concat(String(now.getHours()).padStart(2, "0"), ":").concat(String(now.getMinutes()).padStart(2, "0"));
      if (slotStart <= currentTime) {
        return false;
      }
    }
    const workerDurations = {};
    selectedServices.forEach(service => {
      if (!service.worker_id) return;
      let etaMinutes = 0;
      const eta = (service.eta || "").toLowerCase();
      const match = eta.match(/(\d+)\s*(hr|hrs|hour|hours|min|mins|minute|minutes)/i);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        if (unit.includes("hour") || unit.includes("hours") || unit.includes("hr") || unit.includes("hrs")) {
          etaMinutes = value * 60;
        } else {
          etaMinutes = value;
        }
      } else {
        etaMinutes = 30;
      }
      workerDurations[service.worker_id] = (workerDurations[service.worker_id] || 0) + etaMinutes;
    });
    const hasConflict = Object.entries(workerDurations).some(_ref => {
      var _storeDetails$booking;
      let [workerId, totalEta] = _ref;
      const slotEnd = addMinutesToTime(slotStart, totalEta);
      return (_storeDetails$booking = storeDetails.bookings) === null || _storeDetails$booking === void 0 ? void 0 : _storeDetails$booking.some(booking => {
        if (booking.booking_date !== selectedDate) return false;
        if (booking.worker_id != workerId) return false;
        const bookingStart = booking.booking_time.slice(0, 5);
        const bookingEnd = booking.booking_time_end.slice(0, 5);
        return slotStart < bookingEnd && slotEnd > bookingStart;
      });
    });
    return !hasConflict;
  });
  const handleDateClick = date => {
    var _storeDetails$working;
    setAlertMessage("");
    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);
    setCloseStore(false);
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long"
    });
    const dayWorkingHours = storeDetails === null || storeDetails === void 0 || (_storeDetails$working = storeDetails.working_hours) === null || _storeDetails$working === void 0 ? void 0 : _storeDetails$working.find(day => day.day === dayName);
    if (dayWorkingHours) {
      if (dayWorkingHours.is_closed === "inactive") {
        setCloseStore(true);
        setTimeSlots([]);
      } else {
        const slots = generateTimeSlots(dayWorkingHours.start_time, dayWorkingHours.end_time);
        setTimeSlots(slots);
      }
    } else {
      setTimeSlots([]);
    }
  };
  (0, _react.useEffect)(() => {
    handleDateClick(new Date());
  }, [storeDetails]);

  // ── Pricing (bundle uses its own fixed price; services sum individually) ──
  const subtotalPrice = isBundleBooking ? Number((bundleData === null || bundleData === void 0 ? void 0 : bundleData.price) || 0) : selectedServices.reduce((acc, service) => acc + parseFloat(service.price || 0), 0);
  const displayCurrency = isBundleBooking ? (bundleData === null || bundleData === void 0 ? void 0 : bundleData.currency) || "PKR" : "PKR";
  const bookingSubmitHandle = async () => {
    setLoading(true);
    const payload = {
      services: selectedServices,
      bundle_id: isBundleBooking ? bundleData.id : null,
      time: selectedTimeSlot,
      date: selectedDate,
      user_id: user.id,
      store_id: storeDetails.id
    };
    try {
      await _axiosClient.default.post("/addBooking", payload);
      setThankyou(true);
    } catch (err) {
      console.error("error adding booking ", err);
    } finally {
      setLoading(false);
      // navigate(ROUTES.userAppointment, { state: { successMessage: 'Booked successfully!' } });
    }
  };
  const handleFormSubmit = () => {
    setAlertMessage("");
    if (!selectedTimeSlot || !selectedDate) {
      setAlertMessage("Please select date and time below!");
    } else {
      if (user && token) {
        bookingSubmitHandle();
      } else {
        setShowLoginForm(true);
      }
    }
  };

  // const workerCanDoService = (worker, serviceId) => {
  //   // console.log('service check: ', worker.services?.some(ws => ws.service_id == serviceId));
  //   const workerServices = worker.services ?? [];
  //   if (workerServices.length === 0) return true;
  //   return workerServices.some((ws) => ws.service_id == serviceId);
  // };
  const workerCanDoService = (worker, serviceId, allWorkers) => {
    var _worker$services;
    const hasAssignedWorker = allWorkers.some(w => {
      var _w$services;
      return ((_w$services = w.services) !== null && _w$services !== void 0 ? _w$services : []).some(ws => ws.service_id == serviceId);
    });

    // No worker assigned to this service → allow everyone
    if (!hasAssignedWorker) {
      return true;
    }

    // Otherwise only allow assigned workers
    return ((_worker$services = worker.services) !== null && _worker$services !== void 0 ? _worker$services : []).some(ws => ws.service_id == serviceId);
  };
  const [email, setEmail] = (0, _react.useState)("random@gmail.com");
  const [password, setPassword] = (0, _react.useState)("random123");
  const handleLoginSubmit = async e => {
    if (e !== null && e !== void 0 && e.preventDefault) e.preventDefault();
    setLoginLoading(true);
    try {
      const payload = {
        email: email,
        password: password
      };
      const {
        data
      } = await _axiosClient.default.post("/login", payload);
      if (data.success) {
        login(data.user, data.token);
        setShowLoginForm(false);
      } else {
        setLoginMessage(data.message);
      }
    } catch (err) {
      console.error("Error login ", err);
    } finally {
      setLoginLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "error");
    }
  }, [alertMessage]);
  const getTotalEta = services => {
    let totalMinutes = 0;
    services.forEach(service => {
      if (!service.eta) return;
      const match = service.eta.match(/(\d+)\s*(hour|hours|minute|minutes|min|mins)/i);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        totalMinutes += unit.includes("hour") ? value * 60 : value;
      }
    });
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hrs > 0 && mins > 0) {
      return "".concat(hrs, " hour").concat(hrs > 1 ? "s" : "", " ").concat(mins, " minute").concat(mins > 1 ? "s" : "");
    }
    if (hrs > 0) {
      return "".concat(hrs, " hour").concat(hrs > 1 ? "s" : "");
    }
    return "".concat(mins, " minute").concat(mins > 1 ? "s" : "");
  };
  const scrollCategories = direction => {
    if (scrollRef.current) {
      const container = scrollRef.current.getElement ? scrollRef.current.getElement() : scrollRef.current;
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };
  if (loading || !storeDetails) {
    return /*#__PURE__*/_react.default.createElement(_Loader.default, null);
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      paddingBlock: "20px",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      maxWidth: "1300px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_LoginModal.default, {
    open: showLoginForm,
    onClose: () => setShowLoginForm(false),
    email: email,
    password: password,
    setEmail: setEmail,
    setPassword: setPassword,
    onSubmit: handleLoginSubmit,
    loading: loginLoading,
    loginMessage: loginMessage
  })), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_BookingConfirmModal.default, {
    open: thankyou,
    onClose: () => setThankyou(false)
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    className: "backButtonCp",
    sx: {
      padding: "50px 0px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, null)), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClickClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "start",
    gap: "50px",
    sx: {
      paddingInline: {
        xs: "20px",
        md: "50px"
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "60%"
    },
    className: "booking_steps"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    className: "booking_breadCrumbs"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: step === 1 ? "active" : step >= 1 ? "prev-active" : "",
    onClick: () => {
      if (step >= 1) {
        setStep(1);
        setIndWorker(false);
      }
    }
  }, isBundleBooking ? "Bundle" : "Services"), /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, {
    sx: {
      fontSize: "18px"
    }
  }), !isBundleBooking && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: step === 2 ? "active" : step >= 2 ? "prev-active" : "",
    onClick: () => {
      if (step >= 2) {
        setStep(2);
        setIndWorker(false);
      }
    }
  }, "Professionals"), /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, {
    sx: {
      fontSize: "18px"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: step === 3 ? "active" : step >= 3 ? "prev-active" : "",
    onClick: () => {
      if (step >= 3) {
        setStep(3);
        setIndWorker(false);
      }
    }
  }, "Time"), /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, {
    sx: {
      fontSize: "18px"
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: step === 4 ? "active" : "",
    onClick: () => {
      if (step >= 4) {
        setStep(4);
        setIndWorker(false);
      }
    }
  }, "Confirm")), step === 1 && !indWorker && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    className: "mb-4",
    sx: {
      mt: {
        xs: 3,
        md: 5
      }
    }
  }, isBundleBooking ? bundleData.title : "Services"), isBundleBooking ? /*#__PURE__*/_react.default.createElement("div", {
    className: "services"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "service-category-section"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "category-title"
  }, "Included in this bundle"), selectedServices.map(singleSer => /*#__PURE__*/_react.default.createElement("div", {
    className: "service mt-3",
    key: singleSer.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "title"
  }, singleSer.title), /*#__PURE__*/_react.default.createElement("p", {
    className: "eta"
  }, singleSer.eta), /*#__PURE__*/_react.default.createElement("p", {
    className: "price"
  }, singleSer.currency, " ", singleSer.price)))))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
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
  }, storeDetails === null || storeDetails === void 0 || (_storeDetails$service = storeDetails.services_categories) === null || _storeDetails$service === void 0 ? void 0 : _storeDetails$service.filter(singleCat => singleCat.status === "active").map((singleCat, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index,
    className: "category ".concat(selectedCategory === singleCat.id ? "active" : ""),
    onClick: () => {
      setSelectedCategory(singleCat.id);
      const section = document.getElementById("cat-".concat(singleCat.id));
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    },
    style: {
      cursor: "pointer"
    }
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
  }, storeDetails === null || storeDetails === void 0 || (_storeDetails$service2 = storeDetails.services_categories) === null || _storeDetails$service2 === void 0 ? void 0 : _storeDetails$service2.filter(c => c.status == 'active').map(cat => {
    const servicesInCategory = storeDetails.services.filter(s => s.service_category_id === cat.id);
    if (servicesInCategory.length === 0) return null;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: cat.id,
      id: "cat-".concat(cat.id),
      className: "service-category-section"
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: "category-title"
    }, cat.title), servicesInCategory.filter(s => s.status == "active").map((singleSer, index) => /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: "book_checkbox_".concat(singleSer.id),
      className: "service mt-3",
      key: singleSer.id
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "info"
    }, /*#__PURE__*/_react.default.createElement("h4", {
      className: "title"
    }, singleSer.title), /*#__PURE__*/_react.default.createElement("p", {
      className: "eta"
    }, singleSer.eta), /*#__PURE__*/_react.default.createElement("p", {
      className: "price"
    }, singleSer.currency, " ", singleSer.price), /*#__PURE__*/_react.default.createElement("p", {
      className: "gender"
    }, singleSer.gender && "Only for ".concat(singleSer.gender))), /*#__PURE__*/_react.default.createElement("div", {
      className: "book_btn"
    }, /*#__PURE__*/_react.default.createElement(_material.Checkbox, {
      id: "book_checkbox_".concat(singleSer.id),
      checked: selectedServices.some(s => s.id === singleSer.id),
      onChange: e => {
        if (e.target.checked) {
          setSelectedServices(prev => [...prev, singleSer]);
        } else {
          setSelectedServices(prev => prev.filter(s => s.id !== singleSer.id));
        }
      }
    })))));
  })))), step === 2 && !indWorker && !isBundleBooking && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    className: "mt-5"
  }, "Select Professional"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "professionals mt-3"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single-pro",
    onClick: () => {
      setSelectedServices(prevServices => prevServices.map(service => _objectSpread(_objectSpread({}, service), {}, {
        worker_id: "",
        worker_name: ""
      })));
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    viewBox: "0 0 46 45",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23 26.25C28.1825 26.25 32.375 22.0538 32.375 16.875C32.375 11.6962 28.1825 7.5 23 7.5C17.8175 7.5 13.625 11.6962 13.625 16.875C13.625 22.0538 17.8175 26.25 23 26.25ZM23 11.25C26.1012 11.25 28.625 13.7737 28.625 16.875C28.625 19.9762 26.1012 22.5 23 22.5C19.8987 22.5 17.375 19.9762 17.375 16.875C17.375 13.7737 19.8987 11.25 23 11.25ZM38 28.125C39.2432 28.125 40.4355 27.6311 41.3146 26.7521C42.1936 25.873 42.6875 24.6807 42.6875 23.4375C42.6875 22.1943 42.1936 21.002 41.3146 20.1229C40.4355 19.2439 39.2432 18.75 38 18.75C36.7568 18.75 35.5645 19.2439 34.6854 20.1229C33.8064 21.002 33.3125 22.1943 33.3125 23.4375C33.3125 24.6807 33.8064 25.873 34.6854 26.7521C35.5645 27.6311 36.7568 28.125 38 28.125ZM38 20.625C39.5506 20.625 40.8125 21.8869 40.8125 23.4375C40.8125 24.9881 39.5506 26.25 38 26.25C36.4494 26.25 35.1875 24.9881 35.1875 23.4375C35.1875 21.8869 36.4494 20.625 38 20.625ZM38 29.2313C35.5044 29.2313 33.6275 29.9925 32.5306 31.0481C30.44 29.3269 27.1344 28.125 23 28.125C18.7512 28.125 15.5094 29.34 13.4525 31.0575C12.335 29.9981 10.4375 29.2294 8 29.2294C3.8975 29.2294 1.4375 31.275 1.4375 33.3225C1.4375 34.3444 3.8975 35.37 8 35.37C9.1325 35.37 10.1487 35.2744 11.0431 35.1206L10.9681 35.6269C10.9681 37.5019 15.4775 39.3769 23 39.3769C30.0537 39.3769 35.0319 37.5019 35.0319 35.6269L34.9925 35.1488C35.8606 35.2856 36.86 35.37 38 35.37C41.8456 35.37 44.5625 34.3444 44.5625 33.3225C44.5625 31.275 41.9881 29.2313 38 29.2313ZM8 33.4931C5.54562 33.4931 4.1225 33.105 3.46812 32.8294C3.91625 32.07 5.34875 31.1044 8 31.1044C10.0756 31.1044 11.4444 31.7625 12.14 32.4281L11.6994 33.0731C10.8519 33.2962 9.62187 33.4931 8 33.4931ZM23 35.625C18.9444 35.625 16.4356 35.04 15.155 34.5731C16.1319 33.3019 18.7512 31.875 23 31.875C27.0669 31.875 29.7312 33.3019 30.7775 34.5469C29.3619 35.0531 26.7237 35.625 23 35.625ZM38 33.4931C36.2862 33.4931 35.1012 33.3 34.3006 33.0938C34.1634 32.8481 34.008 32.613 33.8356 32.3906C34.5031 31.7437 35.8437 31.1063 38 31.1063C40.4825 31.1063 42.0144 32.0456 42.5075 32.8144C41.7762 33.12 40.2481 33.4931 38 33.4931ZM8 28.125C9.2432 28.125 10.4355 27.6311 11.3146 26.7521C12.1936 25.873 12.6875 24.6807 12.6875 23.4375C12.6875 22.1943 12.1936 21.002 11.3146 20.1229C10.4355 19.2439 9.2432 18.75 8 18.75C6.7568 18.75 5.56451 19.2439 4.68544 20.1229C3.80636 21.002 3.3125 22.1943 3.3125 23.4375C3.3125 24.6807 3.80636 25.873 4.68544 26.7521C5.56451 27.6311 6.7568 28.125 8 28.125ZM8 20.625C9.55062 20.625 10.8125 21.8869 10.8125 23.4375C10.8125 24.9881 9.55062 26.25 8 26.25C6.44937 26.25 5.1875 24.9881 5.1875 23.4375C5.1875 21.8869 6.44937 20.625 8 20.625Z",
    fill: "#333333"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    textAlign: "center",
    sx: {
      fontSize: "16px",
      color: "#333333",
      fontWeight: "600"
    }
  }, "Any Professional"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    textAlign: "center",
    sx: {
      fontSize: "14px",
      color: "#333333"
    }
  }, "For Maximum Availability"))), selectedServices.length > 1 && ((_storeDetails$workers = storeDetails.workers) === null || _storeDetails$workers === void 0 ? void 0 : _storeDetails$workers.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single-pro",
    onClick: () => {
      setSelectedProfessional({
        id: "",
        username: "any professional"
      });
      setIndWorker(true);
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement("svg", {
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M24.865 26.5a1 1 0 0 1-.343 1.402 1 1 0 0 1-1.387-.402 7.125 7.125 0 0 0-12.27 0 1 1 0 1 1-1.73-1 9 9 0 0 1 4.217-3.74 6 6 0 1 1 7.296 0 9 9 0 0 1 4.217 3.74M17 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7-7a1 1 0 0 0-1-1 3 3 0 1 1 2.905-3.75 1 1 0 0 0 1.938-.5 5 5 0 1 0-8.218 4.939 8.5 8.5 0 0 0-3.425 2.71A1 1 0 1 0 3.8 18.6 6.45 6.45 0 0 1 9 16a1 1 0 0 0 1-1M25 3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V8h-2a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    textAlign: "center",
    sx: {
      fontSize: "14px",
      color: "#333333"
    }
  }, "Select professional per service"))), ((_storeDetails$workers2 = storeDetails.workers) === null || _storeDetails$workers2 === void 0 ? void 0 : _storeDetails$workers2.length) > 0 && storeDetails.workers.filter(singlePro => {
    var _singlePro$user;
    return ((_singlePro$user = singlePro.user) === null || _singlePro$user === void 0 ? void 0 : _singlePro$user.account_status) === "active";
  }).filter(singlePro => {
    return selectedServices.every(service => workerCanDoService(singlePro, service.id, storeDetails.workers));
  }).map(singlePro => {
    var _singlePro$user2, _singlePro$user3;
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: singlePro.id,
      className: "single-pro ".concat(selectedProfessional.id === singlePro.user.id ? "active" : ""),
      onClick: () => {
        setSelectedServices(prevServices => prevServices.map(service => _objectSpread(_objectSpread({}, service), {}, {
          worker_id: singlePro.user.id,
          worker_name: singlePro.user.username
        })));
        setSelectedProfessional({
          id: singlePro.user.id,
          username: singlePro.user.username
        });
      }
    }, (_singlePro$user2 = singlePro.user) !== null && _singlePro$user2 !== void 0 && (_singlePro$user2 = _singlePro$user2.user_info) !== null && _singlePro$user2 !== void 0 && _singlePro$user2.profile_image ? /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      sx: {
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        overflow: "hidden"
      }
    }, ((_singlePro$user3 = singlePro.user) === null || _singlePro$user3 === void 0 || (_singlePro$user3 = _singlePro$user3.user_info) === null || _singlePro$user3 === void 0 ? void 0 : _singlePro$user3.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
      style: {
        width: "100%"
      },
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singlePro.user.user_info.profile_image),
      alt: "user profile img"
    }) : /*#__PURE__*/_react.default.createElement("img", {
      style: {
        width: "100%"
      },
      src: singlePro.user.user_info.profile_image,
      alt: "user profile img"
    })) : /*#__PURE__*/_react.default.createElement(_DummyImage.default, {
      username: singlePro.user.username
    }), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      textAlign: "center",
      sx: {
        fontSize: "18px",
        color: "#333333",
        fontWeight: "600"
      }
    }, singlePro.user.username), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      textAlign: "center",
      sx: {
        fontSize: "16px",
        color: "#333333"
      }
    }, singlePro.user.user_info.designation)));
  }))), indWorker && !isBundleBooking && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    className: "mt-5"
  }, "Select Professional"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "services"
  }, selectedServices.map(singleSer => {
    var _storeDetails$workers3;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "service mt-3",
      key: singleSer.id
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "info",
      sx: {
        width: {
          xs: "100%",
          sm: "50%",
          md: "33%"
        }
      }
    }, /*#__PURE__*/_react.default.createElement("h4", {
      className: "title"
    }, singleSer.title), /*#__PURE__*/_react.default.createElement("p", {
      className: "eta"
    }, singleSer.eta), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
      fullWidth: true,
      className: "mt-2"
    }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
      id: "demo-simple-select-label"
    }, "Select Professional"), /*#__PURE__*/_react.default.createElement(_material.Select, {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: singleSer.worker_id || "",
      label: "Select Professional",
      onChange: e => {
        const selectedPro = storeDetails.workers.find(worker => worker.user.id === e.target.value);
        updateWorkerId(singleSer.id, selectedPro.user.id, selectedPro.user.username);
      }
    }, ((_storeDetails$workers3 = storeDetails.workers) === null || _storeDetails$workers3 === void 0 ? void 0 : _storeDetails$workers3.length) > 0 && storeDetails.workers.filter(singlePro => {
      var _singlePro$user4;
      return ((_singlePro$user4 = singlePro.user) === null || _singlePro$user4 === void 0 ? void 0 : _singlePro$user4.account_status) === "active";
    }).filter(singlePro => workerCanDoService(singlePro, singleSer.id, storeDetails.workers)).map(singlePro => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
      value: singlePro.user.id
    }, singlePro.user.username))))));
  }))), step === 3 && !indWorker && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    className: "mt-5"
  }, "Select Time"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "mt-3"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, currentMonth), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "mt-3"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, settings, dates.map(date => {
    var _storeDetails$working2;
    const isoDate = getISODate(date);
    const isSelected = selectedDate === isoDate;
    const dayName = getFullDayName(date);
    const workingDay = (_storeDetails$working2 = storeDetails.working_hours) === null || _storeDetails$working2 === void 0 ? void 0 : _storeDetails$working2.find(d => d.day.toLowerCase() === dayName.toLowerCase());
    const isDisabled = !workingDay || workingDay.is_closed !== "active";
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: isoDate,
      className: "singleDate",
      sx: {
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.4 : 1
      },
      onClick: () => !isDisabled && handleDateClick(date)
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "day"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: "16px",
        color: "#333333"
      },
      textAlign: "center"
    }, getDayName(date))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "date mt-2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      sx: {
        background: isSelected ? "#D8A7B1" : "transparent",
        border: "1px solid #E4E4E4",
        borderColor: isSelected ? "white" : "#E4E4E4",
        borderRadius: "50%",
        width: "40px",
        height: "40px"
      }
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: "16px",
        color: isSelected ? "white" : "#333"
      }
    }, getDateNumber(date))));
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "timeSlots"
  }, filteredSlots.length > 0 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    className: "mt-4"
  }, filteredSlots.map((slot, index) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: index,
    onClick: () => setSelectedTimeSlot(slot),
    sx: {
      width: "100%",
      padding: "15px 20px",
      borderRadius: "8px",
      border: "1px solid #E0E0E0",
      backgroundColor: selectedTimeSlot === slot ? "#D8A7B1" : "transparent",
      borderColor: selectedTimeSlot === slot ? "#D8A7B1" : "#DADADA",
      color: "black",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "left",
      minWidth: "80px",
      fontSize: "18px"
    }
  }, slot))) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    className: "mt-4",
    sx: {
      color: "#999"
    }
  }, closeStore ? "Store is closed today" : "No Available Slots")))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    ref: sideBarRef,
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
    },
    className: "booking_details"
  }, storeDetails && /*#__PURE__*/_react.default.createElement("div", {
    className: "rating_filter"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      padding: "15px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_info_head",
    display: "flex",
    gap: "20px"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "center",
    sx: {
      width: "30%",
      borderRadius: "10px",
      overflow: "hidden",
      height: "85px"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(storeDetails.thumbnail),
    alt: "Store Img",
    style: {
      width: "100%"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "70%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    sx: {
      fontSize: "32px"
    }
  }, storeDetails.title), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    sx: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "p",
    sx: {
      fontSize: "16px"
    }
  }, averageRating.toFixed(1)), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: averageRating.toFixed(1)
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "p",
    sx: {
      fontSize: "16px",
      color: "#D8A7B1"
    }
  }, "(", storeDetails.reviews.length, ")")), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "p",
    display: "block",
    sx: {
      fontSize: "14px",
      width: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
  }, storeDetails.address))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "100%"
    },
    className: "mt-4"
  }, isBundleBooking && /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    className: "mt-2"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    display: "block",
    variant: "body1",
    sx: {
      fontSize: "18px",
      fontWeight: 600
    }
  }, bundleData.title, " (Bundle)")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      width: "100%"
    },
    className: "mt-4"
  }, selectedServices.map(service => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: service.id,
    display: "flex",
    className: "mt-2",
    justifyContent: "space-between",
    alignItems: "start"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    display: "block",
    variant: "body1",
    sx: {
      fontSize: "18px"
    }
  }, service.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    display: "block",
    variant: "body2",
    sx: {
      fontSize: "16px"
    }
  }, service.eta, !isBundleBooking && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", "with", " ", !service.worker_id ? "any professional" : service.worker_name))), !isBundleBooking && /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "18px"
    }
  }, service.currency, " ", service.price))))))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      paddingInline: "15px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    display: "block",
    variant: "body1",
    sx: {
      fontSize: "18px"
    }
  }, "Subtotal"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    display: "block",
    variant: "body1",
    sx: {
      fontSize: "18px"
    }
  }, displayCurrency, " ", subtotalPrice))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      padding: "15px",
      paddingTop: "0px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between"
  }, step < 3 && /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333",
      color: "white",
      width: "100%",
      borderRadius: "10px"
    },
    variant: "contained",
    onClick: goToNextStep
  }, "Next"), step === 3 && /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333",
      color: "white",
      width: "100%",
      borderRadius: "10px"
    },
    variant: "contained",
    onClick: handleFormSubmit
  }, "Confirm Booking")))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "mobile_next_btn"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "details_mobile"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "18px"
    }
  }, displayCurrency, " ", subtotalPrice), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: "16px",
      color: "#333333a1"
    }
  }, isBundleBooking ? bundleData.title : "".concat(selectedServices.length, " ").concat(selectedServices.length > 1 ? "services" : "service"), " ", "\u2022 ", getTotalEta(selectedServices))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "buttn"
  }, step < 3 && /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333",
      color: "white",
      width: "100%",
      borderRadius: "10px"
    },
    variant: "contained",
    onClick: goToNextStep
  }, "Next"), step === 3 && /*#__PURE__*/_react.default.createElement(_material.Button, {
    sx: {
      background: "#333333",
      color: "white",
      width: "100%",
      borderRadius: "10px"
    },
    variant: "contained",
    onClick: handleFormSubmit
  }, "Confirm Booking"))));
}
var _default = exports.default = BookingPage;
const PrevArrow = _ref2 => {
  let {
    className,
    style,
    onClick
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: className,
    onClick: onClick,
    sx: _objectSpread(_objectSpread({}, style), {}, {
      backgroundColor: "transparent",
      color: "black",
      "&:hover": {
        color: "black"
      },
      position: "absolute",
      left: "90%",
      top: "-25px",
      zIndex: 1
    })
  }, /*#__PURE__*/_react.default.createElement(_ArrowBackIos.default, null));
};
const NextArrow = _ref3 => {
  let {
    className,
    style,
    onClick
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: className,
    onClick: onClick,
    sx: _objectSpread(_objectSpread({}, style), {}, {
      backgroundColor: "transparent",
      color: "black",
      "&:hover": {
        color: "black"
      },
      position: "absolute",
      right: "0",
      top: "-25px",
      zIndex: 1
    })
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};