"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _ActiveDeactiveSwitch = _interopRequireDefault(require("../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch"));
var _DeleteButton = _interopRequireDefault(require("../../../DeleteButton/DeleteButton"));
var _reactRouterDom = require("react-router-dom");
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
var _DragIndicator = _interopRequireDefault(require("@mui/icons-material/DragIndicator"));
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  addBtn: {
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px"
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "0.5px solid #e0dfd8",
    background: "#fff",
    fontSize: "13px",
    color: "#1a1a2e"
  },
  applyBtn: {
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px"
  },
  formTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "14px"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "0.5px solid #e0dfd8",
    fontSize: "13px",
    marginBottom: "12px",
    boxSizing: "border-box"
  },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
    marginBottom: "12px"
  },
  fileName: {
    fontSize: "12px",
    color: "#888",
    marginLeft: "10px"
  },
  saveBtn: {
    marginTop: "6px",
    padding: "9px 20px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px"
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8"
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle"
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0"
  },
  dragHandle: {
    cursor: "grab",
    color: "#bbb",
    display: "flex",
    alignItems: "center"
  },
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a",
    textTransform: "capitalize"
  },
  badgeDisabled: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#fcebeb",
    color: "#791f1f",
    textTransform: "capitalize"
  },
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500
  }
};
function SortableRow(_ref) {
  var _category$services_co;
  let {
    category,
    index,
    pageOffset,
    onEdit
  } = _ref;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = (0, _sortable.useSortable)({
    id: category.id
  });
  const style = {
    transform: _utilities.CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#faf7f8" : index % 2 === 0 ? "#fff" : "#fafaf8"
  };
  return /*#__PURE__*/_react.default.createElement("tr", {
    ref: setNodeRef,
    style: style,
    className: category._highlight ? "blink-highlight" : ""
  }, /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("span", _extends({
    style: S.dragHandle
  }, attributes, listeners), /*#__PURE__*/_react.default.createElement(_DragIndicator.default, {
    style: {
      fontSize: 18
    }
  }))), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: "allCheckboxes",
    type: "checkbox",
    checked: !!category.isChecked,
    onChange: category._onCheckboxChange
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.tdNum
  }, pageOffset + index + 1), /*#__PURE__*/_react.default.createElement("td", {
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      fontWeight: 500
    })
  }, category.title), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, (_category$services_co = category.services_count) !== null && _category$services_co !== void 0 ? _category$services_co : 0), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: category.status === "active" ? S.badgeActive : S.badgeDisabled
  }, category.status)), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_ActiveDeactiveSwitch.default, {
    id: category.id,
    apiUrl: "/updateServicesCategoryStatus",
    status: category.status,
    onStatusChange: category._onStatusChange
  })), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: S.editBtn,
    onClick: () => onEdit(category.id, category.title)
  }, "Edit")), /*#__PURE__*/_react.default.createElement("td", {
    style: S.td
  }, /*#__PURE__*/_react.default.createElement(_DeleteButton.default, {
    id: category.id,
    url: "/deleteServicesCategory",
    onStatusChange: category._onStatusChange
  })));
}
function MasterCategoriesPage() {
  var _location$state$highl, _location$state;
  const [loading, setLoading] = (0, _react.useState)(true);
  const [categories, setCategories] = (0, _react.useState)([]);
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)("");
  const [thumbnail, setThumbnail] = (0, _react.useState)();
  const [categoryId, setCategoryId] = (0, _react.useState)("");
  const location = (0, _reactRouterDom.useLocation)();
  const [highlightId, setHighlightId] = (0, _react.useState)((_location$state$highl = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.highlightId) !== null && _location$state$highl !== void 0 ? _location$state$highl : "");
  const highlightedRef = (0, _react.useRef)(null);
  const [selectAll, setSelectAll] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)("active");
  const [alertOpen, setAlertOpen] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [pagination, setPagination] = (0, _react.useState)({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 15
  });
  const sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }));
  (0, _react.useEffect)(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async function () {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    setLoading(true);
    try {
      const {
        data
      } = await _axiosClient.default.get("/getAllCategoriesMaster?page=".concat(page));
      setCategories(data.categories.data);
      setPagination({
        current_page: data.categories.current_page,
        last_page: data.categories.last_page,
        total: data.categories.total,
        per_page: data.categories.per_page
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (e, page) => {
    fetchCategories(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleToggleForm = () => {
    setTitle("");
    setCategoryId("");
    setThumbnail(null);
    setShowForm(prev => !prev);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (categoryId) formData.append("id", categoryId);
      formData.append("title", title);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      const {
        data
      } = await _axiosClient.default.post("/addNewCategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      showSnackbar(data.message || "New category added", "success");
      fetchCategories(pagination.current_page);
      setTitle("");
      setThumbnail(null);
    } catch (error) {
      console.error("Failed to add/edit category:", error);
      showSnackbar("Failed to save category", "error");
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };
  const handleStatusChange = function (newStatus) {
    let fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    showSnackbar(newStatus.message, newStatus.success ? "success" : "error");
    if (fetch) fetchCategories(pagination.current_page);
  };
  (0, _react.useEffect)(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId("");
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, categories]);
  const handleToggleEditForm = (id, title) => {
    setCategoryId(id);
    setTitle(title);
    setShowForm(true);
  };
  const handleSelectAll = event => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setCategories(categories.map(c => _objectSpread(_objectSpread({}, c), {}, {
      isChecked
    })));
  };
  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;
    setCategories(categories.map(c => c.id === categoryId ? _objectSpread(_objectSpread({}, c), {}, {
      isChecked
    }) : c));
  };
  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };
  const handleApply = () => {
    if (selectedOption === "delete") {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };
  const bulkActionFunction = async () => {
    const selectedIds = categories.filter(category => category.isChecked).map(category => category.id);
    if (selectedIds.length === 0) {
      showSnackbar("Select any category to update", "error");
      setAlertOpen(false);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        model: "ServicesCategory",
        selectedIds,
        action: selectedOption
      };
      const {
        data
      } = await _axiosClient.default.post("/bulkOptionPerform", payload);
      showSnackbar(data.message || "Bulk action performed", "success");
      fetchCategories(pagination.current_page);
    } catch (error) {
      console.error("Error performing bulk options ", error);
    } finally {
      setSelectAll(false);
      setLoading(false);
      setAlertOpen(false);
    }
  };
  const pageOffset = (pagination.current_page - 1) * pagination.per_page;
  const persistOrder = orderedCategories => {
    const order = orderedCategories.map((c, index) => ({
      id: c.id,
      order: pageOffset + index
    }));
    _axiosClient.default.post("/categories/reorder", {
      order
    }).catch(e => console.error(e));
  };
  const handleDragEnd = event => {
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    setCategories(prev => {
      const oldIndex = prev.findIndex(c => c.id === active.id);
      const newIndex = prev.findIndex(c => c.id === over.id);
      const reordered = (0, _sortable.arrayMove)(prev, oldIndex, newIndex);
      persistOrder(reordered);
      return reordered;
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    open: alertOpen,
    onClose: () => setAlertOpen(false)
  }, /*#__PURE__*/_react.default.createElement(_material.DialogTitle, null, "Confirm Deletion"), /*#__PURE__*/_react.default.createElement(_material.DialogContent, null, /*#__PURE__*/_react.default.createElement(_material.DialogContentText, null, "Are you sure you want to delete these items? This action cannot be undone.")), /*#__PURE__*/_react.default.createElement(_material.DialogActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: () => setAlertOpen(false)
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    color: "error",
    onClick: bulkActionFunction,
    autoFocus: true
  }, "Delete"))), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h5", {
    style: S.title
  }, "Categories"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.headerActions
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement("button", {
    style: S.addBtn,
    onClick: handleToggleForm
  }, showForm ? "Cancel" : "+ Add Category"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.toolbar
  }, /*#__PURE__*/_react.default.createElement("select", {
    style: S.select,
    value: selectedOption,
    onChange: handleOptionChange
  }, [{
    label: "Active",
    value: "active"
  }, {
    label: "Deactive",
    value: "inactive"
  }, {
    label: "delete",
    value: "delete"
  }].map(status => /*#__PURE__*/_react.default.createElement("option", {
    key: status.value,
    value: status.value
  }, status.label))), /*#__PURE__*/_react.default.createElement("button", {
    style: S.applyBtn,
    onClick: handleApply
  }, "Save")), showForm && /*#__PURE__*/_react.default.createElement("div", {
    style: S.form
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.formTitle
  }, categoryId ? "Update" : "Add new", " category"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleFormSubmit
  }, /*#__PURE__*/_react.default.createElement("input", {
    style: S.input,
    type: "text",
    placeholder: "Category name",
    value: title,
    onChange: e => setTitle(e.target.value),
    required: true
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    style: S.uploadBtn
  }, "Upload Thumbnail", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: e => setThumbnail(e.target.files[0])
  })), thumbnail && /*#__PURE__*/_react.default.createElement("span", {
    style: S.fileName
  }, "Selected: ", thumbnail.name)), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.saveBtn
  }, categoryId ? "Update Category" : "Add Category"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.card
  }, /*#__PURE__*/_react.default.createElement("table", {
    style: S.table
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    checked: selectAll,
    onChange: handleSelectAll
  })), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "#"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Title"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Services Associated"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Change Status"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Edit"), /*#__PURE__*/_react.default.createElement("th", {
    style: S.th
  }, "Delete"))), /*#__PURE__*/_react.default.createElement("tbody", null, categories && categories.length > 0 ? /*#__PURE__*/_react.default.createElement(_core.DndContext, {
    sensors: sensors,
    collisionDetection: _core.closestCenter,
    onDragEnd: handleDragEnd
  }, /*#__PURE__*/_react.default.createElement(_sortable.SortableContext, {
    items: categories.map(c => c.id),
    strategy: _sortable.verticalListSortingStrategy
  }, categories.sort((a, b) => a.order - b.order).map((singleCat, index) => /*#__PURE__*/_react.default.createElement(SortableRow, {
    key: singleCat.id,
    category: _objectSpread(_objectSpread({}, singleCat), {}, {
      _onCheckboxChange: e => handleCheckboxChange(e, singleCat.id),
      _onStatusChange: handleStatusChange,
      _highlight: singleCat.id === highlightId
    }),
    index: index,
    pageOffset: pageOffset,
    onEdit: handleToggleEditForm
  })))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 9,
    style: _objectSpread(_objectSpread({}, S.td), {}, {
      textAlign: "center",
      color: "#aaa",
      padding: "32px"
    })
  }, "No Categories"))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Pagination, {
    count: pagination.last_page,
    page: pagination.current_page,
    onChange: handlePageChange,
    color: "primary",
    shape: "rounded"
  }))));
}
var _default = exports.default = MasterCategoriesPage;