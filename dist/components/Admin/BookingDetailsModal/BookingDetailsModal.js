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
  var _booking$worker, _booking$worker2, _booking$bundle, _booking$bundle$curre, _booking$bundle2, _booking$bundle$price, _booking$bundle3, _booking$bundle4, _booking$bundle5, _booking$bundle$curre2, _booking$bundle6, _booking$bundle7, _booking$bundle8, _booking$service, _booking$service2, _booking$service3, _booking$service4, _booking$service$gend, _booking$service5, _booking$user, _booking$worker3, _booking$worker4, _booking$worker5;
  let {
    open,
    onClose,
    booking,
    handleStatusChangeStatus
  } = _ref2;
  if (!booking) return null;
  const isBundleBooking = !!booking.bundle;
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
  }), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2",
    fontWeight: "600"
  }, isBundleBooking ? "Bundle Information" : "Service Information"), isBundleBooking && /*#__PURE__*/_react.default.createElement(_material.Chip, {
    label: "Bundle",
    size: "small",
    sx: {
      height: "20px",
      fontSize: "10px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      bgcolor: "#E6F1FB",
      color: "#0C447C"
    }
  })), isBundleBooking ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 2,
    className: "details_box"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Bundle Name",
    value: (_booking$bundle = booking.bundle) === null || _booking$bundle === void 0 ? void 0 : _booking$bundle.title
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Bundle Price",
    value: "".concat((_booking$bundle$curre = (_booking$bundle2 = booking.bundle) === null || _booking$bundle2 === void 0 ? void 0 : _booking$bundle2.currency) !== null && _booking$bundle$curre !== void 0 ? _booking$bundle$curre : "", " ").concat((_booking$bundle$price = (_booking$bundle3 = booking.bundle) === null || _booking$bundle3 === void 0 ? void 0 : _booking$bundle3.price) !== null && _booking$bundle$price !== void 0 ? _booking$bundle$price : "-")
  })), ((_booking$bundle4 = booking.bundle) === null || _booking$bundle4 === void 0 ? void 0 : _booking$bundle4.original_price) > ((_booking$bundle5 = booking.bundle) === null || _booking$bundle5 === void 0 ? void 0 : _booking$bundle5.price) && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(InfoBox, {
    label: "Original Price (before bundle discount)",
    value: "".concat((_booking$bundle$curre2 = (_booking$bundle6 = booking.bundle) === null || _booking$bundle6 === void 0 ? void 0 : _booking$bundle6.currency) !== null && _booking$bundle$curre2 !== void 0 ? _booking$bundle$curre2 : "", " ").concat((_booking$bundle7 = booking.bundle) === null || _booking$bundle7 === void 0 ? void 0 : _booking$bundle7.original_price)
  }))), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    color: "text.secondary",
    sx: {
      mt: 2,
      mb: 1
    }
  }, "Services included in this bundle"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      bgcolor: "#f9f9f9",
      borderRadius: "6px",
      p: 1.5
    }
  }, ((_booking$bundle8 = booking.bundle) === null || _booking$bundle8 === void 0 || (_booking$bundle8 = _booking$bundle8.services) === null || _booking$bundle8 === void 0 ? void 0 : _booking$bundle8.length) > 0 ? booking.bundle.services.map(s => /*#__PURE__*/_react.default.createElement(_material.Box, {
    key: s.id,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    sx: {
      py: 1,
      borderBottom: "0.5px solid #e5e5e5",
      "&:last-of-type": {
        borderBottom: "none"
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    sx: {
      fontWeight: 500
    }
  }, s.title), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    color: "text.secondary"
  }, s.eta ? "".concat(s.eta, " \u2022 ") : "", s.currency, " ", s.price))) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body2",
    color: "text.secondary"
  }, "No services found for this bundle."))) : /*#__PURE__*/_react.default.createElement(_material.Grid, {
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
  }), !isBundleBooking && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
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
  })), /*#__PURE__*/_react.default.createElement(_material.Typography, {
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