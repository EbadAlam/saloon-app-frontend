"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _sweetalert = _interopRequireDefault(require("sweetalert2"));
var _reactRouterDom = require("react-router-dom");
var _NoData = _interopRequireDefault(require("../../NoData/NoData"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Categories() {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [categories, setCategories] = (0, _react.useState)([]);
  const [errors, setErrors] = (0, _react.useState)();
  const [selectAll, setSelectAll] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)('');
  const fetchCategories = () => {
    setLoading(true);
    _axiosClient.default.get('/categories/all').then(data => {
      // console.log(data.data.categories);
      setCategories(data.data.categories);
      setLoading(false);
    }).catch(e => {
      setErrors(e);
      console.error(e);
      setLoading(false);
    });
  };
  (0, _react.useEffect)(() => {
    fetchCategories();
  }, []);
  const categoryDelete = id => {
    _sweetalert.default.fire({
      title: "Do you want to delete the user?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete"
    }).then(result => {
      if (result.isConfirmed) {
        setLoading(true);
        // console.log(id, 'CategoryId');
        _axiosClient.default.delete("/categories/delete/".concat(id)).then(() => {
          fetchCategories();
          setLoading(false);
        }).catch(e => {
          console.error(e);
          setErrors(e);
          setLoading(false);
        });
        _sweetalert.default.fire("Category Deleted!", "", "success");
      } else if (result.isDenied) {
        _sweetalert.default.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleSelectAll = event => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked); // Update the checked state for all checkboxes in the tbody
    const updatedCategories = categories.map(category => {
      return _objectSpread(_objectSpread({}, category), {}, {
        isChecked
      });
    });
    setCategories(updatedCategories);
  };
  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return _objectSpread(_objectSpread({}, category), {}, {
          isChecked
        });
      }
      return category;
    });
    setCategories(updatedCategories);
  };
  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const handleApply = () => {
    if (selectedOption === 'delete') {
      _sweetalert.default.fire({
        title: "Are you sure?",
        text: "You want to delete selected categories? This process is not reversible",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete"
      }).then(result => {
        if (result.isConfirmed) {
          const selectedIds = categories.filter(category => category.isChecked).map(category => category.id);
          setLoading(true);
          _axiosClient.default.post('/categories/bulk-action', {
            action: selectedOption,
            category_ids: selectedIds
          }).then(() => {
            console.log('Bulk action performed successfully');
            setLoading(false);
          }).catch(error => {
            console.error('Error performing bulk action:', error);
            setLoading(false);
          });
          setSelectedOption('');
          fetchCategories();
          _sweetalert.default.fire("Category Deleted!", "", "success");
        } else if (result.isDenied) {
          _sweetalert.default.fire("Changes are not saved", "", "info");
        }
      });
    }
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
  }, "Categories"), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: "/admin/categories/add",
    className: "btn btn-light ml-3 mt-3"
  }, "Add Category"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-6 mt-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-lg-6 col-sm-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "bulkOptionContainer",
    className: "col-xs-4"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "form-control",
    name: "bulk_options",
    id: "bulk_options",
    onChange: handleOptionChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Options"), /*#__PURE__*/_react.default.createElement("option", {
    value: "delete"
  }, "Delete")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xs-4 col-lg-3"
  }, /*#__PURE__*/_react.default.createElement("input", {
    onClick: handleApply,
    type: "submit",
    name: "submit",
    className: "btn btn-success",
    value: "Apply",
    id: "applyCheckbox"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/_react.default.createElement("table", {
    className: "table table-striped table-bordered first"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, /*#__PURE__*/_react.default.createElement("input", {
    id: "selectAllBoxes",
    type: "checkbox",
    onChange: handleSelectAll,
    checked: selectAll
  })), /*#__PURE__*/_react.default.createElement("th", null, "S.No"), /*#__PURE__*/_react.default.createElement("th", null, "Title"), /*#__PURE__*/_react.default.createElement("th", null, "Description"), /*#__PURE__*/_react.default.createElement("th", null, "Image"), /*#__PURE__*/_react.default.createElement("th", null, "Edit"), /*#__PURE__*/_react.default.createElement("th", null, "Delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, loading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    fullScreen: false
  }) : categories.length > 0 ? categories.map((category, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: index
  }, /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("input", {
    className: "allCheckboxes",
    type: "checkbox",
    value: category.id,
    checked: category.isChecked,
    onChange: event => handleCheckboxChange(event, category.id)
  })), /*#__PURE__*/_react.default.createElement("td", null, index + 1), /*#__PURE__*/_react.default.createElement("td", null, category.cat_title), /*#__PURE__*/_react.default.createElement("td", null, category.cat_description), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("img", {
    style: {
      width: '45%'
    },
    src: "".concat(process.env.REACT_APP_LARAVEL_BASE_URL, "/").concat(category.cat_image),
    alt: category.cat_title
  })), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: "btn btn-success",
    to: "/admin/categories/edit/".concat(category.cat_title)
  }, "Edit")), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-danger",
    onClick: () => categoryDelete(category.id)
  }, "Delete")))) : /*#__PURE__*/_react.default.createElement(_NoData.default, {
    content: 'No Categories',
    tag: "p"
  }))))))))));
}
var _default = exports.default = Categories;