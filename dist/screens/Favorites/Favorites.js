"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _UserSidebar = _interopRequireDefault(require("../../components/UserSidebar/UserSidebar"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
var _RoomOutlined = _interopRequireDefault(require("@mui/icons-material/RoomOutlined"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _AuthContext = require("../../contexts/AuthContext");
var _FavoriteBorderOutlined = _interopRequireDefault(require("@mui/icons-material/FavoriteBorderOutlined"));
var _Favorite = _interopRequireDefault(require("@mui/icons-material/Favorite"));
var _SnackBarContext = require("../../contexts/SnackBarContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function FavoritesPage() {
  const {
    user
  } = (0, _AuthContext.useAuth)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [favouriteStores, setFavouriteStore] = (0, _react.useState)([]);
  const [loadingFavId, setLoadingFavId] = (0, _react.useState)(null);
  const {
    showSnackbar
  } = (0, _SnackBarContext.useSnackbar)();
  const [alertMessage, setAlertMessage] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    const fetchUserFavStores = async () => {
      try {
        const {
          data
        } = await _axiosClient.default.get("/getUserFavStores/".concat(user.id));
        const storesWithFlag = data.stores.map(s => _objectSpread(_objectSpread({}, s), {}, {
          isFav: true
        }));
        setFavouriteStore(storesWithFlag);
      } catch (error) {
        console.error('Error fetching user fav stores ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserFavStores();
  }, [user.id]);
  const handleAddToFav = async store => {
    setLoadingFavId(store.id);
    try {
      const payload = {
        store_id: store.id,
        user_id: user.id
      };
      let data;
      if (store.isFav) {
        ({
          data
        } = await _axiosClient.default.post('removeFromFavourite', payload));
      } else {
        ({
          data
        } = await _axiosClient.default.post('addToFavourite', payload));
      }
      setAlertMessage(data.message);
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
      setFavouriteStore(prevStores => prevStores.map(s => s.id === store.id ? _objectSpread(_objectSpread({}, s), {}, {
        isFav: !s.isFav
      }) : s));
    } catch (error) {
      console.error('Failed to add or remove to favourites', error);
    } finally {
      setLoadingFavId(null);
    }
  };
  (0, _react.useEffect)(() => {
    if (alertMessage) {
      showSnackbar(alertMessage, "success");
    }
  }, [alertMessage]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "profile"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex"
  }, /*#__PURE__*/_react.default.createElement(_UserSidebar.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "content"
  }, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h2"
  }, "Favorites"), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "slider",
    sx: {
      position: 'relative'
    }
  }, favouriteStores && favouriteStores.length > 0 ? favouriteStores.map(singleStore => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "linkTOStoresFav",
    to: _routes.ROUTES.getStoreFrontPage(singleStore.slug)
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "singleSlide"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "lsideImg",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    sx: {
      overflow: 'hidden',
      height: '330px',
      borderRadius: '10px 10px 0px 0px'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "".concat(process.env.REACT_APP_IMG_URL).concat(singleStore.thumbnail),
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    className: "slideInfo",
    sx: {
      background: 'white',
      borderRadius: '0px 0px 10px 10px',
      padding: '15px 10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "titleRating",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "title"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h4",
    sx: {
      fontSize: '18px',
      fontFamily: 'Barlow',
      fontWeight: '600'
    }
  }, singleStore.title)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "remove_fav"
  }, loadingFavId === singleStore.id ? /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: "20px"
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "save",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      handleAddToFav(singleStore);
    }
  }, singleStore.isFav ? /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Remove from favourites"
  }, /*#__PURE__*/_react.default.createElement(_Favorite.default, null)) : /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Add to favourites"
  }, /*#__PURE__*/_react.default.createElement(_FavoriteBorderOutlined.default, null))))), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "address",
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_RoomOutlined.default, {
    sx: {
      color: '#333333'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '14px',
      fontFamily: 'Barlow',
      color: '#333333',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }, singleStore.address)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "storeType",
    sx: {
      border: '1px solid #D7D7D7',
      borderRadius: '10px',
      width: '50%',
      margin: '0 auto',
      padding: '8px'
    },
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1",
    sx: {
      fontSize: '18px',
      fontFamily: 'Barlow',
      fontWeight: '600',
      color: '#333333'
    }
  }, singleStore.type || 'Saloon')))))) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "No favorites store yet"))))));
}
var _default = exports.default = FavoritesPage;