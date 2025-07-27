import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                'http://localhost:5001/user/update-password',
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage(res.data.Message);
            setOldPassword('');
            setNewPassword('');

            alert('Password changed successfully. Please log in again.');
            logout(); // this will redirect to login too
        } catch (err) {
            setMessage(err.response?.data?.Message || 'An error occurred');
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded-lg mt-6">
            <h2 className="text-lg font-semibold mb-4">Update Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
                >
                    Change Password
                </button>
                {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default UpdatePassword;
