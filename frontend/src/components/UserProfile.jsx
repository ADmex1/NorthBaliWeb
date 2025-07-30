import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, LogOut, Shield } from 'lucide-react';
import UpdatePassword from './UpdatePassword';
const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout, token } = useAuth();
    const [activeTab, setActiveTab] = useState('editProfile');

    const [email, setEmail] = useState(user?.email || '');
    const [username, setUsername] = useState(user?.username || '');
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [refreshImage, setRefreshImage] = useState(Date.now());

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    // const getFilename = (path) => {
    //     if (!path) return 'default.avif';
    //     return path.split('/').pop();
    // };
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        try {
            const res = await axios.put('http://localhost:5001/user/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(res.data.Message || 'Profil berhasil diperbarui!');
            // Trigger image refresh
            setRefreshImage(Date.now());
        } catch (err) {
            setMessage(err.response?.data?.Error || 'Gagal memperbarui profil.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const renderContent = () => {
        if (activeTab === 'editProfile') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Edit Profil</h2>
                    {message && <p className="text-sm text-green-600 mb-4">{message}</p>}
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ganti Foto Profil</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-full mt-2 object-cover"
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
                        >
                            Simpan Perubahan
                        </button>
                    </form>
                </div>
            );
        } else if (activeTab === 'security') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Keamanan</h2>
                    <UpdatePassword />
                    <p className="text-sm text-gray-500 mt-4">
                        Pastikan untuk menggunakan kata sandi yang kuat dan unik untuk akun Anda.
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="max-w-screen-xl mx-auto bg-white shadow-xl min-h-screen">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 p-6 text-white flex flex-col">
                    <div className="text-center mb-10">
                        <img
                            src={`http://localhost:5001/profileimage/${user?.profile_image || 'default.avif'}`}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                        <p className="text-sm text-gray-400">{user?.username}</p>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                    <nav className="space-y-2 flex-grow">
                        <button
                            onClick={() => setActiveTab('editProfile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'editProfile'
                                ? 'bg-cyan-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <User size={18} />
                            Edit Profil
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'security'
                                ? 'bg-cyan-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <Shield size={18} />
                            Keamanan
                        </button>
                    </nav>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4 lg:w-4/5 p-8 sm:p-12 bg-gray-50">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
