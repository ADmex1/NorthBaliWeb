import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return {
                username: decoded.username,
                email: decoded.email,
                isAdmin: decoded.email === 'ADmex1@gmail.com',
            };
        } catch (e) {
            console.error('Invalid token:', e);
            return null;
        }
    });

    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = (userData, token) => {
        try {
            const decoded = jwtDecode(token);
            const authUser = {
                username: decoded.username,
                email: decoded.email,
                isAdmin: decoded.email === 'admin@wisata.com',
            };
            setUser(authUser);
            setToken(token);
            localStorage.setItem('user', JSON.stringify(authUser));
            localStorage.setItem('token', token);
        } catch (e) {
            console.error('Error decoding token:', e);
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
