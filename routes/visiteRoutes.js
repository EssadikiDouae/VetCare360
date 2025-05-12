const express = require('express');
const router = express.Router();
const Visite = require('../models/Visite'); 
const Animal = require('../models/Animal');


router.use((req, res, next) => {
  console.log(`[Visits Route] ${req.method} ${req.originalUrl}`);
  next();
});


router.get('/animal/:id', async (req, res) => {
  try {
    const visites = await Visite.find({ animal: req.params.id });
    res.json(visites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des visites' });
  }
});


router.post('/', async (req, res) => {
  try {
    const nouvelleVisite = new Visite(req.body);
    const visiteEnregistree = await nouvelleVisite.save();
    res.status(201).json(visiteEnregistree);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la visite' });
  }
});


router.delete('/:id', async (req, res) => {
  console.log('DELETE request received for visit:', req.params.id);
  
  try {
    const visite = await Visite.findById(req.params.id);
    
    if (!visite) {
      console.log('Visit not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Delete the visit
    await Visite.findByIdAndDelete(req.params.id);
    
    console.log('Visit deleted successfully:', req.params.id);
    res.json({ message: 'Visit deleted successfully' });
  } catch (error) {
    console.error('Error deleting visit:', error);
    res.status(500).json({ message: 'Failed to delete visit' });
  }
});

module.exports = router;
