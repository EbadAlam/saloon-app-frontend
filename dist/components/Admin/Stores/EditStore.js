"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _reactRouterDom = require("react-router-dom");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _material = require("@mui/material");
var _routes = require("../../../routes");
var _LocationPicker = _interopRequireDefault(require("../../LocationPicker/LocationPicker"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function EditStore() {
  var _storeDetails$gallery;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [errorMessages, setErrorMessages] = (0, _react.useState)([]);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [storeDetails, setStoreDetails] = (0, _react.useState)({
    title: '',
    about: '',
    address: '',
    gallery: [],
    thumbnail: '',
    lat: '',
    lng: ''
  });
  const [galleryFiles, setGalleryFiles] = (0, _react.useState)([]);
  const [imagesToDelete, setImagesToDelete] = (0, _react.useState)([]);
  const [thumbnailFile, setThumbnailFile] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    fetchStoreDetails();
  }, []);
  const fetchStoreDetails = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getStoreDetails/".concat(storeId));
      setStoreDetails({
        title: data.storeDetails.title || '',
        about: data.storeDetails.about || '',
        address: data.storeDetails.address || '',
        gallery: data.storeDetails.gallery || [],
        thumbnail: data.storeDetails.thumbnail || '',
        lat: data.storeDetails.lat || '',
        lng: data.storeDetails.lng || ''
      });
    } catch (error) {
      console.error('Failed to fetch store details:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = e => {
    setStoreDetails(_objectSpread(_objectSpread({}, storeDetails), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const handleGalleryChange = e => {
    const newFiles = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...newFiles]);
  };
  const handleRemoveGalleryImage = indexToRemove => {
    const imageToRemove = storeDetails.gallery[indexToRemove];
    if (imageToRemove !== null && imageToRemove !== void 0 && imageToRemove.id) {
      setImagesToDelete(prev => [...prev, imageToRemove.id]);
    }
    const updatedGallery = storeDetails.gallery.filter((_, index) => index !== indexToRemove);
    setStoreDetails(_objectSpread(_objectSpread({}, storeDetails), {}, {
      gallery: updatedGallery
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);
    const dataToSend = new FormData();
    dataToSend.append('title', storeDetails.title);
    dataToSend.append('about', storeDetails.about);
    dataToSend.append('address', storeDetails.address);
    dataToSend.append('lat', storeDetails.lat);
    dataToSend.append('lng', storeDetails.lng);
    galleryFiles.forEach((file, index) => {
      if (file instanceof File) {
        dataToSend.append("gallery[".concat(index, "]"), file);
      }
    });
    if (thumbnailFile) {
      dataToSend.append('thumbnail', thumbnailFile);
    }
    imagesToDelete.forEach(id => {
      dataToSend.append('deletedImages[]', id);
    });
    try {
      await _axiosClient.default.post("/updateStoreDetails/".concat(storeId), dataToSend);
      navigate(_routes.ROUTES.adminStores, {
        state: {
          success: 'Store updated successfully!'
        }
      });
    } catch (err) {
      console.error('Failed to update store:', err);
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        const messages = Object.values(errors).flat();
        setErrorMessages(messages);
      }
    } finally {
      setLoading(false);
    }
  };
  (0, _react.useEffect)(() => {
    if (errorMessages.length > 0) {
      errorMessages.forEach(err => {
        showSnackbar(err, "error");
      });
    }
  }, [errorMessages]);
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleSubmit,
    sx: {
      p: 3,
      border: '1px solid #ddd',
      borderRadius: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    mb: 2
  }, "Edit Store"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "Store Name",
    name: "title",
    value: storeDetails.title,
    onChange: handleChange,
    sx: {
      mb: 2
    }
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    label: "About",
    name: "about",
    value: storeDetails.about,
    onChange: handleChange,
    multiline: true,
    rows: 4,
    sx: {
      mb: 2
    }
  }), typeof window !== "undefined" ? /*#__PURE__*/_react.default.createElement(_LocationPicker.default, {
    initialPosition: {
      lat: storeDetails.lat,
      lng: storeDetails.lng
    },
    onChange: pos => {
      setStoreDetails(prev => _objectSpread(_objectSpread({}, prev), {}, {
        lat: pos.lat,
        lng: pos.lng,
        address: pos.address
      }));
    }
  }) : /*#__PURE__*/_react.default.createElement("div", null, "Loading..."), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1",
    sx: {
      mb: 1
    }
  }, "Thumbnail Image"), storeDetails.thumbnail && /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(storeDetails.thumbnail),
    alt: "Thumbnail",
    style: {
      width: 120,
      height: 120,
      objectFit: 'cover',
      borderRadius: 4,
      border: '1px solid #ddd'
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label",
    sx: {
      mb: 2
    }
  }, "Upload New Thumbnail", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    hidden: true,
    accept: "image/*",
    onChange: e => setThumbnailFile(e.target.files[0])
  })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1",
    sx: {
      mb: 1
    }
  }, "Existing Gallery Images"), ((_storeDetails$gallery = storeDetails.gallery) === null || _storeDetails$gallery === void 0 ? void 0 : _storeDetails$gallery.length) > 0 ? /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      mb: 2
    }
  }, storeDetails.gallery.map((img, idx) => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: img.id || idx,
    sx: {
      position: 'relative',
      width: 100,
      height: 100
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(img.image),
    alt: "Gallery ".concat(idx),
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 4,
      border: '1px solid #ddd'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    onClick: () => handleRemoveGalleryImage(idx),
    sx: {
      position: 'absolute',
      top: -8,
      right: -8,
      background: '#f44336',
      color: '#fff',
      width: 20,
      height: 20,
      borderRadius: '50%',
      fontSize: 14,
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 4px rgba(0,0,0,0.3)'
    }
  }, "\xD7")))) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      mb: 2
    }
  }, "No gallery images available."), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      mb: 2,
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    component: "label"
  }, "Upload New Gallery Images", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    multiple: true,
    hidden: true,
    onChange: handleGalleryChange
  }))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained"
  }, "Update Store")))));
}
var _default = exports.default = EditStore;