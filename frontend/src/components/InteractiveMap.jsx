import React, { useEffect, useRef } from 'react';
import { Map } from 'lucide-react';
import { destinations } from '../data/destinations.js';

const InteractiveMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (mapRef.current && !mapInstance.current) {
        const map = window.L.map(mapRef.current).setView([-8.2, 115.05], 10);
        mapInstance.current = map;

        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        // Tambahkan marker untuk setiap destinasi
        destinations.forEach(dest => {
          const customIcon = window.L.divIcon({
            className: 'custom-map-marker',
            html: `<div class="marker-pin"></div><div class="marker-text">${dest.name}</div>`,
            iconSize: [120, 40],
            iconAnchor: [10, 40],
            popupAnchor: [0, -40]
          });

          const marker = window.L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);
          
          // PERUBAHAN DI SINI: Menggunakan tag <a> dengan href yang benar
          marker.bindPopup(`
            <div class="p-1">
              <h3 class="font-bold text-base mb-1">${dest.name}</h3>
              <p class="text-xs text-gray-500 mb-2">${dest.category}</p>
              <a href="/destinasi/${dest.id}" class="text-cyan-600 font-semibold text-xs">Lihat Detail &rarr;</a>
            </div>
          `);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4">
            <Map />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Peta Wisata Interaktif</h2>
          <p className="mt-4 text-lg text-gray-600">
            Klik titik di peta untuk melihat detail destinasi.
          </p>
        </div>
        <div ref={mapRef} className="h-[500px] rounded-xl shadow-2xl z-0"></div>
      </div>
    </section>
  );
};

export default InteractiveMap;
