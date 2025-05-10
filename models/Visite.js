const mongoose = require('mongoose');

const visiteSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true }
});

const Visite = mongoose.model('Visite', visiteSchema);

module.exports = Visite;
