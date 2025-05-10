import React from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// إذا كنت ترغب في قياس الأداء في تطبيقك، يمكنك تمرير دالة لقياس النتائج
// أو إرسالها إلى نقطة نهاية للتحليلات.
reportWebVitals();
