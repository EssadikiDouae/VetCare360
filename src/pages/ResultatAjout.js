import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResultatAjout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const proprietaire = location.state;

  if (!proprietaire || !proprietaire._id) {
    return (
      <div className="container mt-5">
        <h4>No valid owner data received.</h4>
        <Link to="/nouveau-proprietaire" className="btn btn-primary mt-3">Back</Link>
      </div>
    );
  }
  const handleModifierClick = (e) => {
    e.preventDefault();
    navigate(`/modifier-proprietaire/${proprietaire._id}`, { state: { ...proprietaire } });
  };
  
  return (
    <div className="container mt-5">
      <h2> Owner added successfully</h2>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{proprietaire.prenom} {proprietaire.nom}</h5>
          <p className="card-text"><strong>Telephone:</strong> {proprietaire.telephone}</p>
          <p className="card-text"><strong>Email:</strong> {proprietaire.email}</p>
          <button onClick={handleModifierClick} className="btn btn-warning me-2">
          Edit information
          </button>
          <Link
            to={`/ajouter-animal/${proprietaire._id}`}
            state={{ owner: proprietaire }} 
            className="btn btn-success"
          >
           Add a animal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultatAjout;
