import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const NouveauProprietaire = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    ville: '',
    adresse:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending data:', formData); 
      const response = await axios.post('http://localhost:5000/api/proprietaires', formData);
      console.log('Response:', response.data); 
      const proprietaire = response.data;
      navigate('/resultat-ajout', { state: proprietaire });
    } catch (error) {
      console.error('Full error object:', error); 
      if (error.response) {
        
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        alert(`Erreur: ${error.response.data.message || 'Échec de l\'ajout. Veuillez réessayer.'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('Pas de réponse du serveur. Veuillez vérifier que le serveur est en cours d\'exécution.');
      } else {
        
        alert('Erreur lors de la configuration de la requête.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>New Owner</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input 
            type="text" 
            name="prenom" 
            className="form-control custom-input" 
            id="prenom" 
            placeholder="First Name" 
            value={formData.prenom} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            name="nom" 
            className="form-control custom-input" 
            id="nom" 
            placeholder="Last Name" 
            value={formData.nom} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            name="telephone" 
            className="form-control custom-input" 
            id="telephone" 
            placeholder="Téléphone" 
            value={formData.telephone} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input 
            type="email" 
            name="email" 
            className="form-control custom-input" 
            id="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
            <input
              type="text"
              name="ville"
              className="form-control custom-input"
              id="ville"
              placeholder="City"
              value={formData.ville}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="adresse"
              className="form-control custom-input"
              id="adresse"
              placeholder="Adresse complète"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </div>

        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default NouveauProprietaire;

