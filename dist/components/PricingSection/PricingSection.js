"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _DoneOutlined = _interopRequireDefault(require("@mui/icons-material/DoneOutlined"));
require("./PricingSection.scss");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function PricingSection() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "pricing-section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "sub_heading"
  }, "Plans"), /*#__PURE__*/_react.default.createElement("h2", {
    className: "heading"
  }, "Simple, Transparent Pricing"), /*#__PURE__*/_react.default.createElement("p", {
    className: "desc"
  }, "Choose the perfect plan to grow your beauty business")), /*#__PURE__*/_react.default.createElement("div", {
    className: "pricing-plans"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Starter"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "Perfect for individual professionals starting out")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "Free"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "forever")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Basic profile listing")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Up to 5 portfolio images")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Receive bookings")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Basic analytics")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Email support")))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup,
    className: "get-started"
  }, "Get started"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan popular"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "badge"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide lucide-sparkles w-3.5 h-3.5"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 3v4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22 5h-4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M4 17v2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M5 18H3"
  })), /*#__PURE__*/_react.default.createElement("p", null, "most popular")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Professional"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "Most popular choice for growing businesses")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "PKR 2,999"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "per month")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Premium profile placement")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Unlimited portfolio images")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Priority bookings")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Advanced analytics & insights")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Priority support")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Featured in search results")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Custom booking page")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Promotional tools")))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup,
    className: "get-started"
  }, "Get started"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-header"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "plan-title"
  }, "Premium"), /*#__PURE__*/_react.default.createElement("p", {
    className: "plan-desc"
  }, "For established businesses that want it all")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-price"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "price"
  }, "PKR 4,999"), /*#__PURE__*/_react.default.createElement("p", {
    className: "billing-cycle"
  }, "per month")), /*#__PURE__*/_react.default.createElement("hr", {
    className: "divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plan-features"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "features-list"
  }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Everything in Professional")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Top placement guarantee")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Verified badge")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Social media integration")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Dedicated account manager")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "Marketing campaigns")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "API access")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DoneOutlined.default, null)), /*#__PURE__*/_react.default.createElement("p", null, "White-label options")))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup,
    className: "get-started"
  }, "Get started"))))));
}
var _default = exports.default = PricingSection;