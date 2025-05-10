const express = require('express');
const router = express.Router();
const Visite = require('../models/Visite'); // أو حسب مكان موديل Visite
const Animal = require('../models/Animal');

// Log all requests to this router
router.use((req, res, next) => {
  console.log(`[Visits Route] ${req.method} ${req.originalUrl}`);
  next();
});

// 🔁 جلب زيارات حيوان معين
router.get('/animal/:id', async (req, res) => {
  try {
    const visites = await Visite.find({ animal: req.params.id });
    res.json(visites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des visites' });
  }
});

// ➕ إضافة زيارة جديدة
router.post('/', async (req, res) => {
  try {
    const nouvelleVisite = new Visite(req.body);
    const visiteEnregistree = await nouvelleVisite.save();
    res.status(201).json(visiteEnregistree);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la visite' });
  }
});

// مسار لحذف زيارة
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
/*
const express = require('express');
const router = express.Router();
const Visite = require('../models/Visite');
const Animal = require('../models/Animal');
const multer = require('multer');
// ➕ إضافة زيارة جديدة مرتبطة بحيوان
router.post('/', async (req, res) => {
  try {
    const { date, description, animal } = req.body;

    // ✅ التحقق من وجود جميع الحقول المطلوبة
    if (!date || !description || !animal) {
      return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
    }

    // ✅ إنشاء الزيارة
    const newVisite = new Visite({ date, description, animal });
    const savedVisite = await newVisite.save();

    // ✅ ربط الزيارة بالحيوان (تأكد أن animal.visites موجود في النموذج)
    await Animal.findByIdAndUpdate(animal, {
      $push: { visites: savedVisite._id }
    });

    res.status(201).json(savedVisite);

  } catch (err) {
    console.error("🔥 Erreur lors de l'ajout de la visite:", err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;*/
