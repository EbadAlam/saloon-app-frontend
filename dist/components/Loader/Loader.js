"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { CircularProgress, LinearProgress } from '@mui/material'

// function Loader({progress}) {
//   return (
//     <div className='loader-div'>
//         {/* <CircularProgress /> */}
//         <LinearProgress variant="determinate" value={progress} />
//     </div>
//   )
// }

// export default Loader

function Loader() {
  // const [progress, setProgress] = useState(10);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress >= 90) {
  //         clearInterval(timer);
  //         return oldProgress;
  //       }
  //       return oldProgress + 10;
  //     });
  //   }, 200);

  //   return () => clearInterval(timer);
  // }, []);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "loader-div"
  }, /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null));
}
var _default = exports.default = Loader;