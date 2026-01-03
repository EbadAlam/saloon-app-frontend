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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function StoreCard(_ref) {
  let {
    storeDetails
  } = _ref;
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "";
  };
  const rating = calculateAverageRating(storeDetails.reviews);
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreFrontPage(storeDetails.slug),
    className: "store",
    key: storeDetails.id
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_image"
  }, storeDetails.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(storeDetails.thumbnail),
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/store-dummy-img.png"),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "store_content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, storeDetails.title), rating ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    gap: "5px",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, {
    style: {
      color: '#ffc800'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    style: {
      fontWeight: '700'
    }
  }, rating), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    style: {
      color: 'grey'
    }
  }, "(", storeDetails.reviews.length, ")")) : ''), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    sx: {
      marginTop: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginTop: "2px !important"
    }
  }, storeDetails.address)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, storeDetails.type)));
}
var _default = exports.default = StoreCard;