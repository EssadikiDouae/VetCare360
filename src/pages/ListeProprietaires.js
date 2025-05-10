import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteConfirmation from '../components/DeleteConfirmation';

const ListeProprietaires = () => {
  const [proprietaires, setProprietaires] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    ownerId: null,
    ownerName: ''
  });

  const fetchProprietaires = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/proprietaires");
      setProprietaires(res.data);
    } catch (error) {
      console.error("Error loading owners:", error);
    }
  };

  useEffect(() => {
    fetchProprietaires();
  }, []);

  const handleDeleteClick = (owner) => {
    setDeleteModal({
      isOpen: true,
      ownerId: owner._id,
      ownerName: `${owner.prenom} ${owner.nom}`
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/proprietaires/${deleteModal.ownerId}`);
      setDeleteModal({ isOpen: false, ownerId: null, ownerName: '' });
      fetchProprietaires();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Owner not found, treat as deleted
        setDeleteModal({ isOpen: false, ownerId: null, ownerName: '' });
        fetchProprietaires();
      } else {
        console.error('Error deleting owner:', error);
        alert('Failed to delete owner. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>List of owners</h2>
      {proprietaires.length === 0 ? (
        <p>There is no data.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="custom-thead">
            <tr>
            <th>Num</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>City</th>
              <th>Address</th>
              <th>Animals</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {proprietaires.map((proprietaire, index) => (
              <tr key={proprietaire._id}>
                <td>{index + 1}</td>
                <td>
  <Link to={`/info-proprietaire/${proprietaire._id}`}>
    {proprietaire.nom}
  </Link>
</td>
                <td>{proprietaire.prenom}</td>
                <td>{proprietaire.telephone}</td>
                <td>{proprietaire.email}</td>
                <td>{proprietaire.ville}</td>
                <td>{proprietaire.adresse}</td>
                <td>
                  {proprietaire.animaux && proprietaire.animaux.length > 0 ? (
                    <ul className="list-unstyled">
                      {proprietaire.animaux.map((animal) => (
                        <li key={animal._id}>{animal.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No animals</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#7B3F00', color: 'white' }}
                    onClick={() => handleDeleteClick(proprietaire)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, ownerId: null, ownerName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Owner"
        message={`Are you sure you want to delete ${deleteModal.ownerName}? This will also delete all their animals and visits.`}
      />
    </div>
  );
};

export default ListeProprietaires;