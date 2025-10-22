"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _Pagination = _interopRequireDefault(require("@mui/material/Pagination"));
var _WordLimitedText = _interopRequireDefault(require("../../components/WordLimitedText/WordLimitedText"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Blogs() {
  const tags = ['All Topics', 'Meet the Partners', 'BeautyTraffic Features', 'BeautyTraffic News', 'Business Tips'];
  const [selectedTag, setSelectedTag] = (0, _react.useState)('All Topics');
  const [loading, setLoading] = (0, _react.useState)(true);
  const [blogs, setBlogs] = (0, _react.useState)([]);
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const handlePageChange = (e, page) => {
    fetchBlogs(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const fetchBlogs = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
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
      console.error('error fetching blogs', error);
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    fetchBlogs();
  }, []);
  const filteredBlogs = blogs.filter(blog => {
    if (blog.status !== 'published') return false;
    if (selectedTag === 'All Topics') return true;
    let blogTags = [];
    try {
      blogTags = typeof blog.tags === "string" ? JSON.parse(blog.tags) : blog.tags || [];
    } catch (e) {
      console.error("Invalid tags format:", blog.tags);
    }
    return blogTags.some(tag => tag.trim().toLowerCase() === selectedTag.toLowerCase());
  });
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "blogs_main"
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "container p-t-100"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h1",
    sx: {
      fontWeight: '500'
    },
    textAlign: "center"
  }, "Latest news on Beauty Traffic"), /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "categories m-t-20"
  }, tags.map(singleTag => /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "category ".concat(selectedTag == singleTag ? 'active' : ''),
    onClick: () => setSelectedTag(singleTag)
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h4",
    sx: {
      fontSize: '16px'
    },
    textAlign: "center"
  }, singleTag)))), loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "blogs m-t-20 flexStart"
  }, filteredBlogs && filteredBlogs.length > 0 ? filteredBlogs.filter(blog => blog.status == 'published').map(singleBlog => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "blog",
    to: _routes.ROUTES.getBlogPage(singleBlog.slug)
  }, /*#__PURE__*/_react.default.createElement(_Box.default, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "blog_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleBlog.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "blog_content"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h5"
  }, singleBlog.category), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3"
  }, singleBlog.title), /*#__PURE__*/_react.default.createElement(_WordLimitedText.default, {
    text: singleBlog.short_description,
    wordLimit: 30
  }), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h4"
  }, "By BeautyTraffic on ", " ", new Date(singleBlog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })))))) : /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h4"
  }, "No Blogs")), /*#__PURE__*/_react.default.createElement(_Box.default, {
    className: "blogs_pagination"
  }, /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))));
}
var _default = exports.default = Blogs;