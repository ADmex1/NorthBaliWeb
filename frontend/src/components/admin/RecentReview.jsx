// components/admin/RecentReviews.jsx
import React, { useEffect, useState } from 'react';

const RecentReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        RecentReview().then(res => setReviews(res.data.reviews)).catch(console.error);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
            <ul className="bg-white p-4 rounded-lg shadow">
                {reviews.map(review => (
                    <li key={review.id} className="py-2 border-b">{review.comment}  - ⭐{review.rating}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecentReview;
