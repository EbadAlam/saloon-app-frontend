"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _routes = require("../../routes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function StoreGalleryPage() {
  var _location$state, _location$state2;
  const location = (0, _reactRouterDom.useLocation)();
  const gallery = ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.gallery) || [];
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    if (gallery.length === 0) {
      navigate(_routes.ROUTES.home);
    }
  }, [gallery, (_location$state2 = location.state) === null || _location$state2 === void 0 ? void 0 : _location$state2.slug, navigate]);
  const renderGallery = () => {
    const rows = [];
    let i = 0;
    while (i < gallery.length) {
      rows.push(/*#__PURE__*/_react.default.createElement("div", {
        key: i,
        style: {
          display: "flex",
          gap: "10px",
          marginBottom: "10px"
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(gallery[i].image),
        alt: "",
        style: {
          width: "100%",
          borderRadius: "10px",
          objectFit: "cover"
        }
      })));
      i++;
      if (i < gallery.length) {
        rows.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "row-".concat(i),
          style: {
            display: "flex",
            gap: "10px",
            marginBottom: "10px"
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(gallery[i].image),
          alt: "",
          style: {
            flex: 1,
            height: "300px",
            borderRadius: "10px",
            objectFit: "cover"
          }
        }), gallery[i + 1] && /*#__PURE__*/_react.default.createElement("img", {
          src: "".concat(process.env.REACT_APP_IMG_URL, "/").concat(gallery[i + 1].image),
          alt: "",
          style: {
            flex: 1,
            height: "300px",
            borderRadius: "10px",
            objectFit: "cover"
          }
        })));
        i += 2;
      }
    }
    return rows;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "20px"
    }
  }, gallery.length > 0 ? renderGallery() : /*#__PURE__*/_react.default.createElement("p", null, "No images in gallery"));
}
var _default = exports.default = StoreGalleryPage;