import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5001/destination-data', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setDestinations(res.data.destinations))
      .catch(err => console.error(err));
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this destination?")) {
      try {
        await axios.delete(`http://localhost:5001/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDestinations(prev => prev.filter(d => d.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.response?.data?.error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Destinations</h2>
      <table className="w-full">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Location</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {destinations.map(dest => (
            <tr key={dest.id}>
              <td>{dest.name}</td>
              <td>{dest.category}</td>
              <td>{dest.location}</td>
              <td>
                <button><Edit /></button>
                <button onClick={() => handleDelete(dest.id)}><Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DestinationList;
