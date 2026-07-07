"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _ChevronLeft = _interopRequireDefault(require("@mui/icons-material/ChevronLeft"));
var _ChevronRight = _interopRequireDefault(require("@mui/icons-material/ChevronRight"));
var _ZoomOutMap = _interopRequireDefault(require("@mui/icons-material/ZoomOutMap"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PortfolioGallery = _ref => {
  let {
    portfolioImages = []
  } = _ref;
  const [lightboxOpen, setLightboxOpen] = (0, _react.useState)(false);
  const [selectedImageIndex, setSelectedImageIndex] = (0, _react.useState)(0);
  const [sortedImages, setSortedImages] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (portfolioImages.length > 0) {
      const sorted = [...portfolioImages].sort((a, b) => a.order - b.order);
      setSortedImages(sorted);
    }
  }, [portfolioImages]);
  const images = sortedImages.length > 0 ? sortedImages : [];
  const openLightbox = index => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  const goToPrevious = () => {
    setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };
  const goToNext = () => {
    setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };
  _react.default.useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);
  if (images.length === 0) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", null, "\n        .portfolio-section {\n          margin-top: 60px;\n          margin-bottom: 40px;\n        }\n\n        .portfolio-title {\n          font-size: 30px;\n          font-weight: 400;\n          color: #1a1a2e;\n          margin-bottom: 24px;\n          font-family: inherit;\n        }\n\n        .masonry-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n          gap: 12px;\n          margin-bottom: 20px;\n        }\n\n        .masonry-item {\n          position: relative;\n          overflow: hidden;\n          border-radius: 12px;\n          cursor: pointer;\n          background: #f0efe8;\n          aspect-ratio: 1;\n        }\n\n        .masonry-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }\n        .masonry-item:nth-child(6) { grid-column: span 1; }\n        .masonry-item:nth-child(9) { grid-column: span 1; grid-row: span 1; }\n\n        .masonry-item img {\n          width: 100%;\n          height: 100%;\n          object-fit: cover;\n          transition: transform 0.3s ease, filter 0.3s ease;\n          display: block;\n        }\n\n        .masonry-item:hover img {\n          transform: scale(1.08);\n          filter: brightness(0.9);\n        }\n\n        .masonry-overlay {\n          position: absolute;\n          inset: 0;\n          background: rgba(0, 0, 0, 0);\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          opacity: 0;\n          transition: all 0.3s ease;\n          font-size: 28px;\n          color: #fff;\n        }\n\n        .masonry-item:hover .masonry-overlay {\n          opacity: 1;\n          background: rgba(0, 0, 0, 0.4);\n        }\n\n        /* Lightbox Styles */\n        .lightbox-backdrop {\n          position: fixed;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          background: rgba(0, 0, 0, 0.95);\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          z-index: 9999;\n          animation: fadeIn 0.2s ease;\n        }\n\n        @keyframes fadeIn {\n          from { opacity: 0; }\n          to { opacity: 1; }\n        }\n\n        .lightbox-content {\n          position: relative;\n          max-width: 90vw;\n          max-height: 90vh;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          animation: zoomIn 0.3s ease;\n        }\n\n        @keyframes zoomIn {\n          from { transform: scale(0.9); opacity: 0; }\n          to { transform: scale(1); opacity: 1; }\n        }\n\n        .lightbox-image {\n          max-width: 100%;\n          max-height: 85vh;\n          object-fit: contain;\n          border-radius: 8px;\n        }\n\n        .lightbox-counter {\n          position: absolute;\n          top: 20px;\n          right: 20px;\n          background: rgba(255, 255, 255, 0.2);\n          color: #fff;\n          padding: 8px 12px;\n          border-radius: 6px;\n          font-size: 13px;\n          font-weight: 500;\n          backdrop-filter: blur(10px);\n        }\n\n        .lightbox-button {\n          position: absolute;\n          top: 50%;\n          transform: translateY(-50%);\n          background: rgba(255, 255, 255, 0.2);\n          border: none;\n          color: #fff;\n          width: 44px;\n          height: 44px;\n          border-radius: 50%;\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          transition: all 0.2s ease;\n          backdrop-filter: blur(10px);\n          font-size: 24px;\n          z-index: 10000;\n        }\n\n        .lightbox-button:hover {\n          background: rgba(255, 255, 255, 0.4);\n          transform: translateY(-50%) scale(1.1);\n        }\n\n        .lightbox-prev {\n          left: 20px;\n        }\n\n        .lightbox-next {\n          right: 20px;\n        }\n\n        .lightbox-close {\n          position: absolute;\n          top: 20px;\n          left: 20px;\n          background: rgba(255, 255, 255, 0.2);\n          border: none;\n          color: #fff;\n          width: 40px;\n          height: 40px;\n          border-radius: 50%;\n          cursor: pointer;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          transition: all 0.2s ease;\n          backdrop-filter: blur(10px);\n          font-size: 24px;\n          padding: 0;\n        }\n\n        .lightbox-close:hover {\n          background: rgba(255, 255, 255, 0.4);\n          transform: scale(1.1);\n        }\n\n        .lightbox-info {\n          position: absolute;\n          bottom: 20px;\n          left: 20px;\n          color: #fff;\n          font-size: 13px;\n          background: rgba(0, 0, 0, 0.3);\n          padding: 10px 14px;\n          border-radius: 6px;\n          backdrop-filter: blur(10px);\n        }\n\n        /* Mobile Responsive */\n        @media (max-width: 768px) {\n          .portfolio-title {\n            font-size: 24px;\n            margin-bottom: 16px;\n          }\n\n          .masonry-grid {\n            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n            gap: 8px;\n          }\n\n          .masonry-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }\n\n          .lightbox-backdrop {\n            padding: 0;\n          }\n\n          .lightbox-image {\n            max-height: 80vh;\n            border-radius: 0;\n          }\n\n          .lightbox-button {\n            width: 40px;\n            height: 40px;\n            font-size: 20px;\n          }\n\n          .lightbox-prev {\n            left: 10px;\n          }\n\n          .lightbox-next {\n            right: 10px;\n          }\n\n          .lightbox-counter {\n            top: 10px;\n            right: 10px;\n            font-size: 12px;\n            padding: 6px 10px;\n          }\n\n          .lightbox-close {\n            top: 10px;\n            left: 10px;\n            width: 36px;\n            height: 36px;\n            font-size: 20px;\n          }\n\n          .lightbox-info {\n            font-size: 12px;\n            padding: 8px 12px;\n            left: 10px;\n            bottom: 10px;\n          }\n        }\n\n        @media (max-width: 480px) {\n          .masonry-grid {\n            grid-template-columns: repeat(2, 1fr);\n            gap: 6px;\n          }\n\n          .portfolio-title {\n            font-size: 20px;\n            margin-bottom: 12px;\n          }\n        }\n      "), /*#__PURE__*/_react.default.createElement("div", {
    className: "portfolio-section"
  }, /*#__PURE__*/_react.default.createElement("h4", {
    className: "heading"
  }, "Portfolio"), /*#__PURE__*/_react.default.createElement("div", {
    className: "masonry-grid"
  }, images.map((image, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: image.id,
    className: "masonry-item",
    onClick: () => openLightbox(index)
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(image.image_path),
    alt: "Portfolio",
    loading: "lazy",
    onError: e => {
      e.target.src = 'https://via.placeholder.com/200?text=Error';
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "masonry-overlay"
  }, /*#__PURE__*/_react.default.createElement(_ZoomOutMap.default, null)))))), lightboxOpen && /*#__PURE__*/_react.default.createElement("div", {
    className: "lightbox-backdrop",
    onClick: closeLightbox
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "lightbox-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "lightbox-close",
    onClick: closeLightbox
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    sx: {
      fontSize: 20
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "lightbox-counter"
  }, selectedImageIndex + 1, " / ", images.length), /*#__PURE__*/_react.default.createElement("button", {
    className: "lightbox-button lightbox-prev",
    onClick: goToPrevious,
    title: "Previous (\u2190)"
  }, /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, null)), /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(images[selectedImageIndex].image_path),
    alt: "Portfolio",
    className: "lightbox-image",
    onError: e => {
      e.target.src = 'https://via.placeholder.com/800?text=Error';
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    className: "lightbox-button lightbox-next",
    onClick: goToNext,
    title: "Next (\u2192)"
  }, /*#__PURE__*/_react.default.createElement(_ChevronRight.default, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "lightbox-info"
  }, "Use arrow keys or buttons to navigate \u2022 ESC to close"))));
};
var _default = exports.default = PortfolioGallery;