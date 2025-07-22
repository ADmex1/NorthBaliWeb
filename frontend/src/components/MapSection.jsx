import React from 'react';
import { Map } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4">
            <Map />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Peta Wisata Bali Utara</h2>
          <p className="mt-4 text-lg text-gray-600">
            Jelajahi lokasi destinasi kami secara visual.
          </p>
        </div>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1_2_G1g-gB3x_2n5Y8sV8rX6jJ0p7r_qI&ehbc=2E312F"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
