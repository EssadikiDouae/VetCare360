import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierVeterinaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    specialite: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/veterinaires/${id}`);
        setForm(res.data);
      } catch (err) {
        setError("Erreur lors du chargement du vétérinaire.");
      }
    };
    fetchVet();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/api/veterinaires/${id}`, form);
      navigate('/liste-veterinaires');
    } catch (err) {
      setError("Erreur lors de la modification.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Veterinarian</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            placeholder="Last Name"
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
            placeholder="First Name"
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
            placeholder="Telephone"
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
            placeholder="Email"
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
            placeholder="Speciality"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/liste-veterinaires')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModifierVeterinaire;