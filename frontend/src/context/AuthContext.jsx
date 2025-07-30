import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // ✅ Restore from localStorage on first load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, token) => {
        setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            isAdmin: userData.is_admin || userData.isAdmin, // works for both formats
        });
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            isAdmin: userData.is_admin || userData.isAdmin,
        }));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
