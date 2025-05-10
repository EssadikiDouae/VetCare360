/*const Animal = require('../models/Animal');

// Ajouter un nouvel animal
exports.addAnimal = async (req, res) => {
  try {
    const newAnimal = new Animal(req.body);
    const savedAnimal = await newAnimal.save();
    res.status(201).json(savedAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les animaux
exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('proprietaire');
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/const Animal = require('../models/Animal');
const Proprietaire = require('../models/Proprietaire');

// دالة لإضافة حيوان جديد
const addAnimal = async (req, res) => {
  try {
    const { name, birthDate, type, owner } = req.body;

    // إنشاء حيوان جديد
    const newAnimal = new Animal({
      name,
      birthDate,
      type,
      owner,
    });

    // حفظ الحيوان في قاعدة البيانات
    await newAnimal.save();

    // ✅ إضافة الحيوان إلى قائمة animaux الخاصة بالمالك
    const proprietaire = await Proprietaire.findById(owner);
    if (proprietaire) {
      proprietaire.animaux.push(newAnimal._id);
      await proprietaire.save();
      console.log(`✔️ Animal ajouté et lié à propriétaire: ${proprietaire.nom}`);
    }

    // إرجاع الحيوان الذي تم إضافته
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'animal:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de l\'animal.' });
  }
};

// دالة للحصول على حيوان بواسطة معرّفه
const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('owner') // لجلب معلومات المالك
      .populate('visites'); // لجلب الزيارات المتعلقة بالحيوان

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


