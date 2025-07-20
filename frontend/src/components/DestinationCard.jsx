import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT LINK

const DestinationCard = ({ destination }) => {
  return (
    // 2. BUNGKUS SEMUANYA DENGAN KOMPONEN LINK
    <Link 
      to={`/destinasi/${destination.id}`} // <-- 3. TENTUKAN URL TUJUAN
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer block"
    >
      <div className="relative">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-gray-800">{destination.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">{destination.name}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span className="text-sm truncate">{destination.location}</span>
        </div>
        <p className="text-gray-600 mt-3 h-12 text-sm overflow-hidden">
          {destination.description.substring(0, 80)}...
        </p>
      </div>
    </Link>
  );
};

export default DestinationCard;