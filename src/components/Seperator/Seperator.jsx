import React from 'react'
import Divider from '@mui/material/Divider';

function Seperator() {
  return (
    <div className="seperator">
        <Divider
            orientation="vertical"
            sx={{ height: '40px', borderColor: 'gray' }}
        />
    </div>
  )
}

export default Seperator