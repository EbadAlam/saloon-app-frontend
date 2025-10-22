"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
require("./index.css");
var _App = _interopRequireDefault(require("./App"));
var _reportWebVitals = _interopRequireDefault(require("./reportWebVitals"));
var _AuthContext = require("./contexts/AuthContext");
var _SnackBarContext = require("./contexts/SnackBarContext");
var _reactRouterDom = require("react-router-dom");
var _reactHelmetAsync = require("react-helmet-async");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const rootElement = document.getElementById("root");
const initialData = window.__INITIAL_DATA__ || {};
const helmetContext = {};
const app = /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.HelmetProvider, {
  context: helmetContext
}, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_AuthContext.AuthProvider, null, /*#__PURE__*/_react.default.createElement(_SnackBarContext.SnackbarProvider, null, /*#__PURE__*/_react.default.createElement(_App.default, {
  initialData: initialData.storeDetails
}))))));
if (rootElement.hasChildNodes()) {
  (0, _client.hydrateRoot)(rootElement, app);
  console.log("✅ Hydration complete");
} else {
  (0, _client.createRoot)(rootElement).render(app);
  console.log("✅ client-side render complete");
}
(0, _reportWebVitals.default)();