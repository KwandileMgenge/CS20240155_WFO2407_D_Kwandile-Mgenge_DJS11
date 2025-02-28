import React from 'react';
import Logo from './Logo';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Logo />
      <main>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}

export default Layout;