import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-lg">Halaman tidak ditemukan.</p>
                <a href="/" className="text-cyan-400 hover:underline mt-4 inline-block">
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    );
};
export default NotFoundPage;