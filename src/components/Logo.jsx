import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className='logo'>
      <Link to={'/'} className='logo-link'>
        <h1>Pod<span>lib</span></h1>
      </Link>
      
    </div>
  )
}

export default Logo