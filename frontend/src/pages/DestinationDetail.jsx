import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import axios from 'axios';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5001/destination/${id}`);
        const data = res.data["{+} Destination Data"];
        setDestination(data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.image.length) % destination.image.length);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      {/* Image Carousel */}
      {destination.image && destination.image.length > 0 && (
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg mb-6">
          <img
            src={`http://127.0.0.1:5001${destination.image[currentImageIndex]}`}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition duration-500"
          />
          {destination.image.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Title and Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{destination.name}</h1>
        <div className="flex items-center text-sm text-gray-600 mt-2 sm:mt-0">
          <MapPin className="w-4 h-4 mr-1" />
          {destination.location}
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-4 mr-1" />
          {destination.rating}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-4">{destination.description}</p>

      {/* Highlights */}
      {destination.highlights && destination.highlights.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Aktivitas Unggulan:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {destination.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Best Time */}
      <div className="mb-4 flex items-center text-gray-700">
        <Clock className="w-4 h-4 mr-2" />
        Waktu terbaik: {destination.best_time_start} - {destination.best_time_end}
      </div>

      {/* YouTube Embed */}
      {destination.youtube_id && (
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={`https://www.youtube.com/embed/${new URL(destination.youtube_id).searchParams.get("v")}`}
            title="YouTube Video"
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Google Maps Link */}
      {destination.name && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Peta Lokasi:</h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(destination.name)}&output=embed`}
            ></iframe>
          </div>
        </div>
      )}

      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mt-6 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
      >
        Kembali
      </Link>
    </div>
  );
};

export default DestinationDetail;
