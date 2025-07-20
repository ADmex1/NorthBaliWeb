import React from 'react';
import { Leaf, Trash2, Heart, Youtube } from 'lucide-react';

const EdukasiPage = () => {
  return (
    // Frame putih untuk konten
    <div className="max-w-screen-xl mx-auto bg-white shadow-xl">
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Halaman */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Edukasi Pelestarian Alam
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Mari bersama menjaga keindahan Bali Utara untuk generasi mendatang.
            </p>
          </div>

          {/* Konten Edukasi */}
          <div className="mt-16 space-y-16">

            {/* Seksi 1: Merawat Hutan Mangrove */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className="w-8 h-8 text-green-600"/>
                  <h2 className="text-2xl font-bold text-gray-800">Merawat Hutan Mangrove</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Hutan mangrove adalah benteng pertahanan pesisir kita. Mereka melindungi dari abrasi, menjadi rumah bagi biota laut, dan menyerap karbon. Hindari membuang sampah di area mangrove dan jangan merusak akar serta tanamannya. Ikut serta dalam program penanaman kembali adalah cara terbaik untuk berkontribusi.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="mangrove.jpg" 
                  alt="Hutan Mangrove yang rimbun"
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Seksi 2: Menjaga Kebersihan */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-3">
                  <Trash2 className="w-8 h-8 text-blue-600"/>
                  <h2 className="text-2xl font-bold text-gray-800">Pentingnya Menjaga Kebersihan</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Sampah, terutama plastik, adalah ancaman serius bagi ekosistem laut dan darat. Selalu bawa kembali sampah Anda atau buang pada tempatnya. Kurangi penggunaan plastik sekali pakai dengan membawa botol minum dan tas belanja sendiri. Kebersihan adalah cermin dari kepedulian kita.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="nanem.jpg" 
                  alt="Kegiatan membersihkan pantai"
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Seksi 3: Melestarikan Tempat Wisata */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-8 h-8 text-red-600"/>
                  <h2 className="text-2xl font-bold text-gray-800">Melestarikan Tempat Wisata</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Saat mengunjungi pura, air terjun, atau danau, hormatilah adat dan aturan setempat. Jangan mengambil apapun dari alam, seperti batu karang atau tanaman. Cukup ambil foto dan tinggalkan jejak kaki. Dengan menjadi wisatawan yang bertanggung jawab, kita membantu menjaga keaslian dan kesucian tempat-tempat ini.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="nanem1.jpg" 
                  alt="Pura di tepi danau"
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Seksi Video */}
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-4">
                <Youtube className="w-8 h-8 text-red-600"/>
                <h3 className="text-2xl font-bold text-gray-800">Video Inspirasi Pelestarian</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.youtube.com/embed/Wj4NX5icR9U"
                  title="YouTube video player for Nature Conservation"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EdukasiPage;
