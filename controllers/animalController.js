const Animal = require('../models/Animal');
const Proprietaire = require('../models/Proprietaire');


const addAnimal = async (req, res) => {
  try {
    const { name, birthDate, type, owner } = req.body;

    
    const newAnimal = new Animal({
      name,
      birthDate,
      type,
      owner,
    });

    
    await newAnimal.save();

    
    const proprietaire = await Proprietaire.findById(owner);
    if (proprietaire) {
      proprietaire.animaux.push(newAnimal._id);
      await proprietaire.save();
      console.log(`✔️ Animal ajouté et lié à propriétaire: ${proprietaire.nom}`);
    }

   
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'animal:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de l\'animal.' });
  }
};


const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('owner') 
      .populate('visites'); 

    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }

    res.json(animal);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'animal:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'animal.' });
  }
};

module.exports = {
  addAnimal,
  getAnimalById,
};


