"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axiosClient = _interopRequireDefault(require("../../axios-client"));
var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));
var _material = require("@mui/material");
var _RoomOutlined = _interopRequireDefault(require("@mui/icons-material/RoomOutlined"));
var _routes = require("../../routes");
var _Star = _interopRequireDefault(require("@mui/icons-material/Star"));
var _StoreCard = _interopRequireDefault(require("../../components/StoreCard/StoreCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function SearchPage() {
  const [searchParams] = (0, _reactRouterDom.useSearchParams)();
  const locationHook = (0, _reactRouterDom.useLocation)();
  const [stores, setStores] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(true);
  const service = searchParams.get('service');
  const location = searchParams.get('location');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  (0, _react.useEffect)(() => {
    document.body.className = "";
    if (locationHook.pathname === "/search") {
      document.body.classList.add("search-page");
    }
  }, [locationHook]);
  (0, _react.useEffect)(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const payload = {
          service,
          location,
          startTime,
          endTime
        };
        const {
          data
        } = await _axiosClient.default.post('/getSearchResults', payload);
        setStores(data.stores);
      } catch (err) {
        console.error('Error fetching search results ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [service, location, startTime, endTime]);
  const calculateAverageRating = function () {
    let reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const total = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : 'N/A';
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores_section new_stores"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    className: "stores",
    justifyContent: "start"
  }, stores && stores.length > 0 ? stores.map(singleStore => {
    const averageRating = calculateAverageRating(singleStore.reviews);
    return (
      /*#__PURE__*/
      // <Box className="store" key={singleStore.id}>
      //   <Link to={ROUTES.getStoreFrontPage(singleStore.slug)}>
      //       <Box className="singleSlide">
      //           <Box className="lsideImg" display='flex' alignItems='center' justifyContent='center' sx={{overflow:'hidden', height:'330px',borderRadius:'10px 10px 0px 0px'}}>
      //               <img src={`${process.env.REACT_APP_IMG_URL}${singleStore.thumbnail}`} alt="" />
      //           </Box>
      //           <Box display='flex' flexDirection='column' gap="20px" className="slideInfo" sx={{background:'white',borderRadius:'0px 0px 10px 10px', padding:'15px 10px'}}>
      //               <Box className="titleRating" display='flex' alignItems='center' justifyContent='space-between'>
      //                   <Box className="title">
      //                       <Typography variant='h4' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600'}}>{singleStore.title}</Typography>
      //                   </Box>
      //                   <Box className="rating" display='flex' alignItems='center' gap="3px">
      //                       <Typography variant='h4' sx={{fontSize:'16px',fontFamily:'Barlow',fontWeight:'600'}}>{averageRating}</Typography>
      //                       <StarIcon fontSize='small' sx={{color:'#333333'}} />
      //                       <Typography variant='h4' sx={{fontSize:'14px',fontFamily:'Barlow'}}>({singleStore.reviews.length})</Typography>
      //                   </Box>
      //               </Box>
      //               <Box className="address" display='flex' alignItems='center'>
      //                   <RoomOutlinedIcon sx={{color:'#333333'}} />
      //                   <Typography variant='body1' sx={{fontSize:'14px',fontFamily:'Barlow',color:'#333333',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>{singleStore.address}</Typography>
      //               </Box>
      //               <Box className="storeType" sx={{border:'1px solid #D7D7D7', borderRadius:'10px',width:'50%',margin:'0 auto',padding:'8px'}} textAlign='center'>
      //                   <Typography variant='body1' sx={{fontSize:'18px',fontFamily:'Barlow',fontWeight:'600',color:'#333333'}}>{singleStore.type || 'Saloon'}</Typography>
      //               </Box>
      //           </Box>
      //       </Box>
      //   </Link>
      // </Box>
      _react.default.createElement(_StoreCard.default, {
        key: singleStore.id,
        storeDetails: singleStore
      })
    );
  }) : /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, "No results for your search")))));
}
var _default = exports.default = SearchPage;