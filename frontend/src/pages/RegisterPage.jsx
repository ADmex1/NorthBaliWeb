import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                login({
                    name: data.users.username,
                    email: data.users.email,
                }, data.token);

                navigate('/profile');
            } else {
                alert(data["{-}"] || data.message || 'Registrasi gagal.');
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('Terjadi kesalahan saat registrasi.');
        }
    };

    return (
        <div className="min-h-screen bg-[#1a202c] flex">
            <div className="hidden lg:flex w-1/2 bg-cover bg-center relative items-end p-12" style={{ backgroundImage: "url('/home/bratan1.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white">Buat Akun Baru</h2>
                    <p className="text-xl text-gray-300 mt-2">Gabung dan mulai petualanganmu.</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl font-bold text-white mb-2">Daftar</h2>
                    <p className="text-gray-400 mb-8">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                            Login di sini
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#4a5568] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#4a5568] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#4a5568] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800"
                        >
                            <UserPlus className="w-5 h-5 mr-2" />
                            Daftar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
