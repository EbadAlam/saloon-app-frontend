"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _CloudUpload = _interopRequireDefault(require("@mui/icons-material/CloudUpload"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: "24px",
    background: "#f5f4f0",
    minHeight: "100vh"
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    border: "1px solid #1a1a2e",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  crumb: {
    fontSize: "14px",
    color: "#888",
    textDecoration: "none"
  },
  crumbActive: {
    fontSize: "14px",
    color: "#1a1a2e",
    fontWeight: 500
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1a1a2e"
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "0.5px solid #e0dfd8",
    padding: "24px",
    overflow: "hidden"
  },
  uploadBox: {
    border: "2px dashed #e0dfd8",
    borderRadius: "12px",
    padding: "40px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "#fafaf8"
  },
  uploadBoxHover: {
    borderColor: "#1a1a2e",
    background: "#f5f4f0"
  },
  uploadIcon: {
    fontSize: "40px",
    color: "#888",
    marginBottom: "12px"
  },
  uploadText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "4px"
  },
  uploadSubtext: {
    fontSize: "12px",
    color: "#aaa"
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
    marginTop: "20px"
  },
  galleryItem: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#f5f4f0",
    aspectRatio: "1/1",
    cursor: "grab"
  },
  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  deleteBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#fcebeb",
    border: "none",
    color: "#791f1f",
    borderRadius: "6px",
    padding: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s"
  },
  galleryItemHover: {
    opacity: 1
  },
  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#aaa"
  },
  emptyTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "8px"
  },
  emptyText: {
    fontSize: "13px",
    color: "#888"
  },
  dragOverlay: {
    position: "absolute",
    inset: "0",
    background: "rgba(26, 26, 46, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "12px"
  },
  dragHint: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "12px",
    textAlign: "center"
  },
  fileInput: {
    display: "none"
  }
};
function AdminPortfolioPage() {
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [storeName, setStoreName] = (0, _react.useState)("");
  const [portfolio, setPortfolio] = (0, _react.useState)([]);
  const [dragOverIndex, setDragOverIndex] = (0, _react.useState)(null);
  const [draggedIndex, setDraggedIndex] = (0, _react.useState)(null);
  const [uploadProgress, setUploadProgress] = (0, _react.useState)({});
  const fileInputRef = _react.default.useRef(null);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  (0, _react.useEffect)(() => {
    fetchPortfolio();
  }, [storeId]);
  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getStorePortfolio/".concat(storeId));
      setPortfolio(data.portfolio || []);
      setStoreName(data.storeName || "");
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      showSnackbar('Failed to load portfolio', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async files => {
    if (!files.length) return;
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        showSnackbar('Only images are allowed', 'error');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Image size must be less than 5MB', 'error');
        return false;
      }
      return true;
    });
    for (const file of validFiles) {
      await uploadImage(file);
    }
  };
  const uploadImage = async file => {
    const fileId = Math.random().toString(36);
    setUploadProgress(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [fileId]: 0
    }));
    const formData = new FormData();
    formData.append('image', file);
    formData.append('store_id', storeId);
    try {
      const {
        data
      } = await _axiosClient.default.post('/uploadPortfolioImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: e => {
          const progress = Math.round(e.loaded / e.total * 100);
          setUploadProgress(prev => _objectSpread(_objectSpread({}, prev), {}, {
            [fileId]: progress
          }));
        }
      });
      setPortfolio(prev => [...prev, data.image]);
      showSnackbar('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showSnackbar('Failed to upload image', 'error');
    } finally {
      setUploadProgress(prev => {
        const newProgress = _objectSpread({}, prev);
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };
  const handleDelete = async imageId => {
    if (window.confirm('Delete this image?')) {
      setLoading(true);
      try {
        await _axiosClient.default.post('/deletePortfolioImage', {
          image_id: imageId,
          store_id: storeId
        });
        setPortfolio(prev => prev.filter(img => img.id !== imageId));
        showSnackbar('Image deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting image:', error);
        showSnackbar('Failed to delete image', 'error');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleDragStart = index => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDragLeave = () => {
    setDragOverIndex(null);
  };
  const handleDropFiles = e => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleUpload(files);
  };
  const handleDropReorder = async dropIndex => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newPortfolio = [...portfolio];
    const draggedItem = newPortfolio[draggedIndex];
    newPortfolio.splice(draggedIndex, 1);
    newPortfolio.splice(dropIndex, 0, draggedItem);
    setPortfolio(newPortfolio);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Save order to backend
    try {
      await _axiosClient.default.post('/updatePortfolioOrder', {
        store_id: storeId,
        order: newPortfolio.map((img, idx) => ({
          id: img.id,
          order: idx
        }))
      });
    } catch (error) {
      console.error('Error updating order:', error);
      showSnackbar('Failed to update image order', 'error');
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.backBtn,
    onClick: () => window.history.back()
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    style: {
      fontSize: 13
    }
  }), " Back"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumb
  }, "Stores"), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb"
    }
  }, " \u203A "), /*#__PURE__*/_react.default.createElement("span", {
    style: S.cromb
  }, storeName), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#bbb"
    }
  }, " \u203A "), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Portfolio"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: S.pageTitle
  }, "Portfolio Management"), /*#__PURE__*/_react.default.createElement("button", {
    style: _objectSpread(_objectSpread({}, S.backBtn), {}, {
      border: "none",
      background: "#1a1a2e",
      color: "#fff"
    }),
    onClick: () => {
      var _fileInputRef$current;
      return (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 ? void 0 : _fileInputRef$current.click();
    }
  }, /*#__PURE__*/_react.default.createElement(_CloudUpload.default, {
    style: {
      fontSize: 14
    }
  }), " Upload Images")), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.uploadBox,
    onDragOver: e => {
      e.preventDefault();
      e.currentTarget.style.borderColor = "#1a1a2e";
      e.currentTarget.style.background = "#f5f4f0";
    },
    onDragLeave: e => {
      e.currentTarget.style.borderColor = "#e0dfd8";
      e.currentTarget.style.background = "#fafaf8";
    },
    onDrop: handleDropFiles,
    onClick: () => {
      var _fileInputRef$current2;
      return (_fileInputRef$current2 = fileInputRef.current) === null || _fileInputRef$current2 === void 0 ? void 0 : _fileInputRef$current2.click();
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.uploadIcon
  }, "\uD83D\uDCE4"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.uploadText
  }, "Drag and drop images here or click to upload"), /*#__PURE__*/_react.default.createElement("p", {
    style: S.uploadSubtext
  }, "Supports JPG, PNG, WebP up to 5MB each")), /*#__PURE__*/_react.default.createElement("input", {
    ref: fileInputRef,
    style: S.fileInput,
    type: "file",
    multiple: true,
    accept: "image/*",
    onChange: e => handleUpload(e.target.files)
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: S.dragHint
  }, "\uD83D\uDCA1 Drag images to reorder them. Portfolio order affects how they display on your store page."), portfolio.length > 0 ? /*#__PURE__*/_react.default.createElement("div", {
    style: S.gallery
  }, portfolio.map((image, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: image.id,
    style: _objectSpread(_objectSpread({}, S.galleryItem), {}, {
      opacity: draggedIndex === index ? 0.5 : 1,
      border: dragOverIndex === index ? "2px solid #1a1a2e" : "none",
      cursor: draggedIndex !== null ? "grabbing" : "grab"
    }),
    draggable: true,
    onDragStart: () => handleDragStart(index),
    onDragOver: e => handleDragOver(e, index),
    onDragLeave: handleDragLeave,
    onDrop: () => handleDropReorder(index),
    onMouseEnter: e => e.currentTarget.querySelector('[data-delete]').style.opacity = "1",
    onMouseLeave: e => e.currentTarget.querySelector('[data-delete]').style.opacity = "0"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(image.image_path),
    alt: "Portfolio",
    style: S.galleryImg,
    onError: e => {
      e.target.src = 'https://via.placeholder.com/150?text=Error';
    }
  }), dragOverIndex === index && /*#__PURE__*/_react.default.createElement("div", {
    style: S.dragOverlay
  }, "Drop here to reorder"), /*#__PURE__*/_react.default.createElement("button", {
    "data-delete": true,
    style: _objectSpread(_objectSpread({}, S.deleteBtn), {}, {
      opacity: 0
    }),
    onClick: () => handleDelete(image.id),
    title: "Delete image"
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
    style: {
      fontSize: 16
    }
  })), uploadProgress[image.id] !== undefined && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "absolute",
      bottom: "8px",
      left: "8px",
      right: "8px",
      background: "rgba(0,0,0,0.5)",
      height: "4px",
      borderRadius: "2px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "100%",
      background: "#1a1a2e",
      width: "".concat(uploadProgress[image.id], "%"),
      transition: "width 0.3s"
    }
  }))))) : /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyState
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyTitle
  }, "No portfolio images yet"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.emptyText
  }, "Upload images to showcase your salon's work and portfolio")), portfolio.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "20px",
      padding: "16px",
      background: "#f5f4f0",
      borderRadius: "8px",
      fontSize: "13px",
      color: "#555"
    }
  }, "\uD83D\uDCCA Total images: ", /*#__PURE__*/_react.default.createElement("strong", null, portfolio.length)))));
}
var _default = exports.default = AdminPortfolioPage;