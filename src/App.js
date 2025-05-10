import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Veterinaires from './pages/Veterinaires';
import RechercheProprietaire from './pages/RechercheProprietaire';
import NouveauProprietaire from './pages/NouveauProprietaire';
import ResultatAjout from './pages/ResultatAjout';
import ModifierProprietaire from './pages/ModifierProprietaire';
import AjouterAnimal from './pages/AjouterAnimal';
import ListeProprietaires from './pages/ListeProprietaires';
import InfoProprietaire from './pages/InfoProprietaire';
import ModifierAnimal from './pages/ModifierAnimal';
import AjouterVisite from './pages/AjouterVisite';
import SyntheseVisite from './pages/SyntheseVisite';
import Footer from './components/Footer';
import AjouterVet from './pages/ajouterVet';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const globalStyles = `
  body {
    background-color: #efebe9;
    min-height: 100vh;
  }

  .custom-table thead {
    background-color: #8d6e63 !important;
    color: white !important;
  }

  .custom-table thead th {
    background-color: #424242 !important;
    color: white !important;
    border-color: #424242 !important;
  }
`;

// Create a wrapper component to handle the Footer visibility
const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <style>{globalStyles}</style>
      <style>
        {`
          .custom-input {
            background: transparent;
            border: none;
            border-bottom: 1.5px solid #ccc;
            border-radius: 0;
            color: #fff;
            font-size: 1.1rem;
            margin-bottom: 24px;
            box-shadow: none;
          }
          .custom-input:focus {
            border-bottom: 2px solid #43e97b;
            outline: none;
            background: transparent;
            color: #fff;
          }
          ::placeholder {
            color: #fff;
            opacity: 0.8;
            font-weight: 400;
          }
          

          .custom-input,
.custom-input:focus {
  background: transparent !important;
  border: none !important;
  border-bottom: 1.5px solid #ccc !important;
  border-radius: 0 !important;
  color: #222 !important;
  font-size: 1.1rem;
  margin-bottom: 24px;
  box-shadow: none !important;
}

.custom-input:focus {
  border-bottom: 2px solid #43e97b !important;
  outline: none !important;
  background: transparent !important;
  color: #222 !important;
}

select.custom-input {
  padding-left: 0;
  padding-right: 0;
  background: transparent !important;
  color: #222 !important;
}
  .custom-thead th {
  background-color: #424242 !important;
  color: white !important;
}
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#424242' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">VetCare 360</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/"><i class="bi bi-house-heart-fill"></i> Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-white" to="/veterinaires">
                  <img 
                  src="/med.png"
                  alt="icon"
                  style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  verticalAlign: 'middle',
                  filter: 'brightness(0) invert(1)',
                  display: 'inline-block',
                  marginBottom: '4px'
                  }}/>veterinarians
                  </Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/recherche-proprietaire"><i class="bi bi-people-fill"></i> owners</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veterinaires" element={<Veterinaires />} />
        <Route path="/recherche-proprietaire" element={<RechercheProprietaire />} />
        <Route path="/nouveau-proprietaire" element={<NouveauProprietaire />} />
        <Route path="/resultat-ajout" element={<ResultatAjout />} />
        <Route path="/modifier-proprietaire/:id" element={<ModifierProprietaire />} />
        <Route path="/ajouter-animal/:ownerId" element={<AjouterAnimal />} />
        <Route path="/liste-proprietaires" element={<ListeProprietaires />} />
        <Route path="/info-proprietaire/:id" element={<InfoProprietaire />} />
        <Route path="/modifier-animal/:id" element={<ModifierAnimal />} />
        <Route path="/ajouter-visite/:id" element={<AjouterVisite />} />
        <Route path="/synthese/:id" element={<SyntheseVisite />} />
        <Route path="/ajouter-vet" element={<AjouterVet />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {isHomePage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
