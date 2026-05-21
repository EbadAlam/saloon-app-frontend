"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _StarRating = _interopRequireDefault(require("../StarRating/StarRating"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ReviewsSlider(_ref) {
  let {
    reviews
  } = _ref;
  const reivewsSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: /*#__PURE__*/_react.default.createElement(NextArrow, null),
    prevArrow: /*#__PURE__*/_react.default.createElement(PrevArrow, null)
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (reviews === null || reviews === void 0 ? void 0 : reviews.length) > 0 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews_div"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/reviews-bg-img.png"),
    alt: "",
    className: "bg_img"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "happy customer thoughts"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "reviews"
  }, /*#__PURE__*/_react.default.createElement(_reactSlick.default, reivewsSliderSettings, reviews.map(singleReview => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "review",
    key: singleReview.id
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, singleReview.review), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: singleReview.rating,
    color: "gold"
    // color="#ebe0ff"
    ,
    size: "large"
  })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "~", singleReview.reviewer.username))))))));
}
var _default = exports.default = ReviewsSlider;
const PrevArrow = _ref2 => {
  let {
    className,
    style,
    onClick
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    className: "arrow-prev-custom",
    onClick: onClick,
    sx: {
      color: "black",
      "&:hover": {
        color: "black",
        background: "transparent !important"
      },
      svg: {
        fontSize: "50px"
      },
      position: "absolute",
      left: "-35%",
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowBackIos.default, null));
};
const NextArrow = _ref3 => {
  let {
    className,
    style,
    onClick
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: onClick,
    className: "arrow-next-custom",
    sx: {
      color: "black",
      "&:hover": {
        color: "black",
        background: "transparent !important"
      },
      svg: {
        fontSize: "50px"
      },
      position: "absolute",
      right: "-35%",
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null));
};