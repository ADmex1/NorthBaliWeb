import React, { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DestinationCard = ({ destination }) => {
  const [rating, setRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/destination/review-average/${destination.id}`)
      .then(res => {
        setRating(res.data["Average Rating"]);
        setTotalReviews(res.data["Total Reviews"]);
      })
      .catch(err => {
        console.log("No reviews or error fetching:", err);
        setRating(null); // fallback to "Belum ada ulasan"
        setTotalReviews(0);
      });
  }, [destination.id]);

  const imageUrl = `http://127.0.0.1:5001/${destination.image?.[0] || 'default.jpg'}`;

  return (
    <Link
      to={`/destinasi/${destination.id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer block"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={destination.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1 shadow-md text-sm">
          {rating !== null && totalReviews > 0 ? (
            <div className="flex items-center gap-1 text-gray-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-semibold">{rating}</span>
              <span className="text-xs text-gray-600 ml-1">({totalReviews})</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500 italic">Belum ada ulasan</span>
          )}
        </div>
      </div>

      {/* Content */}
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
