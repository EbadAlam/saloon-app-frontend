"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _LinkedIn = _interopRequireDefault(require("@mui/icons-material/LinkedIn"));
var _Facebook = _interopRequireDefault(require("@mui/icons-material/Facebook"));
var _Instagram = _interopRequireDefault(require("@mui/icons-material/Instagram"));
var _X = _interopRequireDefault(require("@mui/icons-material/X"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function BlogDetails() {
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [blogDetails, setBlogDetails] = (0, _react.useState)({});
  const [blogUrl, setBlogUrl] = (0, _react.useState)("");
  const [blogTitle, setBlogTitle] = (0, _react.useState)("");
  const location = (0, _reactRouterDom.useLocation)();
  (0, _react.useEffect)(() => {
    const fetchBlogDetails = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get("/getBlogBySlug/".concat(slug));
        setBlogDetails(data.blog);
      } catch (error) {
        console.error('Error fetching blog details :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [slug]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "blog_detail"
  }, loading || !blogDetails ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "blog_content"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h1"
  }, blogDetails.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, blogDetails.short_description), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "thumbnail"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(blogDetails.thumbnail),
    alt: blogDetails.title
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "sections"
  }, JSON.parse(blogDetails.sections).map((singleSection, index) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "section",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, singleSection.heading), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, singleSection.content), singleSection.image !== null && singleSection.image ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleSection.image),
    alt: singleSection.heading
  }) : ''))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "blog_footer"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Not signed up to BeautyTrafic yet? Check out what the", " ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#D8A7B1'
    }
  }, "world's #1 online booking platform"), " ", "can do for your business."), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "Already signed up?", " ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.loginSignup,
    style: {
      color: '#D8A7B1',
      textDecoration: 'underline'
    }
  }, "Log in"), " ", "to manage your appointment calendar, payments, and marketing all from one place."), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, JSON.parse(blogDetails.tags).map((singleTag, index) => /*#__PURE__*/_react.default.createElement("span", {
    key: index,
    style: {
      textTransform: 'capitalize'
    }
  }, "#", singleTag, " "))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "blog_share"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "share_icon",
    href: "https://www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent("".concat(window.location.origin).concat(location.pathname)), "&title=").concat(blogDetails.title),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_LinkedIn.default, null)), /*#__PURE__*/_react.default.createElement("a", {
    className: "share_icon",
    href: "https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent("".concat(window.location.origin).concat(location.pathname))),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_Facebook.default, null)), /*#__PURE__*/_react.default.createElement("a", {
    className: "share_icon",
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://twitter.com/intent/tweet?url=".concat(encodeURIComponent("".concat(window.location.origin).concat(location.pathname)), "&text=").concat(blogDetails.title)
  }, /*#__PURE__*/_react.default.createElement(_X.default, null)))));
}
var _default = exports.default = BlogDetails;