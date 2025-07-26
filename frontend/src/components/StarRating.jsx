import React from 'react';

const StarRating = ({ rating, setRating }) => {
    const handleClick = (e, index) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - left;
        const isHalf = clickX < width / 2;
        const newRating = isHalf ? index + 0.5 : index + 1;
        setRating(newRating);
    };

    const renderStar = (i) => {
        if (rating >= i + 1) {
            return (
                <span key={i} className="text-yellow-400 text-2xl cursor-pointer" onClick={(e) => handleClick(e, i)}>
                    ★
                </span>
            );
        } else if (rating >= i + 0.5) {
            return (
                <span
                    key={i}
                    className="text-yellow-400 text-2xl cursor-pointer relative"
                    onClick={(e) => handleClick(e, i)}
                >
                    <span className="absolute left-0 w-1/2 overflow-hidden">★</span>
                    <span className="text-gray-300">★</span>
                </span>
            );
        } else {
            return (
                <span key={i} className="text-gray-300 text-2xl cursor-pointer" onClick={(e) => handleClick(e, i)}>
                    ★
                </span>
            );
        }
    };

    return (
        <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((i) => renderStar(i))}
            <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
        </div>
    );
};

export default StarRating;
