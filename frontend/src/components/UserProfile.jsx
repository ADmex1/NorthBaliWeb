import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Shield, Edit2 } from 'lucide-react';

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('editProfile');

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    // ... (kode renderContent dari ProfilePage lama bisa diletakkan di sini)
    const renderContent = () => {
        // ...
    };

    return (
        <div className="max-w-screen-xl mx-auto bg-white shadow-xl min-h-screen">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 p-6 text-white flex flex-col">
                    <div className="text-center mb-10">
                        <img src="https://via.placeholder.com/80" alt="Profile" className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-cyan-400" />
                        <h3 className="mt-4 text-lg font-semibold">{user?.displayName || 'Pengguna'}</h3>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                    <nav className="space-y-2 flex-grow">
                        <button onClick={() => setActiveTab('editProfile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'editProfile' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                            <User size={18} />
                            Edit Profil
                        </button>
                        <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                            <Shield size={18} />
                            Keamanan
                        </button>
                    </nav>
                    <div>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Konten Utama */}
                <div className="w-full md:w-3/4 lg:w-4/5 p-8 sm:p-12 bg-gray-50">
                    {/* ... (kode renderContent dari ProfilePage lama bisa diletakkan di sini) ... */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
