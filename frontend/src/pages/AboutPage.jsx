import React, { useRef } from 'react';
import { Users, Mountain, Heart, Camera, ChevronLeft, ChevronRight, Building } from 'lucide-react';

// Data untuk galeri dokumentasi
const documentationImages = [
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473992243896-ea96b24de3a3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
];

// Data untuk sponsor (gunakan URL logo asli jika ada)
const sponsors = [
    { name: "Wonderful Indonesia", logo: "https://via.placeholder.com/150x60.png?text=Wonderful+Indonesia" },
    { name: "Pesona Indonesia", logo: "https://via.placeholder.com/150x60.png?text=Pesona+Indonesia" },
    { name: "TripAdvisor", logo: "https://via.placeholder.com/150x60.png?text=TripAdvisor" },
    { name: "Tiket.com", logo: "https://via.placeholder.com/150x60.png?text=Tiket.com" },
];

const AboutPage = () => {
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 350;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Seksi Utama Tentang Kami */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-5/12 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto lg:mr-0 lg:ml-auto lg:pr-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Tentang Kami
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Kami adalah tim pencinta perjalanan yang bersemangat untuk berbagi keajaiban dan pesona otentik dari Bali Utara.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-7/12 h-64 lg:h-auto lg:rounded-l-[100px] overflow-hidden lg:-ml-0">
          <img
            src="/kerja.jpg"
            alt="Tim Wisata Bali Utara sedang berdiskusi"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Seksi Penjelasan Tambahan */}
      <div className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="relative h-96">
              <img
                className="rounded-2xl shadow-xl w-full h-full object-cover"
                src="/home/tentang1.jpg"
                alt="Tim Wisata Bali Utara sedang merencanakan perjalanan"
              />
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Dari Petualang, untuk Petualang
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Setiap rekomendasi yang kami berikan berasal dari pengalaman nyata. Kami telah menjelajahi jalur-jalur ini, mencicipi kulinernya, dan berinteraksi dengan masyarakat lokal. Kami bukan sekadar pemandu, kami adalah teman seperjalanan Anda dalam menemukan pesona Bali Utara.
              </p>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600"><Mountain /></div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Kurasi Penuh Gairah</h3>
                <p className="mt-2 text-base text-gray-600">Kami memilih setiap destinasi berdasarkan pengalaman langsung dan keunikannya.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600"><Users /></div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Fokus pada Komunitas</h3>
                <p className="mt-2 text-base text-gray-600">Kami bertujuan untuk mendukung pariwisata lokal yang berkelanjutan.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600"><Heart /></div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Dibuat dengan Hati</h3>
                <p className="mt-2 text-base text-gray-600">Proyek ini lahir dari kecintaan kami yang mendalam terhadap budaya dan alam Bali.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seksi Dokumentasi Kegiatan */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 text-center mb-12">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><Camera /></div>
            <h2 className="text-3xl font-bold text-gray-900">Dokumentasi Kegiatan Kami</h2>
            <p className="mt-3 text-lg text-gray-600">Beberapa momen di balik layar saat kami menjelajahi Bali Utara.</p>
          </div>
          <div className="relative">
            <div ref={galleryRef} className="flex space-x-8 pb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 lg:px-8 hide-scrollbar">
              {documentationImages.map((imageUrl, index) => (
                <div key={index} className="flex-shrink-0 w-[32rem] h-80 snap-center">
                  <img src={imageUrl} alt={`Dokumentasi kegiatan ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-2 sm:px-4 lg:px-6 pointer-events-none">
              <button onClick={() => scrollGallery('left')} className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md backdrop-blur-sm pointer-events-auto"><ChevronLeft className="text-gray-700" /></button>
              <button onClick={() => scrollGallery('right')} className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md backdrop-blur-sm pointer-events-auto"><ChevronRight className="text-gray-700" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Seksi Sponsor */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto mb-4"><Building /></div>
                <h2 className="text-3xl font-bold text-gray-900">Didukung Oleh</h2>
                <p className="mt-3 text-lg text-gray-600">Kami berterima kasih kepada para sponsor yang telah mendukung misi kami.</p>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mt-4 -ml-8 flex flex-wrap justify-center lg:-ml-4">
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.name} className="mt-4 ml-8 flex flex-grow flex-shrink-0 items-center justify-center lg:ml-4 lg:flex-grow-0">
                            <img className="h-12" src={sponsor.logo} alt={sponsor.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
