import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/HeaderNew';
import Footer from '../Header/Footer/Footer';
import { ROUTES } from '../../routes';

function MainLayout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <main className='main-layout'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
