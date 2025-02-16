import React from 'react'
import Logo from './Logo'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Logo/>
      <Outlet/>
    </>
  )
}

export default Layout