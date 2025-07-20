import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import DestinationDetail from './pages/DestinationDetail.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DestinationsPage from './pages/DestinationsPage.jsx';
import EdukasiPage from './pages/EdukasiPage.jsx'; // <-- 1. Impor halaman baru
import PageTransition from './components/PageTransition.jsx';

function App() {
  const location = useLocation();

  return (
    <div className="bg-gray-200">
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={<PageTransition><HomePage /></PageTransition>} 
            />
            <Route 
              path="/destinasi" 
              element={<PageTransition><DestinationsPage /></PageTransition>} 
            />
            <Route 
              path="/destinasi/:id" 
              element={<PageTransition><DestinationDetail /></PageTransition>} 
            />
            {/* 2. Tambahkan rute baru untuk halaman edukasi */}
            <Route 
              path="/edukasi" 
              element={<PageTransition><EdukasiPage /></PageTransition>} 
            />
            <Route 
              path="/tentang" 
              element={<PageTransition><AboutPage /></PageTransition>} 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
