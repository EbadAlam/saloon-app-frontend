"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Cards = _interopRequireDefault(require("../Cards/Cards"));
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function SingleStore() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [storeData, setStoreData] = (0, _react.useState)({});
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const fetchStoreDetails = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get("/getStoreDetails/".concat(storeId));
        setStoreData(data.storeDetails);
        setLoading(false);
      } catch (error) {
        console.error('error fetching store details: ', error);
      }
    };
    fetchStoreDetails();
  }, [storeId]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "end"
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "vendorSingleStorePage mt-4"
  }, loading ? /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "50%",
    height: 400
  }) : /*#__PURE__*/_react.default.createElement(_Cards.default, {
    storeData: storeData
  }))));
}
var _default = exports.default = SingleStore;