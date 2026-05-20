import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Header/Footer/Footer';
import { ROUTES } from '../../routes';

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <main style={{background:'white',minHeight:'50vh',paddingTop:'100px'}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
