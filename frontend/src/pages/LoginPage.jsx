import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, name: "Pengguna" });
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-[#2d3748] flex">
            {/* Kolom Kiri (Gambar & Tagline) */}
            <div className="hidden lg:flex w-1/2 bg-cover bg-center relative items-end p-12" style={{ backgroundImage: "url('/home/kerja1.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white">Selamat Datang Kembali,</h2>
                    <p className="text-xl text-gray-300 mt-2">Petualangan Anda menanti.</p>
                </div>
            </div>

            {/* Kolom Kanan (Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                    <p className="text-gray-400 mb-8">
                        Belum punya akun?{' '}
                        <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">
                            Daftar di sini
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-[#4a5568] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-[#4a5568] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Ingat saya
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
                                    Lupa password?
                                </a>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;