const express = require('express');
const router = express.Router();
const Proprietaire = require('../models/Proprietaire');
const Animal = require('../models/Animal');
const Visite = require('../models/Visite');
const { getProprietaire } = require('../controllers/proprietaireController');

// Debug route to check visits
router.get('/debug/visits/:animalId', async (req, res) => {
  try {
    const visits = await Visite.find({ animal: req.params.animalId });
    console.log('Found visits:', visits);
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ message: 'Error fetching visits', error: error.message });
  }
});

// Search proprietaires by nom (case-insensitive)
router.get('/search', async (req, res) => {
  try {
    const { nom } = req.query;
    if (!nom) {
      return res.status(400).json({ message: 'Le paramètre nom est requis.' });
    }
    const proprietaires = await Proprietaire.find({ nom: { $regex: nom, $options: 'i' } });
    res.json(proprietaires);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche.' });
  }
});

// ✅ جلب جميع المالكين (مع الحيوانات التي يملكونها)
router.get('/', async (req, res) => {
  try {
    const proprietaires = await Proprietaire.find().populate('animaux');
    res.json(proprietaires);
  } catch (error) {
    console.error('Erreur lors de la récupération des propriétaires:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// ✅ جلب مالك واحد (مع حيواناته وزياراتهم)
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching proprietaire with ID:', req.params.id);
    
    // First, find the proprietaire
    const proprietaire = await Proprietaire.findById(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }

    // Then populate the animaux and their visites
    const populatedProprietaire = await Proprietaire.findById(req.params.id)
      .populate({
        path: 'animaux',
        populate: {
          path: 'visites',
          model: 'Visite'
        }
      })
      .lean(); // Use lean() for better performance

    // Log the raw data
    console.log('Raw proprietaire data:', JSON.stringify(populatedProprietaire, null, 2));

    // Check if animaux and visites are properly populated
    if (populatedProprietaire.animaux) {
      populatedProprietaire.animaux.forEach(animal => {
        console.log(`Animal ${animal.name} (${animal._id}) has ${animal.visites ? animal.visites.length : 0} visits`);
        if (animal.visites) {
          animal.visites.forEach(visite => {
            console.log(`Visit: ${visite.date} - ${visite.description}`);
          });
        }
      });
    }

    res.json(populatedProprietaire);
  } catch (err) {
    console.error('Erreur lors de la récupération du propriétaire:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// ✅ إضافة مالك جديد
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { prenom, nom, telephone, email, ville, adresse } = req.body;
    if (!prenom || !nom || !telephone || !email || !ville || !adresse) {
      return res.status(400).json({ 
        message: 'Tous les champs sont requis',
        missingFields: {
          prenom: !prenom,
          nom: !nom,
          telephone: !telephone,
          email: !email,
          ville: !ville,
          adresse: !adresse
        }
      });
    }

    const nouveauProprietaire = new Proprietaire({
      prenom,
      nom,
      telephone,
      email,
      ville,
      adresse,
      animaux: []
    });
    
    console.log('Creating new owner:', nouveauProprietaire);
    
    const proprietaireSauvegarde = await nouveauProprietaire.save();
    console.log('Saved owner:', proprietaireSauvegarde);
    
    res.status(201).json(proprietaireSauvegarde);
  } catch (error) {
    console.error('Detailed error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Erreur de validation',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Erreur serveur lors de l\'ajout du propriétaire',
      error: error.message 
    });
  }
});

// ✅ تحديث بيانات المالك
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating owner with ID:', req.params.id);
    console.log('Update data:', req.body);

    const { prenom, nom, telephone, email, ville, adresse } = req.body;
    
    // Validate required fields
    if (!prenom || !nom || !telephone || !email || !ville || !adresse) {
      return res.status(400).json({ 
        message: 'Tous les champs sont requis',
        missingFields: {
          prenom: !prenom,
          nom: !nom,
          telephone: !telephone,
          email: !email,
          ville: !ville,
          adresse: !adresse
        }
      });
    }

    const proprietaire = await Proprietaire.findById(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }

    // Update fields
    proprietaire.prenom = prenom;
    proprietaire.nom = nom;
    proprietaire.telephone = telephone;
    proprietaire.email = email;
    proprietaire.ville = ville;
    proprietaire.adresse = adresse;

    const proprietaireMisAJour = await proprietaire.save();
    console.log('Updated owner:', proprietaireMisAJour);
    
    res.json(proprietaireMisAJour);
  } catch (error) {
    console.error('Error updating owner:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Erreur de validation',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Erreur serveur lors de la mise à jour du propriétaire',
      error: error.message 
    });
  }
});

// مسار لحذف مالك
router.delete('/:id', async (req, res) => {
  console.log('DELETE request received for owner:', req.params.id);
  
  try {
    const proprietaire = await Proprietaire.findById(req.params.id);
    
    if (!proprietaire) {
      console.log('Owner not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Owner not found' });
    }

    // Delete all animals owned by this owner
    const animals = await Animal.find({ owner: proprietaire._id });
    for (const animal of animals) {
      // Delete all visits for each animal
      await Visite.deleteMany({ animal: animal._id });
      // Delete the animal
      await Animal.findByIdAndDelete(animal._id);
    }

    // Delete the owner
    await Proprietaire.findByIdAndDelete(req.params.id);
    
    console.log('Owner and associated data deleted successfully:', req.params.id);
    res.json({ message: 'Owner and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting owner:', error);
    res.status(500).json({ message: 'Failed to delete owner' });
  }
});

module.exports = router;
