// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || storedToken === "undefined") return null;
        try {
            const decoded = jwtDecode(storedToken);
            return {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username,
                role: decoded.role,
                token: storedToken
            };
        } catch (err) {
            console.error("Failed to decode token", err);
            return null;
        }
    });

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
