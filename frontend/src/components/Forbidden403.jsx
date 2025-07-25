import React from 'react';

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">403</h1>
                <p className="text-xl">You do not have permission to access this page.</p>
            </div>
        </div>
    );
};

export default ForbiddenPage;
