// routes/veterinaireRoutes.js
const express = require('express');
const router = express.Router();
const Veterinaire = require('../models/Veterinaire');

// GET /api/veterinaires : récupérer tous les vétérinaires
router.get('/', async (req, res) => {
  try {
    const vets = await Veterinaire.find();
    res.json(vets);
  } catch (err) {
    console.error('Erreur lors de la récupération des vétérinaires:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/veterinaires : ajouter un nouveau vétérinaire
router.post('/', async (req, res) => {
  const { nom, specialite, telephone } = req.body;

  try {
    const nouveauVet = new Veterinaire({ nom, specialite, telephone });
    await nouveauVet.save();
    res.status(201).json(nouveauVet);
  } catch (error) {
    console.error("Erreur lors de l'ajout du vétérinaire:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout." });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedVet = await Veterinaire.findByIdAndDelete(req.params.id);
    if (!deletedVet) {
      return res.status(404).json({ message: 'Vétérinaire non trouvé.' });
    }
    res.json({ message: 'Vétérinaire supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du vétérinaire.' });
  }
});
module.exports = router;
