"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactSlick = _interopRequireDefault(require("react-slick"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CustomGallery = _ref => {
  let {
    images = [],
    thumbnail = null,
    slug
  } = _ref;
  const allImages = thumbnail ? [{
    image: thumbnail
  }, ...images] : images;
  const count = allImages.length;
  const [viewAllOpen, setViewAllOpen] = (0, _react.useState)(false);
  const theme = (0, _material.useTheme)();
  const isMobile = (0, _material.useMediaQuery)(theme.breakpoints.down('sm'));
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  if (isMobile) {
    return /*#__PURE__*/_react.default.createElement(_material.Box, null, /*#__PURE__*/_react.default.createElement(_reactSlick.default, _extends({}, sliderSettings, {
      infinite: allImages.length > 1,
      arrows: allImages.length > 1,
      dots: allImages.length > 1
    }), allImages.map((imgObj, idx) => /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: idx
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: "".concat(process.env.REACT_APP_IMG_URL).concat(imgObj.image),
      alt: "Slide ".concat(idx),
      style: {
        width: '100%',
        height: 300,
        objectFit: 'cover'
      }
    })))));
  }
  const visibleImages = count > 3 ? allImages.slice(0, 3) : allImages;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: _objectSpread({
      display: 'grid',
      gap: 2
    }, visibleImages.length === 3 && {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(2, 1fr)'
    })
  }, visibleImages.length === 3 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreGalleryPage(slug),
    state: {
      gallery: allImages
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      gridRow: '1 / span 2',
      gridColumn: '1 / 2',
      overflow: 'hidden',
      borderRadius: 2,
      position: 'relative'
    },
    className: "gallery_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(visibleImages[0].image),
    alt: "Gallery 1",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }))), [1, 2].map(i => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreGalleryPage(slug),
    state: {
      gallery: allImages
    },
    key: i
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative'
    },
    className: "gallery_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(visibleImages[i].image),
    alt: "Gallery ".concat(i + 1),
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), i === 2 && count > 3 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "view-all-btn"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreGalleryPage(slug),
    state: {
      gallery: allImages
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    size: "small"
  }, "See all images"))))))), visibleImages.length === 2 && /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: 'flex',
      gap: 2
    }
  }, visibleImages.map((src, idx) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreGalleryPage(slug),
    state: {
      gallery: allImages
    },
    key: idx
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      flex: 1,
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative'
    },
    className: "gallery_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(src.image),
    alt: "Gallery ".concat(idx),
    style: {
      width: '100%',
      height: 200,
      objectFit: 'cover'
    }
  }))))), visibleImages.length === 1 && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getStoreGalleryPage(slug),
    state: {
      gallery: allImages
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative'
    },
    className: "gallery_img"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(visibleImages[0].image),
    alt: "Gallery single",
    style: {
      width: '100%',
      height: 300,
      objectFit: 'cover'
    }
  })))), /*#__PURE__*/_react.default.createElement(_material.Modal, {
    open: viewAllOpen,
    onClose: () => setViewAllOpen(false)
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      p: 4,
      bgcolor: 'background.paper',
      m: 'auto',
      mt: 10,
      maxWidth: '80%',
      borderRadius: 2,
      maxHeight: '80vh',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: 2
    }
  }, allImages.map((src, idx) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: idx,
    sx: {
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(src.image),
    alt: "Gallery ".concat(idx),
    style: {
      width: '100%',
      height: 150,
      objectFit: 'cover'
    }
  })))))));
};
var _default = exports.default = CustomGallery;