"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactRouterDom = require("react-router-dom");
var _Layout = _interopRequireDefault(require("../Layout/Layout"));
var _routes = require("../../../routes");
var _Loader = _interopRequireDefault(require("../../Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../../axios-client"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
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
  addServicesBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
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
  sep: {
    color: "#bbb",
    fontSize: "13px"
  },
  tables: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden",
    position: "relative"
  },
  cardTitle: {
    padding: "14px 16px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #f0efe8"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  },
  th: {
    padding: "10px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    borderBottom: "1px solid #f0efe8"
  },
  thRight: {
    padding: "10px 14px",
    textAlign: "right",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    borderBottom: "1px solid #f0efe8"
  },
  td: {
    padding: "11px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0"
  },
  tdRight: {
    padding: "11px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
    textAlign: "right"
  },
  tdNum: {
    padding: "11px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0"
  },
  saveBtn: disabled => ({
    padding: "8px 20px",
    borderRadius: "8px",
    background: disabled ? "#ccc" : "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 500
  })
};
function ServiceCategoriesPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [allCatLoading, setAllCatLoading] = (0, _react.useState)(true);
  const [serviceCategories, setServiceCategories] = (0, _react.useState)([]);
  const [allCategories, setAllCategories] = (0, _react.useState)([]);
  const [selectedCategories, setSelectedCategories] = (0, _react.useState)([]);
  const [storeName, setStoreName] = (0, _react.useState)("");
  const [removeCategories, setRemoveCategories] = (0, _react.useState)([]);
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  (0, _react.useEffect)(() => {
    fetchCategories();
    fetchAllCategories();
  }, []);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getServicesCategory/".concat(storeId));
      setServiceCategories(data.categories || []);
      setStoreName(data.storeName || '');
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllCategories = async () => {
    setAllCatLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get('/getAllCategories');
      setAllCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch all categories:', error);
    } finally {
      setAllCatLoading(false);
    }
  };
  const availableCategories = allCategories.filter(cat => !serviceCategories.some(sc => sc.category_id === cat.id));
  const handleAddCheckboxChange = categoryId => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };
  const handleRemoveCheckboxChange = categoryId => {
    setRemoveCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };
  const handleSave = async () => {
    try {
      if (selectedCategories.length > 0) {
        await _axiosClient.default.post("/addCategoriesToStore/".concat(storeId), {
          category_ids: selectedCategories
        });
      }
      if (removeCategories.length > 0) {
        await _axiosClient.default.post("/removeCategoriesFromStore/", {
          ids: removeCategories
        });
      }
      await fetchCategories();
      setSelectedCategories([]);
      setRemoveCategories([]);
      showSnackbar("Changes saved successfully!", "success");
    } catch (error) {
      console.error('Error saving changes:', error);
      showSnackbar("Failed to save changes.", "error");
    }
  };
  const noChanges = selectedCategories.length === 0 && removeCategories.length === 0;
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.nav
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.backBtn,
    onClick: () => window.history.back()
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    style: {
      fontSize: 14
    }
  }), " Back"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.adminStores,
    style: S.crumb
  }, "Stores"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminSingleStore(storeId),
    style: S.crumb
  }, storeName || "..."), /*#__PURE__*/_react.default.createElement("span", {
    style: S.sep
  }, "\u203A"), /*#__PURE__*/_react.default.createElement("span", {
    style: S.crumbActive
  }, "Service Categories"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.tables
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.cardTitle
  }, "Store categories"), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Title"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.thRight
  }, "Remove"))), /*#__PURE__*/_react.default.createElement("tbody", null, serviceCategories.length > 0 ? serviceCategories.filter(c => c.category.status == 'active').map((cat, i) => {
    var _cat$category;
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: cat.category_id
    }, /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdNum
    }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
      style: S.td
    }, (_cat$category = cat.category) === null || _cat$category === void 0 ? void 0 : _cat$category.title, " "), /*#__PURE__*/_react.default.createElement("td", {
      style: S.tdRight
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      checked: removeCategories.includes(cat.id),
      onChange: () => handleRemoveCheckboxChange(cat.id),
      style: {
        width: 15,
        height: 15,
        accentColor: "#1a1a2e",
        cursor: "pointer"
      }
    })));
  }) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 3,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "28px"
    })
  }, "No categories"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.cardTitle
  }, "Available categories"), allCatLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Title"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.thRight
  }, "Add"))), /*#__PURE__*/_react.default.createElement("tbody", null, availableCategories.filter(c => c.status === 'active').length > 0 ? availableCategories.filter(c => c.status === 'active').map((cat, i) => /*#__PURE__*/_react.default.createElement("tr", {
    key: cat.id
  }, /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdNum
  }, i + 1), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, cat.title), /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdRight
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectedCategories.includes(cat.id),
    onChange: () => handleAddCheckboxChange(cat.id),
    style: {
      width: 15,
      height: 15,
      accentColor: "#1a1a2e",
      cursor: "pointer"
    }
  })))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 3,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "28px"
    })
  }, "No categories")))))), /*#__PURE__*/_react.default.createElement("button", {
    style: S.saveBtn(noChanges),
    onClick: handleSave,
    disabled: noChanges
  }, "Save changes")));
}
var _default = exports.default = ServiceCategoriesPage;