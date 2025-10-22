"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cards;
var React = _interopRequireWildcard(require("react"));
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _CardActions = _interopRequireDefault(require("@mui/material/CardActions"));
var _CardContent = _interopRequireDefault(require("@mui/material/CardContent"));
var _CardMedia = _interopRequireDefault(require("@mui/material/CardMedia"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _routes = require("../../../routes");
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Cards(_ref) {
  var _storeData$services_c, _storeData$services, _storeData$services_c2, _storeData$working_ho, _storeData$services_c3, _storeData$services_c4, _storeData$services_c5, _storeData$services$l, _storeData$services2, _storeData$working_ho2, _storeData$working_ho3, _storeData$workers$le, _storeData$workers, _storeData$bookings$l, _storeData$bookings, _storeData$reviews$le, _storeData$reviews;
  let {
    storeData
  } = _ref;
  return /*#__PURE__*/React.createElement(_Card.default, {
    sx: {
      maxWidth: 800,
      position: 'relative'
    }
  }, storeData.is_active_by_admin != 1 && /*#__PURE__*/React.createElement(_material.Box, {
    className: "overlay disabledStore"
  }, "This store is disabled by admin"), /*#__PURE__*/React.createElement(_CardMedia.default, {
    sx: {
      height: 300
    },
    image: "".concat(process.env.REACT_APP_IMG_URL).concat(storeData.thumbnail),
    title: storeData.title
  }), /*#__PURE__*/React.createElement(_CardContent.default, null, /*#__PURE__*/React.createElement(_Typography.default, {
    gutterBottom: true,
    variant: "h5",
    component: "div"
  }, storeData.title, storeData.status != 'active' && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'red'
    }
  }, " (Waiting for approval by admin)")), /*#__PURE__*/React.createElement(_Typography.default, {
    gutterBottom: true,
    variant: "h6",
    component: "div",
    sx: {
      color: "text.secondary"
    }
  }, "Address: ", storeData.address), /*#__PURE__*/React.createElement(_Typography.default, {
    variant: "body2",
    sx: {
      color: "text.secondary"
    }
  }, storeData.about ? storeData.about : "No details about this store"), storeData && (storeData === null || storeData === void 0 || (_storeData$services_c = storeData.services_categories) === null || _storeData$services_c === void 0 ? void 0 : _storeData$services_c.length) < 1 && /*#__PURE__*/React.createElement(_material.Alert, {
    severity: "error",
    sx: {
      mb: 2
    }
  }, "Your store doesn't have service categories!\xA0", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id)
  }, "Add now")), storeData && (storeData === null || storeData === void 0 || (_storeData$services = storeData.services) === null || _storeData$services === void 0 ? void 0 : _storeData$services.length) < 1 && /*#__PURE__*/React.createElement(_material.Alert, {
    severity: "error",
    sx: {
      mb: 2
    }
  }, (storeData === null || storeData === void 0 || (_storeData$services_c2 = storeData.services_categories) === null || _storeData$services_c2 === void 0 ? void 0 : _storeData$services_c2.length) < 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, "Your store doesn't have services! You must\xA0", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id)
  }, "add service categories"), "\xA0 before you can add services.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Your store doesn't have services!\xA0", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddServices(storeData.id),
    state: {
      servicesCategories: storeData.services_categories
    }
  }, "Add now"))), storeData && (storeData === null || storeData === void 0 || (_storeData$working_ho = storeData.working_hours) === null || _storeData$working_ho === void 0 ? void 0 : _storeData$working_ho.length) < 1 && /*#__PURE__*/React.createElement(_material.Alert, {
    severity: "error",
    sx: {
      mb: 2
    }
  }, "Your store doesn't have working hours!", " ", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddWorkingHours(storeData.id)
  }, "Add now"))), /*#__PURE__*/React.createElement(_CardActions.default, {
    className: "store_btns"
  }, /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    gap: 2,
    flexWrap: "wrap"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    component: "a",
    to: _routes.ROUTES.getStoreFrontPage(storeData.slug),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "View Store")), /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminEditStore(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Edit store"))), /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    gap: 2,
    flexWrap: "wrap"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddCategory(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Services Categories (", (_storeData$services_c3 = (_storeData$services_c4 = storeData.services_categories) === null || _storeData$services_c4 === void 0 ? void 0 : _storeData$services_c4.length) !== null && _storeData$services_c3 !== void 0 ? _storeData$services_c3 : 0, ")")), (storeData === null || storeData === void 0 || (_storeData$services_c5 = storeData.services_categories) === null || _storeData$services_c5 === void 0 ? void 0 : _storeData$services_c5.length) > 0 && /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddServices(storeData.id),
    state: {
      servicesCategories: storeData.services_categories
    },
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Services (", (_storeData$services$l = (_storeData$services2 = storeData.services) === null || _storeData$services2 === void 0 ? void 0 : _storeData$services2.length) !== null && _storeData$services$l !== void 0 ? _storeData$services$l : 0, ")"))), /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    gap: 2,
    flexWrap: "wrap"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddWorkingHours(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Working Hours (", (_storeData$working_ho2 = (_storeData$working_ho3 = storeData.working_hours) === null || _storeData$working_ho3 === void 0 ? void 0 : _storeData$working_ho3.length) !== null && _storeData$working_ho2 !== void 0 ? _storeData$working_ho2 : 0, ")")), /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddTeamMembers(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Team Members (", (_storeData$workers$le = (_storeData$workers = storeData.workers) === null || _storeData$workers === void 0 ? void 0 : _storeData$workers.length) !== null && _storeData$workers$le !== void 0 ? _storeData$workers$le : 0, ")"))), /*#__PURE__*/React.createElement(_material.Stack, {
    direction: "row",
    gap: 2,
    flexWrap: "wrap"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminBookings(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_material.Badge, {
    badgeContent: storeData === null || storeData === void 0 ? void 0 : storeData.bookings.filter(b => b.is_seen == 'false').length,
    color: "primary"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Bookings (", (_storeData$bookings$l = (_storeData$bookings = storeData.bookings) === null || _storeData$bookings === void 0 ? void 0 : _storeData$bookings.length) !== null && _storeData$bookings$l !== void 0 ? _storeData$bookings$l : 0, ")"))), /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminReviews(storeData.id),
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(_Button.default, {
    size: "small"
  }, "Reviews (", (_storeData$reviews$le = (_storeData$reviews = storeData.reviews) === null || _storeData$reviews === void 0 ? void 0 : _storeData$reviews.length) !== null && _storeData$reviews$le !== void 0 ? _storeData$reviews$le : 0, ")")))));
}