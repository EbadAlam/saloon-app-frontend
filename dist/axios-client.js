"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const axiosClient = _axios.default.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = "Bearer ".concat(token);
  return config;
});
axiosClient.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('AUTH_USER');
  }
  return Promise.reject(error);
});
var _default = exports.default = axiosClient;