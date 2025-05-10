// routes/animals.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const Proprietaire = require('../models/Proprietaire');
const { addAnimal, getAnimalById } = require('../controllers/animalController');

// Log all requests to this router
router.use((req, res, next) => {
  console.log(`[Animals Route] ${req.method} ${req.originalUrl}`);
  next();
});

// Utilisation de la fonction addAnimal de controllers/animalController.js
router.post('/', addAnimal); 

// Chemin pour récupérer l'animal par ID
router.get('/:id', getAnimalById);

// Chemin pour mettre à jour l'animal
router.put('/:id', async (req, res) => {
  console.log('PUT request received for animal:', req.params.id);
  console.log('Request body:', req.body);
  
  try {
    const { name, birthDate, type } = req.body;
    
    console.log('Updating animal with data:', { name, birthDate, type });
    
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, birthDate, type },
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      console.log('Animal not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Animal not found' });
    }

    console.log('Animal updated successfully:', updatedAnimal);
    res.json(updatedAnimal);
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ message: 'Failed to update animal' });
  }
});

// Chemin pour supprimer l'animal
router.delete('/:id', async (req, res) => {
  console.log('DELETE request received for animal:', req.params.id);
  
  try {
    const animal = await Animal.findById(req.params.id);
    
    if (!animal) {
      console.log('Animal not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Animal not found' });
    }

    // Remove animal from owner's animaux array
    if (animal.owner) {
      await Proprietaire.findByIdAndUpdate(
        animal.owner,
        { $pull: { animaux: animal._id } }
      );
    }

    // Delete the animal
    await Animal.findByIdAndDelete(req.params.id);
    
    console.log('Animal deleted successfully:', req.params.id);
    res.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ message: 'Failed to delete animal' });
  }
});

module.exports = router;


