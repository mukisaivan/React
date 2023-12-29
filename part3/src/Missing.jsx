import { Link } from 'react-router-dom'

import React from 'react'

const Missing = () => {
  return (
    <div className='Missing'>
      <h2>Page Not Found</h2>

      <Link to="/"
        style={{
        height: "100px", backgroundColor: "red", width: "200px", borderRadius: "20px",
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 1)',
        textDecoration: "none",
        color:"white"
      }}
      >
        Visit Home
      </Link>
      
    </div>
  )
}

export default Missing