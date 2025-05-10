import React from 'react';

const Footer = () => (
  <footer style={{
    background: '#424242',
    color: 'white',
    padding: '24px 0',
    textAlign: 'center',
    marginTop: 'auto'
  }}>
    <div style={{ marginBottom: 12 }}>
      <span style={{ marginRight: 16 }}>
        <i className="bi bi-telephone-fill" style={{ marginRight: 8 }}></i>
        +212 6 12 34 56 78
      </span>
      <span style={{ marginRight: 16 }}>
        <i className="bi bi-facebook" style={{ marginRight: 8 }}></i>
        <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Facebook</a>
      </span>
      <span style={{ marginRight: 16 }}>
        <i className="bi bi-instagram" style={{ marginRight: 8 }}></i>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Instagram</a>
      </span>
      <span>
        <i className="bi bi-twitter-x" style={{ marginRight: 8 }}></i>
        <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Twitter</a>
      </span>
    </div>
    <div style={{ fontSize: 14 }}>
       {new Date().getFullYear()} VetCare 360.
    </div>
  </footer>
);

export default Footer;