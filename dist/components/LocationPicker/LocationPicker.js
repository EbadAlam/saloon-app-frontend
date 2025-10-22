"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const LocationPicker = _ref => {
  let {
    onChange,
    initialPosition = ""
  } = _ref;
  const [position, setPosition] = (0, _react.useState)(null);
  const [address, setAddress] = (0, _react.useState)("");
  const [MapComponents, setMapComponents] = (0, _react.useState)(null);
  const [leafletLib, setLeafletLib] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  (0, _react.useEffect)(() => {
    if (typeof window !== "undefined") {
      Promise.all([Promise.resolve().then(() => _interopRequireWildcard(require("leaflet"))), Promise.resolve().then(() => _interopRequireWildcard(require("react-leaflet")))]).then(_ref2 => {
        let [Leaflet, ReactLeaflet] = _ref2;
        delete Leaflet.Icon.Default.prototype._getIconUrl;
        Leaflet.Icon.Default.mergeOptions({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        });
        setLeafletLib(Leaflet);
        setMapComponents(ReactLeaflet);
      });
    }
  }, []);
  const handleConfirm = async () => {
    if (position) {
      try {
        const res = await fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=".concat(position === null || position === void 0 ? void 0 : position.lat, "&lon=").concat(position === null || position === void 0 ? void 0 : position.lng));
        const data = await res.json();
        const addr = (data === null || data === void 0 ? void 0 : data.display_name) || "";
        setAddress(addr);
        onChange({
          lat: position === null || position === void 0 ? void 0 : position.lat,
          lng: position === null || position === void 0 ? void 0 : position.lng,
          address: addr
        });
      } catch (error) {
        console.error("Failed to fetch address:", error);
        onChange({
          lat: position.lat,
          lng: position.lng,
          address: ""
        });
      }
    }
  };
  const handleAddressChange = async e => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    if (newAddress.length > 3) {
      try {
        const res = await fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(newAddress)));
        const results = await res.json();
        if (results && results[0]) {
          const {
            lat,
            lon
          } = results[0];
          const newPos = {
            lat: parseFloat(lat),
            lng: parseFloat(lon)
          };
          setPosition(newPos);
          onChange(_objectSpread(_objectSpread({}, newPos), {}, {
            address: newAddress
          }));
        }
      } catch (error) {
        console.error("Failed to search address:", error);
      }
    }
  };
  if (!MapComponents || !leafletLib) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: "400px",
        background: "#eee"
      }
    }, "Loading map...");
  }
  const {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents
  } = MapComponents;
  function RecenterMap(_ref3) {
    let {
      position
    } = _ref3;
    const map = useMap();
    (0, _react.useEffect)(() => {
      if (position) {
        map.setView([position === null || position === void 0 ? void 0 : position.lat, position.lng], map.getZoom());
      }
    }, [position, map]);
    return null;
  }
  const LocationMarker = _ref4 => {
    let {
      position,
      setPosition
    } = _ref4;
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      }
    });
    return position ? /*#__PURE__*/_react.default.createElement(Marker, {
      position: [position === null || position === void 0 ? void 0 : position.lat, position === null || position === void 0 ? void 0 : position.lng]
    }) : null;
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Search Address",
    value: address,
    onChange: handleAddressChange,
    margin: "normal"
  }), /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react.default.createElement("div", null, "Loading map...")
  }, /*#__PURE__*/_react.default.createElement(MapContainer, {
    center: [(position === null || position === void 0 ? void 0 : position.lat) || 24.8607, (position === null || position === void 0 ? void 0 : position.lng) || 67.0011],
    zoom: 13,
    style: {
      height: "400px",
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react.default.createElement(LocationMarker, {
    position: position,
    setPosition: setPosition
  }), /*#__PURE__*/_react.default.createElement(RecenterMap, {
    position: position
  }))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    sx: {
      mt: 2
    },
    onClick: handleConfirm,
    disabled: !position
  }, "Confirm Location"));
};
var _default = exports.default = LocationPicker;