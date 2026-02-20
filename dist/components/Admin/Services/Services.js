"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
var _DeleteButton = _interopRequireDefault(require("../../DeleteButton/DeleteButton"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function Servicespage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [services, setServices] = (0, _react.useState)([]);
  const [categories, setCategories] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const genderOptions = ['Male', 'Female'];
  const [title, setTitle] = (0, _react.useState)('');
  const [categoryId, setCategoryId] = (0, _react.useState)('');
  const [price, setPrice] = (0, _react.useState)('');
  const [eta, setEta] = (0, _react.useState)('');
  const [gender, setGender] = (0, _react.useState)('');
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [currency, setCurrency] = (0, _react.useState)('PKR');
  const [serviceId, setServiceId] = (0, _react.useState)('');
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const {
    state
  } = (0, _reactRouterDom.useLocation)();
  const currencyOptions = [{
    label: 'USD ($)',
    symbol: '$'
  }, {
    label: 'AED',
    symbol: 'AED'
  }];
  (0, _react.useEffect)(() => {
    const fetchStoreCategories = async () => {
      setLoading(true);
      try {
        const {
          data
        } = await _axiosClient.default.get("/getStoreCategories/".concat(storeId));
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
    fetchStoreCategories();
  }, []);
  const fetchServices = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getServices/".concat(storeId));
      setServices(data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleForm = () => {
    setTitle('');
    setCategoryId('');
    setPrice('');
    setEta('');
    setGender('');
    setServiceId('');
    setShowForm(prev => !prev);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      store_id: storeId,
      title: title,
      service_category_id: categoryId,
      price: price,
      eta: eta,
      gender: gender,
      currency: currency,
      serviceId
    };
    try {
      const {
        data
      } = await _axiosClient.default.post("/addServices", payload);
      setServices(data.services);
      showAlert('success', data.message || 'Service added');
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
    setTitle('');
    setCategoryId('');
    setPrice('');
    setEta('');
    setGender('');
    setCurrency('PKR');
  };
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const handleStatusChange = newStatus => {
    showAlert(newStatus.success ? 'success' : 'error', newStatus.message);
    fetchServices();
  };
  const showAlert = (type, message) => {
    setAlertMessage(message);
    setAlertMessageType(type);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  const handleToggleEditForm = service => {
    setTitle(service.title);
    setCategoryId(service.category.id);
    setPrice(service.price);
    setEta(service.eta);
    setGender(service.gender);
    setServiceId(service.id);
    setShowForm(true);
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    className: "btn_headss",
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Services"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_material.Button, {
    className: "dark-btn",
    variant: "contained",
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : 'Add Services'))), showForm && /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleFormSubmit,
    sx: {
      mb: 3,
      p: 2,
      border: '1px solid #ddd',
      borderRadius: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Service Title",
    value: title,
    onChange: e => setTitle(e.target.value),
    required: true,
    margin: "normal"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "category-label"
  }, "Service Category"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "category-label",
    value: categoryId,
    label: "Service Category",
    onChange: e => setCategoryId(e.target.value),
    required: true
  }, categories === null || categories === void 0 ? void 0 : categories.filter(cat => cat.category.status === 'active').map(cat => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: cat.id,
    value: cat.category.id
  }, cat.category.title)))), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Price",
    type: "number",
    value: price,
    onChange: e => setPrice(e.target.value),
    required: true,
    InputProps: {
      startAdornment: /*#__PURE__*/_react.default.createElement(_material.InputAdornment, {
        position: "start"
      }, currency)
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Estimated Time (e.g. 30 mins)",
    value: eta,
    onChange: e => setEta(e.target.value),
    required: true,
    margin: "normal"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "gender-label"
  }, "Gender"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "gender-label",
    value: gender,
    label: "Gender",
    onChange: e => setGender(e.target.value)
  }, genderOptions.map(option => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: option,
    value: option
  }, option)))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    sx: {
      mt: 2
    }
  }, "Save Service")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    sx: {
      maxWidth: 1300
    },
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Category"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "ETA"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Price"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Gender"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Change Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Delete"))), services && services.length > 0 ? services.map((singleSer, index) => {
    var _singleSer$gender;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleSer.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, singleSer.category.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, singleSer.eta), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, singleSer.currency, " ", singleSer.price), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, (_singleSer$gender = singleSer.gender) !== null && _singleSer$gender !== void 0 ? _singleSer$gender : '---'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right",
      sx: {
        color: singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'active' : singleSer.is_active_by_admin != 1 ? 'Disabled by admin' : ""), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, singleSer.is_active_by_admin == 1 && /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
      id: singleSer.id,
      apiUrl: "/updateServicesStatus",
      status: singleSer.status,
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
      variant: "contained",
      onClick: () => handleToggleEditForm(singleSer)
    }, "Edit")), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: singleSer.id,
      url: "/deleteServices",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Services"))))));
}
var _default = exports.default = Servicespage;