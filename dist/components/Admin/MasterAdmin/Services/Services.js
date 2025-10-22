"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../../routes");
var _ActiveDeactiveSwitchMaster = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitchMaster"));
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function MasterServicesPage() {
  var _location$state$highl, _location$state;
  const [loading, setLoading] = (0, _react.useState)(true);
  const location = (0, _reactRouterDom.useLocation)();
  const [highlightId, setHighlightId] = (0, _react.useState)((_location$state$highl = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.highlightId) !== null && _location$state$highl !== void 0 ? _location$state$highl : '');
  const highlightedRef = (0, _react.useRef)(null);
  const [services, setServices] = (0, _react.useState)([]);
  // const [showForm, setShowForm] = useState(false);
  // const [title, setTitle] = useState('');
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchServices();
  }, []);
  const fetchServices = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllServices?page=".concat(page));
      setServices(data.services.data);
      setPagination({
        current_page: data.services.current_page,
        last_page: data.services.last_page,
        total: data.services.total
      });
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchServices(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  // const handleToggleForm = () => {
  //   setShowForm((prev) => !prev);
  // };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       title,
  //     }
  //     const { data } = await axiosClient.post(`/addNewCategory`, payload);
  //     setAlertMessageType('success');
  //     setAlertMessage(data.message || 'New category added');
  //     fetchCategories();
  //     const timer = setTimeout(() => {
  //       setAlertMessage('');
  //       setAlertMessageType('');
  //     }, 3000);

  //     setTitle('');
  //     return () => clearTimeout(timer);
  //   } catch (error) {
  //     console.error('Failed to add new category:', error);
  //   } finally {
  //     setLoading(false);
  //     setShowForm(false);
  //   }
  // };

  (0, _react.useEffect)(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId('');
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, services]);
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchServices();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Services"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Store Name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Price"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "ETA"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Category"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Gender (If specific)"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), services && services.length > 0 ? services.map((singleSer, index) => {
    var _singleSer$store, _singleSer$store2, _singleSer$category, _singleSer$category2, _singleSer$gender;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: singleSer.id,
      ref: singleSer.id === highlightId ? highlightedRef : null
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleSer.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage((_singleSer$store = singleSer.store) === null || _singleSer$store === void 0 ? void 0 : _singleSer$store.slug),
      target: "_blank",
      rel: "noopener noreferrer"
    }, (_singleSer$store2 = singleSer.store) === null || _singleSer$store2 === void 0 ? void 0 : _singleSer$store2.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleSer.currency, " ", singleSer.price), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleSer.eta), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminServicesCategories,
      state: {
        highlightId: (_singleSer$category = singleSer.category) === null || _singleSer$category === void 0 ? void 0 : _singleSer$category.id
      }
    }, (_singleSer$category2 = singleSer.category) === null || _singleSer$category2 === void 0 ? void 0 : _singleSer$category2.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleSer$gender = singleSer.gender) !== null && _singleSer$gender !== void 0 ? _singleSer$gender : '-'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right",
      sx: {
        color: singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, singleSer.status === 'active' && singleSer.is_active_by_admin == 1 ? 'active' : singleSer.is_active_by_admin != 1 ? 'Disabled by admin' : ""), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitchMaster.default, {
      id: singleSer.id,
      apiUrl: "/updateStatusMaster",
      status: singleSer.is_active_by_admin,
      model: 'Service',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: singleSer.id,
      url: "/deleteServices",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Services")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Pagination, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))));
}
var _default = exports.default = MasterServicesPage;