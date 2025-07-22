import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Send } from 'lucide-react';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { name: "Budi", text: "Tempatnya indah sekali, udaranya sejuk!", time: "2 hari yang lalu" },
    { name: "Ani", text: "Sangat direkomendasikan untuk liburan keluarga.", time: "1 hari yang lalu" },
  ]);
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "" || !user) return;

    const newComment = {
      name: user.displayName || "Pengguna",
      text: commentText,
      time: "Baru saja"
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pt-8"><MessageCircle className="w-8 h-8 text-cyan-600"/><h3 className="text-2xl font-bold text-gray-800">Ulasan Pengunjung</h3></div>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4"><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label><input type="text" id="name" value={user.displayName || ''} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" /></div>
            <div className="mb-4"><label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Komentar</label><textarea id="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="4" placeholder="Tulis ulasan Anda di sini..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" required></textarea></div>
            <button type="submit" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"><Send size={16} />Kirim Ulasan</button>
          </form>
        ) : (
          <div className="text-center"><p className="text-gray-600"><Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-500">Login</Link> untuk memberikan ulasan.</p></div>
        )}
      </div>
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
              {(comment.name || 'P').charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{comment.name || 'Pengguna'}</p>
                <p className="text-xs text-gray-500">{comment.time}</p>
              </div>
              <p className="text-gray-700 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;