import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard.jsx';
import { Search } from 'lucide-react';

const categories = [
    "Semua",
    "Pantai",
    "Pegunungan",
    "Budaya",
    "Air Terjun",
    "Kuliner",
    // ...tambahkan kategori lain sesuai kebutuhan
];

const DestinationsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [searchTerm, setSearchTerm] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://127.0.0.1:5001/destination/destination-list');
                if (!response.ok) throw new Error('Gagal memuat destinasi');
                const destinations = await response.json();
                setDestinations(destinations);
            } catch (error) {
                setDestinations([]);
                setError('Tidak dapat terhubung ke server atau destinasi tidak ditemukan.');
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    const filteredDestinations = destinations
        .filter(dest => {
            if (selectedCategory === "Semua") return true;
            return dest.category === selectedCategory;
        })
        .filter(dest => dest.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-screen-xl mx-auto bg-white shadow-xl">
            <section id="destinations" className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">Destinasi Populer</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Jelajahi keindahan alam dan budaya Bali Utara yang menakjubkan.
                        </p>
                    </div>

                    <div className="max-w-lg mx-auto mb-12">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari destinasi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-cyan-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-cyan-50 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <p className="text-center text-red-500 mb-8">{error}</p>
                    )}

                    {loading ? (
                        <p className="text-center text-gray-500">Memuat destinasi...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDestinations.length > 0 ? (
                                filteredDestinations.map(destination => (
                                    <DestinationCard
                                        key={destination.id}
                                        destination={destination}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    Destinasi tidak ditemukan.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DestinationsPage;
