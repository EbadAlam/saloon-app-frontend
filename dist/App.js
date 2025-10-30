"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./App.scss");
require("./responsive.scss");
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("./screens/Home/Home"));
var _Login = _interopRequireDefault(require("./screens/Login/Login"));
var _ProtectedRoute = _interopRequireDefault(require("./components/ProtectedRoute"));
var _Dashboard = _interopRequireDefault(require("./components/Admin/Dashboard/Dashboard"));
var _Signup = _interopRequireDefault(require("./screens/Signup/Signup"));
var _VerifyEmail = _interopRequireDefault(require("./screens/VerifyEmail/VerifyEmail"));
var _Stores = _interopRequireDefault(require("./components/Admin/Stores/Stores"));
var _routes = require("./routes");
var _AddStore = _interopRequireDefault(require("./components/Admin/Stores/AddStore"));
var _ServiceCategory = _interopRequireDefault(require("./components/Admin/ServiceCategory/ServiceCategory"));
var _Services = _interopRequireDefault(require("./components/Admin/Services/Services"));
var _Store = _interopRequireDefault(require("./screens/Store/Store"));
var _EditStore = _interopRequireDefault(require("./components/Admin/Stores/EditStore"));
var _WorkingHours = _interopRequireDefault(require("./components/Admin/WorkingHours/WorkingHours"));
var _Team = _interopRequireDefault(require("./components/Admin/Team/Team"));
var _MainComponent = _interopRequireDefault(require("./components/MainComponent/MainComponent"));
require("leaflet/dist/leaflet.css");
var _Dashboard2 = _interopRequireDefault(require("./components/Worker/Dashboard/Dashboard"));
var _Reviews = _interopRequireDefault(require("./components/Worker/Reviews/Reviews"));
var _Page = _interopRequireDefault(require("./screens/404Page/404Page"));
var _AllReviews = _interopRequireDefault(require("./screens/AllReviews/AllReviews"));
var _Bookings = _interopRequireDefault(require("./components/Worker/Bookings/Bookings"));
var _LoginSignup = _interopRequireDefault(require("./screens/LoginSignup/LoginSignup"));
var _CustomerLogin = _interopRequireDefault(require("./screens/Login/CustomerLogin"));
var _ProfessionalLogin = _interopRequireDefault(require("./screens/Login/ProfessionalLogin"));
var _Booking = _interopRequireDefault(require("./screens/Booking/Booking"));
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
var _Bookings2 = _interopRequireDefault(require("./components/Admin/Bookings/Bookings"));
var _ScrollToTop = _interopRequireDefault(require("./components/ScrollToTop/ScrollToTop"));
var _SearchPage = _interopRequireDefault(require("./screens/SearchPage/SearchPage"));
var _ForBusiness = _interopRequireDefault(require("./screens/ForBusiness/ForBusiness"));
var _Profile = _interopRequireDefault(require("./screens/Profile/Profile"));
var _Appointments = _interopRequireDefault(require("./screens/Appointments/Appointments"));
var _Favorites = _interopRequireDefault(require("./screens/Favorites/Favorites"));
var _MasterAdminLogin = _interopRequireDefault(require("./screens/Login/MasterAdminLogin"));
var _Users = _interopRequireDefault(require("./components/Admin/MasterAdmin/Users/Users"));
var _Dashboard3 = _interopRequireDefault(require("./components/Admin/MasterAdmin/Dashboard/Dashboard"));
var _StoreGallery = _interopRequireDefault(require("./screens/Store/StoreGallery"));
var _Categories = _interopRequireDefault(require("./components/Admin/MasterAdmin/Categories/Categories"));
var _Services2 = _interopRequireDefault(require("./components/Admin/MasterAdmin/Services/Services"));
var _Stores2 = _interopRequireDefault(require("./components/Admin/MasterAdmin/Stores/Stores"));
var _Revieiws = _interopRequireDefault(require("./components/Admin/MasterAdmin/Reviews/Revieiws"));
var _Bookings3 = _interopRequireDefault(require("./components/Admin/MasterAdmin/Bookings/Bookings"));
var _Reviews2 = _interopRequireDefault(require("./components/Admin/Reviews/Reviews"));
var _PasswordReset = _interopRequireDefault(require("./components/PasswordReset/PasswordReset"));
var _SocialLoginRedirect = _interopRequireDefault(require("./components/SocialLoginRedirect/SocialLoginRedirect"));
var _ServerCheck = _interopRequireDefault(require("./ServerCheck"));
var _Blogs = _interopRequireDefault(require("./screens/Blogs/Blogs"));
var _Blogs2 = _interopRequireDefault(require("./components/Admin/MasterAdmin/Blogs/Blogs"));
var _AddBlog = _interopRequireDefault(require("./components/Admin/MasterAdmin/Blogs/AddBlog"));
var _BlogDetails = _interopRequireDefault(require("./screens/Blogs/BlogDetails"));
var _StatusPage = _interopRequireDefault(require("./screens/StatusPage/StatusPage"));
var _GetTheApp = _interopRequireDefault(require("./screens/GetTheApp/GetTheApp"));
var _SetupStore = _interopRequireDefault(require("./screens/SetupStore/SetupStore"));
var _SingleStore = _interopRequireDefault(require("./components/Admin/Stores/SingleStore"));
var _Pricing = _interopRequireDefault(require("./screens/Pricing/Pricing"));
var _HelpCenter = _interopRequireDefault(require("./screens/HelpCenter/HelpCenter"));
var _Inqueries = _interopRequireDefault(require("./components/Admin/MasterAdmin/Inqueries/Inqueries"));
var _CategoryPage = _interopRequireDefault(require("./screens/CategoryPage/CategoryPage"));
var _all = _interopRequireWildcard(require("gsap/all"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App(_ref) {
  let {
    initialData
  } = _ref;
  _all.default.registerPlugin(_all.ScrollTrigger);
  return /*#__PURE__*/_react.default.createElement(_ServerCheck.default, null, /*#__PURE__*/_react.default.createElement(_ScrollToTop.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.setupStore,
    element: /*#__PURE__*/_react.default.createElement(_SetupStore.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    element: /*#__PURE__*/_react.default.createElement(_MainComponent.default, null)
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.home,
    element: /*#__PURE__*/_react.default.createElement(_Home.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.status,
    element: /*#__PURE__*/_react.default.createElement(_StatusPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.getTheApp,
    element: /*#__PURE__*/_react.default.createElement(_GetTheApp.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.pricing,
    element: /*#__PURE__*/_react.default.createElement(_Pricing.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.helpCenter,
    element: /*#__PURE__*/_react.default.createElement(_HelpCenter.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.blogs,
    element: /*#__PURE__*/_react.default.createElement(_Blogs.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.blogPage,
    element: /*#__PURE__*/_react.default.createElement(_BlogDetails.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.categoryPage,
    element: /*#__PURE__*/_react.default.createElement(_CategoryPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.login,
    element: /*#__PURE__*/_react.default.createElement(_Login.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.signup,
    element: /*#__PURE__*/_react.default.createElement(_Signup.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/verify-email/:id/:token",
    element: /*#__PURE__*/_react.default.createElement(_VerifyEmail.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/forgot-password/:email/:reset_token",
    element: /*#__PURE__*/_react.default.createElement(_PasswordReset.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/auth/callback",
    element: /*#__PURE__*/_react.default.createElement(_SocialLoginRedirect.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.searchPage,
    element: /*#__PURE__*/_react.default.createElement(_SearchPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.forBusiness,
    element: /*#__PURE__*/_react.default.createElement(_ForBusiness.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.userProfile,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Profile.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.userAppointment,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Appointments.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.userFav,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Favorites.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.storePage,
    element: /*#__PURE__*/_react.default.createElement(_Store.default, {
      initialData: initialData
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.storeGalleryPage,
    element: /*#__PURE__*/_react.default.createElement(_StoreGallery.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.allReviewPage,
    element: /*#__PURE__*/_react.default.createElement(_AllReviews.default, null)
  })), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.loginSignup,
    element: /*#__PURE__*/_react.default.createElement(_LoginSignup.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.customerLogin,
    element: /*#__PURE__*/_react.default.createElement(_CustomerLogin.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.ownerLogin,
    element: /*#__PURE__*/_react.default.createElement(_ProfessionalLogin.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.bookingPage,
    element: /*#__PURE__*/_react.default.createElement(_Booking.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminDashboard,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Dashboard.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminAddCategory,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_ServiceCategory.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminStores,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Stores.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminSingleStore,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_SingleStore.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminStoresAdd,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_AddStore.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminEditStore,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_EditStore.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminAddWorkingHours,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_WorkingHours.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminAddServices,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Services.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminAddTeamMembers,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Team.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminBookings,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Bookings2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.adminReviews,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Reviews2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.workerDashboard,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Dashboard2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.workerBookings,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Bookings.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.workerReviews,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Reviews.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "*",
    element: /*#__PURE__*/_react.default.createElement(_Page.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminLogin,
    element: /*#__PURE__*/_react.default.createElement(_MasterAdminLogin.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminDashboard,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Dashboard3.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminUsers,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Users.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminServicesCategories,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Categories.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminServices,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Services2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminStores,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Stores2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminReviews,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Revieiws.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminInqueries,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Inqueries.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminBookings,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Bookings3.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminBlogs,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_Blogs2.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminBlogsAdd,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_AddBlog.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: _routes.ROUTES.masterAdminBlogsEdit,
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, {
      admin: true
    }, /*#__PURE__*/_react.default.createElement(_AddBlog.default, null))
  })));
}
var _default = exports.default = App;