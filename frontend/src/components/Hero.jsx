import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="Paket-Tour-Bali-Utara-1-Hari-Tanpa-Hotel-Twitter.jpg"
          alt="Pura Ulun Danu Bratan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
          Jelajahi Pesona Tersembunyi Bali Utara
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light text-gray-200">
          Temukan keindahan alam yang otentik, mulai dari lumba-lumba di lautan hingga air terjun megah di pegunungan.
        </p>
    
      </div>
    </section>
  );
};

export default Hero;
