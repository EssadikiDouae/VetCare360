const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

//  Middleware
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//  MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect('mongodb://127.0.0.1:27017/vetcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('Database name:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit if cannot connect to database
});

// 🔗 Import Routes
console.log('Loading routes...');
const proprietaireRoutes = require('./routes/proprietaireRoutes');
const veterinaireRoutes = require('./routes/veterinaireRoutes');
const syntheseRoutes = require('./routes/syntheseRoutes');
const visiteRoutes = require('./routes/visiteRoutes');
const animalRoutes = require('./routes/animals');

// Define Routes
console.log('Registering routes...');
app.use('/api/proprietaires', proprietaireRoutes);
app.use('/api/veterinaires', veterinaireRoutes);
app.use('/api/synthese', syntheseRoutes);
app.use('/api/visites', visiteRoutes);
app.use('/api/animals', animalRoutes);

//  Test Route
app.get('/', (req, res) => {
  res.send('Bienvenue à VetCare 360 Backend 🚀');
});

//  Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/proprietaires');
  console.log('- GET /api/proprietaires');
  console.log('- GET /api/proprietaires/:id');
  console.log('- PUT /api/proprietaires/:id');
  console.log('- POST /api/animals');
  console.log('- GET /api/animals/:id');
  console.log('- PUT /api/animals/:id');
});
