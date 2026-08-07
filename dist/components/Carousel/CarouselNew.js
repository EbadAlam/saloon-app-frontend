"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _StoreCard = _interopRequireDefault(require("../StoreCard/StoreCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Carousel(_ref) {
  let {
    stores = []
  } = _ref;
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
    return /*#__PURE__*/_react.default.createElement(_StoreCard.default, {
      storeDetails: singleStore
    });
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