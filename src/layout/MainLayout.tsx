import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayout = ({ children }: any) => {
  return (
    <>
      <div id="background-container">
        <Header />

        <ToastContainer />

        {children}
      </div>
      <Footer />
    </>
  );
};
