"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _reactSlick = _interopRequireDefault(require("react-slick"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CustomGallery = _ref => {
  let {
    images = [],
    thumbnail = null,
    slug
  } = _ref;
  const allImages = thumbnail ? [{
    image: thumbnail
  }, ...images] : images;
  const sliderSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "gallerySlider"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, sliderSettings, {
    infinite: allImages.length > 1
  }), allImages.map((imgObj, idx) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: idx,
    className: "gallerySlide"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(imgObj.image),
    alt: "Slide ".concat(idx)
  })))));
};
var _default = exports.default = CustomGallery;