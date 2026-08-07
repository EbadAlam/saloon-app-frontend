"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _StarRating = _interopRequireDefault(require("../StarRating/StarRating"));
var _LocationPin = _interopRequireDefault(require("@mui/icons-material/LocationPin"));
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _LocationOnOutlined = _interopRequireDefault(require("@mui/icons-material/LocationOnOutlined"));
require("./StoreCard.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function StoreCard(_ref) {
  let {
    storeDetails
  } = _ref;
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "0";
  };
  const averageRating = calculateAverageRating(storeDetails.reviews);
  // console.log('averageRating: ',storeDetails.title,averageRating);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "store-card"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    style: {
      display: "block"
    },
    to: _routes.ROUTES.getStoreFrontPage(storeDetails.slug)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "store-img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(storeDetails.thumbnail),
    alt: ""
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "store-info"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    style: {
      display: "block"
    },
    to: _routes.ROUTES.getStoreFrontPage(storeDetails.slug)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "store-title"
  }, /*#__PURE__*/_react.default.createElement("h3", null, storeDetails.title))), /*#__PURE__*/_react.default.createElement("div", {
    className: "store-address"
  }, /*#__PURE__*/_react.default.createElement(_LocationOnOutlined.default, null), /*#__PURE__*/_react.default.createElement("p", null, storeDetails.address)), /*#__PURE__*/_react.default.createElement("div", {
    className: "rating-reviews"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "rating"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, null), /*#__PURE__*/_react.default.createElement("span", null, averageRating)), /*#__PURE__*/_react.default.createElement("div", {
    className: "reviews"
  }, /*#__PURE__*/_react.default.createElement("p", null, "(", storeDetails.reviews.length == 1 ? "".concat(storeDetails.reviews.length, " Review") : "".concat(storeDetails.reviews.length, " Reviews"), ")"))), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "start-from"
  }, /*#__PURE__*/_react.default.createElement("p", null, "starting from ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "PKR 50"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "book-now"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getBookingPage(storeDetails.slug)
  }, /*#__PURE__*/_react.default.createElement("button", null, "Book Now"))))));
}
var _default = exports.default = StoreCard;