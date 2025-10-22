"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _StarHalf = _interopRequireDefault(require("@mui/icons-material/StarHalf"));
var _StarBorder = _interopRequireDefault(require("@mui/icons-material/StarBorder"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StarRating = _ref => {
  let {
    rating,
    size = 'medium',
    color = '#333333'
  } = _ref;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const filled = i + 1 <= rating;
    const half = i + 0.5 <= rating && i + 1 > rating;
    if (filled) {
      stars.push(/*#__PURE__*/_react.default.createElement(_Star.default, {
        key: i,
        fontSize: size,
        style: {
          color
        }
      }));
    } else if (half) {
      stars.push(/*#__PURE__*/_react.default.createElement(_StarHalf.default, {
        key: i,
        fontSize: size,
        style: {
          color
        }
      }));
    } else {
      stars.push(/*#__PURE__*/_react.default.createElement(_StarBorder.default, {
        key: i,
        fontSize: size,
        style: {
          color
        }
      }));
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, stars);
};
var _default = exports.default = StarRating;