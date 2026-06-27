"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _UserSidebar = _interopRequireDefault(require("../../components/UserSidebar/UserSidebar"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _AuthContext = require("../../contexts/AuthContext");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AppointmentsPage() {
  var _location$state;
  const location = (0, _reactRouterDom.useLocation)();
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [upBookings, setUpBookings] = (0, _react.useState)([]);
  const [pastBookings, setPastBookings] = (0, _react.useState)([]);
  const [store, setStore] = (0, _react.useState)({});
  const [successMessage, setSuccessMessage] = (0, _react.useState)(((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.successMessage) || "");
  (0, _react.useEffect)(() => {
    if (successMessage) {
      showSnackbar(successMessage, "success");
    }
  }, [successMessage]);
  (0, _react.useEffect)(() => {
    const fetchUserBookings = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get("/getUserBookings/".concat(user.id));
        setUpBookings(data.upcomingBookings);
        setPastBookings(data.pastBookings);
        setStore(data.upcomingBookings.length > 0 ? data.upcomingBookings[0] : data.pastBookings.length > 0 ? data.pastBookings[0] : '');
      } catch (error) {
        console.error('Error fetching user fav stores ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, [user.id]);
  function formatBookingDate(date, time) {
    const dateTime = new Date("".concat(date, "T").concat(time));
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(dateTime);
  }
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : 'N/A';
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex"
  }, /*#__PURE__*/_react.default.createElement(_UserSidebar.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Appointments"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bookings"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "upcomming_bookings",
    sx: {
      marginTop: '40px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: '26px',
      fontFamily: 'Barlow'
    }
  }, "Upcomming", upBookings && upBookings.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Badge, {
    sx: {
      marginLeft: '20px',
      '& .MuiBadge-badge': {
        backgroundColor: '#333333',
        color: '#fff'
      }
    },
    badgeContent: upBookings.length,
    color: "success"
  })), upBookings && upBookings.length > 0 ? upBookings.map(singleBooking => {
    var _singleBooking$store, _singleBooking$store2, _singleBooking$store3, _singleBooking$store4, _singleBooking$store5, _singleBooking$store6, _singleBooking$worker, _singleBooking$worker2, _singleBooking$servic, _singleBooking$servic2, _singleBooking$worker3, _singleBooking$worker4, _singleBooking$servic3, _singleBooking$servic4;
    const avgRating = calculateAverageRating((_singleBooking$store = singleBooking.store) === null || _singleBooking$store === void 0 ? void 0 : _singleBooking$store.reviews);
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: singleBooking.id,
      className: "bookingMain ".concat(store.id == singleBooking.id ? 'active' : ''),
      onClick: () => {
        setStore(singleBooking);
      }
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "img"
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat((_singleBooking$store2 = singleBooking.store) === null || _singleBooking$store2 === void 0 ? void 0 : _singleBooking$store2.thumbnail),
      alt: ""
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "overlay"
    }), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_title"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_singleBooking$store3 = singleBooking.store) === null || _singleBooking$store3 === void 0 ? void 0 : _singleBooking$store3.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '32px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$store4 = singleBooking.store) === null || _singleBooking$store4 === void 0 ? void 0 : _singleBooking$store4.title))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '14px',
        fontFamily: 'Barlow',
        fontWeight: '600'
      }
    }, avgRating), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      size: "small",
      rating: avgRating
    }), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: '#D8A7B1',
        fontSize: '16px'
      }
    }, "(", (_singleBooking$store5 = singleBooking.store) === null || _singleBooking$store5 === void 0 || (_singleBooking$store5 = _singleBooking$store5.reviews) === null || _singleBooking$store5 === void 0 ? void 0 : _singleBooking$store5.length, ")")), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_address"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '14px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$store6 = singleBooking.store) === null || _singleBooking$store6 === void 0 ? void 0 : _singleBooking$store6.address))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "worker_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_title"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$worker = singleBooking.worker) === null || _singleBooking$worker === void 0 ? void 0 : _singleBooking$worker.username), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '16px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$worker2 = singleBooking.worker) === null || _singleBooking$worker2 === void 0 || (_singleBooking$worker2 = _singleBooking$worker2.user_info) === null || _singleBooking$worker2 === void 0 ? void 0 : _singleBooking$worker2.designation)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "service_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      gap: "10px"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic = singleBooking.service) === null || _singleBooking$servic === void 0 ? void 0 : _singleBooking$servic.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "capitalize",
        color: singleBooking.status === "pending" ? "orange" : singleBooking.status === "cancelled" ? "red" : singleBooking.status === "completed" ? "green" : "inherit"
      }
    }, singleBooking.status)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic2 = singleBooking.service) === null || _singleBooking$servic2 === void 0 ? void 0 : _singleBooking$servic2.eta, " with ", (_singleBooking$worker3 = singleBooking.worker) !== null && _singleBooking$worker3 !== void 0 && _singleBooking$worker3.username ? (_singleBooking$worker4 = singleBooking.worker) === null || _singleBooking$worker4 === void 0 ? void 0 : _singleBooking$worker4.username : 'any professional')), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic3 = singleBooking.service) === null || _singleBooking$servic3 === void 0 ? void 0 : _singleBooking$servic3.currency, " ", (_singleBooking$servic4 = singleBooking.service) === null || _singleBooking$servic4 === void 0 ? void 0 : _singleBooking$servic4.price))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "time_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, new Date("1970-01-01T".concat(singleBooking.booking_time)).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    }), " - ", new Date("1970-01-01T".concat(singleBooking.booking_time_end)).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, singleBooking.booking_date.split("-").reverse().join("/"))))));
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "noBookings"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: '22px',
      fontFamily: 'Barlow'
    }
  }, "No upcoming appointments"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '20px',
      fontFamily: 'Barlow'
    }
  }, "Your upcoming appointments will appear here when you book"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.searchPage
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "search_btn",
    variant: "contained"
  }, "Search salons")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "past_bookings",
    sx: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: '26px',
      fontFamily: 'Barlow'
    }
  }, "Past", pastBookings && pastBookings.length > 0 && /*#__PURE__*/_react.default.createElement(_material.Badge, {
    sx: {
      marginLeft: '20px',
      '& .MuiBadge-badge': {
        backgroundColor: '#333333',
        color: '#fff'
      }
    },
    badgeContent: pastBookings.length,
    color: "success"
  })), pastBookings && pastBookings.length > 0 ? pastBookings.map(singleBooking => {
    var _singleBooking$store7, _singleBooking$store8, _singleBooking$store9, _singleBooking$store0, _singleBooking$store1, _singleBooking$store10, _singleBooking$worker5, _singleBooking$worker6, _singleBooking$servic5, _singleBooking$servic6, _singleBooking$worker7, _singleBooking$worker8, _singleBooking$servic7, _singleBooking$servic8;
    const avgRating = calculateAverageRating((_singleBooking$store7 = singleBooking.store) === null || _singleBooking$store7 === void 0 ? void 0 : _singleBooking$store7.reviews);
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "bookingMain ".concat(store.id == singleBooking.id ? 'active' : ''),
      onClick: () => {
        setStore(singleBooking);
      }
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "img"
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat((_singleBooking$store8 = singleBooking.store) === null || _singleBooking$store8 === void 0 ? void 0 : _singleBooking$store8.thumbnail),
      alt: ""
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "overlay"
    }), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_title"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_singleBooking$store9 = singleBooking.store) === null || _singleBooking$store9 === void 0 ? void 0 : _singleBooking$store9.slug)
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '32px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$store0 = singleBooking.store) === null || _singleBooking$store0 === void 0 ? void 0 : _singleBooking$store0.title))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '14px',
        fontFamily: 'Barlow',
        fontWeight: '600'
      }
    }, avgRating), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      size: "small",
      rating: avgRating
    }), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: '#D8A7B1',
        fontSize: '16px'
      }
    }, "(", (_singleBooking$store1 = singleBooking.store) === null || _singleBooking$store1 === void 0 || (_singleBooking$store1 = _singleBooking$store1.reviews) === null || _singleBooking$store1 === void 0 ? void 0 : _singleBooking$store1.length, ")")), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_address"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '14px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$store10 = singleBooking.store) === null || _singleBooking$store10 === void 0 ? void 0 : _singleBooking$store10.address))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "worker_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_title"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$worker5 = singleBooking.worker) === null || _singleBooking$worker5 === void 0 ? void 0 : _singleBooking$worker5.username), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '16px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$worker6 = singleBooking.worker) === null || _singleBooking$worker6 === void 0 || (_singleBooking$worker6 = _singleBooking$worker6.user_info) === null || _singleBooking$worker6 === void 0 ? void 0 : _singleBooking$worker6.designation)))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "booking_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "service_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
      display: "flex",
      gap: "10px"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic5 = singleBooking.service) === null || _singleBooking$servic5 === void 0 ? void 0 : _singleBooking$servic5.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "capitalize",
        color: singleBooking.status === "pending" ? "orange" : singleBooking.status === "cancelled" ? "red" : singleBooking.status === "completed" ? "green" : "inherit"
      }
    }, singleBooking.status)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "body1",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic6 = singleBooking.service) === null || _singleBooking$servic6 === void 0 ? void 0 : _singleBooking$servic6.eta, " with ", (_singleBooking$worker7 = singleBooking.worker) !== null && _singleBooking$worker7 !== void 0 && _singleBooking$worker7.username ? (_singleBooking$worker8 = singleBooking.worker) === null || _singleBooking$worker8 === void 0 ? void 0 : _singleBooking$worker8.username : 'any professional')), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, (_singleBooking$servic7 = singleBooking.service) === null || _singleBooking$servic7 === void 0 ? void 0 : _singleBooking$servic7.currency, " ", (_singleBooking$servic8 = singleBooking.service) === null || _singleBooking$servic8 === void 0 ? void 0 : _singleBooking$servic8.price))), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "time_info"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, new Date("1970-01-01T".concat(singleBooking.booking_time)).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    }), " - ", new Date("1970-01-01T".concat(singleBooking.booking_time_end)).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    }))), /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3",
      sx: {
        fontSize: '18px',
        fontFamily: 'Barlow'
      }
    }, new Date(singleBooking.booking_date).toLocaleDateString("en-GB"))))));
  }) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "noBookings"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: '22px',
      fontFamily: 'Barlow'
    }
  }, "No appointments")))))))));
}
var _default = exports.default = AppointmentsPage;