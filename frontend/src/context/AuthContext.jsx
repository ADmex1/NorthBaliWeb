import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

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
            isAdmin: userData.is_admin || userData.isAdmin,
            profile_image: userData.profile_image || 'default.avif',
        });
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            isAdmin: userData.is_admin || userData.isAdmin,
            profile_image: userData.profile_image,
        }));
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5001/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        }
        finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
            window.location.reload();
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
