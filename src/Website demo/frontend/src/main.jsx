import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tailwind.css';
import './styles/global.css';
import '@coreui/coreui/dist/css/coreui.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);