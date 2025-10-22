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
var _ContextProvider = require("../../../contexts/ContextProvider");
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function EditCategory() {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    categoryName
  } = (0, _reactRouterDom.useParams)();
  const [categoryData, setCategoryData] = (0, _react.useState)({
    id: '',
    cat_title: '',
    cat_description: '',
    cat_image: null
  });
  const imageInputRef = (0, _react.useRef)(null);
  const [loading, setLoading] = (0, _react.useState)(false);
  const handleInputChange = e => {
    setCategoryData(_objectSpread(_objectSpread({}, categoryData), {}, {
      [e.target.name]: e.target.value
    }));
    // console.log(categoryData);
  };
  const handleImageChange = e => {
    const file = imageInputRef.current.files[0];
    setCategoryData(_objectSpread(_objectSpread({}, categoryData), {}, {
      cat_image: file
    }));
  };
  const getCategoryDetail = () => {
    setLoading(true);
    _axiosClient.default.get("/categories/cat_detail/".concat(categoryName)).then(data => {
      setCategoryData(data.data.category);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };
  (0, _react.useEffect)(() => {
    getCategoryDetail();
  }, []);
  const catUpdateFormhandler = e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('cat_title', categoryData.cat_title);
    formData.append('cat_description', categoryData.cat_description);
    formData.append('cat_image', categoryData.cat_image);
    _axiosClient.default.post("/categories/update/".concat(categoryData.id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      _sweetalert.default.fire({
        position: "top-end",
        icon: "success",
        title: "Category Updated Successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
      navigate('/admin/categories');
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "card-header"
  }, "Edit Category"), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    fullScreen: true
  }) : /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: catUpdateFormhandler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "inputText3",
    className: "col-form-label"
  }, "Category Title"), /*#__PURE__*/_react.default.createElement("input", {
    onChange: handleInputChange,
    value: categoryData.cat_title,
    name: "cat_title",
    id: "inputText3",
    type: "text",
    className: "form-control"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-file mb-3"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    className: "custom-file-input",
    id: "customFile",
    name: "cat_image",
    onChange: handleImageChange,
    ref: imageInputRef
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "custom-file-label",
    for: "customFile"
  }, "Category Image"), /*#__PURE__*/_react.default.createElement("img", {
    style: {
      width: '7%'
    },
    src: "".concat(process.env.REACT_APP_LARAVEL_BASE_URL, "/").concat(categoryData.cat_image),
    alt: categoryData.cat_title
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group mt-4"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "exampleFormControlTextarea1"
  }, "Category Description"), /*#__PURE__*/_react.default.createElement("textarea", {
    name: "cat_description",
    onChange: handleInputChange,
    className: "form-control",
    id: "exampleFormControlTextarea1",
    rows: "3"
  }, categoryData.cat_description)), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "btn btn-success"
  }, "Update")))))))));
}
var _default = exports.default = EditCategory;