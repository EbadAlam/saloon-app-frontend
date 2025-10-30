"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { Skeleton } from '@mui/material'
// import React from 'react'

// function SkeletonHome() {
//   return (
//     <div className='container'>
//         <div className="skeleton-title">
//             <Skeleton variant="text" height={500} />
//         </div>
//         <div className="skeleton-title" style={{display:'flex',justifyContent:'center'}}>
//             <Skeleton variant="text" width={600} height={80} />
//         </div>
//         <div className="skeleton-title" style={{display:'flex',justifyContent:'center'}}>
//             <Skeleton variant="text" width={100} height={60} />
//         </div>
//         <div className="skeleton-address">
//             <Skeleton variant="text" width={200} height={100} />
//         </div>
//         <div className="skeleton-info">
//         <Skeleton variant="rectangular" width="100%" height={450} />
//         </div>
//         <div className="skeleton-address">
//             <Skeleton variant="text" width={200} height={100} />
//         </div>
//         <div className="skeleton-info">
//         <Skeleton variant="rectangular" width="100%" height={450} />
//         </div>
//         <div className="skeleton-address">
//             <Skeleton variant="text" width={200} height={100} />
//         </div>
//         <div className="skeleton-info">
//         <Skeleton variant="rectangular" width="100%" height={450} />
//         </div>
//     </div>
//   )
// }

// export default SkeletonHome

function SkeletonHome() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title",
    style: {
      display: 'flex',
      justifyContent: 'end'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    height: 800,
    width: "50%"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title",
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "15%",
    height: 400,
    style: {
      borderRadius: '50%'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-title",
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 200,
    height: 60
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-address"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: "100%",
    height: 10
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-info",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '50px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "23%",
    height: 450
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "23%",
    height: 450
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "23%",
    height: 450
  }), /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "23%",
    height: 450
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-address"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 200,
    height: 100
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-info"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "100%",
    height: 450
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-address"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "text",
    width: 200,
    height: 100
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "skeleton-info"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rectangular",
    width: "100%",
    height: 450
  })));
}
var _default = exports.default = SkeletonHome;