import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:5001/user-data', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUsers(res.data.users))
            .catch(err => console.error(err));
    }, [token]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <table className="w-full">
                <thead><tr><th>Email</th><th>Username</th><th>Role</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}><td>{u.email}</td><td>{u.username}</td><td>{u.role}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
