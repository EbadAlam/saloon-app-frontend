"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AddReviewForm = _ref => {
  let {
    onSubmit,
    storeId,
    userId,
    storeUsers = []
  } = _ref;
  const [rating, setRating] = (0, _react.useState)(0);
  const [review, setReview] = (0, _react.useState)("");
  const [title, setTitle] = (0, _react.useState)("");
  const [showForm, setShowForm] = (0, _react.useState)(false);
  const [targetUserId, setTargetUserId] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(false);
  const [alertMessage, setAlertMessage] = (0, _react.useState)("");
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "error");
    }
  }, [alertMessage]);
  const handleSubmit = async e => {
    e.preventDefault();
    setAlertMessage("");
    if (!rating) return setAlertMessage("Please provide a rating.");
    setLoading(true);
    const payload = {
      store_id: storeId,
      reviewer_id: userId,
      rating,
      review,
      title,
      reviewee_id: targetUserId || null
    };
    try {
      await onSubmit(payload);
      setRating(0);
      setReview("");
      setTargetUserId("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    component: "form",
    onSubmit: handleSubmit,
    sx: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      p: 3,
      border: "1px solid #ddd",
      borderRadius: 2,
      mx: "auto",
      mt: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    onClick: () => setShowForm(!showForm),
    sx: {
      cursor: "pointer"
    }
  }, "Write a Review"), showForm && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Rating, {
    name: "rating",
    value: rating,
    onChange: (_, newValue) => setRating(newValue),
    precision: 0.5
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Tagline",
    rows: 4,
    value: title,
    onChange: e => setTitle(e.target.value),
    required: true
  }), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    label: "Your review",
    multiline: true,
    rows: 4,
    value: review,
    onChange: e => setReview(e.target.value),
    required: true
  }), storeUsers.length > 0 && /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    id: "target-user-label"
  }, "Select store user (optional)"), /*#__PURE__*/_react.default.createElement(_material.Select, {
    labelId: "target-user-label",
    value: targetUserId,
    label: "Select store user (optional)",
    onChange: e => setTargetUserId(e.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    value: ""
  }, "None"), storeUsers.map(user => {
    var _user$user, _user$user2, _user$user3, _user$user4, _user$user5;
    return /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
      key: (_user$user = user.user) === null || _user$user === void 0 ? void 0 : _user$user.id,
      value: (_user$user2 = user.user) === null || _user$user2 === void 0 ? void 0 : _user$user2.id
    }, ((_user$user3 = user.user) === null || _user$user3 === void 0 ? void 0 : _user$user3.username) || ((_user$user4 = user.user) === null || _user$user4 === void 0 ? void 0 : _user$user4.name) || "User #".concat((_user$user5 = user.user) === null || _user$user5 === void 0 ? void 0 : _user$user5.id));
  }))), /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "submit",
    variant: "contained",
    disabled: loading,
    sx: {
      background: "#333333"
    }
  }, loading ? "Submitting..." : "Submit Review")));
};
var _default = exports.default = AddReviewForm;