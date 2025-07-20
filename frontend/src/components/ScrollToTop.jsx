import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Komponen ini akan otomatis scroll ke atas setiap kali URL berubah
const ScrollToTop = () => {
  // Dapatkan informasi path URL saat ini
  const { pathname } = useLocation();

  // Gunakan useEffect untuk menjalankan fungsi saat 'pathname' berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Komponen ini tidak me-render apapun, hanya menjalankan fungsi
  return null; 
};

export default ScrollToTop;
