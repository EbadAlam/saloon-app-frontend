import React from 'react'

function Address({details}) {
  return (
    <div className="get-dir-btn mt-2">
        <p className="address"><b>{details.address}</b></p>
        <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${details.lat},${details.lng}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <b>Get Directions</b>
        </a>
    </div>
  )
}

export default Address