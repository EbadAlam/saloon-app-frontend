import React from 'react'

function DummyImage({username,width = '40px', height = '40px'}) {
  return (
    <div
        style={{
        width,
        height,
        borderRadius: '50%',
        backgroundColor: '#ccc',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase'
        }}
    >
        {username?.charAt(0) || '?'}
    </div>
  )
}

export default DummyImage