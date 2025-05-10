import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ModifierProprietaire = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    ville: '',
    adresse: ''
  });

 
  const proprietaire = location.state;

  useEffect(() => {
    if (proprietaire) {
      setFormData({
        prenom: proprietaire.prenom || '',
        nom: proprietaire.nom || '',
        telephone: proprietaire.telephone || '',
        email: proprietaire.email || '',
        ville: proprietaire.ville || '',
        adresse: proprietaire.adresse || ''
      });
    }
  }, [proprietaire]);

  console.log(formData); 
  


  if (!proprietaire) {
    return <div className="container mt-5">No owner to change.</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleModifierClick = async (event) => {
    event.preventDefault();
    console.log("Sending Form Data:", formData);
    try {
      const response = await axios.put(`http://localhost:5000/api/proprietaires/${proprietaire._id}`, formData);
      console.log('Response from server:', response);

     
      navigate('/liste-proprietaires');
    } catch (error) {
      console.error('Error while updating:', error);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else if (error.response.data.details) {
          alert(`Validation Error: ${error.response.data.details.join(', ')}`);
        } else {
          alert("Failed to update. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert("No response from server. Please check if the server is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        alert("Error setting up request. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit owner information</h2>
      <form onSubmit={handleModifierClick} className="mt-4">
        <div className="mb-3">
          <input
            type="text"
            name="prenom"
            className="form-control custom-input"
            id="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="nom"
            className="form-control custom-input"
            id="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="telephone"
            className="form-control custom-input"
            id="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Telephone"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control custom-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="ville"
            className="form-control custom-input"
            id="ville"
            value={formData.ville}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="adresse"
            className="form-control custom-input"
            id="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse"
          />
        </div>
        <button type="submit" className="btn btn-primary">
        Save changes
        </button>
      </form>
    </div>
  );
};

export default ModifierProprietaire;




















/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModifierProprietaire = () => {
  // معطيات مسبقة كتجربة
  const [formData, setFormData] = useState({
    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // حفظ التعديلات من بعد
    navigate('/resultat-ajout');
  };

  return (
    <div className="container mt-5">
      <h2>Modifier les informations du propriétaire</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénom</label>
          <input 
            type="text" 
            name="prenom" 
            className="form-control" 
            id="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input 
            type="text" 
            name="nom" 
            className="form-control" 
            id="nom" 
            value={formData.nom} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">Téléphone</label>
          <input 
            type="text" 
            name="telephone" 
            className="form-control" 
            id="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default ModifierProprietaire;*/















/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ModifierProprietaire = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // بيانات جاية من الصفحة السابقة
  const proprietaire = location.state;

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    ville: '',
    adresse: ''
  });

  // نملأ البيانات من `location.state` عند الدخول للصفحة
  useEffect(() => {
    if (proprietaire) {
      setFormData({
        prenom: proprietaire.prenom,
        nom: proprietaire.nom,
        telephone: proprietaire.telephone,
        email: proprietaire.email,
        ville: proprietaire.ville || '',
        adresse: proprietaire.adresse || ''
      });
    } else {
      alert("لم يتم تمرير بيانات المالك بشكل صحيح.");
      navigate('/'); // التوجيه إلى الصفحة الرئيسية إذا كانت البيانات غير موجودة
    }
  }, [proprietaire, navigate]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // طلب تعديل إلى الخادم
      await axios.put(`http://localhost:5000/api/proprietaires/${proprietaire._id}`, formData);

      
      // عند نجاح التعديل، التوجيه إلى صفحة "ResultatAjout" مع البيانات المعدلة
      navigate('/modifier-proprietaire', { state: proprietaire });

      navigate('/resultat-ajout', { state: formData });
    } catch (error) {
      console.error('حدث خطأ أثناء التعديل:', error);
      alert("فشل التعديل. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!proprietaire) {
    return <div className="container mt-5">لا يوجد مالك لتعديله.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>تعديل معلومات المالك</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">الاسم الأول</label>
          <input 
            type="text" 
            name="prenom" 
            className="form-control" 
            id="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">الاسم</label>
          <input 
            type="text" 
            name="nom" 
            className="form-control" 
            id="nom" 
            value={formData.nom} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">رقم الهاتف</label>
          <input 
            type="text" 
            name="telephone" 
            className="form-control" 
            id="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ville" className="form-label">المدينة</label>
          <input 
            type="text" 
            name="ville" 
            className="form-control" 
            id="ville" 
            value={formData.ville} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">العنوان</label>
          <input 
            type="text" 
            name="adresse" 
            className="form-control" 
            id="adresse" 
            value={formData.adresse} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default ModifierProprietaire;
*/