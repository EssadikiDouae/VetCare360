const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  type: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire', required: true },
  visites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visite' }]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
