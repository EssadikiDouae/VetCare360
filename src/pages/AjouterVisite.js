import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AjouterVisite = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    description: ''
  });

  const [visites, setVisites] = useState([]);

  //Charger les visites précédentes
  useEffect(() => {
    const fetchVisites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/visites/animal/${id}`);


        setVisites(response.data);
      } catch (error) {
        console.error(" Erreur lors du chargement des visites:", error);
      }
    };

    fetchVisites();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("FormData to send:", formData);

      const response = await axios.post('http://localhost:5000/api/visites', {
        ...formData,
        animal: id
      });

      if (response.status === 201) {
        console.log("✅ Visite ajoutée :", response.data);
        // 🔁 Mettre à jour la liste des visites après ajout
        setVisites((prev) => [response.data, ...prev]);
        setFormData({ date: '', description: '' }); // Réinitialiser le formulaire
      } else {
        console.error("❌ La visite n'a pas été ajoutée correctement.");
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout de la visite:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a visit for the animal </h2> 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="date"
            name="date"
            id="date"
            className="form-control custom-input"
            value={formData.date}
            onChange={handleChange}
            required
            placeholder="Date"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="description"
            id="description"
            className="form-control custom-input"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add the visit</button>
      </form>

      <div className="mt-4">
        <h4>Previous visits</h4>
        <ul className="list-group">
          {visites.length > 0 ? (
            visites.map((visite) => (
              <li key={visite._id} className="list-group-item">
                 {new Date(visite.date).toLocaleDateString()} — {visite.description}
              </li>
            ))
          ) : (
            <li className="list-group-item">No previous visits.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AjouterVisite;


