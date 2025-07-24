import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // Simulasi: Jika email adalah admin@wisata.com, berikan peran admin
        const isAdmin = userData.email === 'admin@wisata.com';
        
        setUser({
            displayName: userData.name || 'Pengguna Baru',
            email: userData.email,
            isAdmin: isAdmin 
        });
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
