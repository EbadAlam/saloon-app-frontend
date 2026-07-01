"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../../routes");
var _AuthContext = require("../../../contexts/AuthContext");
var _ArrowBackIosNew = _interopRequireDefault(require("@mui/icons-material/ArrowBackIosNew"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function SideBar() {
  var _user$user_info, _user$user_info2;
  const {
    storeId
  } = (0, _reactRouterDom.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    user,
    logout
  } = (0, _AuthContext.useAuth)();
  const [open, setOpen] = (0, _react.useState)(false);
  const [headerProfile, setHeaderProfile] = (0, _react.useState)(false);
  const [collapsed, setCollapsed] = (0, _react.useState)(false);
  const headerProfileClick = () => {
    setHeaderProfile(!headerProfile);
  };
  const handleLogout = () => {
    logout();
    navigate(_routes.ROUTES.loginSignup, {
      replace: true
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "nav-left-sidebar sidebar-dark ".concat(collapsed ? "collapsed" : "")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-list"
  }, /*#__PURE__*/_react.default.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-light"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setOpen(!open),
    className: "navbar-toggler s",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navbarNav",
    "aria-controls": "navbarNav",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/_react.default.createElement("a", {
    onClick: headerProfileClick,
    className: "nav-link nav-user-img mobile",
    href: "#",
    id: "navbarDropdownMenuLink2"
  }, (_user$user_info = user.user_info) !== null && _user$user_info !== void 0 && _user$user_info.profile_image ? ((_user$user_info2 = user.user_info) === null || _user$user_info2 === void 0 ? void 0 : _user$user_info2.signup_platform) == "manual" ? /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(user.user_info.profile_image),
    alt: "",
    className: "user-avatar-md rounded-circle"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: user.user_info.profile_image,
    alt: "",
    className: "user-avatar-md rounded-circle"
  }) : /*#__PURE__*/_react.default.createElement("img", {
    src: "https://avatar.iran.liara.run/public/boy?username=".concat(user.username),
    alt: "",
    className: "user-avatar-md rounded-circle"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "collapse navbar-collapse ".concat(open && "show"),
    id: "navbarNav"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "navbar-nav flex-column"
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-divider"
  }, "Menu"), user && user.user_info.role === "owner" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref => {
      let {
        isActive
      } = _ref;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.adminDashboard
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-database"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Dashboard"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref2 => {
      let {
        isActive
      } = _ref2;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.adminStores
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-building"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Stores"))), storeId && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref3 => {
      let {
        isActive
      } = _ref3;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminAddCategory(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-bars"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Categories"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref4 => {
      let {
        isActive
      } = _ref4;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminAddServices(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-th"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Services"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref5 => {
      let {
        isActive
      } = _ref5;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminBookings(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-calendar-alt"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Bookings"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref6 => {
      let {
        isActive
      } = _ref6;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminPortfolio(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-calendar-alt"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Portfolio"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref7 => {
      let {
        isActive
      } = _ref7;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminAddWorkingHours(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-hourglass-half"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Working Hours"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref8 => {
      let {
        isActive
      } = _ref8;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminAddTeamMembers(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-users"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Team Members"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item child-nav-vendor"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref9 => {
      let {
        isActive
      } = _ref9;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.getAdminReviews(storeId)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-gem"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Reviews"))))) : user.user_info.role === "worker" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref0 => {
      let {
        isActive
      } = _ref0;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.workerDashboard
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-database"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Dashboard"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref1 => {
      let {
        isActive
      } = _ref1;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.workerBookings
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-calendar-alt"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Bookings"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref10 => {
      let {
        isActive
      } = _ref10;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.workerReviews
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-gem"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Your Reviews")))) : user.user_info.role === "master-admin" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref11 => {
      let {
        isActive
      } = _ref11;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminDashboard
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-database"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Dashboard"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref12 => {
      let {
        isActive
      } = _ref12;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminUsers
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-users"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Users"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref13 => {
      let {
        isActive
      } = _ref13;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminServicesCategories
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-bars"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Categories"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref14 => {
      let {
        isActive
      } = _ref14;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminServices
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-th"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Services"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref15 => {
      let {
        isActive
      } = _ref15;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminStores
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-building"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Stores"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref16 => {
      let {
        isActive
      } = _ref16;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminBookings
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-calendar-alt"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Bookings"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref17 => {
      let {
        isActive
      } = _ref17;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminReviews
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-gem"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Reviews"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref18 => {
      let {
        isActive
      } = _ref18;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminBlogs
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-fw fa-gem"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Blogs"))), /*#__PURE__*/_react.default.createElement("li", {
    className: "nav-item "
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    className: _ref19 => {
      let {
        isActive
      } = _ref19;
      return "nav-link ".concat(isActive ? "active" : "");
    },
    to: _routes.ROUTES.masterAdminInqueries
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-question-circle"
  }), " ", /*#__PURE__*/_react.default.createElement("span", null, "Inqueries")))) : ""))))), headerProfile ? /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-menu dropdown-menu-right nav-user-dropdown",
    style: {
      display: "block",
      top: "130px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "nav-user-info"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "mb-0 text-white nav-user-name text-capitalize"
  }, user.username)), /*#__PURE__*/_react.default.createElement("a", {
    onClick: handleLogout,
    style: {
      cursor: "pointer"
    },
    className: "dropdown-item"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fas fa-power-off mr-2"
  }), "Logout")) : null);
}
var _default = exports.default = SideBar;