import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AjouterAnimal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const owner = location.state?.owner;

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    birthDate: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!owner || !owner._id) {
      setError('The owner must be identified first.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          owner: owner._id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Animal added successfully:', data);
        navigate('/liste-proprietaires');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add animal');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'transparent', boxShadow: 'none' }}>
      <h3 className="mb-4" style={{ color: '#34495e', fontWeight: 'bold', textAlign: 'right' }}>Add a new animal</h3>
      {owner && (
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#34495e', marginBottom: '18px', letterSpacing: '0.5px' }}>
         owner :  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#34495e' }}>{owner.prenom} {owner.nom}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name of animal"
            style={{ background: 'transparent', color: '#34495e' }}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select custom-input"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{ background: 'transparent', color: '#34495e' }}
          >
            <option value="">Choose the type of animal</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control custom-input"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            placeholder="Date of birthday"
            style={{ background: 'transparent', color: '#34495e' }}
          />
        </div>
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        <div className="d-flex justify-content-start gap-2 mt-3">
          <button type="submit" className="btn btn-primary btn-sm">
           Add animal
          </button>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
          Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterAnimal;






























