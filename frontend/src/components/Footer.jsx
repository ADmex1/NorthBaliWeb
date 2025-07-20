import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Temukan kami di</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white flex items-center gap-3">
                  <Facebook size={20} />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white flex items-center gap-3">
                  <Instagram size={20} />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white flex items-center gap-3">
                  <Youtube size={20} />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Tentang Situs Ini</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/tentang" className="text-base text-gray-300 hover:text-white">Tentang Kami</Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Peta Situs</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Kontak</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="mailto:info@wisatabaliutara.com" className="text-base text-gray-300 hover:text-white">info@wisatabaliutara.com</a>
              </li>
              <li>
                <a href="tel:+6281234567890" className="text-base text-gray-300 hover:text-white">+62 812-3456-7890</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Wisata Bali Utara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
