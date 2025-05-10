import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteVet = () => {
  const [vets, setVets] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/veterinaires');
        setVets(res.data);
      } catch (err) {
        setMessage("Erreur lors du chargement des vétérinaires.");
      }
    };
    fetchVets();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      setMessage("Veuillez sélectionner un vétérinaire.");
      return;
    }
    if (!window.confirm("Voulez-vous vraiment supprimer ce vétérinaire ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/veterinaires/${selectedId}`);
      setMessage("Vétérinaire supprimé avec succès !");
      setVets(vets.filter(v => v._id !== selectedId));
      setSelectedId('');
    } catch (err) {
      setMessage("Erreur lors de la suppression !");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Supprimer un vétérinaire</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="mb-3">
        <label className="form-label">Choisir un vétérinaire à supprimer :</label>
        <select
          className="form-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {vets.map(vet => (
            <option key={vet._id} value={vet._id}>
              {vet.nom} {vet.prenom} ({vet.specialite})
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Supprimer
      </button>
    </div>
  );
};

export default DeleteVet;