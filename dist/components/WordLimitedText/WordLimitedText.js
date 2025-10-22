"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WordLimitedText;
var _material = require("@mui/material");
function WordLimitedText(_ref) {
  let {
    text,
    wordLimit = 20
  } = _ref;
  const words = text === null || text === void 0 ? void 0 : text.split(" ");
  const limitedText = words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  return /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "body1"
  }, limitedText);
}