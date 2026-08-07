"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
var _routes = require("../../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: '24px',
    background: '#f5f4f0',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  addBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 18px',
    borderRadius: '8px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500
  },
  toolbarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px'
  },
  select: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '0.5px solid #e0dfd8',
    fontSize: '13px',
    background: '#fff',
    color: '#1a1a2e',
    width: '160px',
    boxSizing: 'border-box'
  },
  applyBtn: {
    padding: '9px 18px',
    borderRadius: '8px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    border: '0.5px solid #e0dfd8',
    overflow: 'hidden',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    minWidth: '1100px'
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    color: '#888',
    fontWeight: 500,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    borderBottom: '1px solid #f0efe8',
    whiteSpace: 'nowrap'
  },
  td: {
    padding: '12px 14px',
    color: '#1a1a2e',
    fontSize: '13px',
    borderBottom: '0.5px solid #f5f4f0',
    verticalAlign: 'middle'
  },
  tdNum: {
    padding: '12px 14px',
    color: '#aaa',
    fontSize: '12px',
    borderBottom: '0.5px solid #f5f4f0'
  },
  statusText: {
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  thumbnail: {
    width: '110px',
    height: '68px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  tag: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '999px',
    background: '#f0efe8',
    color: '#1a1a2e',
    fontSize: '11px',
    fontWeight: 500,
    marginRight: '4px',
    marginBottom: '4px'
  },
  editBtn: {
    padding: '5px 14px',
    borderRadius: '7px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: 500
  }
};
function MasterBlogsPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [blogs, setBlogs] = (0, _react.useState)([]);
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  const [alertMessageType, setAlertMessageType] = (0, _react.useState)('');
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
    setBlogs(blogs.map(blog => _objectSpread(_objectSpread({}, blog), {}, {
      isChecked
    })));
  };
  const handleCheckboxChange = (event, blogId) => {
    const isChecked = event.target.checked;
    setBlogs(blogs.map(blog => blog.id === blogId ? _objectSpread(_objectSpread({}, blog), {}, {
      isChecked
    }) : blog));
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
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: alertOpen,
    onClose: handleAlertClose
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Deletion"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, /*#__PURE__*/_react.default.createElement(_material.DialogContentText, null, "Are you sure you want to delete these items? This action cannot be undone.")), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleAlertClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "error",
    onClick: bulkActionFunction,
    autoFocus: true
  }, "Delete"))), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h5", {
    style: S.title
  }, "Blogs"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.headerActions
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.masterAdminBlogsAdd,
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.addBtn
  }, "+ Add blog")))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.toolbarRow
  }, /*#__PURE__*/_react.default.createElement("select", {
    style: S.select,
    value: selectedOption,
    onChange: handleOptionChange
  }, ['draft', 'published', 'delete'].map(status => /*#__PURE__*/_react.default.createElement("option", {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))), /*#__PURE__*/_react.default.createElement("button", {
    style: S.applyBtn,
    onClick: handleApply
  }, "Save")), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "selectAllBoxes",
    type: "checkbox",
    onChange: handleSelectAll,
    checked: selectAll
  })), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Title"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Thumbnail"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Category"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Tags"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Change Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Edit"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, blogs && blogs.length > 0 ? blogs.map((singleBlog, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: singleBlog.id,
    style: {
      background: index % 2 === 0 ? '#fff' : '#fafaf8'
    }
  }, /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "allCheckboxes",
    type: "checkbox",
    value: singleBlog.id,
    checked: !!singleBlog.isChecked,
    onChange: event => handleCheckboxChange(event, singleBlog.id)
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdNum
  }, index + 1), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      fontWeight: 500
    })
  }, singleBlog.title), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("img", {
    style: S.thumbnail,
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleBlog.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, singleBlog.category), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, JSON.parse(singleBlog.tags).map(tag => /*#__PURE__*/_react.default.createElement("span", {
    key: tag,
    style: S.tag
  }, "#", tag.trim()))), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: _objectSpread(_objectSpread({}, S.statusText), {}, {
      color: singleBlog.status === 'published' ? '#27500a' : '#791f1f'
    })
  }, singleBlog.status)), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: singleBlog.id,
    apiUrl: "/updateBlogStatus",
    status: singleBlog.status,
    onStatusChange: handleStatusChange,
    modal: "blog"
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getMasterAdminBlogsEdit(singleBlog.id)
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.editBtn
  }, "Edit"))), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: singleBlog.id,
    url: "/deleteBlog",
    onStatusChange: handleStatusChange
  })))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 10,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: 'center',
      color: '#aaa',
      padding: '32px'
    })
  }, "No Blogs"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: '16px'
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