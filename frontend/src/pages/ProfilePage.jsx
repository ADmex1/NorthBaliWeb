import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard.jsx'; // Impor dashboard admin
import UserProfile from '../components/UserProfile.jsx'; // Impor profil pengguna (akan kita buat)

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
             <div className="max-w-screen-xl mx-auto bg-white shadow-xl text-center py-40">
                <p>Silakan login untuk melihat halaman ini.</p>
                <Link to="/login" className="text-cyan-600 hover:underline">Login</Link>
            </div>
        );
    }

    // Tampilkan dashboard jika admin, jika tidak tampilkan profil biasa
    return user.isAdmin ? <AdminDashboard /> : <UserProfile />;
};

export default ProfilePage;
