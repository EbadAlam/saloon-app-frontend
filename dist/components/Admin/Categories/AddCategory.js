"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _reactRouterDom = require("react-router-dom");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function AddCategory() {
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [errors, setErrors] = (0, _react.useState)();
  const titleRef = (0, _react.useRef)();
  const descriptionRef = (0, _react.useRef)();
  const imageRef = (0, _react.useRef)();
  const CategoryFormSubmitHandler = e => {
    e.preventDefault();
    setErrors();
    setLoading(true);
    const payload = {
      cat_title: titleRef.current.value,
      cat_description: descriptionRef.current.value,
      cat_image: imageRef.current.files[0]
    };
    _axiosClient.default.post('/categories/add', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      _sweetalert.default.fire({
        position: "top-end",
        icon: "success",
        title: "Category Added Successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
      navigate('/admin/categories');
    }).catch(error => {
      const response = error.response;
      if (response && response.status === 422 || response.status === 401) {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          setErrors({
            email: [response.data.message]
          });
        }
      }
      setLoading(false);
    });
  };
  const showErrorAlert = errorMessage => {
    _sweetalert.default.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Validation Errors',
      text: errorMessage,
      showConfirmButton: true
    });
  };
  if (errors) {
    const errorMessage = Object.keys(errors).map(key => errors[key].map(message => "- ".concat(message)).join('\n')).join('\n');
    showErrorAlert(errorMessage);
  }
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
  }, "Add Category"), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    fullScreen: true
  }) : /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: CategoryFormSubmitHandler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "inputText3",
    className: "col-form-label"
  }, "Category Title"), /*#__PURE__*/_react.default.createElement("input", {
    ref: titleRef,
    id: "inputText3",
    type: "text",
    className: "form-control"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-file mb-3"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: imageRef,
    type: "file",
    className: "custom-file-input",
    id: "customFile"
  }), /*#__PURE__*/_react.default.createElement("label", {
    className: "custom-file-label",
    for: "customFile"
  }, "Category Image")), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "exampleFormControlTextarea1"
  }, "Category Description"), /*#__PURE__*/_react.default.createElement("textarea", {
    ref: descriptionRef,
    className: "form-control",
    id: "exampleFormControlTextarea1",
    rows: "3"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    className: "btn btn-success"
  }, "Submit")))))))));
}
var _default = exports.default = AddCategory;