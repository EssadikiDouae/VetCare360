import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModifierAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    type: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/animals/${id}`);
        console.log('Animal data received:', response.data);
        
        // Format the date for the input field
        const animalData = {
          ...response.data,
          birthDate: new Date(response.data.birthDate).toISOString().split('T')[0]
        };
        
        setFormData(animalData);
      } catch (error) {
        console.error("Error loading animal data:", error);
        setError('Failed to load animal data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put(`http://localhost:5000/api/animals/${id}`, formData);
      console.log("Animal updated successfully:", response.data);
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error("Error updating animal:", error);
      setError(error.response?.data?.message || 'Failed to update animal. Please try again.');
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Pet Information</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="form-control custom-input" 
            value={formData.name} 
            onChange={handleChange}
            required 
            placeholder="Name"
          />
        </div>

        <div className="mb-3">
          <input 
            type="date" 
            name="birthDate" 
            id="birthDate" 
            className="form-control custom-input" 
            value={formData.birthDate} 
            onChange={handleChange}
            required 
            placeholder="Birth Date"
          />
        </div>

        <div className="mb-3">
          <select 
            name="type" 
            id="type" 
            className="form-control custom-input" 
            value={formData.type} 
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">Save Changes</button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierAnimal;
