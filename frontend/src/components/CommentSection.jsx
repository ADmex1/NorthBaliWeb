import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (value) => setRating(value);

  return (
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => {
        const full = i + 1;
        const half = i + 0.5;
        return (
          <div key={i} className="relative w-6 h-6 text-yellow-400 cursor-pointer">
            <span
              onClick={() => handleClick(half)}
              className={`absolute left-0 w-1/2 overflow-hidden ${rating >= half ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
            <span
              onClick={() => handleClick(full)}
              className={`absolute left-0 w-full ${rating >= full ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          </div>
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
    </div>
  );
};

const CommentSection = () => {
  const { id } = useParams(); // destination_id from URL
  const { token, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/review/destination/${id}/reviews`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user) return alert("Please log in to post a review.");
    if (!rating || rating < 1 || rating > 5) return alert("Rating must be between 1 and 5.");
    if (!comment.trim()) return alert("Please write a comment.");

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("destination_id", id);
      formData.append("rating", rating);
      formData.append("comment", comment.trim());

      if (editingReviewId) {
        // Update existing review
        await axios.put(`http://localhost:5001/review/update/${editingReviewId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // New review
        await axios.post(`http://localhost:5001/review/upload/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setComment("");
      setRating(0);
      setEditingReviewId(null);
      fetchReviews();
    } catch (err) {
      console.error("Failed to post/update review", err);
      alert("Error: " + (err.response?.data?.["{!}"] || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`http://localhost:5001/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete review.");
    }
  };

  const handleEdit = (review) => {
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review.review_id);
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">User Reviews</h2>

      {!token || !user ? (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Please log in to post a review.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Write a comment"
            required
            disabled={isLoading}
          />
          <StarRating rating={rating} setRating={setRating} />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? "Submitting..." : editingReviewId ? "Update Review" : "Post Review"}
          </button>
          {editingReviewId && (
            <button
              type="button"
              onClick={() => {
                setComment("");
                setRating(0);
                setEditingReviewId(null);
              }}
              className="ml-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review.review_id} className="border p-3 rounded bg-gray-100">
              <div className="font-semibold">{review.reviewer}</div>
              <StarRating rating={review.rating} />
              <div className="italic">{review.comment}</div>
              <div className="text-xs text-gray-500">
                {new Date(review.created_at).toLocaleString()}
              </div>
              {token && user?.username === review.reviewer && (
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.review_id)}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
