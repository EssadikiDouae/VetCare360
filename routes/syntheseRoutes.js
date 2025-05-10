const express = require('express');
const router = express.Router();
const Propriétaire = require('../models/Proprietaire');
const Pet = require('../models/Animal');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Received ID in Express:", id);

  try {
    const owner = await Propriétaire.findById(id).populate({
      path: 'animaux',
      populate: {
        path: 'visites',
        model: 'Visite'
      }
    });

    if (!owner) {
      return res.status(404).json({ message: 'Aucun propriétaire trouvé avec cet ID.' });
    }

    const synthese = {
      owner: {
        prenom: owner.prenom,
        nom: owner.nom,
      },
      animaux: owner.animaux.map(animal => ({
        id: animal._id,
        nom: animal.nom,
        visites: animal.visites.map(visite => ({
          id: visite._id,
          date: new Date(visite.date).toLocaleDateString('fr-FR'), // تنسيق التاريخ
          raison: visite.raison
        }))
      }))
    };

    res.json(synthese);
  } catch (error) {
    console.error('Erreur lors de la récupération de la synthèse:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
});

module.exports = router;

