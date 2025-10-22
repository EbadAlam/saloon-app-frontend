"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _Search = _interopRequireDefault(require("@mui/icons-material/Search"));
var _AccessTimeOutlined = _interopRequireDefault(require("@mui/icons-material/AccessTimeOutlined"));
var _DateRange = _interopRequireDefault(require("@mui/icons-material/DateRange"));
var _Seperator = _interopRequireDefault(require("../Seperator/Seperator"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _routes = require("../../routes");
var _reactRouterDom = require("react-router-dom");
var _ArrowForward = _interopRequireDefault(require("@mui/icons-material/ArrowForward"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TIME_OPTIONS = Array.from({
  length: 24
}, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const suffix = i < 12 ? 'AM' : 'PM';
  return "".concat(hour, ":00 ").concat(suffix);
});
let debounceTimer;
function SearchBar() {
  const [service, setService] = (0, _react.useState)('');
  const [location, setLocation] = (0, _react.useState)('');
  const [suggestions, setSuggestions] = (0, _react.useState)([]);
  const [hasTyped, setHasTyped] = (0, _react.useState)(false);
  const [locationLoading, setLcoationLoading] = (0, _react.useState)(false);
  const [serviceOptions, setServiceOptions] = (0, _react.useState)([]);
  const [showTimeBox, setShowTimeBox] = (0, _react.useState)(false);
  const [startTime, setStartTime] = (0, _react.useState)('');
  const [endTime, setEndTime] = (0, _react.useState)('');
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const locationHook = (0, _reactRouterDom.useLocation)();
  (0, _react.useEffect)(() => {
    const fetchCombinedCategories = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get('/getCombinedCategories');
        setServiceOptions(data.categories.map(cat => capitalize(cat)));
      } catch (err) {
        console.error('Error fetching categories ', err);
      }
    };
    fetchCombinedCategories();
  }, []);
  (0, _react.useEffect)(() => {
    const params = new URLSearchParams(locationHook.search);
    const serviceParam = params.get('service') || '';
    const locationParam = params.get('location') || '';
    const startParam = params.get('startTime') || '';
    const endParam = params.get('endTime') || '';
    setService(serviceParam);
    setLocation(locationParam);
    setStartTime(startParam);
    setEndTime(endParam);
  }, [locationHook.search]);
  const fetchLocationSuggestions = async input => {
    // if (!input) return;
    // setLcoationLoading(true);
    // try {
    //   const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`);
    //   const data = await res.json();
    //   const results = data.map((item) => item.display_name);
    //   setSuggestions(['Use Current Location', ...results]);
    // } catch (error) {
    //   console.error('Error fetching location suggestions:', error);
    // } finally {
    //   setLcoationLoading(false);
    // }
  };
  (0, _react.useEffect)(() => {
    if (!hasTyped || location.trim() === '') return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchLocationSuggestions(location);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [location, hasTyped]);
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      showSnackbar('Geolocation is not supported by your browser.', 'warning');
      return;
    }
    setLcoationLoading(true);
    navigator.geolocation.getCurrentPosition(async position => {
      const {
        latitude,
        longitude
      } = position.coords;
      try {
        const res = await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=".concat(latitude, "&lon=").concat(longitude));
        const data = await res.json();
        const address = data.display_name || 'Current Location';
        setLocation(address);
      } catch (error) {
        console.error('Error during reverse geocoding:', error);
      } finally {
        setLcoationLoading(false);
      }
    }, err => {
      showSnackbar('Failed to get your location. Please allow access.', 'warning');
      console.error(err);
    });
  };
  const handleTimePreset = type => {
    if (type === 'all time') {
      setStartTime('');
      setEndTime('');
    } else if (type === 'morning') {
      setStartTime('6:00 AM');
      setEndTime('11:00 AM');
    } else if (type === 'afternoon') {
      setStartTime('11:00 AM');
      setEndTime('5:00 PM');
    } else if (type === 'evening') {
      setStartTime('5:00 PM');
      setEndTime('11:00 PM');
    }
  };
  const timeBoxRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    function handleClickOutside(event) {
      if (timeBoxRef.current && timeBoxRef.current.contains(event.target)) {
        return;
      }
      if (event.target.closest('.MuiPopover-root')) {
        return;
      }
      setShowTimeBox(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const isMobile = (0, _material.useMediaQuery)("(max-width:600px)");
  const CustomPopper = props => {
    var _props$anchorEl;
    return /*#__PURE__*/_react.default.createElement(_material.Popper, _extends({}, props, {
      style: {
        width: "auto",
        minWidth: (_props$anchorEl = props.anchorEl) === null || _props$anchorEl === void 0 ? void 0 : _props$anchorEl.clientWidth
      },
      placement: "bottom-start"
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "searchBarDiv gradient-border",
    display: "flex",
    justifyContent: "end",
    flexWrap: "wrap"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "movingBorder",
    sx: {
      position: 'absolute',
      padding: '16px',
      zIndex: -1,
      overflow: 'hidden',
      top: '-5px',
      left: '-5px',
      right: '-5px',
      bottom: '-5px',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        zIndex: -1,
        borderRadius: '9999px',
        background: 'linear-gradient(270deg, #D8A7B1, #ffffff, #D8A7B1)',
        backgroundSize: '600% 600%',
        animation: 'gradientMove 8s linear infinite'
      },
      '@keyframes gradientMove': {
        '0%': {
          backgroundPosition: '0% 50%'
        },
        '100%': {
          backgroundPosition: '100% 50%'
        }
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "white-bg"
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "inputDivMain",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    sx: {
      width: '85%'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input_services inputDiv",
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_Search.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input"
  }, /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    freeSolo: true,
    options: serviceOptions,
    value: service,
    onChange: (e, newValue) => setService(newValue),
    onInputChange: (e, newInput) => setService(newInput),
    clearIcon: isMobile ? null : undefined,
    PopperComponent: CustomPopper,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      placeholder: "All treatments and venues",
      variant: "standard"
    }))
  }))), /*#__PURE__*/_react.default.createElement(_Seperator.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input_location inputDiv",
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, locationLoading ? /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: "20px"
  }) : /*#__PURE__*/_react.default.createElement(_AccessTimeOutlined.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input"
  }, /*#__PURE__*/_react.default.createElement(_material.Autocomplete, {
    freeSolo: true,
    options: hasTyped ? suggestions : ['Current Location'],
    inputValue: location,
    PopperComponent: CustomPopper,
    clearIcon: isMobile ? null : undefined,
    onInputChange: (e, value, reason) => {
      setLocation(value);
      setHasTyped(reason === 'input');
    },
    onChange: (e, newValue) => {
      if (!newValue) {
        setLocation('');
        return;
      }
      if (newValue === 'Current Location') {
        handleUseCurrentLocation();
      } else {
        setLocation(newValue);
      }
    },
    renderInput: params => /*#__PURE__*/_react.default.createElement(_material.TextField, _extends({}, params, {
      placeholder: "Current Location",
      variant: "standard",
      onFocus: () => {
        setSuggestions(['Current Location']);
        setHasTyped(false);
      }
    }))
  }))), /*#__PURE__*/_react.default.createElement(_Seperator.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input_time inputDiv",
    display: "flex",
    alignItems: "center",
    position: "relative"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement(_DateRange.default, null)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "input"
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    variant: "standard",
    placeholder: "Time",
    value: startTime && endTime ? "".concat(startTime, " - ").concat(endTime) : '',
    onFocus: () => setShowTimeBox(true),
    autoComplete: "off"
  })), showTimeBox && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "time-box",
    ref: timeBoxRef,
    sx: {
      position: 'absolute',
      top: '60px',
      left: 0,
      mt: 1,
      background: '#fff8f0',
      boxShadow: 3,
      borderRadius: 1,
      zIndex: 10,
      p: 2,
      width: 400
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
    flexWrap: "wrap",
    rowGap: "10px"
  }, ['All Time', 'Morning', 'Afternoon', 'Evening'].map(label => /*#__PURE__*/_react.default.createElement(_material.Button, {
    key: label,
    onClick: () => handleTimePreset(label.toLowerCase()),
    size: "small",
    variant: "outlined"
  }, label))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    fullWidth: true,
    onClick: e => e.stopPropagation(),
    value: startTime,
    displayEmpty: true,
    onChange: e => setStartTime(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "Start Time"), TIME_OPTIONS.map(time => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: time,
    value: time
  }, time))), /*#__PURE__*/_react.default.createElement(_material.Select, {
    fullWidth: true,
    value: endTime,
    displayEmpty: true,
    onChange: e => setEndTime(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "End Time"), TIME_OPTIONS.map(time => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: time,
    value: time
  }, time))))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search_btn"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "search",
    onClick: () => {
      const params = new URLSearchParams();
      if (service) params.append('service', service);
      if (location) params.append('location', location);
      if (startTime && endTime) {
        params.append('startTime', startTime);
        params.append('endTime', endTime);
      }
      navigate("".concat(_routes.ROUTES.searchPage, "?").concat(params.toString()));
    }
  }, "Search")), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "search_btn_mobile"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: () => {
      const params = new URLSearchParams();
      if (service) params.append('service', service);
      if (location) params.append('location', location);
      if (startTime && endTime) {
        params.append('startTime', startTime);
        params.append('endTime', endTime);
      }
      navigate("".concat(_routes.ROUTES.searchPage, "?").concat(params.toString()));
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowForward.default, null))));
}
var _default = exports.default = SearchBar;