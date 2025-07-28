import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminCRUD = () => {
    const { token } = useAuth();

    const [destinations, setDestinations] = useState([]);
    const [form, setForm] = useState({
        name: '', location: '', category: '', description: '',
        rating: '', bestTime: '', gmapsUrl: '', youtube_id: '',
        highlights: [''], image: []
    });
    const [editingId, setEditingId] = useState(null);

    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const res = await axios.get('http://localhost:5001/destination-list');
            setDestinations(res.data);
        } catch (err) {
            console.error('Fetch Error:', err);
        }
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, image: Array.from(e.target.files) }));
    };

    const handleHighlightChange = (i, value) => {
        const newHighlights = [...form.highlights];
        newHighlights[i] = value;
        setForm(prev => ({ ...prev, highlights: newHighlights }));
    };

    const addHighlight = () => {
        setForm(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
    };

    const resetForm = () => {
        setForm({
            name: '', location: '', category: '', description: '',
            rating: '', bestTime: '', gmapsUrl: '', youtube_id: '',
            highlights: [''], image: []
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            if (key === 'image') {
                form.image.forEach(img => formData.append('image', img));
            } else if (key === 'highlights') {
                form.highlights.forEach(h => formData.append('highlights', h));
            } else {
                formData.append(key === 'gmapsUrl' ? 'gmaps_url' : key, form[key]);
            }
        }

        try {
            if (editingId) {
                await axios.put(`http://localhost:5001/update/${editingId}`, formData, { headers });
            } else {
                await axios.post('http://localhost:5001/destination/upload', formData, { headers });
            }
            resetForm();
            fetchDestinations();
        } catch (err) {
            console.error('Submit Error:', err);
        }
    };

    const handleEdit = (dest) => {
        setEditingId(dest.id);
        setForm({
            name: dest.name,
            location: dest.location,
            category: dest.category,
            description: dest.description,
            rating: dest.rating,
            bestTime: `${dest.best_time_start} - ${dest.best_time_end} WITA`,
            gmapsUrl: dest.gmaps_url,
            youtube_id: dest.youtube_id?.split('v=')[1] || '',
            highlights: dest.highlights || [''],
            image: []
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this destination?')) return;
        try {
            await axios.delete(`http://localhost:5001/delete/${id}`, { headers });
            fetchDestinations();
        } catch (err) {
            console.error('Delete Error:', err);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{editingId ? 'Update' : 'Create'} Destination</h2>
            <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
                {['name', 'location', 'category', 'description', 'rating', 'bestTime', 'gmapsUrl', 'youtube_id'].map(field => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        className="w-full border p-2 rounded"
                        required
                    />
                ))}
                <div>
                    <label>Highlights:</label>
                    {form.highlights.map((h, i) => (
                        <input
                            key={i}
                            value={h}
                            onChange={e => handleHighlightChange(i, e.target.value)}
                            className="w-full border p-2 my-1 rounded"
                        />
                    ))}
                    <button type="button" onClick={addHighlight} className="text-blue-600 underline">+ Add Highlight</button>
                </div>
                <div>
                    <label>Images:</label>
                    <input type="file" multiple onChange={handleFileChange} className="block" />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    {editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                    <button type="button" onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                )}
            </form>

            <h3 className="text-xl font-semibold mt-8 mb-2">Current Destinations:</h3>
            <div className="space-y-4">
                {destinations.map(dest => (
                    <div key={dest.id} className="border p-4 rounded-lg">
                        <h4 className="text-lg font-bold">{dest.name}</h4>
                        <p>{dest.location} | {dest.category}</p>
                        <p>{dest.description}</p>
                        <p><strong>Rating:</strong> {dest.rating} ⭐</p>
                        <p><strong>Best Time:</strong> {dest.best_time_start} - {dest.best_time_end} WITA</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleEdit(dest)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDelete(dest.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCRUD;
