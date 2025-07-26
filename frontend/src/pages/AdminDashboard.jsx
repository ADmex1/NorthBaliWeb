import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { destinations } from '../data/destinations.js';
import {
    LayoutDashboard,
    MapPin,
    Users,
    MessageSquare,
    Eye,
    Edit,
    Trash2,
    PlusCircle,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Komponen Kartu Statistik
const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color}`}>
        <div className="flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [destinationList, setDestinationList] = useState(destinations);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user || !user.isAdmin) {
        return <Navigate to="/403" replace />;
    }

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus destinasi ini?')) {
            setDestinationList(destinationList.filter(dest => dest.id !== id));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="p-8 sm:p-12 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <LayoutDashboard />
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<MapPin size={32} className="text-blue-500" />} title="Total Destinasi" value={destinationList.length} color="border-blue-500" />
                <StatCard icon={<Users size={32} className="text-green-500" />} title="Pengguna Terdaftar" value="1,250" color="border-green-500" />
                <StatCard icon={<MessageSquare size={32} className="text-yellow-500" />} title="Total Ulasan" value="849" color="border-yellow-500" />
                <StatCard icon={<Eye size={32} className="text-purple-500" />} title="Paling Dilihat" value="Pantai Lovina" color="border-purple-500" />
            </div>

            {/* Manajemen Destinasi */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Destinasi</h2>
                    <Link to="/admin/create" className="bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 flex items-center gap-2">
                        <PlusCircle size={18} />
                        Buat Destinasi Baru
                    </Link>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3">Nama Destinasi</th>
                                <th className="px-6 py-3">Kategori</th>
                                <th className="px-6 py-3">Lokasi</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinationList.map(dest => (
                                <tr key={dest.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{dest.name}</td>
                                    <td className="px-6 py-4">{dest.category}</td>
                                    <td className="px-6 py-4">{dest.location}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button className="font-medium text-blue-600 hover:underline">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(dest.id)} className="font-medium text-red-600 hover:underline">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;