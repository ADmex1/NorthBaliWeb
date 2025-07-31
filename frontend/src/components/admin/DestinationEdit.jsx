import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ForbiddenPage from "../Forbidden403";

const EditDestination = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAuth();

    if (!user?.isAdmin) {
        return (
            <ForbiddenPage />
        );
    }
    const [form, setForm] = useState({
        name: "",
        location: "",
        category: "",
        description: "",
        rating: "",
        best_time_range: "",
        gmaps_url: "",
        youtube_id: "",
        highlights: [""],
    });

    const [images, setImages] = useState([]);
    const [replaceImages, setReplaceImages] = useState(false);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/destination/${id}`);
                const data = res.data.destination;

                const bestTimeFormatted = `${data.best_time_start} - ${data.best_time_end}`;

                setForm({
                    name: data.name || "",
                    location: data.location || "",
                    category: data.category || "",
                    description: data.description || "",
                    rating: data.rating || "",
                    best_time_range: bestTimeFormatted,
                    gmaps_url: data.gmaps_url || "",
                    youtube_id: data.youtube_id?.split("v=")[1] || "",
                    highlights: data.highlights || [""],
                });
            } catch (err) {
                console.error("Failed to fetch destination:", err);
            }
        };

        fetchDestination();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleHighlightChange = (index, e) => {
        const newHighlights = [...form.highlights];
        newHighlights[index] = e.target.value;
        setForm({ ...form, highlights: newHighlights });
    };

    const addHighlight = () => {
        setForm({ ...form, highlights: [...form.highlights, ""] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            const [start, end] = form.best_time_range.split(" - ");
            formData.append("bestTime", `${start.trim()} - ${end.trim()}`);

            Object.entries(form).forEach(([key, value]) => {
                if (key === "highlights") {
                    value.forEach((highlight) => formData.append("highlights", highlight));
                } else if (key !== "best_time_range") {
                    formData.append(key, value);
                }
            });

            if (replaceImages) {
                formData.append("replace_images", "true");
                images.forEach((img) => formData.append("image", img));
            } else {
                formData.append("replace_images", "false");
            }

            await axios.put(`http://localhost:5001/destination/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/admindashboard");
        } catch (err) {
            console.error("Failed to update destination:", err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Edit Destination</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border" />
                <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border" />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 border" />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border" />
                <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} type="number" step="0.1" className="w-full p-2 border" />
                <input name="best_time_range" placeholder="Best Time (HH:MM - HH:MM)" value={form.best_time_range} onChange={handleChange} className="w-full p-2 border" />
                <input name="gmaps_url" placeholder="Google Maps URL" value={form.gmaps_url} onChange={handleChange} className="w-full p-2 border" />
                <input name="youtube_id" placeholder="YouTube Video ID" value={form.youtube_id} onChange={handleChange} className="w-full p-2 border" />

                <label className="block font-medium mt-4">Highlights:</label>
                {form.highlights.map((highlight, index) => (
                    <input key={index} type="text" value={highlight} onChange={(e) => handleHighlightChange(index, e)} className="w-full p-2 border mb-1" />
                ))}
                <button type="button" onClick={addHighlight} className="text-blue-500 mb-2">+ Add Highlight</button>

                <label className="block mt-2">
                    <input type="checkbox" checked={replaceImages} onChange={() => setReplaceImages(!replaceImages)} className="mr-2" />
                    Replace existing images
                </label>

                {replaceImages && (
                    <input type="file" multiple onChange={(e) => setImages([...e.target.files])} className="mt-2" />
                )}

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
            </form>
        </div>
    );
};

export default EditDestination;
