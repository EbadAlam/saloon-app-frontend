"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
function RoleRedirector(_ref) {
  let {
    user
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    var _user$user_info;
    if (!user) return;
    switch ((_user$user_info = user.user_info) === null || _user$user_info === void 0 ? void 0 : _user$user_info.role) {
      case 'master-admin':
        navigate(_routes.ROUTES.masterAdminDashboard);
        break;
      case 'owner':
        navigate(_routes.ROUTES.adminDashboard);
        break;
      case 'worker':
        navigate(_routes.ROUTES.workerDashboard);
        break;
      default:
        navigate(_routes.ROUTES.home);
    }
  }, [user, navigate]);
  return null;
}
var _default = exports.default = RoleRedirector;