import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations.js';
import { LayoutDashboard, MapPin, Users, MessageSquare, Eye, Edit, Trash2, PlusCircle } from 'lucide-react';

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

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) {
            setDestinationList(destinationList.filter(dest => dest.id !== id));
        }
    };

    return (
        <div className="p-8 sm:p-12 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <LayoutDashboard />
                Admin Dashboard
            </h1>

            {/* Bagian Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={<MapPin size={32} className="text-blue-500"/>} title="Total Destinasi" value={destinationList.length} color="border-blue-500" />
                <StatCard icon={<Users size={32} className="text-green-500"/>} title="Pengguna Terdaftar" value="1,250" color="border-green-500" />
                <StatCard icon={<MessageSquare size={32} className="text-yellow-500"/>} title="Total Ulasan" value="849" color="border-yellow-500" />
                <StatCard icon={<Eye size={32} className="text-purple-500"/>} title="Paling Dilihat" value="Pantai Lovina" color="border-purple-500" />
            </div>

            {/* Bagian Manajemen Destinasi */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Destinasi</h2>
                    <button className="bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 flex items-center gap-2">
                        <PlusCircle size={18} />
                        Buat Destinasi Baru
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nama Destinasi</th>
                                <th scope="col" className="px-6 py-3">Kategori</th>
                                <th scope="col" className="px-6 py-3">Lokasi</th>
                                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinationList.map(dest => (
                                <tr key={dest.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {dest.name}
                                    </th>
                                    <td className="px-6 py-4">{dest.category}</td>
                                    <td className="px-6 py-4">{dest.location}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-4">
                                            <button className="font-medium text-blue-600 hover:underline"><Edit size={16}/></button>
                                            <button onClick={() => handleDelete(dest.id)} className="font-medium text-red-600 hover:underline"><Trash2 size={16}/></button>
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
