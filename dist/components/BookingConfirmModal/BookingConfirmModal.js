"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BookingConfirmModal;
var _Modal = _interopRequireDefault(require("@mui/material/Modal"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _material = require("@mui/material");
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: '90%',
  maxWidth: 500,
  bgcolor: '#FFF8F0',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};
function BookingConfirmModal(_ref) {
  let {
    open,
    onClose
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        navigate(_routes.ROUTES.userAppointment);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [open]);
  return /*#__PURE__*/React.createElement(_Modal.default, {
    open: open,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(_Box.default, {
    sx: style,
    className: "booking_conf_modal"
  }, /*#__PURE__*/React.createElement("img", {
    src: "".concat(process.env.REACT_APP_BASE_URL, "/logo-big.png"),
    alt: ""
  }), /*#__PURE__*/React.createElement(_Box.default, {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }, /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "h2",
    sx: {
      fontSize: '24px',
      fontWeight: '600',
      fontFamily: 'Barlow'
    }
  }, "Thanks for Choosing Us!"), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '18px',
      fontFamily: 'Barlow'
    }
  }, "Your Booking is confirmed.")), /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
    style: {
      width: '100%'
    },
    to: _routes.ROUTES.userAppointment
  }, /*#__PURE__*/React.createElement(_material.Button, {
    variant: "contained"
  }, "Done"))));
}