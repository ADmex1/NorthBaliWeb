import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DestinationCreate = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        location: '',
        category: '',
        description: '',
        bestTime: '',
        gmapsUrl: '',
        youtube_id: '',
        rating: ''
    });

    const [highlights, setHighlights] = useState(['']);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleHighlightChange = (index, value) => {
        const updated = [...highlights];
        updated[index] = value;
        setHighlights(updated);
    };

    const handleAddHighlight = () => {
        setHighlights([...highlights, '']);
    };

    const handleRemoveHighlight = (index) => {
        const updated = [...highlights];
        updated.splice(index, 1);
        setHighlights(updated);
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in form) {
            formData.append(key, form[key]);
        }

        highlights.forEach((h) => formData.append('highlights', h));
        images.forEach((img) => formData.append('image', img));

        try {
            await axios.post('http://localhost:5001/destination/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/admindashboard');
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tambah Destinasi Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'location', 'category', 'description', 'rating', 'bestTime', 'gmapsUrl', 'youtube_id'].map((field) => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required={field !== 'youtube_id'}
                    />
                ))}

                <div>
                    <p className="font-semibold">Highlights:</p>
                    {highlights.map((value, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleHighlightChange(idx, e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveHighlight(idx)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddHighlight} className="text-blue-500 underline text-sm">
                        + Add Highlight
                    </button>
                </div>

                <div>
                    <p className="font-semibold">Images:</p>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(img)}
                                alt={`preview-${index}`}
                                className="w-24 h-24 object-cover rounded border"
                            />
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default DestinationCreate;
