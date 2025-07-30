import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const decoded = jwtDecode(data.token);

                const userData = {
                    id: decoded.id,
                    email: decoded.email,
                    username: decoded.username,
                    is_admin: decoded.is_admin,
                    token: data.token,
                };

                login(userData, data.token);
                if (userData.is_admin) {
                    navigate('/admindashboard');
                } else {
                    navigate('/profile');
                }

            } else {
                alert(data?.['{-}'] || data?.message || 'Login gagal.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Terjadi kesalahan saat login.');
        }
    };

    return (
        <div className="min-h-screen bg-[#2d3748] flex">
            {/* Left Side Image */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center relative items-end p-12"
                style={{ backgroundImage: "url('/home/kerja1.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white">Selamat Datang Kembali,</h2>
                    <p className="text-xl text-gray-300 mt-2">Petualangan Anda menanti.</p>
                </div>
            </div>

            {/* Login Form */}
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
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-800"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
