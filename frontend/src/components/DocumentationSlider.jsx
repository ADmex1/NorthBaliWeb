import React, { useRef, useEffect, useCallback } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

// Data untuk galeri, bisa dipindahkan ke file data jika perlu
const documentationImages = [
  "/destinasi/lovina1.jpg",
  "/destinasi/pemuteran1.jpg",
  "/destinasi/menjangan1.jpg",
  "/destinasi/munduk1.jpg",
  "/destinasi/camp2.jpg",
  "/destinasi/sekumpul2.jpg",
];

const DocumentationSlider = () => {
  const galleryRef = useRef(null);
  const intervalRef = useRef(null);

  const scrollGallery = useCallback((direction) => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.offsetWidth; // Geser sejauh lebar container
      
      if (direction === 'right') {
        // Jika sudah di akhir, kembali ke awal
        if (galleryRef.current.scrollLeft + scrollAmount >= galleryRef.current.scrollWidth) {
          galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Jika sudah di awal, pergi ke akhir
        if (galleryRef.current.scrollLeft === 0) {
          galleryRef.current.scrollTo({ left: galleryRef.current.scrollWidth, behavior: 'smooth' });
        } else {
          galleryRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Fungsi untuk memulai auto-scroll
  const startAutoScroll = useCallback(() => {
    stopAutoScroll(); // Hentikan dulu jika sudah ada
    intervalRef.current = setInterval(() => {
      scrollGallery('right');
    }, 10000); // 10 detik
  }, [scrollGallery]);

  // Fungsi untuk menghentikan auto-scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Bersihkan interval saat komponen dibongkar
  }, [startAutoScroll]);

  const handleManualScroll = (direction) => {
    scrollGallery(direction);
    // Reset timer saat pengguna menggeser manual
    startAutoScroll();
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4">
            <Camera />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Pesona Bali Utara</h2>
          <p className="mt-3 text-lg text-gray-600">
            Beberapa momen di balik layar saat kami menjelajahi Bali Utara.
          </p>
        </div>
        
        <div className="relative">
          <div ref={galleryRef} className="flex space-x-8 pb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 lg:px-8 hide-scrollbar">
            {documentationImages.map((imageUrl, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-56 sm:w-96 sm:h-64 snap-center">
                <img 
                  src={imageUrl} 
                  alt={`Dokumentasi kegiatan ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-2 sm:px-4 lg:px-6 pointer-events-none">
              <button onClick={() => handleManualScroll('left')} className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md backdrop-blur-sm pointer-events-auto">
                <ChevronLeft className="text-gray-700" />
              </button>
              <button onClick={() => handleManualScroll('right')} className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md backdrop-blur-sm pointer-events-auto">
                <ChevronRight className="text-gray-700" />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationSlider;
