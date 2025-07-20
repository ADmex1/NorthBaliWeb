import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinations.js';
import { MapPin, Star, Clock, Tag, Navigation, ArrowLeft, ChevronLeft, ChevronRight, Youtube, MessageCircle, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CommentSection from '../components/CommentSection.jsx';

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find(d => d.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev === destination.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? destination.images.length - 1 : prev - 1));
  };

  if (!destination) {
    return (
      <div className="max-w-screen-xl mx-auto bg-white shadow-xl">
        <div className="text-center py-40 px-4">
          <h1 className="text-2xl font-bold text-gray-800">Destinasi tidak ditemukan!</h1>
          <p className="text-gray-600 mt-2">Maaf, kami tidak dapat menemukan destinasi yang Anda cari.</p>
          <Link to="/" className="mt-6 inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto bg-white shadow-xl">
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Link to="/destinasi" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 mb-6">
            <ArrowLeft size={20} />
            Kembali ke semua destinasi
          </Link>
          
          <div className="bg-white rounded-2xl w-full shadow-lg overflow-hidden">
            {/* Slider Gambar */}
            <div className="relative w-full h-64 md:h-96 group">
              <img 
                key={currentImageIndex}
                src={destination.images[currentImageIndex]}
                alt={`${destination.name} ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover image-fade-in" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 p-2 ml-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={30}/></button>
              <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 p-2 mr-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={30}/></button>
              <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">{destination.name}</h2>
                  <div className="flex items-center mt-1"><MapPin className="w-5 h-5 mr-2" /><span>{destination.location}</span></div>
              </div>
            </div>

            <div className="p-6 md:p-8">
                <p className="text-gray-700 leading-relaxed">{destination.description}</p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-lg"><Star className="mx-auto w-6 h-6 text-amber-500 mb-2"/><h4 className="font-semibold text-gray-800">Rating</h4><p className="text-gray-600 text-sm">{destination.rating} / 5.0</p></div>
                    <div className="bg-gray-50 p-4 rounded-lg"><Clock className="mx-auto w-6 h-6 text-cyan-500 mb-2"/><h4 className="font-semibold text-gray-800">Waktu Terbaik</h4><p className="text-gray-600 text-sm">{destination.bestTime}</p></div>
                    <div className="bg-gray-50 p-4 rounded-lg"><Tag className="mx-auto w-6 h-6 text-lime-500 mb-2"/><h4 className="font-semibold text-gray-800">Kategori</h4><p className="text-gray-600 text-sm">{destination.category}</p></div>
                    <a href={destination.gmapsUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors"><Navigation className="mx-auto w-6 h-6 text-blue-600 mb-2"/><h4 className="font-semibold text-gray-800">Lihat Peta</h4><p className="text-gray-600 text-sm">Arahkan</p></a>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Highlight</h3>
                    <div className="flex flex-wrap gap-3">
                        {destination.highlights.map(highlight => (<span key={highlight} className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">{highlight}</span>))}
                    </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Youtube className="w-8 h-8 text-red-600"/>
                    <h3 className="text-xl font-bold text-gray-800">Video Tur</h3>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src={`https://www.youtube.com/embed/${destination.youtubeId}`}
                      title={`YouTube video player for ${destination.name}`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
                
                {/* Logika baru untuk membuka dan menutup kolom komentar */}
                <div className="mt-16 border-t pt-8">
                  <button
                    onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
                    className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6 text-cyan-600"/>
                        <h3 className="text-lg font-bold text-gray-800">Ulasan Pengunjung</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600">
                        <span>{isCommentSectionOpen ? 'Tutup Ulasan' : 'Lihat & Tulis Ulasan'}</span>
                        <motion.div animate={{ rotate: isCommentSectionOpen ? 180 : 0 }}>
                          <ChevronDown size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isCommentSectionOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <CommentSection />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
