"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BookingDetailsModal;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
  maxHeight: "93vh",
  overflowY: "auto"
};
const InfoBox = _ref => {
  let {
    label,
    value
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      mb: 2
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    color: "text.secondary"
  }, label), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1",
    sx: {
      fontWeight: 500,
      bgcolor: "#f9f9f9",
      p: 1.2,
      borderRadius: "6px"
    }
  }, value !== null && value !== void 0 ? value : "-"));
};
function BookingDetailsModal(_ref2) {
  var _booking$worker, _booking$worker2, _booking$service, _booking$service2, _booking$service3, _booking$service4, _booking$service$gend, _booking$service5, _booking$user, _booking$worker3, _booking$worker4, _booking$worker5;
  let {
    open,
    onClose,
    booking,
    handleStatusChangeStatus
  } = _ref2;
  if (!booking) return null;
  return /*#__PURE__*/_react.default.createElement(_material.Modal, {
    open: open,
    onClose: onClose
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: style,
    className: "booking_detail_modal"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6",
    fontWeight: "600"
  }, "Booking Details ", (_booking$worker = booking.worker) !== null && _booking$worker !== void 0 && _booking$worker.username ? "\u2014 ".concat((_booking$worker2 = booking.worker) === null || _booking$worker2 === void 0 ? void 0 : _booking$worker2.username) : ""), /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null))), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      mb: 3
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600",
    gutterBottom: true
  }, "Service Information"), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    className: "details_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Service Name",
    value: (_booking$service = booking.service) === null || _booking$service === void 0 ? void 0 : _booking$service.title
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Service Price",
    value: "".concat((_booking$service2 = booking.service) === null || _booking$service2 === void 0 ? void 0 : _booking$service2.currency, " ").concat((_booking$service3 = booking.service) === null || _booking$service3 === void 0 ? void 0 : _booking$service3.price)
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Estimated Time",
    value: (_booking$service4 = booking.service) === null || _booking$service4 === void 0 ? void 0 : _booking$service4.eta
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Gender",
    value: (_booking$service$gend = (_booking$service5 = booking.service) === null || _booking$service5 === void 0 ? void 0 : _booking$service5.gender) !== null && _booking$service$gend !== void 0 ? _booking$service$gend : "-"
  }))), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      my: 3
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600",
    gutterBottom: true
  }, "Customer Information"), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    className: "details_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "User",
    value: (_booking$user = booking.user) === null || _booking$user === void 0 ? void 0 : _booking$user.username
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Date",
    value: new Date(booking.booking_date).toLocaleDateString("en-GB")
  }))), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      my: 3
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600",
    gutterBottom: true
  }, "Worker Information"), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    className: "details_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Worker",
    value: (_booking$worker3 = booking.worker) === null || _booking$worker3 === void 0 ? void 0 : _booking$worker3.username
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Role",
    value: (_booking$worker4 = booking.worker) === null || _booking$worker4 === void 0 || (_booking$worker4 = _booking$worker4.user_info) === null || _booking$worker4 === void 0 ? void 0 : _booking$worker4.designation
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Email",
    value: (_booking$worker5 = booking.worker) === null || _booking$worker5 === void 0 ? void 0 : _booking$worker5.email
  }))), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      my: 3
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600",
    gutterBottom: true
  }, "Schedule"), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    className: "details_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Start Time",
    value: new Date("1970-01-01T".concat(booking.booking_time)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "End Time",
    value: new Date("1970-01-01T".concat(booking.booking_time_end)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })
  }))), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    sx: {
      my: 3
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600",
    gutterBottom: true
  }, "Update Status"), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true
  }, /*#__PURE__*/_react.default.createElement(_material.Select, {
    defaultValue: booking.status,
    onChange: e => handleStatusChangeStatus(booking.id, e.target.value)
  }, ["pending", "confirmed", "no show", "cancelled", "completed"].map(status => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: status,
    value: status
  }, status.charAt(0).toUpperCase() + status.slice(1)))))));
}