import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterVet = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/veterinaires', form);
      setSuccess('Vétérinaire ajouté avec succès !');
      setForm({ nom: '', prenom: '', specialite: '', telephone: '', email: '' });
      setTimeout(() => navigate('/veterinaires'), 1000);
    } catch (err) {
      setError("Erreur lors de l'ajout du vétérinaire.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a veterinarian </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
            placeholder="Your first name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            name="specialite"
            value={form.specialite}
            onChange={handleChange}
            required
            placeholder="Specialty"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            required
            placeholder="Phone"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control custom-input"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Mail"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/veterinaires')}
        >
        Cancel
        </button>
      </form>
    </div>
  );
};

export default AjouterVet;
