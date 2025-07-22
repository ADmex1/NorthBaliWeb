import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
             <div className="max-w-screen-xl mx-auto bg-white shadow-xl text-center py-40">
                <p>Silakan login untuk melihat halaman ini.</p>
                <Link to="/login" className="text-cyan-600 hover:underline">Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto bg-white shadow-xl min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-8">
                <div className="text-center"><User className="mx-auto h-16 w-16 text-cyan-600" /><h2 className="mt-4 text-2xl font-bold text-gray-900">Profil Pengguna</h2></div>
                <div className="mt-8">
                    <div className="space-y-4">
                        <div><p className="text-sm font-medium text-gray-500">Nama</p><p className="text-lg text-gray-900">{user.displayName}</p></div>
                        <div><p className="text-sm font-medium text-gray-500">Email</p><p className="text-lg text-gray-900">{user.email}</p></div>
                    </div>
                    <button onClick={handleLogout} className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"><LogOut className="h-5 w-5 mr-2" />Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;