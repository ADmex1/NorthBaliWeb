import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <Lock size={48} className="text-red-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
            <p className="text-gray-500 mb-4">You do not have permission to access this page.</p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Back to Home
            </button>
        </div>
    );
};

export default ForbiddenPage;
