/*const Proprietaire = require('../models/Proprietaire');

const getProprietaire = async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findById(req.params.id)
      .populate({
        path: 'animaux',  // الحيوانات
        populate: {
          path: 'visites', // الزيارات
        },
      });

    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }

    res.json(proprietaire);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ message: 'Erreur serveur: ' + error.message });
  }
};

module.exports = {
  getProprietaire,
};*/
const Proprietaire = require('../models/Proprietaire');
const Animal = require('../models/Animal');
const Visite = require('../models/Visite');

const getProprietaire = async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findById(req.params.id)
      .populate({
        path: 'animaux',
        populate: {
          path: 'visites'
        }
      });

    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }

    res.json(proprietaire);
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ message: 'Erreur serveur: ' + error.message });
  }
};

module.exports = {
  getProprietaire,
};