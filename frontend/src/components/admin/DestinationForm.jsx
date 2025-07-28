import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    rating: "",
    best_time: "",
    gmaps_url: "",
    youtube_id: "",
    highlights: [""],
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // for edit preview

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:5001/destination/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name || "",
            location: data.location || "",
            category: data.category || "",
            description: data.description || "",
            rating: data.rating || "",
            best_time: data.best_time || "",
            gmaps_url: data.gmaps_url || "",
            youtube_id: data.youtube_id || "",
            highlights: data.highlights || [""],
          });
          setExistingImages(data.images || []); // assuming `images` is an array of URLs or paths
        })
        .catch((err) => console.error("Error loading destination", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...form.highlights];
    updatedHighlights[index] = value;
    setForm((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  const addHighlight = () => {
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (key === "highlights") {
        form.highlights.forEach((highlight) =>
          formData.append("highlights", highlight)
        );
      } else {
        formData.append(key, form[key]);
      }
    }

    images.forEach((img) => formData.append("images", img));

    const token = localStorage.getItem("token");

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5001/destination/update/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Destination updated!");
      } else {
        await axios.post("http://localhost:5001/destination/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Destination created!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Submit failed", err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        {isEdit ? "Edit Destination" : "Create Destination"}
      </h2>
      <form onSubmit={handleSubmit}>
        {[
          "name",
          "location",
          "category",
          "description",
          "rating",
          "best_time",
          "gmaps_url",
          "youtube_id",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="block w-full p-2 mb-2 border rounded"
          />
        ))}

        <label>Highlights:</label>
        {form.highlights.map((val, index) => (
          <input
            key={index}
            type="text"
            value={val}
            onChange={(e) => handleHighlightChange(index, e.target.value)}
            placeholder={`Highlight ${index + 1}`}
            className="block w-full p-2 mb-2 border rounded"
          />
        ))}
        <button
          type="button"
          onClick={addHighlight}
          className="text-blue-600 text-sm mb-2"
        >
          + Add Highlight
        </button>

        <label>Images:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full p-2 mb-4"
        />

        {/* Preview existing images in edit mode */}
        {isEdit && existingImages.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold">Existing Images:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.map((imgUrl, i) => (
                <img
                  key={i}
                  src={`http://localhost:5001/${imgUrl}`} // adjust path based on server
                  alt={`Existing ${i}`}
                  className="w-24 h-24 object-cover border rounded"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default DestinationForm;
