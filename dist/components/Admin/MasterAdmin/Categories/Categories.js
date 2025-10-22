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
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MasterCategoriesPage() {
  var _location$state$highl, _location$state;
  const [loading, setLoading] = (0, _react.useState)(true);
  const [categories, setCategories] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)('');
  const [categoryId, setCategoryId] = (0, _react.useState)('');
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const location = (0, _reactRouterDom.useLocation)();
  const [highlightId, setHighlightId] = (0, _react.useState)((_location$state$highl = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.highlightId) !== null && _location$state$highl !== void 0 ? _location$state$highl : '');
  const highlightedRef = (0, _react.useRef)(null);
  const [selectAll, setSelectAll] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)('active');
  const [alertOpen, setAlertOpen] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  (0, _react.useEffect)(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllCategoriesMaster?page=".concat(page));
      setCategories(data.categories.data);
      setPagination({
        current_page: data.categories.current_page,
        last_page: data.categories.last_page,
        total: data.categories.total
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchCategories(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleToggleForm = () => {
    setTitle('');
    setCategoryId('');
    setShowForm(prev => !prev);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: categoryId,
        title
      };
      const {
        data
      } = await _axiosClient.default.post("/addNewCategory", payload);
      setAlertMessageType('success');
      setAlertMessage(data.message || 'New category added');
      fetchCategories();
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertMessageType('');
      }, 3000);
      setTitle('');
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Failed to add/edit category:', error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    setAlertMessage(newStatus.message);
    if (newStatus.success) {
      setAlertMessageType('success');
    } else {
      setAlertMessageType('error');
    }
    if (fetch) {
      fetchCategories();
    }
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  const showAlert = (alertType, message) => {
    setAlertMessage(message);
    setAlertMessageType(alertType);
    const timer = setTimeout(() => {
      setAlertMessage('');
      setAlertMessageType('');
    }, 3000);
    return () => clearTimeout(timer);
  };
  (0, _react.useEffect)(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId('');
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, categories]);
  const handleToggleEditForm = (id, title) => {
    setCategoryId(id);
    setTitle(title);
    setShowForm(true);
  };
  const handleSelectAll = event => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedCategories = categories.map(category => {
      return _objectSpread(_objectSpread({}, category), {}, {
        isChecked
      });
    });
    setCategories(updatedCategories);
  };
  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return _objectSpread(_objectSpread({}, category), {}, {
          isChecked
        });
      }
      return category;
    });
    setCategories(updatedCategories);
  };
  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const handleApply = () => {
    if (selectedOption === 'delete') {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };
  const bulkActionFunction = async () => {
    const selectedIds = categories.filter(category => category.isChecked).map(category => category.id);
    if (selectedIds.length === 0) {
      showAlert('error', 'Select any category to update');
    } else {
      setLoading(true);
      try {
        const payload = {
          model: 'ServicesCategory',
          selectedIds,
          action: selectedOption
        };
        const {
          data
        } = await _axiosClient.default.post('/bulkOptionPerform', payload);
        showAlert('success', data.message || 'Bulk action perform');
        fetchCategories();
      } catch (error) {
        console.error('Error performing bulk options ', error);
      } finally {
        setSelectAll(false);
        setCategories(categories.map(category => _objectSpread(_objectSpread({}, category), {}, {
          isChecked: false
        })));
        setLoading(false);
        setAlertOpen(false);
      }
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, alertMessageType);
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: alertOpen,
    onClose: handleAlertClose
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Deletion"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, /*#__PURE__*/_react.default.createElement(_material.DialogContentText, null, "Are you sure you want to delete these items? This action cannot be undone.")), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleAlertClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "error",
    onClick: bulkActionFunction,
    autoFocus: true
  }, "Delete")))), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Categories"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleToggleForm
  }, showForm ? 'Cancel' : 'Add Category'))), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "start",
    gap: "20px",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    defaultValue: selectedOption,
    sx: {
      width: '15%'
    },
    onChange: handleOptionChange
  }, ['active', 'deactive', 'delete'].map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleApply
  }, "Save")), showForm && /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleFormSubmit,
    sx: {
      mb: 3,
      p: 2,
      border: '1px solid #ddd',
      borderRadius: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    mb: 2
  }, categoryId ? 'Update' : 'Add new', " category"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Category name",
    name: "title",
    value: title,
    onChange: e => setTitle(e.target.value),
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    sx: {
      mt: 2
    }
  }, categoryId ? 'Update Category' : 'Add category')), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "selectAllBoxes",
    type: "checkbox",
    onChange: handleSelectAll,
    checked: selectAll
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Services Associated"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), categories && categories.length > 0 ? categories.map((singleCat, index) => {
    var _singleCat$services$l, _singleCat$services;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
      key: singleCat.id,
      ref: singleCat.id === highlightId ? highlightedRef : null
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "td"
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: "allCheckboxes",
      type: "checkbox",
      value: singleCat.id,
      checked: singleCat.isChecked,
      onChange: event => handleCheckboxChange(event, singleCat.id)
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, singleCat.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      component: "th",
      scope: "row"
    }, (_singleCat$services$l = (_singleCat$services = singleCat.services) === null || _singleCat$services === void 0 ? void 0 : _singleCat$services.length) !== null && _singleCat$services$l !== void 0 ? _singleCat$services$l : 0), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      sx: {
        color: singleCat.status === 'active' ? 'green' : 'red',
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }, singleCat.status), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
      id: singleCat.id,
      apiUrl: "/updateServicesCategoryStatus",
      status: singleCat.status,
      onStatusChange: handleStatusChange
    })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
      variant: "contained",
      onClick: () => handleToggleEditForm(singleCat.id, singleCat.title)
    }, "Edit")), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
      id: singleCat.id,
      url: "/deleteServicesCategory",
      onStatusChange: handleStatusChange
    }))));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Categories")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
var _default = exports.default = MasterCategoriesPage;