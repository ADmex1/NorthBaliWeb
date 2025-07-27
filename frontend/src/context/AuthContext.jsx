import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // Fetch full user info including profile_image
    useEffect(() => {
        const fetchUser = async () => {
            const savedToken = localStorage.getItem('token');
            if (!savedToken) return;

            try {
                const res = await axios.get("http://localhost:5001/user/me", {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                });

                const userData = res.data;
                setUser({
                    ...userData,
                    isAdmin: userData.email === 'admin@wisata.com',
                });
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

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
            localStorage.setItem('token', token);
        } catch (e) {
            console.error('Error decoding token during login:', e);
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        auth.logout();
        window.location.href = '/login'; // Redirect to login
    };

    const updateUser = (userData) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...userData,
        }));
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
