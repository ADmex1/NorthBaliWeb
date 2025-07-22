import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="max-w-screen-xl mx-auto bg-white shadow-2xl">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;