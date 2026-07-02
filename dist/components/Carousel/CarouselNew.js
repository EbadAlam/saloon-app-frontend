"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _RoomOutlined = _interopRequireDefault(require("@mui/icons-material/RoomOutlined"));
var _reactRouterDom = require("react-router-dom");
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
var _LocationOnOutlined = _interopRequireDefault(require("@mui/icons-material/LocationOnOutlined"));
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Carousel(_ref) {
  let {
    stores = []
  } = _ref;
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  };
  const [loadedImages, setLoadedImages] = (0, _react.useState)({});
  const handleImageLoad = index => {
    setLoadedImages(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [index]: true
    }));
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        slidesToScroll: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
      }
    }]
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "carousel store-cards mt-5"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, settings, {
    className: stores.length <= 2 ? "slider-start" : ""
  }), stores && stores.filter(store => store.status === "active" && store.is_active_by_admin == 1).map(singleStore => {
    const averageRating = calculateAverageRating(singleStore.reviews);
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      style: {
        display: "block"
      },
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "store-card"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "store-img"
    }, !loadedImages[singleStore.id] && /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "image-loader"
    }, /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
      color: "white"
    })), /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL).concat(singleStore.thumbnail),
      alt: "",
      onLoad: () => handleImageLoad(singleStore.id),
      onError: () => handleImageLoad(singleStore.id)
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "store-info"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "store-title"
    }, /*#__PURE__*/_react.default.createElement("h3", null, singleStore.title)), /*#__PURE__*/_react.default.createElement("div", {
      className: "store-address"
    }, /*#__PURE__*/_react.default.createElement(_LocationOnOutlined.default, null), /*#__PURE__*/_react.default.createElement("p", null, singleStore.address)), /*#__PURE__*/_react.default.createElement("div", {
      className: "rating-reviews"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "rating"
    }, /*#__PURE__*/_react.default.createElement(_Star.default, null), /*#__PURE__*/_react.default.createElement("span", null, averageRating)), /*#__PURE__*/_react.default.createElement("div", {
      className: "reviews"
    }, /*#__PURE__*/_react.default.createElement("p", null, "(", singleStore.reviews.length == 1 ? "".concat(singleStore.reviews.length, " Review") : "".concat(singleStore.reviews.length, " Reviews"), ")"))), /*#__PURE__*/_react.default.createElement("hr", {
      className: "divider"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "card-footer"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "start-from"
    }, /*#__PURE__*/_react.default.createElement("p", null, "starting from ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "PKR 50"))), /*#__PURE__*/_react.default.createElement("div", {
      className: "book-now"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getBookingPage(singleStore.slug)
    }, /*#__PURE__*/_react.default.createElement("button", null, "Book Now")))))));
  })));
}
var _default = exports.default = Carousel;
const PrevArrow = _ref2 => {
  let {
    className,
    style,
    onClick
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "arrow-prev-custom custom-arrow",
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};
const NextArrow = _ref3 => {
  let {
    className,
    style,
    onClick
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "arrow-next-custom custom-arrow",
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};