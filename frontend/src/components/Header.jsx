import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mountain, Menu, X, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Set state menjadi true jika posisi scroll lebih dari 10px dari atas
      setIsScrolled(window.scrollY > 10);
    };

    // Tambahkan event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll);

    // Hapus event listener saat komponen dibongkar untuk mencegah memory leak
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Array kosong memastikan efek ini hanya berjalan sekali

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-800/90 backdrop-blur-sm shadow-lg' // Style saat di-scroll (semi-transparan)
          : 'bg-gray-800 shadow-md' // Style awal (solid)
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Mountain className="h-8 w-8 text-cyan-400" />
            <h1 className="ml-2 text-2xl font-bold text-white">Wisata Bali Utara</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-300 hover:text-white">Home</Link>
            <Link to="/destinasi" className="font-medium text-gray-300 hover:text-white">Destinasi</Link>
            <Link to="/edukasi" className="font-medium text-gray-300 hover:text-white">Edukasi</Link>
            <Link to="/tentang" className="font-medium text-gray-300 hover:text-white">Tentang</Link>
            {user ? (
              <Link to="/profile" className="text-gray-300 hover:text-white"><User /></Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 font-medium text-gray-300 hover:text-white"><LogIn size={16}/> Login</Link>
            )}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-800">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Home</Link>
            <Link to="/destinasi" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Destinasi</Link>
            <Link to="/edukasi" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Edukasi</Link>
            <Link to="/tentang" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Tentang</Link>
            {user ? (
                 <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Profil</Link>
            ) : (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Login</Link>
            )}
        </div>
      )}
    </header>
  );
};

export default Header;
