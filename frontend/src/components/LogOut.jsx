import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
const LogOut = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-700">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
        </button>
    );
}
export default LogOut;