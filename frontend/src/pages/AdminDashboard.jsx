import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MapPin, Users, MessageSquare, Plus, Trash2, Edit } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon, title, value, color }) => (
    <div className={`border rounded-2xl shadow-md p-4 ${color} w-full sm:w-1/2 md:w-1/4 m-2`}>
        <div className="flex items-center space-x-4">
            {icon}
            <div>
                <div className="text-sm text-gray-500">{title}</div>
                <div className="text-xl font-semibold">{value}</div>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const { token, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();
    const isAdmin = true; // Replace with actual admin check logic
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const fetchData = async () => {
            try {
                const userRes = await axios.get('http://localhost:5001/admin/user-data', config);
                setUsers(userRes.data.users);

                const reviewRes = await axios.get('http://localhost:5001/admin/recent-reviews', config);
                setRecentReviews(reviewRes.data.reviews);

                const destinationRes = await axios.get('http://localhost:5001/destination/destination-list');
                setDestinations(destinationRes.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };

        fetchData();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this destination?")) return;

        try {
            await axios.delete(`http://localhost:5001/destination/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDestinations(prev => prev.filter(dest => dest.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };
    if (!isAdmin) {
        return <Forbidden403 />;
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
                <LayoutDashboard className="mr-2" /> Admin Dashboard
            </h1>

            <div className="flex flex-wrap">
                <StatCard icon={<MapPin size={32} className="text-blue-500" />} title="Total Destinasi" value={destinations.length} color="border-blue-500" />
                <StatCard icon={<Users size={32} className="text-green-500" />} title="Total Pengguna" value={users.length} color="border-green-500" />
                <StatCard icon={<MessageSquare size={32} className="text-yellow-500" />} title="Total Review Terbaru" value={recentReviews.length} color="border-yellow-500" />
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">5 Review Terbaru:</h2>
                <ul className="list-disc ml-5">
                    {recentReviews.map((review, idx) => (
                        <li key={idx}><strong>{review.username || 'User'}:</strong> {review.comment}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-10">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">Daftar Destinasi:</h2>
                    <button onClick={() => navigate('/admin/create')} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
                        <Plus size={18} className="mr-1" /> Tambah Destinasi
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left bg-white rounded-lg">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-2">Nama</th>
                                <th className="px-4 py-2">Lokasi</th>
                                <th className="px-4 py-2">Kategori</th>
                                <th className="px-4 py-2">Rating</th>
                                <th className="px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">No destinations available.</td>
                                </tr>
                            ) : (
                                destinations.map((dest) => (
                                    <tr key={dest.id} className="border-t">
                                        <td className="px-4 py-2">{dest.name}</td>
                                        <td className="px-4 py-2">{dest.location}</td>
                                        <td className="px-4 py-2">{dest.category}</td>
                                        <td className="px-4 py-2">{dest.rating}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/edit/${dest.id}`)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dest.id)}
                                                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
