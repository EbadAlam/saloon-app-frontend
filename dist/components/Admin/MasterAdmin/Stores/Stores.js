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
var _DummyImage = _interopRequireDefault(require("../../../DummyImage/DummyImage"));
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function MasterStoresPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [stores, setStores] = (0, _react.useState)([]);
  // const [showForm, setShowForm] = useState(false);
  // const [title, setTitle] = useState('');
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchStores();
  }, []);
  const fetchStores = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllStores?page=".concat(page));
      setStores(data.stores.data);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total
      });
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchStores(page);
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

  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchStores();
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
  }, "Stores"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Stores Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Owner Name"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Thumbnail"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Type"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Categories"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Services"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Workers"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Approve Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Active Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), stores && stores.length > 0 ? stores.map((store, index) => {
    var _store$user, _store$user2, _store$services_categ, _store$services_categ2, _store$services$lengt, _store$services, _store$workers$length, _store$workers;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: index + 1
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(store === null || store === void 0 ? void 0 : store.slug),
      target: "_blank",
      rel: "noopener noreferrer"
    }, store === null || store === void 0 ? void 0 : store.title)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.masterAdminUsers,
      state: {
        highlightId: (_store$user = store.user) === null || _store$user === void 0 ? void 0 : _store$user.id
      }
    }, (_store$user2 = store.user) === null || _store$user2 === void 0 ? void 0 : _store$user2.username)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, store.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
      style: {
        width: '100px',
        borderRadius: '10px'
      },
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(store.thumbnail)
    }) : '-'), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, store.type), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_store$services_categ = (_store$services_categ2 = store.services_categories) === null || _store$services_categ2 === void 0 ? void 0 : _store$services_categ2.length) !== null && _store$services_categ !== void 0 ? _store$services_categ : 0), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_store$services$lengt = (_store$services = store.services) === null || _store$services === void 0 ? void 0 : _store$services.length) !== null && _store$services$lengt !== void 0 ? _store$services$lengt : 0), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_store$workers$length = (_store$workers = store.workers) === null || _store$workers === void 0 ? void 0 : _store$workers.length) !== null && _store$workers$length !== void 0 ? _store$workers$length : 0), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right",
      sx: {
        color: store.status === 'active' && store.is_active_by_admin == 1 ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, store.status === 'active' ? store.is_active_by_admin == 1 ? 'active' : store.is_active_by_admin != 1 ? 'Disabled by admin' : "" : 'Waiting for approval'), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
      id: store.id,
      apiUrl: "/updateStatusApproveMaster",
      status: store.status,
      label: store.status == 'active' ? 'Approved' : 'Approve',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitchMaster.default, {
      id: store.id,
      apiUrl: "/updateStatusMaster",
      status: store.is_active_by_admin,
      model: 'Store',
      label: store.is_active_by_admin == '1' ? 'Active' : 'Disabled',
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: store.id,
      url: "/deleteStore",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Stores")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
var _default = exports.default = MasterStoresPage;