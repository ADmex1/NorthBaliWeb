import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DestinationCreate = () => {
    const { token } = useAuth();
    const [form, setForm] = useState({
        name: '',
        location: '',
        category: '',
        description: '',
        rating: 0,
        bestTime: '',
        gmapsUrl: '',
        youtube_id: '',
        highlights: []
    });
    const [images, setImages] = useState([]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleHighlights = e => {
        setForm({ ...form, highlights: e.target.value.split(',').map(h => h.trim()) });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        for (let key in form) {
            if (Array.isArray(form[key])) {
                form[key].forEach(item => data.append('highlights', item));
            } else {
                data.append(key, form[key]);
            }
        }
        for (const file of images) data.append('image', file);

        try {
            await axios.put('http://localhost:5001/upload', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Success!");
        } catch (err) {
            alert("Failed: " + err.response?.data?.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <input name="category" placeholder="Category" onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange} />
            <input name="rating" type="number" placeholder="Rating" onChange={handleChange} />
            <input name="bestTime" placeholder="Best Time (e.g. 08:00 - 17:00)" onChange={handleChange} />
            <input name="gmapsUrl" placeholder="Google Maps URL" onChange={handleChange} />
            <input name="youtube_id" placeholder="YouTube Video ID" onChange={handleChange} />
            <input name="highlights" placeholder="Highlights (comma-separated)" onChange={handleHighlights} />
            <input type="file" multiple onChange={e => setImages([...e.target.files])} />
            <button type="submit">Create</button>
        </form>
    );
};

export default DestinationEdit;
