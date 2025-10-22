"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
var _PlayArrowOutlined = _interopRequireDefault(require("@mui/icons-material/PlayArrowOutlined"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _ChatBubble = _interopRequireDefault(require("@mui/icons-material/ChatBubble"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ForBusiness() {
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "mainDiv for_business"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "first_section"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container",
    sx: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, "The #01 Software for salons and spas"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Simple flexible and powerful booking software for your business."), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "buttons mt-5"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.ownerLogin
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "get_started"
  }, "Get started now")), /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "watch_overview"
  }, /*#__PURE__*/_react.default.createElement(_PlayArrowOutlined.default, null), "Watch an overview")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "img mt-5"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/for_business_page_img.png"),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "ratings"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single_rat"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon_title"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "25",
    height: "26",
    viewBox: "0 0 25 26",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M6.86487 14.1274L8.44923 14.5583C9.45951 14.8341 9.96332 14.9719 10.316 15.3246C10.6687 15.6773 10.8065 16.1811 11.081 17.1901L11.5132 18.7757C12.7449 23.2902 13.3601 25.5467 14.7124 25.621C16.0648 25.6926 16.9186 23.5129 18.6236 19.1563L23.3038 7.19465C24.6429 3.77403 25.3124 2.06239 24.4453 1.1953C23.5782 0.328207 21.8666 0.997748 18.446 2.33683L6.48436 7.01699C2.1277 8.72201 -0.0519598 9.57584 0.0196348 10.9282C0.0912293 12.2805 2.34911 12.8944 6.86487 14.1274Z",
    fill: "#333333"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Captera"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rate"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, null), "4.0")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single_rat"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon_title"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "33",
    height: "32",
    viewBox: "0 0 33 32",
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M30.4219 1.875H2.85938C1.578 1.875 0.609375 2.84362 0.609375 4.125V27.75C0.609375 29.0314 1.57794 30.125 2.85938 30.125H30.2969C31.5783 30.125 32.6094 29.0314 32.6094 27.75V4.125C32.6094 2.84356 31.7033 1.875 30.4219 1.875ZM18.474 15.2766L21.5479 17.9963V9.71506H24.0479V17.9964L27.1217 15.2766L28.7784 17.1489L22.7979 22.4405L16.8174 17.1489L18.474 15.2766ZM6.68344 17.5704L4.91569 15.8026L9.34281 11.3756L4.91569 6.94838L6.68344 5.18062L12.8784 11.3756L6.68344 17.5704ZM29.2969 27.0625H16.3594V24.5625H29.2969V27.0625Z",
    fill: "#333333"
  }))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Get App"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rate"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, null), "5.0")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single_rat"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon_title"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, {
    fontSize: "large"
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Trustpilot"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rate"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, null), "3.5")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "single_rat"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon_title"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_ChatBubble.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Software"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "rate"
  }, /*#__PURE__*/_react.default.createElement(_Star.default, null), "5.0"))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "count_info mt-5"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "150,000+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Partner businesses")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "110+ countries"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "using BeautyTrafic")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "350,000+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Stylists & professionals")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "partners"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "350,000+"), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3"
  }, "Stylists & professionals")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "bg_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/for_business_page_img_bg.png"),
    alt: ""
  }))));
}
var _default = exports.default = ForBusiness;