"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axiosClient = _interopRequireDefault(require("../../../../axios-client"));
var _Layout = _interopRequireDefault(require("../../Layout/Layout"));
var _Loader = _interopRequireDefault(require("../../../Loader/Loader"));
var _BackButton = _interopRequireDefault(require("../../../BackButton/BackButton"));
var _reactRouterDom = require("react-router-dom");
var _SnackBarContext = require("../../../../contexts/SnackBarContext");
var _routes = require("../../../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const S = {
  page: {
    padding: '24px',
    background: '#f5f4f0',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  form: {
    background: '#fff',
    borderRadius: '12px',
    border: '0.5px solid #e0dfd8',
    padding: '24px'
  },
  field: {
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '0.5px solid #e0dfd8',
    fontSize: '13px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    color: '#1a1a2e'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '0.5px solid #e0dfd8',
    fontSize: '13px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    color: '#1a1a2e',
    resize: 'vertical'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '0.5px solid #e0dfd8',
    fontSize: '13px',
    background: '#fff',
    color: '#1a1a2e',
    boxSizing: 'border-box'
  },
  uploadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 18px',
    borderRadius: '8px',
    background: '#fff',
    color: '#1a1a2e',
    border: '1px solid #1a1a2e',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500
  },
  fileName: {
    fontSize: '12px',
    color: '#888',
    marginLeft: '10px'
  },
  sectionCard: {
    background: '#fafaf8',
    borderRadius: '10px',
    border: '0.5px solid #e0dfd8',
    padding: '18px',
    marginBottom: '16px'
  },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '12px'
  },
  addSectionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 18px',
    borderRadius: '8px',
    background: '#fff',
    color: '#1a1a2e',
    border: '1px solid #1a1a2e',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500,
    marginBottom: '20px'
  },
  saveBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    background: '#1a1a2e',
    color: '#fff',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: 500
  },
  actionsRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px'
  }
};
function MasterAddEditBlogPage() {
  var _form$tags;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    blogId
  } = (0, _reactRouterDom.useParams)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [form, setForm] = (0, _react.useState)({
    id: "",
    title: "",
    category: "",
    tags: "",
    short_description: "",
    sections: [{
      heading: "",
      content: "",
      image: null
    }],
    status: "published"
  });
  const [thumbnail, setThumbnail] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (blogId) {
      fetchBlogDetail(blogId);
    }
  }, [blogId]);
  const fetchBlogDetail = async id => {
    setLoading(true);
    try {
      var _data$blog$title, _data$blog$category, _data$blog$short_desc, _data$blog$status, _JSON$parse, _data$blog$tags, _data$blog$thumbnail;
      const {
        data
      } = await _axiosClient.default.get("/getBlogDetailsById/".concat(id));
      setForm({
        id: data.blog.id,
        title: (_data$blog$title = data.blog.title) !== null && _data$blog$title !== void 0 ? _data$blog$title : "",
        category: (_data$blog$category = data.blog.category) !== null && _data$blog$category !== void 0 ? _data$blog$category : "",
        short_description: (_data$blog$short_desc = data.blog.short_description) !== null && _data$blog$short_desc !== void 0 ? _data$blog$short_desc : "",
        status: (_data$blog$status = data.blog.status) !== null && _data$blog$status !== void 0 ? _data$blog$status : "",
        sections: (_JSON$parse = JSON.parse(data.blog.sections)) !== null && _JSON$parse !== void 0 ? _JSON$parse : "",
        tags: Array.isArray(data.blog.tags) ? data.blog.tags : JSON.parse((_data$blog$tags = data.blog.tags) !== null && _data$blog$tags !== void 0 ? _data$blog$tags : "[]")
      });
      setThumbnail((_data$blog$thumbnail = data.blog.thumbnail) !== null && _data$blog$thumbnail !== void 0 ? _data$blog$thumbnail : null);
    } catch (error) {
      console.log('error fetching blog details ', error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = e => {
    setForm(_objectSpread(_objectSpread({}, form), {}, {
      [e.target.name]: e.target.value
    }));
  };
  const handleSectionChange = (index, field, value) => {
    setForm(prev => {
      const updated = [...prev.sections];
      updated[index][field] = value;
      return _objectSpread(_objectSpread({}, prev), {}, {
        sections: updated
      });
    });
  };
  const addSection = () => {
    setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
      sections: [...prev.sections, {
        heading: "",
        content: "",
        image: null
      }]
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const tagsArray = form.tags ? form.tags.length > 1 ? form.tags.split(",").map(tag => tag.trim()).filter(Boolean) : [] : form.tags.map(tag => tag.trim()).filter(Boolean);
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("thumbnail", thumbnail);
    formData.append("category", form.category);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("short_description", form.short_description);
    formData.append("status", form.status);
    form.sections.forEach((section, index) => {
      formData.append("sections[".concat(index, "][heading]"), section.heading);
      formData.append("sections[".concat(index, "][content]"), section.content);
      if (section.image) {
        formData.append("sections[".concat(index, "][image]"), section.image);
      }
    });
    try {
      await _axiosClient.default.post('/addBlog', formData);
      showSnackbar("Blog ".concat(blogId ? "updated" : "created", " successfully!"), 'success');
      navigate(_routes.ROUTES.masterAdminBlogs);
    } catch (error) {
      console.error('error adding blog', error);
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Layout.default, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    style: S.page
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.header
  }, /*#__PURE__*/_react.default.createElement("h5", {
    style: S.title
  }, blogId ? 'Edit' : 'Add', " Blog"), /*#__PURE__*/_react.default.createElement("div", {
    style: S.headerActions
  }, /*#__PURE__*/_react.default.createElement(_BackButton.default, null))), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.form
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.label
  }, "Blog Title"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.input,
    type: "text",
    name: "title",
    value: form.title,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.label
  }, "Category"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.input,
    type: "text",
    name: "category",
    value: form.category,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.label
  }, "Tags (comma separated)"), /*#__PURE__*/_react.default.createElement("input", {
    style: S.input,
    type: "text",
    name: "tags",
    value: (_form$tags = form.tags) !== null && _form$tags !== void 0 ? _form$tags : "",
    onChange: e => {
      setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
        tags: e.target.value
      }));
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.label
  }, "Short Description"), /*#__PURE__*/_react.default.createElement("textarea", {
    style: S.textarea,
    rows: 3,
    value: form.short_description,
    onChange: e => setForm(prev => _objectSpread(_objectSpread({}, prev), {}, {
      short_description: e.target.value
    }))
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.label
  }, "Status"), /*#__PURE__*/_react.default.createElement("select", {
    style: S.select,
    name: "status",
    value: form.status,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "draft"
  }, "Draft"), /*#__PURE__*/_react.default.createElement("option", {
    value: "published"
  }, "Published"))), /*#__PURE__*/_react.default.createElement("div", {
    style: S.field
  }, /*#__PURE__*/_react.default.createElement("label", {
    style: S.uploadBtn
  }, "Upload Thumbnail", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    hidden: true,
    accept: "image/*",
    onChange: e => setThumbnail(e.target.files[0])
  })), thumbnail && /*#__PURE__*/_react.default.createElement("span", {
    style: S.fileName
  }, thumbnail.name)), form.sections.map((section, index) => {
    var _section$image;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      style: S.sectionCard
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: S.sectionLabel
    }, "Section ", index + 1), /*#__PURE__*/_react.default.createElement("div", {
      style: S.field
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: S.label
    }, "Section Heading"), /*#__PURE__*/_react.default.createElement("input", {
      style: S.input,
      type: "text",
      value: section.heading,
      onChange: e => handleSectionChange(index, "heading", e.target.value)
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: S.field
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: S.label
    }, "Section Content"), /*#__PURE__*/_react.default.createElement("textarea", {
      style: S.textarea,
      rows: 4,
      value: section.content,
      onChange: e => handleSectionChange(index, "content", e.target.value)
    })), /*#__PURE__*/_react.default.createElement("label", {
      style: S.uploadBtn
    }, "Upload Section Image", /*#__PURE__*/_react.default.createElement("input", {
      type: "file",
      hidden: true,
      onChange: e => handleSectionChange(index, "image", e.target.files[0])
    })), ((_section$image = section.image) === null || _section$image === void 0 ? void 0 : _section$image.name) && /*#__PURE__*/_react.default.createElement("span", {
      style: S.fileName
    }, section.image.name));
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: S.actionsRow
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: addSection,
    style: S.addSectionBtn
  }, "+ Add Section"), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    style: S.saveBtn
  }, blogId ? "Update Blog" : "Create Blog"))))));
}
var _default = exports.default = MasterAddEditBlogPage;