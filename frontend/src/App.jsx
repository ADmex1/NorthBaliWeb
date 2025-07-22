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
import EdukasiPage from './pages/EdukasiPage.jsx';
import PageTransition from './components/PageTransition.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AuthProvider from './context/AuthContext.jsx'; // <-- PASTIKAN IMPOR SEPERTI INI

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="bg-gray-200">
        <ScrollToTop />
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/destinasi" element={<PageTransition><DestinationsPage /></PageTransition>} />
              <Route path="/destinasi/:id" element={<PageTransition><DestinationDetail /></PageTransition>} />
              <Route path="/edukasi" element={<PageTransition><EdukasiPage /></PageTransition>} />
              <Route path="/tentang" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
              <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
