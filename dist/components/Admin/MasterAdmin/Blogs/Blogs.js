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
var _routes = require("../../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function MasterBlogsPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [blogs, setBlogs] = (0, _react.useState)([]);
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
  const location = (0, _reactRouterDom.useLocation)();
  const [selectAll, setSelectAll] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)('draft');
  const [alertOpen, setAlertOpen] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const handleAlertClose = () => setAlertOpen(false);
  (0, _react.useEffect)(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getBlogs?page=".concat(page));
      setBlogs(data.blogs.data);
      setPagination({
        current_page: data.blogs.current_page,
        last_page: data.blogs.last_page,
        total: data.blogs.total
      });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchBlogs(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
      fetchBlogs();
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
  const handleSelectAll = event => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedBlogs = blogs.map(blog => {
      return _objectSpread(_objectSpread({}, blog), {}, {
        isChecked
      });
    });
    setBlogs(updatedBlogs);
  };
  const handleCheckboxChange = (event, blogId) => {
    const isChecked = event.target.checked;
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === blogId) {
        return _objectSpread(_objectSpread({}, blog), {}, {
          isChecked
        });
      }
      return blog;
    });
    setBlogs(updatedBlogs);
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
    const selectedIds = blogs.filter(blog => blog.isChecked).map(blog => blog.id);
    if (selectedIds.length === 0) {
      showAlert('error', 'Select any blog to update');
    } else {
      setLoading(true);
      try {
        const payload = {
          model: 'Blog',
          selectedIds,
          action: selectedOption
        };
        const {
          data
        } = await _axiosClient.default.post('/bulkOptionPerform', payload);
        showAlert('success', data.message || 'Bulk action perform');
        fetchBlogs();
      } catch (error) {
        console.error('Error performing bulk options ', error);
      } finally {
        setSelectAll(false);
        setBlogs(blogs.map(blog => _objectSpread(_objectSpread({}, blog), {}, {
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
  }, "Blogs"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.masterAdminBlogsAdd
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Add blog")))), /*#__PURE__*/_react.default.createElement(_material.Stack, {
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
  }, ['draft', 'published', 'delete'].map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    onClick: handleApply
  }, "Save")), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    component: _material.Paper
  }, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Blogs Table"
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
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Thumbnail"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Category"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Tags"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Change Status"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Edit"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Delete"))), blogs && blogs.length > 0 ? blogs.map((singleBlog, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.TableBody, {
    key: singleBlog.id
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "td"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "allCheckboxes",
    type: "checkbox",
    value: singleBlog.id,
    checked: singleBlog.isChecked,
    onChange: event => handleCheckboxChange(event, singleBlog.id)
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBlog.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      width: '200px'
    },
    component: "th",
    scope: "row"
  }, /*#__PURE__*/_react.default.createElement("img", {
    style: {
      width: '100%',
      borderRadius: '10px'
    },
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleBlog.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, singleBlog.category), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    component: "th",
    scope: "row"
  }, JSON.parse(singleBlog.tags).map(tag => "#".concat(tag.trim())).join(" ")), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    sx: {
      color: singleBlog.status === 'published' ? 'green' : 'red',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }, singleBlog.status), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: singleBlog.id,
    apiUrl: "/updateBlogStatus",
    status: singleBlog.status,
    onStatusChange: handleStatusChange,
    modal: "blog"
  })), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getMasterAdminBlogsEdit(singleBlog.id)
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Edit"))), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: singleBlog.id,
    url: "/deleteBlog",
    onStatusChange: handleStatusChange
  }))))) : /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "center"
  }, "No Blogs")))), /*#__PURE__*/_react.default.createElement(_material.Box, {
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
var _default = exports.default = MasterBlogsPage;