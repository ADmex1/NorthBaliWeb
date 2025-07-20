import React from 'react';
import { Link } from 'react-router-dom';

const Introduction = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Gambar Interaktif */}
          <div className="group rounded-xl overflow-hidden shadow-lg">
            <img 
              src="bali.jpg" 
              alt="Pemandangan Danau Tamblingan di Bali Utara"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Kolom Kanan: Teks Deskripsi */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              Selamat Datang di Surga Tersembunyi Bali
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Jelajahi sisi lain Pulau Dewata yang menawarkan ketenangan, petualangan, dan keindahan alam yang masih otentik.
            </p>
            <div className="mt-6 prose prose-lg text-gray-700">
              <p>
                Bali Utara adalah permata yang menanti untuk ditemukan. Jauh dari keramaian, wilayah ini membentang dari pesisir pantai berpasir hitam hingga pegunungan sejuk yang diselimuti perkebunan cengkeh dan kopi. Di sinilah Anda dapat merasakan denyut kehidupan Bali yang sesungguhnya.
              </p>
              <p>
                Dari tarian lumba-lumba di lautan Lovina saat fajar hingga gemuruh air terjun megah yang tersembunyi di dalam hutan lebat, setiap sudut Bali Utara menjanjikan petualangan yang tak terlupakan.
              </p>
            </div>
            <div className="mt-8">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
