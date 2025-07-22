import React from 'react';
import Hero from '../components/Hero.jsx';
import Introduction from '../components/Introduction.jsx';
import InteractiveMap from '../components/InteractiveMap.jsx';
import { Link } from 'react-router-dom';
import { Leaf, Waves, Coffee, Smile } from 'lucide-react';

const HomePage = () => {
    return (
        <>
            <Hero />
            <div className="max-w-screen-xl mx-auto bg-white shadow-xl">
                
                <Introduction />

                {/* Mengembalikan seksi "Mengapa Memilih Bali Utara" */}
                <section id="why-north-bali" className="bg-gray-50 py-16 sm:py-24 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mengapa Memilih Bali Utara?</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Temukan pesona otentik yang membedakannya dari bagian lain di Bali.
                            </p>
                        </div>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto"><Leaf /></div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Alam yang Asri</h3>
                                <p className="mt-2 text-base text-gray-600">Dari air terjun megah hingga danau vulkanik yang sejuk, alamnya masih sangat alami.</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto"><Waves /></div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Petualangan Bahari</h3>
                                <p className="mt-2 text-base text-gray-600">Saksikan lumba-lumba liar di habitat aslinya dan nikmati keindahan bawah laut.</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto"><Coffee /></div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Budaya Otentik</h3>
                                <p className="mt-2 text-base text-gray-600">Rasakan kehidupan pedesaan yang tenang dan kunjungi perkebunan kopi tradisional.</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mx-auto"><Smile /></div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Suasana Tenang</h3>
                                <p className="mt-2 text-base text-gray-600">Jauh dari keramaian, Bali Utara menawarkan ketenangan dan relaksasi sejati.</p>
                            </div>
                        </div>
                        <div className="text-center mt-16">
                            <Link to="/destinasi" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
                                Lihat Semua Destinasi
                            </Link>
                        </div>
                    </div>
                </section>

                <InteractiveMap />

            </div>
        </>
    );
}

export default HomePage;
