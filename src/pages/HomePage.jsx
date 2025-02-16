import React from 'react'
import Logo from '../components/Logo'
import Headphones from '../assets/headphones.png'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='homepage'>
      <Logo/>

      <div className='homepage-content'>
        <div>
          <img src={Headphones} alt="headphones icon" />
          <h2>Listen</h2>
        </div>

        <div>
          <h3>
            Anytime. Anywhere.
          </h3>
        </div>

        <Link to={'/previews'}>
          <button>
            Browser
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage