import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmation from '../components/DeleteConfirmation';

const InfoProprietaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proprietaire, setProprietaire] = useState(null);
  const [visits, setVisits] = useState({});
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: null, 
    id: null,
    name: '',
    message: ''
  });

  const fetchData = async () => {
    try {
      console.log('Fetching proprietaire with ID:', id);
      const response = await axios.get(`http://localhost:5000/api/proprietaires/${id}`);
      console.log('Received proprietaire data:', response.data);
      setProprietaire(response.data);

      // Fetch visits for each animal
      if (response.data.animaux) {
        const visitsData = {};
        for (const animal of response.data.animaux) {
          try {
            const visitsResponse = await axios.get(`http://localhost:5000/api/proprietaires/debug/visits/${animal._id}`);
            console.log(`Visits for animal ${animal._id}:`, visitsResponse.data);
            visitsData[animal._id] = visitsResponse.data;
          } catch (error) {
            console.error(`Error fetching visits for animal ${animal._id}:`, error);
          }
        }
        setVisits(visitsData);
      }
    } catch (error) {
      console.error('Error loading owner data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteAnimal = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/animals/${deleteModal.id}`);
      setDeleteModal({ isOpen: false, type: null, id: null, name: '', message: '' });
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting animal:', error);
      alert('Failed to delete animal. Please try again.');
    }
  };

  const handleDeleteVisit = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/visites/${deleteModal.id}`);
      setDeleteModal({ isOpen: false, type: null, id: null, name: '', message: '' });
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting visit:', error);
      alert('Failed to delete visit. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/proprietaires/${deleteModal.ownerId}`);
      setDeleteModal({ isOpen: false, ownerId: null, ownerName: '' });
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Consider as deleted, refresh the list
        setDeleteModal({ isOpen: false, ownerId: null, ownerName: '' });
        fetchData();
      } else {
        console.error('Error deleting owner:', error);
        alert('Failed to delete owner. Please try again.');
      }
    }
  };

  if (!proprietaire) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Owner Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{proprietaire.prenom} {proprietaire.nom}</td>
          </tr>
          <tr>
            <td><strong>Address</strong></td>
            <td>{proprietaire.adresse}</td>
          </tr>
          <tr>
            <td><strong>City</strong></td>
            <td>{proprietaire.ville}</td>
          </tr>
          <tr>
            <td><strong>Telephone</strong></td>
            <td>{proprietaire.telephone}</td>
          </tr>
        </tbody>
      </table>

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate(`/modifier-proprietaire/${proprietaire._id}`, { state: proprietaire })}
        >
          Edit Owner
        </button>

        <button 
          className="btn btn-success" 
          
          onClick={() => navigate(`/ajouter-animal/${proprietaire._id}`, { state: { owner: proprietaire } })}
        >
          Add New Pet
        </button>
      </div>

      <h3>Pets and Visits</h3>
      {proprietaire.animaux && proprietaire.animaux.map((animal) => {
        const animalVisits = visits[animal._id] || [];
        console.log(`Rendering animal ${animal._id} with visits:`, animalVisits);
        
        return (
          <div key={animal._id} className="border p-3 mb-3">
            <p><strong>Name:</strong> {animal.name}</p>
            <p><strong>Birth Date:</strong> {new Date(animal.birthDate).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {animal.type}</p>

            {animalVisits.length > 0 ? (
              <div className="mt-3">
                <h5>Visit History</h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Visit Date</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animalVisits.map((visite) => (
                      <tr key={visite._id}>
                        <td>{new Date(visite.date).toLocaleDateString()}</td>
                        <td>{visite.description || 'No description provided'}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setDeleteModal({
                              isOpen: true,
                              type: 'visit',
                              id: visite._id,
                              name: `visit on ${new Date(visite.date).toLocaleDateString()}`,
                              message: `Are you sure you want to delete this visit from ${new Date(visite.date).toLocaleDateString()}?`
                            })}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted mt-3">No visits recorded for this pet</p>
            )}

            <div className="mt-3">
              <button 
                className="btn btn-outline-primary me-2" 
                onClick={() => navigate(`/modifier-animal/${animal._id}`)}
              >
                Edit Pet
              </button>
              <button 
                className="btn btn-outline-success me-2" 
                onClick={() => navigate(`/ajouter-visite/${animal._id}`)}
              >
                Add Visit
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => setDeleteModal({
                  isOpen: true,
                  type: 'animal',
                  id: animal._id,
                  name: animal.name,
                  message: `Are you sure you want to delete ${animal.name}? This will also delete all their visits.`
                })}
              >
                Delete Pet
              </button>
            </div>
          </div>
        );
      })}

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: '', message: '' })}
        onConfirm={deleteModal.type === 'animal' ? handleDeleteAnimal : handleDeleteVisit}
        title={`Delete ${deleteModal.type === 'animal' ? 'Pet' : 'Visit'}`}
        message={deleteModal.message}
      />
    </div>
  );
};

export default InfoProprietaire;




