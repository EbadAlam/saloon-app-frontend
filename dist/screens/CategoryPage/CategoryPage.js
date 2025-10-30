"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _routes = require("../../routes");
var _StarRating = _interopRequireDefault(require("../../components/StarRating/StarRating"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function CategoryPage() {
  const {
    slug
  } = (0, _reactRouterDom.useParams)();
  const [stores, setStores] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [categoryName, setCategoryName] = (0, _react.useState)("All Categories");
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  (0, _react.useEffect)(() => {
    fetchStores();
  }, [slug]);
  const fetchStores = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("getStoresByCategory/".concat(slug, "?page=").concat(page));
      setStores(data.stores.data);
      setCategoryName(data.category_name);
      setPagination({
        current_page: data.stores.current_page,
        last_page: data.stores.last_page,
        total: data.stores.total
      });
    } catch (error) {
      console.error("Error fetching stores by category");
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
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "N/A";
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "category_page"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), stores.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_section trending_stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    sx: {
      fontSize: "32px",
      fontFamily: "Barlow",
      fontWeight: "600",
      color: "#333333",
      textAlign: "center"
    }
  }, categoryName), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores"
  }, stores.map(singleStore => {
    const averageRating = calculateAverageRating(singleStore.reviews);
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: _routes.ROUTES.getStoreFrontPage(singleStore.slug),
      className: "store"
    }, /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_image"
    }, singleStore.thumbnail ? /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(singleStore.thumbnail),
      alt: ""
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_BASE_URL, "/store-dummy-img.png"),
      alt: ""
    }), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "hover_content"
    }, /*#__PURE__*/_react.default.createElement(_material.Button, null, "Explore now")), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "overlay"
    })), /*#__PURE__*/_react.default.createElement(_material.Box, {
      className: "store_content"
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h3"
    }, singleStore.title), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
      rating: averageRating,
      color: "#ffc800"
    }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h4"
    }, singleStore.type)));
  })))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "pagination_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Pagination, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))) : /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "no_data"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "No data found")));
}
var _default = exports.default = CategoryPage;