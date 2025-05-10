
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RechercheProprietaire = () => {
  const [nom, setNom] = useState('');
  const [resultats, setResultats] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/proprietaires/search?nom=${nom}`);
      setResultats(res.data);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Owner</h2>
      <form onSubmit={handleSearch} className="mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control custom-input"
            id="nom"
            placeholder="Last Name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary me-3">Search</button>
        <Link to="/nouveau-proprietaire" className="btn btn-success">
        Add a new owner
        </Link>
      </form>


      {resultats.length > 0 && (
        <div className="mt-4">
          <h4>Results:</h4>
          <ul className="list-group">
            {resultats.map((prop) => (
              <li key={prop._id} className="list-group-item">
                {prop.nom} - {prop.telephone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RechercheProprietaire;

