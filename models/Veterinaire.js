// models/Veterinaire.js
const mongoose = require('mongoose');

const veterinaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  specialite: { type: String, required: true },
  telephone: { type: String, required: true }
});

module.exports = mongoose.model('Veterinaire', veterinaireSchema);
