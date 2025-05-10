import React from 'react';

const brown = '66, 66, 66 '; 
const lightBrown = '#F5E9DA'; 
const headingFont = '"Poppins", "Montserrat", Arial, sans-serif';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/pet.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', marginTop: 40 }}>
        <h1 style={{
          color: brown,
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: headingFont,
          letterSpacing: 1.5,
          fontSize: 48
        }}>
          Welcome to VetCare 360
        </h1>
        <hr style={{ width: '60%', margin: '20px auto', borderTop: `3px solid ${brown}` }} />
      </div>
      <div style={{
        background: `${lightBrown}`,
        opacity: 0.7,
        borderRadius: 12,
        padding: 24,
        maxWidth: 600,
        margin: '0 auto'
      }}>
        <h4 style={{ color: brown, fontWeight: 'bold', fontFamily: headingFont }}>What is VetCare?</h4>
        <p style={{ color: brown }}>
          VetCare 360 ​​is a smart digital application that helps veterinary clinics easily manage pet and owner information.
        </p>
        <h4 style={{ color: brown, fontWeight: 'bold', fontFamily: headingFont }}>What is the objectif of VetCare?</h4>
        <p style={{ color: brown }}>
          It simplifies work within the veterinary clinic and provides an easy way to organize data, so doctors can focus on caring for their pets instead of cluttering up paperwork or files.
        </p>
      </div>
    </div>
  );
};






export default Home;