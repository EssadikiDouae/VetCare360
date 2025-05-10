import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Veterinaires = () => {
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();

  const fetchVets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/veterinaires');
      setVets(response.data);
    } catch (error) {
      console.error('Error fetching vets:', error);
    }
  };

  useEffect(() => {
    fetchVets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce vétérinaire ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/veterinaires/${id}`);
        fetchVets();
      } catch (error) {
        console.error('Error deleting vet:', error);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ padding: '20px', borderRadius: '8px' }}>
      <h2 className="mb-4">Liste des vétérinaires </h2>
      <button
        className="btn mb-3"
        style={{ backgroundColor: '#D4A017', color: 'white' }}
        onClick={() => navigate('/ajouter-vet')}
      >
        Ajouter un vétérinaire
      </button>
      <table className="table table-bordered table-hover custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vets.map((vet, index) => (
            <tr key={vet._id}>
              <td>{index + 1}</td>
              <td>{vet.nom}</td>
              <td>{vet.specialite}</td>
              <td>{vet.telephone}</td>
              <td>
                <button
                  className="btn btn-sm"
                  style={{ backgroundColor: '#7B3F00', color: 'white' }}
                  onClick={() => handleDelete(vet._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Veterinaires;