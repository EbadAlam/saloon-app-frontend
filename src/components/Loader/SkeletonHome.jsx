import { Skeleton } from '@mui/material'
import React from 'react'

function SkeletonHome() {
  return (
    <div className='container'>
        <div className="skeleton-title">
            <Skeleton variant="text" height={500} />
        </div>
        <div className="skeleton-title" style={{display:'flex',justifyContent:'center'}}>
            <Skeleton variant="text" width={600} height={80} />
        </div>
        <div className="skeleton-title" style={{display:'flex',justifyContent:'center'}}>
            <Skeleton variant="text" width={100} height={60} />
        </div>
        <div className="skeleton-address">
            <Skeleton variant="text" width={200} height={100} />
        </div>
        <div className="skeleton-info">
        <Skeleton variant="rectangular" width="100%" height={450} />
        </div>
        <div className="skeleton-address">
            <Skeleton variant="text" width={200} height={100} />
        </div>
        <div className="skeleton-info">
        <Skeleton variant="rectangular" width="100%" height={450} />
        </div>
        <div className="skeleton-address">
            <Skeleton variant="text" width={200} height={100} />
        </div>
        <div className="skeleton-info">
        <Skeleton variant="rectangular" width="100%" height={450} />
        </div>
    </div>
  )
}

export default SkeletonHome