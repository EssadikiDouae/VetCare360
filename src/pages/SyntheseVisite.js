import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SyntheseVisite = () => {
  const { id } = useParams(); 
  const [synthese, setSynthese] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSynthese = async () => {
      if (!id) {
        console.error(" ID invalide");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/synthese/${id}`);
        setSynthese(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSynthese();
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!synthese) return <div className="container mt-5">No data found.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Summary of visits</h2>
      <div className="card p-4">
        <h5 className="mb-3">Owner: {synthese.owner.prenom} {synthese.owner.nom}</h5>

        {synthese.animaux.length === 0 ? (
          <p>No animals found for this owner.</p>
        ) : (
          <>
            <h4 className="mt-4">Animals and their visits</h4>
            {synthese.animaux.map(animal => (
              <div key={animal.id} className="mb-4">
                <h5>{animal.nom}</h5>
                {animal.visites.length === 0 ? (
                  <p className="text-muted">No visits recorded.</p>
                ) : (
                  <ul className="list-group">
                    {animal.visites.map(visite => (
                      <li key={visite.id} className="list-group-item">
                        {visite.date} — ✏️ {visite.raison}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        <Link to="/" className="btn btn-primary mt-4">Back to home</Link>
      </div>
    </div>
  );
};

export default SyntheseVisite;
