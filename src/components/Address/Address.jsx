import React from 'react'
import NorthEastIcon from '@mui/icons-material/NorthEast';

function Address({details}) {
  return (
    <div className="get-dir-btn mt-2">
        <p className="address">{details.address}</p>
        <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${details.lat},${details.lng}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            Get Directions
          <NorthEastIcon />
            
        </a>
    </div>
  )
}

export default Address