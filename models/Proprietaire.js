

const mongoose = require('mongoose');

const proprietaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  ville: { type: String, required: true },
  adresse: { type: String, required: true },
  animaux: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
});

const Proprietaire = mongoose.model('Proprietaire', proprietaireSchema);
module.exports = Proprietaire;




