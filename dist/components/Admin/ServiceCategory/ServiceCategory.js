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
var _BackButton = _interopRequireDefault(require("../../BackButton/BackButton"));
var _SnackBarContext = require("../../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ServiceCategoriesPage() {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [allCatLoading, setAllCatLoading] = (0, _react.useState)(true);
  const [serviceCategories, setServiceCategories] = (0, _react.useState)([]);
  const [allCategories, setAllCategories] = (0, _react.useState)([]);
  const [selectedCategories, setSelectedCategories] = (0, _react.useState)([]);
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
      showSnackbar("Changes save successfully!", "success");
    } catch (error) {
      console.error('Error saving changes:', error);
      showSnackbar("Failed to save changes.", "error");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid dashboard-content"
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4"
  }, "Service Categories"), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    gap: 2
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), serviceCategories && serviceCategories.length > 0 && /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: _routes.ROUTES.getAdminAddServices(storeId),
    state: {
      servicesCategories: serviceCategories
    },
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained"
  }, "Add Services")))), /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "start",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    sx: {
      maxWidth: 650,
      position: 'relative'
    },
    component: _material.Paper
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "Services Categories Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Remove from store"))), /*#__PURE__*/_react.default.createElement(_material.TableBody, null, serviceCategories && serviceCategories.length > 0 ? serviceCategories.map((singleCat, index) => {
    var _singleCat$category;
    return /*#__PURE__*/_react.default.createElement(_material.TableRow, {
      key: singleCat.category_id
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "left"
    }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, (_singleCat$category = singleCat.category) === null || _singleCat$category === void 0 ? void 0 : _singleCat$category.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      align: "right"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      checked: removeCategories.includes(singleCat.id),
      onChange: () => handleRemoveCheckboxChange(singleCat.id)
    })));
  }) : /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    colSpan: 3,
    align: "center"
  }, "No Categories"))))), /*#__PURE__*/_react.default.createElement(_material.TableContainer, {
    sx: {
      maxWidth: 650,
      position: 'relative'
    },
    component: _material.Paper
  }, allCatLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "All Categories Table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, "#"), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, "Title"), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, "Add to store"))), /*#__PURE__*/_react.default.createElement(_material.TableBody, null, availableCategories && availableCategories.length > 0 ? availableCategories.map((singleCat, index) => /*#__PURE__*/_react.default.createElement(_material.TableRow, {
    key: singleCat.id
  }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "left"
  }, index + 1), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, singleCat.title), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    align: "right"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectedCategories.includes(singleCat.id),
    onChange: () => handleAddCheckboxChange(singleCat.id)
  })))) : /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    colSpan: 3,
    align: "center"
  }, "No Categories")))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    color: "primary",
    onClick: handleSave,
    disabled: selectedCategories.length === 0 && removeCategories.length === 0
  }, "Save Changes"))));
}
var _default = exports.default = ServiceCategoriesPage;