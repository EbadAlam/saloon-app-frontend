import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Header/Footer/Footer';
import { ROUTES } from '../../routes';

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.home;
  return (
    <>
      <Header />
      <main style={!isHomePage ? {background:'#FFF8F0',minHeight:'50vh'} : {minHeight:'50vh'}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
